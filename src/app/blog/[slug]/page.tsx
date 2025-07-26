// app/blog/[slug]/page.tsx

import Image from "next/image";
import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { format } from "date-fns";

// --- START: Next.js 15 Update ---
// The type for page props has changed. `params` is now a Promise.
type PageProps = {
  params: Promise<{ slug: string }>;
};
// --- END: Next.js 15 Update ---

// --- START: ESLint Fix ---
// Define a more specific type for a Sanity image asset reference
interface SanityImageReference {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}
// --- END: ESLint Fix ---

// Define a type for the data you expect from Sanity for better type safety
interface Post {
  _id: string;
  title: string;
  mainImage: SanityImageReference; // Replaced 'any' with a specific type
  publishedAt: string;
  body: PortableTextBlock[];
}

// The GROQ query to fetch the specific post based on its slug
const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  publishedAt,
  body,
}`;

// This is an async Server Component
export default async function SinglePostPage(props: PageProps) {
  // You must now await the params to resolve the Promise
  const params = await props.params;
  const { slug } = params;

  // Fetch data from Sanity. The 'Post' type is used here for type checking.
  const post: Post = await client.fetch(postQuery, { slug });

  // If no post is found for the given slug, render the 404 page
  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white py-16 pt-32 sm:py-24 sm:pt-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Post Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space-grotesk text-slate-900 mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-slate-500">
            Published on {format(new Date(post.publishedAt), "MMMM d, yyyy")}
          </p>
        </header>

        {/* Main Image */}
        {post.mainImage && (
          <div className="relative w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Post Body Content Rendered with PortableText */}
        <div className="prose prose-lg max-w-none prose-h2:font-space-grotesk prose-a:text-primary hover:prose-a:text-primary-dark">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  );
}
