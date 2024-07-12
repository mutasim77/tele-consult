import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export function LeaveChat({ userId, userType }: { userId: string | null, userType: 'client' | 'operator' }) {
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

    const handleLeave = async () => {
        const table = userType === 'client' ? 'users' : 'operators';
        await supabase
            .from(table)
            .update({ is_online: false })
            .eq('id', userId);
        router.push('/');
    };

    return (
        <>
            <button onClick={() => setShowPopup(true)} className="bg-red-500 text-white px-4 py-2 rounded">
                Leave Chat
            </button>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white text-black p-6 rounded">
                        <p>Are you sure you want to leave the conversation?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button onClick={() => setShowPopup(false)} className="bg-gray-300 px-4 py-2 rounded">
                                Cancel
                            </button>
                            <button onClick={handleLeave} className="bg-red-500 text-white px-4 py-2 rounded">
                                Leave
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}