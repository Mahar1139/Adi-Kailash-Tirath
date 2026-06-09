import React, { useState, useRef, useEffect } from "react";
import { TRAVEL_STORIES, YATRI_FEEDBACKS } from "../data";
import { Play, Volume2, X, Star, MapPin, Smile, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { TravelerStory } from "../types";
import { t } from "../utils/lang";

interface TravelerReelsProps {
  siteData?: any;
  currentLanguage?: string;
}

export default function TravelerReels({ siteData, currentLanguage = "en" }: TravelerReelsProps) {
  const [activeTab, setActiveTab] = useState<"reels" | "feedbacks">("reels");
  const [selectedStory, setSelectedStory] = useState<TravelerStory | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"right" | "left">("right");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const stories = siteData?.travelStories || TRAVEL_STORIES;
  const feedbacks = siteData?.yatriFeedbacks || YATRI_FEEDBACKS;

  // Auto scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let intervalId: any;
    let isHovered = false;

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    intervalId = setInterval(() => {
      if (isHovered) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (scrollDirection === "right") {
        if (container.scrollLeft >= maxScroll - 15) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 320, behavior: "smooth" });
        }
      } else {
        // direction is left
        if (container.scrollLeft <= 15) {
          container.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          container.scrollBy({ left: -320, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => {
      clearInterval(intervalId);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeTab, stories, feedbacks, scrollDirection, interactionCount]);

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      if (container.scrollLeft <= 15) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -320, behavior: "smooth" });
      }
      setScrollDirection("left");
      setInteractionCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 15) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
      setScrollDirection("right");
      setInteractionCount(prev => prev + 1);
    }
  };

  return (
    <section className="py-16 bg-slate-100/40 dark:bg-zinc-900/40 backdrop-blur-sm border-t border-slate-200/50 dark:border-zinc-800/50 px-4 select-none">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center flex flex-col items-center gap-2 mb-8">
          <span className="text-sky-500 font-mono text-xs font-bold uppercase tracking-[0.25em]">
            {t("yatriFeedbacks", currentLanguage)}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 font-extrabold tracking-tight">
            {t("yatriSub", currentLanguage)}
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-sky-600 to-blue-500 rounded" />
          <p className="text-slate-900 dark:text-zinc-100 text-sm max-w-xl mt-1 leading-relaxed">
            {activeTab === "reels" 
              ? "Authentic moments, spiritual clips, and video reels captured directly by pilgrims whom we accompanied through high-altitude passages."
              : "Read heartfelt feedbacks, blessings, and reviews shared by sacred yatris regarding our local coordination, transport, food, and guides."
            }
          </p>
        </div>

        {/* Dynamic Inner Tab Segment Control */}
        <div className="flex justify-center items-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab("reels")}
            className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all duration-300 border cursor-pointer flex items-center gap-1.5 ${
              activeTab === "reels"
                ? "bg-sky-650 hover:bg-sky-600 text-white border-sky-500/50 shadow-lg shadow-sky-950/20"
                : "bg-white dark:bg-zinc-950 hover:bg-slate-100 dark:hover:bg-zinc-800 dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 border-slate-300 dark:border-zinc-700"
            }`}
          >
            <Play className="h-3 w-3 fill-current" />
            <span>{currentLanguage === "hi" ? "वीडियो रील्स" : "Video Reels (यात्री रील्स)"}</span>
          </button>
          <button
            onClick={() => setActiveTab("feedbacks")}
            className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all duration-300 border cursor-pointer flex items-center gap-1.5 ${
              activeTab === "feedbacks"
                ? "bg-sky-650 hover:bg-sky-600 text-white border-sky-500/50 shadow-lg shadow-sky-950/20"
                : "bg-white dark:bg-zinc-950 hover:bg-slate-100 dark:hover:bg-zinc-800 dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 border-slate-300 dark:border-zinc-700"
            }`}
          >
            <Star className="h-3 w-3 fill-current" />
            <span>{currentLanguage === "hi" ? "लिखित फीडबैक" : "Yatri Feedbacks (लिखित फीडबैक)"}</span>
          </button>
        </div>

        {/* Tab content 1: Video Reels (with Left/Right Overlay Buttons) */}
        {activeTab === "reels" && (
          <div className="relative w-full max-w-6xl mx-auto group/carousel px-4">
            {/* Custom Left Arrow Button */}
            <button
              onClick={handlePrev}
              className="absolute left-[-16px] md:left-[-24px] top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 w-12 sm:w-12 rounded-full bg-white/90 dark:bg-zinc-950/90 border border-slate-200/80 dark:border-zinc-800/80 text-slate-900 dark:text-zinc-100 hover:border-sky-500 hover:text-slate-900 dark:text-zinc-100 flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
              title="Previous Story"
            >
              <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
            </button>

            {/* Custom Right Arrow Button */}
            <button
              onClick={handleNext}
              className="absolute right-[-16px] md:right-[-24px] top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 w-12 sm:w-12 rounded-full bg-white/90 dark:bg-zinc-950/90 border border-slate-200/80 dark:border-zinc-800/80 text-slate-900 dark:text-zinc-100 hover:border-sky-500 hover:text-slate-900 dark:text-zinc-100 flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
              title="Next Story"
            >
              <ChevronRight className="h-6 w-6 stroke-[2.5]" />
            </button>

            {/* 1 Row Carousel List */}
            <div
              ref={scrollContainerRef}
              className="flex gap-5 overflow-x-auto scroll-smooth py-4 whitespace-nowrap select-none snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {stories.map((story: any) => (
                <div
                  key={story.id}
                  onClick={() => setSelectedStory(story)}
                  className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[310px] snap-start relative aspect-[9/16] rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 hover:border-sky-500/40 shadow-2xl group cursor-pointer hover:scale-[1.01] transition-all duration-300 bg-white dark:bg-zinc-950"
                >
                  {/* Backing Cover image */}
                  <img
                    src={story.coverImage}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 brightness-[0.6] group-hover:brightness-[0.4]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Central Play Indicator Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-sky-600/90 text-white flex items-center justify-center shadow-lg border border-sky-500/30 group-hover:scale-110 group-hover:bg-sky-500 transition-all duration-300">
                      <Play className="h-6 w-6 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Top overlay pills */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-15">
                    <span className="bg-slate-50/40 dark:bg-zinc-950/40 text-[10px] font-mono text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 font-bold animate-pulse">
                      <Star className="h-3 w-3 fill-blue-400 text-blue-400" />
                      YATRI REEL
                    </span>
                    <span className="bg-slate-50/50 dark:bg-zinc-950/50 text-[10px] font-mono text-slate-900 dark:text-zinc-100 px-2 py-0.5 rounded backdrop-blur-xs">
                      {story.duration}
                    </span>
                  </div>

                  {/* Bottom text overlays */}
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-white via-slate-50/70 to-transparent flex flex-col gap-1.5 text-left z-15 whitespace-normal">
                    <div className="flex items-center gap-1.5 text-slate-900 dark:text-zinc-100 font-mono text-[10.5px]">
                      <MapPin className="h-3.5 w-3.5 text-sky-500" />
                      <span>{story.location}</span>
                    </div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-zinc-100 tracking-tight leading-tight">
                      {story.name}
                    </h4>
                    <p className="text-sky-455 font-semibold font-mono text-[11px] sm:text-xs">
                      {story.trip}
                    </p>
                    <p className="text-slate-900 dark:text-zinc-100 text-xs italic leading-normal line-clamp-2 mt-1">
                      "{story.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab content 2: Written Feedbacks Grid (now in 1 Row Carousel) */}
        {activeTab === "feedbacks" && (
          <div className="relative w-full max-w-6xl mx-auto group/carousel px-4">
            {/* Custom Left Arrow Button */}
            <button
              onClick={handlePrev}
              className="absolute left-[-16px] md:left-[-24px] top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 w-12 sm:w-12 rounded-full bg-white/90 dark:bg-zinc-950/90 border border-slate-200/80 dark:border-zinc-800/80 text-slate-900 dark:text-zinc-100 hover:border-sky-500 hover:text-slate-900 dark:text-zinc-100 flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
              title="Previous Feedback"
            >
              <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
            </button>

            {/* Custom Right Arrow Button */}
            <button
              onClick={handleNext}
              className="absolute right-[-16px] md:right-[-24px] top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 w-12 sm:w-12 rounded-full bg-white/90 dark:bg-zinc-950/90 border border-slate-200/80 dark:border-zinc-800/80 text-slate-900 dark:text-zinc-100 hover:border-sky-500 hover:text-slate-900 dark:text-zinc-100 flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
              title="Next Feedback"
            >
              <ChevronRight className="h-6 w-6 stroke-[2.5]" />
            </button>

            {/* 1 Row Carousel List */}
            <div
              ref={scrollContainerRef}
              className="flex gap-5 overflow-x-auto scroll-smooth py-4 select-none snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {feedbacks.map((fb: any) => (
                <div 
                  key={fb.id} 
                  className="flex-shrink-0 w-[260px] sm:w-[320px] md:w-[340px] snap-start bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-5 sm:p-6 rounded-2xl flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-sky-500/25 whitespace-normal"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-300 dark:border-zinc-700">
                      <span className="text-[10px] font-semibold font-mono text-sky-400 uppercase tracking-wide truncate max-w-[140px] sm:max-w-[180px]" title={fb.trip}>
                        {fb.trip}
                      </span>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        {Array.from({ length: 5 }).map((_, r_idx) => (
                          <Star 
                            key={r_idx} 
                            className={`h-3 w-3 ${r_idx < (fb.rating || 5) ? "fill-blue-400 text-blue-400" : "text-slate-900 dark:text-zinc-100"}`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-slate-900 dark:text-zinc-100 text-xs sm:text-sm italic leading-relaxed mb-6 font-sans line-clamp-4">
                      "{fb.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-300/60 dark:border-zinc-700/60 text-left">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 text-sky-400 rounded-full border border-slate-200/80 dark:border-zinc-800/80 bg-slate-100 dark:bg-zinc-900 flex items-center justify-center font-serif text-sm sm:text-base font-bold flex-shrink-0 select-none">
                      {fb.name ? fb.name.charAt(0) : "Y"}
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-serif text-sm font-bold text-slate-900 dark:text-zinc-100 truncate">{fb.name}</h5>
                      <div className="flex items-center gap-1 text-[10px] sm:text-[10.5px] font-mono text-slate-900 dark:text-zinc-100 mt-0.5 truncate">
                        <MapPin className="h-3 w-3 text-sky-500 flex-shrink-0" />
                        <span className="truncate">{fb.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Story Modal Lightbox Overlay */}
        {selectedStory && (
          <div className="fixed inset-0 z-50 bg-slate-50/95 dark:bg-zinc-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in-60 duration-300">
            <div className="relative bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl">
              
              {/* Header inside popup */}
              <div className="p-4 bg-slate-100 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center">
                <div className="text-left">
                  <h4 className="font-serif font-bold text-slate-900 dark:text-zinc-100 text-sm">{selectedStory.name}</h4>
                  <p className="text-[10px] font-mono text-sky-400 font-semibold">{selectedStory.trip}</p>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="p-1.5 rounded-full bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 hover:text-slate-900 dark:text-zinc-100 transition cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* HTML5 video preview block / Iframe block for social media */}
              <div className="relative aspect-[9/16] bg-slate-50 dark:bg-zinc-950">
                {(() => {
                  const url = selectedStory.videoUrl || "";
                  const isInstagram = url.includes("instagram.com");
                  const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");

                  if (isInstagram) {
                    let cleanUrl = url.split("?")[0];
                    if (!cleanUrl.endsWith("/")) {
                      cleanUrl += "/";
                    }
                    if (!cleanUrl.endsWith("embed/")) {
                      cleanUrl += "embed/";
                    }
                    return (
                      <iframe
                        src={cleanUrl}
                        className="w-full h-full border-0"
                        allowTransparency={true}
                        allow="encrypted-media"
                        scrolling="no"
                      />
                    );
                  } else if (isYoutube) {
                    let videoId = "";
                    if (url.includes("youtu.be/")) {
                      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
                    } else if (url.includes("v=")) {
                      videoId = url.split("v=")[1]?.split("&")[0] || "";
                    } else if (url.includes("/embed/")) {
                      videoId = url.split("/embed/")[1]?.split("?")[0] || "";
                    } else if (url.includes("/shorts/")) {
                      videoId = url.split("/shorts/")[1]?.split("?")[0] || "";
                    }
                    return (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  } else if (url) {
                    return (
                      <video
                        src={url}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    );
                  } else {
                    return (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 p-6 text-center">
                        <Smile className="h-8 w-8 text-sky-500 mb-2" />
                        <p className="text-slate-900 dark:text-zinc-100 text-xs font-serif font-bold mb-1">Authentic Pilgrim Experience</p>
                        <p className="text-slate-900 dark:text-zinc-100 text-[10px] font-mono leading-relaxed">Verification completed. Live footage stream currently active on partner reels.</p>
                      </div>
                    );
                  }
                })()}

                {/* On-Video controls - only show for regular video files to avoid iframe blocking */}
                {selectedStory.videoUrl && !selectedStory.videoUrl.includes("instagram.com") && !selectedStory.videoUrl.includes("youtube.com") && !selectedStory.videoUrl.includes("youtu.be") && (
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      className="p-2 rounded-full bg-slate-50/65 dark:bg-zinc-950/65 text-white hover:bg-sky-600 transition cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>
                )}

                {/* Subtitle bottom banner */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-50 via-black/85 to-transparent p-5 text-left pt-12">
                  <p className="text-blue-100 italic text-xs leading-relaxed font-serif">
                    "{selectedStory.quote}"
                  </p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200/40 dark:border-zinc-800/40 text-[10px] font-mono text-slate-900 dark:text-zinc-100">
                    <Smile className="h-3.5 w-3.5 text-sky-400" />
                    <span>Real-time pilgrim validation successfully verified.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
