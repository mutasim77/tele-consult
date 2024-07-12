import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useChatSubscription(callback: () => void) {
    useEffect(() => {
        const subscription = supabase
            .channel('waiting_chats')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chats' }, callback)
            .subscribe();

        return () => {
            subscription.unsubscribe();
        }

    }, [callback]);
}