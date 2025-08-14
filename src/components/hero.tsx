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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50 pt-16 pb-10">
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Heading */}
       <div className="relative h-full w-full"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div></div>
        <div className="text-center max-w-4xl mx-auto mb-16 mt-32">
          <h1 className="text-center text-5xl">
            <p className="leading-relaxed">
              Be{" "}
              <Highlighter action="underline" color="#FF9800">
               Wise
              </Highlighter>{" "}
              with your{" "}
              <Highlighter action="highlight" color="#87CEFA">
                Rupee
              </Highlighter>
            </p>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mt-4">
            We believe that by combining financial education and smart
            technology, families will be more secure, more efficient, and have
            more engaged, happier financial futures.
          </p>
        </div>

        {/* Phone Mockups */}
        <div className="flex justify-center items-center mb-16 relative">
          <div className="relative">
            {/* Android Phone - Behind and smaller */}
            <div className="absolute -left-32 top-8 transform rotate-12 z-10">
              <Android
                className="size-[280px] opacity-90"
                src="/bee-props/welcome-rupeebee.png"
              />
            </div>

            {/* iPhone - Front and center */}
            <div className="relative z-20">
              <Iphone15Pro
                className="size-[350px]"
                src="/bee-props/welcome-rupeebee.png"
              />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
              <NumberTicker value={100000} />+
            </div>
            <div className="text-gray-600">Users Protected from Fraud</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">
              ₹<NumberTicker value={5} />
              Cr+
            </div>
            <div className="text-gray-600">Money Saved by Users</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
              <NumberTicker value={500} />+
            </div>
            <div className="text-gray-600">Cities Covered</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <ShimmerButton className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
            Download for Android
          </ShimmerButton>
          <ShimmerButton className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 text-lg">
            Download for iOS
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
