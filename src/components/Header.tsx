"use client";

import React, { useState, useEffect } from "react";
import { BellRing, BookOpen, Menu, X } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import { playTempleBell } from "@/utils/audio";

import type { Language } from "@/utils/useLanguage";
export type { Language };

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
  const [activeId, setActiveId] = useState("");

  // Highlight the nav link of the section currently under the header
  useEffect(() => {
    const ids = ["history", "architecture", "gallery", "darshan", "dengi", "utsavs"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActiveId(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const navLink = (id: string) =>
    `py-1 border-b-2 transition ${
      activeId === id
        ? "text-saffron-700 border-saffron-600"
        : "border-transparent hover:text-saffron-600"
    }`;

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
    gallery: mandirContent.ui.visualGallery[currentLang],
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
    dengi: mandirContent.ui.donationSeva[currentLang],
    btnAarti:
      currentLang === "mr"
        ? mandirContent.i18n.mr.btnAarti
        : mandirContent.i18n.en.btnAarti,
    noticeBadge: mandirContent.ui.notice[currentLang],
    bellText: mandirContent.ui.sacredBell[currentLang],
    bellRingingText: mandirContent.ui.chime2[currentLang],
  };

  return (
    <>
      {/* Top Notice Ticker & Quick Controls */}
      <div className="bg-gradient-to-r from-saffron-800 via-saffron-700 to-saffron-800 text-white text-sm py-1.5 px-4 shadow-xs border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 truncate">
            <span className="bg-maroon-900 text-amber-300 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider shrink-0 shadow-xs">
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
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-full text-sm font-semibold border transition-all cursor-pointer ${
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
            <div className="flex items-center rounded-lg bg-maroon-950/90 p-0.5 border border-amber-400/30 text-sm">
              <button
                onClick={() => onSelectLang("mr")}
                className={`min-h-11 px-3.5 py-2 rounded font-medium transition-all cursor-pointer ${
                  currentLang === "mr"
                    ? "bg-amber-500 text-maroon-950 font-bold shadow-xs"
                    : "text-amber-100 hover:text-white"
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => onSelectLang("en")}
                className={`min-h-11 px-3.5 py-2 rounded font-medium transition-all cursor-pointer ${
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
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-full shimmer-gold flex items-center justify-center border-2 border-amber-400 shadow-md text-amber-300 font-serif text-xl font-bold shrink-0">
              ॐ
            </div>
            <div className="min-w-0">
              <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                <span className="text-xs sm:text-xs font-bold uppercase tracking-wider text-saffron-700">
                  {mandirContent.temple.subName[currentLang]}
                </span>
                <span className="hidden sm:inline text-amber-500 text-sm">•</span>
                <span className="hidden sm:inline text-sm text-amber-800/80 font-medium">
                  {mandirContent.temple.trustTag[currentLang]}
                </span>
              </div>
              <p className="font-serif text-base sm:text-xl font-bold text-maroon-900 leading-tight">
                {mandirContent.temple.name[currentLang]}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-maroon-900/85">
            <a
              href="#history"
              aria-current={activeId === "history" ? "location" : undefined}
              className={navLink("history")}
            >
              {navLabels.history}
            </a>
            <a
              href="#architecture"
              aria-current={activeId === "architecture" ? "location" : undefined}
              className={navLink("architecture")}
            >
              {navLabels.architecture}
            </a>
            <a
              href="#gallery"
              aria-current={activeId === "gallery" ? "location" : undefined}
              className={navLink("gallery")}
            >
              {navLabels.gallery}
            </a>
            <a
              href="#darshan"
              aria-current={activeId === "darshan" ? "location" : undefined}
              className={navLink("darshan")}
            >
              {navLabels.darshan}
            </a>
            <a
              href="#utsavs"
              aria-current={activeId === "utsavs" ? "location" : undefined}
              className={navLink("utsavs")}
            >
              {navLabels.utsavs}
            </a>
            <a
              href="#dengi"
              aria-current={activeId === "dengi" ? "location" : undefined}
              className={navLink("dengi")}
            >
              {navLabels.dengi}
            </a>
            <a
              href="#visit"
              aria-current={activeId === "visit" ? "location" : undefined}
              className={navLink("visit")}
            >
              {navLabels.visit}
            </a>
          </nav>

          {/* Action Button & Hamburger */}
          <div className="flex items-center gap-2.5">
            {onOpenAarti && (
              <button
                onClick={onOpenAarti}
                aria-label={navLabels.btnAarti}
                className="bg-maroon-900 hover:bg-maroon-800 text-amber-200 border border-amber-500/40 font-semibold text-sm px-3 sm:px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-5 h-5 sm:w-4 sm:h-4 text-amber-400" />
                <span className="hidden sm:inline">{navLabels.btnAarti}</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl text-maroon-900 hover:bg-amber-100/50 transition cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-amber-900/10 bg-parchment px-4 py-3 space-y-2 text-sm font-semibold text-maroon-900">
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
