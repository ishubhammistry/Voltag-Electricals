// app/sitemap.ts

import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';

// This interface is correctly defined, we just need to use it consistently
interface SanitySlug {
  slug: { current: string };
  _updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.veproducts.com'; // Replace with your domain

  // Fetch all slugs for all content types
  const products: SanitySlug[] = await client.fetch(`*[_type in ["product", "subProduct"] && defined(slug.current)]{ "slug": slug, "_updatedAt": _updatedAt }`);
  const categories: SanitySlug[] = await client.fetch(`*[_type == "category" && defined(slug.current)]{ "slug": slug, "_updatedAt": _updatedAt }`);
  const posts: SanitySlug[] = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug, "_updatedAt": _updatedAt }`);

  // Use the SanitySlug type here
  const productUrls = products.map((item) => ({
    url: `${baseUrl}/products/${item.slug.current}`,
    lastModified: new Date(item._updatedAt),
  }));

  const categoryUrls = categories.map((item) => ({
    url: `${baseUrl}/categories/${item.slug.current}`,
    lastModified: new Date(item._updatedAt),
  }));

  const postUrls = posts.map((item) => ({
    url: `${baseUrl}/blog/${item.slug.current}`,
    lastModified: new Date(item._updatedAt),
  }));

  const staticUrls = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/store`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/pricelist`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date() },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date() },
  ];

  return [...staticUrls, ...productUrls, ...categoryUrls, ...postUrls];
}