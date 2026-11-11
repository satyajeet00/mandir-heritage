"use client";

import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ShieldAlert,
  ExternalLink,
  Phone,
} from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";

interface UtsavsProps {
  currentLang?: Language;
}

export default function Utsavs({ currentLang = "mr" }: UtsavsProps) {
  const { utsavs, visitorGuide, temple } = mandirContent;

  return (
    <section id="utsavs" className="scroll-mt-24 py-16 bg-amber-50/70 border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upcoming Festivals (Utsavs List) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-700 bg-saffron-100 px-3.5 py-1 rounded-full border border-saffron-500/20">
              {utsavs.badge[currentLang]}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900 mt-2.5">
              {utsavs.heading[currentLang]}
            </h2>
          </div>

          <div className="space-y-4 pt-1">
            {utsavs.list.map((festival) => (
              <div
                key={festival.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-900/15 shadow-sm space-y-2 hover:border-amber-400 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-saffron-700">
                    {festival.tag[currentLang]}
                  </span>
                  <div className="flex items-center gap-3 text-sm font-semibold text-maroon-900">
                    <span className="flex items-center gap-1 text-gray-700">
                      <Calendar className="w-3.5 h-3.5 text-saffron-600" />
                      <span>{festival.date[currentLang]}</span>
                    </span>
                    <span className="flex items-center gap-1 text-gray-700">
                      <Clock className="w-3.5 h-3.5 text-saffron-600" />
                      <span>{festival.time[currentLang]}</span>
                    </span>
                  </div>
                </div>

                <h4 className="font-serif font-bold text-maroon-900 text-lg sm:text-xl">
                  {festival.title[currentLang]}
                </h4>
                <p className="text-base text-gray-600 leading-relaxed">
                  {festival.desc[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visitor Etiquette & Location */}
        <div
          id="visit"
          className="scroll-mt-24 lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-amber-900/15 shadow-sm space-y-5"
        >
          <h3 className="font-serif text-xl font-bold text-maroon-900 flex items-center gap-2 border-b border-amber-900/10 pb-3">
            <MapPin className="w-5 h-5 text-saffron-600" />
            <span>{visitorGuide.title[currentLang]}</span>
          </h3>

          <div className="text-base text-gray-700 leading-relaxed space-y-1">
            <strong className="text-maroon-950 font-serif text-base block mb-0.5">
              {temple.name[currentLang]}
            </strong>
            <p>{temple.address[currentLang]}</p>
          </div>

          {/* Plan your visit: how to reach, parking, best time, contact */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-maroon-900 text-base">
              {visitorGuide.planTitle[currentLang]}
            </h3>
            <dl className="space-y-2.5 text-base text-gray-700 leading-relaxed">
              {visitorGuide.plan[currentLang].map((item) => (
                <div key={item.label}>
                  <dt className="font-semibold text-maroon-900">{item.label}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
            <a
              href={`tel:${temple.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-saffron-700 hover:text-saffron-800"
            >
              <Phone className="w-4 h-4" />
              <span>
                {visitorGuide.callLabel[currentLang]}: {temple.phone}
              </span>
            </a>
          </div>

          {/* Heritage Conservation Rules */}
          <div className="bg-parchment rounded-xl p-4 sm:p-5 border border-amber-900/15 text-sm space-y-2.5">
            <div className="font-bold text-maroon-900 text-sm flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-saffron-600" />
              <span>{visitorGuide.rulesTitle[currentLang]}</span>
            </div>
            <ul className="space-y-1.5 text-gray-700">
              {visitorGuide.rules[currentLang].map((rule, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-saffron-700 font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={temple.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-xl bg-saffron-700 hover:bg-saffron-800 text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>{visitorGuide.mapsBtn[currentLang]}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
