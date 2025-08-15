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
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-16 sm:size-20 md:size-24 items-center justify-center rounded-full border-2 border-border bg-white p-2 sm:p-3 md:p-4 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
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
    "overview"
  );

  // Refs for tech stack animation
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);

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
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border">
            {[
              { key: "overview", label: "Overview" },
              { key: "technologies", label: "Technologies Used" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={cn(
                  "px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300",
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
                    {comparisonData.flutter.features
                      .slice(0, 3)
                      .map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature.title}</span>
                        </div>
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
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">RN</span>
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
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Large JavaScript ecosystem</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span>JS bridge performance overhead</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span>Limited financial UI customization</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Comparison */}
              <div className="md:col-span-2 mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Icons.flutter />
                      Why Flutter for RupeeBee
                    </h3>
                    <div className="space-y-3">
                      {comparisonData.flutter.features.map((feature, index) => (
                        <FeatureCard
                          key={index}
                          feature={feature}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-xs">RN</span>
                      </div>
                      React Native Limitations
                    </h3>
                    <div className="space-y-3">
                      {comparisonData.reactNative.features.map(
                        (feature, index) => (
                          <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                          />
                        )
                      )}
                    </div>
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
                className={cn(
                  "relative flex min-h-[300px] sm:min-h-[400px] md:h-[500px] w-full items-center justify-center overflow-hidden p-4 sm:p-6 md:p-10"
                )}
                ref={containerRef}
              >
                <div className="flex size-full max-w-xs sm:max-w-2xl md:max-w-4xl flex-col sm:flex-row items-center sm:items-stretch justify-center sm:justify-between gap-6 sm:gap-8 md:gap-10">
                  <div className="flex flex-row sm:flex-col justify-center items-center sm:items-stretch gap-2 sm:gap-4">
                    <Circle
                      ref={div1Ref}
                      className="size-12 sm:size-16 md:size-24"
                    >
                      <Icons.flutter />
                    </Circle>
                    <Circle
                      ref={div2Ref}
                      className="size-12 sm:size-16 md:size-24"
                    >
                      <Icons.dart />
                    </Circle>
                    <Circle
                      ref={div3Ref}
                      className="size-12 sm:size-16 md:size-24"
                    >
                      <Icons.riverpod />
                    </Circle>
                    <Circle
                      ref={div4Ref}
                      className="size-12 sm:size-16 md:size-24 hidden sm:flex"
                    >
                      <Icons.hive />
                    </Circle>
                    <Circle
                      ref={div5Ref}
                      className="size-12 sm:size-16 md:size-24 hidden sm:flex"
                    >
                      <Icons.lottie />
                    </Circle>
                    <Circle
                      ref={div6Ref}
                      className="size-12 sm:size-16 md:size-24 hidden sm:flex"
                    >
                      <Icons.supabase />
                    </Circle>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Circle
                      ref={div7Ref}
                      className="size-20 sm:size-24 md:size-32"
                    >
                      <Icons.rupeebee />
                    </Circle>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Circle
                      ref={div8Ref}
                      className="size-12 sm:size-16 md:size-24"
                    >
                      <Users2 />
                    </Circle>
                  </div>
                </div>

                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={div1Ref}
                  toRef={div6Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={div2Ref}
                  toRef={div6Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={div3Ref}
                  toRef={div6Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={div4Ref}
                  toRef={div6Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={div5Ref}
                  toRef={div6Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={div7Ref}
                  toRef={div6Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={div6Ref}
                  toRef={div8Ref}
                  gradientStartColor="#10B981"
                  gradientStopColor="#F59E0B"
                />
              </div>

              {/* Technology Descriptions */}
              {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Icons.flutter />
                    <h3 className="font-semibold text-gray-900">Flutter</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Google's UI toolkit for building beautiful, natively
                    compiled applications
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Icons.dart />
                    <h3 className="font-semibold text-gray-900">Dart</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Optimized programming language for fast apps with great
                    developer experience
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Icons.riverpod />
                    <h3 className="font-semibold text-gray-900">Riverpod</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Reactive state management that makes data flow simple and
                    testable
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Icons.hive />
                    <h3 className="font-semibold text-gray-900">Hive</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Lightning-fast local database for secure financial data
                    storage
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Icons.supabase />
                    <h3 className="font-semibold text-gray-900">Supabase</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Open-source backend for secure authentication and real-time
                    data sync
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Icons.lottie />
                    <h3 className="font-semibold text-gray-900">Lottie</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Beautiful animations that make financial learning engaging
                    and fun
                  </p>
                </div>
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
