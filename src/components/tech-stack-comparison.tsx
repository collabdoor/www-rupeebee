"use client";

import React, { useState, forwardRef, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Zap,
  Palette,
  Code,
  Gauge,
  CheckCircle,
  XCircle,
  Smartphone,
  Shield,
  Clock,
  Target,
  Users2,
  Rocket,
} from "lucide-react";
import { Highlighter } from "./magicui/highlighter";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";

const Circle = forwardRef<
  HTMLDivElement,
  { 
    className?: string; 
    children?: React.ReactNode;
  }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center rounded-full border-2 border-border bg-white shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const comparisonData = {
  flutter: {
    name: "Flutter",
    tagline: "Our Choice",
    features: [
      {
        icon: Shield,
        title: "Financial Security Focus",
        description:
          "Robust architecture perfect for handling sensitive financial data and transactions",
        advantage: true,
      },
      {
        icon: Zap,
        title: "Lightning Fast Performance",
        description:
          "60-120 FPS smooth animations for seamless money management experience",
        advantage: true,
      },
      {
        icon: Palette,
        title: "Custom Financial UI",
        description:
          "Pixel-perfect charts, calculators, and financial widgets that users love",
        advantage: true,
      },
      {
        icon: Target,
        title: "Single Codebase Efficiency",
        description:
          "One codebase for iOS & Android = faster feature delivery and consistent UX",
        advantage: true,
      },
      {
        icon: Clock,
        title: "Rapid Development Cycle",
        description:
          "Hot reload and excellent DevEx means we can iterate and improve RupeeBee faster",
        advantage: true,
      },
    ],
  },
  reactNative: {
    name: "React Native",
    tagline: "Alternative",
    features: [
      {
        icon: Users2,
        title: "Large Developer Community",
        description: "Mature ecosystem with extensive JavaScript resources",
        advantage: true,
      },
      {
        icon: Smartphone,
        title: "Platform-Native UI",
        description:
          "Uses native components but limits custom financial UI design",
        advantage: false,
      },
      {
        icon: Code,
        title: "JavaScript Bridge Overhead",
        description:
          "Performance bottlenecks for complex financial calculations and animations",
        advantage: false,
      },
      {
        icon: Rocket,
        title: "Third-Party Dependencies",
        description:
          "Requires multiple libraries for custom financial widgets and charts",
        advantage: false,
      },
      {
        icon: Gauge,
        title: "Inconsistent Performance",
        description:
          "Variable performance across different devices and OS versions",
        advantage: false,
      },
    ],
  },
};

