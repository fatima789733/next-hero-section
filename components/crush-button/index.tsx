// components/ui/CrushButton.tsx
"use client";

import { ReactNode } from "react";
import "../crush-button/button.css"; // ✅ Important: import the CSS directly

interface CrushButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function CrushButton({
  children,
  onClick,
  className = "",
}: CrushButtonProps) {
  return (
    <button onClick={onClick} className={`crush-btn ${className} rounded-xl`}>
      <p>{children}</p>
    </button>
  );
}
