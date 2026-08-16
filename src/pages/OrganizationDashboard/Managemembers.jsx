import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ROLES = ["ADMIN", "MEMBER"];

const ManageMembers = () => {
  const axiosInstance = useAxiosSecure();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [invitations, setInvitations] = useState([]);
  const [invitationsLoading, setInvitationsLoading] = useState(true);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: "",
    role: "MEMBER",
  });
  const [inviting, setInviting] = useState(false);

  const [updatingId, setUpdatingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get("/api/organizations/members");
      setMembers(response.data.data);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Couldn't load members. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchInvitations = async () => {
    try {
      setInvitationsLoading(true);

      const response = await axiosInstance.get(
        "/api/organizations/invitations",
      );
      setInvitations(response.data.data);
    } catch (err) {
      // Non-critical — the members table is the main content, so a failed
      // invitations fetch shouldn't block the page. Just log it.
      console.error("Failed to load invitations:", err);
    } finally {
      setInvitationsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchInvitations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInviteChange = (event) => {
    const { name, value } = event.target;
    setInviteData((previous) => ({ ...previous, [name]: value }));
  };

  const handleInviteSubmit = async (event) => {
    event.preventDefault();

    try {
      setInviting(true);

      await axiosInstance.post("/api/organizations/members/invite", inviteData);

      toast.success(`Invite sent to ${inviteData.email}`);
      setShowInviteModal(false);
      setInviteData({ email: "", role: "MEMBER" });
      // The invited person becomes a member only once they accept, so they
      // won't show up in the members table yet — but the invitation itself
      // should now appear in the pending list below.
      fetchInvitations();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Couldn't send invite");
    } finally {
      setInviting(false);
    }
  };

  const handleRoleChange = async (memberId, newRole) => {
    try {
      setUpdatingId(memberId);

      await axiosInstance.patch(`/api/organizations/members/${memberId}/role`, {
        role: newRole,
      });

      setMembers((previous) =>
        previous.map((member) =>
          member.id === memberId ? { ...member, role: newRole } : member,
        ),
      );

      toast.success("Role updated");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Couldn't update role");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (member) => {
    const confirmed = window.confirm(
      `Remove ${member.name || member.email} from the organization?`,
    );
    if (!confirmed) return;

    try {
      setRemovingId(member.id);

      await axiosInstance.delete(`/api/organizations/members/${member.id}`);

      setMembers((previous) => previous.filter((m) => m.id !== member.id));
      toast.success("Member removed");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Couldn't remove member");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage who has access to your organization.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="rounded-lg bg-primary px-5 py-2.5 font-semibold text-white transition hover:opacity-90"
        >
          Invite member
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-medium text-red-700">{error}</p>
          <button
            onClick={fetchMembers}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && members.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="font-medium text-gray-900">No members yet</p>
          <p className="mt-1 text-sm text-gray-500">
            Invite your first teammate to get started.
          </p>
          <button
            onClick={() => setShowInviteModal(true)}
            className="mt-4 rounded-lg bg-primary px-5 py-2.5 font-semibold text-white transition hover:opacity-90"
          >
            Invite member
          </button>
        </div>
      )}

      {/* Members table */}
      {!loading && !error && members.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {member.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">{member.email}</td>

                  <td className="px-6 py-4">
                    <select
                      value={member.role}
                      disabled={updatingId === member.id}
                      onChange={(event) =>
                        handleRoleChange(member.id, event.target.value)
                      }
                      className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                    >
                      {ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role === "ADMIN" ? "Admin" : "Member"}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        member.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleRemove(member)}
                      disabled={removingId === member.id}
                      className="font-medium text-red-600 transition hover:text-red-700 disabled:opacity-60"
                    >
                      {removingId === member.id ? "Removing..." : "Remove"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pending Invitations */}
      {!invitationsLoading && invitations.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Pending invitations
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Invited</th>
                  <th className="px-6 py-3 font-medium">Expires</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {invitations.map((invitation) => (
                  <tr key={invitation.id}>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {invitation.email}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                        {invitation.role === "ADMIN" ? "Admin" : "Member"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {new Date(invitation.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {new Date(invitation.expiresAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invite modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900">Invite a member</h2>
            <p className="mt-1 text-sm text-gray-500">
              They'll get an email with a link to join.
            </p>

            <form onSubmit={handleInviteSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={inviteData.email}
                  onChange={handleInviteChange}
                  required
                  placeholder="sam@acme.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={inviteData.role}
                  onChange={handleInviteChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role === "ADMIN" ? "Admin" : "Member"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={inviting}
                  className="flex-1 rounded-lg bg-primary px-4 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {inviting ? "Sending..." : "Send invite"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
