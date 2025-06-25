// app/lib/api.ts

import { API_BASE_URL } from "@/lib/config";

/**
 * Fetch all users (Admin only)
 */
export async function fetchUsers() {
  const token = localStorage.getItem("access_token");
  if (!token) return [];

  const res = await fetch(`${API_BASE_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch users", res.status);
    return [];
  }

  return res.json();
}

/**
 * Update user role (e.g., admin <-> user)
 */
export async function updateUserRole(userId: string, newRole: string) {
  const token = localStorage.getItem("access_token");
  if (!token) return;

  const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role: newRole }),
  });

  if (!res.ok) {
    console.error(`Failed to update role for user ${userId}`, res.status);
  }
}

export async function updateUserStatus(userId: string, isActive: boolean) {
  const token = localStorage.getItem("access_token");
  if (!token) return;

  await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ is_active: isActive }),
  });
}

export async function fetchAuditLogs() {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE_URL}/admin/logs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch audit logs");
  }

  return res.json();
}
