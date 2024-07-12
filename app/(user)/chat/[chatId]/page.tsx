'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { formatTime } from '@/lib/utils';
import { useChat, useChatId, useChatStatus, useScrollToBottom } from '@/hooks';
import { ChatInput, ChatMessages, ChatStatus } from '@/components';
import { LeaveChat } from '@/components/chat/LeaveChat';

export default function UserChat() {
    const [operatorId, setOperatorId] = useState<string | null>(null);
    const [operatorName, setOperatorName] = useState<string | undefined>('');
    const [userId, setUserId] = useState<string | null>(null);
    const isOperatorOnline = useChatStatus(operatorId || '', 'operator');
    const chatId = useChatId();

    const {
        messages,
        inputMessage,
        setInputMessage,
        isUploading,
        sendMessage,
        handleFileUpload
    } = useChat(chatId, userId || '');
    const messagesEndRef = useScrollToBottom(messages);

    useEffect(() => {
        fetchChatDetails();
        // eslint-disable-next-line 
    }, [chatId]);

    const fetchChatDetails = async () => {
        const { data, error } = await supabase
            .from('chats')
            .select('user_id, operator_id, operators(username, is_online)')
            .eq('id', chatId)
            .single<Chat>();

        if (error) {
            console.error('Error fetching chat details:', error);
        } else if (data) {
            setUserId(data.user_id);
            setOperatorId(data.operator_id);
            if (data.operator_id !== '00000000-0000-0000-0000-000000000000') {
                setOperatorName(data.operators?.username);
            }
        }
    }

    return (
        <div className="flex flex-col h-[70vh]">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-transparent bg-clip-text border-b-white">
                Support Chat
            </h1>
            {operatorId && <ChatStatus isOnline={isOperatorOnline} name={operatorName} />}
            {!isOperatorOnline && (
                <div className="bg-light-accent dark:bg-dark-accent bg-opacity-20 dark:bg-opacity-20 border-l-4 border-light-accent dark:border-dark-accent text-light-text dark:text-dark-text p-4 rounded" role="alert">
                    <p className="font-bold">Please wait</p>
                    <p>Wait a bit! An operator will join the chat soon...</p>
                </div>
            )}
            <ChatMessages
                messages={messages}
                currentUserId={userId || ''}
                formatTime={formatTime}
            />
            <div ref={messagesEndRef} />
            <ChatInput
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                handleFileUpload={handleFileUpload}
                isDisabled={!isOperatorOnline}
                isUploading={isUploading}
            />
            <LeaveChat userId={userId} userType="client" />
        </div>
    )
}