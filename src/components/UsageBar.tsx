"use client";

import React, { useState } from "react";
import { Users, Activity, TrendingUp, Info } from "lucide-react";

interface UsageBarProps {
  initialValue?: number; // 1 to 100
  title?: string;
  subtitle?: string;
  interactive?: boolean;
}

export default function UsageBar({
  initialValue = 42,
  title = "सध्याची दर्शन गर्दी व परिसर उपस्थिती (Live Temple Crowd & Capacity)",
  subtitle = "मंदिरातील गर्दीची सद्यस्थिती — भाविकांच्या सोयीसाठी थेट अद्ययावत माहिती",
  interactive = true,
}: UsageBarProps) {
  // Clamp value between 1 and 100
  const [percentage, setPercentage] = useState<number>(() =>
    Math.min(100, Math.max(1, initialValue))
  );

  // Status message and color depending on percentage
  const getStatus = (val: number) => {
    if (val <= 30) {
      return {
        label: "सुखकर व शांत दर्शन (अल्प गर्दी)",
        wait: "थेट दर्शन • ०-५ मिनिटे प्रतीक्षा",
        colorClass: "from-emerald-500 to-teal-600",
        bgLight: "bg-emerald-50 text-emerald-800 border-emerald-200",
        badge: "अल्प उपस्थिती (1-30%)",
      };
    } else if (val <= 70) {
      return {
        label: "मध्यम गर्दी (सामान्य उपस्थिती)",
        wait: "शांत दर्शन • ५-१५ मिनिटे प्रतीक्षा",
        colorClass: "from-amber-500 to-saffron-600",
        bgLight: "bg-amber-50 text-amber-900 border-amber-200",
        badge: "मध्यम उपस्थिती (31-70%)",
      };
    } else {
      return {
        label: "भरपूर गर्दी (विशेष पर्वकाळ / उत्सव)",
        wait: "रांगेत दर्शन • २०-४० मिनिटे प्रतीक्षा",
        colorClass: "from-rose-500 to-maroon-900",
        bgLight: "bg-rose-50 text-rose-900 border-rose-200",
        badge: "पूर्ण गर्दी (71-100%)",
      };
    }
  };

  const status = getStatus(percentage);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-900/15 shadow-sm space-y-5">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-saffron-50 border border-saffron-200 flex items-center justify-center text-saffron-700">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon-900 leading-tight">
              {title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
          </div>
        </div>

        {/* Live Percentage Counter Badge */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-amber-300/40 bg-amber-50 text-maroon-900 shadow-2xs">
            <Activity className="w-3.5 h-3.5 text-saffron-600 live-pulse" />
            <span className="font-serif text-sm font-black text-saffron-700">
              {percentage}%
            </span>
            <span className="text-[11px] font-medium text-gray-600">उपयोगिता / Usage</span>
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-saffron-600" />
            <span>{status.label}</span>
          </span>
          <span className="font-serif font-bold text-maroon-900">
            {percentage} / 100%
          </span>
        </div>

        {/* The Actual Usage Bar (1 to 100) */}
        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={1}
          aria-valuemax={100}
          className="relative w-full h-5 sm:h-6 bg-amber-100/70 rounded-full overflow-hidden p-0.5 shadow-inner border border-amber-200"
        >
          {/* Animated gradient progress fill */}
          <div
            className={`h-full rounded-full bg-gradient-to-r ${status.colorClass} transition-all duration-300 ease-out flex items-center justify-end pr-2 text-[10px] font-bold text-white shadow-xs`}
            style={{ width: `${percentage}%` }}
          >
            {percentage >= 15 && `${percentage}%`}
          </div>
        </div>

        {/* Min / Max Tick Labels */}
        <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium px-1">
          <span>१% (शांत परिसर)</span>
          <span>५०%</span>
          <span>१००% (पूर्ण क्षमता)</span>
        </div>
      </div>

      {/* Status Details Box */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl border text-xs ${status.bgLight}`}
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span className="font-semibold">{status.wait}</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-white/80 font-bold text-[11px] shadow-2xs">
          {status.badge}
        </span>
      </div>

      {/* Interactive Controls (Slider + Quick preset buttons) */}
      {interactive && (
        <div className="pt-2 border-t border-amber-900/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <label
              htmlFor="usage-slider"
              className="text-gray-600 font-medium cursor-pointer"
            >
              उपयोगिता बदला (Adjust Usage 1-100%):
            </label>
            <span className="font-mono font-bold text-saffron-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {percentage}%
            </span>
          </div>

          <input
            id="usage-slider"
            type="range"
            min={1}
            max={100}
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-saffron-600"
          />

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-[11px] text-gray-500">त्वरित पातळी:</span>
            {[
              { label: "किमान (15%)", val: 15 },
              { label: "मध्यम (45%)", val: 45 },
              { label: "आरती वेळ (75%)", val: 75 },
              { label: "उत्सव गर्दी (95%)", val: 95 },
            ].map((preset) => (
              <button
                key={preset.val}
                onClick={() => setPercentage(preset.val)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  percentage === preset.val
                    ? "bg-saffron-600 text-white shadow-2xs"
                    : "bg-parchment hover:bg-amber-100 text-maroon-900 border border-amber-900/15"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
