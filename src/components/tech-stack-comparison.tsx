"use client";

import React, { useState, forwardRef, useRef, RefObject } from "react";
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

// Types
interface TechData {
  title: string;
  description: string;
  iconUrl: string;
  icon: string;
}

interface LayoutRefs {
  descRefs: RefObject<HTMLDivElement | null>[];
  iconRefs: RefObject<HTMLDivElement | null>[];
  rupeebeeRef: RefObject<HTMLDivElement | null>;
  usersRef: RefObject<HTMLDivElement | null>;
}

interface BeamConnectionsProps {
  layoutRefs: LayoutRefs;
  containerRef: RefObject<HTMLDivElement | null>;
  className?: string;
  keyPrefix: string;
}

interface TechStackLayoutProps {
  layoutRefs: LayoutRefs;
  techData: TechData[];
  className?: string;
  layout: 'desktop' | 'mobile';
}

// Constants
const TECH_DATA: TechData[] = [
  { title: "Flutter", description: "Cross-platform framework for beautiful apps", iconUrl: "/technologies/flutter.svg", icon: "flutter" },
  { title: "Dart", description: "Object-oriented language for UI development", iconUrl: "/technologies/dart.svg", icon: "dart" },
  { title: "Riverpod", description: "Provider pattern with compile-time safety", iconUrl: "/technologies/riverpod.svg", icon: "riverpod" },
  { title: "Supabase", description: "Open-source Firebase alternative", iconUrl: "/technologies/supabase.svg", icon: "supabase" },
  { title: "Lottie", description: "Lightweight, scalable animations", iconUrl: "/technologies/lottie.svg", icon: "lottie" },
];

const BEAM_GRADIENT = {
  start: "#10B981",
  stop: "#F59E0B"
};

const USERS_IMAGE_URL = "https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/bee-props/13.webp";

const TAB_CONFIG = [
  { key: "technologies", label: "Which TechStack?" },
  { key: "overview", label: "Why though?" },
] as const;

