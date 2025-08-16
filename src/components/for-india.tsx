import { Highlighter } from "./magicui/highlighter";
import Image from "next/image";

export default function ForIndiaSection() {
  return (
    <section className="relative py-20 bg-gradient-to-tr from-green-50 via-white to-yellow-50">
      <div className="container-responsive relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="block">
                <Highlighter action="highlight" color="#FF9800">
                  Made in India
                </Highlighter>
              </span>
              <span className="block mt-2">
                <Highlighter action="underline" color="#4ade80">
                  Made for India
                </Highlighter>
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Built by Indians, for Indians. Solving real financial challenges with local innovation.
            </p>
          </div>

          {/* GIF */}
          <div className="flex justify-center">
            <div className="relative w-[500px] h-auto sm:w-96 sm:h-96 border border-pink-400 bg-blue-100 rounded-full">
              <Image
                src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/gifs/india.gif"
                alt="Made in India"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
