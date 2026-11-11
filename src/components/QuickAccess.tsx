"use client";

import React from "react";
import { Clock, MapPin, HeartHandshake, BookOpen, LucideIcon } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";

interface QuickAccessProps {
  currentLang: Language;
  onOpenAarti: () => void;
}

/** One-tap shortcuts to the four things visitors look for first. Labels reuse the nav strings. */
export default function QuickAccess({ currentLang, onOpenAarti }: QuickAccessProps) {
  const i18n = mandirContent.i18n[currentLang];
  const donation = mandirContent.ui.donationSeva[currentLang];

  const tiles: { href?: string; label: string; Icon: LucideIcon; onClick?: () => void }[] = [
    { href: "#darshan", label: i18n.navDarshan, Icon: Clock },
    { href: "#visit", label: i18n.navVisit, Icon: MapPin },
    { href: "#dengi", label: donation, Icon: HeartHandshake },
    { label: i18n.btnAarti, Icon: BookOpen, onClick: onOpenAarti },
  ];

  const tileClass =
    "flex flex-col items-center justify-center gap-2 min-h-24 px-3 py-4 rounded-2xl bg-white border border-amber-900/15 shadow-sm hover:border-amber-400 hover:shadow-md transition text-center font-semibold text-maroon-900 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron-700";

  return (
    <nav
      aria-label={mandirContent.ui.quickLinks[currentLang]}
      className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10"
    >
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {tiles.map(({ href, label, Icon, onClick }) => (
          <li key={label}>
            {href ? (
              <a href={href} className={tileClass}>
                <Icon className="w-6 h-6 text-saffron-700" />
                <span>{label}</span>
              </a>
            ) : (
              <button type="button" onClick={onClick} className={`${tileClass} w-full`}>
                <Icon className="w-6 h-6 text-saffron-700" />
                <span>{label}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
