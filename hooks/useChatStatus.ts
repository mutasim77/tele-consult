import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useChatStatus(userId: string, userType: 'client' | 'operator') {
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const table = userType === 'client' ? 'users' : 'operators';

        const fetchCurrentStatus = async () => {
            const { data, error } = await supabase
                .from(table)
                .select('is_online')
                .eq('id', userId)
                .single();
            if (error) {
                console.error('Error fetching current status:', error);
            } else {
                setIsOnline(data.is_online);
            }
        };

        fetchCurrentStatus();

        const subscription = supabase.channel(`${table}:${userId}`)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: table,
                filter: `id=eq.${userId}`
            }, (payload) => {
                setIsOnline(payload.new.is_online);
            }).subscribe();

        return () => {
            subscription.unsubscribe();
        }

    }, [userId, userType]);

    return isOnline;
}