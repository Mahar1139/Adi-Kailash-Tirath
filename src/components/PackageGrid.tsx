import React, { useState, useRef, useEffect } from "react";
import { YatraPackage } from "../types";
import { YATRA_PACKAGES } from "../data";
import { ShieldCheck, Calendar, Navigation, Activity, ArrowRight, Server, Check, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { t } from "../utils/lang";
import { motion, AnimatePresence } from "motion/react";

interface PackageGridProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onOpenPackage: (pkg: YatraPackage) => void;
  siteData?: any;
  currentLanguage?: string;
}

export default function PackageGrid({
  activeCategory,
  setActiveCategory,
  onOpenPackage,
  siteData,
  currentLanguage = "en"
}: PackageGridProps) {
  const [journeyEdition, setJourneyEdition] = useState<"standard" | "deluxe" | "premium">("standard");
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [filterIsHovered, setFilterIsHovered] = useState(false);
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(3);

  // Dynamic columns detection based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCols(3);
      } else if (window.innerWidth >= 768) {
        setCols(2);
      } else {
        setCols(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initialLimit = cols * 3; // Exactly 3 rows of packages

  // Manual scroll for filters
  const scrollFilters = (direction: "left" | "right") => {
    if (!filterContainerRef.current) return;
    const container = filterContainerRef.current;
    const scrollAmount = 200;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  // Auto scroll for filters to the right
  useEffect(() => {
    const container = filterContainerRef.current;
    if (!container) return;
    let intervalId: any;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (filterIsHovered) return;
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll <= 0) return;
        
        // Scroll right, loop back if at the end
        if (container.scrollLeft >= maxScroll - 15) {
          container.scrollTo({
            left: 0,
            behavior: "smooth"
          });
        } else {
          container.scrollBy({
            left: 130,
            behavior: "smooth"
          });
        }
      }, 3200);
    };

    startAutoScroll();
    return () => clearInterval(intervalId);
  }, [filterIsHovered]);

  const packagesList = siteData?.packages || YATRA_PACKAGES;

  const filteredPackages = packagesList; // Always show all packages

  const visiblePackages = showAllPackages ? filteredPackages : filteredPackages.slice(0, initialLimit);

  return (
    <section id="yatra-catalog-grid" className="py-16 bg-slate-100/40 dark:bg-zinc-900/40 backdrop-blur-sm border-t border-slate-200/50 dark:border-zinc-800/50 px-4 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="text-center flex flex-col items-center gap-3 mb-10">
          <span className="text-sky-500 font-mono text-xs font-bold uppercase tracking-[0.25em]">
            {t("catalogTitle", currentLanguage)}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 font-extrabold tracking-tight">
            {t("packages", currentLanguage)}
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-sky-600 to-blue-500 rounded" />
          <p className="text-slate-900 dark:text-zinc-100 text-sm max-w-2xl mt-1 leading-relaxed">
            {t("catalogSub", currentLanguage)}
          </p>
        </div>

        {/* Packages Grid */}
        {visiblePackages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl text-center min-h-[400px]">
            <Compass className="h-12 w-12 text-slate-900 dark:text-zinc-100 mb-4" />
            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-900 mb-2">No packages available here</h3>
            <p className="text-slate-900 dark:text-zinc-100 mb-6 text-sm max-w-md">
              We are constantly adding new yatras. Please check out our other spiritual journeys.
            </p>
            <button 
              onClick={() => setActiveCategory("home")}
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 cursor-pointer text-white font-mono text-xs rounded shadow-lg flex items-center gap-2 transition"
            >
              Check other packages <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            <AnimatePresence mode="popLayout">
            {visiblePackages.map((pkg, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              key={pkg.id}
              className="group cursor-pointer bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 hover:border-sky-500/30 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
              onClick={() => onOpenPackage(pkg)}
            >
              {/* Image with labels */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-slate-100/90 dark:bg-zinc-900/90 text-sky-400 border border-sky-500/20 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded font-bold backdrop-blur-xs">
                  {pkg.badge}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-950/90 text-slate-900 dark:text-zinc-100 text-[10px] font-mono px-2 py-1 rounded backdrop-blur-xs">
                  {pkg.duration}
                </div>
                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-slate-900 dark:text-zinc-100 font-mono text-[11px]">
                  <Navigation className="h-3 w-3 text-sky-500" />
                  <span>{pkg.fromRoute}</span>
                </div>
              </div>

              {/* Package Details */}
              <div className="p-5 flex flex-col gap-3 text-left flex-grow">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-900 dark:text-zinc-100 uppercase tracking-widest">
                    Yatra Category
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-500 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">
                    <Activity className="h-3 w-3" />
                    {pkg.difficulty}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-zinc-100 group-hover:text-sky-400 transition-colors duration-300 leading-snug">
                  {pkg.title}
                </h3>

                <p className="text-slate-900 dark:text-zinc-100 text-xs leading-relaxed line-clamp-3">
                  {pkg.overview}
                </p>

                {/* Highlights preview */}
                <div className="space-y-1.5 mt-2">
                  {pkg.highlights.slice(0, 3).map((hl, i) => (
                    <div key={i} className="flex items-start gap-1 pb-1">
                      <Check className="h-3.5 w-3.5 text-sky-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-900 dark:text-zinc-100 text-[11px] font-serif leading-none">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and CTA */}
              <div className="p-5 pt-0 border-t border-slate-300 dark:border-zinc-700 text-left flex justify-between items-center bg-white dark:bg-zinc-950">
                <div className="flex flex-col pt-4">
                  <span className="text-[10px] font-mono text-slate-900 dark:text-zinc-100 uppercase tracking-wider leading-none">
                    SPECIAL RATE
                  </span>
                  <span className="text-xl font-mono font-bold text-sky-400 mt-1 leading-none">
                    {pkg.price}
                  </span>
                </div>
                <div
                  className="bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 hover:text-white hover:bg-sky-600 hover:border-sky-500/30 text-xs font-mono font-bold tracking-wider px-4 py-2.5 rounded-lg transition-all duration-300 self-end mt-4 inline-flex items-center gap-1.5"
                >
                  VIEW PACKAGE
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
          </div>
        )}

        {filteredPackages.length > initialLimit && (
          <div className="mt-12 text-center animate-fade-in">
            <button
              onClick={() => setShowAllPackages((p) => !p)}
              className="px-8 py-3.5 bg-gradient-to-r from-sky-600 via-sky-500 to-blue-500 hover:from-sky-500 hover:to-blue-400 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-full shadow-lg hover:shadow-sky-500/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2 border border-sky-500/20"
            >
              <span>
                {showAllPackages
                  ? (currentLanguage === "hi" ? "कम पैकेज दिखाएं" : "SHOW FEWER PACKAGES")
                  : (currentLanguage === "hi" ? "और सभी पैकेज देखें" : "VIEW ALL PACKAGES")}
              </span>
              <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${showAllPackages ? "-rotate-90" : ""}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
