'use client'

import { useSocket } from "@/providers/SocketProvider";

export default function SocketIndicator() {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <div className="bg-yellow-600">WS is Connecting....</div>
        )
    }

    return (
        <div className="bg-emerald-600">WS Connected Successfully!!!</div>
    )
}