import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize the Google GenAI client with correct telemetry header
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "dummy-key-fallback",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API router for Gemini Chat Assistant
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history, language } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      const langMap: { [key: string]: string } = {
        en: "English",
        hi: "Hindi (हिन्दी)",
        ta: "Tamil (தமிழ்)",
        te: "Telugu (తెలుగు)",
        gu: "Gujarati (ગુજરાતી)",
        pa: "Punjabi (ਪੰਜਾਬੀ)"
      };

      const selectedLanguageName = langMap[language] || "English";

      const showMockFallback = !process.env.GEMINI_API_KEY;

      if (showMockFallback) {
        let text = "";
        if (language === "hi") {
          text = `🚩 *नोट: आपके Secrets में जेमिनी एपीआई कुंजी वर्तमान में सेट नहीं है। यहाँ हिन्दी में एक मार्गदर्शक प्रतिक्रिया है:*

नमस्ते यात्री! 🙏 आदि कैलाश तीर्थ में आपका हार्दिक स्वागत है।

अपनी आध्यात्मिक यात्रा (जैसे आदि कैलाश, ओम पर्वत, या कैलाश मानसरोवर) के लिए आवश्यक तैयारी:
1. **जलवायु अनुकूलन (Acclimatization)**: 10,000 फीट से अधिक की ऊंचाई पर जाने से पहले कम से कम 2 रातें निचले शहरों (जैसे पिथौरागढ़ या धारचूला) में आराम करें।
2. **शारीरिक तैयारी**: यात्रा शुरू होने से 30 दिन पहले प्रति दिन 4-5 किलोमीटर टहलना, प्राणायाम और गहरी सांस लेने वाले व्यायाम शुरू करें।
3. **क्या पैक करें**: थर्मल इनर, उच्च गुणवत्ता वाली गर्म जैकेट, वाटरप्रूफ ट्रेकिंग बूट्स, अपनी व्यक्तिगत दवाएं और कपूर के टुकड़े (जो उच्च ऊंचाई पर सांस लेने में सहायता करते हैं)।
4. **सरकारी परमिट**: आदि कैलाश तीर्थ आपके लिए सभी आवश्यक इनर लाइन और आउटर लाइन सरकारी परमिट और बायोमेट्रिक रजिस्ट्रेशन की प्रक्रिया को पूरी तरह से सुचारू भूमिका में संभालेगा।

हम आपकी आध्यात्मिक यात्रा को दिव्य बनाने के लिए उत्सुक हैं। हमें बताएं कि क्या आप विस्तृत दैनिक यात्रा कार्यक्रम योजनाएं चाहते हैं!`;
        } else if (language === "ta") {
          text = `🚩 *குறிப்பு: உங்கள் Secrets-ல் ஜெமினி API சாவி இன்னும் அமைக்கப்படவில்லை. தமிழில் ஒரு ஆஃப்லைன் வழிகாட்டி பதில்:*

நமஸ்தே யாத்ரி! 🙏 ஆதி கைலாஷ் தீர்த்தம் உங்களை அன்புடன் வரவேற்கிறது.

ஸ்பிரிச்சுவல் யாத்திரைக்கு (ஆதி கைலாசம், ஓம் பர்வதம், கைலாஷ் மானசரோவர்) தயாராக செய்ய வேண்டியவை:
1. **உயரத்திற்கு பழக்குதல்**: 10,000 அடிக்கு மேல் ஏறும் முன் பித்தோராகர் அல்லது தார்ச்சுலா போன்ற இடங்களில் 2 நாட்கள் ஓய்வெடுக்கவும்.
2. **உடற்பயிற்சி தயாரிப்பு**: யாத்திரைக்கு 30 நாட்களுக்கு முன்பாகவே தினமும் 4-5 கி.மீ நடப்பது மற்றும் மூச்சுப் பயிற்சியை மேற்கொள்ளவும்.
3. **தேவையானவை**: தெர்மல் உடைகள், தரமான ஜாக்கெட், வாட்டர்ப்ரூஃப் காலணிகள் மற்றும் கற்பூரம் (உயரமான பகுதியில் சுவாசிக்க உதவும்).
4. **அனுமதி**: ஆதி கைலாஷ் தீர்த்தம் உங்கள் அனைத்து அனுமதிகளையும் எளிதாகப் பெற்றுத் தரும்.

உங்கள் ஆன்மீகப் பயணம் சிறக்க நாங்கள் துணை நிற்போம். உங்களின் தினசரி பயண அறிக்கைக்கு எங்களைத் தொடர்பு கொள்ளவும்!`;
        } else if (language === "te") {
          text = `🚩 *గమనిక: మీ Secrets లో జెమిని API కీ ఇంకా సెట్ చేయబడలేదు. తెలుగులో ఆఫ్లైన్ గైడ్ సమాధానం:*

నమస్తే యాత్రీ! 🙏 ఆది కైలాష్ తీర్థ్‌కు స్వాగతం.

ఆధ్యాత్మిక యాత్రకు సిద్ధం కావడానికి ముఖ్యమైన సూచనలు:
1. **వాతావరణ అనుకూలత**: 10,000 అడుగుల కంటే ఎత్తైన ప్రదేశాలకు వెళ్లే ముందు ధార్చులా లేదా పితోరాగఢ్‌ లో 2 రోజులు విశ్రాంతి తీసుకోండి.
2. **శారీరక తయారీ**: యాత్ర ప్రారంభానికి 30 రోజుల ముందు నుండి రోజుకు 4-5 కి.మీ నడక మరియు శ్వాస వ్యాయామాలు చేయండి.
3. **ఏం ప్యాక్ చేయాలి**: థర్మల్ దుస్తులు, జలనిరోధిత ట్రెక్కింగ్ బూట్లు మరియు హారతి కర్పూరం (శ్వాస తీసుకోవడానికి ఉపయోగపడుతుంది).
4. **ప్రాజెక్ట్ పరిమితులు**: ఆది కైలాష్ తీర్థ్ బృందం మీ ఇన్నర్ లైన్ పర్మిట్ మరియు ఇతర డాక్యుమెంట్స్ పని సులభం చేస్తుంది.

మీ ఆధ్యాత్మిక యాత్ర విజయవంతం కావాలని కోరుకుంటున్నాము!`;
        } else if (language === "gu") {
          text = `🚩 *નોંધ: તમારા Secrets માં જેમિની API કી સેટ નથી. ગુજરાતીમાં ઑફલાઇન માર્ગદર્શિકा:*

નમસ્તે યાત્રી! 🙏 આદિ કૈલાશ તીર્થમાં આપનું હાર્દિક સ્વાગત છે.

આપની આધ્યાત્મિક યાત્રા (આદિ કૈલાશ અને ઓમ પર્વત) માટે મહત્વની તૈયારીઓ:
1. **હવામાન અનુકૂળતા**: ૧૦,૦૦૦ ફૂટથી વધુની ઊંચાઈ પર જતા પહેલા ધારચૂલા કે પિથૌરાગઢમાં ૨ દિવસ આરામ કરો.
2. **શારીરિક તૈયારી**: યાત્રા શરૂ થવાના ૩૦ દિવસ પહેલા રોજ ૪-૫ કિમી ચાલવાની અને ઊંડા શ્વાસ લેવાની કસરતો શરૂ કરો.
3. **સાથે શું રાખવું**: થર્મલ કપડાં, ગરમ જેકેટ અને કપૂર (જે ઊંચાઈ પર શ્વાસ લેવામાં મદદરૂપ થાય છે).
4. **સરકારી પરમિટ**: આદિ કૈલાશ તીર્થ તમારા તમામ ઇનર ગવર્નમેન્ટ પરમિટ અને બાયોમેટ્રિક રજીસ્ટ્રેશનનું સંચાલન કરશે.

તમને માર્ગદર્શન આપતા અમને આનંદ થશે!`;
        } else if (language === "pa") {
          text = `🚩 *ਨੋਟ: ਤੁਹਾਦੇ Secrets ਵਿੱਚ ਜੈਮਿਨੀ API ਕੁੰਜੀ ਸੈੱਟ ਨਹੀਂ ਹੈ। ਪੰਜਾਬੀ ਵਿੱਚ ਔਫਲਾਈਨ ਗਾਈਡ:*

ਨਮਸਤੇ ਯਾਤਰੀ ਜੀ! 🙏 ਆਦਿ ਕੈਲਾਸ਼ ਤੀਰਥ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।

ਆਪਣੀ ਅਧਿਆਤਮਿਕ ਯਾਤਰਾ (ਜਿਵੇਂ ਆਦਿ ਕੈਲਾਸ਼, ਓਮ ਪਰਵਤ) ਲਈ ਆਵਸ਼ਕ ਤਿਆਰੀ:
1. **ਜਲਵਾਯੂ ਅਨੁਕੂਲਤਾ**: 10,000 ਫੁੱਟ ਤੋਂ ਉੱਪਰ ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਘੱਟੋ ਘੱਟ 2 ਰਾਤਾਂ ਧਾਰਚੂਲਾ ਜਾਂ ਪਿਥੌਰਾਗੜ੍ਹ ਵਿੱਚ ਆਰਾਮ ਕਰੋ।
2. **ਸਰੀਰਕ ਤਿਆਰੀ**: ਯਾਤਰਾ ਤੋਂ 30 ਦਿਨ ਪਹਿਲਾਂ ਰੋਜ਼ਾਨਾ 4-5 ਕਿਲੋਮੀਟਰ ਸੈਰ ਅਤੇ ਡੂੰਘੇ ਸਾਹ ਲੈਣ ਦੀ ਕਸਰਤ ਸ਼ੁਰੂ ਕਰੋ।
3. **ਕੀ ਪੈਕ ਕਰਨਾ ਹੈ**: ਥਰਮל ਕੱਪੜੇ, ਗਰਮ ਜੈਕਟ, ਵਾਟਰਪ੍ਰੂਫ਼ ਟ੍ਰੈਕਿੰਗ ਬੂਟ ਅਤੇ ਮੁਸ਼ਕ ਕਪੂਰ (ਸਾਹ ਲੈਣ ਵਿੱਚ ਮਦਦਗਾਰ)।
4. **ਪਰਮਿਟ**: ਆਦਿ ਕੈਲਾਸ਼ ਤੀਰਥ ਟੀਮ ਸਾਰੇ ਰਸਮੀ ਸਰਕਾਰੀ ਪਰਮਿਟਾਂ ਦੀ ਸਹੂਲਤ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।

ਅਸੀਂ ਯਾਤਰਾ ਬੁੱਕ ਕਰਨ ਲਈ ਤੁਹਾਡਾ ਸਵਾਗਤ ਕਰਦੇ ਹਾਂ!`;
        } else {
          text = `🚩 *Note: The Gemini API Key is currently not set in your Secrets. Here is a friendly tour operator response in ${selectedLanguageName}:*

Namaste! Thank you for contacting **Adi Kailash Tirath**. 

To prepare for your spiritual yatra (like Adi Kailash, Om Parvat, or Kailash Mansarovar):
1. **Acclimatization**: Spend 2 nights resting at lower towns (like Pithoragarh or Dharchula) before rising above 10,000 feet.
2. **Physical Preparation**: Start deep-breathing exercises, yoga, and walking 4-5 km daily starting 30 days before the journey.
3. **What to Pack**: Thermals, high-quality wind-cheater jacket, waterproof trekking boots, personal medications, and camphor tabs (useful for breathing assistance at high altitudes).
4. **Permits**: Adi Kailash Tirath handles all Outer Line Permits, Inner Line Clearances, and medical checks seamlessly.

We would love to guide your spiritual path. Let us know if you want detailed day-wise itinerary plans!`;
        }

        return res.json({ text });
      }

      // Format conversation history cleanly for context
      let prompt = "";
      if (history && history.length > 0) {
        prompt += "Here is the conversation history for context to ensure a smooth flow:\n";
        history.forEach((h: any) => {
          const role = h.sender === "user" ? "Yatri (User)" : "Guide (You)";
          prompt += `${role}: ${h.text}\n`;
        });
        prompt += "\n";
      }
      prompt += `Yatri (User): ${message}`;

      let response: any = null;
      let lastError: any = null;
      
      // Attempt robust call with retries and fallback models
      const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];

      for (const modelName of modelsToTry) {
        let attemptCount = 0;
        const maxRetries = 2;
        while (attemptCount < maxRetries) {
          try {
            response = await ai.models.generateContent({
              model: modelName,
              contents: prompt,
              config: {
                systemInstruction: `You are the chief spiritual travel guide and AI consultant for Adi Kailash Tirath.
Your goals are:
- Help yatris plan their sacred pilgrimage to Kailash Mansarovar, Adi Kailash, Om Parvat, Chardham Yatra (Yamunotri, Gangotri, Kedarnath, Badrinath), Amarnath, or Muktinath/Nepal.
- Proactively offer vital health advice for high-altitude trekking: drinking 4-5 liters of water daily, packing camphor/oxygen, and gradual acclimatization.
- Explain that Adi Kailash Tirath provides expert tour managers, comfortable luxury hotels and homestays, private custom transport, permit approvals, and oxygen backup.
- Maintain a highly respectful, warm, spiritual, and professional Indian hospitality tone.
- CRITICAL: Write your entire response in the ${selectedLanguageName} language. Make sure to use vocabulary, script and greetings natural to ${selectedLanguageName} speakers (e.g. Hindi script if Hindi, Tamil script if Tamil, Gurmukhi script if Punjabi, etc.) to offer high-quality native localization.
- Format your response beautifully with bold headings and clean lists. Avoid long paragraphs. Use warm, respectful spiritual greetings.`,
              }
            });
            break; // Succeeded!
          } catch (err: any) {
            lastError = err;
            console.warn(`Attempt with ${modelName} failed: ${err.message || err}. Retrying...`);
            attemptCount++;
            if (attemptCount < maxRetries) {
              await new Promise((resolve) => setTimeout(resolve, 1200 * attemptCount));
            }
          }
        }
        if (response && response.text) {
          break; // Succeeded with this model
        }
      }

      if (response && response.text) {
        return res.json({ text: response.text });
      }

      // If all models and retries failed (e.g., 503 unavailable), apply dynamic smart offline response generator!
      console.error("All Gemini API attempts failed. Using smart offline dynamic guide fallback. Last error:", lastError);
      
      const lowerMsg = message.toLowerCase();
      let fallbackText = "";

      if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("budget") || lowerMsg.includes("fee") || lowerMsg.includes("किराया") || lowerMsg.includes("पैसा") || lowerMsg.includes("दाम")) {
        if (language === "hi") {
          fallbackText = `🕉️ **आदि कैलाश एवं ओम पर्वत यात्रा बजट विवरण (ऑफ़लाइन मार्गदर्शिका)**

नमस्ते यात्री जी! हमारे आदि कैलाश पैकेजों के लिए अनुमानित किराया और विवरण नीचे दिया गया है:

1. **आदि कैलाश सडक़ मार्ग यात्रा (काठगोदाम से काठगोदाम - 8 दिन)**
   - **कीमत**: ₹35,500 से ₹42,000 प्रति व्यक्ति (कमरे की श्रेणी के अनुसार)
   - **शामिल सूची**: परिवहन (4x4 बोलेरो), होमस्टे एवं होटल, समस्त भोजन, परमिट और गाइड सेवाएं।

2. **हेलीकॉप्टर दर्शन पैकेज (पिथौरागढ़ से - 5 दिन)**
   - **कीमत**: उपलब्ध सीटों और सरकारी निर्देशों के आधार पर अनुकूलित मूल्य निर्धारण।

**आदि कैलाश तीर्थ विशेषता**: हमारे पास हाई एल्टीट्यूड लाइफ सपोर्ट, अनुभवी गाइड और स्थानीय होमस्टे नेटवर्क की सर्वात्तम सुविधाएं हैं। कृपया हमारी वेबसाइट पर 'Bookings / Plan Yatra' फॉर्म भरें या तुरंत सहायता के लिए हमारे हेल्पलाइन पर (+91 9101211949 / +91 9631651910) संपर्क करें!`;
        } else {
          fallbackText = `🕉️ **Adi Kailash & Om Parvat Yatra Budget Details (Offline Support Guide)**

Namaste! Here are the standard cost estimates for our popular spiritual packages:

1. **Adi Kailash Road Route (Kathgodam to Kathgodam - 8 Days)**
   - **Pricing**: ₹35,500 to ₹42,000 per person (based on occupancy and accommodation tier).
   - **Inclusions**: 4x4 Bolero transportation, twin-sharing/triple-sharing homestays and hotels, all organic vegetarian meals, inner line permits, and certified high-altitude guides.

2. **Helicopter Darshan Special Package (Pithoragarh to Pithoragarh - 5 Days)**
   - **Pricing**: Subject to government slots and custom operator guidelines.

**Our Assurance**: Every Adi Kailash Tirath package is fully equipped with high-altitude support tools and certified high-altitude guides. Please submit your travel criteria via the 'Plan Yatra' section or call us directly at +91 9101211949 to lock in your 2026 season slot!`;
        }
      } else if (lowerMsg.includes("health") || lowerMsg.includes("altitude") || lowerMsg.includes("oxygen") || lowerMsg.includes("breathing") || lowerMsg.includes("camphor") || lowerMsg.includes("तबीयत") || lowerMsg.includes("सांस") || lowerMsg.includes("हवा") || lowerMsg.includes("बीमार")) {
        if (language === "hi") {
          fallbackText = `🏥 **उच्च ऊंचाई स्वास्थ्य एवं सुरक्षा निर्देश (चिकित्सीय सलाह)**

सादर प्रणाम! आदि कैलाश और ओम पर्वत की यात्रा 13,000 फीट से अधिक की ऊंचाई पर होती है। सुरक्षित यात्रा के लिए निम्न बातों का विशेष ध्यान रखें:

1. **अनुकूलन (Acclimatization)**: धारचूला और गुंजी में क्रमशः रातें बिताकर शरीर को पतली हवा का अभ्यस्त होने दें।
2. **कैम्फर (कपूर)**: प्राकृतिक श्वसन को आसान बनाने के लिए कपूर की एक पोटली सूंघना बहुत सहायक होता है।
3. **पानी की मात्रा**: रोजाना न्यूनतम 4-5 लीटर गुनगुना पानी पीएं। निर्जलीकरण से सिरदर्द और सांस फूलने की समस्या हो सकती है।
4. **शारीरिक तैयारी**: यात्रा शुरू करने से 30 दिन पहले कम से कम 4-5 किलोमीटर पैदल चलना और प्राणायाम (गहरी सांस लेने के व्यायाम) शुरू कर दें।

**आदि कैलाश तीर्थ सुरक्षा कवच**: हमारी प्रत्येक गाड़ी में पोर्टेबल ऑक्सीजन सिलेंडर, सुरक्षा उपकरणों की किट और फर्स्ट-एड सपोर्ट लगातार उपलब्ध रहता है।`;
        } else {
          fallbackText = `🏥 **High-Altitude Medical & Safety Directives (Crucial Guidelines)**

Namaste! Adi Kailash and Om Parvat pilgrimages cross altitudes of 13,500 feet. Proper physical preparation is essential:

1. **Gradual Acclimatization**: Our itineraries spend rest nights at Dharchula and Gunji to let your body adjust naturally to reduced oxygen levels.
2. **Hydration First**: Sip 4-5 liters of lukewarm water daily. Dehydration is the leading trigger for Acute Mountain Sickness (AMS).
3. **Natural Aid**: Keep dried camphor tabs handy in a soft cloth. Sniffing camphor helps stimulate breathing at high altitudes.
4. **Physical Training**: We recommend daily deep breathing (Pranayama) and walking/jogging 4-5 km daily for 30 days prior to departure.

**Our Safety Standards**: All **Adi Kailash Tirath** groups travel with continuous oxygen backup cylinders, pulse oximeters, and trained high-altitude tour leaders.`;
        }
      } else if (lowerMsg.includes("permit") || lowerMsg.includes("document") || lowerMsg.includes("aadhaar") || lowerMsg.includes("clearance") || lowerMsg.includes("पास") || lowerMsg.includes("दस्तावेज") || lowerMsg.includes("कागज")) {
        if (language === "hi") {
          fallbackText = `📋 **आवश्यक दस्तावेज एवं इनर लाइन परमिट (दस्तावेज गाइड)**

यात्री जी, आदि कैलाश सीमा क्षेत्र चीन और नेपाल से सटा होने के कारण अत्यधिक संवेदनशील है। वहां जाने के लिए सरकारी इनर लाइन परमिट (ILP) अनिवार्य है:

**अनिवार्य दस्तावेज सूची**:
1. **आधार कार्ड** या वैध पासपोर्ट।
2. **पुलिस क्लीयरेंस सर्टिफिकेट (PCC)** - स्थानीय पुलिस स्टेशन या ऑनलाइन उत्तराखंड पुलिस पोर्टल से प्रमाणित।
3. **मेडिकल फिटनेस सर्टिफिकेट** - सरकारी एमबीबीएस डॉक्टर द्वारा हस्ताक्षरित एवं मोहरबंद (60 वर्ष से अधिक आयु के यात्रियों के लिए विशेष फिटनेस)।
4. **पासपोर्ट साइज तस्वीरें** (न्यूनतम 4 प्रतियां)।

**आदि कैलाश तीर्थ सेवा**: परमिट के लिए आवेदन, कागजी कार्रवाई का सत्यापन और जिला मजिस्ट्रेट कार्यालय से मंजूरी की पूरी जिम्मेदारी **आदि कैलाश तीर्थ** ही संभालती है। आपको केवल दस्तावेज हमें सौंपने होंगे!`;
        } else {
          fallbackText = `📋 **Essential Travel Documents & Inner Line Permits**

Namaste! Because the Adi Kailash region lies near sensitive international boundaries, an Inner Line Permit (ILP) issued by Uttarakhand state authorities is legally mandatory.

**Required Checklist**:
1. **Government ID**: Original Aadhaar Card or Indian Passport.
2. **Police Clearance Certificate (PCC)**: Issued by your local police station or verified online via Uttarakhand Police portal.
3. **Medical Fitness Certificate**: Signed and stamped by a registered MBBS doctor.
4. **Passport Size Photos**: At least 4-6 physical copies.

**Our Services**: Skip the bureaucracy! At **Adi Kailash Tirath**, we compile, process, and secure all your Inner Line Clearances and high-altitude permissions directly with SDM/District offices. You just provide the raw papers, and we handle the rest!`;
        }
      } else {
        // Universal default friendly response when server API is under high demand
        if (language === "hi") {
          fallbackText = `🕉️ **आदि कैलाश तीर्थ मार्गदर्शक (सहायता डेस्क)**

नमस्ते! हमारे मुख्य मार्गदर्शक सर्वर पर अभी बहुत अधिक आध्यात्मिक यात्रियों का प्रभाव है। लेकिन आपकी सेवा में आदि कैलाश तीर्थ सदैव तत्पर है:

* **आदि कैलाश व ओम पर्वत यात्रा 2026**: इसकी बुकिंग अभी खुली हुई है। रोड मार्ग यात्रा 8 दिन की होती है और काठगोदाम से शुरू व समाप्त होती है।
* **हेलीकॉप्टर दर्शन**: विशेष स्लॉट के अनुसार अनुकूलित दरें उपलब्ध हैं।
* **सुरक्षित यात्रा सेवा**: हमारी टीम आपके लिए सभी इनर लाइन परमिट, मेडिकल सहायता, अनुभवी कुमाऊंनी स्थानीय गाइड और लक्जरी होमस्टे की व्यवस्था करती है।

आपसे निवेदन है कि हमारे आधिकारिक हेल्पलाइन नंबर **+91 9101211949 / +91 9631651910** पर सीधे फोन या व्हाट्सएप करें। हमारी टीम आपको 5 मिनट के भीतर विस्तृत यात्रा कार्यक्रम (PDF Itinerary) और विशेष छूट की जानकारी भेज देगी। आपकी यात्रा मंगलमय हो! हर हर महादेव!`;
        } else {
          fallbackText = `🕉️ **Adi Kailash Tirath Direct Assistant Desk**

Namaste! Our primary guided system is currently handling high volume, but **Adi Kailash Tirath** is right here to organize your sacred pilgrimage:

* **Adi Kailash & Om Parvat Yatra 2026**: Bookings are active! The legendary 8-Day road trip features pristine 4x4 Bolero drives departing and returning to Kathgodam.
* **Hassle-Free Logistics**: We handle SDM Inner Line Permits, medical checks, premium local homestays, hot organic meals, and trained mountain marshals.
* **Helicopter Packages**: High peak view slots are customized according to official circulars.

For instant personalized assistance, day-wise itineraries, or special group discounts, please call our High Altitude Specialists at **+91 9101211949** or **+91 9631651910**. We can immediately send detailed PDFs via WhatsApp. Har Har Mahadev!`;
        }
      }

      res.json({ text: fallbackText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to reach our spiritual guiding session." });
    }
  });

  // Storage for travel plans in-memory (persistent across user flows, with demo initial indicators)
  const planners: any[] = [
    {
      id: 1717589600000,
      name: "Suresh Chandra",
      email: "suresh@chandra.com",
      phone: "+91 9452288019",
      destination: "Adi Kailash & Om Parvat",
      travelers: 4,
      message: "Need 2 double rooms, age ranges 45 to 68. Oxygen cylinder support inside Boleros is mandatory.",
      date: "04 Jun 2026",
      status: "Consultant Assigned",
      reference: "NT-2026-4412"
    },
    {
      id: 1717503200000,
      name: "Meenakshi Iyer",
      email: "meenakshi@gmail.com",
      phone: "+91 9840134902",
      destination: "Classic Chardham Yatra",
      travelers: 2,
      message: "Vegetarian organic food request for South Indian style is mandatory. Rest days in Uttarkashi requested.",
      date: "03 Jun 2026",
      status: "Documents Pending",
      reference: "NT-2026-6791"
    }
  ];

  app.post("/api/planners", (req, res) => {
    try {
      const { name, email, phone, destination, travelers, message } = req.body;
      if (!name || !phone || !destination) {
        return res.status(400).json({ error: "Missing essential planner details." });
      }
      const newPlanner = {
        id: Date.now(),
        name,
        email: email || "Not Provided",
        phone,
        destination,
        travelers: Number(travelers) || 1,
        message: message || "Comfort-focused standard requirements.",
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: "Consultant Assigned",
        reference: `NT-2026-${Math.floor(Math.random() * 9000) + 1000}`
      };
      planners.unshift(newPlanner);
      res.json({ success: true, planner: newPlanner, list: planners });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/planners", (req, res) => {
    res.json(planners);
  });

  // Dynamic Site Config endpoints
  app.get("/api/site-data", (req, res) => {
    try {
      const dataPath = path.join(process.cwd(), "site-data.json");
      if (fs.existsSync(dataPath)) {
        const fileContent = fs.readFileSync(dataPath, "utf-8");
        res.json(JSON.parse(fileContent));
      } else {
        res.status(404).json({ error: "Site data configuration not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/site-data", (req, res) => {
    try {
      const { secretKey, data } = req.body;
      if (secretKey !== "@12321@##") {
        return res.status(401).json({ error: "Unauthorized. Secret key is incorrect." });
      }
      if (!data) {
        return res.status(400).json({ error: "Provide dataset to write." });
      }
      const dataPath = path.join(process.cwd(), "site-data.json");
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Administrative endpoints for bookings management
  app.post("/api/planners/status", (req, res) => {
    try {
      const { id, status, secretKey } = req.body;
      if (secretKey !== "@12321@##") {
        return res.status(401).json({ error: "Unauthorized." });
      }
      const idx = planners.findIndex((p) => p.id === Number(id));
      if (idx !== -1) {
        planners[idx].status = status;
        return res.json({ success: true, planners });
      }
      res.status(404).json({ error: "Booking request not found." });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/planners/delete", (req, res) => {
    try {
      const { id, secretKey } = req.body;
      if (secretKey !== "@12321@##") {
        return res.status(401).json({ error: "Unauthorized." });
      }
      const idx = planners.findIndex((p) => p.id === Number(id));
      if (idx !== -1) {
        planners.splice(idx, 1);
        return res.json({ success: true, planners });
      }
      res.status(404).json({ error: "Booking request not found." });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite development vs production serving logic
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Adi Kailash Tirath backend running on port ${PORT}`);
  });
}

startServer();
