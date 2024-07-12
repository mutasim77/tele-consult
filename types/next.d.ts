declare global {
    interface Message {
        sender_id: string;
        content: string;
        is_image: boolean;
        created_at: string;
    }

    interface ChatMessagesProps {
        messages: Message[];
        currentUserId: string;
        formatTime: (timestamp: string) => string;
    }

    interface ChatInputProps {
        inputMessage: string;
        setInputMessage: (message: string) => void;
        sendMessage: (message: string) => void;
        handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
        isDisabled: boolean;
        isUploading: boolean;
    }

    interface Chat {
        id: string;
        created_at?: string;
        status?: string | null;
        user_id: string;
        operator_id: string;
        operators?: {
            username: string;
            is_online: boolean;
        }
        users?: {
            id: string;
            name: string;
            language: string;
            is_online: boolean;
        }
    }
}

export { }