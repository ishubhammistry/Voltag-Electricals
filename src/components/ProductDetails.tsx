// src/components/ProductDetails.tsx

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Define the shape of the data for clarity
interface Product {
  _id: string;
  name: string;
  image?: SanityImageSource;
  brand?: { name: string };
  category?: { name: string };
  specifications?: { _key: string; key: string; value: string }[];
  note?: string;
}

interface ProductDetailsProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetails({ product, isOpen, onClose }: ProductDetailsProps) {
  // Render nothing if no product is selected
  if (!product) {
    return null;
  }
const phoneNumber = "+91 74900-98328";
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          {/* Image Section */}
          <div>
            {product.image && (
              <div className="relative w-full h-80 rounded-lg overflow-hidden">
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold font-space-grotesk text-slate-900">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-lg text-slate-500 pt-2">
                {product.brand?.name} • {product.category?.name}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Specifications
              </h3>
              <div className="overflow-hidden border border-slate-200 rounded-lg">
                <table className="min-w-full divide-y divide-slate-200">
                  <tbody className="bg-white divide-y divide-slate-200">
                    {product.specifications?.map((spec) => (
                      // Use spec._key as the unique React key
                      <tr key={spec._key}>
                        {/* CORRECT: Render spec.key and spec.value individually */}
                        <td className="px-4 py-3 text-sm font-medium text-slate-600 w-1/3">
                          {spec.key}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-800 font-semibold">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {product.note && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Note</h3>
                <p className="text-sm text-slate-600 bg-slate-100 p-3 rounded-md">
                  {product.note}
                </p>
              </div>
            )}
            <div className="mt-auto pt-8">
              <Button asChild size="lg" className="w-full bg-primary hover:bg-primary-dark text-white transition-all duration-300">
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call for Inquiry
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}