"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-24 items-center justify-center rounded-full border-2 border-border bg-white p-4 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <section id="techstack" className="py-20 -mt-10 bg-gradient-to-tr from-green-50 via-white to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-heading mb-4">
            Built with <span className="text-green-700">Modern Technology</span>
          </h2>
          <p className="text-xl text-gray-600">
            Powered by cutting-edge tools and frameworks for the best experience
          </p>
        </div>

        <div
          className={cn(
            "relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10",
          )}
          ref={containerRef}
        >
          <div className="flex size-full max-w-4xl flex-row items-stretch justify-between gap-10">
            <div className="flex flex-col justify-center gap-4">
              <Circle ref={div1Ref}>
                <Icons.flutter />
              </Circle>
              <Circle ref={div2Ref}>
                <Icons.dart />
              </Circle>
              <Circle ref={div3Ref}>
                <Icons.riverpod />
              </Circle>
              <Circle ref={div4Ref}>
                <Icons.hive />
              </Circle>
              <Circle ref={div5Ref}>
                <Icons.material />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={div6Ref} className="size-32">
                <Icons.rupeebee />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={div7Ref}>
                <Icons.riverpod />
              </Circle>
            </div>
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div6Ref}
            gradientStartColor="#10B981"
            gradientStopColor="#F59E0B"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div2Ref}
            toRef={div6Ref}
            gradientStartColor="#10B981"
            gradientStopColor="#F59E0B"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div3Ref}
            toRef={div6Ref}
            gradientStartColor="#10B981"
            gradientStopColor="#F59E0B"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div4Ref}
            toRef={div6Ref}
            gradientStartColor="#10B981"
            gradientStopColor="#F59E0B"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div5Ref}
            toRef={div6Ref}
            gradientStartColor="#10B981"
            gradientStopColor="#F59E0B"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div6Ref}
            toRef={div7Ref}
            gradientStartColor="#10B981"
            gradientStopColor="#F59E0B"
          />
        </div>
      </div>
    </section>
  );
}

const Icons = {
  flutter: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.2 11.757L5.457 20.8 6 21.343l8.2-8.2 2.743 2.743H24L14.514 11.757z"
        fill="#02569B"
      />
      <path
        d="M14.314 11.757l-2.743 2.743L15.857 18.8l2.743-2.743z"
        fill="#0175C2"
      />
      <path
        d="M11.571 14.5L5.457 20.8l3.314 3.2L24 8.686v-2.743L11.571 14.5z"
        fill="#29B6F6"
      />
    </svg>
  ),
  dart: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 20.5L10.5 21L21 10.5L13.5 3L4 12.5V20.5Z"
        fill="#00D2B8"
      />
      <path
        d="M13.5 3L4 12.5L10.5 21L21 10.5L13.5 3Z"
        fill="#0075BA"
      />
      <path
        d="M4 12.5L13.5 3L4 12.5Z"
        fill="#00A8E1"
      />
    </svg>
  ),
  riverpod: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="6" r="4" fill="#2196F3"/>
      <path
        d="M12 10c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z"
        fill="#4CAF50"
      />
      <circle cx="8" cy="14" r="1" fill="#FFC107"/>
      <circle cx="16" cy="14" r="1" fill="#FFC107"/>
    </svg>
  ),
  hive: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L3 7v10l9 5 9-5V7l-9-5z"
        fill="#FFA000"
        stroke="#FF6F00"
        strokeWidth="1"
      />
      <path
        d="M12 8L8 10v4l4 2 4-2v-4l-4-2z"
        fill="#FFE082"
      />
    </svg>
  ),
  material: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        fill="#2196F3"
      />
      <path
        d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  supabase: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4 22c.26 0 .4-.31.22-.49L5.8 13.4c-.37-.38-.11-1.04.42-1.04h6.87c.36 0 .58-.4.38-.69L8.38 2.22C8.17 1.91 7.69 2.13 7.69 2.5v8.1c0 .28-.22.5-.5.5H2.5c-.53 0-.79.66-.42 1.04l9.18 9.36c.18.18.48.18.66 0l.48-.5z"
        fill="#3ECF8E"
      />
      <path
        d="M11.6 2c-.26 0-.4.31-.22.49l6.82 8.11c.37.38.11 1.04-.42 1.04h-6.87c-.36 0-.58.4-.38.69l5.09 9.45c.21.31.69.09.69-.28v-8.1c0-.28.22-.5.5-.5h4.69c.53 0 .79-.66.42-1.04L12.74 2.5c-.18-.18-.48-.18-.66 0l-.48.5z"
        fill="#3ECF8E"
      />
    </svg>
  ),
  rupeebee: () => (
    <Image
      src="/assets/loading.gif"
      alt="RupeeBee"
      width={200}
      height={200}
      className="rounded-full"
    />
  ),
};
