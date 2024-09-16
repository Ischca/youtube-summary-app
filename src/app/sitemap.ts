import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.HOST + '/',
      lastModified: new Date(),
    },
    // 他のページも必要に応じて追加
  ]
}