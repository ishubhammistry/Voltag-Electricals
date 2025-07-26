// app/blog/page.tsx

import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

// --- TYPE DEFINITION ---
// Define the shape of a single Post object fetched from Sanity
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
 mainImage: SanityImage; // Using 'any' for the image object is fine here
  publishedAt: string;
}

// This GROQ query fetches all blog posts, ordered by publishing date
const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
}`;

export default async function BlogIndexPage() {
  // Add the Post[] type to the fetched data
  const posts: Post[] = await client.fetch(postsQuery);

  return (
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
          {/* Use the 'Post' type in the map function */}
          {posts.map((post: Post) => (
            <Link key={post._id} href={`/blog/${post.slug}`}>
              <Card className="group h-full overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl">
                {post.mainImage && (
                  <div className="relative w-full h-56">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <p className="text-sm text-slate-500 mb-2">
                    {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                  </p>
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}