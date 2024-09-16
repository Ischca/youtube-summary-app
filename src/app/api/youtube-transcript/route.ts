import { NextRequest, NextResponse } from 'next/server'
import { getTranscript } from '@/app/lib/youtubeApi'

export async function POST(request: NextRequest) {
  try {
    const { videoUrl } = await request.json()
    if (!videoUrl) {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 })
    }

    const transcript = await getTranscript(videoUrl)
    return NextResponse.json({ transcript })
  } catch (error) {
    console.error('Error fetching transcript:', error)
    return NextResponse.json({ error: 'Failed to fetch transcript' }, { status: 500 })
  }
}