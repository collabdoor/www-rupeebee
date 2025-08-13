import { WordRotate } from "@/components/magicui/word-rotate";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { DotPattern } from "@/components/magicui/dot-pattern";
import Android from "@/components/magicui/android";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-yellow-50 pt-16">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "opacity-40"
        )}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto mb-16 mt-32">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight mb-6">
            Be wise with your Rupee
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We believe that by combining financial education and smart technology, 
            families will be more secure, more efficient, and have more engaged, 
            happier financial futures.
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
              ₹<NumberTicker value={5} />Cr+
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
