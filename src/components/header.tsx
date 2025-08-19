"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Learn",
      link: "/learn",
    },
    {
      name: "What's Next?",
      link: "/next",
    },
    {
      name: "Credits",
      link: "/credits",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Terms",
      link: "/terms",
    }
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <Link
            href="/"
            className="flex items-center gap-3 group relative z-20 mr-4 px-2 py-1"
          >
            <div className="relative">
              <Image
                src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/logo-variants/green-dark-logo.webp"
                alt="RupeeBee"
                width={48}
                height={48}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
                unoptimized
              />
            </div>
            <div className="hidden sm:block">
              {/* <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                RupeeBee
              </span> */}
            </div>
          </Link>

          <NavItems items={navItems} className="text-md" />

          <Link
            href="https://punjabandsindbank.co.in/"
            className="flex items-center gap-3 group relative z-20 py-1"
          >
            <div className="relative">
              <Image
                src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/psbpsb.png"
                alt="RupeeBee"
                width={52}
                height={52}
                className="object-contain transition-transform duration-300 group-hover:scale-105 rounded-full"
                priority
                unoptimized
              />
            </div>
          </Link>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            {/* Custom Logo for Mobile */}
            <Link
              href="/"
              className="flex items-center gap-3 relative z-20 mr-4 px-2 py-1"
            >
              <Image
                src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/logo-variants/green-dark-logo.webp"
                alt="RupeeBee"
                width={40}
                height={40}
                className="object-contain"
                priority
                unoptimized
              />
              {/* <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                RupeeBee
              </span> */}
            </Link>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300 hover:text-green-600 transition-colors duration-300 py-2 block"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <Link
              href="https://punjabandsindbank.co.in/"
              className="flex items-center gap-3 group relative z-20 py-1"
            >
              <div className="relative">
                <Image
                  src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/psbpsb.png"
                  alt="RupeeBee"
                  width={52}
                  height={52}
                  className="object-contain transition-transform duration-300 group-hover:scale-105 rounded-full"
                  priority
                  unoptimized
                />
              </div>
            </Link>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
