import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-10">
        <div className=" grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-800">RupeeBee</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              RupeeBee is your friendly guide to financial awareness and fraud
              prevention. Built for the SAFE Hackathon 2025 by Punjab & Sind
              Bank, our mission is to make money matters simple, safe, and
              stress-free.
            </p>
            <div className="mt-12 pt-8">
              <div className="flex flex-wrap items-center justify-start gap-8">
                <Image
                  src="/assets/logo.png"
                  alt="RupeeBee Logo"
                  width={100}
                  height={100}
                  className="object-contain  opacity-80 hover:opacity-100 duration-200"
                />
                <Image
                  src="/ikgptu.png"
                  alt="IKGPTU"
                  width={80}
                  height={40}
                  className="object-contain  opacity-80 hover:opacity-100 duration-200"
                />
                <Image
                  src="/bottom-psb.png"
                  alt="Punjab & Sind Bank"
                  width={200}
                  height={200}
                  className="object-contain  opacity-80 hover:opacity-100 duration-200"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            Copyright © RupeeBee - 2025 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
