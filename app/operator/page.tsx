'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/providers/SocketProvider';

export default function OperatorPage() {
    const { socket, isConnected } = useSocket();
    const [queues, setQueues] = useState<Record<string, string[]>>({});
    const router = useRouter();

    useEffect(() => {
        if (socket && isConnected) {
            socket.emit('register', { role: 'operator' });

            socket.on('queueUpdate', (updatedQueues: Record<string, string[]>) => {
                setQueues(updatedQueues);
            });
        }
    }, [socket, isConnected]);

    const acceptUser = (userId: string, language: string) => {
        if (socket) {
            socket.emit('acceptUser', { userId, language });
            router.push(`/operator/${userId}`);
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-transparent bg-clip-text">
                Welcome back, John!
            </h1>
            <p className="text-center text-md text-light-secondary dark:text-dark-secondary mb-4">
                Users are waiting for you. Pick a conversation to start.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(queues).map(([language, users]) => (
                    <div key={language} className="bg-light-background dark:bg-dark-background rounded-lg p-6 shadow-lg border border-white/10">
                        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">{language}</h2>
                        {users.length > 0 ? (
                            <ul className="space-y-2">
                                {users.map((userId) => (
                                    <li key={userId} className="flex justify-between items-center bg-light-secondary dark:bg-dark-secondary rounded p-3">
                                        <span className="text-light-text dark:text-dark-text">{userId.slice(0, 3)}</span>
                                        <button
                                            onClick={() => acceptUser(userId, language)}
                                            className="bg-button-primary hover:bg-button-hover text-button-text px-4 py-2 rounded-full transition-colors duration-200"
                                        >
                                            Accept
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-light-text dark:text-dark-text italic">No users waiting</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}