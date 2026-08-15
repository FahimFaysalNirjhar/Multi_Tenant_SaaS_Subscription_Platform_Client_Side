import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";

const Dashboard = () => {
  const axiosInstance = useAxios();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get("/api/plans");

        setPlans(response.data.data || []);
      } catch (error) {
        console.error(error);

        toast.error(
          error?.response?.data?.message || "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [axiosInstance]);

  const activePlans = plans.filter((plan) => plan.isActive);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your Octopi platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Plans</p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {loading ? "..." : plans.length}
          </h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Active Plans</p>

          <h3 className="mt-2 text-3xl font-bold text-green-600">
            {loading ? "..." : activePlans.length}
          </h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Organizations</p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">—</h3>

          <p className="mt-1 text-xs text-gray-400">Connect organization API</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Subscriptions</p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">—</h3>

          <p className="mt-1 text-xs text-gray-400">Connect subscription API</p>
        </div>
      </div>

      {/* Recent Plans */}
      <div className="mt-8 rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h3 className="font-semibold text-gray-900">Plans</h3>

            <p className="mt-1 text-sm text-gray-500">
              Manage your SaaS pricing plans.
            </p>
          </div>

          <a
            href="/platform-admin/plans"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View all
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-sm text-gray-500">
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Interval</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {plans.slice(0, 5).map((plan) => (
                <tr
                  key={plan.id}
                  className="border-b border-gray-100 last:border-none"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{plan.name}</p>

                    <p className="text-xs text-gray-500">{plan.description}</p>
                  </td>

                  <td className="px-6 py-4 font-medium">${plan.price}</td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {plan.interval}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        plan.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {plan.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}

              {!loading && plans.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No plans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
