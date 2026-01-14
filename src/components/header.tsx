"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
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
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-[80%] mx-auto relative">
      <div className="border-b border-gray-200/80 bg-white/80 backdrop-blur-md rounded-b-3xl shadow-sm ring-1 ring-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
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
            <nav className="hidden md:flex flex-1 items-center justify-center space-x-8 md:translate-x-[5%]">
              {navItems.map((item, idx) => (
                <Link
                  key={`nav-${idx}`}
                  href={item.link}
                  className={`relative transition-colors duration-200 font-light text-base ${
                    isActive(item.link)
                      ? "text-green-600"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Bank Auth & Mobile Menu */}
            <div className="flex items-center gap-4 shrink-0 ml-auto">
              {/* Bank Authentication Buttons - Desktop */}
              <div className="hidden md:flex items-center gap-3 md:translate-x-[5%]">
                <Link
                  href="/banks/login"
                  className={`px-4 py-1.5 text-base font-medium border rounded-lg transition-colors duration-200 ${
                    isActive("/banks/login")
                      ? "text-green-700 border-green-600"
                      : "text-gray-600 hover:text-green-600 border-gray-300 hover:border-green-300"
                  }`}
                >
                  Bank Login
                </Link>
                <Link
                  href="/banks/signup"
                  className={`px-4 py-1.5 text-base font-medium text-white rounded-lg transition-colors duration-200 shadow-sm ${
                    isActive("/banks/signup")
                      ? "bg-green-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Bank Signup
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-colors duration-200"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
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
        </div>
      </div>

      {/* Mobile Navigation Menu (overlay) */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden absolute left-0 right-0 top-full mt-2 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg ring-1 ring-black/5 origin-top animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 max-h-[calc(100vh-6rem)] overflow-auto">
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-nav-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-center text-base font-light hover:bg-gray-50 rounded-md transition-colors duration-200 ${
                  isActive(item.link)
                    ? "text-green-600"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Bank Auth Buttons */}
            <div className="pt-4 space-y-2 border-t border-gray-200 mt-4">
              <Link
                href="/banks/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-center text-base font-medium border rounded-md transition-colors duration-200 ${
                  isActive("/banks/login")
                    ? "text-green-700 border-green-600"
                    : "text-gray-600 hover:text-green-600 border-gray-300 hover:border-green-300"
                }`}
              >
                Bank Login
              </Link>
              <Link
                href="/banks/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-center text-base font-medium text-white rounded-md transition-colors duration-200 ${
                  isActive("/banks/signup")
                    ? "bg-green-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Bank Signup
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
