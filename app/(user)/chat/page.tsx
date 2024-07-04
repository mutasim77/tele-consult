'use client';

import { UserChat, LanguageSelector } from '@/components';
import { useState } from 'react';

export default function ChatPage() {
    const [language, setLanguage] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
            {!language ? (
                <LanguageSelector onSelect={setLanguage} />
            ) : (
                <UserChat language={language} />
            )}
        </div>
    );
}