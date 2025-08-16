import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from "next";
import { cache } from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const query = `*[_type == "category" && defined(slug.current)]{ "slug": slug.current }`;
  const categories = await client.fetch<{ slug: string }[]>(query);
  return categories.filter((c) => c.slug);
}

const getCategoryData = cache(
  async (slug: string): Promise<Category | null> => {
    const query = `*[_type == "category" && slug.current == $slug][0]{
    _id,
    name,
    description,
    "productLines": *[_type == "productLine" && references(^._id)] | order(name asc){
      _id, name, slug, image, description
    }
  }`;
    return client.fetch(query, { slug });
  }
);

export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const { slug } = await paramsPromise;
  const category = await getCategoryData(slug);
  if (!category) return { title: "Category Not Found" };

  const title = `${category.name} Products | Voltag Electricals`;
  const description =
    category.description ||
    `Explore all product lines in the ${category.name} category at Voltag Electricals in Vadodara.`;
  const canonicalUrl = `https://veproducts.in/categories/${slug}`;
  const ogImage = category.productLines?.[0]?.image
    ? urlFor(category.productLines[0].image).width(1200).height(630).url()
    : "/og-image.png";

  return {
    title,
    description,
    keywords: [
      category.name,
      "Voltag Electricals",
      "industrial automation",
      "electrical controls",
      "Vadodara",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [ogImage],
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params: paramsPromise,
}: PageProps) {
  const { slug } = await paramsPromise;
  const category = await getCategoryData(slug);

  if (!category) {
    notFound();
  }

  const canonicalUrl = `https://veproducts.in/categories/${slug}`;
  const pagePath = `/categories/${slug}`;

  const breadcrumbItems = [
    { label: "Categories", href: "/categories" },
    { label: category.name, href: pagePath },
  ];
  const jsonLdBreadcrumbs = [{ label: "Home", href: "/" }, ...breadcrumbItems];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: jsonLdBreadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: `https://veproducts.in${item.href}`,
        })),
      },
      {
        "@type": "CollectionPage",
        name: `${category.name} Products`,
        url: canonicalUrl,
        description: category.description,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: category.productLines?.map((line, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              url: `${canonicalUrl}/${line.slug.current}`,
              name: line.name,
              image: line.image ? urlFor(line.image).url() : undefined,
            },
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold font-space-grotesk text-slate-800">
              {category.name}
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              {category.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.productLines?.map((line) => (
              <Link
                key={line._id}
                href={`${pagePath}/${line.slug.current}`}
                className="block h-full"
              >
                <Card className="group h-full overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl flex flex-col">
                  {line.image && (
                    <div className="relative w-full h-56 bg-slate-100">
                      <Image
                        src={urlFor(line.image).url()}
                        alt={line.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                      {line.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 flex-grow line-clamp-3">
                      {line.description}
                    </p>
                    <div className="mt-4 text-primary font-semibold flex items-center group-hover:gap-3 transition-all duration-300">
                      View Products <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
