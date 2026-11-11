"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickAccess from "@/components/QuickAccess";
import History from "@/components/History";
import Architecture from "@/components/Architecture";
import DrishyaGallery from "@/components/DrishyaGallery";
import DarshanSchedule from "@/components/DarshanSchedule";
import DengiSeva from "@/components/DengiSeva";
import Utsavs from "@/components/Utsavs";
import AartiModal from "@/components/AartiModal";
import { BookOpenCheck, BellRing } from "lucide-react";
import { playTempleBell } from "@/utils/audio";
import { useLanguage } from "@/utils/useLanguage";
import mandirContent from "@/data/mandirContent.json";

export default function Home() {
  // Pure bilingual state (mr / en)
  const [currentLang, setCurrentLang] = useLanguage();
  const [aartiModalOpen, setAartiModalOpen] = useState(false);

  const { aartiCallout, footer, temple } = mandirContent;

  return (
    <div className="min-h-screen flex flex-col bg-parchment text-maroon-950">
      {/* 1. Header (Panchang Ticker, Bell Chime & Pure Bilingual Switcher) */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onOpenAarti={() => setAartiModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero (4K Drone Video Background, Status & Heritage Stats) */}
        <Hero currentLang={currentLang} />

        {/* Quick access: timings / how to reach / donation / aarti */}
        <QuickAccess currentLang={currentLang} onOpenAarti={() => setAartiModalOpen(true)} />

        {/* 3. History (Bilingual Sthala Purana and Stone Timeline) */}
        <History currentLang={currentLang} />

        {/* 4. Architecture (6 Basalt Interlocking Feature Cards) */}
        <Architecture currentLang={currentLang} />

        {/* 5. Drishya Gallery (Crowd-Free Visuals, 4K Drone Tour & Accessible Lightbox) */}
        <DrishyaGallery currentLang={currentLang} />

        {/* 6. Darshan Schedule (Morning, Midday & Evening Aarti Ledger) */}
        <DarshanSchedule currentLang={currentLang} />

        {/* Digital Aarti Callout Banner (Full Bilingual) */}
        <section id="aarti-sangrah" className="scroll-mt-24 py-12 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-950 rounded-3xl p-6 sm:p-10 text-white border border-amber-500/30 shadow-xl grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                {aartiCallout.badge[currentLang]}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-50">
                {aartiCallout.title[currentLang]}
              </h3>
              <p className="text-base text-amber-100/80 leading-relaxed max-w-2xl">
                {aartiCallout.description[currentLang]}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => setAartiModalOpen(true)}
                className="w-full py-3.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-maroon-950 font-bold text-sm transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <BookOpenCheck className="w-5 h-5" />
                <span>{aartiCallout.btnRead[currentLang]}</span>
              </button>
              <button
                onClick={() => playTempleBell()}
                className="w-full py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-400/30 font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <BellRing className="w-4 h-4 text-amber-300" />
                <span>{aartiCallout.btnBell[currentLang]}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 7. Dengi & Seva (UPI QR Code, Official Trust Bank Ledger & WhatsApp Receipt Assistance) */}
        <DengiSeva currentLang={currentLang} />

        {/* 8. Utsavs & Visitor Etiquette Guide (Full Bilingual) */}
        <Utsavs currentLang={currentLang} />
      </main>

      {/* Footer (Full Bilingual) */}
      <footer className="bg-maroon-950 text-amber-100/80 border-t border-amber-900/40 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1.5">
              <p className="font-serif text-amber-300/90 text-sm">
                {footer.blessing[currentLang]}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-100 font-serif font-bold text-lg">
                <span>ॐ</span>
                <span>{temple.name[currentLang]}</span>
              </div>
              <p className="text-amber-200/75 text-sm font-semibold">
                {temple.subName[currentLang]} • {temple.trustTag[currentLang]}
              </p>
              <p className="text-amber-200/75 text-sm">
                {temple.address[currentLang]}
              </p>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-amber-300/80">
              <a href="#history" className="inline-flex items-center min-h-11 hover:text-white transition">
                {footer.navLinks[currentLang].history}
              </a>
              <a href="#architecture" className="inline-flex items-center min-h-11 hover:text-white transition">
                {footer.navLinks[currentLang].architecture}
              </a>
              <a href="#gallery" className="inline-flex items-center min-h-11 hover:text-white transition">
                {footer.navLinks[currentLang].gallery}
              </a>
              <a href="#darshan" className="inline-flex items-center min-h-11 hover:text-white transition">
                {footer.navLinks[currentLang].darshan}
              </a>
              <a href="#utsavs" className="inline-flex items-center min-h-11 hover:text-white transition">
                {footer.navLinks[currentLang].utsavs}
              </a>
              <a href="#dengi" className="inline-flex items-center min-h-11 hover:text-white transition">
                {mandirContent.ui.donationSeva[currentLang]}
              </a>
            </nav>
          </div>

          <div className="pt-6 border-t border-amber-900/40 flex flex-wrap items-center justify-between gap-4 text-sm text-amber-200/75">
            <p>{footer.copyright[currentLang]}</p>
            <p>
              {mandirContent.ui.pratiayodhyaShriKshetraRam[currentLang]}
            </p>
          </div>
        </div>
      </footer>

      {/* Digital Aarti Sangrah Modal */}
      <AartiModal
        isOpen={aartiModalOpen}
        onClose={() => setAartiModalOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
