import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useChatStatus(userId: string, userType: 'client' | 'operator') {
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        if (!userId) return;
        const table = userType === 'client' ? 'users' : 'operators';

        updateOnlineStatus(true);

        const subscription = supabase
            .channel(`${userType}:${userId}`)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: table,
                filter: `id=eq.${userId}`
            }, (payload) => {
                setIsOnline(payload.new.is_online);
            })
            .subscribe();

        updateOnlineStatus(true);

        return () => {
            subscription.unsubscribe();
            updateOnlineStatus(false);
        }

        // eslint-disable-next-line
    }, [userId, userType]);

    const updateOnlineStatus = async (status: boolean) => {
        const table = userType === 'client' ? 'users' : 'operators';
        const { error } = await supabase
            .from(table)
            .update({ is_online: status })
            .eq('id', userId);

        if (error) {
            console.error(`Error updating ${userType} status:`, error);
        }
    }

    return isOnline;
}