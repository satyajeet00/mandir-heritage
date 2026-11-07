"use client";

import React from "react";
import { Sunrise, Flame, Moon, LucideIcon, HeartHandshake } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";

const iconMap: Record<string, LucideIcon> = {
  Sunrise,
  Flame,
  Moon,
};

interface DarshanScheduleProps {
  currentLang: Language;
}

export default function DarshanSchedule({
  currentLang,
}: DarshanScheduleProps) {
  const { darshan } = mandirContent;
  const t = mandirContent.translations[currentLang];

  return (
    <section id="darshan" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-saffron-700 bg-saffron-100 px-3.5 py-1 rounded-full border border-saffron-500/20">
          {darshan.badge}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-maroon-900 mt-3">
          {t.scheduleHeading || darshan.heading}
        </h2>
        <p className="text-sm sm:text-base text-maroon-800/80 mt-2.5">
          {darshan.subheading}
        </p>
      </div>

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
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      isHighlight
                        ? "bg-saffron-600 text-white shadow-xs"
                        : "bg-amber-100 text-saffron-700"
                    }`}
                  >
                    {card.time}
                  </span>
                  <div
                    className={`p-2 rounded-xl ${
                      isHighlight
                        ? "bg-saffron-100 text-saffron-600"
                        : "bg-amber-50 text-saffron-600"
                    }`}
                  >
                    <Icon className="w-5 h-5 text-saffron-600" />
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-maroon-900">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {isHighlight && (
                <div className="mt-5 pt-4 border-t border-amber-200/60 flex items-center gap-2 text-xs font-bold text-saffron-700">
                  <span>★</span>
                  <span>सामूहिक उपस्थिती व विशेष भजन</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Free Darshan Notice */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-maroon-900 text-center font-medium">
        <HeartHandshake className="w-5 h-5 text-saffron-600 shrink-0" />
        <span>
          मंदिरात सर्व भाविकांसाठी दर्शन पूर्णतः मोफत असून कोणत्याही व्हीआयपी रांगेची पद्धत नाही.
        </span>
      </div>
    </section>
  );
}
