"use client";

import React, { useState } from "react";
import { X, BellRing, BookOpen, Volume2, ZoomIn, ZoomOut } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import { playTempleBell } from "@/utils/audio";
import { useModal } from "@/utils/useModal";
import type { Language } from "./Header";

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
  const [fontSizeClass, setFontSizeClass] = useState<"text-sm" | "text-base" | "text-lg">("text-base");
  const [bellRinging, setBellRinging] = useState(false);

  const dialogRef = useModal<HTMLDivElement>(isOpen, onClose);

  if (!isOpen) return null;

  const currentAarti = aartis.find((a) => a.id === activeTab) || aartis[0];

  const handleBellRing = () => {
    playTempleBell();
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 2000);
  };

  const handleZoom = (direction: "in" | "out") => {
    if (direction === "in") {
      setFontSizeClass((prev) => (prev === "text-sm" ? "text-base" : "text-lg"));
    } else {
      setFontSizeClass((prev) => (prev === "text-lg" ? "text-base" : "text-sm"));
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
      className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
    >
      <div onClick={(e) => e.stopPropagation()} className="bg-parchment rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border-2 border-amber-500/40 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="shimmer-gold text-white p-4 sm:p-5 flex items-center justify-between border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-serif font-bold text-lg">
              ॐ
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">
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
              className="text-amber-200 hover:text-white p-2 rounded-xl hover:bg-white/10 transition"
              aria-label={mandirContent.ui.close[currentLang]}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher & Font Controls */}
        <div className="bg-amber-100/70 border-b border-amber-900/10 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Aarti Selection Tabs */}
          <div className="flex items-center gap-1.5 bg-white/70 p-1 rounded-xl border border-amber-900/10">
            {aartis.map((aarti) => (
              <button
                key={aarti.id}
                onClick={() => setActiveTab(aarti.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
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
              className="p-1 rounded hover:bg-amber-100"
              title={mandirContent.ui.smaller[currentLang]}
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-sm">A</span>
            <button
              onClick={() => handleZoom("in")}
              className="p-1 rounded hover:bg-amber-100"
              title={mandirContent.ui.larger[currentLang]}
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Lyrics Content Container */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-4 text-maroon-950 flex-1">
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-amber-900/15 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-saffron-600" />
                <h4 className="font-serif font-bold text-maroon-900 text-lg sm:text-xl">
                  {currentAarti?.title}
                </h4>
              </div>
              <button
                onClick={handleBellRing}
                className="text-sm text-saffron-700 hover:text-saffron-800 flex items-center gap-1 font-semibold"
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
