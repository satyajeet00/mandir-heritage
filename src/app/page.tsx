"use client";

import React, { useState } from "react";
import Header, { Language } from "@/components/Header";
import Hero from "@/components/Hero";
import History from "@/components/History";
import Architecture from "@/components/Architecture";
import DarshanSchedule from "@/components/DarshanSchedule";
import UsageBar from "@/components/UsageBar";
import Utsavs from "@/components/Utsavs";
import AartiModal from "@/components/AartiModal";
import { BookOpenCheck, BellRing } from "lucide-react";
import { playTempleBell } from "@/utils/audio";
import mandirContent from "@/data/mandirContent.json";

export default function Home() {
  // Simple React state for the language toggle (mr / hi / en)
  const [currentLang, setCurrentLang] = useState<Language>("mr");
  const [aartiModalOpen, setAartiModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-parchment text-maroon-950">
      {/* 1. Header (Title, navigation links, and Language Switcher) */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onOpenAarti={() => setAartiModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero (Main banner, darshan times, and 13th-century stats) */}
        <Hero currentLang={currentLang} />

        {/* 3. History (The Sthala Purana and timeline) */}
        <History currentLang={currentLang} />

        {/* 4. Architecture (The 6 stone architecture highlights) */}
        <Architecture currentLang={currentLang} />

        {/* Live Temple Capacity & Usage Bar (1 to 100%) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
          <UsageBar initialValue={42} />
        </section>

        {/* 5. DarshanSchedule (Morning and evening Aarti timings) */}
        <DarshanSchedule currentLang={currentLang} />

        {/* Digital Aarti Callout Banner */}
        <section id="aarti-sangrah" className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-950 rounded-3xl p-6 sm:p-10 text-white border border-amber-500/30 shadow-xl grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                डिजिटल नित्यपाठ
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-50">
                मंदिरातील नित्य आरती संग्रह, अष्टक आणि मंत्रपुष्पांजली
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed max-w-2xl">
                मंदिरात सायंकाळच्या आरतीला आल्यावर किंवा घरी उपासना करताना आपल्या मोबाईलवर स्पष्ट मोठ्या अक्षरात आरती वाचण्यासाठी आम्ही येथे संपूर्ण संग्रह दिला आहे.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => setAartiModalOpen(true)}
                className="w-full py-3.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-maroon-950 font-bold text-sm transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <BookOpenCheck className="w-5 h-5" />
                <span>संपूर्ण आरती संग्रह उघडा</span>
              </button>
              <button
                onClick={() => playTempleBell()}
                className="w-full py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-400/30 font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <BellRing className="w-4 h-4 text-amber-300" />
                <span>मंदिर घंटानाद ऐका</span>
              </button>
            </div>
          </div>
        </section>

        {/* 6. Utsavs (Reads from mandirContent.json to show upcoming festivals) */}
        <Utsavs currentLang={currentLang} />
      </main>

      {/* Footer */}
      <footer className="bg-maroon-950 text-amber-100/80 border-t border-amber-900/40 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-300 font-serif font-bold text-base">
              <span>ॐ</span>
              <span>{mandirContent.temple.name}</span>
            </div>
            <p className="text-amber-200/60 text-xs">
              {mandirContent.temple.trustTag} • {mandirContent.temple.address}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-amber-300/80">
            <a href="#history" className="hover:text-white transition">
              इतिहास
            </a>
            <a href="#architecture" className="hover:text-white transition">
              स्थापत्य
            </a>
            <a href="#darshan" className="hover:text-white transition">
              दर्शन वेळ
            </a>
            <a href="#utsavs" className="hover:text-white transition">
              उत्सव
            </a>
            <button
              onClick={() => setAartiModalOpen(true)}
              className="hover:text-white transition underline cursor-pointer"
            >
              आरती संग्रह
            </button>
          </div>

          <p className="text-[11px] text-amber-200/50">
            स्थानिक ग्रामदैवत व ऐतिहासिक पाषाण वास्तुकला संवर्धन प्रकल्प
          </p>
        </div>
      </footer>

      {/* Interactive Aarti Lyrics Reader Modal */}
      <AartiModal
        isOpen={aartiModalOpen}
        onClose={() => setAartiModalOpen(false)}
      />
    </div>
  );
}
