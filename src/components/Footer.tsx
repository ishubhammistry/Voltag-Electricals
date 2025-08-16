import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

const Footer = ({ logoUrl }: { logoUrl: string }) => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/store" },
    { name: "Pricelist", href: "/pricelist" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Industrial Automation", href: "#" },
    { name: "Electrical Controls", href: "#" },
    { name: "Motion Control", href: "#" },
    { name: "PLC Programming", href: "#" },
    { name: "SCADA Systems", href: "#" },
  ];

  const industries = [
    { name: "Manufacturing", href: "#" },
    { name: "Textile Industry", href: "#" },
    { name: "Chemical Processing", href: "#" },
    { name: "Food & Beverage", href: "#" },
    { name: "Pharmaceutical", href: "#" },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="w-4 sm:w-5 h-4 sm:h-5" />,
      href: "https://x.com/voltagelectricl",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-4 sm:w-5 h-4 sm:h-5" />,
      href: "https://www.instagram.com/voltagelectrical/",
    },
    {
      name: "Mail",
      icon: <Mail className="w-4 sm:w-5 h-4 sm:h-5" />,
      href: "mailto:voltagelectricals@gmail.com",
    },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <Link href="/" className="flex items-center group">
                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt="Voltag Electricals Logo"
                    width={180}
                    height={45}
                    className="h-8 sm:h-10 lg:h-12 xl:h-14 w-auto transition-transform group-hover:scale-105"
                  />
                )}
              </Link>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    Shop No. 9, Near Chhani Bus Stand, Vadodara,
                    <br />
                    Gujarat, India - 391740
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
                <p className="text-slate-300 text-xs sm:text-sm">
                  +91 74900 98328
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
                <p className="text-slate-300 text-xs sm:text-sm">
                  <a href="mailto:voltagelectricals@gmail.com">
                    voltagelectricals@gmail.com
                  </a>
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
                <p className="text-slate-300 text-xs sm:text-sm">
                  Mon-Fri | 08:00 AM - 05:00 PM
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-primary transition-colors duration-300 text-xs sm:text-sm"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-primary transition-colors duration-300 text-xs sm:text-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
              Services
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-slate-400 hover:text-primary transition-colors duration-300 text-xs sm:text-sm"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
              Industries
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {industries.map((industry) => (
                <li key={industry.name}>
                  <a
                    href={industry.href}
                    className="text-slate-400 hover:text-primary transition-colors duration-300 text-xs sm:text-sm"
                  >
                    {industry.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-slate-400 text-xs sm:text-sm mr-2">
              Follow us:
            </span>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="p-2 sm:p-3 bg-slate-800 hover:bg-primary rounded-lg text-slate-400 hover:text-white transition-all duration-300 hover:scale-105"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Voltag Electricals. All rights reserved.</p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/privacy-policy"
                className="hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap.xml"
                className="hover:text-primary transition-colors duration-300"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;