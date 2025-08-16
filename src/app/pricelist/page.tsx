import { Metadata } from "next";
import { client } from "@/lib/sanity";
import BrochureGrid from "./BrochureGrid"; 

export const metadata: Metadata = {
  title: "Product Catalogues & Pricelists | Voltag Electricals",
  description: "Download the latest official pricelists and product catalogues from leading brands in the electrical industry. All resources are up-to-date.",
  alternates: {
    canonical: "https://veproducts.in/pricelist",
  },
  openGraph: {
    title: "Product Catalogues & Pricelists | Voltag Electricals",
    description: "Access and download the latest official pricelists from our trusted partners.",
    url: "https://veproducts.in/pricelist",
    images: ["/og-image.png"], 
  },
};

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

const brochuresQuery = `*[_type == "brochure"] | order(companyName asc){
  _id,
  companyName,
  companyLogo,
  "fileUrl": brochureFile.asset->url,
  "fileSize": brochureFile.asset->size
}`;

export default async function PricelistPage() {
  const brochures: Brochure[] = await client.fetch(brochuresQuery, {}, {
    next: { revalidate: 3600 } // Re-fetches data at most once per hour
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Product Catalogues & Pricelists",
    description: "Download the latest pricelists and product catalogues from top brands.",
    url: "https://veproducts.in/pricelist", // Use your actual domain
    mainEntity: {
      "@type": "ItemList",
      itemListElement: brochures.map((brochure, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "DigitalDocument",
          name: `${brochure.companyName} Catalogue`,
          url: brochure.fileUrl,
          fileFormat: "application/pdf",
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary/10 via-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space-grotesk text-slate-800 mb-4">
              Product{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                Catalogues
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Access and download the latest official pricelists and detailed product catalogues from our trusted partners.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ 2. Render the client component and pass the fetched data as a prop */}
      <BrochureGrid brochures={brochures} />
    </>
  );
}
