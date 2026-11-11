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
import Image from "next/image";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";
import Badge from "./Badge";

interface DengiSevaProps {
  currentLang?: Language;
}

export default function DengiSeva({ currentLang = "mr" }: DengiSevaProps) {
  const { dengi } = mandirContent;
  // TODO: set dengi.detailsVerified=true in mandirContent.json once real bank/UPI/WhatsApp data is in
  const verified = dengi.detailsVerified;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Fallback for non-secure contexts / older browsers where the Clipboard API is unavailable
  const legacyCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textArea);
    if (!ok) throw new Error("copy failed");
  };

  const handleCopy = async (text: string, key: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text); // wait, so "Copied" is only shown on success
      } else {
        legacyCopy(text);
      }
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 3000);
    } catch {
      setCopiedKey(null);
    }
  };

  // wa.me expects digits only (country code included, no "+")
  const whatsappDigits = dengi.receiptNote.whatsappNumber.replace(/\D/g, "");

  const whatsappText = encodeURIComponent(
    mandirContent.ui.shreeRamaSamarthaI[currentLang]
  );

  return (
    <section id="dengi" className="scroll-mt-24 py-16 bg-amber-50/60 border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2">
            <Badge tone="light">
              {dengi.badge[currentLang]}
            </Badge>
            <span className="text-amber-600 text-sm">•</span>
            <span className="text-sm font-semibold text-maroon-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{mandirContent.ui.registeredTrustAccount[currentLang]}</span>
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900">
            {dengi.heading[currentLang]}
          </h2>

          <p className="text-base sm:text-base text-gray-700 leading-relaxed">
            {dengi.subheading[currentLang]}
          </p>
        </div>

        {/* 2-Column Layout: Seva Offerings (Left) & QR/Bank Ledger (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Seva Offerings & WhatsApp Receipt Box */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="font-serif text-xl font-bold text-maroon-950 flex items-center gap-2 border-b border-amber-900/10 pb-3">
              <Sparkles className="w-5 h-5 text-saffron-600" />
              <span>{mandirContent.ui.sacredSevaCategories[currentLang]}</span>
            </h3>

            <div className="space-y-4">
              {dengi.sevaTypes.map((seva) => (
                <div
                  key={seva.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-900/15 shadow-sm space-y-2 hover:border-amber-400 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge tone="light">
                      {seva.badge[currentLang]}
                    </Badge>
                    <a
                      href="#dengi-box"
                      className="text-sm text-saffron-700 hover:text-saffron-800 font-semibold flex items-center gap-1 min-h-11 cursor-pointer"
                    >
                      <span>{mandirContent.ui.offerSeva[currentLang]}</span>
                      <span>→</span>
                    </a>
                  </div>

                  <h4 className="font-serif font-bold text-maroon-900 text-lg">
                    {seva.title[currentLang]}
                  </h4>

                  <p className="text-base text-gray-600 leading-relaxed">
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

              <p className="text-base text-emerald-950/85 leading-relaxed">
                {dengi.receiptNote.text[currentLang]}
              </p>

              <div className="pt-1">
                <a
                  href={`https://wa.me/${whatsappDigits}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-11 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition shadow-xs cursor-pointer"
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
                {mandirContent.ui.officialTrustLedger[currentLang]}
              </span>
              <h3 className="font-serif text-xl font-bold text-maroon-900">
                {mandirContent.ui.donationDetailsComingSoon[currentLang]}
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                {mandirContent.ui.officialUpiAndBank[currentLang]}
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
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 block">
                {mandirContent.ui.officialTrustLedger[currentLang]}
              </span>
              <h3 className="font-serif text-2xl font-bold text-maroon-900">
                {dengi.qrCode.title[currentLang]}
              </h3>
              <p className="text-sm text-gray-600">
                {dengi.qrCode.subtitle[currentLang]}
              </p>
            </div>

            {/* Brass-Bordered UPI QR Code Frame */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300 flex flex-col items-center text-center space-y-3.5">
              <div className="w-48 h-48 rounded-xl bg-white p-3 border-2 border-dashed border-amber-400 flex items-center justify-center shadow-inner relative">
                <div className="relative w-full h-full">
                  <Image
                    src={dengi.qrCode.qrImage}
                    alt="UPI QR Code"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-maroon-950 border-2 border-amber-300 flex items-center justify-center text-amber-300 font-serif font-bold text-sm shadow-md">
                    ॐ
                  </div>
                </div>
              </div>

              {/* Supported UPI Apps Row */}
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-maroon-900/80">
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
                  className={`w-full py-2.5 px-3 rounded-xl border text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
                    copiedKey === "upiId"
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-white text-maroon-900 border-amber-400/50 hover:bg-amber-100/50"
                  }`}
                >
                  {copiedKey === "upiId" ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>{mandirContent.ui.upiIdCopied[currentLang]}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-saffron-600" />
                      <span>{mandirContent.ui.copyUpiId[currentLang]}</span>
                      <span className="font-mono text-gray-600">({dengi.qrCode.upiId})</span>
                    </>
                  )}
                </button>

                {/* Mobile-Only One-Tap UPI Intent Link */}
                <a
                  href={`upi://pay?pa=${dengi.qrCode.upiId}&pn=${encodeURIComponent(
                    dengi.qrCode.qrPayeeName
                  )}&cu=INR`}
                  className="sm:hidden w-full py-2.5 px-3 rounded-xl bg-saffron-700 hover:bg-saffron-800 text-white text-sm font-bold text-center flex items-center justify-center gap-1.5 shadow-xs transition"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>{mandirContent.ui.payViaMobileUpi[currentLang]}</span>
                </a>
              </div>
            </div>

            {/* Official Bank Account Details Ledger with Copy Buttons */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-1.5 text-maroon-950 font-bold text-sm border-b border-amber-900/10 pb-2">
                <Building2 className="w-4 h-4 text-saffron-600" />
                <span>{mandirContent.ui.bankAccountLedger[currentLang]}</span>
              </div>

              {/* Trust Legal Name */}
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-900/10 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-xs uppercase font-bold text-gray-600 block">
                    {mandirContent.ui.accountLegalName[currentLang]}
                  </span>
                  <span className="font-semibold text-maroon-900 truncate block text-sm">
                    {dengi.bankDetails.trustName[currentLang]}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(dengi.bankDetails.trustName[currentLang], "trustName")}
                  className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-lg hover:bg-amber-100 text-maroon-800 transition shrink-0 cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "trustName" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-saffron-600" />}
                </button>
              </div>

              {/* Bank Name & Branch */}
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-900/10 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-xs uppercase font-bold text-gray-600 block">
                    {mandirContent.ui.bankBranch[currentLang]}
                  </span>
                  <span className="font-semibold text-maroon-900 truncate block text-sm">
                    {dengi.bankDetails.bankName} • {dengi.bankDetails.branch}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(`${dengi.bankDetails.bankName}, ${dengi.bankDetails.branch}`, "bankName")}
                  className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-lg hover:bg-amber-100 text-maroon-800 transition shrink-0 cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "bankName" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-saffron-600" />}
                </button>
              </div>

              {/* Account Number */}
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-900/10 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-xs uppercase font-bold text-gray-600 block">
                    {mandirContent.ui.accountNumber[currentLang]}
                  </span>
                  <span className="font-mono font-bold text-maroon-900 text-xs tracking-wider">
                    {dengi.bankDetails.accountNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(dengi.bankDetails.accountNumber, "accNum")}
                  className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-lg hover:bg-amber-100 text-maroon-800 transition shrink-0 cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "accNum" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-saffron-600" />}
                </button>
              </div>

              {/* IFSC Code */}
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-900/10 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-xs uppercase font-bold text-gray-600 block">
                    {mandirContent.ui.ifscCode[currentLang]}
                  </span>
                  <span className="font-mono font-bold text-maroon-900 text-xs tracking-wider">
                    {dengi.bankDetails.ifscCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(dengi.bankDetails.ifscCode, "ifsc")}
                  className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-lg hover:bg-amber-100 text-maroon-800 transition shrink-0 cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "ifsc" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-saffron-600" />}
                </button>
              </div>

              {/* PTR Number */}
              <div className="p-2 text-sm text-gray-600 italic text-center">
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