const Icons = {
  flutter: () => (
    <Image
      src="/technologies/flutter.svg"
      alt="Flutter"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  dart: () => (
    <Image
      src="/technologies/dart.svg"
      alt="Dart"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  riverpod: () => (
    <Image
      src="/technologies/riverpod.svg"
      alt="Riverpod"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  hive: () => (
    <Image
      src="/technologies/hive.svg"
      alt="Hive"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  supabase: () => (
    <Image
      src="/technologies/supabase.svg"
      alt="Supabase"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  lottie: () => (
    <Image
      src="/technologies/lottie.svg"
      alt="Lottie"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  react: () => (
    <Image
      src="/technologies/react-native.svg"
      alt="React Native"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  rupeebee: () => (
    <Image
      src="/assets/logo.png"
      alt="RupeeBee"
      width={64}
      height={64}
      className="rounded-full w-16 h-16"
    />
  ),
};

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={cn(
      "p-4 rounded-xl border backdrop-blur-sm transition-all duration-300",
      feature.advantage
        ? "bg-green-50/80 border-green-200 hover:bg-green-100/80"
        : "bg-red-50/80 border-red-200 hover:bg-red-100/80"
    )}
  >
    <div className="flex items-start gap-3">
      <div
        className={cn(
          "p-2 rounded-lg flex-shrink-0",
          feature.advantage ? "bg-green-100" : "bg-red-100"
        )}
      >
        <feature.icon
          className={cn(
            "w-5 h-5",
            feature.advantage ? "text-green-600" : "text-red-600"
          )}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-gray-900 text-sm">
            {feature.title}
          </h4>
          {feature.advantage ? (
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function TechStackAndComparison() {
  const [activeTab, setActiveTab] = useState<"overview" | "technologies">(
    "technologies"
  );

  // Refs for tech stack animation
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Description card refs
  const desc1Ref = useRef<HTMLDivElement>(null);
  const desc2Ref = useRef<HTMLDivElement>(null);
  const desc3Ref = useRef<HTMLDivElement>(null);
  const desc4Ref = useRef<HTMLDivElement>(null);
  const desc5Ref = useRef<HTMLDivElement>(null);
  const desc6Ref = useRef<HTMLDivElement>(null);
  
  // Tech icon refs
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);
  const icon3Ref = useRef<HTMLDivElement>(null);
  const icon4Ref = useRef<HTMLDivElement>(null);
  const icon5Ref = useRef<HTMLDivElement>(null);
  const icon6Ref = useRef<HTMLDivElement>(null);
  
  // Center refs
  const rupeebeeRef = useRef<HTMLDivElement>(null);
  const usersRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-yellow-50 py-16 sm:py-24">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Why{" "}
            <Highlighter action="highlight" color="#87CEFA">
              Flutter
            </Highlighter>{" "}
            Powers <span className="text-green-700">RupeeBee</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built with modern technology for the best financial experience
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border">
            {[
              { key: "technologies", label: "Which TechStack?" },
              { key: "overview", label: "Why though?" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={cn(
                  "px-6 py-3 rounded-full text-md font-semibold transition-all duration-300",
                  activeTab === tab.key
                    ? "bg-green-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
              {/* Flutter Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icons.flutter />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Flutter
                      </h3>
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                        Our Choice ✨
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Google's UI toolkit that delivers exceptional performance
                    for financial apps with custom widgets perfect for charts,
                    calculators, and secure transactions.
                  </p>
                  <div className="space-y-3">
                    {comparisonData.flutter.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="font-medium">{feature.title}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* React Native Card */}
              <div className="relative group opacity-75">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icons.react />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        React Native
                      </h3>
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
                        Alternative
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Facebook's framework that uses native components but relies
                    on JavaScript bridge, limiting custom financial UI and
                    causing performance overhead.
                  </p>
                  <div className="space-y-3">
                    {comparisonData.reactNative.features.map(
                      (feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-2 text-sm"
                        >
                          {feature.advantage ? (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          )}
                          <span className="font-medium">{feature.title}</span>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Technologies Tab */}
          {activeTab === "technologies" && (
            <motion.div
              key="technologies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div 
                className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden p-6"
                ref={containerRef}
              >
                <div className="flex size-full items-center justify-between gap-8">
                  
                  {/* Description Cards - Left Side */}
                  <div className="flex flex-col gap-6 w-1/3">
                    <div 
                      ref={desc1Ref}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 relative overflow-hidden"
                    >
                      <div 
                        className="absolute inset-0 opacity-10 bg-no-repeat bg-right bg-contain"
                        style={{
                          backgroundImage: `url('/technologies/flutter.svg')`,
                          backgroundSize: '80px 80px',
                          backgroundPosition: 'right 10px center',
                        }}
                      />
                      <div className="relative z-10">
                        <h3 className="font-semibold text-gray-900 mb-2">Flutter</h3>
                        <p className="text-sm text-gray-600">Cross-platform framework for beautiful apps</p>
                      </div>
                    </div>

                    <div 
                      ref={desc2Ref}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 relative overflow-hidden transform translate-x-4"
                    >
                      <div 
                        className="absolute inset-0 opacity-10 bg-no-repeat bg-right bg-contain"
                        style={{
                          backgroundImage: `url('/technologies/dart.svg')`,
                          backgroundSize: '80px 80px',
                          backgroundPosition: 'right 10px center',
                        }}
                      />
                      <div className="relative z-10">
                        <h3 className="font-semibold text-gray-900 mb-2">Dart</h3>
                        <p className="text-sm text-gray-600">Object-oriented language for UI development</p>
                      </div>
                    </div>

                    <div 
                      ref={desc3Ref}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 relative overflow-hidden transform -translate-x-2"
                    >
                      <div 
                        className="absolute inset-0 opacity-10 bg-no-repeat bg-right bg-contain"
                        style={{
                          backgroundImage: `url('/technologies/riverpod.svg')`,
                          backgroundSize: '80px 80px',
                          backgroundPosition: 'right 10px center',
                        }}
                      />
                      <div className="relative z-10">
                        <h3 className="font-semibold text-gray-900 mb-2">Riverpod</h3>
                        <p className="text-sm text-gray-600">Provider pattern with compile-time safety</p>
                      </div>
                    </div>

                    <div 
                      ref={desc4Ref}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 relative overflow-hidden transform translate-x-6"
                    >
                      <div 
                        className="absolute inset-0 opacity-10 bg-no-repeat bg-right bg-contain"
                        style={{
                          backgroundImage: `url('/technologies/hive.svg')`,
                          backgroundSize: '80px 80px',
                          backgroundPosition: 'right 10px center',
                        }}
                      />
                      <div className="relative z-10">
                        <h3 className="font-semibold text-gray-900 mb-2">Hive</h3>
                        <p className="text-sm text-gray-600">NoSQL database with encryption</p>
                      </div>
                    </div>

                    <div 
                      ref={desc5Ref}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 relative overflow-hidden"
                    >
                      <div 
                        className="absolute inset-0 opacity-10 bg-no-repeat bg-right bg-contain"
                        style={{
                          backgroundImage: `url('/technologies/supabase.svg')`,
                          backgroundSize: '80px 80px',
                          backgroundPosition: 'right 10px center',
                        }}
                      />
                      <div className="relative z-10">
                        <h3 className="font-semibold text-gray-900 mb-2">Supabase</h3>
                        <p className="text-sm text-gray-600">Open-source Firebase alternative</p>
                      </div>
                    </div>

                    <div 
                      ref={desc6Ref}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 relative overflow-hidden transform translate-x-3"
                    >
                      <div 
                        className="absolute inset-0 opacity-10 bg-no-repeat bg-right bg-contain"
                        style={{
                          backgroundImage: `url('/technologies/lottie.svg')`,
                          backgroundSize: '80px 80px',
                          backgroundPosition: 'right 10px center',
                        }}
                      />
                      <div className="relative z-10">
                        <h3 className="font-semibold text-gray-900 mb-2">Lottie</h3>
                        <p className="text-sm text-gray-600">Lightweight, scalable animations</p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Icons - Center */}
                  <div className="flex flex-col items-center justify-center gap-4 w-1/3">
                    <Circle ref={icon1Ref} className="size-16 sm:size-20 md:size-24">
                      <Icons.flutter />
                    </Circle>
                    <Circle ref={icon2Ref} className="size-16 sm:size-20 md:size-24">
                      <Icons.dart />
                    </Circle>
                    <Circle ref={icon3Ref} className="size-16 sm:size-20 md:size-24">
                      <Icons.riverpod />
                    </Circle>
                    <Circle ref={icon4Ref} className="size-16 sm:size-20 md:size-24">
                      <Icons.hive />
                    </Circle>
                    <Circle ref={icon5Ref} className="size-16 sm:size-20 md:size-24">
                      <Icons.supabase />
                    </Circle>
                    <Circle ref={icon6Ref} className="size-16 sm:size-20 md:size-24">
                      <Icons.lottie />
                    </Circle>
                  </div>

                  {/* RupeeBee & Users - Right Side */}
                  <div className="flex flex-col items-center gap-8 w-1/3">
                    <Circle ref={rupeebeeRef} className="size-20 sm:size-24 md:size-28">
                      <Icons.rupeebee />
                    </Circle>
                    <Circle ref={usersRef} className="size-16 sm:size-20 md:size-24">
                      <Users2 className="w-8 h-8" />
                    </Circle>
                  </div>
                </div>

                {/* Animated Beams - Description Cards to Icons */}
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={desc1Ref}
                  toRef={icon1Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={desc2Ref}
                  toRef={icon2Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={desc3Ref}
                  toRef={icon3Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={desc4Ref}
                  toRef={icon4Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={desc5Ref}
                  toRef={icon5Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={desc6Ref}
                  toRef={icon6Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                
                {/* Icons to RupeeBee */}
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={icon1Ref}
                  toRef={rupeebeeRef}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={icon2Ref}
                  toRef={rupeebeeRef}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={icon3Ref}
                  toRef={rupeebeeRef}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={icon4Ref}
                  toRef={rupeebeeRef}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={icon5Ref}
                  toRef={rupeebeeRef}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={icon6Ref}
                  toRef={rupeebeeRef}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                
                {/* RupeeBee to Users */}
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={rupeebeeRef}
                  toRef={usersRef}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
