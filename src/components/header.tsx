"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Learn",
      link: "/learn",
    },
    {
      name: "Reviews",
      link: "/reviews",
    },
    {
      name: "Credits",
      link: "/credits",
    },
    {
      name: "Terms",
      link: "/terms",
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Image
                src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/logo-variants/green-dark-logo.webp"
                alt="RupeeBee"
                width={40}
                height={40}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
                unoptimized
              />
            </div>
            {/* PSB Partner Logo */}
            <div className="relative">
              <Image
                src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/psbpsb.png"
                alt="Punjab & Sind Bank"
                width={32}
                height={32}
                className="object-contain transition-transform duration-300 group-hover:scale-105 rounded-full"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, idx) => (
              <Link
                key={`nav-${idx}`}
                href={item.link}
                className="relative text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Bank Auth & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Bank Authentication Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/banks/login"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 border border-gray-300 hover:border-green-300 rounded-lg transition-colors duration-200"
              >
                Bank Login
              </Link>
              <Link
                href="/banks/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 shadow-sm"
              >
                Bank Signup
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 bg-white">
              {navItems.map((item, idx) => (
                <Link
                  key={`mobile-nav-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Bank Auth Buttons */}
              <div className="pt-4 space-y-2 border-t border-gray-200 mt-4">
                <Link
                  href="/banks/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-center text-base font-medium text-gray-600 hover:text-green-600 border border-gray-300 hover:border-green-300 rounded-md transition-colors duration-200"
                >
                  Bank Login
                </Link>
                <Link
                  href="/banks/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-center text-base font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200"
                >
                  Bank Signup
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
