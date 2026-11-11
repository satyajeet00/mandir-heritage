"use client";

import React, { useState } from "react";
import { BellRing, BookOpen, Menu, X } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import { playTempleBell } from "@/utils/audio";

export type Language = "mr" | "en";

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenAarti?: () => void;
}

export default function Header({
  currentLang,
  onSelectLang,
  onOpenAarti,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);

  const handleBell = () => {
    playTempleBell();
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 2200);
  };

  const navLabels = {
    history:
      currentLang === "mr"
        ? mandirContent.i18n.mr.navHeritage
        : mandirContent.i18n.en.navHeritage,
    architecture:
      currentLang === "mr"
        ? mandirContent.i18n.mr.navArch
        : mandirContent.i18n.en.navArch,
    gallery: currentLang === "mr" ? "दृश्य दर्शन" : "Visual Gallery",
    darshan:
      currentLang === "mr"
        ? mandirContent.i18n.mr.navDarshan
        : mandirContent.i18n.en.navDarshan,
    utsavs:
      currentLang === "mr"
        ? mandirContent.i18n.mr.navUtsav
        : mandirContent.i18n.en.navUtsav,
    visit:
      currentLang === "mr"
        ? mandirContent.i18n.mr.navVisit
        : mandirContent.i18n.en.navVisit,
    dengi: currentLang === "mr" ? "देणगी व अन्नदान" : "Donation & Seva",
    btnAarti:
      currentLang === "mr"
        ? mandirContent.i18n.mr.btnAarti
        : mandirContent.i18n.en.btnAarti,
    noticeBadge: currentLang === "mr" ? "तपोभूमी सूचना" : "Notice",
    bellText: currentLang === "mr" ? "महाघंटा" : "Sacred Bell",
    bellRingingText: currentLang === "mr" ? "ॐ घंटानाद..." : "Chime...",
  };

  return (
    <>
      {/* Top Notice Ticker & Quick Controls */}
      <div className="bg-gradient-to-r from-saffron-700 via-saffron-600 to-saffron-700 text-white text-xs sm:text-sm py-2 px-4 shadow-xs border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-maroon-900 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shrink-0 shadow-xs">
              {navLabels.noticeBadge}
            </span>
            <span className="font-medium truncate text-amber-50">
              {mandirContent.ticker[currentLang]}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-auto">
            {/* Temple Bell */}
            <button
              onClick={handleBell}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                bellRinging
                  ? "bg-amber-400 text-maroon-950 border-amber-300 scale-105 shadow-md"
                  : "bg-maroon-900/80 hover:bg-maroon-900 text-amber-200 border-amber-400/30"
              }`}
              title="Ring Temple Bell"
            >
              <BellRing
                className={`w-3.5 h-3.5 ${
                  bellRinging ? "animate-bounce text-maroon-950" : "text-amber-300"
                }`}
              />
              <span>
                {bellRinging ? navLabels.bellRingingText : navLabels.bellText}
              </span>
            </button>

            {/* Pure Bilingual Language Switcher (मराठी | English) */}
            <div className="flex items-center rounded-lg bg-maroon-950/90 p-0.5 border border-amber-400/30 text-xs">
              <button
                onClick={() => onSelectLang("mr")}
                className={`px-3 py-0.5 rounded font-medium transition-all cursor-pointer ${
                  currentLang === "mr"
                    ? "bg-amber-500 text-maroon-950 font-bold shadow-xs"
                    : "text-amber-100 hover:text-white"
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => onSelectLang("en")}
                className={`px-3 py-0.5 rounded font-medium transition-all cursor-pointer ${
                  currentLang === "en"
                    ? "bg-amber-500 text-maroon-950 font-bold shadow-xs"
                    : "text-amber-100 hover:text-white"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="bg-parchment/95 backdrop-blur-md border-b border-amber-900/15 sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Logo / Deity Badge & Temple Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full shimmer-gold flex items-center justify-center border-2 border-amber-400 shadow-md text-amber-300 font-serif text-xl font-bold shrink-0">
              ॐ
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-saffron-700">
                  {mandirContent.temple.subName[currentLang]}
                </span>
                <span className="hidden sm:inline text-amber-500 text-xs">•</span>
                <span className="hidden sm:inline text-[10px] text-amber-800/80 font-medium">
                  {mandirContent.temple.trustTag[currentLang]}
                </span>
              </div>
              <h1 className="font-serif text-lg sm:text-xl font-bold text-maroon-900 leading-tight">
                {mandirContent.temple.name[currentLang]}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-maroon-900/85">
            <a href="#history" className="hover:text-saffron-600 transition">
              {navLabels.history}
            </a>
            <a href="#architecture" className="hover:text-saffron-600 transition">
              {navLabels.architecture}
            </a>
            <a href="#gallery" className="hover:text-saffron-600 transition">
              {navLabels.gallery}
            </a>
            <a href="#darshan" className="hover:text-saffron-600 transition">
              {navLabels.darshan}
            </a>
            <a href="#utsavs" className="hover:text-saffron-600 transition">
              {navLabels.utsavs}
            </a>
            <a href="#dengi" className="hover:text-saffron-600 transition">
              {navLabels.dengi}
            </a>
            <a href="#visit" className="hover:text-saffron-600 transition">
              {navLabels.visit}
            </a>
          </nav>

          {/* Action Button & Hamburger */}
          <div className="flex items-center gap-2.5">
            {onOpenAarti && (
              <button
                onClick={onOpenAarti}
                className="bg-maroon-900 hover:bg-maroon-800 text-amber-200 border border-amber-500/40 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{navLabels.btnAarti}</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-maroon-900 hover:bg-amber-100/50 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-amber-900/10 bg-parchment px-4 py-3 space-y-2 text-sm font-semibold text-maroon-900">
            <a
              href="#history"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg hover:bg-amber-100/60"
            >
              {navLabels.history}
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg hover:bg-amber-100/60"
            >
              {navLabels.architecture}
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg hover:bg-amber-100/60"
            >
              {navLabels.gallery}
            </a>
            <a
              href="#darshan"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg hover:bg-amber-100/60"
            >
              {navLabels.darshan}
            </a>
            <a
              href="#utsavs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg hover:bg-amber-100/60"
            >
              {navLabels.utsavs}
            </a>
            <a
              href="#dengi"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg hover:bg-amber-100/60 text-saffron-700 font-bold"
            >
              {navLabels.dengi}
            </a>
            <a
              href="#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg hover:bg-amber-100/60"
            >
              {navLabels.visit}
            </a>
          </div>
        )}
      </header>
    </>
  );
}
