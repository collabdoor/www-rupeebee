import { ShimmerButton } from "@/components/magicui/shimmer-button";
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="py-20 -mt-10 bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-green-500 to-green-600 text-white rounded-3xl p-16 shadow-xl relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Try our RupeeBee app for free for 14 days
              </h2>
              <p className="text-xl text-green-100 leading-relaxed">
                The first step to a healthier financial you takes less than a minute.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <ShimmerButton className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📱</span>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="font-semibold">App Store</div>
                    </div>
                  </div>
                </ShimmerButton>
                <ShimmerButton className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📱</span>
                    <div className="text-left">
                      <div className="text-xs">GET IT ON</div>
                      <div className="font-semibold">Google Play</div>
                    </div>
                  </div>
                </ShimmerButton>
              </div>
            </div>

            {/* Right Content - App mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main phone mockup */}
                <div className="bg-white rounded-3xl p-4 shadow-2xl transform rotate-3">
                  <div className="bg-gray-100 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600 text-sm">Hello,</div>
                      <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-gray-800 font-semibold">Isabella Moore</div>
                    
                    <div className="space-y-3">
                      <div className="text-gray-600 text-sm">Calories Today</div>
                      <div className="text-3xl font-bold text-gray-800">310</div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Week</span>
                          <span className="text-gray-800">37%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-1/3"></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Running</span>
                          <span className="text-gray-800">37%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full w-1/3"></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Swimming</span>
                          <span className="text-gray-800">33%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-pink-400 rounded-full opacity-80"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full opacity-80"></div>
                <div className="absolute top-1/2 -left-12 w-8 h-8 bg-orange-400 rounded-full opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
