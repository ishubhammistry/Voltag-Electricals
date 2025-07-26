"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Phone, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Navbar = ({ logoUrl }: { logoUrl: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "Pricelist", href: "/pricelist" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt="Voltag Electricals Logo"
                  width={180}
                  height={45}
                  priority
                  className="h-10 sm:h-12 lg:h-12 xl:h-14 w-auto transition-transform group-hover:scale-105"
                />
              )}
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-700 hover:text-primary font-medium transition-colors duration-300 relative group text-sm xl:text-base"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 lg:gap-3 text-slate-700">
              <div className="p-1.5 lg:p-2 bg-primary/10 rounded-full">
                <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
              </div>
              <div className="hidden lg:block">
                <div className="text-xs xl:text-sm font-semibold">
                  +91 74900 98328
                </div>
                <div className="text-xs text-slate-500">24×7 Support</div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10 sm:h-12 sm:w-12"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-lg border-t border-slate-200">
            <div className="px-4 py-4 sm:py-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 sm:h-5 sm:w-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-9 sm:pl-10 pr-4 py-2 sm:py-3 w-full border-slate-300 focus:border-primary focus:ring-primary rounded-xl text-sm sm:text-base"
                />
              </div>
              <nav className="space-y-2 sm:space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 sm:px-4 py-2 sm:py-3 text-slate-700 hover:text-primary hover:bg-primary/10 rounded-lg font-medium transition-colors duration-300 text-sm sm:text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;