import React, { useState } from "react";
import { Sparkles, Phone, ShieldCheck, ArrowUpRight } from "lucide-react";

interface TickerProps {
  siteData?: any;
  setActiveCategory?: (cat: string) => void;
  onOpenConsultant?: () => void;
}

export default function Ticker({ siteData, setActiveCategory, onOpenConsultant }: TickerProps) {
  const [isPaused, setIsPaused] = useState(false);

  const defaultNotices = [
    "🕉️ Experience the Divine Adi Kailash & Om Parvat Yatra 2026 - Bookings Open!",
    "📞 Contact our High Altitude Specialists at +91 9557092965",
    "💼 Registered with Uttarakhand Tourism Board (Reg ID: NT-2026)",
    "✈️ Mount Kailash Aerial Darshan Flight (Lucknow Base) - No Chinese Visa/Passport Required!",
    "🏔️ Outer Line Permits & medical forms handled seamlessly by Adi Kailash Tirath team."
  ];

  const notices = siteData?.bannerTickerText || defaultNotices;

  const handleNoticeClick = (notice: string) => {
    const text = notice.toLowerCase();
    
    // Check key phrases inside notice to perform high-precision contextual navigation
    if (text.includes("adi kailash") || text.includes("om parvat") || text.includes("booking") || text.includes("yatra")) {
      const el = document.getElementById("yatra-catalog-grid");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      if (setActiveCategory && text.includes("adi kailash")) {
        setActiveCategory("adi_kailash");
      }
    } else if (text.includes("aerial darshan") || text.includes("flight") || text.includes("kailash")) {
      const el = document.getElementById("yatra-catalog-grid");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      if (setActiveCategory) {
        setActiveCategory("nepal");
      }
    } else if (text.includes("permit") || text.includes("medical") || text.includes("planner")) {
      const el = document.getElementById("yatra-catalog-grid");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (text.includes("registered") || text.includes("tourism board") || text.includes("reg id")) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else if (onOpenConsultant) {
      // Default fallback is to start AI Guidance chat
      onOpenConsultant();
    }
  };

  const renderNoticeContent = (notice: string) => {
    // Check if the notice contains Indian phone numbers
    const phoneRegex = /(\+91\s*\d{10}|\+91\s*\d{5}\s*\d{5})/g;
    
    if (phoneRegex.test(notice)) {
      phoneRegex.lastIndex = 0; // reset RegExp index pointer
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = phoneRegex.exec(notice)) !== null) {
        const textBefore = notice.substring(lastIndex, match.index);
        if (textBefore) {
          parts.push(<span key={`text-${lastIndex}`} className="flex items-center">{textBefore}</span>);
        }
        
        const rawPhone = match[0];
        const linkPhone = rawPhone.replace(/\s+/g, "");
        parts.push(
          <a
            key={`phone-${match.index}`}
            href={`tel:${linkPhone}`}
            onClick={(e) => {
              e.stopPropagation(); // Stop parent bubble onClick handler triggering
            }}
            className="inline-flex items-center text-amber-900 hover:text-amber-800 underline font-extrabold font-mono mx-1 transition duration-200"
          >
            {rawPhone}
          </a>
        );
        lastIndex = phoneRegex.lastIndex;
      }
      
      const textAfter = notice.substring(lastIndex);
      if (textAfter) {
        parts.push(<span key={`text-after`} className="flex items-center">{textAfter}</span>);
      }
      
      return <span className="inline-flex items-center gap-1">{parts}</span>;
    }

    return (
      <span className="inline-flex items-center gap-1 hover:text-amber-700 transition duration-200">
        <span>{notice}</span>
        <ArrowUpRight className="h-3 w-3 opacity-70 text-amber-800" />
      </span>
    );
  };

  return (
    <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-900 overflow-hidden py-2.5 md:py-3 border-b border-amber-600/30 text-xs sm:text-sm font-serif tracking-wider select-none relative flex items-center justify-center shadow-inner">
      <div 
        className="flex whitespace-nowrap items-center justify-center flex-shrink-0 animate-[marquee_90s_linear_infinite] gap-20 pr-20"
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {notices.map((notice, idx) => (
          <span 
            key={idx} 
            onClick={() => handleNoticeClick(notice)}
            className="inline-flex items-center cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-800 mr-2 animate-pulse shrink-0" />
            <span className="text-slate-900 font-semibold inline-flex items-center">{renderNoticeContent(notice)}</span>
            <span className="mx-4 text-amber-700 inline-flex items-center">|</span>
            <span className="inline-flex items-center text-slate-800 font-medium shrink-0">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700 mr-1" />
              Gurupad Verified
            </span>
          </span>
        ))}
      </div>
      <div 
        className="flex whitespace-nowrap items-center justify-center flex-shrink-0 animate-[marquee_90s_linear_infinite] gap-20 pr-20"
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-hidden="true"
      >
        {notices.map((notice, idx) => (
          <span 
            key={`dup-${idx}`} 
            onClick={() => handleNoticeClick(notice)}
            className="inline-flex items-center justify-center cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-800 mr-2 animate-pulse shrink-0" />
            <span className="text-slate-900 font-semibold inline-flex items-center">{renderNoticeContent(notice)}</span>
            <span className="mx-4 text-amber-700 inline-flex items-center">|</span>
            <span className="inline-flex items-center text-slate-800 font-medium shrink-0">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700 mr-1" />
              Gurupad Verified
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
