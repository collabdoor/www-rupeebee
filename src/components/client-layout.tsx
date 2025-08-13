"use client";

import { useState, useEffect, ReactNode } from "react";
import { LoadingScreen } from "./loading-screen";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('ClientLayout mounted, starting loading timer'); // Debug log
    // Simulate initial app loading
    const timer = setTimeout(() => {
      console.log('Timer completed, setting isLoading to false'); // Debug log
      setIsLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
