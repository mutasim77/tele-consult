import Image from 'next/image';

export default function ChatTable({
    chats,
    acceptChat
}: {
    chats: any[],
    acceptChat: (chatId: string) => void
}) {
    return (
        <div className="bg-light-background dark:bg-dark-background rounded-lg overflow-hidden shadow-lg border border-light-secondary dark:border-dark-secondary">
            <table className="w-full">
                <thead>
                    <tr className="bg-light-secondary dark:bg-dark-secondary">
                        <th className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">Language</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-light-secondary dark:divide-dark-secondary">
                    {chats.map((chat) => (
                        <tr key={chat.id} className="hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <Image
                                        src="/assets/user-avatar.png"
                                        alt="User Avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full mr-3"
                                    />
                                    <div>
                                        <p className="font-medium text-light-text dark:text-dark-text">{chat.users.name}</p>
                                        <p className="text-sm text-light-secondary dark:text-dark-secondary">ID: {chat.users.id.slice(0, 7)}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-light-accent dark:bg-dark-accent text-light-text">
                                    {chat.users.language}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-light-accent dark:bg-dark-accent text-light-text">
                                    🕒 {chat.created_at.slice(0, 5)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-light-text">
                                    ⏳ {chat.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => acceptChat(chat.id)}
                                    className="bg-button-primary hover:bg-button-hover text-button-text px-4 py-2 rounded-lg transition-colors duration-200"
                                >
                                    Accept
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}