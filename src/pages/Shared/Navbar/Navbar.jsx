import React from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Octopi
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-primary" : "text-gray-600 hover:text-primary"
              }`
            }
          >
            Home
          </NavLink>

          <a
            href="/#plans"
            className="font-medium text-gray-600 transition hover:text-primary"
          >
            Plans
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="font-medium text-gray-700">
                {user.name || user.email}
              </span>

              <button
                onClick={logout}
                className="rounded-lg bg-gray-100 px-5 py-2 font-semibold text-gray-700 transition hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-primary px-5 py-2 font-semibold text-white transition hover:opacity-90"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end md:hidden">
          <button
            type="button"
            tabIndex={0}
            className="btn btn-ghost"
            aria-label="Open navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-50 mt-3 w-52 rounded-box bg-white p-3 shadow-lg"
          >
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <a href="/#plans">Plans</a>
            </li>

            {user ? (
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>

                <li>
                  <Link to="/register">Get Started</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
