"use client";

import React from "react";
import { Calendar, Clock, MapPin, ShieldAlert, ExternalLink, Settings } from "lucide-react";
import mandirData from "@/data/mandir-data.json";
import type { UtsavItem } from "@/components/AdminView";

interface UtsavNoticeBoardProps {
  utsavs: UtsavItem[];
  onSwitchToAdmin: () => void;
}

export default function UtsavNoticeBoard({
  utsavs,
  onSwitchToAdmin,
}: UtsavNoticeBoardProps) {
  return (
    <section id="utsav" className="py-14 bg-amber-50/70 border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-8 items-start">
        {/* Upcoming Utsav List */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-700 bg-saffron-100 px-3 py-1 rounded-full">
              ग्रामपरंपरा व उत्सव
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900 mt-2">
              मंदिरातील प्रमुख वार्षिक उत्सव
            </h3>
          </div>

          <div className="space-y-3.5 pt-1">
            {utsavs.map((u) => (
              <div
                key={u.id}
                className="bg-white rounded-xl p-5 border border-amber-900/15 shadow-xs space-y-1.5 hover:border-amber-400 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-100 text-saffron-700">
                    {u.tag}
                  </span>
                  <span className="text-xs font-semibold text-maroon-900 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-saffron-600" />
                      {u.date}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-saffron-600" />
                      {u.time}
                    </span>
                  </span>
                </div>
                <h4 className="font-serif font-bold text-maroon-900 text-lg">
                  {u.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {u.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor Etiquette & Map Link */}
        <div
          id="visit"
          className="lg:col-span-5 bg-white rounded-2xl p-6 border border-amber-900/15 shadow-sm space-y-5"
        >
          <h3 className="font-serif text-xl font-bold text-maroon-900 flex items-center gap-2 border-b border-amber-900/10 pb-3">
            <MapPin className="w-5 h-5 text-saffron-600" />
            <span>मंदिर पत्ता व पर्यटक/भाविकांसाठी माहिती</span>
          </h3>

          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            <strong className="text-maroon-950 font-serif text-base block mb-0.5">
              {mandirData.temple.name}
            </strong>
            <p>{mandirData.temple.address}</p>
          </div>

          <div className="bg-parchment rounded-xl p-4 border border-amber-900/15 text-xs space-y-2">
            <div className="font-bold text-maroon-900 text-sm flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-saffron-600" />
              <span>प्राचीन वारसा जतन करण्यासाठी नम्र विनंती:</span>
            </div>
            {mandirData.visitorRules.map((rule, idx) => (
              <p key={idx} className="text-gray-700">
                • {rule}
              </p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <a
              href={mandirData.temple.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 px-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <MapPin className="w-4 h-4" />
              <span>Google Maps लोकेशन पहा</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
            <button
              onClick={onSwitchToAdmin}
              className="flex-1 text-center py-2.5 px-3 rounded-xl border border-maroon-900/20 hover:bg-gray-50 text-maroon-900 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>✏️ उत्सव / सूचना बदला</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
