import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FiUsers,
  FiCreditCard,
  FiActivity,
  FiSettings,
  FiArrowRight,
} from "react-icons/fi";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useAuth } from "../context/AuthContext";

const OrganizationDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        setLoading(true);

        // Change this endpoint if your backend uses another route
        const response = await axiosSecure.get("/api/organizations/me");

        setOrganization(response.data.data);
      } catch (error) {
        console.error("Failed to load organization:", error);
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

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">
            Organization Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Welcome, {user?.name || "User"} 👋
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your organization, members, subscription and settings.
          </p>
        </div>

        {/* Organization Card */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-gray-500">Organization</p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {organization?.name || "My Organization"}
              </h2>

              {organization?.slug && (
                <p className="mt-1 text-sm text-gray-500">
                  @{organization.slug}
                </p>
              )}
            </div>

            <div>
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  organization?.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {organization?.status || "ACTIVE"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Members */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-3">
                <FiUsers className="text-xl text-blue-600" />
              </div>

              <span className="text-xs font-medium text-gray-400">MEMBERS</span>
            </div>

            <p className="mt-5 text-3xl font-bold text-gray-900">
              {organization?.memberCount ?? 0}
            </p>

            <p className="mt-1 text-sm text-gray-500">Organization members</p>
          </div>

          {/* Subscription */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-purple-50 p-3">
                <FiCreditCard className="text-xl text-purple-600" />
              </div>

              <span className="text-xs font-medium text-gray-400">PLAN</span>
            </div>

            <p className="mt-5 text-2xl font-bold text-gray-900">
              {organization?.subscription?.plan?.name || "Free"}
            </p>

            <p className="mt-1 text-sm text-gray-500">Current subscription</p>
          </div>

          {/* Status */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-green-50 p-3">
                <FiActivity className="text-xl text-green-600" />
              </div>

              <span className="text-xs font-medium text-gray-400">STATUS</span>
            </div>

            <p className="mt-5 text-2xl font-bold text-gray-900">
              {organization?.status || "ACTIVE"}
            </p>

            <p className="mt-1 text-sm text-gray-500">Organization status</p>
          </div>

          {/* Settings */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-orange-50 p-3">
                <FiSettings className="text-xl text-orange-600" />
              </div>

              <span className="text-xs font-medium text-gray-400">
                SETTINGS
              </span>
            </div>

            <p className="mt-5 text-2xl font-bold text-gray-900">Manage</p>

            <p className="mt-1 text-sm text-gray-500">Organization settings</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {/* Members */}
            <Link
              to="/dashboard/members"
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Manage Members
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Add, remove and manage organization members.
                  </p>
                </div>

                <FiArrowRight className="text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>

            {/* Subscription */}
            <Link
              to="/dashboard/subscription"
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Subscription
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    View your current plan and billing information.
                  </p>
                </div>

                <FiArrowRight className="text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>

            {/* Settings */}
            <Link
              to="/dashboard/settings"
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Organization Settings
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Update organization information and preferences.
                  </p>
                </div>

                <FiArrowRight className="text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          </div>
        </div>

        {/* Organization Contact */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Organization Information
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Contact Email</p>
              <p className="mt-1 font-medium text-gray-900">
                {organization?.contactEmail || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Contact Phone</p>
              <p className="mt-1 font-medium text-gray-900">
                {organization?.contactPhone || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Billing Email</p>
              <p className="mt-1 font-medium text-gray-900">
                {organization?.billingEmail || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrganizationDashboard;
