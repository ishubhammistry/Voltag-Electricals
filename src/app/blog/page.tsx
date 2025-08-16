import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Metadata } from 'next'; // ✅ SEO: Import Metadata type

// --- TYPE DEFINITION ---
interface SanityImage {
  asset: {
    _ref: string;
    _type: 'reference';
  };
}
interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: SanityImage;
  publishedAt: string;
  description?: string; // ✅ SEO: Added for structured data
}

// --- SEO METADATA ---
/**
 * ✅ SEO: Define static metadata for the main blog page. This improves search engine
 * visibility with a clear title, description, keywords, and social sharing tags.
 */
export const metadata: Metadata = {
  title: 'Blog | Industrial Automation & Electrical Insights | Voltag Electricals',
  description: 'Latest news, articles, and insights from the world of industrial automation, PLCs, HMIs, and electrical controls. Your expert source in Vadodara.',
  keywords: ['industrial automation blog', 'Voltag Electricals blog', 'PLC programming', 'HMI design', 'electrical controls', 'Vadodara'],
  alternates: {
    canonical: 'https://veproducts.in/blog',
  },
  openGraph: {
    title: 'Blog | Industrial Automation & Electrical Insights | Voltag Electricals',
    description: 'Latest news, articles, and insights from the world of industrial automation.',
    url: 'https://veproducts.in/blog',
    images: ['/og-image.png'], // Replace with a specific blog banner OG image if available
    type: 'website',
  },
};

// --- DATA FETCHING ---
// ✅ SEO: Added a short description field for better snippets.
const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  ..., // This spread operator fetches all fields from the post document
  "slug": slug.current,
  "description": pt::text(body[0...2]),
}`;


export default async function BlogIndexPage() {
  // ✅ Perf: Fetch data with revalidation to keep it fresh without rebuilding.
  // Data is cached for 1 hour (3600 seconds).
  const posts: Post[] = await client.fetch(postsQuery, {}, {
    next: { revalidate: 3600 }
  });

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  /**
   * ✅ SEO: Add JSON-LD structured data for rich search results.
   * This schema defines the page as a Blog with a list of posts and a breadcrumb trail.
   */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.label,
                item: `https://veproducts.in${item.href}`,
            })),
        },
        {
            '@type': 'Blog',
            name: 'Voltag Electricals Blog',
            url: 'https://veproducts.in/blog',
            description: 'Latest news, articles, and insights from the world of industrial automation.',
            publisher: {
                '@type': 'Organization',
                name: 'Voltag Electricals',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://veproducts.in/logo.png' // Replace with your actual logo URL
                }
            },
            blogPost: posts.map(post => ({
                '@type': 'BlogPosting',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `https://veproducts.in/blog/${post.slug}`,
                },
                headline: post.title,
                image: urlFor(post.mainImage).url(),
                datePublished: post.publishedAt,
                author: {
                    '@type': 'Organization',
                    name: 'Voltag Electricals'
                },
                description: post.description?.substring(0, 160) || post.title,
            })),
        }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-space-grotesk text-slate-800 mb-4 animate-fade-in-up">
              From the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Blog</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Latest news, articles, and insights from the world of industrial automation.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="block h-full">
                <Card className="group h-full overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl flex flex-col">
                  {post.mainImage && (
                    <div className="relative w-full h-56">
                      <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-slate-500 mb-2">
                      {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                    </p>
                    <h2 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-grow">
                      {post.title}
                    </h2>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}