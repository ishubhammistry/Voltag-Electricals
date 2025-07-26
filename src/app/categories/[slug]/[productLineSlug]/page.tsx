// app/categories/[slug]/[productLineSlug]/page.tsx

import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ProductLine, Product } from "@/types";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from 'next';

// This interface extends the base ProductLine to include its parent category data
interface ProductLineWithCategory extends ProductLine {
  category: {
    name: string;
    slug: { current: string };
  };
  products: Product[];
}

type PageProps = {
  params: Promise<{
    slug: string;
    productLineSlug: string;
  }>;
};

const getProductLineData = async (slug: string): Promise<ProductLineWithCategory | null> => {
  const query = `*[_type == "productLine" && slug.current == $slug][0]{
    name,
    description,
    "category": category->{name, slug},
    "products": *[_type == "product" && references(^._id)] | order(name asc){
      _id, name, slug, image, price, brand->{name}
    }
  }`;
  return client.fetch(query, { slug });
};

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const { productLineSlug } = await paramsPromise;
  const productLine = await getProductLineData(productLineSlug);
  if (!productLine) return { title: "Product Line Not Found" };
  const title = `${productLine.name} | ${productLine.category.name} | Voltag Electricals`;
  return { title, description: productLine.description };
}

export default async function ProductLinePage({ params: paramsPromise }: PageProps) {
  const { productLineSlug } = await paramsPromise;
  const productLine = await getProductLineData(productLineSlug);

  if (!productLine || !productLine.category) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Categories", href: "/categories" },
    { label: productLine.category.name, href: `/categories/${productLine.category.slug.current}` },
    { label: productLine.name, href: `/categories/${productLine.category.slug.current}/${productLineSlug}` },
  ];

  return (
    <div className="bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <div className="mb-6">
            <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-space-grotesk text-slate-800">
            {productLine.name}
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            {productLine.description}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productLine.products.map((product) => (
            <Card key={product._id} className="group h-full overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl flex flex-col">
              <Link href={`/categories/${productLine.category.slug.current}/${productLineSlug}/${product.slug.current}`} className="block flex flex-col flex-grow">
                <div className="relative w-full h-48 bg-slate-100">
                  {product.image && <Image src={urlFor(product.image).url()} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" />}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">{product.name}</h2>
                  <p className="text-sm text-slate-500 mt-1">{product.brand?.name}</p>
                   <div className="mt-4 flex-grow">
                    {product.price ? (
                      <p className="text-2xl font-bold text-slate-900">
                        ₹{product.price}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-primary">
                        Contact for pricing
                      </p>
                    )}
                  </div>
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm font-semibold text-primary group-hover:underline">
                      View Details
                    </p>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
