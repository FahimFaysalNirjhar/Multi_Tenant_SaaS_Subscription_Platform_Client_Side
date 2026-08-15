import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-primary">
              Octopi
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600">
              A secure multi-tenant SaaS platform for managing organizations,
              teams, subscriptions, and payments.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-gray-900">Platform</h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/" className="transition hover:text-primary">
                  Home
                </Link>
              </li>

              <li>
                <a href="/plans" className="transition hover:text-primary">
                  Plans
                </a>
              </li>

              <li>
                <Link to="/register" className="transition hover:text-primary">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-gray-900">Account</h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/login" className="transition hover:text-primary">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="transition hover:text-primary">
                  Create Organization
                </Link>
              </li>

              <li>
                <Link
                  to="/forgot-password"
                  className="transition hover:text-primary"
                >
                  Forgot Password
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900">Contact</h3>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Have questions about the platform or your organization?
            </p>

            <a
              href="mailto:support@octopi.com"
              className="mt-3 inline-block text-sm font-medium text-primary transition hover:opacity-80"
            >
              support@octopi.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Octopi. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="#" className="transition hover:text-primary">
              Privacy Policy
            </a>

            <a href="#" className="transition hover:text-primary">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
