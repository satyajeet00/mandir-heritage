"use client";

import React, { useState } from "react";
import { X, BellRing, BookOpen, Volume2, ZoomIn, ZoomOut } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import { playTempleBell } from "@/utils/audio";
import { useModal } from "@/utils/useModal";
import type { Language } from "./Header";

const SIZES = ["text-sm", "text-base", "text-lg", "text-xl"] as const;
type SizeClass = (typeof SIZES)[number];
const DEFAULT_SIZE: SizeClass = "text-lg"; // larger by default for elderly readers
const SIZE_KEY = "aartiTextSize";

function readSavedSize(): SizeClass {
  if (typeof window === "undefined") return DEFAULT_SIZE;
  try {
    const saved = window.localStorage.getItem(SIZE_KEY);
    return SIZES.find((x) => x === saved) ?? DEFAULT_SIZE;
  } catch {
    return DEFAULT_SIZE;
  }
}

interface AartiModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
}

export default function AartiModal({
  isOpen,
  onClose,
  currentLang = "mr",
}: AartiModalProps) {
  const { aartis } = mandirContent;
  const [activeTab, setActiveTab] = useState<string>(aartis[0]?.id || "ganpati");
  const [fontSizeClass, setFontSizeClass] = useState<SizeClass>(readSavedSize);
  const [bellRinging, setBellRinging] = useState(false);

  const dialogRef = useModal<HTMLDivElement>(isOpen, onClose);

  if (!isOpen) return null;

  const currentAarti = aartis.find((a) => a.id === activeTab) || aartis[0];

  const handleBellRing = () => {
    playTempleBell();
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 2000);
  };

  const sizeIndex = SIZES.indexOf(fontSizeClass);

  const handleZoom = (direction: "in" | "out") => {
    const next = SIZES[Math.min(SIZES.length - 1, Math.max(0, sizeIndex + (direction === "in" ? 1 : -1)))];
    setFontSizeClass(next);
    try {
      window.localStorage.setItem(SIZE_KEY, next);
    } catch {
      /* storage unavailable: size just isn't remembered */
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={mandirContent.ui.aartiHaripathReader[currentLang]}
      tabIndex={-1}
      onClick={onClose}
      className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-stretch sm:items-center justify-center p-0 sm:p-5 animate-in fade-in duration-200"
    >
      <div onClick={(e) => e.stopPropagation()} className="bg-parchment rounded-none sm:rounded-3xl sm:max-w-2xl w-full h-dvh sm:h-auto overflow-hidden shadow-2xl border-0 sm:border-2 border-amber-500/40 flex flex-col sm:max-h-[90vh]">
        {/* Modal Header */}
        <div className="shimmer-gold text-white p-4 sm:p-5 flex items-center justify-between border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-serif font-bold text-lg">
              ॐ
            </div>
            <div>
              <span className="hidden sm:block text-xs uppercase tracking-widest text-amber-300 font-bold">
                {mandirContent.ui.sacredHymnsHaripath[currentLang]}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                {mandirContent.ui.ramMalAartiHaripath[currentLang]}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Bell trigger */}
            <button
              onClick={handleBellRing}
              className={`p-2 rounded-xl text-amber-200 hover:text-white transition flex items-center gap-1.5 border border-amber-400/30 text-sm font-semibold ${
                bellRinging ? "bg-amber-400 text-maroon-950 scale-105" : "bg-maroon-900/80 hover:bg-maroon-900"
              }`}
              title={mandirContent.ui.ringBell[currentLang]}
            >
              <BellRing className={`w-4 h-4 ${bellRinging ? "animate-bounce text-maroon-950" : "text-amber-300"}`} />
              <span className="hidden sm:inline">
                {mandirContent.ui.chime[currentLang]}
              </span>
            </button>

            <button
              onClick={onClose}
              className="text-amber-200 hover:text-white min-w-11 min-h-11 inline-flex items-center justify-center rounded-xl hover:bg-white/10 transition"
              aria-label={mandirContent.ui.close[currentLang]}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher & Font Controls */}
        <div className="bg-amber-100/70 border-b border-amber-900/10 p-2 sm:p-3 sm:px-5 flex flex-wrap items-center justify-between gap-2 sm:gap-3 shrink-0">
          {/* Aarti Selection Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white/70 p-1 rounded-xl border border-amber-900/10 w-full sm:w-auto">
            {aartis.map((aarti) => (
              <button
                key={aarti.id}
                onClick={() => setActiveTab(aarti.id)}
                className={`min-h-11 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === aarti.id
                    ? "bg-saffron-700 text-white shadow-xs"
                    : "text-maroon-900 hover:bg-amber-100"
                }`}
              >
                {aarti.deity}
              </button>
            ))}
          </div>

          {/* Text Size Controls */}
          <div className="flex items-center gap-1 text-sm text-maroon-900 font-semibold bg-white/70 px-2 py-1 rounded-xl border border-amber-900/10 ml-auto">
            <span className="text-sm text-gray-600 mr-1 hidden sm:inline">
              {mandirContent.ui.textSize[currentLang]}
            </span>
            <button
              onClick={() => handleZoom("out")}
              disabled={sizeIndex === 0}
              className="min-w-11 min-h-11 inline-flex items-center justify-center rounded hover:bg-amber-100 disabled:opacity-40 disabled:hover:bg-transparent"
              title={mandirContent.ui.smaller[currentLang]}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="px-1 text-sm">A</span>
            <button
              onClick={() => handleZoom("in")}
              disabled={sizeIndex === SIZES.length - 1}
              className="min-w-11 min-h-11 inline-flex items-center justify-center rounded hover:bg-amber-100 disabled:opacity-40 disabled:hover:bg-transparent"
              title={mandirContent.ui.larger[currentLang]}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lyrics Content Container */}
        <div className="p-3 sm:p-7 overflow-y-auto space-y-4 text-maroon-950 flex-1">
          <div className="bg-white rounded-2xl p-4 sm:p-7 border border-amber-900/15 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-saffron-600" />
                <h4 className="font-serif font-bold text-maroon-900 text-lg sm:text-xl">
                  {currentAarti?.title}
                </h4>
              </div>
              <button
                onClick={handleBellRing}
                className="text-sm text-saffron-700 hover:text-saffron-800 flex items-center gap-1 min-h-11 px-2 font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>नाद</span>
              </button>
            </div>

            <div
              className={`font-serif leading-loose text-center py-2 space-y-1 transition-all ${fontSizeClass}`}
            >
              {currentAarti?.lyrics.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line === ""
                      ? "h-4"
                      : line.includes("धृ") || line.includes("जय देव")
                      ? "font-bold text-saffron-700 py-0.5"
                      : "text-gray-800"
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-white border-t border-amber-900/10 flex items-center justify-between shrink-0 px-5">
          <span className="text-sm text-gray-600">
            {mandirContent.ui.dailyEveningAartiHaripath[currentLang]}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-amber-200 font-semibold text-sm transition cursor-pointer"
          >
            {mandirContent.ui.close[currentLang]}
          </button>
        </div>
      </div>
    </div>
  );
}
