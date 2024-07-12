'use client'

import { useRef } from 'react';

export default function ChatInput({
    inputMessage,
    setInputMessage,
    sendMessage,
    handleFileUpload,
    isDisabled,
    isUploading
}: ChatInputProps
) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="border-t border-light-secondary dark:border-dark-secondary p-4">
            <div className="flex space-x-2">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isDisabled || isUploading}
                    className="bg-button-primary text-button-text rounded-full p-2 hover:bg-opacity-80 transition-colors"
                >
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                />
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={isDisabled || isUploading}
                    placeholder={isUploading ? "Uploading file..." : "Type a message..."}
                    className="flex-1 border border-light-secondary dark:border-dark-secondary rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text bg-white dark:bg-dark-grayDarkest disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    onClick={() => sendMessage(inputMessage)}
                    disabled={isDisabled || inputMessage.trim() === '' || isUploading}
                    className="bg-button-primary text-button-text rounded-full px-6 py-2 font-semibold hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>
        </div>
    );
};
