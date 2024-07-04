'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSocket } from '@/providers/SocketProvider';

export default function OperatorChat() {
    const { socket, isConnected } = useSocket();
    const [messages, setMessages] = useState<Array<{ from: string, message: string }>>([]);
    const [inputMessage, setInputMessage] = useState('');
    const params = useParams<{ userId: string }>();
    const userId = params?.userId;

    useEffect(() => {
        if (socket && isConnected && userId) {
            socket.on('message', ({ from, message }) => {
                if (from === userId) {
                    setMessages(prev => [...prev, { from, message }]);
                }
            });
        }
    }, [socket, isConnected, userId]);

    const sendMessage = () => {
        if (socket && userId && inputMessage.trim()) {
            socket.emit('message', { to: userId, message: inputMessage });
            setMessages(prev => [...prev, { from: 'operator', message: inputMessage }]);
            setInputMessage('');
        }
    };

    return (
        <div>
            <h1>Chat with User: {userId}</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.from}: {msg.message}</div>
                ))}
            </div>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}