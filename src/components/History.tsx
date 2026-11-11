"use client";

import React from "react";
import { Sparkles, Clock } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";
import SectionHeader from "./SectionHeader";

interface HistoryProps {
  currentLang: Language;
}

export default function History({ currentLang }: HistoryProps) {
  const { history } = mandirContent;

  return (
    <section id="history" className="scroll-mt-24 py-16 max-w-7xl mx-auto px-4 sm:px-6">
      <SectionHeader
        badge={history.badge[currentLang]}
        title={history.heading[currentLang]}
        subtitle={history.subheading[currentLang]}
        className="mb-12"
      />

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Story Column: Sthala Purana */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-amber-900/10 pb-3">
            <Sparkles className="w-5 h-5 text-saffron-600" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon-900">
              {history.storyTitle[currentLang]}
            </h3>
          </div>

          {history.paragraphs[currentLang].map((para, idx) => (
            <p
              key={idx}
              className="text-base sm:text-base text-gray-700 leading-relaxed"
            >
              {para}
            </p>
          ))}

          {/* Cultural Significance Highlight Card */}
          <div className="bg-amber-50/90 border-l-4 border-saffron-600 p-4 sm:p-5 rounded-r-xl space-y-1.5 shadow-xs">
            <h4 className="font-serif font-bold text-maroon-900 text-sm sm:text-base">
              {history.cultureCard.title[currentLang]}
            </h4>
            <p className="text-base text-gray-700 leading-relaxed">
              {history.cultureCard.text[currentLang]}
            </p>
          </div>
        </div>

        {/* Timeline Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-amber-900/10 pb-3">
            <Clock className="w-5 h-5 text-saffron-600" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon-900">
              {mandirContent.ui.chronologicalMilestones[currentLang]}
            </h3>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-amber-200">
            {history.timeline.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-saffron-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs z-10">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 block">
                    {item.era[currentLang]}
                  </span>
                  <h4 className="font-serif font-bold text-maroon-950 text-base">
                    {item.title[currentLang]}
                  </h4>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {item.desc[currentLang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
