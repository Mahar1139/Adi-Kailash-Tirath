const fs = require('fs');
const path = require('path');

const langDataFile = path.join(__dirname, 'src/utils/lang_data.ts');
let langDataCode = fs.readFileSync(langDataFile, 'utf8');

const otherLangs = ['ta', 'te', 'gu', 'pa'];

const makePackages = (lang) => {
  return {
    "kedarnath-heli-yatra": {
      "title": lang === 'ta' ? "கேதார்நாத் ஹெலிகாப்டர் தரிசனம்" : lang === 'te' ? "కేదార్‌నాథ్ హెలికాప్టర్ దర్శనం" : lang === 'gu' ? "કેદારનાથ હેલિકોપ્ટર દર્શન" : "ਕੇਦਾਰਨਾਥ ਹੈਲੀਕਾਪਟਰ ਦਰਸ਼ਨ",
      "badge": "VIP Helicopter",
      "duration": "2 Days",
      "fromRoute": "Phata / Sirsi",
      "overview": "Avoid the arduous trek with this quick, scenic helicopter ride.",
      "difficulty": "Easy",
      "highlights": ["Helicopter ride", "VIP Darshan"],
      "inclusion": ["Tickets", "Stay"],
      "exclusion": ["Personal trips"],
      "itinerary": [{day: 1, title: "Arrival", details:"Arrive and rest."}, {day: 2, title: "Darshan", details:"Fly and pray."}]
    },
    "badrinath-exclusive": {
      "title": lang === 'ta' ? "பத்ரிநாத் 1-நாள் சிறப்பு பயணம்" : lang === 'te' ? "బద్రీనాథ్ 1-రోజు ప్రత్యేక యాత్ర" : lang === 'gu' ? "બદ્રીનાથ ૧-દિવસીય વિશેષ યાત્રા" : "ਬਦਰੀਨਾਥ 1-ਰੋਜ਼ਾ ਵਿਸ਼ੇਸ਼ ਯਾਤਰਾ",
      "badge": "Fast-Track",
      "duration": "1 Day",
      "fromRoute": "Joshimath",
      "overview": "A focused round trip to the seat of Lord Vishnu.",
      "difficulty": "Easy",
      "highlights": ["Badrinath Darshan", "Mana Village"],
      "inclusion": ["Transport", "Stay"],
      "exclusion": ["Pooja charges"],
      "itinerary": [{day: 1, title: "Drive to Badrinath", details:" इवनिंग आरती."}, {day: 2, title: "Darshan & Return", details:"सुबह दर्शन और वापसी."}]
    },
    "panchachuli-trek-adventure": {
      "title": lang === 'ta' ? "பஞ்சசுலி பேஸ் கேம்ப் மலையேற்றம்" : lang === 'te' ? "పంచాచులి బేస్ క్యాంప్ ట్రెక్కింగ్" : lang === 'gu' ? "પંચાચૂલી બેઝ કેમ્પ ટ્રેક" : "ਪੰਚਚੂਲੀ ਬੇਸ ਕੈਂਪ ਟ੍ਰੈਕ",
      "badge": "Adventure",
      "duration": "7 Days",
      "fromRoute": "Kathgodam",
      "overview": "Trek through the striking five peaks in Darma Valley.",
      "difficulty": "Hard",
      "highlights": ["Trek", "Base Camp"],
      "inclusion": ["Guide", "Tents"],
      "exclusion": ["Personal Gear"],
      "itinerary": [{day: 1, title: "Kathgodam to Dharchula", details:"Drive"}, {day: 3, title: "Trek to Base", details:"Trek"}]
    }
  };
};

const makeBlogs = (lang) => {
  return {
    "blog-4": {
      "title": lang === 'ta' ? "சார்தாம் யாத்திரை 2026: திறப்பு தேதிகள் மற்றும் முக்கிய தகவல்கள்" : lang === 'te' ? "చార్‌ధామ్ యాత్ర 2026: ప్రారంభ తేదీలు మరియు ముఖ్య సమాచారం" : lang === 'gu' ? "ચારધામ યાત્રા ૨૦૨૬: ખુલવાની તારીખો અને મુખ્ય માહિતી" : "ਚਾਰਧਾਮ ਯਾਤਰਾ 2026: ਸ਼ੁਰੂਆਤੀ ਮਿਤੀਆਂ ਅਤੇ ਜ਼ਰੂਰੀ ਜਾਣਕਾਰੀ",
      "excerpt": "Get ahead of the summer rush by understanding the newly released opening dates.",
      "content": "Every year on Akshaya Tritiya, the portals open..."
    }
  };
}

for (const lang of otherLangs) {
  const pkgs = makePackages(lang);
  const blogs = makeBlogs(lang);
  
  let packagesStr = '';
  for (const [key, val] of Object.entries(pkgs)) {
    packagesStr += `    "${key}": ${JSON.stringify(val, null, 6).slice(0, -1)}    },\n`;
  }
  let regPkg = new RegExp(`(\\s+)("adi-kailash-standard": \\{)`);
  // we do the replacement locally inside the block for that lang.
  // Actually, we can just replace 'lang: {' block. But regex matching might be tricky.
  // Let's use a simple string replace for each language.
  
  const langKeyIndex = langDataCode.indexOf(`  ${lang}: {`);
  if (langKeyIndex !== -1) {
    const pkgTarget = '"adi-kailash-standard": {';
    const pkgIndex = langDataCode.indexOf(pkgTarget, langKeyIndex);
    if (pkgIndex !== -1) {
      langDataCode = langDataCode.substring(0, pkgIndex) + packagesStr + langDataCode.substring(pkgIndex);
    }
  }

  // Same for blog
  const blogKeyIndex = langDataCode.indexOf(`  ${lang}: {`);
  if (blogKeyIndex !== -1) {
    const blogTarget = '"blog-1": {';
    const bIndex = langDataCode.indexOf(blogTarget, blogKeyIndex);
    if (bIndex !== -1) {
      let blogsStr = '';
      for (const [key, val] of Object.entries(blogs)) {
        blogsStr += `    "${key}": ${JSON.stringify(val, null, 6).slice(0, -1)}    },\n`;
      }
      langDataCode = langDataCode.substring(0, bIndex) + blogsStr + langDataCode.substring(bIndex);
    }
  }
}

fs.writeFileSync(langDataFile, langDataCode);
console.log("Updated lang_data.ts for other langs");
