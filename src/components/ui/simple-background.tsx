"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export const TermsBackgroundLines = ({
  children,
  className,
  svgOptions,
}: {
  children: React.ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-yellow-50",
        className
      )}
    >
      <SimpleSVG svgOptions={svgOptions} />
      {children}
    </div>
  );
};

const pathVariants = {
  initial: { strokeDashoffset: 800, strokeDasharray: "50 800" },
  animate: {
    strokeDashoffset: 0,
    strokeDasharray: "20 800",
    opacity: [0, 1, 1, 0],
  },
};

const SimpleSVG = ({
  svgOptions,
}: {
  svgOptions?: {
    duration?: number;
  };
}) => {
  // Using only a few simple paths to avoid any complex shapes that might look like logos
  const paths = [
    "M0 500 Q 200 350, 400 450 T 800 400 T 1200 450 T 1600 400",
    "M0 600 Q 250 500, 500 600 T 1000 550 T 1500 600",
    "M0 300 Q 150 250, 300 300 T 600 250 T 900 300 T 1200 250 T 1500 300",
  ];

  const colors = ["#46A5CA", "#4FAE4D", "#8C2F2F"];

  return (
    <motion.svg
      viewBox="0 0 1600 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full opacity-30"
    >
      {paths.map((path, idx) => (
        <motion.path
          d={path}
          stroke={colors[idx]}
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={pathVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: svgOptions?.duration || 15,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            delay: idx * 2,
          }}
          key={`path-${idx}`}
        />
      ))}
    </motion.svg>
  );
};
