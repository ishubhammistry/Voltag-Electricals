// app/robots.ts

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.veproducts.com'; // IMPORTANT: Replace with your actual domain

  return {
    rules: {
      userAgent: '*', // Applies to all search engine bots
      allow: '/',      // Allow crawling of all pages
      // disallow: '/private/', // Example: use this to block specific pages
    },
    sitemap: `${baseUrl}/sitemap.xml`, // Location of your sitemap
  };
}