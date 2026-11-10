"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Video, Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import type { Language } from "./Header";

type CategoryFilter = "all" | "drone" | "architecture" | "deepmala" | "sanctum";

interface DrishyaGalleryProps {
  currentLang?: Language;
}

export default function DrishyaGallery({
  currentLang = "mr",
}: DrishyaGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const galleryItems = mandirContent.gallery;

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  const activeItem =
    activeItemIndex !== null ? filteredItems[activeItemIndex] || null : null;

  const handleCloseLightbox = useCallback(() => {
    setActiveItemIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) =>
      prev !== null
        ? prev === 0
          ? filteredItems.length - 1
          : prev - 1
        : null
    );
  }, [activeItemIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) =>
      prev !== null
        ? prev === filteredItems.length - 1
          ? 0
          : prev + 1
        : null
    );
  }, [activeItemIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    if (activeItemIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItemIndex, handleCloseLightbox, handlePrev, handleNext]);

  const categories: { key: CategoryFilter; label: { mr: string; en: string } }[] = [
    {
      key: "all",
      label: { mr: "सर्व दृश्ये (All)", en: "All Views" },
    },
    {
      key: "drone",
      label: { mr: "४K ड्रोन दृश्य (Aerial Drone)", en: "4K Aerial Drone" },
    },
    {
      key: "architecture",
      label: { mr: "पाषाण शिल्प (Basalt Carvings)", en: "Basalt Carvings" },
    },
    {
      key: "deepmala",
      label: { mr: "दीपमाळ (Stone Lamp Tower)", en: "Stone Deepmala" },
    },
    {
      key: "sanctum",
      label: { mr: "शांत गर्भगृह (Inner Sanctum)", en: "Inner Sanctum" },
    },
  ];

  return (
    <section id="gallery" className="py-16 bg-parchment/60 border-t border-amber-900/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-700 bg-saffron-100 px-3.5 py-1 rounded-full border border-saffron-500/20">
              {currentLang === "mr" ? "दृश्य दर्शन व पाषाण वैभव" : "Sacred Visual Archive"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900 mt-2">
              {currentLang === "mr"
                ? "मंदिराचे दृश्य दर्शन व ४K ड्रोन सफर"
                : "Drishya Darshan: Stone & Aerial Journey"}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 max-w-2xl leading-relaxed">
              {currentLang === "mr"
                ? "शांत गर्भगृह, अखंड पाषाणातील कोरीव खांब आणि प्रांगणातील दीपमाळेची विहंगम दृश्ये."
                : "Contemplative visual documentation of monolithic spires, serene oil lamps, and Yadava-era masonry."}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Gallery Filters">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.key);
                    setActiveItemIndex(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? "bg-maroon-900 text-amber-300 shadow-xs"
                      : "bg-white text-maroon-900 border border-amber-900/15 hover:border-amber-400"
                  }`}
                >
                  {cat.label[currentLang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredItems.map((item, idx) => {
            const isFeatured = idx === 0 || idx === 3;
            const colSpan = isFeatured ? "md:col-span-7" : "md:col-span-5";

            return (
              <figure
                key={item.id}
                onClick={() => setActiveItemIndex(idx)}
                className={`${colSpan} rounded-2xl bg-white p-3 border border-amber-900/15 shadow-sm hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group`}
              >
                <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-maroon-950 relative">
                  <img
                    src={item.src}
                    alt={item.alt[currentLang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-maroon-950/85 text-amber-300 text-xs font-semibold backdrop-blur-xs">
                      {item.tag[currentLang]}
                    </span>
                    {item.videoSrc && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500 text-maroon-950 text-xs font-bold flex items-center gap-1 shadow-sm">
                        <Video className="w-3 h-3" />
                        <span>४K Drone</span>
                      </span>
                    )}
                  </div>
                </div>

                <figcaption className="pt-3 px-1 flex items-center justify-between text-xs text-maroon-900">
                  <span className="font-serif font-bold text-sm truncate pr-2">
                    {item.title[currentLang]}
                  </span>
                  <span className="text-gray-500 shrink-0">
                    {currentLang === "mr" ? "मोठे पहा" : "Preview"}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Accessible Client-Side Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightboxTitle"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleCloseLightbox}
        >
          <div
            className="max-w-4xl w-full rounded-2xl bg-maroon-950 text-amber-50 p-4 sm:p-6 border border-amber-500/40 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 border-b border-amber-500/20 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  {activeItem.tag[currentLang]} • {activeItemIndex! + 1} / {filteredItems.length}
                </span>
                <h3 id="lightboxTitle" className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                  {activeItem.title[currentLang]}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseLightbox}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 transition cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Container: HTML5 Video for Drone Tour or High-Res Image */}
            <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-black relative flex items-center justify-center">
              {activeItem.videoSrc ? (
                <video
                  src={activeItem.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  Your browser does not support HTML5 video.
                </video>
              ) : (
                <img
                  src={activeItem.src}
                  alt={activeItem.alt[currentLang]}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between text-xs pt-1 text-amber-200/80">
              <span className="hidden sm:inline">
                {currentLang === "mr" ? "कीबोर्ड: बाण (← / →) व Esc वापरा" : "Use Arrow keys (← / →) and Esc"}
              </span>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 font-semibold transition flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{currentLang === "mr" ? "मागील" : "Prev"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 font-semibold transition flex items-center gap-1 cursor-pointer"
                >
                  <span>{currentLang === "mr" ? "पुढील" : "Next"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
