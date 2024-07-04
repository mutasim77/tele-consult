interface QueueProps {
    language: string;
    users: string[];
}

const Queue: React.FC<QueueProps> = ({ language, users }) => {
    return (
        <div className="bg-light-secondary dark:bg-dark-secondary rounded p-4">
            <h2 className="text-xl mb-2">{language}</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index} className="mb-1">
                        {user}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Queue;