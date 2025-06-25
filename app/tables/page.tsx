'use client';

import DuckDBTableList from '@/components/DuckDB/DuckDBTableList';
import { useAuth } from '@/lib/useAuth';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function TablesPage() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.username}</h1>
          <p>Role: {user?.role}</p>
          <p>Super Admin: {user?.is_super_admin ? 'Yes' : 'No'}</p>
        </div>
        <button
          onClick={() => {
            logout();
            router.push('/login');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* DuckDB Table List */}
      <DuckDBTableList />

      {/* Super Admin Panel Placeholder */}
      {user?.is_super_admin && (
        <div className="mt-6 bg-yellow-100 border border-yellow-300 p-4 rounded">
          <h2 className="font-bold">Admin Panel</h2>
          <p>This section is only visible to Super Admins.</p>
        </div>
      )}
    </div>
  );
}
