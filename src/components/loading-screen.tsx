"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

export function LoadingScreen({
  isLoading,
  onLoadingComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showScreen, setShowScreen] = useState(isLoading);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Delay before starting the exit animation
          setTimeout(() => {
            setShowScreen(false);
            onLoadingComplete?.();
          }, 500);
          return 100;
        }
        // Randomize progress increments for more realistic loading
        const newProgress = Math.min(prev + Math.random() * 15 + 5, 100);
        return newProgress;
      });
    }, 200); // Slightly slower for better visibility

    return () => clearInterval(interval);
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence mode="wait">
      {showScreen && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100vh",
            transition: {
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1], // Figma-like easing
            },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black border-4"
        >
          {/* Main Content Container */}
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
          {/* Loading GIF */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="relative"
          >
            {!imageError ? (
              <Image
                src="/assets/logo.png"
                alt="Loading..."
                width={120}
                height={120}
                className="w-24 h-24 md:w-32 md:h-32"
                unoptimized
                priority
                onError={() => setImageError(true)}
              />
            ) : (
              // Fallback spinning loader
              <div className="w-24 h-24 md:w-32 md:h-32 border-4 border-white/20 rounded-full animate-spin"></div>
            )}
          </motion.div>

          {/* Progress Bar Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.4,
            }}
            className="w-40 md:w-44"
          >
            {/* Progress Bar Background */}
            <div className="w-full h-2 rounded-full overflow-hidden border border-emerald-300">
              {/* Progress Bar Fill */}
              <motion.div
                className="h-full bg-green-300 rounded-full shadow-sm"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              />
            </div>
            <h2 className="text-center w-full">
              Welcome to the safer internet
            </h2>
            {/* Progress Text */}
            {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 text-center"
              >
                <span className="text-white text-sm font-medium">
                  {Math.round(progress)}%
                </span>
              </motion.div> */}
          </motion.div>

          {/* Optional: Subtle background animation */}
          {/* <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900"
              animate={{
                opacity: [1, 0.95, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
