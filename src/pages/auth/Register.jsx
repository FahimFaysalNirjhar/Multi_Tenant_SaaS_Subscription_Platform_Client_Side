import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organizationName: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.post("/api/auth/register", formData);

      console.log("Registration response:", response.data);

      const { user } = response.data.data;

      // Update AuthContext
      login(user);

      toast.success("Registration successful!");

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(error?.response?.data?.message || "Registration failed");
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
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create an account to start managing your organization.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              autoComplete="name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Organization Name */}
          <div>
            <label
              htmlFor="organizationName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Organization Name
            </label>

            <input
              id="organizationName"
              name="organizationName"
              type="text"
              value={formData.organizationName}
              onChange={handleChange}
              placeholder="Fahim Technologies"
              required
              autoComplete="organization"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Email */}
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
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            <p className="mt-2 text-xs text-gray-500">
              Password must be at least 6 characters.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
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

export default Register;
