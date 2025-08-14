import { WordRotate } from "@/components/magicui/word-rotate";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { DotPattern } from "@/components/magicui/dot-pattern";
import Android from "@/components/magicui/android";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { cn } from "@/lib/utils";
import { Highlighter } from "./magicui/highlighter";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <div className="container-responsive relative z-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        {/* Content with proper spacing */}
        <div className="pt-24 pb-16 space-y-16">
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
                <Android
                  className="size-[240px] sm:size-[280px] opacity-90"
                  src="/bee-props/welcome-rupeebee.png"
                />
              </div>

              {/* iPhone - Front and center */}
              <div className="relative z-20">
                <Iphone15Pro
                  className="size-[300px] sm:size-[350px]"
                  src="/bee-props/welcome-rupeebee.png"
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                <NumberTicker value={100000} />+
              </div>
              <div className="text-gray-600 font-medium">Users Protected from Fraud</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-yellow-600">
                ₹<NumberTicker value={5} />
                Cr+
              </div>
              <div className="text-gray-600 font-medium">Money Saved by Users</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                <NumberTicker value={500} />+
              </div>
              <div className="text-gray-600 font-medium">Cities Covered</div>
            </div>
          </div>

          {/* CTA Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <ShimmerButton className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-base font-medium rounded-xl shadow-lg transition-all duration-300">
              Download for Android
            </ShimmerButton>
            <ShimmerButton className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-4 text-base font-medium rounded-xl shadow-lg transition-all duration-300">
              Download for iOS
            </ShimmerButton>
          </div>
        </div>
      </div>
    </section>
  );
}
