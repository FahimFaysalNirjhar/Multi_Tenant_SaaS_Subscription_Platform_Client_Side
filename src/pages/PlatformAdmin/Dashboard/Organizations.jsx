import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const STATUS_STYLES = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  TRIAL: "bg-blue-100 text-blue-700",
  SUSPENDED: "bg-red-100 text-red-700",
  CANCELLED: "bg-gray-100 text-gray-600",
};

const Organizations = () => {
  const axiosSecure = useAxiosSecure();

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // =========================
  // Fetch Organizations
  // =========================
  const fetchOrganizations = async () => {
    try {
      setLoading(true);

      const response = await axiosSecure.get("/api/organizations");

      setOrganizations(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch organizations:", error);

      toast.error(
        error?.response?.data?.message || "Failed to load organizations.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // =========================
  // Suspend / Reactivate
  // =========================
  const handleToggleStatus = async (organization) => {
    const nextStatus =
      organization.status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";

    try {
      await axiosSecure.patch(`/api/organizations/${organization.id}/status`, {
        status: nextStatus,
      });

      toast.success(
        nextStatus === "ACTIVE"
          ? "Organization reactivated successfully."
          : "Organization suspended successfully.",
      );

      fetchOrganizations();
    } catch (error) {
      console.error("Status update error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update organization status.",
      );
    }
  };

  // =========================
  // Delete Organization
  // =========================
  const handleDelete = async (organization) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${organization.name}"?`,
    );

    if (!confirmed) return;

    try {
      await axiosSecure.delete(`/api/organizations/${organization.id}`);

      toast.success("Organization deleted successfully.");

      fetchOrganizations();
    } catch (error) {
      console.error("Delete organization error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete organization.",
      );
    }
  };

  // =========================
  // Search
  // =========================
  const filteredOrganizations = organizations.filter((organization) => {
    const searchValue = search.toLowerCase();

    return (
      organization.name?.toLowerCase().includes(searchValue) ||
      organization.admin?.email?.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage organizations registered on the platform.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or admin email..."
            className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Organization Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-60 items-center justify-center">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : filteredOrganizations.length === 0 ? (
            <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                No organizations found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {search
                  ? "Try a different search term."
                  : "There are no organizations yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Organization
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Admin
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Members
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Created
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredOrganizations.map((organization) => (
                    <tr
                      key={organization.id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Organization */}
                      <td className="px-6 py-5">
                        <p className="font-semibold text-gray-900">
                          {organization.name}
                        </p>
                      </td>

                      {/* Admin */}
                      <td className="px-6 py-5">
                        {organization.admin ? (
                          <div>
                            <p className="font-medium text-gray-800">
                              {organization.admin.name || "Unknown"}
                            </p>

                            <p className="text-sm text-gray-500">
                              {organization.admin.email}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">N/A</span>
                        )}
                      </td>

                      {/* Members */}
                      <td className="px-6 py-5">
                        <span className="font-medium text-gray-700">
                          {organization._count?.members ?? 0}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            STATUS_STYLES[organization.status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {organization.status}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-600">
                          {organization.createdAt
                            ? new Date(
                                organization.createdAt,
                              ).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleStatus(organization)}
                            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                              organization.status === "SUSPENDED"
                                ? "bg-green-50 text-green-600 hover:bg-green-100"
                                : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                            }`}
                          >
                            {organization.status === "SUSPENDED"
                              ? "Reactivate"
                              : "Suspend"}
                          </button>

                          <button
                            onClick={() => handleDelete(organization)}
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary */}
        {!loading && (
          <div className="mt-5 text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredOrganizations.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">
              {organizations.length}
            </span>{" "}
            organizations
          </div>
        )}
      </div>
    </div>
  );
};

export default Organizations;
