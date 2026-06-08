import React, { useState } from "react";
import { YatraPackage } from "../types";
import { X, Calendar, MapPin, Activity, CheckCircle, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

interface DetailedModalProps {
  pkg: YatraPackage;
  onClose: () => void;
  onConfirmBooking: (packageName: string) => void;
  currentLanguage?: string;
}

const LOCALIZED_LABELS: { [lang: string]: { [key: string]: string } } = {
  en: {
    category: "Category",
    pathway: "DAY-BY-DAY SACRED PATHWAY",
    altitudeNotice: "ALTITUDE ADHERENCE NOTICE:",
    altitudeDesc: "This sacred circuit rises above designated thresholds. Physical checkups, biometric permit authorizations, and pre-loading local hydration are legally mandatory to perform standard parikrama loops.",
    included: "🗹 SERVICES INCLUDED",
    excluded: "☒ SERVICES EXCLUDED",
    estimatedTotal: "ESTIMATED CARAVAN TOTAL",
    maxPilgrims: "Max 12 Pilgrims/Batch",
    proceed: "PROCEED TO BOOKING PLANNER",
    day: "Day"
  },
  hi: {
    category: "श्रेणी",
    pathway: "दैनिक पावन यात्रा कार्यक्रम",
    altitudeNotice: "ऊंचाई स्वास्थ्य परामर्श सूचना:",
    altitudeDesc: "यह पवित्र मार्ग निर्धारित ऊंचाई सीमा से ऊपर जाता है। परिक्रमा करने के लिए शारीरिक जांच, बायोमेट्रिक परमिट सत्यापन और जल स्तर बनाए रखना कानूनी रूप से अनिवार्य है।",
    included: "🗹 शामिल सेवाएं",
    excluded: "☒ शामिल नहीं सेवाएं",
    estimatedTotal: "अनुमानित कुल लागत",
    maxPilgrims: "अधिकतम १२ यात्री/बैच",
    proceed: "बुकिंग प्लानर पर आगे बढ़ें",
    day: "दिन"
  },
  ta: {
    category: "வகை",
    pathway: "தினசரி புனித யாத்திரை திட்டம்",
    altitudeNotice: "உயரமான பகுதி பாதுகாப்பு அறிவிப்பு:",
    altitudeDesc: "இந்த पवित्रப்பாதை குறிப்பிட்ட வரம்புகளுக்கு மேல் உயர்கிறது. முறையான உடற்பயிற்சி சோதனைகள் மற்றும் அனுமதி பத்திரம் மிகவும் கட்டாயமாகும்.",
    included: "🗹 சேவைகளும் வசதிகளும் சேர்க்கப்பட்டுள்ளன",
    excluded: "☒ சேர்க்கப்படாத கட்டணங்கள்",
    estimatedTotal: "மதிப்பிடப்பட்ட மொத்த கட்டணம்",
    maxPilgrims: "ஒரு குழுவிற்கு அதிகபட்சம் 12 பக்தர்கள்",
    proceed: "முன்பதிவு பக்கத்திற்குச் செல்லவும்",
    day: "நாள்"
  },
  te: {
    category: "వర్గం",
    pathway: "దినసరి పవిత్ర యాత్రా ప్రణాళిక",
    altitudeNotice: "ఎత్తైన ప్రాంతాల రక్షణ సూచన:",
    altitudeDesc: "ఈ పవిత్ర యాత్రా మార్గం నిర్దేశిత ఎత్తు కంటే ఎత్తులో ఉంటుంది. శారీరక పరీక్షలు మరియు బయోమెట్రిక్ అనుమతులు తప్పనిసరి.",
    included: "🗹 చేర్చబడిన సేవలు",
    excluded: "☒ చేర్చబడని సేవలు",
    estimatedTotal: "అంచనా మొత్తం価格",
    maxPilgrims: "గరిష్టంగా 12 మంది భక్తులు/బ్యాచ్",
    proceed: "బుకింగ్ ప్లానర్ లోనికి వెళ్ళండి",
    day: "రోజు"
  },
  gu: {
    category: "શ્રેણી",
    pathway: "દૈનિક પાવન યાત્રા કાર્યક્રમ",
    altitudeNotice: "ઊંચાઈ આરોગ્ય પરામર્શ સૂચના:",
    altitudeDesc: "આ પવિત્ર ક્ષેત્ર નિર્ધારિત ઊંચાઈ સીમાથી ઉપર જાય છે. પરિક્રમા કરવા માટે શારીરિક તપાસ અને બાયોમેટ્રિક પરમિટ ફરજિયાત છે.",
    included: "🗹 સમાવિષ્ટ સેવાઓ",
    excluded: "☒ બાકાત સેવાઓ",
    estimatedTotal: "અંદાજિત કુલ ખર્ચ",
    maxPilgrims: "મહત્તમ ૧૨ યાત્રીઓ/બેચ",
    proceed: "બુકિંગ પ્લાનર પર આગળ વધો",
    day: "દિવસ"
  },
  pa: {
    category: "ਸ਼੍ਰੇਣੀ",
    pathway: "ਰੋਜ਼ਾਨਾ ਪਵਿੱਤਰ ਯਾਤਰਾ ਪ੍ਰੋਗਰਾਮ",
    altitudeNotice: "ਉਚਾਈ ਸਿਹਤ ਸੰਬੰਧੀ ਸਲਾਹ:",
    altitudeDesc: "ਇਹ ਪਵਿੱਤਰ ਮਾਰਗ ਨਿਰਧਾਰਤ ਉਚਾਈ ਸੀਮਾ ਤੋਂ ਉੱਪਰ ਜਾਂਦਾ ਹੈ। ਪਰਿਕਰਮਾ ਕਰਨ ਲਈ ਸਿਹਤ ਜਾਂਚ ਅਤੇ ਬਾਇਓਮੈਟ੍ਰਿਕ ਪਰਮਿਟ ਲਾਜ਼ਮੀ ਹਨ।",
    included: "🗹 ਸ਼ਾਮਲ ਸੇਵਾਵਾਂ",
    excluded: "☒ ਗੈਰ-ਸ਼ਾਮਲ ਸੇਵਾਵਾਂ",
    estimatedTotal: "ਅਨੁਮਾਨਿਤ ਕੁੱਲ ਖਰਚਾ",
    maxPilgrims: "ਵੱਧ ਤੋਂ ਵੱਧ 12 ਯਾਤਰੀ/ਬੈਚ",
    proceed: "ਬੁਕਿੰਗ ਯੋਜਨਾਕਾਰ 'ਤੇ ਜਾਓ",
    day: "ਦਿਨ"
  }
};

export default function DetailedModal({ pkg, onClose, onConfirmBooking, currentLanguage = "en" }: DetailedModalProps) {
  const [activeDay, setActiveDay] = useState<number>(1);
  const labels = LOCALIZED_LABELS[currentLanguage] || LOCALIZED_LABELS["en"];

  return (
    <div className="fixed inset-0 z-50 bg-slate-50/85 dark:bg-zinc-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto select-none">
      <div className="bg-white dark:bg-zinc-950 border border-slate-300/85 dark:border-zinc-700/85 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col my-8 animate-in zoom-in-95 duration-200">
        
        {/* Banner with Close button */}
        <div className="relative h-64 md:h-80 bg-slate-100 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800">
          <img
            src={pkg.imageUrl}
            alt={pkg.title}
            className="w-full h-full object-cover brightness-[0.55]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
          
          {/* Close Trigger */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-50/60 dark:bg-zinc-950/60 rounded-full text-slate-700 dark:text-zinc-300 hover:text-white hover:bg-orange-655 transition cursor-pointer border border-slate-200 dark:border-zinc-800"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          {/* Sub titles overlays */}
          <div className="absolute bottom-6 left-6 right-6 text-left">
            <span className="bg-orange-600 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded mb-2.5 inline-block">
              {pkg.badge}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight leading-tighter">
              {pkg.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-700 dark:text-zinc-300 mt-3 border-t border-slate-200/60 dark:border-zinc-800/60 pt-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-orange-500" />
                {pkg.duration}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-600 self-center" />
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-orange-500" />
                {pkg.fromRoute}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-600 self-center" />
              <span className="flex items-center gap-1">
                <Activity className="h-4 w-4 text-orange-500" />
                {pkg.difficulty} {labels.category}
              </span>
            </div>
          </div>
        </div>

        {/* Content body split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[450px] overflow-y-auto">
          
          {/* Left Column: Itinerary Details */}
          <div className="lg:col-span-7 p-6 text-left border-r border-slate-300 dark:border-zinc-700 flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-mono text-orange-500 tracking-wider font-bold uppercase border-b border-slate-300 dark:border-zinc-700 pb-2 mb-3">
                {labels.pathway}
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed mb-4">
                {pkg.overview}
              </p>
            </div>

            {/* Itinerary Selector path */}
            <div className="flex gap-2 border-b border-slate-300 dark:border-zinc-700 overflow-x-auto pb-2 mb-2 scrollbar-none">
              {pkg.itinerary.map((it) => (
                <button
                  key={it.day}
                  type="button"
                  onClick={() => setActiveDay(it.day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition shrink-0 cursor-pointer ${
                    activeDay === it.day
                      ? "bg-orange-600 text-white"
                      : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:text-zinc-200"
                  }`}
                >
                  {labels.day} {it.day}
                </button>
              ))}
            </div>

            {/* Active Day Content */}
            {pkg.itinerary.map((it) => {
              if (it.day !== activeDay) return null;
              return (
                <div key={it.day} className="bg-slate-100/40 dark:bg-zinc-900/40 p-4 rounded-xl border border-slate-200/60 dark:border-zinc-800/60 animate-in fade-in-50 duration-300 text-left">
                  <h4 className="font-serif text-sm font-bold text-orange-450 flex items-center gap-1.5 leading-tight">
                    <span className="font-mono text-xs bg-orange-600/20 px-2 py-0.5 rounded text-orange-400">{labels.day.toUpperCase()} {it.day}</span>
                    {it.title}
                  </h4>
                  <p className="text-slate-700 dark:text-zinc-300 text-xs leading-relaxed mt-2.5 bg-white dark:bg-zinc-950 p-3 rounded-lg border border-slate-300/60 dark:border-zinc-700/60 font-sans select-text">
                    {it.details}
                  </p>
                </div>
              );
            })}

            {/* Quick health/altitude checks */}
            <div className="bg-amber-600/5 p-4 rounded-xl border border-amber-500/20 text-left">
              <span className="text-[10px] font-mono tracking-wider font-bold text-amber-500 uppercase flex items-center gap-1">
                <AlertCircle className="h-4.5 w-4.5 text-amber-500" />
                {labels.altitudeNotice}
              </span>
              <p className="text-slate-600 dark:text-zinc-400 text-xs mt-1.5 leading-relaxed">
                {labels.altitudeDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Inclusions, Exclusions & Instant Booking action */}
          <div className="lg:col-span-5 p-6 bg-white/40 dark:bg-zinc-950/40 text-left flex flex-col justify-between gap-6 border-t lg:border-t-0 border-slate-300 dark:border-zinc-700">
            
            {/* Inclusions */}
            <div>
              <h4 className="text-xs font-mono text-slate-600 dark:text-zinc-400 tracking-wider font-bold uppercase pb-1.5 border-b border-slate-300 dark:border-zinc-700 mb-3">
                {labels.included}
              </h4>
              <ul className="space-y-1.5">
                {pkg.inclusion.map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-zinc-300 leading-tight">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div>
              <h4 className="text-xs font-mono text-slate-600 dark:text-zinc-400 tracking-wider font-bold uppercase pb-1.5 border-b border-slate-300 dark:border-zinc-700 mb-3">
                {labels.excluded}
              </h4>
              <ul className="space-y-1.5">
                {pkg.exclusion.map((ex, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-zinc-400 leading-tight">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Booking action */}
            <div className="pt-4 border-t border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 flex flex-col gap-2">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-450 block uppercase">{labels.estimatedTotal}</span>
                  <span className="text-2xl font-mono text-orange-400 font-bold leading-none">{pkg.price}</span>
                </div>
                <span className="bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-[10px] text-slate-600 dark:text-zinc-400 font-mono px-2 py-1 rounded">
                  {labels.maxPilgrims}
                </span>
              </div>
              <button
                onClick={() => {
                  onConfirmBooking(pkg.title);
                  onClose();
                }}
                className="w-full bg-orange-600 hover:bg-orange-555 text-white font-mono text-xs font-bold py-3.5 rounded-lg shadow-lg shadow-orange-600/10 border border-orange-500/20 hover:scale-[1.01] transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-amber-300" />
                {labels.proceed.toUpperCase()}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
