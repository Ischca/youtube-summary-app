'use client'

import { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import SummaryForm from '@/app/components/SummaryForm'
import SummaryResult from '@/app/components/SummaryResult'
import UsageInstructions from '@/app/components/UsageInstructions'
import ApiKeyInstructions from '@/app/components/ApiKeyInstructions'
import ApiKeySetting from '@/app/components/ApiKeySetting'
import StructuredData from '@/app/components/StructuredData'

export default function Home() {
  const [summary, setSummary] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState<string>('')

  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey);
  };

  const handleSummarize = async (videoUrl: string) => {
    if (!apiKey) {
      setError('APIキーが設定されていません。APIキーを設定してください。');
      return;
    }

    setIsLoading(true)
    setError(null)
    setSummary('')

    try {
      const transcriptResponse = await fetch('/api/youtube-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl }),
      })

      if (!transcriptResponse.ok) {
        const errorData = await transcriptResponse.json()
        throw new Error(errorData.error || '文字起こしの取得に失敗しました')
      }

      const { transcript } = await transcriptResponse.json()

      const summaryResponse = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ transcript }),
      })

      if (!summaryResponse.ok) {
        const errorData = await summaryResponse.json()
        throw new Error(errorData.error || '要約に失敗しました')
      }

      const reader = summaryResponse.body?.getReader()
      if (!reader) {
        throw new Error('レスポンスの読み取りに失敗しました')
      }

      let accumulatedSummary = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = new TextDecoder().decode(value)
        accumulatedSummary += chunk
        setSummary(accumulatedSummary)
      }
    } catch (err) {
      console.error('Error in handleSummarize:', err)
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <StructuredData />
      <Header />

      <main className="flex-grow container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">YouTube動画要約ツール</h1>
        <div className='grid grid-cols-2 gap-10'>
          <div className=''>
            <UsageInstructions />
            <ApiKeyInstructions />
            <ApiKeySetting onApiKeyChange={handleApiKeyChange} />
          </div>
          <div>
            <SummaryForm onSummarize={handleSummarize} isLoading={isLoading} />
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <SummaryResult summary={summary} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}