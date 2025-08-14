import Image from "next/image";
import WorldMap from "@/components/ui/world-map";
import { ArrowRight, Users, Shield, BookOpen, Globe as GlobeIcon } from "lucide-react";

export default function WhatsNextPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50">
      {/* Hero Section with Globe */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-6xl mx-auto mt-32">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            What's Next for
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent"> RupeeBee</span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-4xl mx-auto">
            Born from the SAFE Hackathon 2025, RupeeBee is more than just an app—it's a movement towards 
            financial literacy for all. Our vision extends far beyond profit, aiming to create a 
            financially aware and secure society.
          </p>

          {/* WorldMap Component */}
          <div className="relative w-full max-w-6xl mx-auto mb-16">
            <div className="bg-white/50 backdrop-blur-sm border border-green-100 rounded-3xl p-8">
              <WorldMap
                dots={[
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi (India - Starting point)
                    end: { lat: 23.8103, lng: 90.4125 }, // Bangladesh (Dhaka)
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: 27.7172, lng: 85.324 }, // Nepal (Kathmandu)
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: 6.9271, lng: 79.8612 }, // Sri Lanka (Colombo)
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: 35.6762, lng: 139.6503 }, // Japan (Tokyo)
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: -1.2921, lng: 36.8219 }, // Kenya (Nairobi)
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: 51.5074, lng: -0.1278 }, // UK (London)
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: -23.5505, lng: -46.6333 }, // Brazil (São Paulo)
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: 40.7128, lng: -74.0060 }, // USA (New York)
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Vision Cards */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Our Vision for the Future
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            RupeeBee is built for public good, not profit. Here's how we plan to expand our impact 
            and create a financially literate world.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Global Expansion */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Image 
                  src="/bee-props/welcome-rupeebee.png" 
                  alt="Global Reach" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Global Financial Literacy</h3>
              <p className="text-gray-600 mb-4">
                Expand RupeeBee's reach to developing nations worldwide, partnering with local banks 
                and governments to create region-specific fraud awareness programs.
              </p>
              <div className="flex items-center text-green-600 font-medium">
                <span>Impact millions globally</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Educational Partnerships */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Image 
                  src="/bee-props/grow-and-save.png" 
                  alt="Education" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Educational Integration</h3>
              <p className="text-gray-600 mb-4">
                Partner with schools and universities to integrate financial literacy into curricula. 
                Create age-appropriate modules for students from elementary to college level.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                <span>Educate next generation</span>
                <BookOpen className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Community Programs */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Image 
                  src="/bee-props/security.png" 
                  alt="Community" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Community Outreach</h3>
              <p className="text-gray-600 mb-4">
                Establish community centers in rural and urban areas for hands-on financial education, 
                especially targeting seniors and first-time digital banking users.
              </p>
              <div className="flex items-center text-purple-600 font-medium">
                <span>Strengthen communities</span>
                <Users className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Advanced AI Protection */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Image 
                  src="/bee-props/calculator-tools.png" 
                  alt="AI Protection" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Powered Fraud Detection</h3>
              <p className="text-gray-600 mb-4">
                Develop advanced AI systems that can predict and prevent fraud in real-time, 
                sharing threat intelligence across banking networks globally.
              </p>
              <div className="flex items-center text-red-600 font-medium">
                <span>Advanced protection</span>
                <Shield className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Open Source Initiative */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Image 
                  src="/bee-props/3.png" 
                  alt="Open Source" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Open Source Platform</h3>
              <p className="text-gray-600 mb-4">
                Make RupeeBee's core technology open source, allowing developers worldwide to contribute 
                and adapt the platform for their local financial ecosystems.
              </p>
              <div className="flex items-center text-yellow-600 font-medium">
                <span>Collaborative development</span>
                <GlobeIcon className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Research & Innovation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Image 
                  src="/bee-props/6.png" 
                  alt="Research" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Research Foundation</h3>
              <p className="text-gray-600 mb-4">
                Establish a research foundation to study emerging financial threats and develop 
                innovative solutions for financial inclusion and security.
              </p>
              <div className="flex items-center text-indigo-600 font-medium">
                <span>Drive innovation</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-3xl p-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image 
                src="/assets/logo.png" 
                alt="RupeeBee Logo" 
                width={60} 
                height={60}
                className="object-contain filter brightness-0 invert"
              />
              <h3 className="text-3xl font-bold">Our Commitment</h3>
            </div>
            <p className="text-xl text-green-100 leading-relaxed mb-8">
              "RupeeBee will always remain free, open, and focused on public good. 
              We believe financial literacy is a fundamental right, not a privilege. 
              Our success is measured not in profits, but in the number of people 
              we protect from financial fraud and empower with knowledge."
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">0%</div>
                <div className="text-green-200">Profit Motive</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-green-200">Public Good</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">∞</div>
                <div className="text-green-200">Impact Potential</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Roadmap
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">2025: Foundation & Growth</h4>
                <p className="text-gray-600">
                  Complete SAFE Hackathon, gather user feedback, and establish partnerships 
                  with Punjab & Sind Bank and other financial institutions across India.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">2026: Regional Expansion</h4>
                <p className="text-gray-600">
                  Expand to neighboring South Asian countries, localize content for different 
                  languages and financial systems, and establish educational partnerships.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">2027: Global Initiative</h4>
                <p className="text-gray-600">
                  Launch open-source platform, establish research foundation, and create 
                  international consortium for financial literacy and fraud prevention.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                ∞
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Beyond: Lasting Impact</h4>
                <p className="text-gray-600">
                  Create a world where financial fraud is minimized through education, 
                  awareness, and community-driven solutions that benefit all of humanity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
