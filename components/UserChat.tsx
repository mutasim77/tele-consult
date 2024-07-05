'use client';

import { useSocket } from '@/providers/SocketProvider';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function UserChat({ language, username }: { language: string, username: string }) {
    const { socket, isConnected } = useSocket();
    const [messages, setMessages] = useState<Array<{ from: string, message: string }>>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [operatorId, setOperatorId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (socket && isConnected) {
            socket.emit('register', { role: 'user', language });

            socket.on('operatorJoined', (opId) => {
                setOperatorId(opId);
                setMessages(prev => [...prev, { from: 'system', message: 'Operator has joined the chat. You can now ask your question.' }]);
            });

            socket.on('message', ({ from, message }) => {
                setMessages(prev => [...prev, { from, message }]);
            });
        }

        return () => {
            if (socket) {
                socket.off('operatorJoined');
                socket.off('message');
            }
        }
    }, [socket, isConnected, language]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (socket && operatorId && inputMessage.trim()) {
            socket.emit('message', { to: operatorId, message: inputMessage });
            setMessages(prev => [...prev, { from: 'user', message: inputMessage }]);
            setInputMessage('');
        }
    };

    return (
        <div className="flex flex-col h-[70vh]">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-transparent bg-clip-text border-b-white">
                Support Chat
            </h1>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {!operatorId && (
                    <div className="bg-light-accent dark:bg-dark-accent bg-opacity-20 dark:bg-opacity-20 border-l-4 border-light-accent dark:border-dark-accent text-light-text dark:text-dark-text p-4 rounded" role="alert">
                        <p className="font-bold">Please wait</p>
                        <p>Hey <i className='text-dark-primary'>{username}</i> wait a bit! operator will join the chat soon...</p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-end ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className="flex flex-shrink-0 items-end">
                                <div className="h-8 w-8 rounded-full bg-light-secondary dark:bg-dark-secondary flex items-center justify-center">
                                    <Image
                                        src={msg.from === 'user' ? '/assets/user-avatar.png' : '/assets/operator-avatar.png'}
                                        alt={msg.from === 'user' ? 'User Avatar' : 'Operator Avatar'}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                </div>
                            </div>
                            <div className={`mx-2 py-2 px-4 rounded-lg ${msg.from === 'user'
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
                        disabled={!operatorId}
                        placeholder={operatorId ? "Type a message..." : "Waiting for operator..."}
                        className="flex-1 border border-light-secondary dark:border-dark-secondary rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-grayDarkest"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!operatorId}
                        className="bg-button-primary text-button-text rounded-full px-4 py-2 font-semibold hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary disabled:opacity-50"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}