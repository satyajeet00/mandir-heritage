"use client";

import React from "react";
import {
  Columns,
  DoorOpen,
  Shield,
  Sun,
  Flame,
  Sparkles,
  ThermometerSnowflake,
  LucideIcon,
} from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";

const iconMap: Record<string, LucideIcon> = {
  Columns,
  DoorOpen,
  Shield,
  Sun,
  Flame,
  Sparkles,
  ThermometerSnowflake,
};

interface ArchitectureProps {
  currentLang?: Language;
}

export default function Architecture({
  currentLang = "mr",
}: ArchitectureProps) {
  const { architecture } = mandirContent;

  return (
    <section id="architecture" className="py-16 bg-maroon-950 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/15 border border-amber-400/25 px-3 py-1 rounded-full">
            {architecture.badge[currentLang]}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3.5">
            {architecture.heading[currentLang]}
          </h2>
          <p className="text-amber-100/80 text-sm sm:text-base mt-2.5 max-w-2xl leading-relaxed">
            {architecture.subheading[currentLang]}
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {architecture.features.map((feature, idx) => {
            const Icon = iconMap[feature.icon] || Columns;
            return (
              <div
                key={idx}
                className="bg-maroon-900/90 border border-amber-500/25 rounded-2xl p-6 sm:p-7 space-y-3 hover:border-amber-400/50 hover:bg-maroon-900 transition-all duration-200 group shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30 group-hover:scale-110 group-hover:bg-amber-500/30 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  {feature.numeral && (
                    <span className="font-serif text-amber-400 font-bold text-lg opacity-80 tracking-wider">
                      {feature.numeral}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400/80 block">
                    {feature.tag[currentLang]}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-amber-100">
                    {feature.title[currentLang]}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
                  {feature.desc[currentLang]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
