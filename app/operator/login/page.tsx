'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { loginOperator } from '@/lib/auth';

export default function OperatorLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const result = await loginOperator(username, password);
        if (result) {
            router.push('/operator');
        } else {
            setError('Invalid username or password');
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="relative mb-12">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 bg-light-primary dark:bg-dark-primary rounded-full opacity-10"></div>
                </div>
                <div className="relative flex flex-col items-center">
                    <div className="w-28 h-28 bg-light-primary dark:bg-dark-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <Image src="/assets/user-avatar.png" alt="Operator" width={90} height={90} className='rounded-full' />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-2">Operator <span className='text-button-primary'>Login</span></h1>
                        <p className="text-light-secondary dark:text-dark-secondary mb-4">
                            You should login before chatting with users. <br /> If you haven&apos;t received your credentials yet, please contact the admin.
                        </p>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <div className="flex items-center bg-light-lighterBackground dark:bg-dark-grayDarkest p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-primary dark:text-dark-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">Support</span>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 -mt-4 -ml-4">
                    <div className="w-8 h-8 bg-button-primary rounded-full animate-ping"></div>
                </div>
                <div className="absolute bottom-0 right-0 -mb-4 -mr-4">
                    <div className="w-8 h-8 bg-light-primary dark:bg-dark-primary rounded-full animate-pulse"></div>
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
                    <div className="bg-light-lighterBackground dark:bg-dark-grayDarkest p-2 rounded-lg shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-primary dark:text-dark-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                    <div className="bg-light-lighterBackground dark:bg-dark-grayDarkest p-2 rounded-lg shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-primary dark:text-dark-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
            <form className="space-y-6 w-full max-w-xs" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="rounded-md shadow-sm">
                        <input
                            type="text"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-button-text bg-button-primary hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                    >
                        Sign in
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-sm text-light-secondary dark:text-dark-secondary">

                        </p>
                    </div>
                    <div className='mt-4 text-center'>
                        <a href="/"
                            className="font-medium text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent"
                        >
                            Back to home
                        </a>
                    </div>
                </div>
                {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    )
}