import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useChat(chatId: string, currentUserId: string) {
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const subscription = supabase
            .channel(`chat:${chatId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `chat_id=eq.${chatId}`
            }, (payload) => {
                setMessages(current => [...current, payload.new]);
            })
            .subscribe();

        fetchMessages();

        return () => {
            subscription.unsubscribe();
        };
        // eslint-disable-next-line
    }, [chatId]);

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('chat_id', chatId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching messages:', error);
        } else {
            setMessages(data || []);
        }
    }

    const sendMessage = async (content: string, isFile: boolean = false) => {
        if ((content.trim() || isFile) && currentUserId) {
            const { error } = await supabase
                .from('messages')
                .insert({
                    chat_id: chatId,
                    content: content,
                    sender_id: currentUserId,
                    is_image: isFile
                });

            if (error) {
                console.error('Error sending message:', error);
            } else {
                setInputMessage('');
            }
        }
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && currentUserId) {
            setIsUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${currentUserId}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('chat-files')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Error uploading file:', uploadError);
            } else {
                const { data } = supabase.storage.from('chat-files').getPublicUrl(filePath);
                if (data) {
                    await sendMessage(data.publicUrl, true);
                }
            }
            setIsUploading(false);
        }
    }

    return {
        messages,
        inputMessage,
        setInputMessage,
        isUploading,
        sendMessage,
        handleFileUpload
    }
}
