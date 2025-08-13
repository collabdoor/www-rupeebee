import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image 
                src="/assets/logo.png" 
                alt="RupeeBee" 
                width={32} 
                height={32}
                className="object-contain"
              />
              <span className="text-xl font-bold text-yellow-400">
                RupeeBee
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              India's trusted financial literacy platform. Learn, save, and stay protected from financial fraud.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-yellow-400">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="#features" className="block text-gray-400 hover:text-white transition-colors">
                Features
              </a>
              <a href="#about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </a>
              <a href="#community" className="block text-gray-400 hover:text-white transition-colors">
                Community
              </a>
              <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-yellow-400">Resources</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Financial Tools
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Security Tips
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Savings Guide
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Help Center
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-yellow-400">Get in Touch</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>support@rupeebee.com</p>
              <p>+91 98765 43210</p>
              <div className="flex gap-4 pt-4">
                {/* Social Media Icons */}
                <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                  <span className="text-xs">in</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 RupeeBee. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
