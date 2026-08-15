import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";

const Plan = () => {
  const axiosInstance = useAxios();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/api/plans");

        setPlans(response.data.data || []);
      } catch (error) {
        console.error("Failed to load plans:", error);

        toast.error(
          error?.response?.data?.message ||
            "Failed to load plans. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [axiosInstance]);

  if (loading) {
    return (
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-gray-500">Loading plans...</p>
        </div>
      </section>
    );
  }

  const activePlans = plans.filter((plan) => plan.isActive);

  return (
    <section id="plans" className="bg-secondary px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 font-semibold uppercase tracking-wider text-primary">
            Pricing
          </p>

          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Choose the right plan for your business
          </h1>

          <p className="mt-4 text-gray-600">
            Start with the plan that fits your organization and upgrade whenever
            you need.
          </p>
        </div>

        {/* Plans */}
        {activePlans.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-900">
              No plans available
            </h2>

            <p className="mt-2 text-gray-500">Please check back later.</p>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              activePlans.length === 1
                ? "mx-auto max-w-md"
                : activePlans.length === 2
                  ? "mx-auto max-w-4xl md:grid-cols-2"
                  : "md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {activePlans.map((plan) => (
              <div
                key={plan.id}
                className="relative flex flex-col rounded-2xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Plan Name */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </h2>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>

                  <span className="ml-2 text-gray-500">
                    / {plan.interval?.toLowerCase()}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-gray-200"></div>

                {/* Features */}
                <div className="flex-1">
                  <h3 className="mb-4 font-semibold text-gray-900">
                    What's included:
                  </h3>

                  <ul className="space-y-3">
                    {Array.isArray(plan.features) &&
                      plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <span className="mt-0.5 text-green-500">✓</span>

                          <span>
                            {typeof feature === "string"
                              ? feature
                              : feature.name || feature.title}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Button */}
                <Link
                  to={`/checkout/${plan.id}`}
                  className="mt-8 block w-full rounded-lg bg-primary px-5 py-3 text-center font-semibold text-white transition hover:opacity-90"
                >
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Plan;
