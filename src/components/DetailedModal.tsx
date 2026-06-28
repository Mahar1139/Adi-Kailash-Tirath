import React, { useState } from "react";
import { YatraPackage } from "../types";
import { X, Calendar, MapPin, Activity, CheckCircle, AlertCircle, ArrowRight, Sparkles, ArrowLeft } from "lucide-react";

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
  const labels = LOCALIZED_LABELS[currentLanguage] || LOCALIZED_LABELS["en"];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] overflow-hidden select-none p-0 flex items-center justify-center">
      <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col bg-slate-50 dark:bg-[#0b1120]/95 animate-in slide-in-from-bottom duration-300 shadow-2xl relative">
        
        {/* Sticky Header with Back Button */}
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#0b1120]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/60/80">
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between p-3 md:p-4">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 text-slate-900 dark:text-slate-100 text-sm font-semibold tracking-wide hover:bg-slate-100 dark:hover:bg-zinc-900 rounded-lg transition cursor-pointer select-none"
            >
              <ArrowLeft className="h-4 w-4" />
              {currentLanguage === "hi" ? "वापस जाएँ" : "Back"}
            </button>

            {/* Close Trigger (Right) */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-rose-600 transition cursor-pointer hidden md:flex"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Banner */}
        <div className="relative h-72 md:h-[450px] bg-slate-100 dark:bg-[#0f172a] shrink-0 overflow-hidden">
          <img
            src={pkg.imageUrl}
            alt={pkg.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Title Section Below Banner */}
        <div className="bg-slate-50 dark:bg-[#0b1120] border-b border-slate-200 dark:border-slate-800/60 pt-6 pb-6 md:pt-8 md:pb-8">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-8 text-left">
              <span className="bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-3 inline-block">
                {pkg.badge}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {pkg.title}
              </h2>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-600 dark:text-slate-400 mt-4 border-t border-slate-200 dark:border-slate-800/60 pt-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-sky-600 dark:text-sky-500" />
                  {pkg.duration}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 self-center" />
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-sky-600 dark:text-sky-500" />
                  {pkg.fromRoute}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 self-center" />
                <span className="flex items-center gap-1">
                  <Activity className="h-4 w-4 text-sky-600 dark:text-sky-500" />
                  {pkg.difficulty} {labels.category}
                </span>
              </div>
            </div>
        </div>

        {/* Content body split */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 flex-grow">
          
          {/* Left Column: Itinerary Details */}
          <div className="lg:col-span-7 p-6 text-left border-r border-slate-300 dark:border-slate-700/60 flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-mono text-sky-500 tracking-wider font-bold uppercase border-b border-slate-300 dark:border-slate-700/60 pb-2 mb-3">
                {labels.pathway}
              </h3>
              <p className="text-slate-900 dark:text-slate-100 text-xs leading-relaxed mb-4">
                {pkg.overview}
              </p>
            </div>

            {/* Itinerary List */}
            <div className="flex flex-col gap-4 mt-4">
              {pkg.itinerary.map((it) => (
                <div key={it.day} className="bg-slate-100/40 dark:bg-[#0f172a]/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60/60 text-left">
                  <h4 className="font-serif text-sm font-bold text-sky-450 flex items-center gap-1.5 leading-tight">
                    <span className="font-mono text-xs bg-sky-600/20 px-2 py-0.5 rounded text-sky-400">{labels.day.toUpperCase()} {it.day}</span>
                    {it.title}
                  </h4>
                  <p className="text-slate-900 dark:text-slate-100 text-xs leading-relaxed mt-2.5 bg-white dark:bg-[#0b1120] p-3 rounded-lg border border-slate-300/60 dark:border-slate-700/60/60 font-sans select-text">
                    {it.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick health/altitude checks */}
            <div className="bg-blue-600/5 p-4 rounded-xl border border-blue-500/20 text-left">
              <span className="text-[10px] font-mono tracking-wider font-bold text-blue-500 uppercase flex items-center gap-1">
                <AlertCircle className="h-4.5 w-4.5 text-blue-500" />
                {labels.altitudeNotice}
              </span>
              <p className="text-slate-900 dark:text-slate-100 text-xs mt-1.5 leading-relaxed">
                {labels.altitudeDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Inclusions, Exclusions & Instant Booking action */}
          <div className="lg:col-span-5 p-6 bg-gradient-to-br from-sky-50/50 to-white/80 dark:from-sky-950/20 dark:to-[#0b1120] text-left flex flex-col justify-between gap-6 border-t lg:border-l lg:border-t-0 border-slate-300 dark:border-slate-700/60">
            
            {/* Inclusions */}
            <div>
              <h4 className="text-xs font-mono text-slate-900 dark:text-slate-100 tracking-wider font-bold uppercase pb-1.5 border-b border-slate-300 dark:border-slate-700/60 mb-3">
                {labels.included}
              </h4>
              <ul className="space-y-1.5">
                {pkg.inclusion.map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-slate-900 dark:text-slate-100 leading-tight">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div>
              <h4 className="text-xs font-mono text-slate-900 dark:text-slate-100 tracking-wider font-bold uppercase pb-1.5 border-b border-slate-300 dark:border-slate-700/60 mb-3">
                {labels.excluded}
              </h4>
              <ul className="space-y-1.5">
                {pkg.exclusion.map((ex, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-slate-900 dark:text-slate-100 leading-tight">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Booking action */}
            <div className="pt-4 border-t border-slate-300 dark:border-slate-700/60 bg-white dark:bg-[#0b1120] flex flex-col gap-2">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-900 dark:text-slate-100 block uppercase">{labels.estimatedTotal}</span>
                  <span className="text-2xl font-mono text-sky-400 font-bold leading-none">
                    {pkg.price.replace(/\/?\s*(per person|per pax|\/person|\/pax|व्यક્તિ|व्यक्ति)/i, '').trim()} <span className="text-sm">/person</span>
                  </span>
                </div>
                <span className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-[10px] text-slate-900 dark:text-slate-100 font-mono px-2 py-1 rounded">
                  {labels.maxPilgrims}
                </span>
              </div>
              <button
                onClick={() => {
                  onConfirmBooking(pkg.title);
                  onClose();
                }}
                className="w-full bg-sky-600 hover:bg-sky-555 text-white font-mono text-xs font-bold py-3.5 rounded-lg shadow-lg shadow-sky-600/10 border border-sky-500/20 hover:scale-[1.01] transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-blue-300" />
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
