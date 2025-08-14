"use client";

import StackingCards, {
  StackingCardItem,
} from "@/components/fancy/blocks/stacking-cards";
import { DotPattern } from "@/components/magicui/dot-pattern";
import Image from "next/image";
import Android from "@/components/magicui/android";
import { cn } from "@/lib/utils";
import {
  ShieldIcon,
  TrendingUpIcon,
  CalculatorIcon,
  PhoneIcon,
  UsersIcon,
} from "lucide-react";
import { Highlighter } from "./magicui/highlighter";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

const features = [
  {
    title: "Financial Security",
    description:
      "Learn to protect yourself from fraud and secure your financial future",
    icon: ShieldIcon,
    image: "/bee-props/security.png",
    gradient: "from-green-100 to-emerald-100",
    iconColor: "text-green-600",
  },
  {
    title: "Smart Savings",
    description:
      "Grow your money with intelligent planning and investment strategies",
    icon: TrendingUpIcon,
    image: "/bee-props/grow-and-save.png",
    gradient: "from-blue-100 to-cyan-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Financial Tools",
    description:
      "Use our calculators and planning tools to make informed decisions",
    icon: CalculatorIcon,
    image: "/bee-props/calculator-tools.png",
    gradient: "from-yellow-100 to-amber-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Download RupeeBee",
    description:
      "Get the complete financial literacy app on your mobile device",
    icon: PhoneIcon,
    image: "/bee-props/welcome-rupeebee.png",
    gradient: "from-purple-100 to-violet-100",
    iconColor: "text-purple-600",
    isApp: true,
  },
  {
    title: "Join Community",
    description: "Connect with like-minded savers and learn from each other",
    icon: UsersIcon,
    gradient: "from-pink-100 to-rose-100",
    iconColor: "text-pink-600",
    isCommunity: true,
  },
];

export default function FeaturesSection() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-green-50 via-white to-yellow-50">
        <StackingCards totalCards={features.length} className="h-[500vh]">
          {features.map((feature, index) => (
            <StackingCardItem
              key={feature.title}
              index={index}
              className="h-screen"
            >
              <div className="h-full flex flex-col items-center justify-center px-2 sm:px-4">
                {index === 0 && (
                  <div className="text-center mb-8 sm:mb-14 px-4">
                    <h1 className="text-base sm:text-lg md:text-xl text-gray-600 mx-auto max-w-2xl leading-relaxed">
                      From fraud protection to smart savings, we've got you covered
                    </h1>
                  </div>
                )}
                
                <div className="container mx-auto px-2 sm:px-4">
                  <div
                    className={cn(
                      "relative min-h-[300px] sm:min-h-[350px] md:h-[400px] w-full max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20",
                      `bg-gradient-to-br ${feature.gradient}`,
                      "backdrop-blur-sm"
                    )}
                  >
                    {/* Card Content */}
                    <div className="flex flex-col md:flex-row items-center justify-between h-full gap-4 md:gap-0">
                      {/* Left Content */}
                      <div className="flex-1 text-center md:text-left md:pr-8">
                        <div className="flex items-center justify-center md:justify-start mb-3 sm:mb-4">
                          <div
                            className={cn(
                              "p-2 sm:p-3 rounded-full bg-white/80 mr-2 sm:mr-4 flex-shrink-0",
                              feature.iconColor
                            )}
                          >
                            <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                            {feature.title}
                          </h3>
                        </div>

                        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed max-w-sm md:max-w-none mx-auto md:mx-0">
                          {feature.description}
                        </p>
                        <ShimmerButton className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                          {feature.title === "Download RupeeBee"
                            ? "Download Now"
                            : "Learn More"}
                        </ShimmerButton>
                      </div>

                      {/* Right Visual */}
                      <div className="flex-shrink-0 mt-4 md:mt-0">
                        {feature.isApp ? (
                          <div className="relative">
                            <Android
                              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto"
                              src={feature.image}
                            />
                          </div>
                        ) : feature.isCommunity ? (
                          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 bg-white/50 rounded-lg sm:rounded-xl max-w-xs sm:max-w-sm mx-auto">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <Image
                                key={i}
                                src={`/bee-props/${
                                  [10, 11, 12, 13, 14, 15, 16, 17, 18][i]
                                }.png`}
                                alt=""
                                width={40}
                                height={40}
                                className="object-contain rounded-full bg-white/80 p-1 sm:p-2 w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="relative">
                            <Image
                              src={feature.image!}
                              alt={feature.title}
                              width={120}
                              height={120}
                              className="object-contain drop-shadow-lg mx-auto sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/20 rounded-full blur-xl"></div>
                    <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-white/10 rounded-full blur-lg"></div>
                  </div>
                </div>
              </div>
            </StackingCardItem>
          ))}
        </StackingCards>
      </section>
    </>
  );
}
