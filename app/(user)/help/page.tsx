'use client'

import Link from 'next/link';
import { useState } from 'react';
import { serviceData, services } from '@/lib/constants';
import { FAQList, ServiceSelector, CategoryList } from '@/components';

export default function HelpPage() {
    const [activeService, setActiveService] = useState(services[0].id);

    const handleServiceChange = (serviceId: string) => setActiveService(serviceId);
    const currentServiceData = serviceData[activeService as keyof typeof serviceData];

    return (
        <div className="flex flex-col items-center p-8 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-xl shadow-lg w-full max-w-2xl mx-auto">
            <ServiceSelector
                services={services}
                activeService={activeService}
                onServiceChange={handleServiceChange}
            />
            <div className="flex flex-col md:flex-row mt-4 flex-grow">
                <CategoryList categories={currentServiceData.categories} />
                <FAQList faqItems={currentServiceData.faqItems} />
            </div>
            <div className="text-center mt-4">
                <Link
                    href="/chat"
                    className="bg-button-primary hover:bg-button-hover text-button-text font-bold py-2 px-4 rounded"
                >
                    Connect with Operator
                </Link>
            </div>
        </div>
    )
}