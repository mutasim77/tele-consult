'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { ChatTable } from '@/components';
import { useChatSubscription, useOperatorAuth } from '@/hooks';

export default function OperatorPage() {
    const [waitingChats, setWaitingChats] = useState<any[]>([]);
    const { operatorInfo } = useOperatorAuth();
    const router = useRouter();

    useChatSubscription(fetchWaitingChats);

    useEffect(() => {
        if (operatorInfo) {
            fetchWaitingChats();
        }
    }, [operatorInfo]);

    async function fetchWaitingChats() {
        const { data, error } = await supabase
            .from('chats')
            .select(`
                id,
                users (id, name, language),
                status,
                created_at
            `)
            .eq('status', 'waiting')
            .eq('operator_id', '00000000-0000-0000-0000-000000000000');

        if (error) {
            console.error('Error fetching waiting chats:', error);
        } else {
            setWaitingChats(data || []);
        }
    }

    const acceptChat = async (chatId: string) => {
        if (!operatorInfo) {
            console.error('No operator ID found. Please log in again.');
            router.push('/operator/login');
            return;
        }

        const { error } = await supabase
            .from('chats')
            .update({
                operator_id: operatorInfo.id,
                status: 'active'
            })
            .eq('id', chatId);

        if (error) {
            console.error('Error accepting chat:', error);
        } else {
            router.push(`/operator/${chatId}`);
        }
    }


    if (!operatorInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-transparent bg-clip-text">
                    Welcome back, {operatorInfo.name}!
                </h1>
                <p className="mt-2 text-center text-lg text-light-secondary dark:text-dark-secondary">
                    Users are waiting for you. Pick a conversation to start.
                </p>
            </header>
            <ChatTable chats={waitingChats} acceptChat={acceptChat} />
            {waitingChats.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-xl text-light-secondary dark:text-dark-secondary">
                        No waiting chats at the moment.
                    </p>
                </div>
            )}
        </div>
    );
}