"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";

interface HeaderFooterToggleProps {
  children: React.ReactNode;
}

const HeaderFooterToggle = ({ children }: HeaderFooterToggleProps) => {
  const pathname = usePathname();
  
  // Pages that should NOT show header
  const noHeaderPages = [
    "/auth/callback",
    "/auth/oauth-callback", 
    "/auth/reset-password",
    "/auth/verify",
    "/banks/login",
    "/banks/signup",
    "/banks/dashboard",
    "/admin/login",
    "/admin/dashboard"
  ];

  // Pages that should NOT show footer  
  const noFooterPages = [
    "/auth/callback",
    "/auth/oauth-callback",
    "/auth/reset-password", 
    "/auth/verify",
    "/banks/login",
    "/banks/signup",
    "/banks/dashboard",
    "/admin/login",
    "/admin/dashboard"
  ];

  // Check if current path should hide header
  const shouldHideHeader = noHeaderPages.some(page => 
    pathname === page || pathname.startsWith(page)
  );

  // Check if current path should hide footer
  const shouldHideFooter = noFooterPages.some(page => 
    pathname === page || pathname.startsWith(page)
  );

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default HeaderFooterToggle;