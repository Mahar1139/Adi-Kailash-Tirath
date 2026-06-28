import React, { useState } from "react";
import { Sparkles, CalendarCheck, ShieldCheck, Heart, UserCheck } from "lucide-react";

export default function InteractiveDial() {
  const [activeSegment, setActiveSegment] = useState<number>(0);

  const keyAdvantages = [
    {
      title: "Easy Booking & Permits",
      icon: CalendarCheck,
      details: "Adi Kailash Tirath offers an absolute offline-to-online streamlined booking system. We process every paperwork piece, including military Outer Line authorizations, medical certifications, and fast-track inner route passes within 48 to 72 hours of registration."
    },
    {
      title: "Customized Health Itineraries",
      icon: Heart,
      details: "We don't believe in rushed journeys. All high-altitude itineraries feature 2 mandatory rest nights at scenic heights of Dharchula and Pithoragarh to stabilize blood-oxygen levels, paired with daily oxygen checks and gentle packing tutorials."
    },
    {
      title: "Expert Native Tour Managers",
      icon: UserCheck,
      details: "Our group tour coordinators are veterans who have crossed Lipulekh and Gunji over 50 times. They speak Hindi, English, and regional Kumaoni dialects to manage every checkpoint, bhandara meal, and local sherpa resource on your behalf."
    },
    {
      title: "Oxygen Sealed Safe Transit",
      icon: ShieldCheck,
      details: "High terrain requires vehicle compliance. Our fleet of 4x4 rugged SUVs is equipped with fixed large-format oxygen cylinders, portable canisters, high-end satellite GPS tags, and cold-insulated suspensions for complete passenger safety."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-sky-50 via-sky-100/30 to-white dark:from-zinc-950 dark:via-sky-900/10 dark:to-[#0b1120] border-t border-slate-200/50 dark:border-slate-800/60/50 px-4 select-none">
      <div className="max-w-full w-full mx-auto px-4 md:px-8">
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <span className="text-sky-500 font-mono text-xs font-bold uppercase tracking-[0.25em]">
            TRUSTED COMPANION FOR LIFETIME
          </span>
          <h2 className="font-serif text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-100 dark:via-slate-300 dark:to-zinc-100 font-extrabold tracking-tight">
            Why Choose Adi Kailash Tirath?
          </h2>
          <div className="h-0.5 w-[80%] md:w-[60%] max-w-2xl bg-gradient-to-r from-sky-600 to-blue-500 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Centered Dial Element */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] lg:w-[480px] lg:h-[480px] xl:w-[500px] xl:h-[500px] rounded-full border border-slate-200/80 dark:border-slate-800/60/80 bg-slate-100/40 dark:bg-[#0f172a]/40 p-4 flex items-center justify-center shadow-2xl shrink-0">
              
              {/* Outer Glowing Interactive Ring */}
              <div 
                className="absolute inset-0 rounded-full border border-sky-500/20 transition-transform duration-1000 ease-out flex items-center justify-center"
                style={{ transform: `rotate(${activeSegment * 90}deg)` }}
              >
                {/* Circular positions for segments */}
                <div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-sky-500 bg-white dark:bg-[#0b1120] p-2 sm:p-3 md:p-4 rounded-full border border-sky-500/30 shadow-md transition-transform duration-1000 ease-out"
                  style={{ transform: `translateX(-50%) rotate(${-activeSegment * 90}deg)` }}
                >
                  <CalendarCheck className="h-5 w-5 md:h-7 md:w-7" />
                </div>
                <div 
                  className="absolute -right-4 top-1/2 -translate-y-1/2 text-blue-500 bg-white dark:bg-[#0b1120] p-2 sm:p-3 md:p-4 rounded-full border border-blue-500/30 shadow-md transition-transform duration-1000 ease-out"
                  style={{ transform: `translateY(-50%) rotate(${-activeSegment * 90}deg)` }}
                >
                  <Heart className="h-5 w-5 md:h-7 md:w-7" />
                </div>
                <div 
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-yellow-500 bg-white dark:bg-[#0b1120] p-2 sm:p-3 md:p-4 rounded-full border border-yellow-500/30 shadow-md transition-transform duration-1000 ease-out"
                  style={{ transform: `translateX(-50%) rotate(${-activeSegment * 90}deg)` }}
                >
                  <UserCheck className="h-5 w-5 md:h-7 md:w-7" />
                </div>
                <div 
                  className="absolute -left-4 top-1/2 -translate-y-1/2 text-red-500 bg-white dark:bg-[#0b1120] p-2 sm:p-3 md:p-4 rounded-full border border-red-500/30 shadow-md transition-transform duration-1000 ease-out"
                  style={{ transform: `translateY(-50%) rotate(${-activeSegment * 90}deg)` }}
                >
                  <ShieldCheck className="h-5 w-5 md:h-7 md:w-7" />
                </div>
              </div>

              {/* Inner Circle displaying the logo */}
              <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] xl:w-[380px] xl:h-[380px] rounded-full border-2 border-sky-500/30 shadow-inner relative z-10 overflow-hidden shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Logo" 
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Details Column describing choice elements */}
          <div className="lg:col-span-6 flex flex-col gap-4 text-left">
            <p className="text-slate-900 dark:text-slate-100 text-sm leading-relaxed mb-2">
              With deep Himalayan connections and experienced high-altitude operations, we guarantee a safe, pious, and seamless spiritual experience. Click any advantage to learn more:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4">
              {keyAdvantages.map((adv, idx) => {
                const Icon = adv.icon;
                const isActive = activeSegment === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSegment(idx)}
                    onMouseEnter={() => setActiveSegment(idx)}
                    className={`p-3 md:p-5 rounded-xl md:rounded-2xl border text-left group transition duration-300 flex flex-col gap-2 md:gap-3 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-br from-sky-600/10 to-transparent border-sky-500/40 shadow-xl shadow-sky-500/5 text-slate-900 dark:text-white"
                        : "bg-slate-100/50 dark:bg-[#0f172a]/50 border-slate-300/60 dark:border-slate-700/60/60 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-[#0f172a] hover:border-slate-300 dark:border-slate-700/60"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-2 md:items-center">
                      <div className={`p-1.5 md:p-2 rounded-lg self-start md:self-auto transition-transform duration-700 group-hover:rotate-[360deg] ${
                        isActive 
                          ? "bg-sky-500/15 text-sky-500 border border-sky-500/25" 
                          : "bg-white dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 group-hover:text-sky-500"
                      }`}>
                        <Icon className="h-4 w-4 md:h-5 md:w-5" />
                      </div>
                      <h4 className={`font-serif font-bold text-[11px] leading-tight md:text-sm ${isActive ? "text-sky-500" : "text-slate-900 dark:text-slate-100"}`}>
                        {adv.title}
                      </h4>
                    </div>
                    {/* Always show details instead of only when isActive */}
                    <p className="text-slate-900 dark:text-slate-100 text-[9.5px] md:text-xs leading-relaxed mt-1 pb-1">
                      {adv.details}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
