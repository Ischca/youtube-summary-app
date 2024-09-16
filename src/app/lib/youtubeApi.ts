import axios from 'axios'
import { YoutubeTranscript } from 'youtube-transcript'

export async function getTranscript(videoUrl: string): Promise<string> {
  try {
    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      throw new Error('Invalid YouTube URL')
    }

    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId)
    return transcriptItems.map(item => item.text).join(' ')
  } catch (error) {
    console.error('Error in getTranscript:', error)
    throw new Error('Failed to fetch transcript')
  }
}

function extractVideoId(url: string): string | null {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}