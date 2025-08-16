// app/store/page.tsx

import { client } from "@/lib/sanity";
import StoreClient from "./StoreClient";
import { Category, Product } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electrical Products Store | Voltag Electricals",
  description:
    "Browse and search our complete catalog of industrial automation parts, electrical controls, and supplies from top brands. Advanced filtering available.",
  alternates: {
    canonical: "https://veproducts.in/store",
  },
  openGraph: {
    title: "Complete Product Store | Voltag Electricals",
    description:
      "Find all your electrical and automation needs in our comprehensive store.",
    url: "https://veproducts.in/store",
    images: ["/og-image.png"],
  },
};

const productsQuery = `*[_type == "product"]{
  ..., 
  slug, 
  "brand": brand->{name},
  "productLine": productLine->{
    slug,
    "category": category->{
      name,
      slug
    }
  }
}`;

const categoriesQuery = `*[_type == "category"] | order(name asc)`;

export default async function StorePage() {
  const [products, categories] = await Promise.all([
    client.fetch<Product[]>(productsQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<Category[]>(categoriesQuery, {}, { next: { revalidate: 3600 } }),
  ]);

  // ✅ FIX: Filter products to ensure they have the necessary data for a URL
  const validProductsForSchema = products.filter(
    (product) => product.productLine?.category?.slug && product.slug
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Electrical Products Store',
    description: 'Browse and search all products from Voltag Electricals.',
    url: 'https://veproducts.in/store',
    mainEntity: {
      '@type': 'ItemList',
      // Use the new, filtered array here
      itemListElement: validProductsForSchema.slice(0, 5).map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          // This is now safe and will not produce an error
          url: `https://veproducts.in/categories/${product.productLine!.category.slug.current}/${product.productLine!.slug.current}/${product.slug!.current}`,
          name: product.name,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoreClient initialProducts={products} initialCategories={categories} />
    </>
  );
}