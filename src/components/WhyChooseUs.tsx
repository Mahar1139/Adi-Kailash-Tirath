import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  Trophy, 
  HeartPulse, 
  Map, 
  FileText, 
  UtensilsCrossed, 
  Home, 
  ChevronRight, 
  UserCheck, 
  ArrowRight,
  BadgeAlert,
  HelpCircle,
  PhoneCall
} from "lucide-react";

interface WhyChooseUsProps {
  currentLanguage: string;
  onOpenConsultant: () => void;
  onNavigateToCatalog: () => void;
}

export default function WhyChooseUs({ currentLanguage, onOpenConsultant, onNavigateToCatalog }: WhyChooseUsProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Dictionary for page titles & UI headings across 6 languages
  const uiLabelsMap: { [lang: string]: { [key: string]: string } } = {
    en: {
      tagline: "WHY TRUST ADI KAILASH TIRATH",
      title: "Your Sacred Journey In Safe Himalayan Hands",
      subtitle: "We don't just organize tours; we curate deeply authentic, medically secure spiritual pilgrimages to the outer borders of Mount Adi Kailash & Om Parvat.",
      btnCatalog: "View Safe Packages",
      btnConsult: "Ask AI Guide Ajay",
      statYatris: "5,000+",
      statYatrisLbl: "Yatris Guided Safely",
      statPermits: "100%",
      statPermitsLbl: "Permit Success Rate",
      statOxygen: "24/7",
      statOxygenLbl: "Continuous Oxygen Backups",
      statYears: "12+ Years",
      statYearsLbl: "High-Altitude Experience",
      tabMedical: "Medical & Oxygen",
      tabPermits: "Inner Line Permits",
      tabStays: "Satvik Stays & Food",
      tabGuides: "Native Sherpa Guides",
      accreditationTitle: "OFFICIALLY ACCREDITED & GOVERNMENT PERMITTED",
      securingFaq: "Himalayan High Altitude Safe Travel FAQ",
      securingFaqSub: "Every critical doubt answered carefully by local pioneers."
    },
    hi: {
      tagline: "आदि कैलाश तीर्थ पर क्यों भरोसा करें?",
      title: "आपकी पावन यात्रा, सुरक्षित और अनुभवी हाथों में",
      subtitle: "हम केवल यात्राएं आयोजित नहीं करते; हम आदि कैलाश और ओम पर्वत की बाहरी सीमाओं के लिए गहरे प्रामाणिक और चिकित्सा सुरक्षित तीर्थयात्रा की व्यवस्था करते हैं।",
      btnCatalog: "सुरक्षित पैकेजेस देखें",
      btnConsult: "गाइड अजय से पूछें",
      statYatris: "5,000+",
      statYatrisLbl: "सुरक्षित निर्देशित यात्री",
      statPermits: "100%",
      statPermitsLbl: "सफल परमिट दर",
      statOxygen: "24/7",
      statOxygenLbl: "निरंतर ऑक्सीजन बैकअप",
      statYears: "12+ वर्ष",
      statYearsLbl: "पर्वतीय मार्ग का अनुभव",
      tabMedical: "चिकित्सा और ऑक्सीजन",
      tabPermits: "इनर लाइन परमिट",
      tabStays: "सात्विक भोजन और होटल",
      tabGuides: "स्थानीय शेरपा गाइड",
      accreditationTitle: "आधिकारिक तौर पर स्वीकृत और सरकार द्वारा प्रमाणित ऑपरेटर",
      securingFaq: "हिमालय उच्च पर्वतीय यात्रा सामान्य प्रश्न",
      securingFaqSub: "स्थानीय विशेषज्ञों द्वारा आपके सभी महत्वपूर्ण प्रश्नों के सटीक उत्तर।"
    },
    ta: {
      tagline: "ஏன் ஆதி கைலாஷ் தீர்த்தத்தை நம்ப வேண்டும்?",
      title: "உங்கள் புனித யாத்திரை பாதுகாப்பான இமயமலை கரங்களில்",
      subtitle: "நாங்கள் பயணங்களை மட்டும் ஏற்பாடு செய்வதில்லை; ஆதி கைலாஷ் மற்றும் ஓம் பர்வதத்தின் எல்லைப் பகுதிகளுக்கு ஆன்மீக ரீதியாகவும், மருத்துவ ரீதியாகவும் பாதுகாப்பான புனித யாத்திரைகளை வழங்குகிறோம்.",
      btnCatalog: "பாதுகாப்பான தொகுப்புகள்",
      btnConsult: "AI வழிகாட்டி அஜயிடம் கேளுங்கள்",
      statYatris: "5,000+",
      statYatrisLbl: "பாதுகாப்பாக வழிநடத்தப்பட்ட யாத்ரீகர்கள்",
      statPermits: "100%",
      statPermitsLbl: "அனுமதி சீட்டு வெற்றி விகிதம்",
      statOxygen: "24/7",
      statOxygenLbl: "தொடர் ஆக்ஸிஜன் சிலிண்டர் ஆதரவு",
      statYears: "12+ ஆண்டுகள்",
      statYearsLbl: "மலைப்பயண நிபுணத்துவம்",
      tabMedical: "மருத்துவம் & ஆக்ஸிஜன்",
      tabPermits: "எல்லை அனுமதி சீட்டுகள்",
      tabStays: "சைவ உணவு & தங்குமிடம்",
      tabGuides: "உள்ளூர் ஷெர்பா வழிகாட்டிகள்",
      accreditationTitle: "அதிகாரப்பூர்வமாக அங்கீகரிக்கப்பட்ட அரசு பதிவு பெற்ற ஆபரேட்டர்",
      securingFaq: "இமயமலை பாதுகாப்பு தொடர்பான கேள்விகள்",
      securingFaqSub: "உள்ளூர் நிபுணர்களால் வழங்கப்படும் தெளிவான பதில்கள்."
    },
    te: {
      tagline: "ఆది కైలాష్ తీర్థ్‌ను ఎందుకు నమ్మాలి?",
      title: "మీ పవిత్ర యాత్ర హిమాలయాల సురక్షిత చేతుల్లో",
      subtitle: "మేము కేవలం టూర్స్ నిర్వహించము; ఆది కైలాష్ మరియు ఓం పర్వతం సరిహద్దులకు 100% వైద్యాపరంగా సురక్షితమైన ఆధ్యాత్మిక యాత్రలను అందిస్తాము.",
      btnCatalog: "సురక్షిత ప్యాకేజీలు",
      btnConsult: "గైడ్ అజయ్‌ను అడగండి",
      statYatris: "5,000+",
      statYatrisLbl: "సురక్షితంగా వెళ్లిన భక్తులు",
      statPermits: "100%",
      statPermitsLbl: "పర్మిట్ సక్సెస్ రేటు",
      statOxygen: "24/7",
      statOxygenLbl: "నిరంతర ఆక్సిజన్ సపోర్ట్",
      statYears: "12+ సంవత్సరాలు",
      statYearsLbl: "పర్వత ప్రాంత అనుభవం",
      tabMedical: "వైద్య మరియు ఆక్సిజన్",
      tabPermits: "ఇన్నర్ లైన్ పర్మిట్లు",
      tabStays: "సాత్విక భోజనం & బస",
      tabGuides: "స్థానిక షెర్పా గైడ్‌లు",
      accreditationTitle: "అధికారికంగా ప్రభుత్వం చేత గుర్తింపు పొందిన టూర్ ఆపరేటర్",
      securingFaq: "హిమాలయ పర్వతాల ప్రయాణ ప్రశ్నలు",
      securingFaqSub: "స్థానిక యాత్రా నిపుణులచే స్పష్టమైన సమాధానాలు."
    },
    gu: {
      tagline: "આદિ કૈલાશ તીર્થ પર શા માટે વિશ્વાસ કરવો?",
      title: "આપની પવિત્ર યાત્રા સુરક્ષિત હિમાલયન હાથોમાં",
      subtitle: "અમે માત્ર પ્રવાસનું આયોજન નથી કરતા; અમે પવિત્ર આદિ કૈલાશ અને ઓમ પર્વત ની સરહદો માટે તબીબી રીતે સુરક્ષિત આધ્યાત્મિક યાત્રાઓ આપીએ છીએ.",
      btnCatalog: "યાત્રા પેકેજ જુઓ",
      btnConsult: "એઆઈ ગાઈડ અજય ને પૂછો",
      statYatris: "5,000+",
      statYatrisLbl: "સુરક્ષિત માર્ગદર્શિત યાત્રીઓ",
      statPermits: "100%",
      statPermitsLbl: "સફળ પરમિટ રેશિયો",
      statOxygen: "24/7",
      statOxygenLbl: "ઓક્સિજન સિલિન્ડર સપોર્ટ",
      statYears: "12+ વર્ષ",
      statYearsLbl: "પહાડી પ્રદેશ નો અનુભવ",
      tabMedical: "તબીબી સેવા અને ઓક્સિજન",
      tabPermits: "સરહદી ઇનર લાઇન પરમિટ",
      tabStays: "સાત્વિક ભોજન અને હોમસ્ટે",
      tabGuides: "સ્થાનિક શેરપા માર્ગદર્શક",
      accreditationTitle: "સત્તાવાર રીતે સરકાર માન્ય ટ્રાવેલ ઓપરેટર",
      securingFaq: "હિમાલયન યાત્રા સંબંધિત પૂછાતા પ્રશ્નો",
      securingFaqSub: "સ્થાનિક પહાડી નિષ્ણાતો દ્વારા દરેક પ્રશ્ન નો સચોટ જવાબ."
    },
    pa: {
      tagline: "ਆਦਿ ਕੈਲਾਸ਼ ਤੀਰਥ 'ਤੇ ਕਿਉਂ ਭਰੋਸਾ ਕਰੀਏ?",
      title: "ਤੁਹਾਡੀ ਪਵਿੱਤਰ ਯਾਤਰਾ, ਸੁਰੱਖਿਅਤ ਹਿਮਾਲੀਅਨ ਹੱਥਾਂ ਵਿੱਚ",
      subtitle: "ਅਸੀਂ ਸਿਰਫ ਟੂਰ ਹੀ ਨਹੀਂ ਬਣਾਉਂਦੇ; ਅਸੀਂ ਆਦਿ ਕੈਲਾਸ਼ ਅਤੇ ਓਮ ਪਰਬਤ ਦੀਆਂ ਸਰਹੱਦਾਂ ਲਈ ਪੂਰੀ ਤਰ੍ਹਾਂ ਮੈਡੀਕਲ-ਸੁਰੱਖਿਅਤ ਅਤੇ ਸੱਚੀਆਂ ਯਾਤਰਾਵਾਂ ਦਾ ਪ੍ਰਬੰਧ ਕਰਦੇ ਹਾਂ।",
      btnCatalog: "ਸੁਰੱਖਿਅਤ ਪੈਕੇਜ ਦੇਖੋ",
      btnConsult: "ਗਾਈਡ ਅਜੇ ਤੋਂ ਪੁੱਛੋ",
      statYatris: "5,000+",
      statYatrisLbl: "ਸੁਰੱਖਿਅਤ ਯਾਤਰਾ ਕਰਨ ਵਾਲੇ ਸ਼ਰਧਾਲੂ",
      statPermits: "100%",
      statPermitsLbl: "ਸਫਲ ਪਰਮਿਟ ਦਰ",
      statOxygen: "24/7",
      statOxygenLbl: "ਲਗਾਤਾਰ ਆਕਸੀਜਨ ਬੈਕਅੱਪ",
      statYears: "12+ ਸਾਲ",
      statYearsLbl: "ਪਹਾੜੀ ਰਾਹਾਂ ਦਾ ਅਨੁਭਵ",
      tabMedical: "ਮੈਡੀਕਲ ਅਤੇ ਆਕਸੀਜਨ",
      tabPermits: "ਇਨਰ ਲਾਈਨ ਪਰਮਿਟ",
      tabStays: "ਸਾਤਵਿਕ ਭੋਜਨ ਅਤੇ ਹੋਟਲ",
      tabGuides: "ਸਥਾਨಿಕ ਸ਼ੇਰਪਾ ਗਾਈਡ",
      accreditationTitle: "ਸਰਕਾਰ ਦੁਆਰਾ ਅਧਿਕਾਰਤ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਆਪਰੇਟਰ",
      securingFaq: "ਹਿਮਾਲੀਅਨ ਯਾਤਰਾ ਬਾਰੇ ਸਵਾਲ-ਜਵਾਬ",
      securingFaqSub: "ਸਥਾਨਕ ਯਾਤਰਾ ਮਾਹਿਰਾਂ ਦੁਆਰਾ ਹਰ ਮੁਸ਼ਕਿਲ ਸਵਾਲ ਦਾ ਹੱਲ।"
    }
  };

  // Content for the 4 core pillars across 6 languages
  const pillarsContentMap: { [lang: string]: Array<{
    title: string;
    headline: string;
    bullets: string[];
    description: string;
    icon: any;
  }> } = {
    en: [
      {
        title: "Medical & Oxygen Safeguards",
        headline: "High-Altitude Breath Security (Pran Vayu)",
        description: "Climbing over 12,000 ft demands advanced physiological preparation. We integrate clinical-grade safety backups to secure your sacred high-altitude breathing.",
        bullets: [
          "Continuous oxygen bottles equipped directly inside our dedicated 4x4 Bolero/SUV vehicles.",
          "Twice-daily oximeter checkups (morning and evening) keeping custom registers for acclimatization index.",
          "High-altitude sickness pre-advisory and medical fit alignment under government approved standards.",
          "Trained first-responder guides capable of managing high-elevation heart rates and immediate evacuations."
        ],
        icon: HeartPulse
      },
      {
        title: "Seamless Inner Permits",
        headline: "100% Approved Border Approvals",
        description: "Adi Kailash and Om Parvat lie within sensitive military border lines of India, Nepal, and Tibet. We handle everything directly from local administrative magistrate offices.",
        bullets: [
          "No administrative queue visits required for the pilgrims; we handle physical verification with the Pithoragarh SDM.",
          "Hassle-free biometric registration coordination and police character certificate processing.",
          "Authorized local operator channel secures direct Inner Line Permits within certified slots.",
          "Dedicated coordinator physically present in Dharchula to process paperwork safely before your arrival."
        ],
        icon: FileText
      },
      {
        title: "Insulated Stays & Saathvik Kitchen",
        headline: "Warmth & Pure Organic Nourishment",
        description: "Cold winds inside the Vyas Valley require top-tier heating and pure diets that aid high-elevation digestion processes cleanly.",
        bullets: [
          "Cozy handpicked heritage wooden homestays and sanitized rooms with comfortable dense blankets.",
          "100% hot warm running water through custom geysers tailored for high-frost environments.",
          "Freshly prepared pure vegetarian Organic Satvik meals cooked with local herbal seasonings.",
          "Light digestive foods avoiding heavy spices, supporting optimal metabolic conditions on active days."
        ],
        icon: UtensilsCrossed
      },
      {
        title: "Native Heritage Sherpas",
        headline: "Local Sons of Vyas Valley Soil",
        description: "Our guides are indigenous inhabitants of Gunji, Dharchula, and nearby valley communities whose ancestors walked these trails.",
        bullets: [
          "Commanding fluency in local languages, Kumaoni heritage dialects, Hindi, and English to connect with locals.",
          "In-depth spiritual storytelling detailing the historical legends of Parvati Kund and Vyas Cave.",
          "Excellent mountain coordination with Army checkpoints to prioritize pilgrim access.",
          "Friendly, deeply humble service treating every pilgrim devotee with supreme respect and family warmth."
        ],
        icon: UserCheck
      }
    ],
    hi: [
      {
        title: "चिकित्सा और ऑक्सीजन सुरक्षा",
        headline: "उच्च तुंगता श्वास चक्र सुरक्षा (प्राण वायु)",
        description: "12,000 फीट से अधिक की ऊंचाई पर चढ़ने के लिए उन्नत शारीरिक तैयारी की आवश्यकता होती है। हम आपकी सुरक्षित श्वास और हृदय स्वास्थ्य सुनिश्चित करते हैं।",
        bullets: [
          "हमारी सभी विशेष 4x4 बोलेरो/एसयूवी गाड़ियों में निरंतर ऑक्सीजन सिलेंडर की मजबूत व्यवस्था।",
          "दिन में दो बार (सुबह और शाम) ऑक्सीमीटर रीड़िंग्स का व्यवस्थित रिकॉर्ड रखना।",
          "सरकारी स्वीकृत मानकों के अनुसार ऊंचाई की बीमारी (AMS) नियंत्रण पर मार्गदर्शन।",
          "आपातकालीन चिकित्सा परिस्थितियों के प्रबंधन और त्वरित निकासी के लिए प्रशिक्षित मार्गदर्शक।"
        ],
        icon: HeartPulse
      },
      {
        title: "इनर लाइन परमिट प्रबंधन",
        headline: "100% सफलता दर के साथ प्रशासनिक स्वीकृति",
        description: "आदि कैलाश और ओम पर्वत चीन सीमा के संवेदनशील क्षेत्रों में आते हैं। हम प्रशासनिक कार्यालयों से सीधे सभी कागजी कार्रवाई संभालते हैं।",
        bullets: [
          "तीर्थयात्रियों को कोर्ट या परमिट लाइनों में खड़े होने की कोई आवश्यकता नहीं है; हम पूरी फाइलिंग संभालते हैं।",
          "धारचूला और पिथौरागढ़ पुलिस सत्यापन और बायोमेट्रिक प्रक्रियाओं में हमारी टीम प्रत्यक्ष मदद करती है।",
          "अधिकृत स्थानीय सरकारी ऑपरेटर होने का गौरव, जो समय पर सीमा परमिट आवंटन को आसान बनाता है।",
          "धारचूला में हमारी टीम का सदस्य आपके आने से पहले शारीरिक रूप से सभी सुरक्षा पास सत्यापित रखता है।"
        ],
        icon: FileText
      },
      {
        title: "सात्विक भोजन और आरामदायक प्रवास",
        headline: "कड़ाके की ठंड में गर्म होटल और पौष्टिक भोजन",
        description: "व्यास घाटी की ठंडी हवाओं के लिए उपयुक्त वेंटिलेशन, हीटिंग और हल्का सुपाच्य सात्विक भोजन आवश्यक है।",
        bullets: [
          "हाथ से चुने गए आरामदायक लकड़ी के कॉटेज, कड़ाके की ठंड से बचाने के लिए मोटे रजाई कम्बल।",
          "कठिन वातावरण में भी गर्म पानी की निरंतर सुविधा के लिए विशेष हीटिंग गीज़र।",
          "100% शुद्ध जैविक शाकाहारी सात्विक पहाड़ी व्यंजनों से बना ताजा और गर्म भोजन।",
          "उच्च ऊंचाई पर पाचन ठीक रखने के लिए बिना लहसुन-प्याज के विशेष हल्का और पौष्टिक भोजन।"
        ],
        icon: UtensilsCrossed
      },
      {
        title: "स्थानीय भूमिपुत्र शेरपा मार्गदर्शक",
        headline: "गुंजी और व्यास घाटी के मूल निवासी रक्षक",
        description: "हमारे गाइड गुंजी और धारचूला समुदाय के मूल निवासी हैं जिनके पूर्वज सदियों से इन पवित्र चोटियों के रक्षक रहे हैं।",
        bullets: [
          "कुमाउनी पहाड़ी बोली, क्षेत्रीय सीमा भाषाओं, हिंदी और अंग्रेजी पर विशेष नियंत्रण व संवाद।",
          "पार्वती कुंड, गौरी कुंड और व्यास गुफा का अद्भुत आध्यात्मिक और पौराणिक ज्ञान।",
          "सैन्य चेकपोस्टों पर श्रेष्ठ अनुशासन, जिससे भक्तों की परमिट जांच बेहद शांतिपूर्ण ढंग से संपन्न हो।",
          "बेहद विनम्र पहाड़ी आतिथ्य सत्कार, जो प्रत्येक यत्री को अपने परिवार के वरिष्ठ सदस्य की तरह पूजता है।"
        ],
        icon: UserCheck
      }
    ],
    ta: [
      {
        title: "மருத்துவம் மற்றும் ஆக்ஸிஜன் வசதிகள்",
        headline: "உயரமான மலைப்பாதையில் சுவாசப் பாதுகாப்பு (பிராண வாயு)",
        description: "12,000 அடிக்கும் மேல் உயரமான மலைப்பகுதிகளுக்குச் செல்ல பிரத்யேக ஏற்பாடு தேவை. உங்கள் சுவாசத்தைப் பாதுகாக்க மருத்துவ ஆக்ஸிஜன் சிலிண்டர்களை வழங்குகிறோம்.",
        bullets: [
          "எங்களது அனைத்து 4x4 பொலிரோ/எஸ்யூவி வாகனங்களிலும் முழுமையான ஆக்ஸிஜன் உபகரணங்கள்.",
          "தினசரி இருமுறை (காலை மற்றும் மாலை) இரத்தத்தில் ஆக்ஸிஜன் அளவு மற்றும் நாடித் துடிப்பு சரிபார்ப்பு.",
          "மலை நோய் (AMS) வராமல் தடுப்பதற்கான பாதுகாப்பு ஆலோசனைகள் மற்றும் வழிகாட்டுதல்.",
          "அவசரக் காலங்களில் உடனடியாக முதலுதவி வழங்கி கீழே கூட்டிச் செல்லும் பயிற்சி பெற்ற வழிகாட்டிகள்."
        ],
        icon: HeartPulse
      },
      {
        title: "எல்லை அனுமதி சீட்டுகள்",
        headline: "100% அரசு அனுமதி மற்றும் ஆவணங்கள் சேகரிப்பு",
        description: "ஆதி கைலாசம் மற்றும் ஓம் பர்வதம் ஆகிய இடங்கள் ராணுவ கட்டுப்பாட்டு எல்லைப் பகுதிகளில் உள்ளன. அனைத்து ஆவணங்களையும் எங்களது லோக்கல் குழுவினரே நேரடியாகத் தயாரிப்பார்கள்.",
        bullets: [
          "யாத்ரீகர்கள் எவ்வித வரிசையில் நிற்கத் தேவையில்லை; பித்தோராகர் மாவட்ட ஆட்சியரிடம் தேவையான அனுமதியை நாங்களே பெறுவோம்.",
          "போலீஸ் சான்றிதழ்கள் மற்றும் பயோமெட்ரிக் பதிவுகளை மிக எளிதாக ஒருங்கிணைக்க உதவுகிறோம்.",
          "இலகுவாக எல்லை கடக்க தேவையான இன்னர் லைன் அனுமதி சீட்டுகளை மிக விரைவாகப் பெற்றுத் தருதல்.",
          "நீங்கள் தார்ச்சுலா வருவதற்கு முன்பே அனுமதிகள் தயாராக இருப்பதை உறுதி செய்ய தனிக்காப்பாளர் நியமனம்."
        ],
        icon: FileText
      },
      {
        title: "சைவ உணவு மற்றும் தங்குமிடம்",
        headline: "சுத்தமான தங்குமிடங்களும் ஆரோக்கியமான சைவ சாப்பாடும்",
        description: "இமயமலையின் உறைபனி குளிரில் உடலை கதகதப்பாக வைத்திருக்கத் தேவையான தங்குமிடங்கள் மற்றும் எளிதில் செரிமானமாகும் உணவுகள்.",
        bullets: [
          "சுத்தமான மற்றும் தரமான மரக் குடில்கள், தடிமனான போர்வைகள் மற்றும் கதகதப்பான அறைகள்.",
          "குளிரைப் போக்க சுடச்சுட வெந்நீர் வசதிகள்.",
          "மூலிகைகள் சேர்க்கப்பட்டு பிரத்யேகமாக சமைக்கப்படும் 100% இந்திய சைவ சாத்விக உணவுகள்.",
          "செரிமானப் பிரச்சினைகள் ஏற்படாத வண்ணம் காரமில்லாத எளிய ஊட்டச்சத்து மிகுந்த உணவு வகைகள்."
        ],
        icon: UtensilsCrossed
      },
      {
        title: "உள்ளூர் வழிகாட்டிகள்",
        headline: "வியாஸ் பள்ளத்தாக்கின் பூர்வகுடி வழிகாட்டிகள்",
        description: "எங்களது ஆன்மீக வழிகாட்டிகள் மற்றும் உதவியாளர்கள் அனைவரும் குஞ்சி, தார்ச்சுலா பகுதியைச் சேர்ந்த மலை மக்களின் வாரிசுகள்.",
        bullets: [
          "குமாவுனி மொழி, இந்தி மற்றும் ஆங்கிலம் பேசி உள்ளூர் மக்களுடனும் ராணுவ வீரர்களுடனும் விரைவாக தொடர்புகொள்ளும் திறன்.",
          "பார்வதி குண்ட் மற்றும் வியாசர் குகையின் வரலாற்று ஆன்மீகக் கதைகளைத் தெளிவாகக் கூறும் திறன்.",
          "ராணுவச் சோதனைச் சாவடிகளில் யாத்ரீகர்களுக்கு முன்னுரிமை கிடைக்கச் செய்வதில் அரிய அனுபவம்.",
          "ஒவ்வொரு யாத்ரீகரையும் தங்களின் சொந்த குடும்ப உறுப்பினராக மதித்துப் பாதுகாப்பாகக் கவனிக்கும் உயர்ந்த குணம்."
        ],
        icon: UserCheck
      }
    ],
    te: [
      {
        title: "వైద్య మరియు ఆక్సిజన్ భద్రత",
        headline: "ఎత్తైన హిమాలయాలలో సురక్షిత శ్వాస వ్యవస్థ (ప్రాణ వాయువు)",
        description: "12,000 అడుగుల కంటే ఎక్కువ ఎత్తుకు ప్రయాణించడానికి శారీరక క్షేమం అవసరం. మేము మీ పవిత్ర యాత్ర శ్వాస వ్యవస్థను రక్షిస్తాము.",
        bullets: [
          "మా అన్ని 4x4 ఎస్‌యూవీ వాహనాలలో ఆక్సిజన్ సిలిండర్లు మరియు కిట్లు నిరంతరం సిద్ధంగా ఉంటాయి.",
          "రోజుకు రెండుసార్లు ఆక్సిజన్ శాతాన్ని చెక్ చేసి మీ ఆరోగ్యాన్ని నిరంతరం పర్యవేక్షించడం.",
          "శరీరం అలవాటు పడేలా (Acclimatization) ప్రత్యేక గైడ్ సహాయం అందించడం.",
          "అత్యవసర పరిస్థితులలో ప్రథమ చికిత్స అందించి సురక్షిత ప్రాంతాలకు తరలించే సమర్థవంతమైన సిబ్బంది."
        ],
        icon: HeartPulse
      },
      {
        title: "ఇన్నర్ లైన్ పర్మిట్లు",
        headline: "100% ఆమోదించబడిన సరిహద్దు అనుమతులు",
        description: "ఆది కైలాష్ మరియు ఓం పర్వతం సున్నితమైన సైనిక సరిహద్దులలో ఉన్నాయి. ఈ అనుమతుల ప్రక్రియను మా ప్రతినిధులే స్వయంగా నిర్వహిస్తారు.",
        bullets: [
          "భక్తులు ఎటువంటి కార్యాలయాల చుట్టూ తిరగాల్సిన అవసరం లేదు; పత్రాల నమోదు మేమే పూర్తి చేస్తాము.",
          "పోలీస్ వెరిఫికేషన్ మరియు బయోమెట్రిక్ నమోదు ప్రక్రియలలో అడుగడుగునా మీకు సహాయం అందిస్తాము.",
          "అధికారిక అనుమతులు పొందిన ఏజెన్సీ కనుక మీకు సులభంగా ఇన్నర్ లైన్ పాసులు లభించును.",
          "మీరు రాకముందే దార్చులా కార్యాలయంలో అన్ని పేపర్ పనులు సిద్ధం చేయడానికి మా ప్రత్యేక ప్రతినిధి అందుబాటులో ఉంటారు."
        ],
        icon: FileText
      },
      {
        title: "నివాసం మరియు సాత్విక భోజనం",
        headline: "శీతల వాతావరణంలో వెచ్చని విడిది & శుద్ధ సాత్విక ఆహారం",
        description: "వ్యాస్ లోయలోని తీవ్రమైన చలిని తట్టుకోవడానికి వెచ్చని గదులు మరియు తేలికగా అరిగే ఆహారం ఎంతో అవసరం.",
        bullets: [
          "చక్కగా అమర్చిన స్థానిక చెక్క కాటేజీలు మరియు చలిని తట్టుకునే మందపాటి రగ్గులు, దుప్పట్లు.",
          "శీతల గాలిని తట్టుకోవడానికి మరియు స్నానాలకు నిరంతరం వేడినీటి కనెక్షన్ సౌకర్యం.",
          "100% ఆర్గానిక్ పద్ధతిలో వండిన హిమాలయ శ్రేణుల రుచికరమైన శుద్ధ శాకాహార భోజనం.",
          "ఎలాంటి జీర్ణ సమస్యలు రాకుండా ఆరోగ్యంగా ఉంచే తేలికపాటి సాత్విక వంటకాలు."
        ],
        icon: UtensilsCrossed
      },
      {
        title: "హిమాలయ స్థానిక గైడ్‌లు",
        headline: "వ్యాస్ లోయ మట్టి బిడ్డలైన షెర్పాలు",
        description: "మా టూర్ గైడ్‌లు గుంజి మరియు దార్చులా పరిసర పర్వత ప్రాంతాల స్థానిక నివాసితులు.",
        bullets: [
          "కుమావని లోకల్ భాషతో పాటు హిందీ, ఇంగ్లీష్ మాట్లాడటంలో ప్రావీణ్యం కలవారు.",
          "పార్వతీ కుండ్, వ్యాస గుహ మరియు గౌరీ కుండ్ యొక్క ఆధ్యాత్మిక పురాణాల వివరణ.",
          "సైనిక చెక్‌పోస్టుల వద్ద మన భక్తులకు సులభంగా పరీక్షలు పూర్తి అయ్యే విధంగా సమన్వయం చేయడం.",
          "ప్రతి ఒక్క యాత్రికుడిని దైవస్వరూపంగా భావించి కుటుంబ సభ్యుడిలా సేవ చేయడం."
        ],
        icon: UserCheck
      }
    ],
    gu: [
      {
        title: "તબીબી સેવા અને ઓક્સિજન સલામતી",
        headline: "હાઈ-એલ્ટીટ્યુડ શ્વાસ ચક્ર સુરક્ષા (પ્રાણ વાયુ)",
        description: "૧૨,૦૦૦ ફૂટથી વધુ ઊંચાઈ પર શારીરિક અનુકૂલન ખૂબ જરૂરી છે. આપની સુરક્ષિત યાત્રા માટે અમે મેડિકલ ઓક્સિજન બેકઅપ આપીએ છીએ.",
        bullets: [
          "અમારી દરેક 4x4 બોલેરો/એસયુવી ગાડીઓમાં ઓક્સિજન સિલિન્ડર અને માસ્ક ની પૂર્ણ સુવિધા.",
          "અમારા ગાઇડ દ્વારા સવાર-સાંજ દરેક યાત્રીના ઓક્સિજન લેવલ અને પલ્સ રેટની ચોક્કસ નોંધણી.",
          "હાઈ-એલ્ટીટ્યુડ સીકનેસ (AMS) થી બચવાની પૂર્વ તૈયારી માર્ગદર્શન.",
          "ઈમરજન્સી તબીબી પરિસ્થિતિઓમાં તાત્કાલિક દર્દીને નીચેના પ્રદેશમાં લઈ જવાની પહાડી ટ્રેનિંગ."
        ],
        icon: HeartPulse
      },
      {
        title: "સરહદી ઇનર લાઇન પરમિટ",
        headline: "સરકાર માન્ય ૧૦૦% સફળ પરમિટ વ્યવસ્થા",
        description: "આદિ કૈલાશ અને ઓમ પર્વત સંવેદનશીલ મિલિટરી બોર્ડર ક્ષેત્રમાં આવે છે. તેથી બહુવિધ મંજૂરીઓ જરૂરી છે જેને આપ વતી અમે મેળવીએ છીએ.",
        bullets: [
          "તીર્થયાત્રીઓએ કોઈ કચેરી કે લાંબી લાઈનોમાં જવું પડતું નથી; બધી જ ફાઇલિંગ અમારી ટીમ ધારીચુલા કચેરીમાં કરે છે.",
          "પોલીસ કેરેક્ટર સર્ટિફિકેટ વેરિફિકેશન અને બાયોમેટ્રિક ફિંગરપ્રિન્ટ પ્રક્રિયામાં સંપૂર્ણ માર્ગદર્શન.",
          "સરકાર રજિસ્ટર્ડ ઓપરેટર હોવાથી આર્મી ચેકપોસ્ટ પરથી ઈનર લાઈન પાસ તાત્કાલિક મંજૂર થાય છે.",
          "તમે ધારીચુલા પહોંચો તે પહેલા જ તમારી બધી મંજૂરીઓ કાગળ પર ચકાસવા માટે અમારી ટીમ તૈનાત રહે છે."
        ],
        icon: FileText
      },
      {
        title: "સાત્વિક ભોજન અને હોમસ્ટે",
        headline: "પહાડી ઠંડીમાં ગરમ આવાસ અને શુદ્ધ સાત્વિક થાળી",
        description: "વ્યાસ ખીણના ખૂબ ઠંડા વાતાવરણમાં ઉત્તમ ઇન્સ્યુલેટેડ હોમસ્ટે અને સુપાચ્ય આહાર અત્યંત અનિવાર્ય છે.",
        bullets: [
          "પસંદગી પામેલા કમ્ફર્ટેબલ લાકડાના રૂમ અને અતિશય ઠંડીથી રક્ષણ આપતા ગરમ ધાબળા.",
          "પહાડી પ્રદેશ માં સ્નાન અને જળ જરૂરિયાતો માટે ગરમ ગીઝર અને ગરમ પાણીની સુવિધા.",
          "૧૦૦% શુદ્ધ ઓર્ગેનિક શાકાહારી ભોજન જેમાં સ્થાનિક હિમાલયન જડીબુટ્ટીઓ મિશ્રિત હોય.",
          "પચવામાં હળવું, મસાલા રહિત ભોજન જે આપને હિન્દુસ્તાનની સરહદ પર નીરોગી રાખે."
        ],
        icon: UtensilsCrossed
      },
      {
        title: "સ્થાનિક પહાડી માર્ગદર્શક (શેરપા)",
        headline: "વ્યાસ વેલી ખીણ વિસ્તારના ભૂમિપુત્રો લાઈવ સહાય",
        description: "અમારા તમામ ગાઇડ ગુંજી અને ધારીચુલાના મૂળ વતનીઓ છે જેમની પેઢીઓ હિમાલયની પવિત્રતા વચ્ચે ઉછરી છે.",
        bullets: [
          "કુમાઉની ભાષા, પહાડી બોલીઓ, હિન્દી અને ગુજરાતી પ્રવાસીઓ સાથે મીઠી સંવાદ કુશળતા.",
          "પાર્વતી કુંડ, વ્યાસ ગુફા અને ઓમ પર્વત વિશેની પૌરાણિક કથાઓનું સચોટ જ્ઞાન.",
          "ભારતીય આર્મી ચેકપોસ્ટ સાથે શિસ્તબદ્ધ તાલમેલ, જેથી યાત્રિકોની સુરક્ષા તપાસ સરળતાથી પૂર્ણ થાય.",
          "પહાડ જેવું વિશાળ અને નમ્ર હૃદય ધરાવતા માર્ગદર્શકો, જે યાત્રીઓનું પરિવારના વડીલોની જેમ આદરપૂર્વક ધ્યાન રાખે."
        ],
        icon: UserCheck
      }
    ],
    pa: [
      {
        title: "ਮੈਡੀਕਲ ਅਤੇ ਆਕਸੀਜਨ ਸੁਰੱਖਿਆ",
        headline: "ਪਹਾੜੀ ਉਚਾਈ 'ਤੇ ਸਾਹ ਸੁਰੱਖਿਆ (ਪ੍ਰਾਣ ਵਾਯੂ)",
        description: "12,000 ਫੁੱਟ ਤੋਂ ਵੱਧ ਉਚਾਈ 'ਤੇ ਚੜ੍ਹਨ ਲਈ ਖਾਸ ਸਰੀਰਕ ਤਿਆਰੀ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ। ਅਸੀਂ ਤੁਹਾਡੀ ਸਿਹਤ ਅਤੇ ਆਕਸੀਜਨ ਦਾ ਪੂਰਾ ਪ੍ਰਬੰਧ ਰੱਖਦੇ ਹਾਂ।",
        bullets: [
          "ਸਾਡੀਆਂ ਸਾਰੀਆਂ ਚਾਰਟਰਡ 4x4 ਬੋਲੈਰੋ/ਐਸਯੂਵੀ ਗੱਡੀਆਂ ਵਿੱਚ ਹਰ ਵੇਲੇ ਮੈਡੀਕਲ ਆਕਸੀਜਨ ਦੀ ਮੌਜੂਦਗੀ।",
          "ਦਿਨ ਵਿੱਚ ਦੋ ਵਾਰ (ਸਵੇਰੇ ਅਤੇ ਸ਼ਾਮ) ਹਰ ਯਾਤਰੀ ਦਾ ਆਕਸੀਜਨ ਲੈਵਲ ਚੈੱਕ ਕਰਨਾ ਅਤੇ ਰਿਕਾਰਡ ਰੱਖਣਾ।",
          "ਉਚਾਈ 'ਤੇ ਹੋਣ ਵਾਲੀ ਪਹਾੜੀ ਬਿਮਾਰੀ (AMS) ਤੋਂ ਬਚਣ ਲਈ ਵਿਸ਼ੇਸ਼ ਸਲਾਹ-ਮਸ਼ਵਰਾ।",
          "ਉੱਚੀ ਪਹਾੜੀ 'ਤੇ ਕਿਸੇ ਵੀ ਤਰ੍ਹਾਂ ਦੀ ਮੈਡੀਕਲ ਐਮਰਜੈਂਸੀ ਨੂੰ ਸੰਭਾਲਣ ਲਈ ਟ੍ਰੇਂਡ ਗਾਈਡ।"
        ],
        icon: HeartPulse
      },
      {
        title: "ਇਨਰ ਲਾਈਨ ਪਰਮਿਟ",
        headline: "100% ਸਫਲਤਾ ਦੇ ਨਾਲ ਸਰਕਾਰੀ ਪ੍ਰਮਾਣ ਪੱਤਰ ਪ੍ਰਬੰਧ",
        description: "ਆਦਿ ਕੈਲਾਸ਼ ਅਤੇ ਓਮ ਪਰਬਤ ਭਾਰਤ ਦੀ ਸੰਵੇਦਨਸ਼ੀਲ ਸਰਹੱਦ 'ਤੇ ਸਥਿਤ ਹਨ। ਪਰਮਿਟ ਦੀ ਸਾਰੀ ਜ਼ਿੰਮੇਵਾਰੀ ਸਾਡੀ ਹੁੰਦੀ ਹੈ।",
        bullets: [
          "ਸ਼ਰਧਾਲੂਆਂ ਨੂੰ ਕਿਸੇ ਵੀ ਦਫਤਰੀ ਲਾਈਨ ਵਿੱਚ ਖੜ੍ਹੇ ਹੋਣ ਦੀ ਲੋੜ ਨਹੀਂ, ਸਾਰੀ ਕਾਗਜ਼ੀ ਕਾਰਵਾਈ ਸਾਡੇ ਵੱਲੋਂ ਹੁੰਦੀ ਹੈ।",
          "ਪੁਲਿਸ ਵੈਰੀਫਿਕੇਸ਼ਨ ਅਤੇ ਬਾਇਓਮੈਟ੍ਰਿਕ ਮਨਜ਼ੂਰੀਆਂ ਆਸਾਨੀ ਨਾਲ ਕਰਵਾਉਣਾ।",
          "ਅਸੀਂ ਸਰਕਾਰ ਵੱਲੋਂ ਰਜਿਸਟਰਡ ਆਪਰੇਟਰ ਹਾਂ, ਜਿਸ ਕਾਰਨ ਪਰਮਿਟ ਤੁਰੰਤ ਜਾਰੀ ਹੁੰਦੇ ਹਨ।",
          "ਤੁਹਾਡੇ ਧਾਰਚੂਲਾ ਪਹੁੰਚਣ ਤੋਂ ਪਹਿਲਾਂ ਸਾਰੇ ਸੁਰੱਖਿਆ ਪਾਸ ਤਿਆਰ ਰੱਖਣ ਲਈ ਸਾਡਾ ਖਾਸ ਅਧਿਕਾਰੀ ਉੱਥੇ ਮੌਜੂਦ ਰਹਿੰਦਾ ਹੈ।"
        ],
        icon: FileText
      },
      {
        title: "ਸਾਤਵਿਕ ਭੋਜਨ ਅਤੇ ਨਿੱਘੀ ਰਿਹਾਇਸ਼",
        headline: "ਠੰਢ ਵਿੱਚ ਨਿੱਘੇ ਕਮਰੇ ਅਤੇ ਤਾਜ਼ਾ ਸਾਤਵਿਕ ਖਾਣਾ",
        description: "ਵਿਆਸ ਘਾਟੀ ਦੀ ਬਰਫੀਲੀ ਠੰਢ ਵਿੱਚ ਸਰੀਰ ਨੂੰ ਗਰਮ ਰੱਖਣ ਲਈ ਨਿੱਘੇ ਕਮਰੇ ਅਤੇ ਹਲਕਾ ਸਾਤਵਿਕ ਭੋਜਨ ਬਹੁਤ ਜ਼ਰੂਰੀ ਹੈ।",
        bullets: [
          "ਖਾਸ ਚੁਣੇ ਹੋਏ ਲੱਕੜ ਦੇ ਨਿਆਰੇ ਰਿਵਾਇਤੀ ਹੋਮਸਟੇਅ ਅਤੇ ਬਰਫੀਲੀ ਠੰਢ ਤੋਂ ਬਚਾਅ ਲਈ ਮੋਟੇ ਕੰਬਲ ਰਜ਼ਾਈਆਂ।",
          "ਬਰਫੀਲੇ ਤਾਪਮਾਨ ਵਿੱਚ ਨਹਾਉਣ ਅਤੇ ਹੱਥ-ਮੂੰਹ ਧੋਣ ਲਈ ਗਰਮ ਪਾਣੀ (ਗੀਜ਼ਰ) ਦਾ ਪ੍ਰਬੰਧ।",
          "ਸੌ ਫੀਸਦੀ ਸ਼ੁੱਧ ਸ਼ਾਕਾਹਾਰੀ ਅਤੇ ਜੈਵਿਕ (Satvik Organic) ਪਹਾੜੀ ਭੋਜਨ।",
          "ਬਿਨਾਂ ਲਸਣ-ਪਿਆਜ਼ ਦੇ ਤਿਆਰ ਕੀਤਾ ਹਲਕਾ ਭੋਜਨ ਤਾਂ ਜੋ ਉਚਾਈ 'ਤੇ ਪੇਟ ਖ਼ਰਾਬ ਨਾ ਹੋਵੇ।"
        ],
        icon: UtensilsCrossed
      },
      {
        title: "ਸਥਾਨਿਕ ਸ਼ੇਰਪਾ ਗਾਈਡ",
        headline: "ਗੁੰਜੀ ਅਤੇ ਵਿਆਸ ਘਾਟੀ ਦੇ ਅਸਲੀ ਪੁੱਤਰ",
        description: "ਸਾਡੇ ਗਾਈਡ ਗੁੰਜੀ ਅਤੇ ਧਾਰਚੂਲਾ ਦੇ ਸਥਾਨਿਕ ਵਸਨੀਕ ਹਨ, ਜੋ ਉਚਾਈ 'ਤੇ ਸਾਹ ਲੈਣ ਅਤੇ ਰਾਹਾਂ ਦੀ ਰਗ-ਰਗ ਤੋਂ ਵਾਕਿਫ਼ ਹਨ।",
        bullets: [
          "ਪਹਾੜੀ ਬੋਲੀ, ਹਿੰਦੀ, ਅੰਗਰੇਜ਼ੀ ਅਤੇ ਪੰਜਾਬੀ ਯਾਤਰੀਆਂ ਨਾਲ ਗੱਲਬਾਤ ਕਰਨ ਦਾ ਲਾਜਵਾਬ ਤਜਰਬਾ।",
          "ਪਾਰਵਤੀ ਕੁੰਡ, ਵਿਆਸ ਗੁਫਾ ਅਤੇ ਗੌਰੀ ਕੁੰਡ ਦਾ ਸੱਚਾ ਇਤਿਹਾਸਿਕ ਅਤੇ ਪ੍ਰਾਚੀਨ ਗਿਆਨ।",
          "ਫੌਜੀ ਚੈੱਕਪੋਸਟਾਂ 'ਤੇ ਚੈਕਿੰਗ ਨੂੰ ਤੁਰੰਤ ਅਤੇ ਆਸਾਨੀ ਨਾਲ ਪੂਰਾ ਕਰਵਾਉਣ ਦੀ ਮੁਹਾਰਤ।",
          "ਗਰਮ ਸੁਭਾਅ ਵਾਲੀ ਪਹਾੜੀ ਮਹਿਮਾਨਨਿਵਾਜ਼ੀ, ਜੋ ਯਾਤਰੀਆਂ ਨੂੰ ਆਪਣੇ ਘਰ ਦੇ ਮੈਂਬਰ ਵਾਂਗ ਰੱਖਦੀ ਹੈ।"
        ],
        icon: UserCheck
      }
    ]
  };

  // Localized FAQ list inside the page to reinforce the professional structure & eliminate mixed text
  const faqListMap: { [lang: string]: Array<{ q: string; a: string }> } = {
    en: [
      {
        q: "What is the age limit and fit criteria for Mt. Adi Kailash?",
        a: "As per Uttarakhand Government rules, the permitted age is 09 to 70 years. Yatris must carry a high-altitude physical fitness medical certificate signed by an authorized physician."
      },
      {
        q: "Do I need a Chinese Visa or Indian Passport to visit Om Parvat?",
        a: "No! Unlike Tibet-Kailash which requires a Chinese military visa, Mount Adi Kailash and Om Parvat are fully within Indian territory. No passport or visa is required for Indian citizens. Only Government Inner Line Permits are needed."
      },
      {
        q: "How does the team handle high altitude sickness (AMS)?",
        a: "Our SUVs carry continuous-flow oxygen cylinders. We maintain strict oximeter monitoring logs. If acclimatization drops below safe parameters, our crew immediately initiates descent protocols accompanied by medical first-responders."
      },
      {
        q: "What type of vehicles are used in Vyas Valley?",
        a: "We only operate certified 4-wheel-drive (4x4) Bolero Campers or highly rugged Scorpio SUVs. Standard hatchbacks or lightweight sedans are completely prohibited beyond safety checks."
      }
    ],
    hi: [
      {
        q: "आदि कैलाश यात्रा के लिए आयु सीमा और शारीरिक फिटनेस नियम क्या हैं?",
        a: "उत्तराखंड सरकार के दिशा-निर्देशों के अनुसार, अनुमति आयु 09 से 70 वर्ष के बीच है। यात्रियों के पास एक पंजीकृत योग्य चिकित्सक द्वारा हस्ताक्षरित फिटनेस प्रमाण पत्र होना अनिवार्य है।"
      },
      {
        q: "क्या ओम पर्वत दर्शन के लिए चीनी वीज़ा या पासपोर्ट की आवश्यकता है?",
        a: "बिल्कुल नहीं! तिब्बत-मानसरोवर यात्रा के विपरीत जहाँ चीनी वीज़ा की आवश्यकता होती है, आदि कैलाश और ओम पर्वत पूरी तरह से भारतीय सीमा में स्थित हैं। इसके लिए पासपोर्ट या वीज़ा की आवश्यकता नहीं है, केवल इनर लाइन पास अनिवार्य है।"
      },
      {
        q: "अचानक ऑक्सीजन की कमी (AMS) होने पर टीम क्या करती है?",
        a: "हमारी गाड़ियों में आपातकालीन ऑक्सीजन सिलेंडर हमेशा लगे होते हैं। हमारी टीम सुबह-शाम यात्रियों के ऑक्सीजन स्तर की जांच करती है ताकि किसी भी यात्री का स्वास्थ्य न बिगड़े। जरूरत पड़ने पर तुरंत रोगी को नीचे सुरक्षित स्थान पर लाया जाता है।"
      },
      {
        q: "व्यास घाटी की दुर्गम सड़कों पर किस प्रकार के वाहनों का उपयोग होता है?",
        a: "हम केवल प्रमाणित 4x4 बोलेरो कैम्पर या अत्यधिक मजबूत स्कॉर्पियो जैसे एसयूवी संचालित करते हैं। सुरक्षा कारणों से धारचूला से आगे किसी भी सामान्य कार को ले जाने की अनुमति नहीं है।"
      }
    ],
    ta: [
      {
        q: "ஆதி கைலாச யாத்திரைக்கு வயது வரம்பு மற்றும் தகுதி விதிகள் என்ன?",
        a: "உத்தராகண்ட் அரசு விதிகளின்படி, யாத்திரைக்கான வயது வரம்பு 09 முதல் 70 ஆண்டுகள் வரை ஆகும். மருத்துவரின் சீல் வைக்கப்பட்ட உடல் தகுதி சான்றிதழ் அவசியம்."
      },
      {
        q: "ஓம் பர்வதத்தை தரிசிக்க சீன விசா அல்லது பாஸ்போர்ட் தேவையா?",
        a: "இல்லை! சீனாவிற்குள் இருக்கும் திபெத் கைலாஷ் போலன்றி, ஆதி கைலாஷ் மற்றும் ஓம் பர்வதம் 100% இந்திய எல்லைக்குள்ளேயே உள்ளன. இதற்கு பாஸ்போர்ட் அல்லது விசா தேவையில்லை, எல்லை அனுமதி சீட்டு மட்டுமே போதுமானது."
      },
      {
        q: "உயரமான மலைகளில் மூச்சுத்திணறல் ஏற்பட்டால் என்ன செய்வீர்கள்?",
        a: "எங்களது வாகனங்களில் தொடர்ச்சியான ஆக்ஸிஜன் சிலிண்டர்கள் உள்ளன. வழிகாட்டிகள் தினசரி இருமுறை பரிசோதனை செய்வார்கள். தீவிர மூச்சுத்திணறல் அறிகுறி தெரிந்தால் யாத்ரீகர் உடனடியாக பாதுகாப்பாக கீழ் பகுதிக்கு அழைத்துச் செல்லப்படுவார்."
      },
      {
        q: "மலைப்பாதைகளில் எத்தகைய வாகனங்கள் பயன்படுத்தப்படுகின்றன?",
        a: "பாதுகாப்பு விதிகளின்படி, தார்ச்சுலாவிற்கு அப்பால் மிக வலுவான 4x4 பொலிரோ அல்லது ஸ்கார்பியோ கார்கள் மட்டுமே இயக்க அனுமதிக்கப்படுகின்றன. சிறிய கார்கள் அனுமதிக்கப்படுவதில்லை."
      }
    ],
    te: [
      {
        q: "ఆది కైలాష్ యాత్రకు వయస్సు పరిమితి మరియు ఫిట్నెస్ నిబంధనలు ఏమిటి?",
        a: "ఉత్తరాఖండ్ ప్రభుత్వ నిబంధనల ప్రకారం, అనుమతించబడిన వయస్సు 09 నుండి 70 సంవత్సరాలు. ఒక నమోదిత డాక్టర్ అందించిన ఫిట్నెస్ సర్టిఫికేట్ తప్పనిసరి."
      },
      {
        q: "ఓం పర్వతం సందర్శించడానికి చైనా వీసా లేదా పాస్‌పోర్ట్ అవసరమా?",
        a: "అస్సలు అవసరం లేదు! చైనా ఆధీనంలో ఉన్న టిబెట్ కైలాష్ యాత్రలా కాకుండా, ఆది కైలాష్ మరియు ఓం పర్వతం పూర్తిగా భారత పరిధిలోనే ఉన్నాయి. దీనికి పాస్‌పోర్ట్ లేదా వీసా అవసరం లేదు, కేవలం ఇన్నర్ లైన్ పర్మిట్ సరిపోతుంది."
      },
      {
        q: "తీవ్రమైన ఎత్తులలో శ్వాస ఆడకపోతే మా బృందం ఎలా స్పందిస్తుంది?",
        a: "మా వాహనాలలో ఆక్సిజన్ నిల్వలు నిరంతరం ఉంటాయి. రోజుకు రెండుసార్లు మీ ఆక్సిజన్ శాతాన్ని తనిఖీ చేస్తాము. ఎవరికైనా ఆరోగ్యం బాగోలేకపోతే వెంటనే వారిని కింది స్థావరానికి తరలిస్తాము."
      },
      {
        q: "వ్యాస్ వ్యాలీ రోడ్లలో ఎటువంటి వాహనాలు ఉపయోగిస్తారు?",
        a: "మేము కేవలం బలమైన 4x4 బొలెరో క్యాంపర్ లేదా స్కార్పియో ఎస్‌యూవీ వాహనాలను మాత్రమే నడుపుతాము. సాధారణ కార్లను అక్కడి చెక్‌పోస్ట్‌ల దాటి అనుమతించరు."
      }
    ],
    gu: [
      {
        q: "આદિ કૈલાશ યાત્રા માટે સીમા ઉંમર અને શારીરિક ફિટનેસ નિયમો શું છે?",
        a: "ઉત્તરાખંડ સરકારના નિયમ મુજબ, ઉંમર મર્યાદા ૦૯ થી ૭૦ વર્ષની વચ્ચે હોવી જોઈએ. મોઇન તબીબી પ્રમાણપત્ર જેમાં ડોક્ટર ની સહી હોય તે ફરજિયાત છે."
      },
      {
        q: "શું ઓમ પર્વત દર્શન માટે ચાઇનીઝ વિઝા કે પાસપોર્ટ જરૂરી છે?",
        a: "બિલકુલ નહીં! તિબેટ કૈલાશ માટે ચાઇનીઝ વિઝા જરૂરી છે પરંતુ આદિ કૈલાશ અને ઓમ પર્વત ભારતની નકશા ની અંદર આવેલ છે. તેથી પાસપોર્ટ કે વિઝાની કોઈ જરૂર નથી, માત્ર લશ્કરી ઇનર લાઇન પાસ જરૂરી છે."
      },
      {
        q: "ઊંચાઈ પર શ્વાસ લેવામાં તકલીફ થાય તો આપની ટીમ શું કરે છે?",
        a: "અમારી પાસે સતત કાર્યરત ઓક્સિજન બોટલો નો જથ્થો હોય છે. ઓક્સિમીટર માપીને તબિયત પર નજર રખાય છે. જો તબિયત બગડે તો અમારા ગાઈડ દર્દીને તાત્કાલિક ધારચુલા હેડક્વાર્ટર તરફ હેમખેમ પરત મોકલે છે."
      },
      {
        q: "વ્યાસ ખીણના રસ્તાઓ ખૂબ ભારે હોવાથી ત્યાં ક્યાં વાહનો ચાલે છે?",
        a: "અમે ફક્ત મજબૂત અને પરિક્ષિત 4x4 બોલેરો કેમ્પર અથવા સ્કોર્પિયો એસયુવી વાહનો ચલાવીએ છીએ. સામાન્ય હેચબેક કાર સલામતી માટે બિલકુલ પ્રતિબંધિત છે."
      }
    ],
    pa: [
      {
        q: "ਆਦਿ ਕੈਲਾਸ਼ ਯਾਤਰਾ ਲਈ ਉਮਰ ਸੀਮਾ ਅਤੇ ਫਿਟਨੈਸ ਨਿਯਮ ਕੀ ਹਨ?",
        a: "ਉੱਤਰਾਖੰਡ ਸਰਕਾਰ ਦੇ ਨਿਯਮਾਂ ਅਨੁਸਾਰ ਯਾਤਰਾ ਲਈ ਉਮਰ ਸੀਮਾ 09 ਤੋਂ 70 ਸਾਲ ਹੈ। ਕਿਸੇ ਮਾਹਿਰ ਡਾਕਟਰ ਦੁਆਰਾ ਦਿੱਤਾ ਫਿਟਨੈਸ ਸਰਟੀਫਿਕੇਟ ਹੋਣਾ ਬਹੁਤ ਜ਼ਰੂਰੀ ਹੈ।"
      },
      {
        q: "ਕੀ ਓਮ ਪਰਬਤ ਜਾਣ ਲਈ ਚੀਨੀ ਵੀਜ਼ਾ ਜਾਂ ਪਾਸਪੋਰਟ ਚਾਹੀਦਾ ਹੈ?",
        a: "ਬਿਲਕੁਲ ਨਹੀਂ! ਤਿੱਬਤ ਕੈਲਾਸ਼ ਯਾਤਰਾ ਲਈ ਚੀਨੀ ਵੀਜ਼ਾ ਲੱਗਦਾ ਹੈ, ਪਰ ਆਦਿ ਕੈਲਾਸ਼ ਅਤੇ ਓਮ ਪਰਬਤ ਪੂਰੀ ਤਰ੍ਹਾਂ ਭਾਰਤੀ ਸੀਮਾ ਵਿੱਚ ਹਨ। ਇਸ ਲਈ ਕਿਸੇ ਵੀਜ਼ਾ ਜਾਂ ਪਾਸਪੋਰਟ ਦੀ ਲੋੜ ਨਹੀਂ, ਸਿਰਫ ਇਨਰ ਲਾਈਨ ਪਰਮਿਟ ਚਾਹੀਦਾ ਹੈ।"
      },
      {
        q: "ਜੇ ਉਚਾਈ 'ਤੇ ਸਾਹ ਦੀ ਤਕਲੀਫ ਹੋਵੇ ਤਾਂ ਕੀ ਪ੍ਰਬੰਧ ਹੁੰਦਾ ਹੈ?",
        a: "ਸਾਡੀਆਂ ਗੱਡੀਆਂ ਵਿੱਚ ਹਮੇਸ਼ਾ ਆਕਸੀਜਨ ਸਿਲੰਡਰ ਤਿਆਰ ਹੁੰਦੇ ਹਨ। ਸਾਡੇ ਮਾਹਿਰ ਹਰ ਯਾਤਰੀ ਦਾ ਆਕਸੀਜਨ ਲੈਵਲ ਰੋਜ਼ ਚੈੱਕ ਕਰਦੇ ਹਨ। ਜੇ ਕਿਸੇ ਦਾ ਆਕਸੀਜਨ ਲੈਵਲ ਘਟੇ ਤਾਂ ਉਨ੍ਹਾਂ ਨੂੰ ਤੁਰੰਤ ਹੇਠਾਂ ਲਿਆਂਦਾ ਜਾਂਦਾ ਹੈ।"
      },
      {
        q: "ਵਿਆਸ ਘਾਟੀ ਦੇ ਖ਼ਤਰਨਾਕ ਰਸਤਿਆਂ ਲਈ ਕਿਹੜੀਆਂ ਗੱਡੀਆਂ ਵਰਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ?",
        a: "ਅਸੀਂ ਸਿਰਫ ਮਜ਼ਬੂਤ 4x4 ਬੋਲੈਰੋ ਕੈਂਪਰ ਅਤੇ ਸਕਾਰਪੀਓ ਵਰਗੀਆਂ ਗੱਡੀਆਂ ਹੀ ਵਰਤਦੇ ਹਾਂ। ਛੋਟੀਆਂ ਕਾਰਾਂ ਨੂੰ ਅੱਗੇ ਜਾਣ ਦੀ ਮਨਾਹੀ ਹੁੰਦੀ ਹੈ।"
      }
    ]
  };

  const labels = uiLabelsMap[currentLanguage] || uiLabelsMap["en"];
  const pillars = pillarsContentMap[currentLanguage] || pillarsContentMap["en"];
  const faqs = faqListMap[currentLanguage] || faqListMap["en"];

  const activePillar = pillars[activeTab];
  const ActiveIcon = activePillar.icon;

  return (
    <section className="bg-white dark:bg-zinc-950 py-12 md:py-20 px-4 animate-fade-in text-slate-900 dark:text-zinc-100">
      <div className="w-full max-w-full mx-auto px-4 lg:px-12">
        
        {/* Header Block Section */}
        <div className="text-center flex flex-col items-center gap-2 mb-12 select-none">
          <span className="text-sky-500 font-mono text-xs font-bold uppercase tracking-[0.25em] block animate-pulse">
            {labels.tagline}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-zinc-100 mt-1 max-w-3xl leading-tight">
            {labels.title}
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-sky-600 to-blue-500 rounded mt-3 mb-1" />
          <p className="text-slate-900 dark:text-zinc-100 text-sm md:text-base max-w-2xl leading-relaxed mt-2">
            {labels.subtitle}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
            <button
              onClick={onNavigateToCatalog}
              className="bg-sky-600 hover:bg-sky-550 border border-sky-500/30 text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-md transition duration-300 shadow-xl shadow-sky-600/10 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>{labels.btnCatalog}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onOpenConsultant}
              className="bg-slate-100 dark:bg-zinc-900 hover:bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-sky-400 hover:text-slate-900 dark:text-zinc-100 font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-md transition duration-300 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-sky-500" />
              <span>{labels.btnConsult}</span>
            </button>
          </div>
        </div>

        {/* Statistical Achievements Grid Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {[
            { metric: labels.statYatris, label: labels.statYatrisLbl, desc: "Zero casualties", color: "from-sky-500/10 to-transparent" },
            { metric: labels.statPermits, label: labels.statPermitsLbl, desc: "Flawless paperwork", color: "from-blue-500/10 to-transparent" },
            { metric: labels.statOxygen, label: labels.statOxygenLbl, desc: "SUV mounted vessels", color: "from-sky-500/10 to-transparent" },
            { metric: labels.statYears, label: labels.statYearsLbl, desc: "Native command", color: "from-blue-500/10 to-transparent" }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`p-6 bg-gradient-to-b ${item.color} to-transparent/30 border border-slate-300/70 dark:border-zinc-700/70 rounded-2xl text-center shadow-lg transition duration-500 hover:border-sky-500/15`}
            >
              <h3 className="text-2xl md:text-4xl font-serif font-extrabold text-sky-400 tracking-tight">
                {item.metric}
              </h3>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-900 mt-1 uppercase font-mono tracking-wide leading-tight">
                {item.label}
              </p>
              <span className="text-[10px] text-slate-900 dark:text-zinc-100 block mt-1.5 font-mono italic">
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Main interactive Tab Switch Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2 mb-16">
          
          {/* Left: Tab Trigger list (width block: 4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {[
              { id: 0, title: labels.tabMedical, desc: "Oxygen cylinders & pulse logs", icon: HeartPulse },
              { id: 1, title: labels.tabPermits, desc: "SDM permissions & character vetting", icon: FileText },
              { id: 2, title: labels.tabStays, desc: "Handpicked wooden cottages & organic meals", icon: UtensilsCrossed },
              { id: 3, title: labels.tabGuides, desc: "Gunji & Vyas valley native experts", icon: UserCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                    isSelected
                      ? "bg-slate-100 dark:bg-zinc-900 border-sky-500/50 shadow-xl shadow-sky-500/5 ring-1 ring-sky-500/20"
                      : "bg-white/40 dark:bg-zinc-950/40 border-slate-300 dark:border-zinc-700 hover:border-slate-300 dark:border-zinc-700 hover:bg-slate-100/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 text-slate-900 dark:text-zinc-100"
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${
                    isSelected ? "bg-sky-600/10 text-sky-400" : "bg-slate-100/50 dark:bg-zinc-900/50 text-slate-900 dark:text-zinc-100"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="leading-tight">
                    <h4 className={`text-sm font-bold tracking-wide ${isSelected ? "text-white" : "text-slate-900 dark:text-zinc-100"}`}>
                      {tab.title}
                    </h4>
                    <span className="text-[11px] text-slate-900 dark:text-zinc-100 block mt-0.5">
                      {tab.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Tab view detail details panel (width block: 8/12) */}
          <div className="lg:col-span-8 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-600/5 blur-3xl rounded-full" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 select-none">
                <div className="p-3 bg-sky-600/10 rounded-xl text-sky-400 shrink-0">
                  <ActiveIcon className="h-6 w-6 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-sky-500 uppercase tracking-widest">
                    CORE SECURITY PILLARS
                  </span>
                  <h3 className="font-serif text-lg md:text-2xl font-extrabold text-slate-900 dark:text-zinc-100 mt-0.5 leading-tight">
                    {activePillar.headline}
                  </h3>
                </div>
              </div>

              <p className="text-slate-900 dark:text-zinc-100 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                {activePillar.description}
              </p>

              {/* bullets list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activePillar.bullets.map((bullet, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 bg-white/60 dark:bg-zinc-950/60 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl flex items-start gap-2.5 hover:border-sky-500/10 transition"
                  >
                    <ShieldCheck className="h-4.5 w-4.5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-900 dark:text-zinc-100 text-xs leading-relaxed font-sans">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* micro accreditation confirmation note inside the block footer */}
            <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-zinc-800/80 flex items-center gap-2.5 text-slate-900 dark:text-zinc-100 text-[10.5px] font-mono select-none">
              <Trophy className="h-3.5 w-3.5 text-sky-500 shrink-0" />
              <span>Registered Uttarakhand Tourism and border authorities certified safeguards active.</span>
            </div>
          </div>
        </div>

        {/* Dynamic High Altitude Safeguard FAQ Block */}
        <div className="bg-slate-100/45 dark:bg-zinc-900/45 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 text-left animate-fade-in mb-12 select-none">
          <div className="mb-6">
            <h3 className="font-serif text-xl md:text-2xl font-extrabold text-slate-900 dark:text-zinc-100">
              {labels.securingFaq}
            </h3>
            <p className="text-slate-900 dark:text-zinc-100 text-xs mt-1">
              {labels.securingFaqSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="p-4 bg-white dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800/60 rounded-xl transition duration-300 hover:border-sky-500/10 flex flex-col gap-2"
              >
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-4.5 w-4.5 text-sky-500 shrink-0 mt-0.5" />
                  <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-zinc-100 tracking-wide">
                    {faq.q}
                  </h4>
                </div>
                <p className="text-slate-900 dark:text-zinc-100 text-xs leading-relaxed font-normal pl-7 border-l border-slate-200 dark:border-zinc-800">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditations Trust block banner with golden text */}
        <div className="bg-white/80 dark:bg-zinc-950/80 border border-sky-500/10 rounded-2xl p-6 text-center select-none relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600/5 via-blue-500/5 to-transparent blur-md" />
          <h4 className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-[0.2em] mb-4">
            {labels.accreditationTitle}
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-4 text-[11px] font-mono text-slate-900 dark:text-zinc-100">
            <span className="bg-slate-100/80 dark:bg-zinc-900/80 px-4 py-2 border border-slate-200 dark:border-zinc-800 rounded-lg shadow font-semibold">
              UT-NT-2026-904
            </span>
            <span className="bg-slate-100/80 dark:bg-zinc-900/80 px-4 py-2 border border-slate-200 dark:border-zinc-800 rounded-lg shadow font-semibold">
              UT-NOC-SHIVA-9092
            </span>
            <span className="bg-slate-100/80 dark:bg-zinc-900/80 px-4 py-2 border border-slate-200 dark:border-zinc-800 rounded-lg shadow font-semibold">
              GOVT. REGD. MSME IND7409
            </span>
            <span className="bg-slate-100/80 dark:bg-zinc-900/80 px-4 py-2 border border-sky-500/20 rounded-lg text-sky-400 shadow font-extrabold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-600 animate-ping" />
              UTTARAKHAND TOURISM UTB-809
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
