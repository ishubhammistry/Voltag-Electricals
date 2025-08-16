import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

// 1. Import Sanity client and URL helper
import { client, urlFor } from "@/lib/sanity";

// --- Components ---
import Providers from "@/components/Providers";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- Font Configuration ---
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

// 2. Enhanced Metadata for better SEO
export const metadata: Metadata = {
  title: {
    default: "Voltag Electricals | Industrial Automation & Electrical Supplies",
    template: "%s | Voltag Electricals",
  },
  description:
    "Your trusted partner in Vadodara for industrial automation, electrical controls, and high-quality electrical supplies from top brands.",
  openGraph: {
    title: "Voltag Electricals",
    description: "Industrial automation solutions and electrical supplies.",
    url: "https://veproducts.in", // Your actual domain
    siteName: "Voltag Electricals",
    images: [
      {
        url: "https://veproducts.in/og-image.png", // A default social sharing image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voltag Electricals",
    description: "Industrial automation solutions and electrical supplies.",
    images: ["https://veproducts.in/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 3. Query to fetch your logos from Sanity
const settingsQuery = `*[_type == "settings"][0]{
  logoLight,
  logoDark
}`;

// 4. Convert RootLayout to an async function
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 5. Fetch the logo data on the server
  const settings = await client.fetch(settingsQuery);
  const logoLightUrl = settings?.logoLight
    ? urlFor(settings.logoLight).url()
    : "";
  const logoDarkUrl = settings?.logoDark ? urlFor(settings.logoDark).url() : "";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Voltag Electricals",
    url: "https://veproducts.in",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-74900-98328", // Add your business phone number
      contactType: "Customer Service",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Shop No. 9, Near Chhani Bus Stand, Vadodara, Gujarat, India - 391740",
      addressLocality: "Vadodara",
      addressRegion: "GJ",
      postalCode: "391740", // Your area's postal code
      addressCountry: "IN",
    },
  };
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Providers>
          {/* 6. Pass the fetched URLs as props to your components */}
          <Navbar logoUrl={logoLightUrl} />
          <main>{children}</main>
          <Footer logoUrl={logoDarkUrl} />

          <Sonner />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
