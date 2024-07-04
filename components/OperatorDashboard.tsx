'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/providers/SocketProvider';

export default function OperatorDashboard() {
    const { socket, isConnected } = useSocket();
    const [queue, setQueue] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (socket && isConnected) {
            socket.emit('register', { role: 'operator' });

            socket.on('queueUpdate', (updatedQueue) => {
                setQueue(updatedQueue);
            });
        }
    }, [socket, isConnected]);

    const acceptUser = (userId: string) => {
        if (socket) {
            socket.emit('acceptUser', userId);
            router.push(`/operator/${userId}`);
        }
    };

    return (
        <div>
            <h1>Operator Dashboard</h1>
            <h2>Users Waiting:</h2>
            <ul>
                {queue.map((userId) => (
                    <li key={userId}>
                        {userId} <button onClick={() => acceptUser(userId)}>Accept</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}