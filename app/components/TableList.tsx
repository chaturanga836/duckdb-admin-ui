"use client";

import React, { useEffect, useState } from "react";
import { fetchDuckDBTables } from "@/app/lib/duckdb_api";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableList() {
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTables() {
      try {
        const result = await fetchDuckDBTables();
        setTables(result || []);
      } catch (err) {
        console.error("Failed to fetch tables", err);
      } finally {
        setLoading(false);
      }
    }
    loadTables();
  }, []);

  return (
    <Card className="mt-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-2">DuckDB Tables</h2>
        {loading ? (
          <Skeleton className="h-6 w-full" />
        ) : tables.length > 0 ? (
          <ul className="list-disc list-inside">
            {tables.map((table) => (
              <li key={table}>{table}</li>
            ))}
          </ul>
        ) : (
          <p>No tables found.</p>
        )}
      </CardContent>
    </Card>
  );
}
