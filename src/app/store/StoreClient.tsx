"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link"; // 1. Import Link for navigation
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity";
import { Product, Category } from "@/types"; // Centralized types

// This type comes from the sanity image-url library
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// --- UI Components ---
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  Filter,
  ChevronDown,
  Package2,
  SlidersHorizontal,
  Eye,
  Info, // 2. Import a new icon
} from "lucide-react";
import ProductDetails from "@/components/ProductDetails";

// --- Component Props ---
interface StoreClientProps {
  initialProducts: Product[];
  initialCategories: Category[];
}

// --- Sanity Image URL Helper ---
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * StoreClient is a client-side component responsible for rendering the
 * interactive product store, including filtering, sorting, and pagination.
 */
export default function StoreClient({
  initialProducts,
  initialCategories,
}: StoreClientProps) {
  // --- State Management ---
  const [allProducts] = useState<Product[]>(initialProducts || []);
  const [categories] = useState<string[]>(
    initialCategories?.map((cat) => cat.name).filter(Boolean) || []
  );
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- Derived State (Filter Options) ---
  const brands = useMemo(
    () => [
      ...new Set(
        allProducts.map((p) => p.brand?.name).filter(Boolean) as string[]
      ),
    ],
    [allProducts]
  );

  // --- Filtering & Sorting Logic ---
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      if (!product) return false;

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productLine?.category?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.brand?.name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBrand =
        selectedBrands.length === 0 ||
        (product.brand?.name
          ? selectedBrands.includes(product.brand.name)
          : false);

      const matchesCategory =
        selectedCategories.length === 0 ||
        (product.productLine?.category?.name
          ? selectedCategories.includes(product.productLine.category.name)
          : false);

      return matchesSearch && matchesBrand && matchesCategory;
    });

    // Apply sorting
    const sorted = [...filtered]; // Create a new array to avoid mutating the original
    switch (sortBy) {
      case "price-low-high":
        sorted.sort((a, b) => (a.price || Infinity) - (b.price || Infinity));
        break;
      case "price-high-low":
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name-a-z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [searchQuery, sortBy, selectedBrands, selectedCategories, allProducts]);

  // --- Pagination Logic ---
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    firstItemIndex,
    lastItemIndex
  );
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  // --- Handler Functions ---
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // --- Render ---
  return (
    <div className="bg-gradient-to-br from-primary/10 via-white to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space-grotesk text-slate-800 mb-4">
            Electrical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Products Store
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our complete catalog with advanced filtering and search.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 h-12 bg-white/80 backdrop-blur-sm border-slate-200 focus:border-primary"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-64 h-12 bg-white/80 backdrop-blur-sm border-slate-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="name-a-z">Name: A to Z</SelectItem>
              <SelectItem value="name-z-a">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden h-12"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-80 space-y-6 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <Card className="p-6 bg-white/60 backdrop-blur-sm border-slate-200/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </h3>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium">
                  Categories <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label
                        htmlFor={category}
                        className="text-sm text-slate-600 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              <Collapsible defaultOpen className="mt-4">
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium">
                  Brands <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                      <label
                        htmlFor={brand}
                        className="text-sm text-slate-600 cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </aside>

          {/* Products Grid + Pagination */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-slate-600">
                Showing {firstItemIndex + 1}-
                {Math.min(lastItemIndex, filteredAndSortedProducts.length)} of{" "}
                {filteredAndSortedProducts.length} products
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Show:</span>
                <Select
                  value={String(itemsPerPage)}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map((product, index) => (
                  <Card
                    key={product._id}
                    className="group h-full overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl flex flex-col"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative w-full h-60">
                      {product.image ? (
                        <Image
                          src={urlFor(product.image).url()}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Package2 className="h-12 w-12" />
                        </div>
                      )}
                      {product.productLine?.category?.name && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-3 py-1 bg-white/90 text-xs font-medium text-slate-700 rounded-full border border-white/20 shadow-sm">
                            {product.productLine.category.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-base font-bold text-slate-800 group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h2>
                      {product.brand?.name && (
                        <p className="text-sm text-slate-500 mt-1">
                          {product.brand.name}
                        </p>
                      )}
                      <div className="mt-4 flex-grow">
                        {product.price ? (
                          <p className="text-xl font-bold text-slate-900">
                            ₹{product.price}
                          </p>
                        ) : (
                          <p className="text-sm font-medium text-primary mt-2">
                            Contact for pricing
                          </p>
                        )}
                      </div>
                      {/* === 3. BUTTONS CONTAINER (MODIFIED) === */}
                      <div className="mt-4 flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full ..."
                          onClick={() => handleViewProduct(product)}
                        >
                          <Eye className="h-4 w-4 mr-2" /> Quick View
                        </Button>
                        {/* Make sure your product data includes slug: { current: '...' } */}
                        {product.productLine && product.slug ? (
                          <Link
                            href={`/categories/${product.productLine.category.slug.current}/${product.productLine.slug.current}/${product.slug.current}`}
                            passHref
                            className="w-full"
                            aria-label={`View full details for ${product.name}`}
                          >
                            <Button
                              variant="default"
                              size="sm"
                              className="w-full rounded-xl"
                            >
                              <Info className="h-4 w-4 mr-2" /> View Product
                            </Button>
                          </Link>
                        ) : (
                          // Optional: Render a disabled button as a fallback for products without a link
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full rounded-xl"
                            disabled
                          >
                            <Info className="h-4 w-4 mr-2" /> Details
                            Unavailable
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 col-span-full">
                <Package2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  No products found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search or filters.
                </p>
                <Button onClick={clearAllFilters} className="mt-4">
                  Clear All Filters
                </Button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((p) => Math.max(1, p - 1));
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(i + 1);
                          }}
                          isActive={currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>

        <ProductDetails
          product={selectedProduct}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </div>
  );
}
