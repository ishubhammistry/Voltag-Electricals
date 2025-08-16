import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';

// SEO Metadata for the About page
// src/app/about/page.tsx

export const metadata: Metadata = {
  title: "About Voltag Electricals | Your Trusted Partner in Vadodara",
  description: "Since 2017, Voltag Electricals has been a leading electrical store in Vadodara, specializing in industrial automation, controls, and high-quality electronic components.",
  // ✅ Add a canonical URL
  alternates: {
    canonical: 'https://veproducts.in/about',
  },
  // ✅ Add Open Graph tags for social sharing
  openGraph: {
    title: 'About Voltag Electricals',
    description: 'Discover our story, mission, and why we are the trusted choice for electrical supplies in Vadodara.',
    url: 'https://veproducts.in/about',
    images: [
      {
        url: 'https://cdn.sanity.io/images/4sgsuyry/production/1b59bd450c1f469d95a2d57d96500cac1aabb1fe-1277x1920.jpg', // Use an image from the page
        width: 1277,
        height: 1920,
      },
    ],
    type: 'website',
  },
  // ✅ Add Twitter-specific tags
  twitter: {
    card: 'summary_large_image',
    title: 'About Voltag Electricals | Your Trusted Partner in Vadodara',
    description: 'Since 2017, Voltag Electricals has been a leading electrical store in Vadodara.',
  },
};

const AboutPage = () => {
  const features = [
    "International Brands",
    "Have been certified",
    "Quality of our research",
    "Breadth of our capabilities",
    "Trustworthy",
    "High integrity",
    "Providing The best product",
    "Global reach of our business",
  ];

  return (
    <div className="pt-24 bg-white">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div>
              <p className="text-sm font-semibold text-primary uppercase mb-2">
                About Us
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space-grotesk text-slate-900 mb-6">
                We Are Best Electrical Store in Vadodara Since 2017
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Voltag Electricals, A Privately Held Company Shop in Vadodara, Gujarat India, is a leading provider of industrial and commercial electrical and electronic controls, automation and motion products.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-[300px] sm:h-[450px] lg:h-full">
              <Image
                src="https://cdn.sanity.io/images/4sgsuyry/production/1b59bd450c1f469d95a2d57d96500cac1aabb1fe-1277x1920.jpg" // Replace with your actual image URL
                alt="Interior of an electrical panel with complex wiring"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
              {/* Overlapping Image (Foreground) */}
              <div className="absolute -bottom-8 -right-8 w-2/3 h-2/3">
                 <Image
                    src="https://cdn.sanity.io/images/4sgsuyry/production/25b2cdd251995dc8b3ea103769167d6286fe375f-1920x1407.jpg" // Replace with your actual image URL
                    alt="Close-up of electrical circuit breakers"
                    fill
                    className="object-cover rounded-lg shadow-2xl border-4 border-white"
                 />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;