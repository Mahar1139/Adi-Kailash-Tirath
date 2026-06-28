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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");

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
    <section className="relative min-h-[780px] md:min-h-[650px] lg:min-h-[700px] w-full bg-slate-50 dark:bg-[#0b1120] overflow-hidden select-none">
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Cover Image */}
          <img
            src={slide.img}
            alt={slide.subtitle}
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Gradients for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          {/* Slide Content Overlay */}
          <div className="absolute inset-0 flex items-center pt-8 md:pt-12 lg:pt-0">
            <div className="w-full max-w-full mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:items-center">
              {/* Text content block */}
              <div className="lg:col-span-7 flex flex-col items-start gap-3 lg:gap-4 text-left animate-in fade-in-50 slide-in-from-bottom-6 duration-700 -mt-[380px] md:-mt-[400px] lg:mt-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-sky-100 border border-sky-500/30 text-sky-600 font-mono text-[11px] font-semibold uppercase tracking-widest leading-none">
                  <Sparkles className="h-3 w-3 text-blue-500 animate-spin-slow" />
                  {slide.pill}
                </span>

                <div className="flex flex-col gap-1 drop-shadow-md">
                  <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                    {slide.title}
                  </h1>
                  <h2 className="font-serif text-2xl md:text-4xl text-sky-400 font-bold mt-1">
                    {slide.subtitle}
                  </h2>
                </div>

                <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-xl drop-shadow">
                  {slide.desc}
                </p>

                {/* Badges/Stats */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white mt-2 bg-black/30 p-2 rounded backdrop-blur-md border border-white/20">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-sky-400" />
                    {slide.stat}
                  </span>
                  <span className="text-white/50">|</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-green-400" />
                    {sliderLabels.authOperator}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 mt-4">
                  <button
                    onClick={onExplorePackages}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold tracking-wider px-6 py-3.5 rounded-md shadow-lg shadow-sky-600/20 border border-sky-500/30 transition hover:scale-[1.02] cursor-pointer uppercase"
                  >
                    {t("explorePackagesBtn", currentLanguage)}
                  </button>
                  <button
                    onClick={onOpenConsultant}
                    className="group bg-white hover:bg-slate-100 text-slate-900 hover:text-sky-700 font-mono text-xs font-bold tracking-wider px-5 py-3.5 rounded-md border border-slate-200 hover:border-sky-500 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-1.5 uppercase shadow-lg shadow-black/20"
                  >
                    <HelpCircle className="h-4 w-4 text-blue-500 group-hover:text-blue-500 group-hover:scale-110 group-hover:animate-bounce transition-all duration-300" />
                    <span>{t("askAiBtn", currentLanguage)}</span>
                  </button>
                </div>
              </div>


            </div>
          </div>
        </div>
      ))}

      {/* Static Form Layer (Outside Map, Visible on all slides, Responsive) */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-10 pt-8 lg:pt-0">
        <div className="w-full max-w-full mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center h-full">
          {/* Empty spacer for the text side on desktop */}
          <div className="lg:col-span-7 h-[300px] lg:h-auto hidden lg:block" />
          
          {/* Quick Contact Form (Visible on all sizes, pushed down on mobile) */}
          <div className="lg:col-span-5 flex flex-col gap-4 animate-in fade-in-50 slide-in-from-right-6 duration-1000 mt-[360px] md:mt-[380px] lg:mt-0 pointer-events-auto w-full max-w-md mx-auto lg:mr-0 z-20">
            <div className="relative bg-black/60 lg:bg-black/50 p-5 md:p-6 lg:p-8 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent pointer-events-none" />
              
              <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1.5 md:mb-2 relative z-10">
                {currentLanguage === "hi" ? "अपनी यात्रा की योजना बनाएं" : "Plan Your Yatra"}
              </h3>
              <p className="text-white/80 text-xs md:text-sm mb-4 md:mb-6 relative z-10">
                {currentLanguage === "hi" ? "आगामी सीजन के लिए अभी पूछताछ करें। हमारी स्थानीय टीम आपको तुरंत जवाब देगी।" : "Enquire now for the upcoming season. Fast responses by our local ground team."}
              </p>
              
              <form 
                className="space-y-3 md:space-y-4 relative z-10" 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  setShowSuccessPopup(true);
                  setTimeout(() => setShowSuccessPopup(false), 5000);
                  setFormName("");
                  setFormPhone("");
                }}
              >
                <div className="space-y-1">
                  <label className="text-white/70 text-[10px] md:text-xs font-mono uppercase tracking-wider">
                    {currentLanguage === "hi" ? "पूरा नाम" : "Full Name"}
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={currentLanguage === "hi" ? "राकेश शर्मा" : "Rakesh Sharma"} 
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-white text-sm focus:outline-none focus:border-sky-400 focus:bg-white/20 transition-colors placeholder:text-white/40"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-white/70 text-[10px] md:text-xs font-mono uppercase tracking-wider">
                    {currentLanguage === "hi" ? "फ़ोन नंबर" : "Phone Number"}
                  </label>
                  <input 
                    type="tel" 
                    required 
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 99999 99999" 
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-white text-sm focus:outline-none focus:border-sky-400 focus:bg-white/20 transition-colors placeholder:text-white/40"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full mt-1 md:mt-2 bg-sky-600 hover:bg-sky-500 text-white font-mono font-bold uppercase tracking-widest text-xs md:text-sm py-2.5 md:py-3 rounded-lg shadow-[0_0_20px_rgba(2,132,199,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] border border-sky-400/50 cursor-pointer"
                >
                  {currentLanguage === "hi" ? "कॉल बैक का अनुरोध करें" : "Request Call Back"}
                </button>
                
                <p className="text-white/50 text-[9px] md:text-[10px] text-center mt-2 md:mt-3">
                  {currentLanguage === "hi" ? "आपका विवरण सुरक्षित है। निःशुल्क परामर्श प्रदान किया जाता है।" : "Your details are secure. Free consultation provided."}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 md:p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center relative animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 font-serif">
              {currentLanguage === "hi" ? "सफलतापूर्वक सबमिट किया गया!" : "Successfully Submitted!"}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              {currentLanguage === "hi" ? "आपकी पूछताछ प्राप्त हो गई है। हमारी टीम जल्द ही आपसे संपर्क करेगी।" : "Your enquiry has been received. Our team will contact you shortly."}
            </p>
            <button 
              onClick={() => setShowSuccessPopup(false)}
              className="w-full bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-lg transition-colors"
            >
              {currentLanguage === "hi" ? "ठीक है" : "OK"}
            </button>
          </div>
        </div>
      )}

      {/* Bullet indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? "w-8 bg-sky-600" : "w-2 bg-slate-400 hover:bg-slate-500 dark:bg-[#1e293b]"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
