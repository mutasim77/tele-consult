interface IFAQItem {
    question: string;
    answer: string;
}

interface IServiceData {
    categories: string[];
    faqItems: IFAQItem[];
}

interface IServices {
    id: string;
    name: string;
    icon: string;
}

export const services: IServices[] = [
    { id: 'mobile', name: 'Mobile', icon: '📱' },
    { id: 'wifi', name: 'LTE Wi-Fi router', icon: '📶' },
    { id: 'internet', name: 'Home Internet', icon: '🏠' },
    { id: 'life', name: 'Life', icon: '🍃' },
]

export const serviceData: { [key: string]: IServiceData } = {
    mobile: {
        categories: ['Plans', 'Coverage', 'International', 'Support'],
        faqItems: [
            { question: 'How to change my plan?', answer: 'You can change your plan by logging into your account on our website or app, and navigating to the "Plans" section.' },
            { question: 'How to check my balance?', answer: 'You can check your balance by dialing *123# from your mobile phone or by logging into your account on our website or app.' },
        ],
    },
    wifi: {
        categories: ['Setup', 'Troubleshooting', 'Plans'],
        faqItems: [
            { question: 'How to set up my router?', answer: 'To set up your router, follow the instructions provided in the user manual. If you encounter any issues, visit our support page or contact customer service.' },
            { question: 'What to do if my Wi-Fi is slow?', answer: 'If your Wi-Fi is slow, try restarting your router. If the issue persists, check for network congestion or contact our support team for further assistance.' },
        ],
    },
    internet: {
        categories: ['Plans', 'Speed', 'Support', 'Security'],
        faqItems: [
            { question: 'How to upgrade my internet plan?', answer: 'You can upgrade your internet plan by logging into your account on our website and selecting the "Plans" section. Choose your desired plan and follow the prompts to upgrade.' },
            { question: 'How to check my internet speed?', answer: 'You can check your internet speed by using our online speed test tool available on our website.' },
        ],
    },
    life: {
        categories: ['Installation', 'Features', 'Troubleshooting'],
        faqItems: [
            { question: 'How to install the mobile app?', answer: 'To install the mobile app, visit the App Store or Google Play Store on your device, search for our app, and click "Install".' },
            { question: 'What features does the mobile app offer?', answer: 'Our mobile app offers features such as account management, bill payment, usage tracking, and customer support.' },
        ],
    },
}