// Icons object
const Icons = {
  flutter: () => (
    <Image
      src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/tech-logos/flutter.svg"
      alt="Flutter"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  dart: () => (
    <Image
      src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/tech-logos/dart.svg"
      alt="Dart"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  riverpod: () => (
    <Image
      src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/tech-logos/riverpod.svg"
      alt="Riverpod"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  supabase: () => (
    <Image
      src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/tech-logos/supabase.svg"
      alt="Supabase"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  lottie: () => (
    <Image
      src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/tech-logos/lottie.svg"
      alt="Lottie"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  react: () => (
    <Image
      src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/tech-logos/react-native.svg"
      alt="React Native"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  ),
  rupeebee: () => (
    <Image
      src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/logo-variants/green-dark-logo.webp"
      alt="RupeeBee"
      width={64}
      height={64}
      className="rounded-full w-16 h-16"
    />
  ),
};

// Comparison data
const comparisonData = {
  flutter: {
    name: "Flutter",
    tagline: "Our Choice",
    features: [
      {
        icon: Shield,
        title: "Financial Security Focus",
        description: "Robust architecture perfect for handling sensitive financial data and transactions",
        advantage: true,
      },
      {
        icon: Zap,
        title: "Lightning Fast Performance",
        description: "60-120 FPS smooth animations for seamless money management experience",
        advantage: true,
      },
      {
        icon: Palette,
        title: "Custom Financial UI",
        description: "Pixel-perfect charts, calculators, and financial widgets that users love",
        advantage: true,
      },
      {
        icon: Target,
        title: "Single Codebase Efficiency",
        description: "One codebase for iOS & Android = faster feature delivery and consistent UX",
        advantage: true,
      },
      {
        icon: Clock,
        title: "Rapid Development Cycle",
        description: "Hot reload and excellent DevEx means we can iterate and improve RupeeBee faster",
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
        description: "Uses native components but limits custom financial UI design",
        advantage: false,
      },
      {
        icon: Code,
        title: "JavaScript Bridge Overhead",
        description: "Performance bottlenecks for complex financial calculations and animations",
        advantage: false,
      },
      {
        icon: Rocket,
        title: "Third-Party Dependencies",
        description: "Requires multiple libraries for custom financial widgets and charts",
        advantage: false,
      },
      {
        icon: Gauge,
        title: "Inconsistent Performance",
        description: "Variable performance across different devices and OS versions",
        advantage: false,
      },
    ],
  },
};

// Components
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

const DescriptionCard = forwardRef<
  HTMLDivElement,
  {
    title: string;
    description: string;
    iconUrl: string;
    className?: string;
  }
>(({ title, description, iconUrl, className = "" }, ref) => (
  <div 
    ref={ref}
    className={cn(
      "bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 relative overflow-hidden",
      className
    )}
  >
    <div 
      className="absolute inset-0 opacity-10 bg-no-repeat bg-right bg-contain"
      style={{
        backgroundImage: `url('${iconUrl}')`,
        backgroundSize: '80px 80px',
        backgroundPosition: 'right 10px center',
      }}
    />
    <div className="relative z-10">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
));
DescriptionCard.displayName = "DescriptionCard";

const UserImage: React.FC<{ className?: string }> = ({ className }) => (
  <Image
    src={USERS_IMAGE_URL}
    alt="Users"
    width={32}
    height={32}
    className={className}
  />
);

// Desktop Layout Component
const DesktopTechStackLayout: React.FC<TechStackLayoutProps> = ({ layoutRefs, techData }) => {
  const getDescriptionCardClassName = (index: number) => {
    switch (index) {
      case 1: return "transform translate-x-4";
      case 2: return "transform -translate-x-2";
      case 4: return "transform translate-x-3";
      default: return "";
    }
  };

  return (
    <div className="hidden md:flex size-full items-center justify-between gap-8">
      {/* Description Cards - Left Side */}
      <div className="flex flex-col gap-6 w-1/3">
        {layoutRefs.descRefs.map((ref, index) => (
          <DescriptionCard
            key={index}
            ref={ref}
            title={techData[index].title}
            description={techData[index].description}
            iconUrl={techData[index].iconUrl}
            className={getDescriptionCardClassName(index)}
          />
        ))}
      </div>

      {/* Tech Stack Icons - Center */}
      <div className="flex flex-col items-center justify-center gap-4 w-1/3">
        {layoutRefs.iconRefs.map((ref, index) => (
          <Circle key={index} ref={ref} className="size-16 sm:size-20 md:size-24">
            {Icons[techData[index].icon as keyof typeof Icons]()}
          </Circle>
        ))}
      </div>

      {/* RupeeBee & Users - Right Side */}
      <div className="flex items-center gap-8 w-1/3 justify-center">
        <Circle ref={layoutRefs.rupeebeeRef} className="size-20 sm:size-24 md:size-28">
          <Icons.rupeebee />
        </Circle>
        <Circle ref={layoutRefs.usersRef} className="size-16 sm:size-20 md:size-24">
          <UserImage className="w-14 pb-1 h-auto" />
        </Circle>
      </div>
    </div>
  );
};

// Mobile Layout Component
const MobileTechStackLayout: React.FC<TechStackLayoutProps> = ({ layoutRefs, techData }) => {
  return (
    <div className="md:hidden flex flex-col items-center justify-center gap-8 w-full">
      {/* Users - Top */}
      <div className="flex justify-center">
        <Circle ref={layoutRefs.usersRef} className="size-16">
          <UserImage className="w-8 h-auto rounded-full" />
        </Circle>
      </div>

      {/* RupeeBee - Second */}
      <div className="flex justify-center">
        <Circle ref={layoutRefs.rupeebeeRef} className="size-20">
          <Icons.rupeebee />
        </Circle>
      </div>

      {/* Tech Stack Icons - Third */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {layoutRefs.iconRefs.map((ref, index) => (
          <Circle key={index} ref={ref} className="size-16">
            {Icons[techData[index].icon as keyof typeof Icons]()}
          </Circle>
        ))}
      </div>

      {/* Description Cards - Bottom */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-lg px-4">
        {layoutRefs.descRefs.map((ref, index) => (
          <DescriptionCard
            key={index}
            ref={ref}
            title={techData[index].title}
            description={techData[index].description}
            iconUrl={techData[index].iconUrl}
            className="text-xs"
          />
        ))}
      </div>
    </div>
  );
};

// Beam connections component
const BeamConnections: React.FC<BeamConnectionsProps> = ({ 
  layoutRefs, 
  containerRef, 
  className,
  keyPrefix 
}) => {
  return (
    <div className={className}>
      {/* Description Cards to Icons */}
      {layoutRefs.descRefs.map((descRef, index) => (
        <AnimatedBeam
          key={`${keyPrefix}-desc-to-icon-${index}`}
          containerRef={containerRef}
          fromRef={descRef}
          toRef={layoutRefs.iconRefs[index]}
          gradientStartColor={BEAM_GRADIENT.start}
          gradientStopColor={BEAM_GRADIENT.stop}
        />
      ))}
      
      {/* Icons to RupeeBee */}
      {layoutRefs.iconRefs.map((iconRef, index) => (
        <AnimatedBeam
          key={`${keyPrefix}-icon-to-rupeebee-${index}`}
          containerRef={containerRef}
          fromRef={iconRef}
          toRef={layoutRefs.rupeebeeRef}
          gradientStartColor={BEAM_GRADIENT.start}
          gradientStopColor={BEAM_GRADIENT.stop}
        />
      ))}
      
      {/* RupeeBee to Users */}
      <AnimatedBeam
        key={`${keyPrefix}-rupeebee-to-users`}
        containerRef={containerRef}
        fromRef={layoutRefs.rupeebeeRef}
        toRef={layoutRefs.usersRef}
        gradientStartColor={BEAM_GRADIENT.start}
        gradientStopColor={BEAM_GRADIENT.stop}
      />
    </div>
  );
};

export default function TechStackAndComparison() {
  const [activeTab, setActiveTab] = useState<"overview" | "technologies">(
    "technologies"
  );

  // Refs for tech stack animation
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create separate refs for desktop and mobile layouts
  const desktopDescRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const desktopIconRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const desktopRupeebeeRef = useRef<HTMLDivElement>(null);
  const desktopUsersRef = useRef<HTMLDivElement>(null);
  
  const mobileDescRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const mobileIconRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const mobileRupeebeeRef = useRef<HTMLDivElement>(null);
  const mobileUsersRef = useRef<HTMLDivElement>(null);

  const desktopRefs = {
    descRefs: desktopDescRefs,
    iconRefs: desktopIconRefs,
    rupeebeeRef: desktopRupeebeeRef,
    usersRef: desktopUsersRef,
  };
  const mobileRefs = {
    descRefs: mobileDescRefs,
    iconRefs: mobileIconRefs,
    rupeebeeRef: mobileRupeebeeRef,
    usersRef: mobileUsersRef,
  };

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
            Powers <span className="text-blue-400">RupeeBee</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built with modern technology for the best financial experience
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border">
            {TAB_CONFIG.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-6 py-3 rounded-full text-md font-semibold transition-all duration-300",
                  activeTab === tab.key
                    ? "bg-cyan-600/80 text-white"
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
                    Google&apos;s UI toolkit that delivers exceptional performance
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
                    Facebook&apos;s framework that uses native components but relies
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
                {/* Desktop Layout */}
                <DesktopTechStackLayout 
                  layoutRefs={desktopRefs} 
                  techData={TECH_DATA}
                  layout="desktop"
                />

                {/* Mobile Layout */}
                <MobileTechStackLayout 
                  layoutRefs={mobileRefs} 
                  techData={TECH_DATA}
                  layout="mobile"
                />

                {/* Desktop Beams */}
                <BeamConnections
                  layoutRefs={desktopRefs}
                  containerRef={containerRef}
                  className="hidden md:block"
                  keyPrefix="desktop"
                />

                {/* Mobile Beams */}
                <BeamConnections
                  layoutRefs={mobileRefs}
                  containerRef={containerRef}
                  className="md:hidden"
                  keyPrefix="mobile"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
