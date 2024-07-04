'use client';

import { useSocket } from '@/providers/SocketProvider';
import React, { useState, useEffect } from 'react';

export default function UserChat({ language }: { language?: string }) {
    const { socket, isConnected } = useSocket();
    const [messages, setMessages] = useState<Array<{ from: string, message: string }>>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [operatorId, setOperatorId] = useState<string | null>(null);

    useEffect(() => {
        if (socket && isConnected) {
            socket.emit('register', { role: 'user', language: 'English' }); // You can make language dynamic

            socket.on('operatorJoined', (opId) => {
                setOperatorId(opId);
                setMessages(prev => [...prev, { from: 'system', message: 'Operator has joined the chat. You can now ask your question.' }]);
            });

            socket.on('message', ({ from, message }) => {
                setMessages(prev => [...prev, { from, message }]);
            });
        }
    }, [socket, isConnected]);

    const sendMessage = () => {
        if (socket && operatorId && inputMessage.trim()) {
            socket.emit('message', { to: operatorId, message: inputMessage });
            setMessages(prev => [...prev, { from: 'user', message: inputMessage }]);
            setInputMessage('');
        }
    };

    return (
        <div>
            {!operatorId && <p>Please wait, an operator will join soon...</p>}
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.from}: {msg.message}</div>
                ))}
            </div>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={!operatorId}
            />
            <button onClick={sendMessage} disabled={!operatorId}>Send</button>
        </div>
    );
}