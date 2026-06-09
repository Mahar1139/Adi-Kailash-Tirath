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
    <section className="py-16 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-sm border-t border-slate-200/50 dark:border-zinc-800/50 px-4 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <span className="text-sky-500 font-mono text-xs font-bold uppercase tracking-[0.25em]">
            TRUSTED COMPANION FOR LIFETIME
          </span>
          <h2 className="font-serif text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 font-extrabold tracking-tight">
            Why Choose Adi Kailash Tirath?
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-sky-600 to-blue-500 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Centered Dial Element */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <p className="text-[10px] font-mono tracking-widest text-slate-900 dark:text-zinc-100 uppercase mb-4">
              TAP OR CLICK SEGMENTS TO SPIN
            </p>

            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full border border-slate-200/80 dark:border-zinc-800/80 bg-slate-100/40 dark:bg-zinc-900/40 p-4 flex items-center justify-center shadow-2xl">
              
              {/* Outer Glowing Interactive Ring */}
              <div 
                className="absolute inset-0 rounded-full border border-sky-500/20 transition-transform duration-1000 ease-out flex items-center justify-center"
                style={{ transform: `rotate(${activeSegment * 90}deg)` }}
              >
                {/* Circular positions for segments */}
                <div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-sky-500 bg-white dark:bg-zinc-950 p-2 rounded-full border border-sky-500/30 shadow-md transition-transform duration-1000 ease-out"
                  style={{ transform: `translateX(-50%) rotate(${-activeSegment * 90}deg)` }}
                >
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <div 
                  className="absolute -right-4 top-1/2 -translate-y-1/2 text-blue-500 bg-white dark:bg-zinc-950 p-2 rounded-full border border-blue-500/30 shadow-md transition-transform duration-1000 ease-out"
                  style={{ transform: `translateY(-50%) rotate(${-activeSegment * 90}deg)` }}
                >
                  <Heart className="h-5 w-5" />
                </div>
                <div 
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-yellow-500 bg-white dark:bg-zinc-950 p-2 rounded-full border border-yellow-500/30 shadow-md transition-transform duration-1000 ease-out"
                  style={{ transform: `translateX(-50%) rotate(${-activeSegment * 90}deg)` }}
                >
                  <UserCheck className="h-5 w-5" />
                </div>
                <div 
                  className="absolute -left-4 top-1/2 -translate-y-1/2 text-red-500 bg-white dark:bg-zinc-950 p-2 rounded-full border border-red-500/30 shadow-md transition-transform duration-1000 ease-out"
                  style={{ transform: `translateY(-50%) rotate(${-activeSegment * 90}deg)` }}
                >
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>

              {/* Inner Circle displaying the sacred OM */}
              <div className="w-52 h-52 md:w-56 md:h-56 rounded-full bg-white dark:bg-zinc-950 border-2 border-sky-500/30 flex flex-col items-center justify-center p-6 text-center shadow-inner relative z-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-600/5 via-transparent to-blue-500/5 animate-pulse" />
                <img 
                  src="/logo.jpg" 
                  alt="Logo" 
                  className="w-24 h-24 rounded-full border-2 border-sky-500/40 object-contain bg-white dark:bg-zinc-950 mt-2 shadow-lg cursor-pointer"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[9.5px] font-mono tracking-widest text-blue-500 uppercase font-bold mt-4">
                  SATYAM SHIVAM
                </span>
                <span className="text-[8px] font-serif text-slate-900 dark:text-zinc-100 italic mt-0.5">
                  "Truth, Auspiciousness, Beauty"
                </span>
              </div>
            </div>
          </div>

          {/* Details Column describing choice elements */}
          <div className="lg:col-span-6 flex flex-col gap-4 text-left">
            <p className="text-slate-900 dark:text-zinc-100 text-sm leading-relaxed mb-2">
              With deep Himalayan connections and experienced high-altitude operations, we guarantee a safe, pious, and seamless spiritual experience. Click any advantage to learn more:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyAdvantages.map((adv, idx) => {
                const Icon = adv.icon;
                const isActive = activeSegment === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSegment(idx)}
                    className={`p-5 rounded-2xl border text-left group transition duration-300 flex flex-col gap-3 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-br from-sky-600/10 to-transparent border-sky-500/40 shadow-xl shadow-sky-500/5 text-white"
                        : "bg-slate-100/50 dark:bg-zinc-900/50 border-slate-300/60 dark:border-zinc-700/60 text-slate-900 dark:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 dark:bg-zinc-900 hover:border-slate-300 dark:border-zinc-700"
                    }`}
                  >
                    <div className="flex gap-2 items-center">
                      <div className={`p-2 rounded-lg ${
                        isActive 
                          ? "bg-sky-500/15 text-sky-400 border border-sky-500/25" 
                          : "bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 group-hover:text-sky-400"
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className={`font-serif font-bold text-sm ${isActive ? "text-sky-400" : "text-slate-900 dark:text-slate-900"}`}>
                        {adv.title}
                      </h4>
                    </div>
                    {isActive && (
                      <p className="text-slate-900 dark:text-zinc-100 text-xs leading-relaxed animate-in fade-in duration-500 mt-1 pb-1">
                        {adv.details}
                      </p>
                    )}
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
