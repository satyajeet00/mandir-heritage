"use client";

import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";

export interface UtsavItem {
  id: number;
  title: string;
  date: string;
  time: string;
  desc: string;
  tag: string;
}

interface UtsavsProps {
  currentLang?: Language;
  utsavList?: UtsavItem[];
}

export default function Utsavs({
  currentLang = "mr",
  utsavList,
}: UtsavsProps) {
  // Reads directly from the JSON file or falls back to provided prop
  const festivals: UtsavItem[] = utsavList || mandirContent.utsavs;
  const t = mandirContent.translations[currentLang];

  return (
    <section id="utsavs" className="py-16 bg-amber-50/70 border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upcoming Festivals (Utsavs List) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-700 bg-saffron-100 px-3.5 py-1 rounded-full border border-saffron-500/20">
              ग्रामपरंपरा व उत्सव
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900 mt-2.5">
              {t.navUtsav ? `मंदिरातील प्रमुख ${t.navUtsav}` : "मंदिरातील प्रमुख वार्षिक उत्सव"}
            </h3>
          </div>

          <div className="space-y-4 pt-1">
            {festivals.map((festival) => (
              <div
                key={festival.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-900/15 shadow-sm space-y-2 hover:border-amber-400 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-saffron-700">
                    {festival.tag}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-semibold text-maroon-900">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-saffron-600" />
                      {festival.date}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-saffron-600" />
                      {festival.time}
                    </span>
                  </div>
                </div>

                <h4 className="font-serif font-bold text-maroon-900 text-lg sm:text-xl">
                  {festival.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {festival.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visitor Etiquette & Location */}
        <div
          id="visit"
          className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-amber-900/15 shadow-sm space-y-5"
        >
          <h3 className="font-serif text-xl font-bold text-maroon-900 flex items-center gap-2 border-b border-amber-900/10 pb-3">
            <MapPin className="w-5 h-5 text-saffron-600" />
            <span>मंदिर पत्ता व पर्यटक/भाविकांसाठी माहिती</span>
          </h3>

          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-1">
            <strong className="text-maroon-950 font-serif text-base block mb-0.5">
              {mandirContent.temple.name}
            </strong>
            <p>{mandirContent.temple.address}</p>
          </div>

          {/* Heritage Conservation Rules */}
          <div className="bg-parchment rounded-xl p-4 sm:p-5 border border-amber-900/15 text-xs space-y-2.5">
            <div className="font-bold text-maroon-900 text-sm flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-saffron-600" />
              <span>प्राचीन वारसा जतन करण्यासाठी नम्र विनंती:</span>
            </div>
            <ul className="space-y-1.5 text-gray-700">
              {mandirContent.visitorRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-saffron-700 font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={mandirContent.temple.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Google Maps वर मंदिराचे स्थान पहा</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
