"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              className={`transition-colors duration-300 font-medium ${
                isScrolled 
                  ? "text-gray-600 hover:text-green-700" 
                  : "text-gray-700 hover:text-green-700"
              }`}
            >
              Features
            </a>
            <a 
              href="#about" 
              className={`transition-colors duration-300 font-medium ${
                isScrolled 
                  ? "text-gray-600 hover:text-green-700" 
                  : "text-gray-700 hover:text-green-700"
              }`}
            >
              About
            </a>
            <a 
              href="#community" 
              className={`transition-colors duration-300 font-medium ${
                isScrolled 
                  ? "text-gray-600 hover:text-green-700" 
                  : "text-gray-700 hover:text-green-700"
              }`}
            >
              Community
            </a>
            <a 
              href="#contact" 
              className={`transition-colors duration-300 font-medium ${
                isScrolled 
                  ? "text-gray-600 hover:text-green-700" 
                  : "text-gray-700 hover:text-green-700"
              }`}
            >
              Contact
            </a>
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <ShimmerButton className="bg-green-700 hover:bg-green-800 text-sm">
              <span className="text-white font-medium">Download App</span>
            </ShimmerButton>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-md transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  : "text-gray-700 hover:text-gray-900 hover:bg-white/20"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg rounded-b-lg mt-1">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-600 hover:text-green-700 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-gray-600 hover:text-green-700 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#community"
                className="block px-3 py-2 text-gray-600 hover:text-green-700 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Community
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-600 hover:text-green-700 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
