import React, { useState, useRef, useEffect } from "react";
import { YatraPackage } from "../types";
import { YATRA_PACKAGES } from "../data";
import { ShieldCheck, Calendar, Navigation, Activity, ArrowRight, Server, Check, ChevronLeft, ChevronRight } from "lucide-react";
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

  const filterableCategories = [
    { key: "home", label: t("allShun", currentLanguage) },
    { key: "adi_kailash", label: t("adiKailashRef", currentLanguage) },
    { key: "kailash_mansarovar", label: t("kailashMansarovarRef", currentLanguage) },
    { key: "chardham", label: t("chardhamRef", currentLanguage) },
    { key: "amarnath", label: t("amarnathRef", currentLanguage) },
    { key: "om_parvat", label: t("omParvatRef", currentLanguage) },
    { key: "munsyari", label: t("munsyariRef", currentLanguage) },
    { key: "kainchi_dham", label: t("kainchiDhamRef", currentLanguage) },
    { key: "maa_purnagiri", label: t("maaPurnagiriRef", currentLanguage) },
    { key: "panchachuli", label: t("panchachuliRef", currentLanguage) },
    { key: "darma_valley", label: t("darmaValleyRef", currentLanguage) },
    { key: "chirkilla_dam", label: t("chirkillaDamRef", currentLanguage) },
    { key: "narayan_ashram", label: t("narayanAshramRef", currentLanguage) }
  ];

  const packagesList = siteData?.packages || YATRA_PACKAGES;

  // If activeCategory is "home", show all packages. Else, show active category.
  const filteredPackages = packagesList.filter((pkg: any) => {
    if (activeCategory === "home") return true;
    return pkg.category === activeCategory;
  });

  const visiblePackages = showAllPackages ? filteredPackages : filteredPackages.slice(0, initialLimit);

  return (
    <section id="yatra-catalog-grid" className="py-16 bg-slate-100/40 dark:bg-zinc-900/40 backdrop-blur-sm border-t border-slate-200/50 dark:border-zinc-800/50 px-4 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="text-center flex flex-col items-center gap-3 mb-10">
          <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-[0.25em]">
            {t("catalogTitle", currentLanguage)}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 font-extrabold tracking-tight">
            {t("packages", currentLanguage)}
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-orange-600 to-amber-500 rounded" />
          <p className="text-slate-600 dark:text-zinc-400 text-sm max-w-2xl mt-1 leading-relaxed">
            {t("catalogSub", currentLanguage)}
          </p>
        </div>

        {/* Dynamic Horizontal Filters */}
        <div className="relative flex items-center mb-10 px-8 group/filter">
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollFilters("left")}
            className="absolute left-0 z-10 p-2.5 bg-white dark:bg-zinc-950 hover:bg-orange-600 border border-slate-200 dark:border-zinc-800 hover:border-orange-500/30 rounded-full text-slate-600 dark:text-zinc-400 hover:text-white shadow-xl hover:shadow-orange-500/10 transition duration-300 cursor-pointer select-none"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Filters Wrapper */}
          <div
            ref={filterContainerRef}
            onMouseEnter={() => setFilterIsHovered(true)}
            onMouseLeave={() => setFilterIsHovered(false)}
            onTouchStart={() => setFilterIsHovered(true)}
            className="flex-1 flex gap-2.5 overflow-x-auto scrollbar-none whitespace-nowrap py-3 px-1 scroll-smooth"
          >
            {filterableCategories.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setActiveCategory(f.key);
                  setShowAllPackages(false); // Reset package visibility when tab changes
                }}
                className={`inline-block px-5 py-3 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex-shrink-0 select-none ${
                  activeCategory === f.key
                    ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-600/15"
                    : "bg-white dark:bg-zinc-950 text-slate-700 dark:text-zinc-300 hover:text-orange-400 border border-slate-300 dark:border-zinc-700 hover:border-slate-300 dark:border-zinc-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollFilters("right")}
            className="absolute right-0 z-10 p-2.5 bg-white dark:bg-zinc-950 hover:bg-orange-600 border border-slate-200 dark:border-zinc-800 hover:border-orange-500/30 rounded-full text-slate-600 dark:text-zinc-400 hover:text-white shadow-xl hover:shadow-orange-500/10 transition duration-300 cursor-pointer select-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* ADI KAILASH JOURNEY EDITIONS COMPARATOR (DIRECT FROM THE WEBSITE AND VIDEO) */}
        {activeCategory === "adi_kailash" && (
          <div className="mb-14 bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-2xl border border-orange-500/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-5 border-b border-slate-200 dark:border-zinc-800">
              <div>
                <span className="text-amber-500 font-mono text-[10px] font-bold uppercase tracking-widest block">
                  SERVICE SELECTION GRID
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-zinc-100 mt-1">
                  Adi Kailash Journey Editions: Standard, Deluxe & Premium
                </h3>
              </div>
              <div className="flex bg-slate-100 dark:bg-zinc-900 p-1 rounded-lg border border-slate-200 dark:border-zinc-800 w-full md:w-auto">
                {(["standard", "deluxe", "premium"] as const).map((edition) => (
                  <button
                    key={edition}
                    onClick={() => setJourneyEdition(edition)}
                    className={`flex-1 md:flex-none px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition ${
                      journeyEdition === edition
                        ? "bg-orange-600 text-white"
                        : "text-slate-600 dark:text-zinc-400 hover:text-white"
                    }`}
                  >
                    {edition}
                  </button>
                ))}
              </div>
            </div>

            {/* Content of the chosen Edition */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-xs text-slate-600 dark:text-zinc-400">
              <div className="bg-slate-100/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-slate-200/65 dark:border-zinc-800/65">
                <span className="font-bold text-slate-800 dark:text-zinc-200 block text-xs uppercase tracking-wider mb-2 font-mono text-orange-405">
                  ✓ Accommodation Layouts
                </span>
                <p className="leading-relaxed">
                  {journeyEdition === "standard" && "Clean, welcoming mountain homestays & local guest lodges in Nabi & Gunji. Hot water available in buckets."}
                  {journeyEdition === "deluxe" && "Top-ranked private wooden cottages or premium heated rooms. Private attached bathrooms with hot water."}
                  {journeyEdition === "premium" && "Luxury heated military-style dome glamping tents or 4-starred resort sweeps where available."}
                </p>
              </div>

              <div className="bg-slate-100/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-slate-200/65 dark:border-zinc-800/65">
                <span className="font-bold text-slate-800 dark:text-zinc-200 block text-xs uppercase tracking-wider mb-2 font-mono text-orange-405">
                  ✓ Transit & Logistics
                </span>
                <p className="leading-relaxed">
                  {journeyEdition === "standard" && "Rugged 4x4 Bolero transport from Dharchula shared comfortably among 6 participants."}
                  {journeyEdition === "deluxe" && "Innova Crysta or upgraded luxury Force Traveler with larger suspension and window seats."}
                  {journeyEdition === "premium" && "Chartered private Heli-drops directly inside Gunji valley + private premium customized SUV convoy."}
                </p>
              </div>

              <div className="bg-slate-100/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-slate-200/65 dark:border-zinc-800/65">
                <span className="font-bold text-slate-800 dark:text-zinc-200 block text-xs uppercase tracking-wider mb-2 font-mono text-orange-405">
                  ✓ Support & Fast-Track Permits
                </span>
                <p className="leading-relaxed">
                  {journeyEdition === "standard" && "Support guide, collective permit filing, and standard group oxygen setup."}
                  {journeyEdition === "deluxe" && "Personal guide, accelerated permit approvals, priority medical clearing, and custom oxygen kits."}
                  {journeyEdition === "premium" && "Personal Vedic scholar guide, absolute VIP clearance, private nurse checkups daily, and VIP temple queue cards."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Packages Grid */}
        {visiblePackages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl text-center min-h-[400px]">
            <Compass className="h-12 w-12 text-slate-300 dark:text-zinc-600 mb-4" />
            <h3 className="text-xl font-serif font-bold text-slate-800 dark:text-zinc-200 mb-2">No packages available here</h3>
            <p className="text-slate-500 dark:text-zinc-450 mb-6 text-sm max-w-md">
              We are constantly adding new yatras. Please check out our other spiritual journeys.
            </p>
            <button 
              onClick={() => onCategorySelect("all")}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 cursor-pointer text-white font-mono text-xs rounded shadow-lg flex items-center gap-2 transition"
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
              className="group bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 hover:border-orange-500/30 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image with labels */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-slate-100/90 dark:bg-zinc-900/90 text-orange-400 border border-orange-500/20 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded font-bold backdrop-blur-xs">
                  {pkg.badge}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-950/90 text-slate-700 dark:text-zinc-300 text-[10px] font-mono px-2 py-1 rounded backdrop-blur-xs">
                  {pkg.duration}
                </div>
                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-slate-700 dark:text-zinc-300 font-mono text-[11px]">
                  <Navigation className="h-3 w-3 text-orange-500" />
                  <span>{pkg.fromRoute}</span>
                </div>
              </div>

              {/* Package Details */}
              <div className="p-5 flex flex-col gap-3 text-left flex-grow">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-450 uppercase tracking-widest">
                    Yatra Category
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                    <Activity className="h-3 w-3" />
                    {pkg.difficulty}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-zinc-100 group-hover:text-orange-400 transition-colors duration-300 leading-snug">
                  {pkg.title}
                </h3>

                <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed line-clamp-3">
                  {pkg.overview}
                </p>

                {/* Highlights preview */}
                <div className="space-y-1.5 mt-2">
                  {pkg.highlights.slice(0, 3).map((hl, i) => (
                    <div key={i} className="flex items-start gap-1 pb-1">
                      <Check className="h-3.5 w-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-zinc-400 text-[11px] font-serif leading-none">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and CTA */}
              <div className="p-5 pt-0 border-t border-slate-300 dark:border-zinc-700 text-left flex justify-between items-center bg-white dark:bg-zinc-950">
                <div className="flex flex-col pt-4">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-450 uppercase tracking-wider leading-none">
                    SPECIAL RATE
                  </span>
                  <span className="text-xl font-mono font-bold text-orange-400 mt-1 leading-none">
                    {pkg.price}
                  </span>
                </div>
                <button
                  onClick={() => onOpenPackage(pkg)}
                  className="bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 hover:text-white hover:bg-orange-600 hover:border-orange-500/30 text-xs font-mono font-bold tracking-wider px-4 py-2.5 rounded-lg transition-all duration-300 self-end mt-4 cursor-pointer inline-flex items-center gap-1.5"
                >
                  VIEW PACKAGE
                  <ArrowRight className="h-3 w-3" />
                </button>
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
              className="px-8 py-3.5 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-full shadow-lg hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2 border border-orange-500/20"
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
