import { useState } from "react";

type FAQItem = {
    question: string;
    answer: string;
}

type FAQListProps = {
    faqItems: FAQItem[];
}

export default function FAQList({ faqItems }: FAQListProps) {
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

    return (
        <div className="w-full md:w-3/4 p-4">
            <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">Top Questions</h2>
            {faqItems.map((item, index) => (
                <div key={index} className="mb-4">
                    <button
                        className="flex justify-between w-full text-left p-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                        onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                    >
                        <span>{item.question}</span>
                        <span>{expandedQuestion === index ? '▲' : '▼'}</span>
                    </button>
                    {expandedQuestion === index && (
                        <div className="p-2 bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}