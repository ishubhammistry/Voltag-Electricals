// app/store/page.tsx

import { client } from "@/lib/sanity";
import StoreClient from "./StoreClient";
// ✅ FIX: Use the correct type names as defined in src/types/index.ts
import { Category, Product } from "@/types";

/**
 * GROQ query to fetch all products.
 * It uses projections to expand referenced documents (brand, category)
 * into the final result, ensuring the data shape matches the 'Product' type.
 */
const productsQuery = `*[_type == "product"]{
  ..., // Fetches all native fields from the product
  slug, // Gets the product's own slug
  "brand": brand->{name}, // Gets the brand's name
  
  // This block gets the parent slugs needed to build the URL
  "productLine": productLine->{
    slug, // Gets the parent product line's slug
    "category": category->{
      name, // Gets the category name (you still need this for filtering)
      slug  // Gets the grandparent category's slug
    }
  }
}`;

/**
 * GROQ query to fetch all categories, ordered alphabetically.
 */
const categoriesQuery = `*[_type == "category"] | order(name asc)`;

/**
 * The main server component for the store page.
 * It fetches all necessary data on the server and passes it down
 * to the interactive client component.
 */
export default async function StorePage() {
  // Fetch products and categories from Sanity in parallel for performance.
  const [products, categories] = await Promise.all([
    // ✅ FIX: Use the correct generic type 'Product[]'
    client.fetch<Product[]>(productsQuery),
    // ✅ FIX: Use the correct generic type 'Category[]'
    client.fetch<Category[]>(categoriesQuery),
  ]);

  // Render the client component with the fetched data as initial props.
  return (
    <StoreClient
      initialProducts={products}
      initialCategories={categories}
    />
  );
}
