"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Megaphone,
  PlusCircle,
  Trash2,
  Calendar,
  Clock,
} from "lucide-react";

export interface UtsavItem {
  id: number;
  title: string;
  date: string;
  time: string;
  desc: string;
  tag: string;
}

interface AdminViewProps {
  ticker: string;
  onUpdateTicker: (val: string) => void;
  utsavs: UtsavItem[];
  onAddUtsav: (u: UtsavItem) => void;
  onDeleteUtsav?: (id: number) => void;
  onBackToWebsite: () => void;
}

export default function AdminView({
  ticker,
  onUpdateTicker,
  utsavs,
  onAddUtsav,
  onDeleteUtsav,
  onBackToWebsite,
}: AdminViewProps) {
  const [tickerInput, setTickerInput] = useState(ticker);
  const [tickerSuccess, setTickerSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [desc, setDesc] = useState("");
  const [utsavSuccess, setUtsavSuccess] = useState(false);

  const handleTickerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tickerInput.trim()) return;
    onUpdateTicker(tickerInput.trim());
    setTickerSuccess(true);
    setTimeout(() => setTickerSuccess(false), 3000);
  };

  const handleUtsavSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const item: UtsavItem = {
      id: Date.now(),
      title: title.trim(),
      date: date.trim() || "नोव्हेंबर २०२६",
      time: time.trim() || "सायं. ७:०० वाजता",
      desc: desc.trim() || "सर्व ग्रामस्थ आणि भाविकांना सादर निमंत्रण.",
      tag: "आगामी उत्सव",
    };
    onAddUtsav(item);
    setTitle("");
    setDate("");
    setTime("");
    setDesc("");
    setUtsavSuccess(true);
    setTimeout(() => setUtsavSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-in fade-in duration-200">
      {/* CMS Header Bar */}
      <div className="bg-maroon-900 text-white rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-lg border border-amber-500/30">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">
            Mandir Information CMS (`admin.html`)
          </span>
          <h2 className="font-serif text-2xl font-bold mt-1">
            मंदिर सूचना फलक व उत्सव नियंत्रण कक्ष
          </h2>
        </div>
        <button
          onClick={onBackToWebsite}
          className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 border border-white/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← मुख्य वेबसाईटवर परत जा</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form 1: Notice Ticker */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-amber-900/15 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-saffron-600" />
            <h3 className="font-serif text-lg font-bold text-maroon-900">
              १. मुख्य सूचना फलक बदला (Notice Ticker)
            </h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            गावातील उत्सव, हरिपाठ, महाप्रसाद किंवा आवश्यक सूचना येथे लिहा:
          </p>

          <form onSubmit={handleTickerSubmit} className="space-y-3">
            <input
              type="text"
              value={tickerInput}
              onChange={(e) => setTickerInput(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-saffron-600 focus:border-transparent transition"
              placeholder="सूचना लिहा..."
            />
            <button
              type="submit"
              className="w-full bg-saffron-600 hover:bg-saffron-700 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow-xs"
            >
              सूचना वेबसाईटवर प्रकाशित करा
            </button>
          </form>

          {tickerSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>✓ सूचना फलक मुख्य वेबसाईटवर यशस्वीरीत्या अपडेट झाला!</span>
            </div>
          )}
        </div>

        {/* Form 2: Add New Festival */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-amber-900/15 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-saffron-600" />
            <h3 className="font-serif text-lg font-bold text-maroon-900">
              २. आगामी सण / उत्सव जोडा (Add Utsav)
            </h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            आगामी यात्रा, दीपोत्सव अथवा विशेष पूजा दिनदर्शिकेत नोंदवा:
          </p>

          <form onSubmit={handleUtsavSubmit} className="space-y-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="उत्सवाचे नाव (उदा. महाशिवरात्री भजन व महाप्रसाद सोहळा)"
              className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-saffron-600"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="दिनांक: १५ नोव्हेंबर २०२६"
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-saffron-600"
              />
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="वेळ: सायं. ७:०० वाजता"
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-saffron-600"
              />
            </div>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="वर्णन: सायंकाळी दीपप्रज्वलन व भजन..."
              className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-saffron-600"
            />
            <button
              type="submit"
              className="w-full bg-maroon-900 hover:bg-maroon-800 text-amber-200 font-semibold py-2.5 rounded-xl transition text-xs shadow-xs"
            >
              + उत्सव दिनदर्शिकेत जोडा
            </button>
          </form>

          {utsavSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>✓ नवीन उत्सव वेबसाईटवर जोडला गेला!</span>
            </div>
          )}
        </div>
      </div>

      {/* Currently Listed Utsavs in Admin */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-amber-900/15 shadow-sm space-y-4">
        <h3 className="font-serif text-lg font-bold text-maroon-900 border-b border-amber-900/10 pb-3">
          सध्या सक्रिय असलेले उत्सव ({utsavs.length})
        </h3>
        <div className="space-y-3">
          {utsavs.map((u) => (
            <div
              key={u.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-parchment border border-amber-900/10 text-xs gap-3"
            >
              <div className="space-y-1">
                <span className="font-bold text-maroon-900 text-sm block">
                  {u.title}
                </span>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-saffron-600" />
                    {u.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-saffron-600" />
                    {u.time}
                  </span>
                </div>
              </div>

              {onDeleteUtsav && (
                <button
                  onClick={() => onDeleteUtsav(u.id)}
                  className="text-gray-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition"
                  title="काढून टाका"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
