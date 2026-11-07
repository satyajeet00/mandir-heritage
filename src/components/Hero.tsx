"use client";

import React from "react";
import { Scroll, Compass } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";

interface HeroProps {
  currentLang: Language;
}

export default function Hero({ currentLang }: HeroProps) {
  const t = mandirContent.translations[currentLang];
  const { hero } = mandirContent;

  return (
    <section className="relative overflow-hidden shimmer-gold text-white border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 relative z-10 grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Historical Introduction & Sacred Presence */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2.5 bg-maroon-950/80 border border-amber-400/40 rounded-full px-4 py-1.5 text-xs sm:text-sm text-amber-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 live-pulse shrink-0"></span>
            <span className="font-semibold text-white">{t.liveStatus}</span>
            <span className="text-amber-400">•</span>
            <span className="text-amber-200">{t.nextAarti}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-amber-50">
            {t.heroTitle}
          </h2>

          <p className="text-amber-100/90 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            {t.heroSubtitle}
          </p>

          {/* Primary Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#history"
              className="bg-amber-500 hover:bg-amber-400 text-maroon-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Scroll className="w-5 h-5" />
              <span>{t.ctaExploreHistory}</span>
            </a>
            <a
              href="#architecture"
              className="bg-white/10 hover:bg-white/20 text-amber-100 border border-amber-400/40 font-semibold px-6 py-3.5 rounded-xl transition flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Compass className="w-5 h-5 text-amber-300" />
              <span>{t.ctaArchitecture}</span>
            </a>
          </div>

          {/* Key 13th-Century Heritage Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-400/20 max-w-lg">
            {hero.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                  {stat.value}
                </div>
                <div className="text-xs text-amber-200/80 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Deity & Darshan Times Card */}
        <div className="lg:col-span-5">
          <div className="bg-maroon-950/90 border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
                {hero.deityCard.badge}
              </span>
              <span className="text-xs text-amber-300/90 font-medium">
                {hero.deityCard.entry}
              </span>
            </div>

            {/* Deity Info Box */}
            <div className="rounded-xl bg-gradient-to-b from-amber-900/40 to-maroon-950 border border-amber-500/30 p-6 text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shadow-inner text-amber-300 font-serif text-4xl">
                ॐ
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100">
                {hero.deityCard.title}
              </h3>
              <p className="text-xs text-amber-200/80 leading-relaxed max-w-sm mx-auto">
                {hero.deityCard.description}
              </p>
            </div>

            {/* Timing Snapshot */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-maroon-900/70 rounded-xl p-3 border border-amber-500/15">
                <span className="text-amber-300/70 block text-[10px] uppercase font-bold tracking-wider">
                  सकाळचे दर्शन
                </span>
                <span className="font-semibold text-amber-100">
                  {hero.deityCard.morningTiming}
                </span>
              </div>
              <div className="bg-maroon-900/70 rounded-xl p-3 border border-amber-500/15">
                <span className="text-amber-300/70 block text-[10px] uppercase font-bold tracking-wider">
                  सायंकाळचे दर्शन
                </span>
                <span className="font-semibold text-amber-100">
                  {hero.deityCard.eveningTiming}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
