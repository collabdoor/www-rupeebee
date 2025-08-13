"use client";

import Image from "next/image";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-green-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image 
              src="/assets/logo.png" 
              alt="RupeeBee" 
              width={60} 
              height={60}
              className="object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-green-700 transition-colors font-medium"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-gray-600 hover:text-green-700 transition-colors font-medium"
            >
              About
            </a>
            <a 
              href="#community" 
              className="text-gray-600 hover:text-green-700 transition-colors font-medium"
            >
              Community
            </a>
            <a 
              href="#contact" 
              className="text-gray-600 hover:text-green-700 transition-colors font-medium"
            >
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <ShimmerButton className="bg-green-700 hover:bg-green-800 text-sm">
              <span className="text-white font-medium">Download App</span>
            </ShimmerButton>
          </div>
        </div>
      </div>
    </header>
  );
}
