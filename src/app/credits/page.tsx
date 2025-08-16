"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Highlighter } from "@/components/magicui/highlighter";
import {
  ExternalLink,
  Award,
  Users,
  Building2,
  Trophy,
  Link as LinkIcon,
} from "lucide-react";

// You can add this metadata export in a separate metadata file if needed
// export const metadata = {
//   title: "Credits - RupeeBee | PSB Hackathon Series",
//   description: "Acknowledgments and credits for the PSB Hackathon Series SAFE theme in collaboration with IKGPTU",
// };

export default function Credits() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 pt-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      <main className="container-responsive relative z-10">
        <div className="pt-24 pb-16 space-y-16">
          {/* Header Section */}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="block">
              <Highlighter action="highlight" color="#87CEFA">
                Credits
              </Highlighter>{" "}
              & Acknowledgments
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <Highlighter action="underline" color="#FF9800">
              PSB Hackathon Series
            </Highlighter>{" "}
            with theme{" "}
            <span className="font-semibold text-green-600 cursor-pointer">
              SAFE
            </span>{" "}
            - A collaborative effort towards building secure financial solutions
          </p>
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/safe.webp"
              alt="SAFE Theme"
              width={120}
              height={80}
              className="object-contain"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-green-600 transition-colors">
            Building for a <span className="text-green-600">SAFE</span>{" "}
            Financial Future
          </h2>

          {/* Organizations Section */}

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors flex items-center justify-center gap-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              Partner Organizations
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {organizations.map((org, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                className="text-center space-y-4 p-4 rounded-xl hover:bg-white/50 transition-colors cursor-pointer"
              >
                <div className="w-20 h-20 mx-auto relative rounded-xl overflow-hidden bg-white shadow-md">
                  <Image
                    src={org.image}
                    alt={org.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm hover:text-green-600 transition-colors cursor-pointer">
                    {org.shortName}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{org.theme}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Section */}

          <h2 className="text-3xl font-bold text-gray-900 cursor-pointer hover:text-green-600 transition-colors flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-green-600" />
            Our Team
          </h2>

          <div className="max-w-md mx-auto">
            <div className="text-center space-y-4 p-6 rounded-xl hover:bg-white/50 transition-colors">
              <div className="w-24 h-24 mx-auto relative rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-yellow-100 p-3">
                <Image
                  src="/bee-props/welcome-rupeebee.png"
                  alt="Team RupeeBee"
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="font-bold text-xl text-gray-900 cursor-pointer hover:text-green-600 transition-colors">
                  Team RupeeBee
                </h3>
                <p className="text-blue-600 font-medium">
                  Financial Literacy App Development
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Developing innovative solutions for financial education and
                  awareness
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 cursor-pointer hover:text-purple-600 transition-colors flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 text-purple-600" />
              Important Links
            </h2>
            <p className="text-gray-600 mt-2">
              Quick access to project resources and information
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {importantLinks.map((link, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="text-green-600 group-hover:text-green-700 transition-colors">
                  {link.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors cursor-pointer">
                      {link.title}
                    </h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {link.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
              </div>
            ))}
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