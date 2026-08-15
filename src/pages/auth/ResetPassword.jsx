import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";

const ResetPassword = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post("/api/auth/reset-password", {
        token,
        password: formData.password,
      });

      toast.success(
        response.data.message ||
          "Password reset successfully. You can now login.",
      );

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to reset password. Please try again.",
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
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your new password below.
          </p>
        </div>

        {/* Invalid Token */}
        {!token ? (
          <div className="text-center">
            <p className="text-sm text-red-500">
              Invalid or missing password reset token.
            </p>

            <Link
              to="/forgot-password"
              className="mt-4 inline-block font-semibold text-primary hover:underline"
            >
              Request a new reset link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                New Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* Back to Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ResetPassword;
