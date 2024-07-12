import Image from "next/image";

export default function ChatMessages({ messages, currentUserId, formatTime }: ChatMessagesProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-end ${msg.sender_id === currentUserId ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="flex flex-shrink-0 items-end">
                            <div className="h-8 w-8 rounded-full bg-light-secondary dark:bg-dark-secondary flex items-center justify-center">
                                <Image
                                    src={msg.sender_id === currentUserId ? '/assets/operator-avatar.png' : '/assets/user-avatar.png'}
                                    alt={msg.sender_id === currentUserId ? 'Current User Avatar' : 'Other User Avatar'}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <div className={`mx-2 py-2 px-4 rounded-lg ${msg.sender_id === currentUserId
                            ? 'bg-light-primary text-dark-text rounded-br-none'
                            : 'bg-[#676464] text-dark-text rounded-bl-none'
                            }`}>
                            {msg.is_image ? (
                                <Image src={msg.content} alt="Shared image" width={200} height={200} className='rounded-md' />
                            ) : (
                                <p>{msg.content}</p>
                            )}
                            <span className="text-xs text-end text-dark-grayDarkest block mt-1">
                                {formatTime(msg.created_at)}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}