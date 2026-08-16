import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiSave,
  FiSettings,
  FiMail,
  FiPhone,
  FiBriefcase,
} from "react-icons/fi";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const OrganizationSettings = () => {
  const axiosSecure = useAxiosSecure();

  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    billingEmail: "",
  });

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        setLoading(true);

        const response = await axiosSecure.get("/api/organizations/me");

        const data = response.data.data;

        setOrganization(data);

        setFormData({
          name: data?.name || "",
          contactEmail: data?.contactEmail || "",
          contactPhone: data?.contactPhone || "",
          billingEmail: data?.billingEmail || "",
        });
      } catch (error) {
        console.error("Failed to load organization:", error);

        toast.error(
          error?.response?.data?.message ||
            "Failed to load organization settings.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [axiosSecure]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Organization name is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await axiosSecure.patch(
        "/api/organizations/me",
        formData,
      );

      const updatedOrganization = response.data.data;

      setOrganization((prev) => ({
        ...prev,
        ...updatedOrganization,
      }));

      setFormData({
        name: updatedOrganization?.name || "",
        contactEmail: updatedOrganization?.contactEmail || "",
        contactPhone: updatedOrganization?.contactPhone || "",
        billingEmail: updatedOrganization?.billingEmail || "",
      });

      toast.success(
        response.data.message || "Organization updated successfully.",
      );
    } catch (error) {
      console.error("Failed to update organization:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update organization. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-50">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="mt-4 text-gray-500">Loading organization settings...</p>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
            <FiSettings className="mx-auto text-4xl text-gray-400" />

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              Organization not found
            </h2>

            <p className="mt-2 text-gray-500">
              We couldn't load your organization information.
            </p>

            <Link
              to="/organization"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
            >
              <FiArrowLeft />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back */}
        <Link
          to="/organization"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-primary"
        >
          <FiArrowLeft />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mt-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <FiSettings className="text-2xl text-primary" />
            </div>

            <div>
              <p className="text-sm font-semibold text-primary">Organization</p>

              <h1 className="text-3xl font-bold text-gray-900">
                Organization Settings
              </h1>
            </div>
          </div>

          <p className="mt-3 text-gray-500">
            Update your organization's information and contact details.
          </p>
        </div>

        {/* Organization Status */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-gray-500">Organization Status</p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                {organization.status || "PENDING"}
              </p>
            </div>

            <span
              className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                organization.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : organization.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {organization.status || "PENDING"}
            </span>
          </div>
        </div>

        {/* Settings Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8"
        >
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900">
              Organization Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Keep your organization information up to date.
            </p>
          </div>

          <div className="space-y-6">
            {/* Organization Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Organization Name
              </label>

              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter organization name"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Contact Email */}
            <div>
              <label
                htmlFor="contactEmail"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Contact Email
              </label>

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="contact@example.com"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Contact Phone */}
            <div>
              <label
                htmlFor="contactPhone"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Contact Phone
              </label>

              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+880 1XXXXXXXXX"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Billing Email */}
            <div>
              <label
                htmlFor="billingEmail"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Billing Email
              </label>

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="billingEmail"
                  name="billingEmail"
                  type="email"
                  value={formData.billingEmail}
                  onChange={handleChange}
                  placeholder="billing@example.com"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Billing-related information can be sent to this email.
              </p>
            </div>
          </div>

          {/* Save */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <Link
              to="/organization"
              className="rounded-lg bg-gray-100 px-5 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-200"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default OrganizationSettings;
