import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YouTube動画要約ツール | AIを使った簡単な要約サービス',
  description: 'YouTubeの動画を簡単に要約。AIを使って効率的に内容を把握できます。時間節約、学習効率アップに最適なツールです。',
  keywords: 'YouTube, 動画要約, AI, 効率化, 学習ツール',
  openGraph: {
    title: 'YouTube動画要約ツール | 効率的な学習をサポート',
    description: 'AIを使ってYouTube動画を簡単に要約。時間を節約し、効率的に内容を理解できます。',
    images: [
      {
        url: process.env.HOST + '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'YouTube動画要約ツールのイメージ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube動画要約ツール',
    description: 'AIでYouTube動画を簡単要約。効率的な学習をサポート。',
    images: [
      process.env.HOST + '/images/og-image.webp',
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-white text-gray-800">{children}</body>
    </html>
  )
}