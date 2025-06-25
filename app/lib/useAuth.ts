// app/lib/useAuth.ts
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/config';

export function useAuth() {
  const [user, setUser] = useState<{ username: string; role: string; is_super_admin: boolean } | null>(null);

  const loadUser = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
  };

  const login = async (username: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) return false;

    const { token } = await res.json();
    localStorage.setItem('access_token', token);
    await loadUser();
    return true;
  };

  const register = async (username: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    return res.ok;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return { user, login, logout, register, isLoggedIn: !!user };
}
