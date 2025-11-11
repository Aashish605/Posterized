'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginContent() {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState('');

    useEffect(() => {
        const err = searchParams.get('error');
        if (err) setError('Sign in failed. Please try again.');
    }, [searchParams]);

    useEffect(() => {
        if (session) router.push('/Custom');
    }, [session, router]);

    return (
        <div className="text-white py-14 container mx-auto">
            <h1 className="text-center font-bold text-3xl">Login to Get Started</h1>

            {error && <div className="text-red-500 text-center mt-4">{error}</div>}

            <div className="flex flex-col gap-2 min-h-screen items-center p-10">
                <button
                    onClick={() => signIn('google')}
                    className="flex items-center w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <span>Continue with Google</span>
                </button>

                <button
                    onClick={() => signIn('github')}
                    className="flex items-center w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <span>Continue with GitHub</span>
                </button>
            </div>
        </div>
    );
}

export default function Login() {
    return (
        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}
