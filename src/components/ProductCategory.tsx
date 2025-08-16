// src/components/ProductCategory.tsx

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Added import
import { ShoppingBag } from "lucide-react"; // Added import
import { urlFor } from "@/lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Define the shape of the category data
interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  image: SanityImageSource;
}

interface ProductCategoryProps {
  categories: Category[];
}

export default function ProductCategory({ categories }: ProductCategoryProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-slate-800">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Categories
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Discover our comprehensive range of electrical products across
            multiple categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug.current}`}
              className="block"
            >
              <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full rounded-2xl">
                {/* Image Section */}
                {category.image && (
                  <div className="relative w-full h-56">
                    <Image
                      src={urlFor(category.image).url()}
                      alt={`Image for ${category.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* --- NEW: "View All Products" Button --- */}
        <div className="mt-16 text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
          >
            <Link href="/categories">
              <ShoppingBag className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              View All Categories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}