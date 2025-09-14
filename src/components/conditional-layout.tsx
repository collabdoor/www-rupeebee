"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/header";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Define routes that should not have header and footer
  const authRoutes = [
    '/auth/',
    '/banks/login',
    '/banks/signup', 
    '/admin/login'
  ];
  
  // Check if current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  );
  
  if (isAuthRoute) {
    // Return children without header and footer for auth pages
    return <>{children}</>;
  }
  
  // Return children with header and footer for all other pages
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}