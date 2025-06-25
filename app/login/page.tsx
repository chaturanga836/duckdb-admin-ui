'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { login } = useAuth();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await login(username, password);
        if (!success) {
            alert('Invalid credentials');
            return;
        }

        router.push('/tables');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white shadow-md p-6 rounded space-y-4 w-80">
                <h2 className="text-xl font-bold">Login</h2>
                <input
                    className="w-full border px-3 py-2"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="w-full border px-3 py-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}
