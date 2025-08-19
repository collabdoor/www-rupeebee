"use client"

import { LayoutGroup, motion } from "motion/react"
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { Highlighter } from "./magicui/highlighter";
import TextRotate from "@/components/fancy/text/text-rotate";
import Link from "next/link";
import { Download } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex items-center py-32 justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      <div className="container-responsive relative z-10">
        {/* Content with proper spacing */}
        <div className="py-4 space-y-16">
          {/* Main Heading Section */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block">
                Be{" "}
                <Highlighter action="underline" color="#FF9800">
                  Wise
                </Highlighter>{" "}
                with your{" "}
                <Highlighter action="highlight" color="#87CEFA">
                  Rupee
                </Highlighter>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe that by combining financial education and smart
              technology, families will be more secure, more efficient, and have
              more engaged, happier financial futures.
            </p>
          </div>

          {/* Phone Mockups Section */}
          <div className="flex justify-center items-center relative">
            <div className="relative">
              {/* Android Phone - Behind and smaller */}
              <div className="absolute -left-24 sm:-left-32 top-8 transform rotate-12 z-10">
                <Iphone15Pro
                  className="size-[240px] sm:size-[280px] opacity-90"
                  src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/screenshots/4.webp"
                />
              </div>

              {/* iPhone - Front and center */}
              <div className="relative z-20">
                <Iphone15Pro
                  className="size-[300px] sm:size-[350px]"
                  src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/screenshots/3.webp"
                />
              </div>
            </div>
          </div>

          {/* Rotating Text Section */}
          <div className="mt-10 flex justify-center">
            <LayoutGroup>
              <motion.div className="text-2xl sm:text-3xl md:text-4xl flex flex-row items-center justify-center font-light">
                <TextRotate
                  texts={[
                    "Hello",
                    "नमस्ते", // Hindi
                    "வணக்கம்", // Tamil
                    "নমস্কার", // Bengali
                    "ನಮಸ್ಕಾರ", // Kannada
                    "നമസ്കാരം", // Malayalam
                    "नमस्कार", // Marathi
                    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", // Punjabi
                    "અસલામ વાલેકુમ", // Gujarati
                  ]}
                  mainClassName="text-white px-3 sm:px-4 md:px-5 bg-orange-400 overflow-hidden text-extrabold py-1 sm:py-2 md:py-2 justify-center rounded-lg mx-2"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
                <span
                  className="text-gray-700 text-extrabold"
                >
                  RupeeBee!
                </span>
              </motion.div>
            </LayoutGroup>
          </div>

          {/* Download Button */}
          <div className="flex justify-center relative text-white z-50">
            <Link
              href="https://github.com/collabdoor/rupeebee/releases/download/v1.0.0/app-release.apk"
              className="inline-flex items-center gap-2 px-6 py-4 bg-blue-700 text-white cursor-pointer text-xl font-medium rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download RupeeBee
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
