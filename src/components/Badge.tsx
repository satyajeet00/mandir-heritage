import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  /** light: on parchment/white · dark: on maroon or photos · solid: emphasised (e.g. the highlighted card) */
  tone?: "light" | "dark" | "solid";
  /** uppercase + letter-spacing (only affects Latin text; turn off for sentence-length labels) */
  caps?: boolean;
  className?: string;
}

const TONES = {
  light: "bg-saffron-100 text-saffron-700",
  dark: "bg-amber-500/15 text-amber-300",
  solid: "bg-saffron-700 text-white",
};

/** The single badge/pill style used across the site. */
export default function Badge({ children, tone = "light", caps = true, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-3.5 py-1 text-xs font-bold ${
        caps ? "uppercase tracking-wider" : ""
      } ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
