'use client'

import Link from 'next/link';
import { useState } from 'react';
import { serviceData, services } from '@/lib/constants';

export default function HelpPage() {
    const [activeService, setActiveService] = useState(services[0].id);

    const handleServiceChange = (serviceId: string) => setActiveService(serviceId);
    const currentServiceData = serviceData[activeService as keyof typeof serviceData];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-transparent bg-clip-text">
                    TeleConsult Help
                </h1>
                <p className="text-center text-lg text-light-secondary dark:text-dark-secondary mb-4">
                    Find answers, explore services, or connect with an operator
                </p>
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent rounded-full"></div>
            </div>
            <div className="flex h-[620px] rounded-tr-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text text-center md:text-start">
                <CategoryList categories={currentServiceData.categories} />
                <div className="flex-grow p-6 w-full max-w-[530px]">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">Services</h2>
                        <div className="flex flex-wrap gap-2">
                            {services.map((service) => (
                                <button
                                    key={service.id}
                                    className={`flex items-center p-2 rounded-lg transition-colors border border-dark-secondary dark:border-white/10 ${activeService === service.id
                                        ? 'bg-light-primary dark:bg-dark-primary text-white'
                                        : 'bg-light-lighterBackground dark:bg-dark-grayDarkest hover:bg-light-secondary dark:hover:bg-dark-secondary'
                                        }`}
                                    onClick={() => handleServiceChange(service.id)}
                                >
                                    <span className="text-2xl mr-2">{service.icon}</span>
                                    <span className="text-sm">{service.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <FAQList faqItems={currentServiceData.faqItems} />
                </div>
            </div>
            <div className="mt-6 text-center">
                <Link
                    href="/chat"
                    className="inline-block bg-button-primary hover:bg-button-hover text-button-text font-bold py-2 px-6 rounded-full transition-colors"
                >
                    ☎️ Connect with Operator
                </Link>
            </div>
        </div>

    )
}

function CategoryList({ categories }: { categories: string[] }) {
    return (
        <div className="w-64 p-6 bg-light-lighterBackground rounded-bl-lg dark:bg-dark-grayDarkest border-r border-light-secondary dark:border-dark-secondary hidden md:block">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
                {categories.map((category, index) => (
                    <li key={index} className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors cursor-pointer">
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function FAQList({ faqItems }: { faqItems: { question: string, answer: string }[] }) {
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqItems.map((item, index) => (
                    <div key={index} className="border border-light-secondary dark:border-dark-secondary rounded-lg overflow-hidden">
                        <button
                            className="flex justify-between w-full text-left p-4 bg-light-lighterBackground dark:bg-dark-grayDarkest hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors"
                            onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                        >
                            <span>{item.question}</span>
                            <span>{expandedQuestion === index ? '▲' : '▼'}</span>
                        </button>
                        {expandedQuestion === index && (
                            <div className="p-4 bg-white dark:bg-gray-800">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}