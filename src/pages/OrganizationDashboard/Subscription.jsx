import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiCreditCard,
  FiCalendar,
  FiRefreshCw,
} from "react-icons/fi";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Subscription = () => {
  const axiosSecure = useAxiosSecure();

  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        setLoading(true);

        const response = await axiosSecure.get("/api/organizations/me");

        setOrganization(response.data.data);
      } catch (error) {
        console.error("Failed to load subscription:", error);

        toast.error(
          error?.response?.data?.message ||
            "Failed to load subscription information.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const subscription = organization?.subscription;
  const plan = subscription?.plan;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/organization"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary"
          >
            <FiArrowLeft />
            Back to Dashboard
          </Link>

          <p className="text-sm font-medium text-primary">
            Billing & Subscription
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Subscription
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your organization's current subscription and billing plan.
          </p>
        </div>

        {/* No Subscription */}
        {!subscription || !plan ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
              <FiCreditCard className="text-2xl text-purple-600" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No active subscription
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Your organization does not currently have an active subscription.
              Choose a plan to get started.
            </p>

            <Link
              to="/plans"
              className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              View Plans
            </Link>
          </div>
        ) : (
          <>
            {/* Current Subscription */}
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
              <div className="border-b border-gray-100 p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-purple-50 p-3">
                      <FiCreditCard className="text-2xl text-purple-600" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Current Subscription
                      </p>

                      <h2 className="text-2xl font-bold text-gray-900">
                        {plan.name}
                      </h2>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      subscription.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : subscription.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </div>
              </div>

              {/* Plan Information */}
              <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-500">Plan</p>

                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {plan.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Price</p>

                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    ${plan.price}
                    <span className="ml-1 text-sm font-normal text-gray-500">
                      / {plan.interval?.toLowerCase()}
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>

                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {subscription.status}
                  </p>
                </div>

                {subscription.currentPeriodStart && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Current Period Start
                    </p>

                    <p className="mt-1 flex items-center gap-2 font-medium text-gray-900">
                      <FiCalendar className="text-gray-400" />

                      {new Date(
                        subscription.currentPeriodStart,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {subscription.currentPeriodEnd && (
                  <div>
                    <p className="text-sm text-gray-500">Current Period End</p>

                    <p className="mt-1 flex items-center gap-2 font-medium text-gray-900">
                      <FiCalendar className="text-gray-400" />

                      {new Date(
                        subscription.currentPeriodEnd,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Plan Description */}
            <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {plan.name} Plan
              </h2>

              {plan.description && (
                <p className="mt-2 text-gray-500">{plan.description}</p>
              )}

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900">What's included</h3>

                {Array.isArray(plan.features) && plan.features.length > 0 ? (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm text-gray-600"
                      >
                        <FiCheckCircle className="mt-0.5 shrink-0 text-green-500" />

                        <span>
                          {typeof feature === "string"
                            ? feature
                            : feature?.name || feature?.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-gray-500">
                    No features available.
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/plans"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                <FiRefreshCw />
                Change Plan
              </Link>

              <Link
                to="/organization"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
              >
                Back to Dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Subscription;
