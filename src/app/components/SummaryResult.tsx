import React, { useEffect, useRef } from 'react';
import MarkdownRenderer from '@/app/components/MarkdownRenderer';

interface SummaryResultProps {
    summary: string;
}

const SummaryResult: React.FC<SummaryResultProps> = ({ summary }) => {
    const resultRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [summary]);

    return (
        <div className="bg-blue-50 p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2 text-blue-800">要約結果</h2>
            <div
                ref={resultRef}
                className="whitespace-pre-wrap max-h-60 overflow-y-auto"
            >
                <MarkdownRenderer content={summary} />
            </div>
        </div>
    );
};

export default SummaryResult;