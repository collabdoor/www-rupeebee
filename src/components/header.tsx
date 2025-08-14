"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
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
      name: "Community",
      link: "#community",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          {/* Custom Logo for Desktop */}
          <Link href="/" className="flex items-center gap-3 group relative z-20 mr-4 px-2 py-1">
            <div className="relative">
              <Image 
                src="/assets/logo.png" 
                alt="RupeeBee" 
                width={48} 
                height={48}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                RupeeBee
              </span>
            </div>
          </Link>
          
          <NavItems items={navItems} />
          
          <div className="flex items-center gap-3">
            <NavbarButton 
              variant="primary"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              Credits
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            {/* Custom Logo for Mobile */}
            <Link href="/" className="flex items-center gap-3 relative z-20 mr-4 px-2 py-1">
              <Image 
                src="/assets/logo.png" 
                alt="RupeeBee" 
                width={40} 
                height={40}
                className="object-contain"
                priority
              />
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                RupeeBee
              </span>
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
            <div className="flex w-full flex-col gap-4 mt-6">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full hover:text-green-500 bg-gradient-to-r rounded-full from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                Credits
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
