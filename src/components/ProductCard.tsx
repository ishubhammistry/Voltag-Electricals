// // src/components/ProductCard.tsx
// import Link from "next/link";
// import Image from "next/image";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Product } from "@/types";
// import { urlFor } from "@/lib/sanity";
// import { Eye, Package2 } from "lucide-react";

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   // Construct the URL safely, checking if slugs exist
//   const categorySlug = product.category?.slug?.current;
//   const productLineSlug = product.productLine?.slug?.current;
//   const productSlug = product.slug?.current;

//   // Only create a valid href if all parts of the URL are present
//   const href =
//     categorySlug && productLineSlug && productSlug
//       ? `/categories/${categorySlug}/${productLineSlug}/${productSlug}`
//       : "#"; // Fallback href if data is incomplete

//   return (
//     <Card className="group h-full overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl flex flex-col">
//       <Link href={href} className="flex flex-col flex-grow">
//         {/* Image Section */}
//         <div className="relative w-full h-60 bg-slate-50">
//           {product.image ? (
//             <Image
//               src={urlFor(product.image).url()}
//               alt={product.name}
//               fill
//               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//               className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-slate-400">
//               <Package2 className="h-12 w-12" />
//             </div>
//           )}
//           {/* Category Tag */}
//           {product.category?.name && (
//             <div className="absolute top-3 left-3 z-10">
//               <span className="px-3 py-1 bg-white/90 text-xs font-medium text-slate-700 rounded-full border border-white/20 shadow-sm">
//                 {product.category.name}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Content Section */}
//         <div className="p-4 flex flex-col flex-grow">
//           <h2 className="text-base font-bold text-slate-800 line-clamp-2 min-h-[2.5rem]">
//             {product.name}
//           </h2>
//           {product.brand?.name && (
//             <p className="text-sm text-slate-500 mt-1">{product.brand.name}</p>
//           )}
//           <div className="mt-4 flex-grow">
//             {product.price ? (
//               <p className="text-xl font-bold text-slate-900">
//                 ₹{product.price}
//               </p>
//             ) : (
//               <p className="text-sm font-medium text-primary mt-2">
//                 Contact for pricing
//               </p>
//             )}
//           </div>
//           {/* View Details Button */}
//           <div className="mt-4 border-t pt-4">
//              <Button
//                 variant="outline"
//                 size="sm"
//                 className="w-full group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all duration-300 rounded-xl"
//               >
//                 <Eye className="h-4 w-4 mr-2" /> View Details
//               </Button>
//           </div>
//         </div>
//       </Link>
//     </Card>
//   );
// }
