import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useAxiosSecure from "../../Hooks/useAxiosSecure";

const initialFormData = {
  name: "",
  description: "",
  price: "",
  interval: "MONTHLY",
  features: "",
  isActive: true,
};

const ManagePlans = () => {
  const axiosInstance = useAxiosSecure();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  // =========================
  // Fetch Plans
  // =========================
  const fetchPlans = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/api/plans");

      setPlans(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch plans:", error);

      toast.error(error?.response?.data?.message || "Failed to load plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // =========================
  // Handle Input
  // =========================
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // Open Create Modal
  // =========================
  const handleCreate = () => {
    setEditingPlan(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  // =========================
  // Open Edit Modal
  // =========================
  const handleEdit = (plan) => {
    setEditingPlan(plan);

    setFormData({
      name: plan.name || "",
      description: plan.description || "",
      price: plan.price?.toString() || "",
      interval: plan.interval || "MONTHLY",
      features: Array.isArray(plan.features) ? plan.features.join("\n") : "",
      isActive: plan.isActive ?? true,
    });

    setShowModal(true);
  };

  // =========================
  // Close Modal
  // =========================
  const closeModal = () => {
    if (submitting) return;

    setShowModal(false);
    setEditingPlan(null);
    setFormData(initialFormData);
  };

  // =========================
  // Submit Plan
  // =========================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Plan name is required.");
      return;
    }

    if (!formData.price || Number(formData.price) < 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    const features = formData.features
      .split("\n")
      .map((feature) => feature.trim())
      .filter(Boolean);

    if (features.length === 0) {
      toast.error("Please add at least one feature.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim() || null,
      price: Number(formData.price),
      interval: formData.interval,
      features,
      isActive: formData.isActive,
    };

    try {
      setSubmitting(true);

      if (editingPlan) {
        await axiosInstance.patch(`/api/plans/${editingPlan.id}`, payload);

        toast.success("Plan updated successfully.");
      } else {
        await axiosInstance.post("/api/plans", payload);

        toast.success("Plan created successfully.");
      }

      closeModal();
      fetchPlans();
    } catch (error) {
      console.error("Plan save error:", error);

      toast.error(error?.response?.data?.message || "Failed to save plan.");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // Toggle Plan Status
  // =========================
  const handleToggleStatus = async (plan) => {
    try {
      await axiosInstance.patch(`/api/plans/${plan.id}/toggle-status`);

      toast.success(
        `Plan ${plan.isActive ? "deactivated" : "activated"} successfully.`,
      );

      fetchPlans();
    } catch (error) {
      console.error("Toggle plan error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to update plan status.",
      );
    }
  };

  // =========================
  // Delete Plan
  // =========================
  const handleDelete = async (plan) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${plan.name}"?`,
    );

    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/api/plans/${plan.id}`);

      toast.success("Plan deleted successfully.");

      fetchPlans();
    } catch (error) {
      console.error("Delete plan error:", error);

      toast.error(error?.response?.data?.message || "Failed to delete plan.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Plans</h1>

            <p className="mt-1 text-sm text-gray-500">
              Create, update, activate, and manage your subscription plans.
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            + Create Plan
          </button>
        </div>

        {/* Plans */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-60 items-center justify-center">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : plans.length === 0 ? (
            <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                No plans found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Create your first subscription plan.
              </p>

              <button
                onClick={handleCreate}
                className="mt-5 rounded-lg bg-primary px-5 py-2.5 font-semibold text-white"
              >
                Create Plan
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Plan
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Interval
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Features
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {plans.map((plan) => (
                    <tr key={plan.id} className="transition hover:bg-gray-50">
                      {/* Plan */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {plan.name}
                          </p>

                          {plan.description && (
                            <p className="mt-1 max-w-xs text-sm text-gray-500">
                              {plan.description}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-5">
                        <span className="font-semibold text-gray-900">
                          ${Number(plan.price).toFixed(2)}
                        </span>
                      </td>

                      {/* Interval */}
                      <td className="px-6 py-5">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          {plan.interval}
                        </span>
                      </td>

                      {/* Features */}
                      <td className="px-6 py-5">
                        <ul className="space-y-1">
                          {Array.isArray(plan.features) &&
                            plan.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                • {feature}
                              </li>
                            ))}

                          {Array.isArray(plan.features) &&
                            plan.features.length > 3 && (
                              <li className="text-xs font-medium text-primary">
                                +{plan.features.length - 3} more
                              </li>
                            )}
                        </ul>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <button
                          onClick={() => handleToggleStatus(plan)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            plan.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {plan.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(plan)}
                            className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(plan)}
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingPlan ? "Edit Plan" : "Create Plan"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingPlan
                    ? "Update your subscription plan."
                    : "Add a new subscription plan."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Plan Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Professional"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="For growing organizations"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Price + Interval */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>

                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="29.99"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="interval"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Billing Interval
                  </label>

                  <select
                    id="interval"
                    name="interval"
                    value={formData.interval}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="MONTHLY">Monthly</option>

                    <option value="YEARLY">Yearly</option>
                  </select>
                </div>
              </div>

              {/* Features */}
              <div>
                <label
                  htmlFor="features"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Features
                </label>

                <textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder={
                    "Unlimited users\nAdvanced analytics\nPriority support\nCustom reports"
                  }
                  rows={6}
                  required
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Enter one feature per line.
                </p>
              </div>

              {/* Active */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                />

                <span className="text-sm font-medium text-gray-700">
                  Make this plan active
                </span>
              </label>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? "Saving..."
                    : editingPlan
                      ? "Update Plan"
                      : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePlans;
