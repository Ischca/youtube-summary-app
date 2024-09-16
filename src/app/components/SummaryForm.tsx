import React, { useState, FormEvent } from 'react'

interface SummaryFormProps {
    onSummarize: (videoUrl: string) => Promise<void>;
    isLoading: boolean;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ onSummarize, isLoading }) => {
    const [videoUrl, setVideoUrl] = useState<string>('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await onSummarize(videoUrl)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="YouTubeの動画URLを入力してください"
                required
                className="w-full p-2 border border-blue-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300 transition duration-300"
            >
                {isLoading ? '要約中...' : '要約する'}
            </button>
        </form>
    )
}

export default SummaryForm