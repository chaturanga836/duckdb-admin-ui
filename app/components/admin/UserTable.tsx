"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { fetchUsers, updateUserRole, updateUserStatus } from "@/lib/api";

type User = {
  id: string;
  username: string;
  role: string;
  is_active: boolean;
};

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleToggleRole = async (id: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    await updateUserRole(id, newRole);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    const newStatus = !isActive;
    await updateUserStatus(id, newStatus);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, is_active: newStatus } : u))
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <span
                className={`font-medium ${
                  user.is_active ? "text-green-600" : "text-red-500"
                }`}
              >
                {user.is_active ? "Active" : "Inactive"}
              </span>
            </TableCell>
            <TableCell className="space-x-2">
              <Button size="sm" onClick={() => handleToggleRole(user.id, user.role)}>
                Toggle Role
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleToggleStatus(user.id, user.is_active)}
              >
                {user.is_active ? "Deactivate" : "Reactivate"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
