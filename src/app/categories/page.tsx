import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from "next";

const categoriesQuery = `*[_type == "category"] | order(name asc){
  _id, name, slug, image, description
}`;

export const metadata: Metadata = {
  title: "All Product Categories | Voltag Electricals",
  description:
    "Browse our comprehensive list of product categories at Voltag Electricals to find the right industrial automation and electrical supplies for your needs in Vadodara.",
  alternates: {
    canonical: "https://veproducts.in/categories",
  },
  openGraph: {
    title: "All Product Categories | Voltag Electricals",
    description: "Browse all product categories at Voltag Electricals.",
    url: "https://veproducts.in/categories",
    type: "website",
  },
};

export default async function AllCategoriesPage() {
  const categories: Category[] = await client.fetch(categoriesQuery);

  const breadcrumbItems = [{ label: "Categories", href: "/categories" }];
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
        name: "All Product Categories | Voltag Electricals",
        url: "https://veproducts.in/categories",
        description:
          "Browse all product categories for industrial automation and electrical supplies at Voltag Electricals.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: categories.map((category, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "WebPage", 
              "@id": `https://veproducts.in/categories/${category.slug.current}`,
              name: category.name,
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-space-grotesk text-slate-800 mb-4 animate-fade-in-up">
              All Product Categories
            </h1>
            <p
              className="text-lg text-slate-600 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Browse our comprehensive list of categories to find the right
              products for your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category._id}
                href={`/categories/${category.slug.current}`}
                className="block"
              >
                <Card
                  className="group h-full overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl flex flex-col"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {category.image && (
                    <div className="relative w-full h-56 bg-slate-100">
                      <Image
                        src={urlFor(category.image).url()}
                        alt={`Image for ${category.name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 flex-grow line-clamp-3">
                      {category.description}
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
