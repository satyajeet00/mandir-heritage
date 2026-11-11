"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Building2,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Smartphone,
} from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";

interface DengiSevaProps {
  currentLang?: Language;
}

export default function DengiSeva({ currentLang = "mr" }: DengiSevaProps) {
  const { dengi } = mandirContent;
  // TODO: set dengi.detailsVerified=true in mandirContent.json once real bank/UPI/WhatsApp data is in
  const verified = dengi.detailsVerified;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 3000);
    } catch {
      // Fallback
      setCopiedKey(null);
    }
  };

  // wa.me expects digits only (country code included, no "+")
  const whatsappDigits = dengi.receiptNote.whatsappNumber.replace(/\D/g, "");

  const whatsappText = encodeURIComponent(
    currentLang === "mr"
      ? "|| श्रीराम समर्थ || मी प्रतिअयोध्या श्री क्षेत्र राममाळ देवस्थानसाठी देणगी अर्पण केली आहे. देणगी पावतीसाठी पेमेंट स्क्रीनशॉट, नाव व गोत्र सोबत जोडले आहे."
      : "|| Shree Rama Samartha || I have offered a contribution to Pratiayodhya Shri Kshetra Ram-mal Devasthan. Please find the payment screenshot and details attached for official receipt."
  );

  return (
    <section id="dengi" className="py-16 bg-amber-50/60 border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-700 bg-saffron-100 px-3.5 py-1 rounded-full border border-saffron-500/20">
              {dengi.badge[currentLang]}
            </span>
            <span className="text-amber-600 text-xs">•</span>
            <span className="text-xs font-semibold text-maroon-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentLang === "mr" ? "अधिकृत विश्वस्त खाते" : "Registered Trust Account"}</span>
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900">
            {dengi.heading[currentLang]}
          </h2>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {dengi.subheading[currentLang]}
          </p>
        </div>

        {/* 2-Column Layout: Seva Offerings (Left) & QR/Bank Ledger (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Seva Offerings & WhatsApp Receipt Box */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="font-serif text-xl font-bold text-maroon-950 flex items-center gap-2 border-b border-amber-900/10 pb-3">
              <Sparkles className="w-5 h-5 text-saffron-600" />
              <span>{currentLang === "mr" ? "प्रमुख सेवा संकल्प" : "Sacred Seva Categories"}</span>
            </h3>

            <div className="space-y-4">
              {dengi.sevaTypes.map((seva) => (
                <div
                  key={seva.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-900/15 shadow-sm space-y-2 hover:border-amber-400 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-saffron-700">
                      {seva.badge[currentLang]}
                    </span>
                    <a
                      href="#dengi-box"
                      className="text-xs text-saffron-700 hover:text-saffron-800 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>{currentLang === "mr" ? "सेवा समर्पण" : "Offer Seva"}</span>
                      <span>→</span>
                    </a>
                  </div>

                  <h4 className="font-serif font-bold text-maroon-900 text-lg">
                    {seva.title[currentLang]}
                  </h4>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {seva.desc[currentLang]}
                  </p>
                </div>
              ))}
            </div>

            {verified && (
              <>
            {/* Official WhatsApp Receipt Box */}
            <div className="bg-emerald-50/90 rounded-2xl p-5 sm:p-6 border border-emerald-600/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-serif font-bold text-base">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <h4>{dengi.receiptNote.title[currentLang]}</h4>
              </div>

              <p className="text-xs sm:text-sm text-emerald-950/85 leading-relaxed">
                {dengi.receiptNote.text[currentLang]}
              </p>

              <div className="pt-1">
                <a
                  href={`https://wa.me/${whatsappDigits}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{dengi.receiptNote.whatsappBtn[currentLang]}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
              </>
            )}
          </div>

          {!verified && (
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border-2 border-amber-500/30 shadow-lg text-center space-y-3">
              <span className="text-sm font-bold text-saffron-700 block">
                {currentLang === "mr" ? "अधिकृत विश्वस्त दानपट्टी" : "Official Trust Ledger"}
              </span>
              <h3 className="font-serif text-xl font-bold text-maroon-900">
                {currentLang === "mr" ? "देणगी तपशील लवकरच उपलब्ध" : "Donation details coming soon"}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {currentLang === "mr"
                  ? "अधिकृत UPI व बँक खात्याचे तपशील लवकरच येथे प्रसिद्ध केले जातील. तोपर्यंत कृपया आश्रमात प्रत्यक्ष संपर्क साधावा."
                  : "Official UPI and bank account details will be published here shortly. Until then, please contact the ashram directly."}
              </p>
            </div>
          )}

          {verified && (
          <>
          {/* Right Column: High-Trust Danpatti Box (QR Code & Bank Ledger) */}
          <div
            id="dengi-box"
            className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border-2 border-amber-500/30 shadow-lg space-y-6 scroll-mt-24"
          >
            <div className="text-center space-y-1.5 border-b border-amber-900/10 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-saffron-700 block">
                {currentLang === "mr" ? "अधिकृत विश्वस्त दानपट्टी" : "Official Trust Ledger"}
              </span>
              <h3 className="font-serif text-2xl font-bold text-maroon-900">
                {dengi.qrCode.title[currentLang]}
              </h3>
              <p className="text-xs text-gray-500">
                {dengi.qrCode.subtitle[currentLang]}
              </p>
            </div>

            {/* Brass-Bordered UPI QR Code Frame */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300 flex flex-col items-center text-center space-y-3.5">
              <div className="w-48 h-48 rounded-xl bg-white p-3 border-2 border-dashed border-amber-400 flex items-center justify-center shadow-inner relative">
                <img
                  src={dengi.qrCode.qrImage}
                  alt="UPI QR Code"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-maroon-950 border-2 border-amber-300 flex items-center justify-center text-amber-300 font-serif font-bold text-xs shadow-md">
                    ॐ
                  </div>
                </div>
              </div>

              {/* Supported UPI Apps Row */}
              <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-maroon-900/80">
                <span className="px-2 py-0.5 rounded bg-white border border-amber-200">GPay</span>
                <span className="px-2 py-0.5 rounded bg-white border border-amber-200">PhonePe</span>
                <span className="px-2 py-0.5 rounded bg-white border border-amber-200">Paytm</span>
                <span className="px-2 py-0.5 rounded bg-white border border-amber-200">BHIM</span>
              </div>

              {/* Copy UPI ID Button */}
              <div className="w-full space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCopy(dengi.qrCode.upiId, "upiId")}
                  className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
                    copiedKey === "upiId"
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-white text-maroon-900 border-amber-400/50 hover:bg-amber-100/50"
                  }`}
                >
                  {copiedKey === "upiId" ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>{currentLang === "mr" ? "UPI आयडी कॉपी झाले!" : "UPI ID Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-saffron-600" />
                      <span>{currentLang === "mr" ? "UPI आयडी कॉपी करा" : "Copy UPI ID"}</span>
                      <span className="font-mono text-gray-500">({dengi.qrCode.upiId})</span>
                    </>
                  )}
                </button>

                {/* Mobile-Only One-Tap UPI Intent Link */}
                <a
                  href={`upi://pay?pa=${dengi.qrCode.upiId}&pn=${encodeURIComponent(
                    dengi.qrCode.payeeName
                  )}&cu=INR`}
                  className="sm:hidden w-full py-2.5 px-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs transition"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>{currentLang === "mr" ? "मोबाइल UPI ॲपद्वारे देणगी द्या" : "Pay via Mobile UPI App"}</span>
                </a>
              </div>
            </div>

            {/* Official Bank Account Details Ledger with Copy Buttons */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-1.5 text-maroon-950 font-bold text-sm border-b border-amber-900/10 pb-2">
                <Building2 className="w-4 h-4 text-saffron-600" />
                <span>{currentLang === "mr" ? "बँक खाते तपशील (NEFT / RTGS / IMPS)" : "Bank Account Ledger"}</span>
              </div>

              {/* Trust Legal Name */}
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-900/10 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-500 block">
                    {currentLang === "mr" ? "खात्याचे नाव (Account Name)" : "Account Legal Name"}
                  </span>
                  <span className="font-semibold text-maroon-900 truncate block text-xs">
                    {dengi.bankDetails.trustName[currentLang]}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(dengi.bankDetails.trustName[currentLang], "trustName")}
                  className="p-1.5 rounded-lg hover:bg-amber-100 text-maroon-800 transition shrink-0 cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "trustName" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-saffron-600" />}
                </button>
              </div>

              {/* Bank Name & Branch */}
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-900/10 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-500 block">
                    {currentLang === "mr" ? "बँक व शाखा (Bank & Branch)" : "Bank & Branch"}
                  </span>
                  <span className="font-semibold text-maroon-900 truncate block text-xs">
                    {dengi.bankDetails.bankName} • {dengi.bankDetails.branch}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(`${dengi.bankDetails.bankName}, ${dengi.bankDetails.branch}`, "bankName")}
                  className="p-1.5 rounded-lg hover:bg-amber-100 text-maroon-800 transition shrink-0 cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "bankName" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-saffron-600" />}
                </button>
              </div>

              {/* Account Number */}
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-900/10 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-500 block">
                    {currentLang === "mr" ? "खाते क्रमांक (Account Number)" : "Account Number"}
                  </span>
                  <span className="font-mono font-bold text-maroon-900 text-xs tracking-wider">
                    {dengi.bankDetails.accountNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(dengi.bankDetails.accountNumber, "accNum")}
                  className="p-1.5 rounded-lg hover:bg-amber-100 text-maroon-800 transition shrink-0 cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "accNum" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-saffron-600" />}
                </button>
              </div>

              {/* IFSC Code */}
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-900/10 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-500 block">
                    {currentLang === "mr" ? "IFSC कोड" : "IFSC Code"}
                  </span>
                  <span className="font-mono font-bold text-maroon-900 text-xs tracking-wider">
                    {dengi.bankDetails.ifscCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(dengi.bankDetails.ifscCode, "ifsc")}
                  className="p-1.5 rounded-lg hover:bg-amber-100 text-maroon-800 transition shrink-0 cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "ifsc" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-saffron-600" />}
                </button>
              </div>

              {/* PTR Number */}
              <div className="p-2 text-[11px] text-gray-500 italic text-center">
                {dengi.bankDetails.ptrNumber[currentLang]}
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </section>
  );
}