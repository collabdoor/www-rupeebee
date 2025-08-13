import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className=" grid md:grid-cols-2 gap-8">
          {/* Column 1 - Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-800">rupeebee</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              RupeeBee is your friendly guide to financial awareness and fraud
              prevention. Built for the SAFE Hackathon 2025 by Punjab & Sind
              Bank, our mission is to make money matters simple, safe, and
              stress-free.
            </p>
            <div className="mt-12 pt-8">
              <div className="flex flex-wrap items-center justify-center gap-8">
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

          {/* Column 2 - Quick Links */}
          <div className="grid md:grid-cols-2 gap-8 justify-items-end">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                  >
                    Do's & Don'ts
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                  >
                    What's Next
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - About us */}
           
          </div>
        </div>

        {/* Partner Logos */}

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            Copyright © RupeeBee - 2025 All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
