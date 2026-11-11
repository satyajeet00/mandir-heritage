"use client";

import React from "react";
import { Scroll, Compass, Video } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";

interface HeroProps {
  currentLang: Language;
}

function getYoutubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function Hero({ currentLang }: HeroProps) {
  const { hero } = mandirContent;
  const youtubeId = getYoutubeId(hero.videoSrc);

  return (
    <section className="relative overflow-hidden text-white border-b border-amber-900/30 min-h-[75vh] flex items-center bg-maroon-950">
      {/* 4K Drone Aerial Video Loop with Deep Basalt Radial Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Instant High-Res Drone Photo Base */}
        <img
          src={hero.posterSrc}
          alt="Ram-mal Aerial Drone Poster"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />

        {/* Live Looping Video (YouTube or HTML5 Video) */}
        {youtubeId ? (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <iframe
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[178vh] h-[56.25vw] max-w-none opacity-60 pointer-events-none border-0"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="Ram-mal Ashram Aerial Drone Background"
            />
          </div>
        ) : (
          <video
            className="w-full h-full object-cover opacity-50"
            autoPlay
            muted
            loop
            playsInline
            poster={hero.posterSrc}
          >
            <source src={hero.videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Radial Basalt Stone Overlay for High Contrast Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/90 via-maroon-950/70 to-maroon-950/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative z-10 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Historical Introduction & Sacred Presence */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status pill & Drone indicator */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2.5 bg-maroon-900/80 border border-amber-400/40 rounded-full px-4 py-1.5 text-xs sm:text-sm text-amber-200 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 live-pulse shrink-0" />
              <span className="font-semibold text-white">
                {hero.liveStatus[currentLang]}
              </span>
              <span className="text-amber-400">•</span>
              <span className="text-amber-200">
                {hero.nextAarti[currentLang]}
              </span>
            </div>

            <a
              href="#gallery"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold transition"
            >
              <Video className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {currentLang === "mr" ? "४K ड्रोन दृश्य पहा" : "4K Drone Tour"}
              </span>
            </a>
          </div>

          {/* Main Title with Two-Tier Branding */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
              <span>🚩</span>
              <span>{hero.kicker[currentLang]}</span>
            </div>
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
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-400/20 max-w-lg">
            {hero.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                  {stat.value[currentLang]}
                </div>
                <div className="text-xs text-amber-200/75 leading-tight">
                  {stat.label[currentLang]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Deity & Darshan Times Card (Full Bilingual) */}
        <div className="lg:col-span-5">
          <div className="bg-maroon-950/90 border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
                {hero.deityCard.badge[currentLang]}
              </span>
              <span className="text-xs text-amber-300/90 font-medium">
                {hero.deityCard.entry[currentLang]}
              </span>
            </div>

            {/* Deity Info Box */}
            <div className="rounded-xl bg-gradient-to-b from-amber-900/40 to-maroon-950 border border-amber-500/30 p-6 text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shadow-inner text-amber-300 font-serif text-4xl">
                ॐ
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100">
                {hero.deityCard.title[currentLang]}
              </h3>
              <p className="text-xs text-amber-200/80 leading-relaxed max-w-sm mx-auto">
                {hero.deityCard.description[currentLang]}
              </p>
            </div>

            {/* Timing Snapshot (Full Bilingual) */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-maroon-900/70 rounded-xl p-3 border border-amber-500/15">
                <span className="text-amber-300/70 block text-[10px] uppercase font-bold tracking-wider">
                  {hero.deityCard.morningLabel[currentLang]}
                </span>
                <span className="font-semibold text-amber-100">
                  {hero.deityCard.morningTiming}
                </span>
              </div>
              <div className="bg-maroon-900/70 rounded-xl p-3 border border-amber-500/15">
                <span className="text-amber-300/70 block text-[10px] uppercase font-bold tracking-wider">
                  {hero.deityCard.eveningLabel[currentLang]}
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
