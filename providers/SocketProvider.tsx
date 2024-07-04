'use client';

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { io as ClientIO, Socket } from 'socket.io-client';

type SocketContextType = {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    isConnected: false,
    socket: null,
})

export const useSocket = () => useContext(SocketContext);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

        if (!siteUrl) {
            console.log('NEXT_PUBLIC_SITE_URL is not defined');
            return;
        }

        const socketInstance = ClientIO(siteUrl, {
            path: '/api/socket/io',
            addTrailingSlash: false,
        });

        socketInstance.on('connect', () => {
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}