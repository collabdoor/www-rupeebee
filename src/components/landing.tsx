import { WordRotate } from "@/components/magicui/word-rotate";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Marquee } from "@/components/magicui/marquee";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { TextReveal } from "@/components/magicui/text-reveal";
import { Highlighter } from "@/components/magicui/highlighter";
import { DotPattern } from "@/components/magicui/dot-pattern";
import Image from "next/image";
import Android from "@/components/magicui/android";
import Iphone15Pro from "./magicui/iphone-15-pro";
import Header from "./header";
import Footer from "./footer";
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
        <Iphone15Pro
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

const testimonials = [
  {
    name: "Priya",
    role: "Student",
    content: "RupeeBee helped me save ₹50,000 in 6 months!",
  },
  {
    name: "Rahul",
    role: "Professional",
    content: "No more falling for financial scams. Thank you!",
  },
  {
    name: "Anita",
    role: "Entrepreneur",
    content: "Best financial literacy app in India.",
  },
  {
    name: "Vikash",
    role: "Teacher",
    content: "Teaching my students to be financially smart.",
  },
  {
    name: "Meera",
    role: "Mother",
    content: "Protecting my family's financial future.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-left">
                  <p className="leading-relaxed">
                    The{" "}
                    <Highlighter action="underline" color="#FF9800">
                      Magic UI Highlighter
                    </Highlighter>{" "}
                    makes important{" "}
                    <Highlighter action="highlight" color="#87CEFA">
                      text stand out
                    </Highlighter>{" "} 
                    effortlessly.
                  </p>
                </h1>
              </div>

              <p className="text-lg text-gray-600 max-w-lg">
                Learn to save, grow, and protect your money. Stay safe from
                financial fraud with India's most trusted financial literacy
                platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <ShimmerButton className="bg-green-700 hover:bg-green-800">
                  <span className="text-white font-medium">Download App</span>
                </ShimmerButton>

                <button className="px-6 py-3 border-2 border-green-700 text-green-700 font-medium rounded-lg hover:bg-green-50 transition-colors">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">
                    <NumberTicker value={100000} />+
                  </div>
                  <div className="text-sm text-gray-600">Users Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">
                    ₹<NumberTicker value={5} />
                    Cr+
                  </div>
                  <div className="text-sm text-gray-600">Money Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">
                    <NumberTicker value={500} />+
                  </div>
                  <div className="text-sm text-gray-600">Cities Covered</div>
                </div>
              </div>
            </div>

            {/* Right Content - Phone Mockups with Orbiting Elements */}
            <div className="relative flex justify-center">
              <div className="relative">
                <OrbitingCircles
                  className="size-[50px] border-none bg-transparent"
                  duration={20}
                  delay={0}
                  radius={150}
                >
                  <Image
                    src="/bee-props/10.png"
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </OrbitingCircles>
                <OrbitingCircles
                  className="size-[50px] border-none bg-transparent"
                  duration={20}
                  delay={10}
                  radius={150}
                >
                  <Image
                    src="/bee-props/security.png"
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </OrbitingCircles>
                <OrbitingCircles
                  className="size-[40px] border-none bg-transparent"
                  duration={25}
                  delay={5}
                  radius={200}
                  reverse
                >
                  <Image
                    src="/bee-props/calculator-tools.png"
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </OrbitingCircles>

                <Android
                  className="size-[400px] z-10"
                  src="/bee-props/welcome-rupeebee.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Text Reveal Section */}
      <section className="py-0">
        <TextReveal className="bg-gradient-to-r from-green-50 to-yellow-50">
          Financial literacy is not just about money, it's about freedom,
          security, and the power to make informed decisions that shape your
          future.
        </TextReveal>
      </section>

      {/* Testimonials Section */}
      <section id="community" className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-heading mb-4">
              What Our <span className="text-green-700">Community</span> Says
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands who've transformed their financial lives
            </p>
          </div>

          <Marquee pauseOnHover className="[--duration:20s]">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 mx-4 shadow-sm border border-green-100 min-w-[300px]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={`/bee-props/${[15, 20, 25, 30, 35][idx % 5]}.png`}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">"{testimonial.content}"</p>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Download RupeeBee today and join thousands of Indians building a
            secure financial future
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShimmerButton className="bg-white text-green-700 hover:bg-gray-100">
              <span className="font-medium">Download for Android</span>
            </ShimmerButton>
            <ShimmerButton className="bg-yellow-400 text-green-800 hover:bg-yellow-300">
              <span className="font-medium">Download for iOS</span>
            </ShimmerButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
