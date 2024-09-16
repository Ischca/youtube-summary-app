import React, { useState, useEffect } from 'react';

interface ApiKeySettingProps {
    onApiKeyChange: (apiKey: string) => void;
}

const ApiKeySetting: React.FC<ApiKeySettingProps> = ({ onApiKeyChange }) => {
    const [apiKey, setApiKey] = useState<string>('');

    useEffect(() => {
        const storedApiKey = localStorage.getItem('openai_api_key');
        if (storedApiKey) {
            setApiKey(storedApiKey);
            onApiKeyChange(storedApiKey);
        }
    }, [onApiKeyChange]);

    const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(e.target.value);
    };

    const handleSaveApiKey = () => {
        localStorage.setItem('openai_api_key', apiKey);
        onApiKeyChange(apiKey);
        alert('APIキーが保存されました。');
    };

    return (
        <div className="bg-blue-50 p-4 rounded mb-8 shadow-md">
            <h2 className="text-xl font-bold mb-2 text-blue-800">APIキー設定</h2>
            <input
                type="password"
                value={apiKey}
                onChange={handleApiKeyChange}
                placeholder="OpenAI APIキーを入力してください"
                className="w-full p-2 border border-blue-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSaveApiKey}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
            >
                APIキーを保存
            </button>
        </div>
    );
};

export default ApiKeySetting;