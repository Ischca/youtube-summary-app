import OpenAI from 'openai'

export async function summarizeTextStream(text: string, apiKey: string): Promise<ReadableStream> {
  const openai = new OpenAI({ apiKey })

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-2024-08-06",
    messages: [
        {
            role: "system",
            content: `
            以下の指示に従って、提供されたYouTube動画の文字起こしを要約してください：
            1. 動画の主題を1-2文で簡潔に述べてください。
            2. 以下の構造に従って、動画の内容を詳細に要約してください：
            a. 背景情報
                - 話題の歴史的コンテキストや重要性を説明してください。
            b. 主要な概念や用語の定義
                - 動画内で説明される重要な概念や専門用語を定義してください。
            c. 主な論点や主張
                - 話者が提示する主要な論点や主張を箇条書きで列挙してください。
                - 各論点に対する話者の見解や提供される例を簡潔に説明してください。
            d. 一般的な誤解や課題
                - 話題に関する一般的な誤解や課題があれば、それらを特定し説明してください。
            e. 提案される解決策や推奨事項
                - 話者が提案する解決策や推奨事項があれば、それらをまとめてください。
            f. 結論や重要なメッセージ
                - 動画の主要なテイクアウェイや結論を1-2文で要約してください。
            3. 全体の要約は、明確で簡潔な文章を使用し、専門用語は必要に応じて簡単な説明を加えてください。
            4. 要約全体の長さは約500-700語に収めてください。
            5. 読みやすさを考慮し、適切な見出しや箇条書きを使用して情報を構造化してください。
            6. [これは最も重要です] 文字起こし内に含まれている固有名詞などから背景情報を推察し、できるかぎり文脈を汲み取った上で要約を行ってください。
            `
        },
      { role: "user", content: `以下のテキストを要約してください:\n\n${text}` }
    ],
      stream: true,
      max_tokens: 2000,
      temperature: 0.7,
  })

  return new ReadableStream({
    async start(controller) {
      for await (const part of stream) {
        const chunk = part.choices[0]?.delta?.content || ''
        controller.enqueue(chunk)
      }
      controller.close()
    },
  })
}