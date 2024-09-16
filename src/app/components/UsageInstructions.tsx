const UsageInstructions: React.FC = () => {
    return (
        <div className="bg-blue-50 p-4 rounded mb-8 shadow-md">
            <h2 className="text-xl font-bold mb-2 text-blue-800">使用方法</h2>
            <ol className="list-decimal list-inside text-gray-700">
                <li>要約したいYouTube動画を見つけます。</li>
                <li>ブラウザのアドレスバーから動画のURLをコピーします。</li>
                <li>このページの入力欄にURLを貼り付けます。</li>
                <li>「要約する」ボタンをクリックします。</li>
                <li>AIが動画を処理している間、少々お待ちください。</li>
                <li>入力欄の下に表示される生成された要約をお読みください。</li>
            </ol>
            <p className="mt-2 text-gray-600">注意：このツールは、明確な話し言葉のコンテンツを含む動画で最も効果的です。音楽ビデオや対話の少ない動画では効果が低い場合があります。</p>
        </div>
    )
}

export default UsageInstructions