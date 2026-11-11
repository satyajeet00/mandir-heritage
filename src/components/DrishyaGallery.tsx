"use client";

import React, { useState, useEffect } from "react";
import { Video, X, ChevronLeft, ChevronRight } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import { useModal } from "@/utils/useModal";
import type { Language } from "./Header";

type CategoryFilter = "all" | "drone" | "architecture" | "deepmala" | "sanctum";

interface DrishyaGalleryProps {
  currentLang?: Language;
}

function getYoutubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  return match && match[2].length === 11 ? match[2] : null;
}

function getYoutubeEmbedUrl(url?: string): string | null {
  const id = getYoutubeId(url);
  if (id) {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  }
  return url && url.includes("youtube.com/embed") ? url : null;
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

  const lightboxRef = useModal<HTMLDivElement>(activeItemIndex !== null, () =>
    setActiveItemIndex(null)
  );

  const itemCount = filteredItems.length;
  const isLightboxOpen = activeItemIndex !== null;

  const handleCloseLightbox = () => setActiveItemIndex(null);
  const handlePrev = () =>
    setActiveItemIndex((prev) =>
      prev === null ? null : prev === 0 ? itemCount - 1 : prev - 1
    );
  const handleNext = () =>
    setActiveItemIndex((prev) =>
      prev === null ? null : prev === itemCount - 1 ? 0 : prev + 1
    );

  // Keyboard navigation (Esc closes, arrows step through items)
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveItemIndex((prev) =>
          prev === null ? null : prev === 0 ? itemCount - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setActiveItemIndex((prev) =>
          prev === null ? null : prev === itemCount - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, itemCount]);

  const categories: { key: CategoryFilter; label: { mr: string; en: string } }[] = [
    {
      key: "all",
      label: { mr: "सर्व दृश्ये", en: "All Views" },
    },
    {
      key: "drone",
      label: { mr: "४K ड्रोन दर्शन", en: "4K Aerial Drone" },
    },
    {
      key: "architecture",
      label: { mr: "श्रीराम पादुका", en: "Rama Paduka" },
    },
    {
      key: "deepmala",
      label: { mr: "ऐतिहासिक महाघंटा", en: "Sacred Bell" },
    },
    {
      key: "sanctum",
      label: { mr: "तपोभूमी समाधी", en: "Tapobhumi Samadhi" },
    },
  ];

  return (
    <section id="gallery" className="py-16 bg-parchment/60 border-t border-amber-900/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-700 bg-saffron-100 px-3.5 py-1 rounded-full border border-saffron-500/20">
              {currentLang === "mr" ? "दृश्य दर्शन व तपोभूमी" : "Sacred Visual Archive"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900 mt-2">
              {currentLang === "mr"
                ? "राममाळ आश्रम व प्रवरा तीर ४K दर्शन"
                : "Ram-mal Ashram: Sacred Aerial & Sanctum Tour"}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 max-w-2xl leading-relaxed">
              {currentLang === "mr"
                ? "सत्ययुगातील श्रीराम पादुका, अमृतवाहिनी प्रवरा नदी, ऐतिहासिक महाघंटा आणि सद्गुरु यशवंत बाबांची जागृत तपोभूमी."
                : "Contemplative documentation of Satya Yuga Rama Paduka, holy Pravara river banks, the Great Bell, and Baba's Tapobhumi."}
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
            const youtubeId = item.videoSrc ? getYoutubeId(item.videoSrc) : null;

            return (
              <figure
                key={item.id}
                className={`${colSpan} rounded-2xl bg-white p-3 border border-amber-900/15 shadow-sm hover:shadow-md hover:border-amber-400 transition-all group`}
              >
                {youtubeId ? (
                  <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-black relative shadow-inner">
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=1&rel=0&modestbranding=1&playsinline=1`}
                      title={item.title[currentLang]}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-maroon-950/90 text-amber-300 text-xs font-semibold backdrop-blur-xs border border-amber-400/30">
                        {item.tag[currentLang]}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-amber-500 text-maroon-950 text-xs font-bold flex items-center gap-1 shadow-sm">
                        <Video className="w-3 h-3" />
                        <span>४K Drone Live</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setActiveItemIndex(idx)}
                    className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-maroon-950 relative cursor-pointer"
                  >
                    <img
                      src={item.src}
                      alt={item.alt[currentLang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-maroon-950/85 text-amber-300 text-xs font-semibold backdrop-blur-xs">
                        {item.tag[currentLang]}
                      </span>
                    </div>
                  </div>
                )}

                <figcaption className="pt-3 px-1 flex items-center justify-between text-xs text-maroon-900">
                  <span className="font-serif font-bold text-sm truncate pr-2">
                    {item.title[currentLang]}
                  </span>
                  {youtubeId ? (
                    <span className="text-saffron-700 font-bold shrink-0 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{currentLang === "mr" ? "४K चालू आहे" : "4K Playing"}</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveItemIndex(idx)}
                      className="text-gray-500 hover:text-maroon-900 shrink-0 font-medium cursor-pointer"
                    >
                      {currentLang === "mr" ? "मोठे पहा" : "Preview"}
                    </button>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Accessible Client-Side Lightbox Modal */}
      {activeItem && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightboxTitle"
          tabIndex={-1}
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

            {/* Media Container: HTML5 Video for Drone Tour, YouTube Embed, or High-Res Image */}
            <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-black relative flex items-center justify-center">
              {activeItem.videoSrc ? (
                getYoutubeEmbedUrl(activeItem.videoSrc) ? (
                  <iframe
                    src={getYoutubeEmbedUrl(activeItem.videoSrc)!}
                    title={activeItem.title[currentLang]}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={activeItem.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support HTML5 video.
                  </video>
                )
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
