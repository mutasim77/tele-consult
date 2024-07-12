import { useParams } from 'next/navigation';

export function useChatId() {
    const params = useParams();
    const chatId = params?.chatId as string;

    return chatId;
}