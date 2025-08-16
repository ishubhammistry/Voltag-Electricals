// src/app/categories/[slug]/[productLineSlug]/[productSlug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { Product, SanitySlug } from "@/types";
import Breadcrumbs from "@/components/Breadcrumbs";
import { cache } from "react";
// import ShareButton from "@/components/ShareButton";

// --- Types ---

// ✅ FIX: For Next.js 15, the 'params' type MUST be a Promise.
type PageProps = {
  params: Promise<{
    slug: string;
    productLineSlug: string;
    productSlug: string;
  }>;
};

interface ProductWithParents extends Product {
  tags?: string[]; 
  productLine: {
    name: string;
    slug: SanitySlug;
    category: {
      name: string;
      slug: SanitySlug;
    };
  };
}

// --- Data Fetching & Performance ---

export async function generateStaticParams() {
  const query = `*[_type == "product" && defined(slug.current) && defined(productLine->slug.current) && defined(productLine->category->slug.current)]{
    "productSlug": slug.current,
    "productLineSlug": productLine->slug.current,
    "slug": productLine->category->slug.current
  }`;
  const products =
    await client.fetch<
      { productSlug: string; productLineSlug: string; slug: string }[]
    >(query);
  return products.filter((p) => p.productSlug && p.productLineSlug && p.slug);
}

const getProductData = cache(
  async (slug: string): Promise<ProductWithParents | null> => {
    const query = `*[_type == "product" && slug.current == $slug][0]{
    ..., 
    brand->{name},
    "productLine": productLine->{
      name, slug,
      "category": category->{ name, slug }
    }
  }`;
    return client.fetch(query, { slug });
  }
);

// --- SEO Metadata Generation ---
// ✅ FIX: Destructure the promise and await it inside the function.
export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const product = await getProductData(params.productSlug);

  if (!product) return { title: "Product Not Found | Voltag Electricals" };

  const title = `${product.name}${product.brand ? ` (${product.brand.name})` : ""} | Voltag Electricals`;
  const description =
    product.description?.substring(0, 160) ||
    `Buy ${product.name} from Voltag Electricals in Vadodara.`;
  const canonicalUrl = `https://veproducts.in/categories/${product.productLine.category.slug.current}/${product.productLine.slug.current}/${product.slug.current}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.brand?.name,
      product.productLine.name,
      product.productLine.category.name,
      "Voltag Electricals",
      "Vadodara",
      ...(product.tags || []),
    ].filter((keyword): keyword is string => !!keyword),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        product.image
          ? urlFor(product.image).width(1200).height(630).url()
          : "/og-image.png",
      ],
      type: "website",
      // The 'other' property does not belong here
    },
    // ✅ FIX: The 'other' property is a top-level property of Metadata.
    // This is the correct place for custom meta tags.
    other: {
      "og:type": "product",
      "product:price:amount": product.price ? product.price.toString() : "",
      "product:price:currency": "INR",
    },
  };
}

// --- Page Component ---
// ✅ FIX: Destructure the promise and await it here as well.
export default async function ProductDetailPage({
  params: paramsPromise,
}: PageProps) {
  const params = await paramsPromise;
  const product = await getProductData(params.productSlug);

  if (!product || !product.productLine || !product.productLine.category) {
    notFound();
  }

  const categorySlug = product.productLine.category.slug.current;
  const productLineSlug = product.productLine.slug.current;
  const productSlug = product.slug.current;

  // ✅ Use the constants to build your paths (much cleaner!)
  const canonicalUrl = `https://veproducts.in/categories/${categorySlug}/${productLineSlug}/${productSlug}`;
  const pagePath = `/categories/${categorySlug}/${productLineSlug}/${productSlug}`;

  // ✅ Use the constants in your breadcrumbs array
  const breadcrumbItems = [
    { label: "Categories", href: "/categories" },
    {
      label: product.productLine.category.name,
      href: `/categories/${categorySlug}`,
    },
    {
      label: product.productLine.name,
      href: `/categories/${categorySlug}/${productLineSlug}`,
    },
    { label: product.name, href: pagePath },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        image: product.image ? urlFor(product.image).url() : undefined,
        description:
          product.description || `Buy ${product.name} from Voltag Electricals.`,
         keywords: product.tags?.join(', '),
          sku: product._id,
        brand: product.brand
          ? { "@type": "Brand", name: product.brand.name }
          : undefined,
        offers: product.price
          ? {
              "@type": "Offer",
              url: canonicalUrl,
              priceCurrency: "INR",
              price: product.price.toString(),
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "Voltag Electricals" },
            }
          : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: `https://veproducts.in${item.href}`,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-24 sm:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {product.image && (
              <div className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden bg-slate-100 border">
                <Image
                  src={urlFor(product.image).url()}
                  alt={`${product.name} - product image`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="py-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                {product.name}
              </h1>
              {product.brand?.name && (
                <p className="text-lg text-slate-500 pt-2">
                  {product.brand.name}
                </p>
              )}
              {product.price && (
                <p className="text-4xl font-bold text-slate-900 mt-6">
                  ₹{product.price}
                </p>
              )}
              {/* <div className="mt-8">
                <ShareButton url={canonicalUrl} />
              </div> */}
              {product.description && (
                <div className="mt-10 text-slate-600 space-y-4">
                  <h2 className="text-xl font-bold text-slate-800">
                    Description
                  </h2>
                  <p>{product.description}</p>
                </div>
              )}
          
              {/* ✅ 2. MOVE SPECIFICATIONS HERE */}
              {/* ✅ MOVE SPECIFICATIONS HERE */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">
                    Specifications
                  </h2>
                  {/* Responsive wrapper for the table */}
                  <div className="border border-slate-200 rounded-lg overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th
                            scope="col"
                            className="w-1/3 px-4 py-3 font-semibold text-slate-800 text-left"
                          >
                            Specification
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 font-semibold text-slate-800 text-left"
                          >
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {product.specifications.map((spec) => (
                          <tr key={spec.key} className="even:bg-slate-50">
                            <td className="px-4 py-3 font-medium text-slate-700">
                              {spec.key}
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
  {product.tags && product.tags.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          {/* The specifications block has been moved from here */}
        </div>
      </main>
    </>
  );
}
