'use client';

import { useState, useEffect } from 'react';
import { formatTime, setOperatorStatus } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import { ChatInput, ChatMessages, ChatStatus } from '@/components';
import { useChat, useChatId, useChatStatus, useOperatorAuth, useScrollToBottom } from '@/hooks';
import { LeaveChat } from '@/components/chat/LeaveChat';

export default function OperatorChat() {
    const [user, setUser] = useState<any>(null);
    const isUserOnline = useChatStatus(user?.id || '', 'client');
    const chatId = useChatId();
    const { operatorInfo } = useOperatorAuth();

    const {
        messages,
        inputMessage,
        setInputMessage,
        isUploading,
        sendMessage,
        handleFileUpload
    } = useChat(chatId, operatorInfo?.id || '');
    const messagesEndRef = useScrollToBottom(messages);

    useEffect(() => {
        if (chatId && operatorInfo) {
            fetchUserDetails();
            setOperatorStatus(operatorInfo.id, true);
        }

        return () => {
            setOperatorStatus(operatorInfo?.id!, false);
        }
        // eslint-disable-next-line 
    }, [chatId, operatorInfo]);

    const fetchUserDetails = async () => {
        const { data, error } = await supabase
            .from('chats')
            .select('users (id, name, is_online)')
            .eq('id', chatId)
            .single<Chat>();

        if (error) {
            console.error('Error fetching user details:', error);
        } else if (data && data.users) {
            setUser(data.users);
        }
    }

    if (!user || !operatorInfo?.id) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-[70vh]">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-transparent bg-clip-text border-b-white">
                Operator Console
            </h1>
            <ChatStatus isOnline={isUserOnline} name={user.name} />
            <ChatMessages
                messages={messages}
                currentUserId={operatorInfo?.id || ''}
                formatTime={formatTime}
            />
            <div ref={messagesEndRef} />
            <ChatInput
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                handleFileUpload={handleFileUpload}
                isDisabled={false}
                isUploading={isUploading}
            />
            <LeaveChat userId={operatorInfo.id} userType="operator" />
        </div>
    )
}