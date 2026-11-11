import React from "react";
import Badge from "./Badge";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

/** Shared badge + h2 + subtitle used by every content section. */
export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className = "",
}: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <Badge tone={dark ? "dark" : "light"}>{badge}</Badge>
      <h2
        className={`font-serif text-3xl sm:text-4xl font-bold mt-3.5 ${
          dark ? "text-white" : "text-maroon-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base mt-2.5 leading-relaxed ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
          } ${dark ? "text-amber-100/80" : "text-maroon-800/80"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
