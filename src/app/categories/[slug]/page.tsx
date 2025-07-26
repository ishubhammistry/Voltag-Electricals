// app/categories/[slug]/page.tsx

import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from 'next';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const getCategoryData = async (slug: string): Promise<Category | null> => {
    const query = `*[_type == "category" && slug.current == $slug][0]{
    name,
    description,
    "productLines": *[_type == "productLine" && references(^._id)] | order(name asc){
      _id, name, slug, image, description
    }
  }`;
  return client.fetch(query, { slug });
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const { slug } = await paramsPromise;
  const category = await getCategoryData(slug);
  if (!category) return { title: 'Category Not Found' };
  return { title: `${category.name} | Voltag Electricals`, description: category.description };
}

export default async function CategoryPage({ params: paramsPromise }: PageProps) {
  const { slug } = await paramsPromise;
  const category = await getCategoryData(slug);

  if (!category) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Categories", href: "/categories" },
    { label: category.name, href: `/categories/${slug}` },
  ];

  return (
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
            <Link key={line._id} href={`/categories/${slug}/${line.slug.current}`} className="block">
              <Card className="group h-full overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl flex flex-col">
                {line.image && (
                  <div className="relative w-full h-56 bg-slate-100">
                    <Image src={urlFor(line.image).url()} alt={line.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">{line.name}</h3>
                  <p className="text-sm text-slate-600 mt-2 flex-grow line-clamp-3">{line.description}</p>
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
  );
}
