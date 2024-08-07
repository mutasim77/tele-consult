'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function UserPage() {
    const [language, setLanguage] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username && language) {
            const { data: userData, error: userError } = await supabase
                .from('users')
                .insert({ name: username, language, is_online: true })
                .select()
                .single();

            if (userError) {
                console.error('Error creating user:', userError);
                return;
            }

            //? Create a new chat with the placeholder operator
            const { data: chatData, error: chatError } = await supabase
                .from('chats')
                .insert({
                    user_id: userData.id,
                    operator_id: '00000000-0000-0000-0000-000000000000',
                    status: 'waiting'
                })
                .select()
                .single();

            if (chatError) {
                console.error('Error creating chat:', chatError);
                return;
            }

            router.push(`/chat/${chatData.id}`);
        }
    }

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-transparent bg-clip-text">
                Chat with Operator
            </h1>
            <p className="text-center text-md text-light-secondary dark:text-dark-secondary mb-4">
                Get instant support in your preferred language
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        placeholder='Mutasim'
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-primary focus:border-light-primary  dark:border-gray-600 text-dark-grayDarkest"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Select Language
                    </label>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                        {['🇹🇯 Tajik', '🇷🇺 Russian', '🇬🇧 English'].map((lang) => (
                            <button
                                type="button"
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                className={`p-4 rounded-lg shadow-lg text-center border border-gray-300 dark:border-gray-600  ${language === lang ? 'bg-light-primary dark:bg-dark-primary text-white' : 'bg-light-lighterBackground dark:bg-dark-grayDarkest hover:bg-light-secondary dark:hover:bg-dark-secondary'}`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-button-primary hover:bg-button-hover text-button-text rounded-md transition-colors"
                >
                    Start Chat
                </button>
            </form>
        </div>
    );
}