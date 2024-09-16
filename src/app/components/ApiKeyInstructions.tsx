const ApiKeyInstructions: React.FC = () => {
    return (
        <div className="bg-blue-50 p-4 rounded mb-8 shadow-md">
            <h2 className="text-xl font-bold mb-2 text-blue-800">APIキーの取得方法</h2>
            <ol className="list-decimal list-inside text-gray-700">
                <li>OpenAIのウェブサイト（<a href="https://platform.openai.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://platform.openai.com/</a>）にアクセスします。</li>
                <li>右上の「Sign up」をクリックしてアカウントを作成します。既にアカウントがある場合は「Log in」でログインします。</li>
                <li>ログイン後、右上のアカウントアイコンをクリックし、「View API keys」を選択します。</li>
                <li>「Create new secret key」ボタンをクリックして、新しいAPIキーを生成します。</li>
                <li>生成されたAPIキーをコピーし、安全な場所に保存してください。このキーは二度と表示されません。</li>
                <li>このウェブサイトの設定画面でAPIキーを入力してください。</li>
            </ol>
            <p className="mt-2 text-gray-600">注意：APIキーは秘密情報です。他人と共有したり、公開の場所に掲載したりしないでください。</p>
        </div>
    )
}

export default ApiKeyInstructions