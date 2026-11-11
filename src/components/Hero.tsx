"use client";

import React from "react";
import Image from "next/image";
import { Scroll, Compass } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";
import Badge from "./Badge";

interface HeroProps {
  currentLang: Language;
}

export default function Hero({ currentLang }: HeroProps) {
  const { hero } = mandirContent;
  const paduka = mandirContent.gallery.find((g) => g.id === "gallery-paduka")!;

  return (
    <section className="relative overflow-hidden text-white border-b border-amber-900/30 min-h-[85svh] flex items-center bg-maroon-950">
      {/* Drone photo background: full strength, slow pan, light overlay so the river and temple stay visible */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={hero.posterSrc}
          alt={mandirContent.ui.aerialViewOfRam[currentLang]}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[70%_18%] hero-pan"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/85 via-maroon-950/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-maroon-950/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative z-10 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Historical Introduction & Sacred Presence */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status pill: timings • next aarti */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2.5 bg-maroon-900/80 border border-amber-400/40 rounded-full px-4 py-1.5 text-sm text-amber-200 shadow-xs">
              <span className="font-semibold text-white">
                {hero.liveStatus[currentLang]}
              </span>
              <span className="text-amber-400">•</span>
              <span className="text-amber-200">
                {hero.nextAarti[currentLang]}
              </span>
            </div>
          </div>

          {/* Main Title with Two-Tier Branding */}
          <div className="space-y-2">
            <Badge tone="dark" caps={false}>
              <span>{hero.kicker[currentLang]}</span>
            </Badge>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-amber-50">
              {hero.title[currentLang]}
            </h1>
          </div>

          <p className="text-amber-100/90 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            {hero.subtitle[currentLang]}
          </p>

          {/* Primary Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#history"
              className="bg-amber-500 hover:bg-amber-400 text-maroon-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Scroll className="w-5 h-5" />
              <span>{hero.ctaHistory[currentLang]}</span>
            </a>
            <a
              href="#architecture"
              className="bg-white/10 hover:bg-white/20 text-amber-100 border border-amber-400/40 font-semibold px-6 py-3.5 rounded-xl transition flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Compass className="w-5 h-5 text-amber-300" />
              <span>{hero.ctaArchitecture[currentLang]}</span>
            </a>
          </div>

          {/* Key Heritage Stats (Full Bilingual) */}
          <div className="hero-stats grid grid-cols-3 gap-4 pt-6 border-t border-amber-400/20 max-w-lg">
            {hero.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="hero-stat-value font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                  {stat.value[currentLang]}
                </div>
                <div className="text-sm text-amber-200/75 leading-tight">
                  {stat.label[currentLang]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Deity & Darshan Times Card (Full Bilingual) */}
        <div className="lg:col-span-5">
          <div className="bg-maroon-950/90 border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl relative space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <Badge tone="dark">
                {hero.deityCard.badge[currentLang]}
              </Badge>
              <span className="text-sm text-amber-300/90 font-medium">
                {hero.deityCard.entry[currentLang]}
              </span>
            </div>

            {/* Deity Info Box */}
            <div className="rounded-xl bg-gradient-to-b from-amber-900/40 to-maroon-950 border border-amber-500/30 p-6 text-center space-y-3">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border-2 border-amber-400/60 shadow-inner">
                <Image
                  src={paduka.src}
                  alt={paduka.alt[currentLang]}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  loading="eager"
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100">
                {hero.deityCard.title[currentLang]}
              </h3>
              <p className="text-base text-amber-200/80 leading-relaxed max-w-sm mx-auto">
                {hero.deityCard.description[currentLang]}
              </p>
            </div>

            {/* Opening hours note (single source: hero.deityCard.hours) */}
            <div className="bg-maroon-900/70 rounded-xl p-3.5 border border-amber-500/15 flex items-center gap-2.5 text-sm text-amber-100 font-semibold">
              <span>{hero.deityCard.hours[currentLang]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
