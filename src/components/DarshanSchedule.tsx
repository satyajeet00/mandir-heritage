"use client";

import React from "react";
import { Sunrise, Flame, Moon, LucideIcon } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";
import SectionHeader from "./SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  Sunrise,
  Flame,
  Moon,
};

interface DarshanScheduleProps {
  currentLang?: Language;
}

export default function DarshanSchedule({
  currentLang = "mr",
}: DarshanScheduleProps) {
  const { darshan } = mandirContent;

  return (
    <section id="darshan" className="scroll-mt-24 py-16 max-w-7xl mx-auto px-4 sm:px-6">
      <SectionHeader
        badge={darshan.badge[currentLang]}
        title={darshan.heading[currentLang]}
        subtitle={darshan.subheading[currentLang]}
        className="mb-12"
      />

      {/* 3 Timing Cards */}
      <div className="grid sm:grid-cols-3 gap-6 items-stretch">
        {darshan.cards.map((card, idx) => {
          const Icon = iconMap[card.icon] || Flame;
          const isHighlight = card.highlight;

          return (
            <div
              key={idx}
              className={`rounded-2xl p-6 sm:p-7 transition-all flex flex-col justify-between ${
                isHighlight
                  ? "bg-gradient-to-b from-amber-50 to-white border-2 border-saffron-600 shadow-lg scale-102 ring-4 ring-amber-500/10"
                  : "bg-white border border-amber-900/15 shadow-sm hover:shadow-md"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full ${
                      isHighlight
                        ? "bg-saffron-700 text-white shadow-xs"
                        : "bg-amber-100 text-saffron-700"
                    }`}
                  >
                    {card.tag[currentLang]}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isHighlight
                        ? "bg-saffron-100 text-saffron-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-maroon-900">
                  {card.title[currentLang]}
                </h3>

                <p className="font-serif font-bold text-saffron-700 text-lg sm:text-xl mt-1.5">
                  {card.time[currentLang]}
                </p>

                <p className="text-base text-gray-600 mt-3 leading-relaxed">
                  {card.description[currentLang]}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-amber-900/10 flex items-center gap-2 text-sm text-maroon-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>
                  {mandirContent.ui.darshanOpenSereneAmbiance[currentLang]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
