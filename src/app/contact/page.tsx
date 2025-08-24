"use client";

import React from "react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import ContactForm from "@/components/contact-form";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative">
      {/* Dot Pattern Background */}
      <DotPattern
        className={cn(
          "absolute inset-0 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        )}
      />
      
      <main className="relative min-h-screen flex justify-center py-32">
        <div className="container-responsive relative z-10 max-w-6xl mx-auto px-4">
          <div className="pt-24 pb-16 space-y-16">
            {/* Header Section */}
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight z-20">
                <span className="block">
                  Partnership &{" "}
                  <PointerHighlight
                    rectangleClassName="border-blue-500 dark:border-blue-400"
                    pointerClassName="text-blue-500 dark:text-blue-400"
                    containerClassName="inline-block ml-1"
                  >
                    <span className="text-blue-600 dark:text-blue-400">
                      Collaboration
                    </span>
                  </PointerHighlight>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Building the future of{" "}
                <span className="text-green-600 font-semibold underline decoration-green-300 underline-offset-4">
                  financial technology
                </span>{" "}
                together
              </p>
            </div>
            
            {/* Contact Form */}
            <div className="flex justify-center">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
