import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sayan.uno';
  
  const routes = [
    '', 
    '/about', 
    '/contact', 
    '/privacy-policy', 
    '/terms-and-conditions', 
    '/shipping-policy', 
    '/refund-policy'
  ];

  return routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'monthly',
      priority: route === '' ? 1 : 0.8,
  }));
}
