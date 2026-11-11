"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Maximize2, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import mandirContent from "@/data/mandirContent.json";
import { useModal } from "@/utils/useModal";
import type { Language } from "./Header";
import Badge from "./Badge";

type CategoryFilter = "all" | "drone" | "paduka" | "bell" | "samadhi";

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

interface YTPlayerLike {
  destroy: () => void;
  mute: () => void;
  playVideo: () => void;
}
interface YTWindow {
  YT?: {
    Player: new (
      el: HTMLElement,
      opts: {
        videoId: string;
        playerVars: Record<string, string | number>;
        events: {
          onReady: (e: { target: YTPlayerLike }) => void;
          onStateChange: (e: { data: number; target: YTPlayerLike }) => void;
        };
      }
    ) => YTPlayerLike;
  };
  onYouTubeIframeAPIReady?: () => void;
}

/** Loads the YouTube IFrame API once and calls back when it is ready. */
function withYouTubeApi(cb: () => void) {
  const w = window as unknown as YTWindow;
  if (w.YT?.Player) return cb();
  const prev = w.onYouTubeIframeAPIReady;
  w.onYouTubeIframeAPIReady = () => {
    prev?.();
    cb();
  };
  if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }
}

/**
 * Click-to-play video tile. Shows only the poster and a play button; the YouTube IFrame API and
 * player are loaded on tap, so nothing is requested from YouTube (or paid for) before then.
 */
function VideoTile({
  videoId,
  fileSrc,
  poster,
  title,
  tag,
  playLabel,
  openLabel,
  onOpen,
}: {
  videoId: string;
  fileSrc?: string;
  poster: string;
  title: string;
  tag: string;
  playLabel: string;
  openLabel: string;
  onOpen: () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!playing || !host || fileSrc) return;
    let cancelled = false;
    let player: YTPlayerLike | undefined;
    const mountEl = document.createElement("div");
    host.appendChild(mountEl);

    withYouTubeApi(() => {
      const YT = (window as unknown as YTWindow).YT;
      if (cancelled || !YT) return;
      player = new YT.Player(mountEl, {
        videoId,
        playerVars: { autoplay: 1, controls: 1, rel: 0, modestbranding: 1, playsinline: 1 },
        // The tap counts as a user gesture, so playback with sound is allowed.
        events: {
          onReady: (e) => e.target.playVideo(),
          onStateChange: () => {},
        },
      });
    });

    return () => {
      cancelled = true;
      player?.destroy();
      host.replaceChildren();
    };
  }, [playing, videoId, fileSrc]);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-amber-900/15 shadow-sm">
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 780px, 100vw"
        className="object-cover object-[50%_20%]"
        aria-hidden
      />
      {playing && fileSrc && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={fileSrc}
          poster={poster}
          autoPlay
          playsInline
          controls
          aria-label={title}
        />
      )}
      <div
        ref={hostRef}
        title={title}
        className="absolute inset-0 [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
      />
      {!playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${title} — ${playLabel}`}
          className="absolute inset-0 flex items-center justify-center group/play cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-saffron-600"
        >
          <span className="w-16 h-16 rounded-full bg-amber-500 text-maroon-950 flex items-center justify-center shadow-lg group-hover/play:bg-amber-400 transition-colors">
            <Play className="w-7 h-7 ml-1" fill="currentColor" />
          </span>
        </button>
      )}
      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-maroon-950/85 text-amber-300 text-xs font-semibold pointer-events-none">
        {tag}
      </span>
      <button
        type="button"
        onClick={onOpen}
        aria-label={openLabel}
        className="absolute top-2 right-2 p-3 rounded-full bg-maroon-950/85 hover:bg-maroon-900 text-amber-300 cursor-pointer"
      >
        <Maximize2 className="w-4 h-4" />
      </button>
    </div>
  );
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
      key: "paduka",
      label: { mr: "श्रीराम पादुका", en: "Rama Paduka" },
    },
    {
      key: "samadhi",
      label: { mr: "तपोभूमी समाधी", en: "Tapobhumi Samadhi" },
    },
  ];

  return (
    <section id="gallery" className="scroll-mt-24 py-16 bg-parchment/60 border-t border-amber-900/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge tone="light">
              {mandirContent.ui.sacredVisualArchive[currentLang]}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900 mt-2">
              {mandirContent.ui.ramMalAshramSacred[currentLang]}
            </h2>
            <p className="text-base sm:text-base text-gray-700 max-w-2xl leading-relaxed">
              {mandirContent.ui.contemplativeDocumentationOfSatya[currentLang]}
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
                  className={`px-4 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
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

        {/* Uniform photo grid: every tile is a button that opens the lightbox */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item, idx) => {
            const videoId = item.videoSrc ? getYoutubeId(item.videoSrc) : null;
            return (
              <figure
                key={item.id}
                className={`group ${videoId ? "sm:col-span-2" : ""}`}
              >
                {videoId ? (
                  <VideoTile
                    videoId={videoId}
                    fileSrc={item.videoFile || undefined}
                    poster={item.src}
                    title={item.title[currentLang]}
                    tag={item.tag[currentLang]}
                    playLabel={mandirContent.ui.playVideo[currentLang]}
                    openLabel={mandirContent.ui.openLarger[currentLang]}
                    onOpen={() => setActiveItemIndex(idx)}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveItemIndex(idx)}
                    aria-label={`${item.title[currentLang]} — ${
                      mandirContent.ui.viewLarger[currentLang]
                    }`}
                    className="relative block w-full aspect-[4/5] rounded-2xl overflow-hidden bg-maroon-950 border border-amber-900/15 shadow-sm group-hover:shadow-md group-hover:border-amber-400 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron-600"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt[currentLang]}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-maroon-950/80 to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-maroon-950/85 text-amber-300 text-sm font-semibold">
                      {item.tag[currentLang]}
                    </span>
                  </button>
                )}
                <figcaption className="pt-3 px-1 font-serif font-bold text-base text-maroon-900 leading-snug">
                  {item.title[currentLang]}
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
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt[currentLang]}
                  fill
                  sizes="(min-width: 896px) 896px, 100vw"
                  className="object-contain"
                />
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between text-sm pt-1 text-amber-200/80">
              <span className="hidden sm:inline">
                {mandirContent.ui.useArrowKeysAnd[currentLang]}
              </span>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 font-semibold transition flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{mandirContent.ui.prev[currentLang]}</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 font-semibold transition flex items-center gap-1 cursor-pointer"
                >
                  <span>{mandirContent.ui.next[currentLang]}</span>
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
