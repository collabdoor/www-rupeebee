"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { 
  Zap, 
  Palette, 
  Code, 
  Gauge, 
  Users, 
  CheckCircle, 
  XCircle,
  Smartphone,
  Cpu,
  Layers,
  Globe
} from "lucide-react";
import { Highlighter } from "./magicui/highlighter";
import Image from "next/image";

const comparisonData = {
  flutter: {
    name: "Flutter",
    tagline: "Our Choice",
    color: "from-blue-500 to-blue-600",
    logo: "/technologies/flutter.svg",
    stats: {
      performance: 95,
      customization: 98,
      development: 92,
      ecosystem: 88
    },
    features: [
      {
        icon: Palette,
        title: "Custom, Performant UI",
        description: "Pixel-perfect UI with Skia rendering engine",
        advantage: true
      },
      {
        icon: Layers,
        title: "Built-in Widget Set",
        description: "Rich set of customizable widgets out of the box",
        advantage: true
      },
      {
        icon: Zap,
        title: "No JS Bridge",
        description: "Direct compilation to native ARM code for better performance",
        advantage: true
      },
      {
        icon: Code,
        title: "Strong Ecosystem",
        description: "Excellent integration with Supabase, Hive, Riverpod",
        advantage: true
      },
      {
        icon: Gauge,
        title: "Hot Reload & DevEx",
        description: "Instant hot reload with Dart's robust tooling",
        advantage: true
      }
    ]
  },
  reactNative: {
    name: "React Native",
    tagline: "Alternative",
    color: "from-gray-500 to-gray-600",
    stats: {
      performance: 78,
      customization: 65,
      development: 85,
      ecosystem: 92
    },
    features: [
      {
        icon: Smartphone,
        title: "Native UI Components",
        description: "Uses platform-specific UI components",
        advantage: false
      },
      {
        icon: Globe,
        title: "JS Ecosystem",
        description: "Vast JavaScript/React ecosystem",
        advantage: true
      },
      {
        icon: Cpu,
        title: "JS Bridge Overhead",
        description: "Performance overhead due to JavaScript bridge",
        advantage: false
      },
      {
        icon: Users,
        title: "Large Community",
        description: "Mature community with extensive resources",
        advantage: true
      },
      {
        icon: Code,
        title: "External Dependencies",
        description: "Relies on third-party libraries for custom UI",
        advantage: false
      }
    ]
  }
};

const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-800 font-bold">{value}%</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className={cn("h-full rounded-full bg-gradient-to-r", color)}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </div>
  </div>
);

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
      <div className={cn(
        "p-2 rounded-lg flex-shrink-0",
        feature.advantage ? "bg-green-100" : "bg-red-100"
      )}>
        <feature.icon className={cn(
          "w-5 h-5",
          feature.advantage ? "text-green-600" : "text-red-600"
        )} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
          {feature.advantage ? (
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
    </div>
  </motion.div>
);

export default function FlutterComparison() {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'performance'>('overview');

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-yellow-50 pb-16 sm:pb-24">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Why <Highlighter action="highlight" color="#87CEFA">Flutter</Highlighter> Powers{" "}
            <span className="text-green-700">RupeeBee</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience smoother UI and performance with our technology choice
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'features', label: 'Features' },
              { key: 'performance', label: 'Performance' }
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
          {activeTab === 'overview' && (
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
                      <Image 
                        src="/technologies/flutter.svg" 
                        alt="Flutter" 
                        width={32} 
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Flutter</h3>
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                        Our Choice ✨
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Google's UI toolkit that renders custom, high-performance apps with pixel-perfect 
                    control and seamless cross-platform compatibility.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>60-120 FPS smooth performance</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Single codebase for iOS & Android</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Perfect integration with our tech stack</span>
                    </div>
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
                      <h3 className="text-xl font-bold text-gray-900">React Native</h3>
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
                        Alternative
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Facebook's framework that uses native UI components but relies on JavaScript 
                    bridge communication, leading to performance bottlenecks.
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
                      <span>Limited UI customization</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Image src="/technologies/flutter.svg" alt="Flutter" width={24} height={24} />
                  Flutter Advantages
                </h3>
                <div className="space-y-3">
                  {comparisonData.flutter.features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">RN</span>
                  </div>
                  React Native Comparison
                </h3>
                <div className="space-y-3">
                  {comparisonData.reactNative.features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
                  Performance Comparison
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Image src="/technologies/flutter.svg" alt="Flutter" width={24} height={24} />
                      <span className="font-semibold text-gray-900">Flutter</span>
                    </div>
                    <StatBar label="UI Performance" value={comparisonData.flutter.stats.performance} color="from-green-500 to-green-600" />
                    <StatBar label="Customization" value={comparisonData.flutter.stats.customization} color="from-blue-500 to-blue-600" />
                    <StatBar label="Dev Experience" value={comparisonData.flutter.stats.development} color="from-purple-500 to-purple-600" />
                    <StatBar label="Ecosystem" value={comparisonData.flutter.stats.ecosystem} color="from-yellow-500 to-yellow-600" />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-xs">RN</span>
                      </div>
                      <span className="font-semibold text-gray-900">React Native</span>
                    </div>
                    <StatBar label="UI Performance" value={comparisonData.reactNative.stats.performance} color="from-gray-500 to-gray-600" />
                    <StatBar label="Customization" value={comparisonData.reactNative.stats.customization} color="from-gray-500 to-gray-600" />
                    <StatBar label="Dev Experience" value={comparisonData.reactNative.stats.development} color="from-gray-500 to-gray-600" />
                    <StatBar label="Ecosystem" value={comparisonData.reactNative.stats.ecosystem} color="from-gray-500 to-gray-600" />
                  </div>
                </div>

                {/* Key Insight */}
                <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Why Flutter for RupeeBee?</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Flutter's superior UI customization and performance without JavaScript bridge overhead 
                        makes it perfect for delivering the smooth, responsive financial experience our users deserve.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
