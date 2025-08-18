"use client";

import React from "react";
import Image from "next/image";
import { Highlighter } from "@/components/magicui/highlighter";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { BackgroundLines } from "@/components/ui/background-lines";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import {
  ExternalLink,
  Users,
  Trophy,
  Link as LinkIcon,
  Github,
  Globe,
  Book,
} from "lucide-react";

export default function Credits() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 via-white to-yellow-50">
      {/* Hero Section with Background Lines */}
      <BackgroundLines className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
        <section className="relative min-h-screen flex justify-center pt-32">
          <div className="container-responsive relative z-10">
            <div className="pt-24 pb-16 space-y-16">
              {/* Header Section */}
              <div className="text-center max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block">
                    Acknowledgments &{" "}
                    <Highlighter action="highlight" color="#87CEFA">
                      Credits
                    </Highlighter>{" "}
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  <Highlighter action="underline" color="#FF9800">
                    PSB Hackathon Series
                  </Highlighter>{" "}
                  with theme SAFE - A collaborative effort towards building
                  secure financial solutions
                </p>

                <div className="flex items-center justify-center mb-6">
                  <Image
                    src="/safe.webp"
                    alt="SAFE Theme"
                    width={380}
                    height={180}
                    className="object-contain"
                    unoptimized
                  />
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Building for a SAFE Financial Future
                </h2>
              </div>
            </div>
            <div className="pt-24 pb-16 space-y-20">
              <div className="text-center space-y-8">
                <h2 className="text-3xl font-bold flex text-gray-600 items-center justify-center gap-3">
                  <PointerHighlight>Partner Organizations</PointerHighlight>
                </h2>

                <div className="grid grid-cols-4 gap-3 max-w-6xl mx-auto">
                  {organizations.map((org, index) => (
                    <div
                      key={index}
                      className="text-center space-y-4 p-6 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/40 transition-all duration-300 group"
                    >
                      <div className="w-16 h-16 md:w-48 md:h-48 mx-auto relative overflow-hidden flex items-center">
                        <Image
                          src={org.image}
                          alt={org.name}
                          height={org.height}
                          width={org.width}
                          unoptimized
                        />
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
        <div className="pt-72 pb-16 space-y-40">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Highlighter action="underline" color="#4ade80">
                Our Team
              </Highlighter>
            </h2>

            {/* Avatar Circles */}
            <div className="flex justify-center">
              <AvatarCircles numPeople={0} avatarUrls={teamAvatars} />
            </div>
          </div>

          {/* Important Links Section */}
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                Important Links
              </h2>
            </div>

            {/* Links Table */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-green-100 to-yellow-100 border-b border-white/40">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Link
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/20">
                      {importantLinks.map((link, index) => (
                        <tr
                          key={index}
                          className="hover:bg-white/40 transition-all duration-200 group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-200">
                                {link.icon}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {link.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                              {link.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Visit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
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
    height: 200,
    width: 300,
  },
  {
    name: "IK Gujral Punjab Technical University",
    shortName: "IKGPTU",
    description: "Collaboration partner for technical excellence",
    image: "/ikgptu.webp",
    website: "https://ikgptu.ac.in",
    theme: "Technical Education & Research",
    height: 140,
    width: 200,
  },
  {
    name: "Indian Bank Association",
    shortName: "IBA",
    description: "Supporting financial sector innovation",
    image: "/iba.webp",
    website: "#",
    theme: "Banking & Finance",
    height: 140,
    width: 200,
  },
  {
    name: "Data and Financial Services",
    shortName: "DFS",
    description: "Enabling financial technology solutions",
    image: "/dfs.webp",
    website: "#",
    theme: "Financial Services",
    height: 200,
    width: 300,
  },
];

// Team Avatar Configuration
const teamAvatars = [
  {
    imageUrl:
      "https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/priyam.jpg",
    profileUrl:
      "https://portfolio-priyam-srivastavas-projects-a9e142b7.vercel.app/",
  },
  {
    imageUrl:
      "https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/navneet.jpg",
    profileUrl: "https://nav9v.me",
  },
  {
    imageUrl:
      "https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/ojus.jpg",
    profileUrl: "https://ojus.fyi",
  },
  {
    imageUrl:
      "https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/nikita.png",
    profileUrl: "http://iamnikitaa.github.io/",
  },
];

// Important Links Configuration
const importantLinks = [
  {
    title: "Project Repository",
    description: "View the source code and contribute to the project",
    url: "https://github.com/collabdoor/www-rupeebee",
    icon: <Github className="w-5 h-5 text-gray-600" />,
  },
  {
    title: "Live Demo",
    description: "Try the RupeeBee application live",
    url: "https://rupeebee.com",
    icon: <Globe className="w-5 h-5 text-blue-600" />,
  },
  {
    title: "Documentation",
    description: "Read the comprehensive project documentation",
    url: "#",
    icon: <Book className="w-5 h-5 text-green-600" />,
  },
  {
    title: "PSB Hackathon",
    description: "Learn more about the PSB Hackathon Series",
    url: "https://psb.ac.in",
    icon: <Trophy className="w-5 h-5 text-yellow-600" />,
  },
  {
    title: "API Documentation",
    description: "Explore the API endpoints and integration guides",
    url: "#",
    icon: <LinkIcon className="w-5 h-5 text-purple-600" />,
  },
  {
    title: "Support & Contact",
    description: "Get help and contact the development team",
    url: "#",
    icon: <Users className="w-5 h-5 text-red-600" />,
  },
];
