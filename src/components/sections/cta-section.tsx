import { ShimmerButton } from "@/components/magicui/shimmer-button";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-green-700 to-green-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Start Your Financial Journey?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Download RupeeBee today and join thousands of Indians building a secure financial future
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
  );
}
