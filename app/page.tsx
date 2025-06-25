import TableList from "./components/TableList";


export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">DuckDB Admin UI</h1>
      <TableList />
    </main>
  );
}
