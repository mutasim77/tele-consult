type Service = {
    id: string;
    name: string;
    icon: string;
}

type ServiceSelectorProps = {
    services: Service[];
    activeService: string;
    onServiceChange: (serviceId: string) => void;
}

export default function ServiceSelector({ services, activeService, onServiceChange }: ServiceSelectorProps) {
    return (
        <div className="flex flex-wrap justify-between">
            {services.map((service) => (
                <button
                    key={service.id}
                    className={`flex flex-col items-center p-2 m-1 rounded-lg ${activeService === service.id
                        ? 'bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text'
                        : 'text-light-secondary dark:text-dark-secondary'
                        }`}
                    onClick={() => onServiceChange(service.id)}
                >
                    <span className="text-2xl mb-1">{service.icon}</span>
                    <span className="text-xs text-center">{service.name}</span>
                </button>
            ))}
        </div>
    );
}