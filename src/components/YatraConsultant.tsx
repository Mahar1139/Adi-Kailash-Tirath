import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, User, ShieldCheck, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";

interface YatraConsultantProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: string;
}

export default function YatraConsultant({ isOpen, onClose, currentLanguage = "en" }: YatraConsultantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "bot",
      text: "Namaste Yatri! 🙏 Welcome to Adi Kailash Tirath. I am your dedicated **AI Spiritual Yatra Guide**.\n\nPreparing for high altitudes like **Kailash Mansarovar (18,000 ft+)** or **Adi Kailash** demands meticulous packing, health acclimatization, and permit clearances. \n\nAsk me anything! For example:\n*   *What fitness training should I start?*\n*   *What are the essential packing items?*\n*   *Chardham Yatra best time to visit?*",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const greetingMap: { [key: string]: string } = {
      en: "Namaste Yatri! 🙏 Welcome to Adi Kailash Tirath. I am your dedicated **AI Spiritual Yatra Guide**.\n\nPreparing for high altitudes like **Kailash Mansarovar (18,000 ft+)** or **Adi Kailash** demands meticulous packing, health acclimatization, and permit clearances. \n\nAsk me anything! For example:\n*   *What fitness training should I start?*\n*   *What are the essential packing items?*\n*   *Chardham Yatra best time to visit?*",
      hi: "नमस्ते यात्री! 🙏 आदि कैलाश तीर्थ में आपका स्वागत है। मैं आपका समर्पित **एआई आध्यात्मिक यात्रा मार्गदर्शक** हूँ।\n\nकैलाश मानसरोवर (18,000 फीट+) या आदि कैलाश जैसी ऊंचाई के लिए सावधानीपूर्वक पैकिंग, स्वास्थ्य अनुकूलन और परमिट की आवश्यकता होती है।\n\nमुझसे कुछ भी पूछें! उदाहरण के लिए:\n*   *मुझे कौन सी फिटनेस ट्रेनिंग शुरू करनी चाहिए?*\n*   *जरूरी पैकिंग आइटम क्या हैं?*\n*   *चारधाम यात्रा शुरू करने का सबसे अच्छा समय क्या है?*",
      ta: "நமஸ்தே யாத்ரி! 🙏 ஆதி கைலாஷ் தீர்த்தம் உங்களை அன்புடன் வரவேற்கிறது. நான் உங்களின் பிரத்தியேக **AI ஆன்மீக யாத்திரை வழிகாட்டி**.\n\nகைலாஷ் மானசரோவர் (18,000 அடி+) அல்லது ஆதி கைலாசம் போன்ற உயரமான பகுதிகளுக்குச் செல்ல விரிவான பேக்கிங் மற்றும் ஆரோக்கிய தயாரிப்பு தேவை.\n\nஎன்னிடம் கேளுங்கள்! உதாரணத்திற்கு:\n*   *நான் என்ன உடற்பயிற்சி செய்ய வேண்டும்?*\n*   *யாத்திரைக்கு என்னென்ன பொருட்களை பேக் செய்ய வேண்டும்?*\n*   *சார் தாம் யாத்திரை செல்ல சிறந்த நேரம் எது?*",
      te: "నమస్తే యాత్రీ! 🙏 ఆది కైలాష్ తీర్థ్‌కు స్వాగతం. నేను మీ అంకితమైన **AI ఆధ్యాత్మిక యాత్ర గైడ్**.\n\nకైలాస మానస సరోవరం (18,000 అడుగులు+) లేదా ఆది కైలాష్ వంటి ఎత్తైన ప్రదేశాలకు వెళ్లేందుకు ప్యాకింగ్, ఆరోగ్యం మరియు అనుమతులు అవసరం.\n\nనన్ను ఏదైనా అడగండి! ఉదాహరణకు:\n*   *నేను ఏ ఫిట్‌నెస్ శిక్షణ ప్రారంభించాలి?*\n*   *ముఖ్యమైన ప్యాకింగ్ ఐటెంస్ ఏమిటి?*\n*   *చార్ ధామ్ యాత్రకు సరైన సమయం ఏది?*",
      gu: "નમસ્તે યાત્રી! 🙏 આદિ કૈલાશ તીર્થમાં આપનું સ્વાગત છે. હું તમારો સમર્પિત **AI આધ્યાત્મિક યાત્રા માર્ગદર્શક** છું.\n\nકૈલાશ માનસરોવર (18,000 ફૂટ+) અથવા આદિ કૈલાશ જેવી ઊંચી ટેકરીઓ માટે પૂર્વ આયોજન, આરોગ્ય અને પરમિટ જરૂરી છે.\n\nમને કંઈ પણ પૂછો! ઉદાહરણ તરીકે:\n*   *મારે કઈ શારીરિક કસરત શરૂ કરવી જોઈએ?*\n*   *કઈ વસ્તુઓ સાથે રાખવી જરૂરી છે?*\n*   *ચારધામ યાત્રા માટે શ્રેષ્ઠ સમય કયો છે?*",
      pa: "ਨਮਸਤੇ ਯਾਤਰੀ! 🙏 ਆਦਿ ਕੈਲਾਸ਼ ਤੀਰਥ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਮੈਂ ਤੁਹਾਡਾ ਸਮਰਪਿਤ **AI ਅਧਿਆਤਮਿਕ ਯਾਤਰਾ ਗਾਈਡ** ਹਾਂ।\n\nਕੈਲਾਸ਼ ਮਾਨਸਰੋਵਰ (18,000 ਫੁੱਟ+) ਜਾਂ ਆਦਿ ਕੈਲਾਸ਼ ਵਰਗੀਆਂ ਉਚਾਈਆਂ ਲਈ ਪੂਰੀ ਤਿਆਰੀ, ਸਿਹਤ ਅਤੇ ਪਰਮਿਟਾਂ ਦੀ ਜ਼ਰੂਰਤ ਹੁੰਦੀ ਹੈ।\n\nਮੈਨੂੰ ਕੁਝ ਵੀ ਪੁੱਛੋ! ਉਦਾਹਰਣ ਵਜੋਂ:\n*   *ਮੈਨੂੰ ਕਿਹੜੀ ਫਿਟਨੈਸ ਟ੍ਰੇਨਿੰਗ ਸ਼ੁਰੂ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ?*\n*   *ਯਾਤਰਾ ਦੌਰਾਨ ਕਿਹੜਾ ਸਮਾਨ ਨਾਲ ਲੈਣਾ ਜ਼ਰੂਰੀ ਹੈ?*\n*   *ਚਾਰਧਾਮ ਯਾਤਰਾ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ ਕਿਹੜਾ ਹੈ?*"
    };

    setMessages((prev) => {
      return prev.map((m) => {
        if (m.id === "init") {
          return {
            ...m,
            text: greetingMap[currentLanguage] || greetingMap["en"]
          };
        }
        return m;
      });
    });
  }, [currentLanguage]);

  const quickPromptsMap: { [key: string]: string[] } = {
    en: ["Adi Kailash packing list", "How to tackle altitude sickness?", "No-Visa Aerial Flight details", "Chardham Yatra best time"],
    hi: ["आदि कैलाश पैकिंग लिस्ट", "ऊंचाई की बीमारी से कैसे निपटें?", "बिना वीजा हवाई उड़ान विवरण", "चारधाम यात्रा का सही समय"],
    ta: ["ஆதி கைலாஷ் பேக்கிங் லிஸ்ட்", "மலை நோயை சமாளிப்பது எப்படி?", "விசா இல்லாத வான்வழி பயணம்", "சார் தாம் யாத்திரை சிறந்த நேரம்"],
    te: ["ఆది కైలాష్ ప్యాకింగ్ లిస్ట్", "పర్వత అనారోగ్యం ఎలా జయించాలి?", "వీసా లేని విమాన దర్శనం", "చార్ ధామ్ యాత్ర సరైన సమయం"],
    gu: ["આદિ કૈલાશ સામાન યાદી", "પહાડી માંદગીથી કેવી રીતે બચવું?", "વિઝા વગર હવાઈ ઉડાન વિગત", "ચારધામ યાત્રાનો શ્રેષ્ઠ સમય"],
    pa: ["ਆਦਿ ਕੈਲਾਸ਼ ਪੈਕਿੰਗ ਲਿਸਟ", "ਪਹਾੜੀ ਬਿਮਾਰੀ ਤੋਂ ਕਿਵੇਂ ਬਚੀਏ?", "ਬਿਨਾਂ ਵੀਜ਼ਾ ਹਵਾਈ ਯਾਤਰਾ", "ਚਾਰਧਾਮ ਯਾਤਰਾ ਦਾ ਸਹੀ ਸਮਾਂ"]
  };

  const uiLabelsMap: { [key: string]: { [key: string]: string } } = {
    en: {
      title: "Yatra Consultant",
      connected: "🕉️ Connected to Guideworks",
      waiting: "Guide Ajay is consulting the scriptures...",
      placeholder: "Type your yatra question here...",
      poweredBy: "⚡ Powered by Gemini Flash and Adi Kailash Tirath Knowledgebase Team.",
      error: "🚩 **Namaste**, it seems there is a temporary network lag in our Himalayan receiver. Please submit your booking plan in the form above and our human consultant will call you directly!"
    },
    hi: {
      title: "यात्रा सलाहकार एआई",
      connected: "🕉️ गाइडवर्क्स से जुड़े हैं",
      waiting: "मार्गदर्शक अजय शास्त्रों और यात्रा नियमों को देख रहे हैं...",
      placeholder: "अपनी यात्रा के बारे में प्रश्न यहाँ लिखें...",
      poweredBy: "⚡ जेमिनी फ्लैश और आदि कैलाश तीर्थ ज्ञान टीम द्वारा संचालित।",
      error: "🚩 **नमस्ते**, ऐसा लगता है कि हमारे हिमालयी रिसीवर में अस्थायी नेटवर्क लैग है। कृपया ऊपर दिए गए फॉर्म में अपना विवरण सबमिट करें और हमारे मानव सलाहकार सीधे आपसे संपर्क करेंगे!"
    },
    ta: {
      title: "யாத்திரை வழிகாட்டி AI",
      connected: "🕉️ வழிகாட்டி நெட்வொர்க்குடன் இணைக்கப்பட்டுள்ளது",
      waiting: "வழிகாட்டி அஜய் ஆன்மீக நூல்களை ஆராய்கிறார்...",
      placeholder: "உங்கள் யாத்திரை கேள்வியை இங்கே தட்டச்சு செய்யவும்...",
      poweredBy: "⚡ ஜெமினி ஏஐ மற்றும் ஆதி கைலாஷ் தீர்த்தக் குழுவால் இயக்கப்படுகிறது.",
      error: "🚩 **நமஸ்தே**, இமயமலை நெட்வொர்க்கில் தற்காலிக தொடர்பு தடை ஏற்பட்டுள்ளது. தயவுசெய்து மேலே உள்ள படிவத்தில் உங்கள் திட்டத்தை சமர்ப்பிக்கவும், எங்களது நிபுணர் உங்களை நேரடியாக அழைப்பார்!"
    },
    te: {
      title: "యాత్రా సలహాదారు AI",
      connected: "🕉️ గైడ్‌వర్క్స్‌తో అనుసంధానించబడింది",
      waiting: "గైడ్ అజయ్ శాస్త్రాలను పరిశీలిస్తున్నారు...",
      placeholder: "మీ యాత్రా ప్రశ్నను ఇక్కడ అడగండి...",
      poweredBy: "⚡ జెమిని ఫ్లాష్ మరియు ఆది కైలాష్ తీర్థ్ బృందంచే ఆధారితం.",
      error: "🚩 **నమస్తే**, నెట్‌వర్క్ సమస్య ఉంది. దయచేసి పైన ఉన్న ఫారమ్‌ను పూరించండి, మా ప్రతినిధి మీకు నేరుగా కాల్ చేస్తారు!"
    },
    gu: {
      title: "યાત્રા સલાહકાર AI",
      connected: "🕉️ ગાઈડવર્કસ સાથે જોડાયેલ છે",
      waiting: "માર્ગદર્શક અજય શાસ્ત્રો અને નિયમો ચકાસી રહ્યા છે...",
      placeholder: "આપની યાત્રા સંબંધિત પ્રશ્ન અહીં લખો...",
      poweredBy: "⚡ જેમિની ફ્લેશ અને આદિ કૈલાશ તીર્થ ટીમ દ્વારા સંચાલિત.",
      error: "🚩 **નમસ્તે**, હિમાલય નેટવર્કમા અસ્થાયી સમસ્યા જણાય છે. કૃપા કરીને ઉપરના ફોર્મમાં ડ્રાફ્ટ સબમિટ કરો, અમારા નિષ્ણાતો આપને કોલ કરશે!"
    },
    pa: {
      title: "ਯਾਤਰਾ ਸਲਾਹਕਾਰ AI",
      connected: "🕉️ ਗਾਈਡਵਰਕਸ ਨਾਲ ਕਨੈਕਟਡ",
      waiting: "ਗਾਈਡ ਅਜੇ ਸ਼ਾਸਤਰਾਂ ਦੀ ਸਲਾਹ ਲੈ ਰਹੇ ਹਨ...",
      placeholder: "ਆਪਣੀ ਯਾਤਰਾ ਦਾ ਸਵਾਲ ਇੱਥੇ ਲਿਖੋ...",
      poweredBy: "⚡ ਜੇਮਿਨੀ ਫਲੈਸ਼ ਅਤੇ ਆਦਿ ਕੈਲਾਸ਼ ਤੀਰਥ ਟੀਮ ਦੁਆਰਾ ਸੰਚਾਲਿਤ।",
      error: "🚩 **ਨਮਸਤੇ**, ਹਿਮਾਲੀਅਨ ਨੈੱਟਵਰਕ ਵਿੱਚ ਕੁਝ ਸਮੱਸਿਆ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਉੱਪਰ ਦਿੱਤੇ ਫਾਰਮ ਵਿੱਚ ਆਪਣਾ ਵੇਰਵਾ ਭੇਜੋ, ਸਾਡੇ ਮਾਹਿਰ ਤੁਹਾਨੂੰ ਫੋਨ ਕਰਨਗੇ।"
    }
  };

  const quickPrompts = quickPromptsMap[currentLanguage] || quickPromptsMap["en"];
  const labels = uiLabelsMap[currentLanguage] || uiLabelsMap["en"];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Speak with Express API proxy
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text
          })),
          language: currentLanguage
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: data.text,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("API response error");
      }
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: labels.error,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[360px] md:w-[400px] h-[550px] bg-white dark:bg-zinc-950 border border-orange-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300 font-sans">
      
      {/* Bot Header */}
      <div className="p-4 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 border-b border-orange-200 flex justify-between items-center select-none">
        <div className="flex items-center gap-2.5 text-left">
          <div className="h-9 w-9 rounded-full bg-orange-600/10 border border-orange-500/40 flex items-center justify-center text-orange-600">
            <Sparkles className="h-4.5 w-4.5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-slate-900 dark:text-zinc-100 text-sm tracking-wide">{labels.title}</h4>
            <div className="flex items-center gap-1 text-[10px] text-green-600 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              {labels.connected}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 dark:text-zinc-450 hover:text-slate-900 dark:text-zinc-100 p-1 rounded-md bg-slate-100/60 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 transition cursor-pointer"
        >
          <X className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-zinc-950 select-text">
        {messages.map((m) => {
          const isBot = m.sender === "bot";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Profile Orb indicator */}
              <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 border select-none overflow-hidden ${
                isBot 
                  ? "bg-white dark:bg-zinc-950 border-orange-500/20" 
                  : "bg-orange-600 text-white border-orange-500/45 text-xs"
              }`}>
                {isBot ? <img src="/logo.jpg" alt="Bot" className="w-full h-full object-contain bg-white dark:bg-zinc-950" referrerPolicy="no-referrer" /> : <User className="h-3.5 w-3.5" />}
              </div>

              {/* Text Bubble */}
              <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs text-left leading-relaxed shadow-sm ${
                isBot 
                  ? "bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-800" 
                  : "bg-orange-600 text-white shadow-orange-500/20"
              }`}>
                {/* Parse basic bold formatting and bullets to support beautiful markdown returned by Gemini */}
                <div className="space-y-1 whitespace-pre-wrap">
                  {m.text.split("\n").map((line, lidx) => {
                    let formatted = line;
                    // Replace markdown bold: **text**
                    const segments = [];
                    let idx = 0;
                    while (idx < formatted.length) {
                      const start = formatted.indexOf("**", idx);
                      if (start !== -1) {
                        if (start > idx) {
                          segments.push(formatted.substring(idx, start));
                        }
                        const end = formatted.indexOf("**", start + 2);
                        if (end !== -1) {
                          segments.push(<strong key={end} className="text-orange-450 font-bold">{formatted.substring(start + 2, end)}</strong>);
                          idx = end + 2;
                        } else {
                          segments.push(formatted.substring(start));
                          break;
                        }
                      } else {
                        segments.push(formatted.substring(idx));
                        break;
                      }
                    }

                    const isBullet = line.trim().startsWith("*");
                    if (isBullet) {
                      return (
                        <div key={lidx} className="flex gap-1.5 pl-2">
                          <span className="text-orange-500">•</span>
                          <span>{segments.length > 0 ? segments : line.replace(/^\*\s*/, "")}</span>
                        </div>
                      );
                    }

                    return <p key={lidx}>{segments.length > 0 ? segments : line}</p>;
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-2.5">
            <div className="h-7 w-7 rounded-full bg-slate-50 dark:bg-zinc-950 border border-orange-500/20 flex items-center justify-center overflow-hidden animate-pulse">
               <img src="/logo.jpg" alt="Loading" className="w-full h-full object-contain bg-white dark:bg-zinc-950" referrerPolicy="no-referrer" />
            </div>
            <div className="bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-450 rounded-xl px-4 py-2.5 text-xs flex gap-1.5 items-center select-none animate-pulse">
              <span>{labels.waiting}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Helper */}
      <div className="px-4 py-2 bg-zinc-90 w-full overflow-x-auto border-t border-slate-300 dark:border-zinc-700 flex gap-2 select-none">
        {quickPrompts.map((qp, index) => (
          <button
            key={index}
            onClick={() => handleSend(qp)}
            className="flex-shrink-0 bg-slate-100 dark:bg-zinc-900 hover:bg-orange-600/10 hover:border-orange-500/30 text-slate-600 dark:text-zinc-400 hover:text-orange-400 border border-slate-200 dark:border-zinc-800 text-[10px] px-2.5 py-1 rounded-full cursor-pointer transition"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Bottom Inputs form */}
      <div className="p-3 bg-slate-100 dark:bg-zinc-900 border-t border-slate-300 dark:border-zinc-700 select-none">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={labels.placeholder}
            className="flex-grow bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-orange-500/40"
          />
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-500 text-white p-2 rounded-lg cursor-pointer transition flex items-center justify-center border border-orange-500/30"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="text-[9px] text-slate-500 dark:text-zinc-450 mt-1.5 text-center leading-none">
          {labels.poweredBy}
        </p>
      </div>
    </div>
  );
}
