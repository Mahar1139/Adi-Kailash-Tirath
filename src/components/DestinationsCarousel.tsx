import React, { useRef, useEffect, useState } from "react";
import { Compass, ChevronLeft, ChevronRight } from "lucide-react";
import { t } from "../utils/lang";

interface Destination {
  title: string;
  categoryRef: string;
  img: string;
  description: string;
}

interface DestinationsCarouselProps {
  circularDestinations: Destination[];
  currentLanguage: string;
  setActiveCategory: (cat: string) => void;
}

export default function DestinationsCarousel({
  circularDestinations,
  currentLanguage,
  setActiveCategory
}: DestinationsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Manual scroll handler
  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollAmount = 240; // Approx card width + gap
    const target = container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: target,
      behavior: "smooth"
    });
  };

  // Auto-scroll logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let intervalId: any;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (isHovered) return;
        
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // If we are at the end, reset to the beginning smoothly, or step forward
        if (container.scrollLeft >= maxScroll - 5) {
          container.scrollTo({
            left: 0,
            behavior: "smooth"
          });
        } else {
          container.scrollBy({
            left: 180, // Step scroll
            behavior: "smooth"
          });
        }
      }, 3000); // Trigger scroll every 3 seconds
    };

    startAutoScroll();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered]);

  return (
    <div 
      className="relative w-full group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="destinations-carousel-wrapper"
    >
      {/* Left Navigation Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/80 dark:bg-zinc-950/80 border border-sky-500/30 text-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-500 flex items-center justify-center shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer select-none"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Slider Container on Single Line (Flex Row) */}
      <div
        ref={containerRef}
        className="flex flex-row items-center gap-6 overflow-x-auto scroll-smooth py-4 px-0 scrollbar-none w-full"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none"  // IE 10+
        }}
      >
        {/* Webkit scrollbar hide styling wrapper */}
        <style dangerouslySetInnerHTML={{__html: `
          #destinations-carousel-wrapper div::-webkit-scrollbar {
            display: none !important;
          }
        `}} />

        {circularDestinations.map((dest, i) => (
          <div
            key={i}
            onClick={() => {
              setActiveCategory(dest.categoryRef);
              setTimeout(() => {
                const gridEl = document.getElementById("yatra-catalog-grid");
                if (gridEl) gridEl.scrollIntoView({ behavior: "smooth" });
              }, 200);
            }}
            className="flex-shrink-0 w-[140px] md:w-[160px] flex flex-col items-center gap-3.5 group/card cursor-pointer hover:-translate-y-2 transition-all duration-500"
          >
            {/* Circular visual wrapper */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-b from-slate-200 to-slate-200 dark:from-zinc-800 dark:to-zinc-800 group-hover/card:from-sky-500 group-hover/card:to-sky-400 group-hover/card:shadow-xl group-hover/card:shadow-sky-500/30 transition-all duration-500 shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img
                  src={dest.img}
                  alt={dest.title}
                  className="w-full h-full object-cover filter brightness-90 group-hover/card:brightness-105 group-hover/card:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 z-20 pointer-events-none opacity-80 mix-blend-overlay">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent animate-golden-slide" />
                </div>
              </div>
              <div className="absolute inset-1 rounded-full bg-sky-900/30 opacity-0 group-hover/card:opacity-100 transition duration-500 flex items-center justify-center backdrop-blur-[1px]">
                <Compass className="h-6 w-6 text-white animate-spin-slow drop-shadow-md" />
              </div>
            </div>
            
            {/* Labels */}
            <div className="text-center w-full px-1">
              <h4 className="font-serif text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover/card:text-sky-400 transition-colors duration-300 leading-snug truncate">
                {(() => {
                  if (dest.categoryRef === "adi_kailash") return t("adiKailashRef", currentLanguage);
                  if (dest.categoryRef === "kailash_mansarovar") return t("kailashMansarovarRef", currentLanguage);
                  if (dest.categoryRef === "chardham") return t("chardhamRef", currentLanguage);
                  if (dest.categoryRef === "amarnath") return t("amarnathRef", currentLanguage);
                  if (dest.categoryRef === "om_parvat") return t("omParvatRef", currentLanguage);
                  if (dest.categoryRef === "munsyari") return t("munsyariRef", currentLanguage);
                  if (dest.categoryRef === "kainchi_dham") return t("kainchiDhamRef", currentLanguage);
                  if (dest.categoryRef === "maa_purnagiri") return t("maaPurnagiriRef", currentLanguage);
                  if (dest.categoryRef === "panchachuli") return t("panchachuliRef", currentLanguage);
                  if (dest.categoryRef === "darma_valley") return t("darmaValleyRef", currentLanguage);
                  if (dest.categoryRef === "chirkilla_dam") return t("chirkillaDamRef", currentLanguage);
                  if (dest.categoryRef === "narayan_ashram") return t("narayanAshramRef", currentLanguage);
                  return dest.title;
                })()}
              </h4>
              <p className="text-[10px] text-slate-900 dark:text-zinc-100 mt-1 line-clamp-2 leading-tight">
                {dest.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Navigation Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/80 dark:bg-zinc-950/80 border border-sky-500/30 text-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-500 flex items-center justify-center shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer select-none"
        aria-label="Scroll Right"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>
    </div>
  );
}
