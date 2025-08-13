"use client";

import { useRef } from "react";
import StackingCards, { StackingCardItem } from "@/components/fancy/blocks/stacking-cards";
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
import { Highlighter } from "../magicui/highlighter";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

const features = [
  {
    title: "Financial Security",
    description: "Learn to protect yourself from fraud and secure your financial future",
    icon: ShieldIcon,
    image: "/bee-props/security.png",
    gradient: "from-green-100 to-emerald-100",
    iconColor: "text-green-600",
  },
  {
    title: "Smart Savings",
    description: "Grow your money with intelligent planning and investment strategies",
    icon: TrendingUpIcon,
    image: "/bee-props/grow-and-save.png",
    gradient: "from-blue-100 to-cyan-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Financial Tools",
    description: "Use our calculators and planning tools to make informed decisions",
    icon: CalculatorIcon,
    image: "/bee-props/calculator-tools.png",
    gradient: "from-yellow-100 to-amber-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Download RupeeBee",
    description: "Get the complete financial literacy app on your mobile device",
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
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="features" className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "absolute inset-0 opacity-20"
        )}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Everything You Need for{" "}
            <Highlighter action="box" color="#87CEFA">
              Financial Success
            </Highlighter>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From fraud protection to smart savings, we've got you covered
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div 
          ref={containerRef}
          className="max-w-4xl mx-auto h-[400vh] overflow-y-auto"
        >
          <StackingCards 
            totalCards={features.length} 
            scrollOptons={{ container: containerRef }}
          >
            {features.map((feature, index) => (
              <StackingCardItem
                key={feature.title}
                index={index}
                className="h-[400px]"
              >
                <div
                  className={cn(
                    "relative h-full w-full rounded-2xl p-8 shadow-xl border border-white/20",
                    `bg-gradient-to-br ${feature.gradient}`,
                    "backdrop-blur-sm"
                  )}
                >
                  {/* Card Content */}
                  <div className="flex flex-col md:flex-row items-center justify-between h-full">
                    {/* Left Content */}
                    <div className="flex-1 mb-8 md:mb-0 md:pr-8">
                      <div className="flex items-center mb-4">
                        <div className={cn(
                          "p-3 rounded-full bg-white/80 mr-4",
                          feature.iconColor
                        )}>
                          <feature.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                          {feature.title}
                        </h3>
                      </div>
                      
                      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <ShimmerButton 
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                      >
                        {feature.title === "Download RupeeBee" ? "Download Now" : "Learn More"}
                      </ShimmerButton>
                    </div>

                    {/* Right Visual */}
                    <div className="flex-shrink-0">
                      {feature.isApp ? (
                        <div className="relative">
                          <Android
                            className="w-48 h-48 md:w-56 md:h-56"
                            src={feature.image}
                          />
                        </div>
                      ) : feature.isCommunity ? (
                        <div className="grid grid-cols-3 gap-4 p-6 bg-white/50 rounded-xl">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <Image
                              key={i}
                              src={`/bee-props/${[10, 11, 12, 13, 14, 15, 16, 17, 18][i]}.png`}
                              alt=""
                              width={60}
                              height={60}
                              className="object-contain rounded-full bg-white/80 p-2"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="relative">
                          <Image
                            src={feature.image!}
                            alt={feature.title}
                            width={200}
                            height={200}
                            className="object-contain drop-shadow-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
                </div>
              </StackingCardItem>
            ))}
          </StackingCards>
        </div>
      </div>
    </section>
  );
}
