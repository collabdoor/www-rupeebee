"use client";

import { useState, useEffect, ReactNode } from "react";
import { LoadingScreen } from "./loading-screen";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    console.log('ClientLayout mounted, starting loading timer'); // Debug log
    // Simulate initial app loading
    const timer = setTimeout(() => {
      console.log('Timer completed, setting isLoading to false'); // Debug log
      setIsLoading(false);
    }, 3000); // Increased to 3 seconds for better testing

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    console.log('Loading complete callback triggered'); // Debug log
    setShowContent(true);
  };

  return (
    <>
      <LoadingScreen 
        isLoading={isLoading} 
        onLoadingComplete={handleLoadingComplete}
      />
      
      {/* Main Content */}
      <div 
        className={`min-h-screen transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </>
  );
}
