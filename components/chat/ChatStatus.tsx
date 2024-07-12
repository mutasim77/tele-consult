export default function ChatStatus({
    isOnline,
    name
}: {
    isOnline: boolean;
    name?: string;
}) {
    return (
        <div className='text-center'>
            <h2 className="text-md text-light-secondary font-bold">Chat with {name}</h2>
            <p className="text-sm flex items-center justify-center opacity-75">
                <span className={`block w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {isOnline ? 'Active' : 'Inactive'}
            </p>
        </div>
    )
}