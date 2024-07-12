import { useState, useEffect } from 'react';

export function useOnlineStatus(): boolean {
    const [isOnline, setIsOnline] = useState<boolean>(true);

    useEffect(() => {
        function onlineHandler(): void {
            setIsOnline(true);
        }

        function offlineHandler(): void {
            setIsOnline(false);
        }

        window.addEventListener('online', onlineHandler);
        window.addEventListener('offline', offlineHandler);

        return () => {
            window.removeEventListener('online', onlineHandler);
            window.removeEventListener('offline', offlineHandler);
        }
    }, [])

    return isOnline;
}