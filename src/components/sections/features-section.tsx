import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { DotPattern } from "@/components/magicui/dot-pattern";
import Image from "next/image";
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

const features = [
  {
    name: "Financial Security",
    description: "Learn to protect yourself from fraud",
    href: "#",
    cta: "Learn more",
    Icon: ShieldIcon,
    background: (
      <div className="absolute -right-20 -top-20 opacity-60">
        <Image
          src="/bee-props/security.png"
          alt="Security"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    name: "Smart Savings",
    description: "Grow your money with intelligent planning",
    href: "#",
    cta: "Start saving",
    Icon: TrendingUpIcon,
    background: (
      <div className="absolute -right-20 -top-20 opacity-60">
        <Image
          src="/bee-props/grow-and-save.png"
          alt="Savings"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    name: "Financial Tools",
    description: "Use our calculators and planning tools",
    href: "#",
    cta: "Try tools",
    Icon: CalculatorIcon,
    background: (
      <div className="absolute -right-20 -top-20 opacity-60">
        <Image
          src="/bee-props/calculator-tools.png"
          alt="Tools"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    name: "Download RupeeBee",
    description: "Get the complete financial literacy app",
    href: "#",
    cta: "Download now",
    Icon: PhoneIcon,
    background: (
      <div className="absolute -right-10 -top-10 opacity-80">
        <Android
          className="size-[150px]"
          src="/bee-props/welcome-rupeebee.png"
        />
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    name: "Join Community",
    description: "Connect with like-minded savers",
    href: "#",
    cta: "Join us",
    Icon: UsersIcon,
    background: (
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-4 gap-4 p-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Image 
              key={i}
              src={`/bee-props/${[10, 11, 12, 13, 14, 15, 16, 17][i]}.png`} 
              alt="" 
              width={40} 
              height={40}
              className="object-contain rounded-full"
            />
          ))}
        </div>
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white relative">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "opacity-30"
        )}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-heading mb-4">
            Everything You Need for{" "}
            <span className="text-green-700">Financial Success</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From fraud protection to smart savings, we've got you covered
          </p>
        </div>

        <BentoGrid className="lg:grid-rows-3 max-w-5xl mx-auto">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
