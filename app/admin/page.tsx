// app/admin/page.tsx
"use client";

import { useAuth } from "@/lib/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner"; // optional loading spinner
import UserTable from "@/components/admin/UserTable";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // wait for auth to load
    if (!user.is_super_admin) router.replace("/");
    else setLoading(false);
  }, [user, router]);

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <UserTable />
    </div>
  );
}
