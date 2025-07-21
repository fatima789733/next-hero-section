// components/ui/DiagonalButton.tsx
"use client";

import { ReactNode } from "react";
import classNames from "classnames";
interface DiagonalButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function DiagonalButton({
  children,
  className,
  onClick,
}: DiagonalButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "relative uppercase font-bold text-[17px] border-2 border-white px-5 py-2 text-white overflow-hidden transition-all duration-1000 hover:text-black group rounded-xl",
        className
      )}
    >
      <span className="absolute left-[-40px] top-0 h-full w-0 bg-white skew-x-12 transition-all duration-1000 z-[-1] group-hover:w-[160%]" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
