"use client";

import StackingCards, {
  StackingCardItem,
} from "@/components/fancy/blocks/stacking-cards";
import Android from "@/components/magicui/android";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { cn } from "@/lib/utils";
import {
  ShieldIcon,
  TrendingUpIcon,
  CalculatorIcon,
  PhoneIcon,
  UsersIcon,
} from "lucide-react";
import { Highlighter } from "./magicui/highlighter";
import { PointerHighlight } from "./ui/pointer-highlight";

const features = [
  {
    title: "Global but make it local - Multilingual Support",
    description:
      "App supports multiple languages to cater to a diverse user base",
    icon: ShieldIcon,
    image: "/bee-props/security.png",
    gradient: "from-green-100 to-emerald-100",
    iconColor: "text-green-600",
  },
  {
    title: "Spend smart and not hard! - Intelligent Tips",
    description:
      "Grow your money with intelligent planning and investment strategies",
    icon: TrendingUpIcon,
    image: "https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/screenshots/26.webp",
    gradient: "from-blue-100 to-cyan-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Ganit Ki Dukaan for your Paisa - Calculators",
    description:
      "Use our calculators and planning tools to make informed decisions. With 38+ designed specifically for Indian income, tax, and investment needs. ",
    icon: CalculatorIcon,
    image: "https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/screenshots/12.webp",
    gradient: "from-yellow-100 to-amber-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Learn by clicking, not yawning - Quizes & Quests",
    description:
      "Offering 20+ localized language-specific videos and quizzes that are interactive make learning fun and engaging.",
    icon: PhoneIcon,
    image: "https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/screenshots/10.jpg",
    gradient: "from-purple-100 to-violet-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Stay Secure with Secure Scanner",
    description: "Keep your financial data safe with our advanced security features.",
    icon: UsersIcon,
    image: "https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/screenshots/19.webp",
    gradient: "from-pink-100 to-rose-100",
    iconColor: "text-pink-600",
  },
];

export default function FeaturesSection() {
  return (
    <>
      <section className="relative bg-gradient-to-tr from-green-50 via-white to-yellow-50">
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
                    <h1 className=" sm:text-lg md:text-3xl mx-auto max-w-3xl">
                      From fraud{" "}
                      <PointerHighlight
                        rectangleClassName="bg-blue-100 border-green-300 leading-loose"
                        pointerClassName="text-green-500 h-3 w-3"
                        containerClassName="inline-block ml-1"
                      >
                        <span className="p-2 pb-2 relative z-10">protection</span>
                      </PointerHighlight>{" "}
                      to smart{" "}
                      <Highlighter action="underline">savings</Highlighter>,
                      we&apos;ve got you covered
                    </h1>
                  </div>
                )}

                <div className="container mx-auto px-2 sm:px-4">
                  <div
                    className={cn(
                      "relative min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] w-full max-w-xs sm:max-w-2xl md:max-w-5xl lg:max-w-6xl mx-auto rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20",
                      `bg-gradient-to-br ${feature.gradient}`,
                      "backdrop-blur-sm"
                    )}
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between h-full gap-6 md:gap-8">
                      <div className="flex-1 text-center md:text-left md:pr-6 lg:pr-8 max-w-md lg:max-w-lg">
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
                      </div>

                      <div className="flex-shrink-0 mt-4 md:mt-0 flex items-center justify-center">
                        
                          <div className="relative">
                            <Iphone15Pro
                              className="w-40 h-80 sm:w-48 sm:h-96 md:w-56 md:h-[28rem] lg:w-64 lg:h-[32rem] mx-auto"
                              src={
                                feature.image ||
                                "/bee-props/welcome-rupeebee.png"
                              }
                            />
                          </div>
                        
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
