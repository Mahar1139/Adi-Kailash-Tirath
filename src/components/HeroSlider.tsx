import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, MapPin, ShieldCheck, HelpCircle } from "lucide-react";
import { t } from "../utils/lang";

interface HeroSliderProps {
  onExplorePackages: () => void;
  onOpenConsultant: () => void;
  siteData?: any;
  currentLanguage?: string;
}

export default function HeroSlider({ onExplorePackages, onOpenConsultant, siteData, currentLanguage = "en" }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  // Localized Slides fallback to offer pristine translations in selected language script
  const slideTranslations: { [lang: string]: Array<{ title: string; subtitle: string; desc: string; pill: string; stat: string }> } = {
    en: [
      {
        title: "Travel Where Spirit Meets The Himalaya",
        subtitle: "Kailash Mansarovar Yatra",
        desc: "Adi Kailash Tirath curates spiritually meaningful journeys with clear planning, trusted stays, permit guidance, and dedicated mountain-ground support from departure to return.",
        pill: "Vyas Valley & Himalayas 2026",
        stat: "Altitude 18,000 ft+"
      },
      {
        title: "Experience the Divine Mystery of Snow Symbolism",
        subtitle: "Adi Kailash & Om Parvat",
        desc: "Watch the holy self-formed divine Om symbol appear naturally in pristine white snow. Explore Parvati Kund, Gauri Kund, and the source of Vyas valley spirituality accompanied by seasoned native sherpas.",
        pill: "Border Region Authorized Partner",
        stat: "100% Permit Success Rate"
      },
      {
        title: "The Ultimate Four Abodes of the Deities",
        subtitle: "Classics of Chardham",
        desc: "An all-inclusive, divine expedition covering Yamunotri, Gangotri, Kedarnath, and Badrinath. Relax in pre-vetted warm riverside cottages with healthy pure organic vegetarian cuisine.",
        pill: "Complete Kedarnath-Badrinath Ring",
        stat: "500+ Devotees Guided Yearly"
      }
    ],
    hi: [
      {
        title: "वहां जाएं जहां आत्मा हिमालय से मिलती है",
        subtitle: "कैलाश मानसरोवर यात्रा",
        desc: "आदि कैलाश तीर्थ प्रस्थान से लेकर वापसी तक स्पष्ट योजना, विश्वसनीय प्रवास, परमिट मार्गदर्शन और समर्पित जमीनी सहायता प्रदान करता है।",
        pill: "व्यास घाटी एवं हिमालय 2026",
        stat: "ऊंचाई 18,000 फीट+"
      },
      {
        title: "बर्फ के प्राकृतिक ओम प्रतीक का दर्शन करें",
        subtitle: "आदि कैलाश और ओम पर्वत",
        desc: "पवित्र बर्फ में प्राकृतिक रूप से बने दिव्य ओम प्रतीक के दर्शन करें। अनुभवी स्थानीय शेरपाओं के साथ पार्वती कुंड, गौरी कुंड का अन्वेषण करें।",
        pill: "सीमा क्षेत्र अधिकृत टूर पार्टनर",
        stat: "100% परमिट सफलता दर"
      },
      {
        title: "देवताओं के चार पवित्र परम पावन धाम",
        subtitle: "क्लासिक चारधाम यात्रा",
        desc: "यमुनोत्री, गंगोत्तरी, केदारनाथ और बद्रीनाथ को कवर करने वाला सर्व-समावेशी, दिव्य अभियान। स्वस्थ पहाड़ी शुद्ध शाकाहारी भोजन का आनंद लें।",
        pill: "केदारनाथ-बद्रीनाथ रिंग पूर्ण",
        stat: "प्रतिवर्ष 500+ भक्त मार्गदर्शित"
      }
    ],
    ta: [
      {
        title: "ஆன்மா இமயமலையைச் சந்திக்கும் இடத்திற்குப் பயணம் செய்யுங்கள்",
        subtitle: "கைலாஷ் மானசரோவர் யாத்திரை",
        desc: "நாகார்ஜுனா டிராவல்ஸ் தெளிவான திட்டமிடல், நம்பகமான தங்குமிடங்கள், அனுமதி வழிகாட்டுதல் மற்றும் பிரத்யேக மலை ஆதரவுடன் ஆன்மீக பயணங்களை ஏற்பாடு செய்கிறது.",
        pill: "வியாஸ் பள்ளத்தாக்கு & இமயமலை 2026",
        stat: "உயரம் 18,000 அடி+"
      },
      {
        title: "பனியில் சுயம்புவாகத் தோன்றும் ஓம் சின்னத்தின் தரிசனம்",
        subtitle: "ஆதி கைலாசம் & ஓம் பர்வதம்",
        desc: "தூய பனியில் சுயம்புவாகத் தோன்றும் புனித ஓம் சின்னத்தைக் காணுங்கள். அனுபவம் வாய்ந்த வழிகாட்டிகளுடன் பார்வதி குண்ட் மற்றும் கௌரி குண்டுகளை ஆராயுங்கள்.",
        pill: "எல்லைப் பகுதி அங்கீகரிக்கப்பட்ட பங்குதாரர்",
        stat: "100% அனுமதி வெற்றி விகிதம்"
      },
      {
        title: "தெய்வங்களின் உன்னதமான நான்கு புனித இடங்கள்",
        subtitle: "சார் தாம் யாத்திரை",
        desc: "யமுனோத்ரி, கங்கோத்ரி, கேதார்நாத் மற்றும் பத்ரிநாத் ஆகியவற்றை உள்ளடக்கிய அனைத்தையும் உள்ளடக்கிய ஆன்மீகப் பயணம். ஆரோக்கியமான சைவ உணவை அனுபவிக்கவும்.",
        pill: "முழுமையான கேதார்நாத்-பத்ரிநாத் சுற்று",
        stat: "ஆண்டுதோறும் 500+ பக்தர்கள்"
      }
    ],
    te: [
      {
        title: "ఆత్మ హిమాలయాలను కలిసే చోటికి ప్రయాణం",
        subtitle: "కైలాస మానససరోవరం",
        desc: "నాగార్జున ట్రావెల్స్ స్పష్టమైన ప్రణాళిక, విశ్వసనీయ నివాసాలు, అనుమతి మార్గదర్శకత్వం మరియు అంకితమైన పర్వత సహాయంతో ఆధ్యాత్మిక యాత్రలను నిర్వహిస్తుంది.",
        pill: "వ్యాస్ వ్యాలీ & హిమాలయాలు 2026",
        stat: "ఎత్తు 18,000 అడుగులు+"
      },
      {
        title: "మంచులో స్వయంభువుగా వెలిసిన ఓం చిహ్నం దర్శనం",
        subtitle: "ఆది కైలాసం & ఓం పర్వతం",
        desc: "పవిత్రమైన మంచులో సహజంగా ఏర్పడిన ఓం చిహ్నాన్ని వీక్షించండి. అనుభవజ్ఞులైన గైడ్‌లతో పార్వతీ కుండ్ మరియు గౌరీ కుండ్‌లను అన్వేషించండి.",
        pill: "సరిహద్దు ప్రాంత అధికారిక యాత్రా భాగస్వామి",
        stat: "100% అనుమతి విజయవంతం"
      },
      {
        title: "దేవతల పరమ పవిత్రమైన నాలుగు ధామాలు",
        subtitle: "చార్ ధామ్ ఉత్తరాఖండ్",
        desc: "యమునోత్రి, గంగోత్రి, కేదార్‌నాథ్ మరియు బద్రీనాథ్‌లను కవర్ చేసే సంపూర్ణ ఆధ్యాత్మిక యాత్ర. పరిశుభ్రమైన సాత్విక భోజనం అందించబడును.",
        pill: "కేదార్‌నాథ్-బద్రీనాథ్ యాత్ర పూర్తి",
        stat: "ఏటా 500+ భక్తులకు సేవలు"
      }
    ],
    gu: [
      {
        title: "જ્યાં આત્મા હિમાલયને મળે છે ત્યાં પ્રવાસ કરો",
        subtitle: "કૈલાશ માનસરોવર યાત્રા",
        desc: "નાગાર્જુન ટ્રાવેલ્સ પ્રસ્થાનથી પરત ફરવા સુધી સ્પષ્ટ આયોજન, પવિત્ર રહેઠાણો, પરમિટ માર્ગદર્શન અને સમર્પિત ઓન-ગ્રાઉન્ડ સેવા પૂરી પાડે છે.",
        pill: "વ્યાસ ખીણ અને હિમાલય ૨૦૨૬",
        stat: "ઊંચાઈ ૧૮,૦૦૦ ફૂટ+"
      },
      {
        title: "બરફમાં કુદરતી રીતે બનેલા દિવ્ય ઓમ પ્રતીકના દર્શન કરો",
        subtitle: "આદિ કૈલાશ અને ઓમ પર્વત",
        desc: "પવિત્ર બરફમાં સ્વયંભૂ બનેલા દિવ્ય ઓમ પ્રતીકને જુઓ. અનુભવી ગાઇડ્સ સાથે પાર્વતી કુંડ અને ગૌરી કુંડનું અન્વેષણ કરો.",
        pill: "સીમા ક્ષેત્ર અધિકૃત ટૂર પાર્ટનર",
        stat: "૧૦૦% પરમિટ સફળતા દર"
      },
      {
        title: "દેવતાઓના પરમ પવિત્ર પાવન ચાર ધામ",
        subtitle: "શાસ્ત્રોક્ત ચારધામ યાત્રા",
        desc: "યમુનોત્રી, ગંગોત્રી, કેદારનાથ અને બદ્રીનાથને આવરી લેતું આધ્યાત્મિક આયોજન. પહાડોમાં શુદ્ધ પવિત્ર શાકાહારી ભોજનનો આનંદ લો.",
        pill: "કેદારનાથ-બદ્રીનાથ રિંગ પૂર્ણ",
        stat: "દર વર્ષે ૫૦૦+ શ્રદ્ધાળુઓ"
      }
    ],
    pa: [
      {
        title: "ਉੱਥੇ ਜਾਓ ਜਿੱਥੇ ਆਤਮਾ ਹਿਮਾਲਿਆ ਨੂੰ ਮਿਲਦੀ ਹੈ",
        subtitle: "ਕੈਲਾਸ਼ ਮਾਨਸਰੋਵਰ ਯਾਤਰਾ",
        desc: "ਨਾਗਾਰਜੁਨ ਟ੍ਰੈਵਲਜ਼ ਸਪਸ਼ਟ ਯੋਜਨਾਬੰਦੀ, ਭਰੋਸੇਯੋਗ ਰਿਹਾਇਸ਼, ਪਰਮਿਟ ਮਾਰਗਦਰਸ਼ਨ ਅਤੇ ਸਮਰਪਿਤ ਪਹਾੜੀ ਸਹਾਇਤਾ ਨਾਲ ਅਧਿਆਤਮਿਕ ਯਾਤਰਾਵਾਂ ਦਾ ਪ੍ਰਬੰਧ ਕਰਦਾ ਹੈ।",
        pill: "ਵਿਆਸ ਘਾਟੀ ਅਤੇ ਹਿਮਾਲਿਆ 2026",
        stat: "ਉਚਾਈ 18,000 ਫੁੱਟ+"
      },
      {
        title: "ਬਰਫ ਵਿੱਚ ਕੁਦਰਤੀ ਤੌਰ 'ਤੇ ਬਣੇ ਓਮ ਦੇ ਚਿੰਨ੍ਹ ਦੇ ਦਰਸ਼ਨ ਕਰੋ",
        subtitle: "ਆਦਿ ਕੈਲਾਸ਼ ਅਤੇ ਓਮ ਪਰਵਤ",
        desc: "ਪਵਿੱਤਰ ਬਰਫ ਵਿੱਚ ਕੁਦਰਤੀ ਤੌਰ 'ਤੇ ਬਣੇ ਓਮ ਦੇ ਚਿੰਨ੍ਹ ਨੂੰ ਵੇਖੋ। ਤਜ਼ਰਬੇਕਾਰ ਗਾਈਡਾਂ ਨਾਲ ਪਾਰਵਤੀ ਕੁੰਡ ਅਤੇ ਗੌਰੀ ਕੁੰਡ ਦੀ ਖੋਜ ਕਰੋ।",
        pill: "ਸਰਹੱਦੀ ਖੇਤਰ ਦਾ ਅਧਿਕਾਰਤ ਭਾਈਵਾਲ",
        stat: "100% ਪਰਮਿਟ ਸਫਲਤਾ ਦਰ"
      },
      {
        title: "ਦੇਵਤਿਆਂ ਦੇ ਚਾਰ ਪਰਮ ਪਵਿੱਤਰ ਧਾਮ",
        subtitle: "ਕਲਾਸਿਕ ਚਾਰਧਾਮ ਯਾਤਰਾ",
        desc: "ਯਮੁਨੋਤਰੀ, ਗੰਗੋਤਰੀ, ਕੇਦਾਰਨਾਥ ਅਤੇ ਬਦਰੀਨਾਥ ਨੂੰ ਕਵਰ ਕਰਨ ਵਾਲੀ ਇੱਕ ਸੰਪੂਰਨ ਅਧਿਆਤਮਿਕ ਯਾਤਰਾ। ਸ਼ੁੱਧ ਸ਼ਾਕਾਹਾਰੀ ਭੋਜਨ ਦਾ ਅਨੰਦ ਲਓ।",
        pill: "ਕੇਦਾਰਨਾਥ-ਬਦਰੀਨਾਥ ਰਿੰਗ ਪੂਰੀ",
        stat: "ਹਰ ਸਾਲ 500+ ਸ਼ਰਧਾਲੂ"
      }
    ]
  };

  const sliderLabelsMap: { [lang: string]: { [key: string]: string } } = {
    en: {
      authOperator: "Authorized Yatra Operator",
      serviceCategory: "Service Category",
      govApproved: "Government Approved",
      minAge: "Min Age Limit",
      ageValue: "09 - 70 Years",
      oxygenBackups: "Oxygen Backups",
      includedFree: "Included Free"
    },
    hi: {
      authOperator: "अधिकृत यात्रा ऑपरेटर",
      serviceCategory: "सेवा श्रेणी",
      govApproved: "सरकारी तौर पर स्वीकृत",
      minAge: "न्यूनतम आयु सीमा",
      ageValue: "09 - 70 वर्ष",
      oxygenBackups: "ऑक्सीजन बैकअप",
      includedFree: "निःशुल्क शामिल"
    },
    ta: {
      authOperator: "அங்கீகரிக்கப்பட்ட யாத்திரை ஆபரேட்டர்",
      serviceCategory: "சேவை வகை",
      govApproved: "அரசு அங்கீகாரம் பெற்றது",
      minAge: "குறைந்தபட்ச வயது வரம்பு",
      ageValue: "09 - 70 ஆண்டுகள்",
      oxygenBackups: "ஆக்ஸிஜன் பேக்கப்",
      includedFree: "இலவசமாக சேர்க்கப்பட்டுள்ளது"
    },
    te: {
      authOperator: "అధికారిక యాత్రా నిర్వాహకులు",
      serviceCategory: "సేవా వర్గం",
      govApproved: "ప్రభుత్వ గుర్తింపు పొందినది",
      minAge: "కనీస వయస్సు పరిమితి",
      ageValue: "09 - 70 సంవత్సరాలు",
      oxygenBackups: "ఆక్సిజన్ బ్యాకప్స్",
      includedFree: "ఉచితంగా లభించును"
    },
    gu: {
      authOperator: "અધિકૃત યાત્રા ઓપરેટર",
      serviceCategory: "સેવા શ્રેણી",
      govApproved: "સરકાર માન્ય",
      minAge: "ન્યૂનતમ ઉંમર મર્યાદા",
      ageValue: "09 - 70 વર્ષ",
      oxygenBackups: "ઓક્સિજન બેકઅપ",
      includedFree: "મફત શામેલ"
    },
    pa: {
      authOperator: "ਅਧਿਕਾਰਤ ਯਾਤਰਾ ਆਪਰੇਟਰ",
      serviceCategory: "ਸੇਵਾ ਸ਼੍ਰੇਣੀ",
      govApproved: "ਸਰਕਾਰ ਦੁਆਰਾ ਮਨਜ਼ੂਰ",
      minAge: "ਘੱਟੋ-ਘੱਟ ਉਮਰ ਸੀਮਾ",
      ageValue: "09 - 70 ਸਾਲ",
      oxygenBackups: "ਆਕਸੀਜਨ ਬੈਕਅੱਪ",
      includedFree: "ਮੁਫ਼ਤ ਸ਼ਾਮਲ"
    }
  };

  const sliderLabels = sliderLabelsMap[currentLanguage] || sliderLabelsMap.en;

  const slideImages = [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200",
    "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1200"
  ];

  const defaultSlides = (slideTranslations[currentLanguage] || slideTranslations.en).map((slide, idx) => ({
    ...slide,
    img: slideImages[idx] || slideImages[0]
  }));
  const slides = defaultSlides;

  useEffect(() => {
    setCurrent(0);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[550px] md:h-[650px] w-full bg-slate-50 dark:bg-zinc-950 overflow-hidden select-none">
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Cover Image with Deep Vignette */}
          <img
            src={slide.img}
            alt={slide.subtitle}
            className="w-full h-full object-cover object-center scale-102 filter brightness-[0.45] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Abstract Orange Background Light Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-slate-50/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-transparent hidden md:block" />

          {/* Slide Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text content block */}
              <div className="lg:col-span-7 flex flex-col items-start gap-4 text-left animate-in fade-in-50 slide-in-from-bottom-6 duration-700">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-orange-100 border border-orange-500/30 text-orange-600 font-mono text-[11px] font-semibold uppercase tracking-widest leading-none">
                  <Sparkles className="h-3 w-3 text-amber-500 animate-spin-slow" />
                  {slide.pill}
                </span>

                <div className="flex flex-col gap-1">
                  <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-zinc-100 leading-[1.1] tracking-tight">
                    {slide.title}
                  </h1>
                  <h2 className="font-serif text-2xl md:text-4xl text-orange-500 font-bold mt-1">
                    {slide.subtitle}
                  </h2>
                </div>

                <p className="text-slate-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed max-w-xl">
                  {slide.desc}
                </p>

                {/* Badges/Stats */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 dark:text-zinc-400 mt-2 bg-slate-50/35 dark:bg-zinc-950/35 p-2 rounded backdrop-blur-xs border border-slate-300 dark:border-zinc-700">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-orange-500" />
                    {slide.stat}
                  </span>
                  <span className="text-slate-400 dark:text-zinc-500">|</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                    {sliderLabels.authOperator}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 mt-4">
                  <button
                    onClick={onExplorePackages}
                    className="bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold tracking-wider px-6 py-3.5 rounded-md shadow-lg shadow-orange-600/20 border border-orange-500/30 transition hover:scale-[1.02] cursor-pointer uppercase"
                  >
                    {t("explorePackagesBtn", currentLanguage)}
                  </button>
                  <button
                    onClick={onOpenConsultant}
                    className="group bg-slate-100/95 dark:bg-zinc-900/95 hover:bg-slate-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:text-slate-900 dark:text-zinc-100 font-mono text-xs font-bold tracking-wider px-5 py-3.5 rounded-md border border-slate-300 dark:border-zinc-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-1.5 uppercase shadow-lg hover:shadow-orange-500/10 hover:ring-2 hover:ring-orange-500/35 hover:ring-offset-2 hover:ring-offset-white"
                  >
                    <HelpCircle className="h-4 w-4 text-amber-500 group-hover:text-amber-500 group-hover:scale-110 group-hover:animate-bounce transition-all duration-300" />
                    <span>{t("askAiBtn", currentLanguage)}</span>
                  </button>
                </div>
              </div>

              {/* Package cards preview block */}
              <div className="hidden lg:col-span-5 lg:flex flex-col gap-4 animate-in fade-in-50 slide-in-from-right-6 duration-1000">
                <div className="bg-slate-100/80 dark:bg-zinc-900/80 p-5 rounded-xl border border-orange-500/20 backdrop-blur-md shadow-xl">
                  <p className="text-[10px] font-mono tracking-widest text-orange-500 font-bold uppercase mb-2">
                    {t("gurupadVerified", currentLanguage)}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-zinc-100 mb-2">
                    NAGARJUNA TRAVELS
                  </h3>
                  <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed mb-4">
                    {t("securingPermits", currentLanguage)}
                  </p>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-zinc-800">
                      <span className="text-slate-500 dark:text-zinc-450">{sliderLabels.serviceCategory}</span>
                      <span className="text-slate-700 dark:text-zinc-300 font-semibold font-mono">{sliderLabels.govApproved}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-zinc-800">
                      <span className="text-slate-500 dark:text-zinc-450">{sliderLabels.minAge}</span>
                      <span className="text-slate-700 dark:text-zinc-300 font-semibold font-mono">{sliderLabels.ageValue}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-slate-500 dark:text-zinc-450">{sliderLabels.oxygenBackups}</span>
                      <span className="text-green-400 font-semibold font-mono">{sliderLabels.includedFree}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Manual Control Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-zinc-950/80 hover:bg-orange-600 text-slate-800 dark:text-zinc-200 hover:text-white shadow-md p-2 rounded-full border border-slate-200 dark:border-zinc-800 hover:border-orange-500/40 transition cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-zinc-950/80 hover:bg-orange-600 text-slate-800 dark:text-zinc-200 hover:text-white shadow-md p-2 rounded-full border border-slate-200 dark:border-zinc-800 hover:border-orange-500/40 transition cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Bullet indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? "w-8 bg-orange-600" : "w-2 bg-slate-400 hover:bg-slate-500 dark:bg-zinc-800"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
