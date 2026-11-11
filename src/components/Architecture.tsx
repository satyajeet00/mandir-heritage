"use client";

import React from "react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";
import SectionHeader from "./SectionHeader";

interface ArchitectureProps {
  currentLang?: Language;
}

export default function Architecture({
  currentLang = "mr",
}: ArchitectureProps) {
  const { architecture } = mandirContent;

  return (
    <section id="architecture" className="scroll-mt-24 py-16 bg-maroon-950 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          align="left"
          tone="dark"
          badge={architecture.badge[currentLang]}
          title={architecture.heading[currentLang]}
          subtitle={architecture.subheading[currentLang]}
          className="mb-12"
        />

        {/* 6 Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {architecture.features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-maroon-900/90 border border-amber-500/25 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-amber-400/60 transition-colors duration-200 shadow-lg"
            >
              {feature.numeral && (
                <div className="space-y-3">
                  <span className="block font-serif text-5xl font-bold leading-none text-amber-300">
                    {feature.numeral}
                  </span>
                  <div className="h-px bg-amber-400/40" />
                </div>
              )}
              <div className="space-y-1">
                {/* tags are authored as "[LABEL]" in the content file; show the label only */}
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400/80 block">
                  {feature.tag[currentLang].replace(/^\[|\]$/g, "")}
                </span>
                <h3 className="font-serif text-xl font-bold text-amber-100">
                  {feature.title[currentLang]}
                </h3>
              </div>
              <p className="text-base text-amber-200/80 leading-relaxed">
                {feature.desc[currentLang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
