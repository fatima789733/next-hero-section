"use client";
import { Badge } from "@/components/ui/badge";
import DiagonalButton from "@/components/ui/button";
import DarkVeil from "@/components/DarkVeli";
import Navbar from "@/components/navbar";
import Image from "next/image";
import CrushButton from "@/components/crush-button";
import BlurText, { easingPresets } from "@/hooks/animation";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DarkVeil />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <Navbar />
        <div className="max-w-4xl mx-auto text-center space-y-8 mt-16">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="bg-white/10 text-white border-white/20 hover:bg-white/15 transition-colors px-4 py-2 text-sm font-medium gap-4"
          >
            <Image
              src="/badge-icon.png"
              alt="Badge Icon"
              width={15}
              height={15}
              className="object-contain"
            />
            New Feature Available
          </Badge>

          {/* Animated Heading - Centered */}
          <div className="flex flex-col items-center justify-center text-center mb-4">
            <BlurText
              text="Skip the Code. Fuel it with"
              animateBy="words"
              delay={100}
              className="text-white text-6xl capitalize tracking-tight leading-[67.20px]"
              animationFrom={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              animationTo={[
                { opacity: 0.5, y: -5, filter: "blur(3px)" },
                { opacity: 1, y: 0, filter: "blur(0px)" },
              ]}
              easing={easingPresets.smooth}
              as="h1"
            />
            <BlurText
              text="Vision and Imagination."
              animateBy="words"
              delay={120}
              className="text-white/80 text-6xl capitalize tracking-tight leading-[67.20px]"
              animationFrom={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              animationTo={[
                { opacity: 0.5, y: -5, filter: "blur(3px)" },
                { opacity: 1, y: 0, filter: "blur(0px)" },
              ]}
              easing={easingPresets.smooth}
              as="h2"
            />
          </div>

          {/* Animated Subheading */}
          <BlurText
            text="Transform your ideas into reality with our cutting-edge platform. Start building the future today with powerful tools and seamless integration."
            animateBy="words"
            delay={100}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            animationFrom={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animationTo={[
              { opacity: 0.5, y: 5, filter: "blur(3px)" },
              { opacity: 1, y: 0, filter: "blur(0px)" },
            ]}
            easing={easingPresets.quick}
            as="p"
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <DiagonalButton>Get Started</DiagonalButton>
            <CrushButton>Learn More</CrushButton>
          </div>
        </div>
      </div>
    </section>
  );
}
