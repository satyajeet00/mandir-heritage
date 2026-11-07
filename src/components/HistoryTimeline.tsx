"use client";

import React from "react";
import { History, Sparkles } from "lucide-react";
import mandirData from "@/data/mandir-data.json";

interface HistoryTimelineProps {
  currentLang?: "mr" | "hi" | "en";
}

export default function HistoryTimeline({
  currentLang = "mr",
}: HistoryTimelineProps) {
  const { history } = mandirData;
  const t = mandirData.translations[currentLang];

  return (
    <section id="history" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-saffron-700 bg-saffron-100 px-3.5 py-1 rounded-full border border-saffron-500/20">
          {history.badge}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-maroon-900 mt-3.5">
          {t.historyHeading || history.heading}
        </h2>
        <p className="text-sm sm:text-base text-maroon-800/80 mt-2.5 leading-relaxed max-w-2xl mx-auto">
          {history.subheading}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Story Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-amber-900/10 pb-3">
            <Sparkles className="w-5 h-5 text-saffron-600" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon-900">
              {history.storyTitle}
            </h3>
          </div>

          {history.paragraphs.map((para, idx) => (
            <p
              key={idx}
              className="text-sm sm:text-base text-gray-700 leading-relaxed"
            >
              {para}
            </p>
          ))}

          {/* Cultural Significance Box */}
          <div className="bg-amber-50/90 border-l-4 border-saffron-600 p-4 sm:p-5 rounded-r-xl space-y-1.5 shadow-xs">
            <h4 className="font-serif font-bold text-maroon-900 text-sm sm:text-base">
              {history.cultureCard.title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {history.cultureCard.text}
            </p>
          </div>
        </div>

        {/* Timeline Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-parchment rounded-2xl p-6 sm:p-7 border border-amber-900/20 shadow-xs space-y-6">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon-900 flex items-center gap-2 border-b border-amber-900/15 pb-3">
              <History className="w-5 h-5 text-saffron-600" />
              <span>ऐतिहासिक कालखंड (Chronological Timeline)</span>
            </h3>

            <div className="relative pl-6 sm:pl-7 border-l-2 border-saffron-500 space-y-7 ml-2">
              {history.timeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node */}
                  <span className="absolute -left-[31px] sm:-left-[35px] top-1 w-4 h-4 rounded-full bg-saffron-600 border-2 border-white shadow-xs group-hover:scale-125 transition-transform"></span>
                  <span className="text-[11px] font-bold text-saffron-700 uppercase tracking-wider bg-amber-100/70 px-2 py-0.5 rounded">
                    {item.era}
                  </span>
                  <h4 className="font-serif font-bold text-maroon-900 text-base sm:text-lg mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
