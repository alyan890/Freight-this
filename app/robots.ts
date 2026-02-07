import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.freightthis.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/profile/', '/reset-password/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
