'use client'

import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export default function OnlineStatus({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isOnline = useOnlineStatus();

    return (
        <>
            {children}
            {!isOnline && <OfflineAlert />}
        </>
    )
}

function OfflineAlert() {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                    <p className="text-6xl mb-4">😢</p>
                    <h2 className="text-2xl font-bold mb-2">You&apos;re offline!</h2>
                    <p className="mb-4">Please check your internet connection to continue using the app.</p>
                    <div className="animate-bounce">
                        <svg className="w-6 h-6 mx-auto text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}