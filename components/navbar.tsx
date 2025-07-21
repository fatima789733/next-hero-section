"use client";

import { Mountain } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function Component() {
  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="backdrop-blur-md bg-transparent border border-gray-700 rounded-full shadow-lg px-6 py-4">
        <div className="flex items-center justify-between w-full min-w-[600px]">
          {/* Logo and Text - Left Side */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png" // ✅ replace with your image path
              alt="logo"
              width={24}
              height={24}
              className="object-contain"
            />{" "}
            <span className="text-lg font-semibold text-white">DevGrill</span>
          </div>

          {/* Navigation Items - Right Side */}
          <div className="flex items-center space-x-8">
            <Link
              href="#"
              className="text-white  font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-white  font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-white  font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
