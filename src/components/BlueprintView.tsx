"use client";

import React from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface BlueprintViewProps {
  onBackToWebsite: () => void;
}

export default function BlueprintView({ onBackToWebsite }: BlueprintViewProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-900/15 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-saffron-700 bg-saffron-100 px-3.5 py-1 rounded-full border border-saffron-500/20">
            Heritage Master Plan
          </span>
          <button
            onClick={onBackToWebsite}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-amber-200 text-xs font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>१. मुख्य वेबसाईटवर परत जा</span>
          </button>
        </div>

        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900 mt-2">
            Simplified Plan for a Local Heritage & Information Mandir Website
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
            Since your local Mandir does <strong>not</strong> need commercial Abhishek/Puja slot booking or payment gateway complexity, your architecture becomes <strong className="text-emerald-700">100% free to host forever with zero maintenance</strong>!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Card 1: What We Removed */}
          <div className="border border-amber-900/15 rounded-2xl p-6 bg-parchment/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-saffron-700 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-saffron-600" />
              <span>1. What We Removed</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon-900">
              No Payment Gateway or Booking Clutter
            </h3>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-2.5 mt-3 list-disc pl-5 leading-relaxed">
              <li>
                <strong>No Online Booking Gates:</strong> Removed online Puja/Abhishek booking forms, Gotra Sankalp carts, and payment gateways.
              </li>
              <li>
                <strong>Zero Bureaucracy:</strong> No bank merchant accounts, complex KYC verifications, or refund management required.
              </li>
              <li>
                <strong>High Performance:</strong> 100% static output capability with instant loading on 2G/3G mobile networks in rural areas.
              </li>
            </ul>
          </div>

          {/* Card 2: What We Expanded */}
          <div className="border border-amber-900/15 rounded-2xl p-6 bg-parchment/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-saffron-700 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-saffron-600" />
              <span>2. What We Expanded</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon-900">
              Deep Heritage, Architecture & Aarti Reader
            </h3>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-2.5 mt-3 list-disc pl-5 leading-relaxed">
              <li>
                <strong>Sthala Purana & Timeline:</strong> Highlights oral lore, Yadava dynasty origin, 18th-century Maratha era restoration, and living village history.
              </li>
              <li>
                <strong>6 Architectural Highlights:</strong> Explains the interlocking black basalt masonry, Ganeshpatti lintels, Kirtimukh protective thresholds, and lotus dome ceilings.
              </li>
              <li>
                <strong>Built-in Aarti Reader & Web Audio Bell:</strong> Mobile-friendly lyrics for evening aartis with interactive temple bell synthesizer.
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs sm:text-sm text-maroon-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            <strong>Result:</strong> An ultra-fast, mobile-friendly digital heritage archive and daily information portal that any committee member can update in minutes!
          </span>
        </div>
      </div>
    </div>
  );
}
