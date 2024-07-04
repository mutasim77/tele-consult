interface LanguageSelectorProps {
    onSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
    const languages = ['Tajik', 'Russian', 'English'];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-4">Select your language</h1>
            <div className="space-y-2">
                {languages.map((lang) => (
                    <button
                        key={lang}
                        onClick={() => onSelect(lang)}
                        className="w-full px-4 py-2 bg-button-primary hover:bg-button-hover text-button-text rounded transition-colors"
                    >
                        {lang}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelector;