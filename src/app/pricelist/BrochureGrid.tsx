"use client";

import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { urlFor } from "@/lib/sanity";

// --- Type Definitions ---
interface SanityImage {
  asset: { _ref: string; _type: 'reference'; };
}

interface Brochure {
  _id: string;
  companyName: string;
  companyLogo: SanityImage;
  fileUrl: string;
  fileSize: number;
}

// --- Helper Functions ---
function formatBytes(bytes: number, decimals = 2) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default function BrochureGrid({ brochures }: { brochures: Brochure[] }) {
  return (
    <section className="py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
         {brochures.map((brochure) => (
            <Card
              key={brochure._id}
              className="group hover:shadow-2xl transition-all duration-300 border-slate-200/60 shadow-lg overflow-hidden flex flex-col bg-white rounded-2xl p-6 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                  {brochure.companyName}
                </CardTitle>
                {brochure.fileSize && (
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    {formatBytes(brochure.fileSize)}
                  </span>
                )}
              </div>

              {brochure.companyLogo && (
                <div className="w-full h-32 relative bg-white rounded-lg flex items-center justify-center p-4 border border-slate-200/80 mb-6">
                  <Image
                    src={urlFor(brochure.companyLogo).url()}
                    alt={`${brochure.companyName} logo`}
                    fill
                    // ✅ Perf: Added sizes attribute for responsive image loading
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-contain"
                  />
                </div>
              )}

              <div className="space-y-3 mt-auto">
                <Button asChild variant="outline" className="w-full rounded-lg">
                  <a
                    href={brochure.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${brochure.companyName} catalogue online`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Online
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary-dark text-white transition-all duration-300 rounded-lg"
                >
                  <a
                    href={`/api/download?fileUrl=${encodeURIComponent(brochure.fileUrl)}`}
                    download
                    aria-label={`Download ${brochure.companyName} catalogue`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Catalogue
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
