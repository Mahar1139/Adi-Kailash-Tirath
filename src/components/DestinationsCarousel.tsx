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
  const [isReady, setIsReady] = useState(false);

  // Initial setup for infinite scroll
  useEffect(() => {
    const container = containerRef.current;
    if (container && !isReady && container.scrollWidth > 0) {
      // Start at the second set
      container.scrollLeft = container.scrollWidth / 3;
      setIsReady(true);
    }
  }, [circularDestinations, isReady]);

  // Handle continuous seamless looping on scroll (manual or automatic)
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || !isReady) return;

    const singleSetWidth = container.scrollWidth / 3;

    // If scrolled past the start of 3rd set, snap back to 2nd set
    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    } 
    // If scrolled back into the 1st set, snap forward to 2nd set
    else if (container.scrollLeft <= singleSetWidth / 2) {
      container.scrollLeft += singleSetWidth;
    }
  };

  // Auto-scroll logic (continuous smooth scroll instead of step interval)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isReady) return;

    let animationFrameId: number;

    const scrollStep = () => {
      animationFrameId = requestAnimationFrame(scrollStep);
      
      if (isHovered) return;
      
      // Advance by 1 pixel per frame (adjust for speed)
      container.scrollLeft += 1;
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isReady]);

  // Manual scroll handler
  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollAmount = 300; 
    const target = container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: target,
      behavior: "smooth"
    });
  };

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
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/80 dark:bg-[#0b1120]/80 border border-sky-500/30 text-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-500 flex items-center justify-center shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer select-none"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Slider Container on Single Line (Flex Row) */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex flex-row items-center overflow-x-auto pt-8 pb-4 px-0 scrollbar-none w-full"
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

        {[0, 1, 2].map((setIndex) => (
          <div key={setIndex} className="flex gap-4 pr-4 shrink-0">
            {circularDestinations.map((dest, i) => (
              <div
                key={`${setIndex}-${i}`}
                onClick={() => {
                  setActiveCategory(dest.categoryRef);
                  setTimeout(() => {
                    const gridEl = document.getElementById("yatra-catalog-grid");
                    if (gridEl) gridEl.scrollIntoView({ behavior: "smooth" });
                  }, 200);
                }}
                className="flex-shrink-0 w-[160px] md:w-[180px] flex flex-col items-center gap-3.5 group/card cursor-pointer hover:-translate-y-2 transition-all duration-500"
              >
                {/* Circular visual wrapper */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-b from-slate-200 to-slate-200 dark:from-zinc-800 dark:to-zinc-800 group-hover/card:from-sky-500 group-hover/card:to-sky-400 group-hover/card:shadow-xl group-hover/card:shadow-sky-500/30 transition-all duration-500 shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <img
                      src={dest.img}
                      alt={dest.title}
                      className="w-full h-full object-cover transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay group-hover/card:opacity-0 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent animate-golden-slide" />
                    </div>
                  </div>
                </div>
                
                {/* Labels */}
                <div className="text-center w-full px-1">
                  <h4 className="font-serif text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 group-hover/card:text-sky-400 transition-colors duration-300 leading-snug truncate">
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
                  <p className="text-xs text-slate-900 dark:text-slate-100 mt-1 line-clamp-2 leading-tight">
                    {dest.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Right Navigation Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/80 dark:bg-[#0b1120]/80 border border-sky-500/30 text-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-500 flex items-center justify-center shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer select-none"
        aria-label="Scroll Right"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>
    </div>
  );
}
