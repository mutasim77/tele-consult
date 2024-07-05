'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useSocket } from '@/providers/SocketProvider';
import Image from 'next/image';

export default function OperatorChat() {
    const { socket, isConnected } = useSocket();
    const [messages, setMessages] = useState<Array<{ from: string, message: string }>>([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const params = useParams<{ userId: string }>();
    const userId = params?.userId;

    useEffect(() => {
        if (socket && isConnected && userId) {
            console.log("ENTERED!! ")
            socket.on('message', ({ from, message }) => {
                console.log(from, userId, ' I CAME HERE')
                if (from === userId) {
                    setMessages(prev => [...prev, { from, message }]);
                }
            });
        }

        return () => {
            if (socket) {
                socket.off('message');
            }
        };
    }, [socket, isConnected, userId]);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (socket && userId && inputMessage.trim()) {
            socket.emit('message', { to: userId, message: inputMessage });
            setMessages(prev => [...prev, { from: 'operator', message: inputMessage }]);
            setInputMessage('');
        }
    };

    return (
        <div className="flex flex-col h-[70vh]">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-transparent bg-clip-text border-b-white">
                Operator Console
            </h1>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.from === 'operator' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-end ${msg.from === 'operator' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className="flex flex-shrink-0 items-end">
                                <div className="h-8 w-8 rounded-full bg-light-secondary dark:bg-dark-secondary flex items-center justify-center">
                                    <Image
                                        src={msg.from === 'operator' ? '/assets/operator-avatar.png' : '/assets/user-avatar.png'}
                                        alt={msg.from === 'operator' ? 'User Avatar' : 'Operator Avatar'}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                </div>
                            </div>
                            <div className={`mx-2 py-2 px-4 rounded-lg ${msg.from === 'operator'
                                ? 'bg-light-primary text-dark-text rounded-br-none'
                                : 'bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text rounded-bl-none'
                                }`}>
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-light-secondary dark:border-dark-secondary px-4 py-2">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 border border-light-secondary dark:border-dark-secondary rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-grayDarkest"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-button-primary text-button-text rounded-full px-4 py-2 font-semibold hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary disabled:opacity-50"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}