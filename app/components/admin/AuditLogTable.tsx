"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { fetchAuditLogs } from "@/lib/api";

type AuditLogEntry = {
  timestamp: string;
  action: string;
  performed_by: string;
  target_user: string;
  details: string;
};

export default function AuditLogTable() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  useEffect(() => {
    fetchAuditLogs()
      .then(setLogs)
      .catch((err) => console.error("Audit log fetch failed:", err));
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>By</TableHead>
          <TableHead>Target</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log, idx) => (
          <TableRow key={idx}>
            <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
            <TableCell>{log.action}</TableCell>
            <TableCell>{log.performed_by}</TableCell>
            <TableCell>{log.target_user}</TableCell>
            <TableCell>{log.details}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
