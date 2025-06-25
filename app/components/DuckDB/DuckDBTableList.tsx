"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDuckDBTables, fetchTableRowCount } from "@/lib/duckdb_api";

// import { fetchDuckDBTables, fetchTableRowCount } from "@/lib/duckdb_api";

export default function DuckDBTableList() {
  const [tables, setTables] = useState<string[]>([]);
  const [rowCounts, setRowCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTables = async () => {
      try {
        const fetched = await fetchDuckDBTables();
        setTables(fetched);

        const counts: Record<string, number> = {};
        await Promise.all(
          fetched.map(async (table:any) => {
            try {
              counts[table] = await fetchTableRowCount(table);
            } catch {
              counts[table] = -1;
            }
          })
        );

        setRowCounts(counts);
      } catch (err) {
        setError("Failed to load DuckDB table metadata.");
      } finally {
        setLoading(false);
      }
    };

    loadTables();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive" className="mt-6">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">DuckDB Tables</h2>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Table</TableHead>
              <TableHead>Row Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tables.map((table) => (
              <TableRow key={table}>
                <TableCell>{table}</TableCell>
                <TableCell>
                  {rowCounts[table] === -1 ? "Error" : rowCounts[table] ?? "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
