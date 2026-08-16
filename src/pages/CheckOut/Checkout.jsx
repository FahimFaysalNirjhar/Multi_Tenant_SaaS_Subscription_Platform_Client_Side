import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Checkout = () => {
  const { planId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const response = await axiosSecure.post(
        "/api/subscriptions/checkout-session",
        {
          planId,
        },
      );

      console.log("Checkout response:", response.data);

      const checkoutUrl = response?.data?.data?.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error("Stripe checkout URL was not returned.");
      }

      // Redirect to Stripe Checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to start checkout.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (planId) {
      handleCheckout();
    }
  }, [planId]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        {loading ? (
          <>
            <span className="loading loading-spinner loading-lg text-primary" />

            <h1 className="mt-5 text-xl font-bold text-gray-900">
              Preparing Checkout...
            </h1>

            <p className="mt-2 text-gray-500">
              Redirecting you to Stripe securely.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900">
              Checkout Failed
            </h1>

            <p className="mt-2 text-gray-500">
              We couldn't start the checkout process.
            </p>

            <button
              onClick={handleCheckout}
              className="mt-6 rounded-lg bg-primary px-6 py-3 font-semibold text-white"
            >
              Try Again
            </button>

            <button
              onClick={() => navigate("/plans")}
              className="ml-3 rounded-lg bg-gray-100 px-6 py-3 font-semibold text-gray-700"
            >
              Back to Plans
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default Checkout;
