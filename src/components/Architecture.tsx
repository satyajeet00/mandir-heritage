"use client";

import React, { useState } from "react";
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
  // Phones show 3 of the 6 spots; all six stay in the DOM (hidden with CSS) for search engines
  const [showAll, setShowAll] = useState(false);

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
        <div id="architecture-spots" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {architecture.features.map((feature, idx) => (
            <div
              key={idx}
              className={`bg-maroon-900/90 border border-amber-500/25 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-amber-400/60 transition-colors duration-200 shadow-lg ${
                idx >= 3 && !showAll ? "hidden sm:block" : ""
              }`}
            >
              {feature.numeral && (
                <div className="space-y-3">
                  <span className="block font-serif text-5xl font-bold leading-none text-amber-300">
                    {feature.numeral[currentLang]}
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

        <button
          type="button"
          aria-expanded={showAll}
          aria-controls="architecture-spots"
          onClick={() => {
            if (showAll) document.getElementById("architecture")?.scrollIntoView();
            setShowAll(!showAll);
          }}
          className="sm:hidden mt-6 w-full min-h-11 px-4 py-2.5 rounded-xl border-2 border-amber-400 text-amber-300 font-semibold text-base cursor-pointer hover:bg-amber-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 transition"
        >
          {showAll ? mandirContent.ui.showLess[currentLang] : mandirContent.ui.seeAllSpots[currentLang]}
        </button>
      </div>
    </section>
  );
}
