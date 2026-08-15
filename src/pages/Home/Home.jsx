import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block mb-4 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Multi-Tenant SaaS Platform
            </span>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Manage Your Organization
              <span className="text-primary"> With Confidence</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              A secure SaaS platform where organizations can manage their teams,
              subscriptions, billing, and payment history from one centralized
              workspace.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold transition hover:bg-gray-50"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Everything Your Organization Needs
            </h2>

            <p className="mt-4 text-gray-600">
              Manage your organization, members, subscription, and billing
              through a secure and isolated workspace.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold">Organizations</h3>
              <p className="mt-3 text-gray-600">
                Manage your organization profile and keep your business data
                isolated and secure.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold">Team Management</h3>
              <p className="mt-3 text-gray-600">
                Invite members, manage roles, and control access within your
                organization.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold">Subscriptions</h3>
              <p className="mt-3 text-gray-600">
                Choose a plan and manage your subscription from your
                organization dashboard.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold">Secure Payments</h3>
              <p className="mt-3 text-gray-600">
                Handle subscription payments securely through Stripe and keep a
                complete payment history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Get Started?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Create your organization, choose a plan, and activate your workspace
            securely.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-primary transition hover:bg-gray-100"
          >
            Create Organization
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
