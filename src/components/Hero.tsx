// src/components/Hero.tsx

import React from 'react';
import Link from 'next/link'; // Import the Link component
import { Button } from '@/components/ui/button';
import { ArrowDown, Zap, Cpu, Workflow, LayoutGrid } from 'lucide-react'; // Add LayoutGrid icon
import CircuitAnimation from './CircuitAnimation';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-white to-primary/5 pt-24 sm:pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-20"></div>
      <CircuitAnimation />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Title */}
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold font-space-grotesk mb-4 sm:mb-6 animate-fade-in-up leading-[0.9] tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light block mb-1 sm:mb-2">VOLTAG</span>
              <span className="text-slate-800 block">ELECTRICALS</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">Industrial Automation</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full">
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">Smart Controls</span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto animate-fade-in-up leading-relaxed px-4" style={{ animationDelay: '0.2s' }}>
            Pioneering the future of industrial automation with cutting-edge electrical & electronic controls, 
            motion systems, and intelligent solutions for modern industries.
          </p>
          
          {/* --- UPDATED CTA Buttons --- */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center animate-fade-in-up mb-12 sm:mb-16 px-4" style={{ animationDelay: '0.4s' }}>
            {/* CORRECTED: "Explore Store" button now uses Next.js Link */}
            <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-pulse-glow min-w-[180px] sm:min-w-[200px] group">
              <Link href="/store">
                <Workflow className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                Explore Store
              </Link>
            </Button>
            
            {/* NEW: "Browse Categories" button */}
            <Button asChild variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 group border-primary/50 hover:bg-primary/5">
              <Link href="/categories">
                <LayoutGrid className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:text-primary transition-colors" />
                Browse Categories
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="mt-12 sm:mt-16 lg:mt-20 animate-bounce">
          <div className="mx-auto w-5 h-8 sm:w-6 sm:h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-primary mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;