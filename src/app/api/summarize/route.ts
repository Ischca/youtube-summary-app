import { NextRequest, NextResponse } from 'next/server'
import { summarizeTextStream } from '@/app/lib/openaiApi'

export async function POST(request: NextRequest) {
  const { transcript } = await request.json()
  const apiKey = request.headers.get('Authorization')?.split(' ')[1]

  if (!apiKey) {
    return NextResponse.json({ error: 'APIキーが提供されていません' }, { status: 401 })
  }

  try {
    const stream = await summarizeTextStream(transcript, apiKey)
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Summarization error:', error)
    return NextResponse.json({ error: '要約に失敗しました' }, { status: 500 })
  }
}
