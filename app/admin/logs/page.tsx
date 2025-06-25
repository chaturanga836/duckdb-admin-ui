// app/admin/logs/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import AuditLogTable from "@/components/admin/AuditLogTable";


export default function AuditLogsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [canView, setCanView] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (!user.is_super_admin) router.replace("/");
    else setCanView(true);
  }, [user, router]);

  if (!canView) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>
      <AuditLogTable />
    </div>
  );
}
