"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { WordRotate } from "./magicui/word-rotate";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Faster progress increments
        const newProgress = Math.min(prev + Math.random() * 20 + 10, 100);
        return newProgress;
      });
    }, 150); // Faster intervals

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800"
    >
      {/* Loading Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="relative mb-8"
      >
        <Image
          src="/assets/logo.png"
          alt="RupeeBee"
          width={120}
          height={120}
          className="w-24 h-24 md:w-32 md:h-32"
          priority
        />
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.3,
        }}
        className="w-48 md:w-64"
      >
        {/* Progress Bar Background */}
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          {/* Progress Bar Fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          />
        </div>

        {/* Loading Text */}
        <div className="mt-6 text-center">
          <div className="text-white text-lg mb-2 font-medium">
            Welcome to RupeeBee
          </div>
          <WordRotate
            words={["नमस्ते", "Hello", "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", "হ্যালো"]}
            className="text-green-400 font-semibold text-base"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
