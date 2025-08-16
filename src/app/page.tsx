// app/page.tsx

import Hero from "@/components/Hero";
import ProductCategory from "@/components/ProductCategory";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import { client } from "@/lib/sanity";
import { Metadata } from "next";

import ClientDynamicSections from "@/components/ClientDynamicSections";
// --- Data Fetching Queries ---
const featuredCategoriesQuery = `*[_type == "category" && is_featured == true]`;

export const metadata: Metadata = {
  title: "Voltag Electricals - Electrical Store in India",
  description:
    "Discover our collection of premium electrical products, including Fuses, Circuit Breakers, and more. Shop now for the best quality and prices.",
  keywords: ["Electrical Products", "Best Quality", "Voltage Electricals"],
};

// --- The Homepage Server Component ---
export default async function HomePage() {
  // Fetch both sets of data in parallel for faster loading
  const [featuredCategories] = await Promise.all([
    client.fetch(featuredCategoriesQuery),
  ]);

  return (
    <>
      <Hero />
      <ProductCategory categories={featuredCategories} />
      <ClientDynamicSections />
    </>
  );
}
