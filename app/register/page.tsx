'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { register } = useAuth();
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await register(username, password);

        if (!success) {
            alert('Registration failed. Please try again.');
            return;
        }

        alert('Registration successful! You can now log in.');
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleRegister} className="bg-white shadow-md p-6 rounded space-y-4 w-80">
                <h2 className="text-xl font-bold">Register</h2>
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
                <button className="w-full bg-green-600 text-white py-2 rounded" type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}
