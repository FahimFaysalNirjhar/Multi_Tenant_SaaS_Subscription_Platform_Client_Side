import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";

const ForgotPassword = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.post("/api/auth/forgot-password", {
        email,
      });

      toast.success(response.data.message);

      // Development only
      const resetToken = response.data.data?.resetToken;

      if (resetToken) {
        navigate(`/reset-password/${resetToken}`);
      }
    } catch (error) {
      console.error("Forgot password error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to process your request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link to="/" className="text-3xl font-bold text-primary">
            Octopi
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Forgot Password?
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm font-semibold text-primary hover:underline"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
