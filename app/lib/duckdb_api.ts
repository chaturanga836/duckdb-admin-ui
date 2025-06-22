// lib/duckdb_api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8081";

export async function fetchDuckDBTables(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/duckdb/tables`);
  if (!res.ok) throw new Error("Failed to fetch DuckDB tables");
  const data = await res.json();
  return data.tables;
}

export async function fetchTableRowCount(table: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/duckdb/table/${table}/count`);
  if (!res.ok) throw new Error(`Failed to get row count for table: ${table}`);
  const data = await res.json();
  return data.rows;
}
