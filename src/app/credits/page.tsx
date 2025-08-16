"use client";

import React from "react";
import Image from "next/image";
import { Highlighter } from "@/components/magicui/highlighter";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { BackgroundLines } from "@/components/ui/background-lines";
import {
  ExternalLink,
  Award,
  Users,
  Building2,
  Trophy,
  Link as LinkIcon,
} from "lucide-react";

export default function Credits() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Hero Section with Background Lines */}
      <BackgroundLines className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
        <section className="relative min-h-screen flex justify-center pt-32">
          <div className="container-responsive relative z-10">
            <div className="pt-24 pb-16 space-y-16">
              {/* Header Section */}
              <div className="text-center max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block">
                    <Highlighter action="highlight" color="#87CEFA">
                      Credits
                    </Highlighter>{" "}
                    & <PointerHighlight containerClassName="inline">Acknowledgments</PointerHighlight>
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  <Highlighter action="underline" color="#FF9800">
                    PSB Hackathon Series
                  </Highlighter>{" "}
                  with theme SAFE - A collaborative effort towards building secure financial solutions
                </p>
                
                <div className="flex items-center justify-center mb-6">
                  <Image
                    src="/safe.webp"
                    alt="SAFE Theme"
                    width={380}
                    height={180}
                    className="object-contain"
                  />
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Building for a <Highlighter action="highlight" color="#4ade80">SAFE</Highlighter> Financial Future
                </h2>
              </div>
            </div>
            <div className="pt-24 pb-16 space-y-20">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <PointerHighlight>Partner Organizations</PointerHighlight>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {organizations.map((org, index) => (
                <div
                  key={index}
                  className="text-center space-y-4 p-6 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/40 transition-all duration-300 group"
                >
                  <div className="w-28 h-28 mx-auto relative rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={org.image}
                      alt={org.name}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                      {org.shortName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{org.theme}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
          </div>
        </section>
      </BackgroundLines>

      <main className="container-responsive relative z-10">
        <div className="pt-24 pb-16 space-y-20">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Highlighter action="underline" color="#4ade80">Our Team</Highlighter>
            </h2>

            <div className="max-w-md mx-auto">
              <div className="text-center space-y-6 p-8 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20">
                <div className="w-32 h-32 mx-auto relative rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-yellow-100 p-4">
                  <Image
                    src="/bee-props/welcome-rupeebee.png"
                    alt="Team RupeeBee"
                    fill
                    className="object-contain"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-xl text-gray-900">
                    <PointerHighlight>Team RupeeBee</PointerHighlight>
                  </h3>
                  <p className="text-blue-600 font-medium mt-2">
                    Financial Literacy App Development
                  </p>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                    Developing innovative solutions for financial education and awareness
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Links Section */}
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                
                <Highlighter action="highlight" >Important Links</Highlighter>
              </h2>
              <p className="text-gray-600 mt-3">
                Quick access to project resources and information
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {importantLinks.map((link, index) => (
                <div key={index} className="text-center space-y-4 p-6 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/40 transition-all duration-300 group">
                  <div className="text-gray-700 group-hover:text-purple-600 transition-colors flex justify-center">
                    {link.icon}
                  </div>
                  <div>
                    <div className="flex flex-col items-center gap-2 mb-3">
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors text-lg">
                        {link.title}
                      </h3>
                      <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        {link.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{link.description}</p>
                    <div className="mt-4">
                      <div className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        {link.url !== "#" ? link.url : "Coming Soon"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const organizations = [
  {
    name: "Punjab School of Business",
    shortName: "PSB",
    description: "Organizing the hackathon series with innovation at its core",
    image: "/bottom-psb.webp",
    website: "https://psb.ac.in",
    theme: "Innovation & Entrepreneurship",
  },
  {
    name: "IK Gujral Punjab Technical University",
    shortName: "IKGPTU",
    description: "Collaboration partner for technical excellence",
    image: "/ikgptu.webp",
    website: "https://ikgptu.ac.in",
    theme: "Technical Education & Research",
  },
  {
    name: "Indian Bank Association",
    shortName: "IBA",
    description: "Supporting financial sector innovation",
    image: "/iba.webp",
    website: "#",
    theme: "Banking & Finance",
  },
  {
    name: "Data and Financial Services",
    shortName: "DFS",
    description: "Enabling financial technology solutions",
    image: "/dfs.webp",
    website: "#",
    theme: "Financial Services",
  },
];

// Links section - you can add your links here later
const importantLinks = [
  {
    title: "Project Repository",
    description: "View the source code and contribute",
    url: "#",
    icon: <LinkIcon className="w-5 h-5" />,
    category: "Development",
  },
  {
    title: "Live Demo",
    description: "Try the application live",
    url: "#",
    icon: <ExternalLink className="w-5 h-5" />,
    category: "Demo",
  },
  {
    title: "Documentation",
    description: "Read the project documentation",
    url: "#",
    icon: <Award className="w-5 h-5" />,
    category: "Resources",
  },
  // Add more links as needed
];