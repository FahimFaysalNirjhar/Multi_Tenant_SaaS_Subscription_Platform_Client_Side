import React from "react";
import { Link, useSearchParams } from "react-router";

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  return (
    <section className="min-h-screen bg-secondary px-6 py-20">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">
        <div className="mb-4 text-5xl">✓</div>

        <h1 className="text-3xl font-bold text-gray-900">
          Payment Successful!
        </h1>

        <p className="mt-3 text-gray-600">
          Your subscription has been activated successfully.
        </p>

        {sessionId && (
          <p className="mt-4 break-all text-sm text-gray-400">
            Session ID: {sessionId}
          </p>
        )}

        <Link
          to="/organization/subscription"
          className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white"
        >
          Go to Dashboard
        </Link>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
