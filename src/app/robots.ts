import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml` : 'https://sayan-quotes.vercel.app/sitemap.xml';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: sitemapUrl,
  }
}
