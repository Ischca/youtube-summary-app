import React from 'react'

const StructuredData: React.FC = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "YouTube動画要約ツール",
        "description": "AIを使ってYouTube動画を簡単に要約するツールです。",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "JPY"
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}

export default StructuredData