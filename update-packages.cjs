const fs = require('fs');

const newPackages = `export const YATRA_PACKAGES: YatraPackage[] = [
  {
    id: "adi-kailash-haldwani",
    category: "adi_kailash",
    title: "Adi Kailash, Om Parvat Yatra and Panchachuli Package",
    badge: "Haldwani Route",
    duration: "5 Nights / 6 Days",
    price: "₹28,000",
    fromRoute: "Pickup & Drop: Haldwani",
    overview: "Explore the majestic peaks of Adi Kailash and Om Parvat along with a serene visit to the Panchachuli base camp. Starts and ends securely in Haldwani.",
    difficulty: "Moderate",
    highlights: ["Trek to Parvati Sarovar", "Meditate near Om Parvat", "Trek to Panchachuli base camp", "Includes home stay accommodation"],
    inclusion: ["Transportation (Bolero vehicle, Scorpio n, Isuzu)", "Accommodation (Hotel/Homestay as mentioned)", "Meals as mentioned in the itinerary", "Inner Line Permit assistance"],
    exclusion: ["Personal expenses", "Additional sightseeing not mentioned in the itinerary", "Any other services not listed in inclusions"],
    itinerary: [
      { day: 1, title: "Arrival at Pithoragarh", details: "Morning pickup from Haldwani. Arrival at Pithoragarh. Check-in and complete Inner Line Permit documentation. After lunch, enjoy leisure time exploring nearby. Dinner and overnight stay at the hotel." },
      { day: 2, title: "Pithoragarh to Gunji/Napalchu", details: "Breakfast at Dharchula. Drive to Gunji/Napalchu, the base village for Adi Kailash and Om Parvat. Lunch en route. Arrival at Gunji in the evening. Dinner and overnight stay at a homestay." },
      { day: 3, title: "Gunji/Napalchu to Adi Kailash and Back", details: "Early morning drive from Gunji to Adi Kailash. Trek 2–3 KM from Jolingkong to Parvati Sarovar. Perform Pooja and meditate at Lord Shiva and Parvati Temple near the Sarovar. Lunch and return drive to Gunji. En route, visit Brahma Parvat, Pandava Parvat, Pandava Fort, and Parvati Mukut. Dinner and overnight stay at a homestay." },
      { day: 4, title: "Gunji to Om Parvat and Back", details: "Breakfast at Gunji. Drive to Om Parvat. Meditate near the sacred Om Parvat. En route, visit Kali Mandir, Kala Paani, Sheshnag Parvat, and Ved Vyas Gufa. Return to Gunji/Nabhi for dinner and overnight stay at the homestay." },
      { day: 5, title: "Gunji to Pithoragarh", details: "Breakfast at Gunji. Drive to Dantu. Trek to panchachuli base camp." },
      { day: 6, title: "Pithoragarh to Haldwani", details: "Breakfast at Dharchula. Drive back to Haldwani. Drop-off at Haldwani." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800"
  },
  {
    id: "adi-kailash-tanakpur",
    category: "adi_kailash",
    title: "Adi Kailash, Om Parvat Yatra and Panchachuli Package",
    badge: "Tanakpur Route",
    duration: "5 Nights / 6 Days",
    price: "From ₹22,000",
    fromRoute: "Pickup & Drop: Tanakpur",
    overview: "Experience the divine presence of Adi Kailash and Om Parvat, plus the beauty of Panchachuli base camp, beginning from Tanakpur.",
    difficulty: "Moderate",
    highlights: ["Jolingkong to Parvati Sarovar Trek", "Sacred Om Parvat darshan", "Panchachuli base camp trek", "Multiple vehicle options (Bolero, Scorpio N, Isuzu)"],
    inclusion: ["Transportation (Bolero vehicle)", "Accommodation (Hotel/Homestay as mentioned)", "Meals as mentioned in the itinerary", "Inner Line Permit assistance"],
    exclusion: ["Personal expenses", "Additional sightseeing not mentioned", "Any other services not listed"],
    itinerary: [
      { day: 1, title: "Arrival at Pithoragarh", details: "Morning pickup from Tanakpur. Arrival at Pithoragarh. Check-in and complete Inner Line Permit documentation. After lunch, enjoy leisure time exploring nearby. Dinner and overnight stay at the hotel." },
      { day: 2, title: "Pithoragarh to Gunji/Napalchu", details: "Breakfast at Dharchula. Drive to Gunji/Napalchu, the base village for Adi Kailash and Om Parvat. Lunch en route. Arrival at Gunji in the evening. Dinner and overnight stay at a homestay." },
      { day: 3, title: "Gunji/Napalchu to Adi Kailash and Back", details: "Early morning drive from Gunji to Adi Kailash. Trek 2–3 KM from Jolingkong to Parvati Sarovar. Perform Pooja and meditate at Lord Shiva and Parvati Temple near the Sarovar. Lunch and return drive to Gunji. En route, visit Brahma Parvat, Pandava Parvat, Pandava Fort, and Parvati Mukut. Dinner and overnight stay at a homestay." },
      { day: 4, title: "Gunji to Om Parvat and Back", details: "Breakfast at Gunji. Drive to Om Parvat. Meditate near the sacred Om Parvat. En route, visit Kali Mandir, Kala Paani, Sheshnag Parvat, and Ved Vyas Gufa. Return to Gunji/Nabhi for dinner and overnight stay at the homestay." },
      { day: 5, title: "Gunji to Pithoragarh", details: "Breakfast at Gunji. Drive to Dantu. Trek to panchachuli base camp." },
      { day: 6, title: "Pithoragarh to Tanakpur", details: "Breakfast at Dharchula. Drive back to Tanakpur. Drop-off at Tanakpur." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=800"
  },
  {
    id: "adi-kailash-short",
    category: "adi_kailash",
    title: "Adi Kailash & Om Parvat Tour",
    badge: "Short Trip",
    duration: "2 Nights / 3 Days",
    price: "₹17,500",
    fromRoute: "Pickup & Drop: Pithoragarh",
    overview: "A quick but deeply fulfilling 3-day spiritual adventure covering the very core parts of the Adi Kailash and Om Parvat region. Ideal if you are short on time.",
    difficulty: "Easy",
    highlights: ["Adi Kailash peak darshan", "Om Parvat mystical 'ॐ' symbol", "Complimentary visit to Lipulekh", "Unlimited Tea & Coffee", "First Aid kit available"],
    inclusion: ["Meals: Breakfast & Dinner", "Traditional homestay experience", "Transport: SUV (Bolero, Scorpio, ISUZU)", "First Aid Kit", "Unlimited Tea & Coffee", "Complimentary Visit to Lipulekh"],
    exclusion: ["Personal expenses", "Additional sightseeing not mentioned", "Lunch"],
    itinerary: [
      { day: 1, title: "Pithoragarh to Napalchu", details: "Depart from Pithoragarh in a comfortable SUV (Bolero/Scorpio/ISUZU). Enjoy scenic mountain views en route to Napalchu. Check-in at a cozy homestay and relax. Evening at leisure, followed by dinner." },
      { day: 2, title: "Napalchu to Adi Kailash", details: "Early morning departure for Adi Kailash, one of the holiest peaks in the Himalayas. Witness the breathtaking landscapes and spiritual vibes of the sacred mountain. Explore the area and soak in the divine energy. Return to Napalchu for dinner and an overnight stay." },
      { day: 3, title: "Adi Kailash to Om Parvat to Pithoragarh", details: "Visit the mystical Om Parvat, where snow naturally forms the sacred 'ॐ' symbol. Experience the serenity of this rare phenomenon. Complimentary visit to Lipulekh, adding to the spiritual journey. Return journey to Pithoragarh, concluding the tour." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800"
  },
  {
    id: "chardham-yatra-8n",
    category: "chardham",
    title: "Char Dham Yatra Package",
    badge: "Complete Circuit",
    duration: "8 Nights / 9 Days",
    price: "From ₹32,000",
    fromRoute: "Pickup & Drop: Haridwar",
    overview: "Embark on the sacred Char Dham Yatra and seek divine blessings at Yamunotri, Gangotri, Kedarnath, and Badrinath. This 9-day journey takes you through Uttarakhand’s spiritual and scenic landscapes.",
    difficulty: "Challenging",
    highlights: ["Homestays at all locations", "Yamunotri and Gangotri Darshan", "Kedarnath Trek & Prayers", "Badrinath Evening Darshan", "Vehicle options: Ertiga, Bolero, Scorpio, Isuzu"],
    inclusion: ["Homestay accommodation for an authentic and comfortable experience", "Comfortable vehicle with an experienced driver", "Breakfast & Dinner (Veg meals)", "Unlimited tea & coffee", "First aid kit in the vehicle"],
    exclusion: ["Lunch, personal expenses, pony/doli for trekking", "Helicopter tickets for Kedarnath", "Any temple donations or additional sightseeing not mentioned"],
    itinerary: [
      { day: 1, title: "Arrival in Haridwar – Barkot/Jankichatti", details: "Take a holy dip in the Ganges. Drive via Dehradun & Mussoorie. En route visit Kempty Falls. Check-in at the homestay in Barkot/Jankichatti. Meals: Dinner | Stay: Homestay" },
      { day: 2, title: "Barkot/Jankichatti – Yamunotri – Barkot/Jankichatti", details: "Drive to Janki Chatti via Hanuman Chatti & Fool Chatti. Trek 6 km to Yamunotri. Take a dip in Garam Kund, perform Pooja & Darshan. Trek back and return to Barkot. Meals: Breakfast & Dinner | Stay: Homestay" },
      { day: 3, title: "Barkot – Uttarkashi", details: "Drive to Uttarkashi (100 km). Visit Vishwanath Temple. Leisure time in Uttarkashi. Meals: Breakfast & Dinner | Stay: Homestay" },
      { day: 4, title: "Uttarkashi – Gangotri – Uttarkashi", details: "Early morning drive to Gangotri. Pooja & Darshan at Gangotri Temple. Visit Gangnani & Harsil en route. Return to Uttarkashi. Meals: Breakfast & Dinner | Stay: Homestay" },
      { day: 5, title: "Uttarkashi – Guptkashi/Sitapur", details: "Early morning departure. Drive via Tehri Dam. Check-in at Sitapur/Guptkashi. Meals: Breakfast & Dinner | Stay: Homestay" },
      { day: 6, title: "Sitapur – Kedarnath", details: "Drive to Phata/Sonprayag. Trek to Kedarnath (or take a helicopter ride at extra cost). Pooja & Darshan at Kedarnath Temple. Meals: Breakfast & Dinner | Stay: Camps/Tents" },
      { day: 7, title: "Kedarnath – Phata/Guptkashi", details: "Return to Phata/Guptkashi after Darshan. Meals: Breakfast & Dinner | Stay: Homestay" },
      { day: 8, title: "Sitapur/Chopta – Badrinath", details: "Drive via Chopta & Joshimath. Visit Narsimha Temple & Shankaracharya Math. Evening Darshan at Badrinath Temple. Meals: Breakfast & Dinner | Stay: Homestay" },
      { day: 9, title: "Badrinath – Haridwar", details: "Early morning Tapt Kund bath & Badrivishal Darshan. Visit Mana, Vyas Gufa, Charanpaduka, Bhimkund. En route, visit Rudraprayag, Devprayag & Rishikesh. Drop at Haridwar Railway Station – Tour Ends! Meals: Breakfast." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1548543604-a87c9909abec?q=80&w=800"
  },
  {
    id: "adi-kailash-pithoragarh-kathgodam",
    category: "adi_kailash",
    title: "7-Day Adi Kailash & Pithoragarh Tour Package",
    badge: "Extended Spiritual Journey",
    duration: "6 Nights / 7 Days",
    price: "₹32,500",
    fromRoute: "Pickup & Drop: Kathgodam",
    overview: "A comprehensive spiritual journey from Kathgodam covering Kainchi Dham, Jageshwar, Patal Bhuvaneshwar, Panchachuli, Om Parvat and Adi Kailash. Great for deep peace and high adventure.",
    difficulty: "Moderate",
    highlights: ["Kainchi Dham & Jageshwar Temple", "Patal Bhuvaneshwar Cave", "Panchachuli Base Camp overnight stay", "Om Parvat Darshan", "Adi Kailash Parikrama"],
    inclusion: ["Transportation (ISUZU DMAX, SCORPIO N, BOLERO – Optional)", "Two meals per day (Breakfast & Dinner)", "Tea", "Homestay accommodation", "All permits and taxes during the trip"],
    exclusion: ["Personal expenses (Shopping, snacks, extra meals)", "Travel insurance", "Special puja & darshan charges at temples"],
    itinerary: [
      { day: 1, title: "Kathgodam – Kainchi Dham – Jageshwar Temple – Chaukori", details: "Departure from Kathgodam in the morning. Visit and rest at Kainchi Dham. Visit Jageshwar Dham and have lunch. Evening arrival at Chaukori, check-in at homestay and rest." },
      { day: 2, title: "Chaukori – Patal Bhuvaneshwar – Hat Kalika Temple – Pithoragarh – Dharchula", details: "Breakfast followed by a visit to Patal Bhuvaneshwar Cave. Visit Hat Kalika Temple in Gangolihat. Lunch in Pithoragarh and sightseeing. Evening arrival at Dharchula, check-in at homestay and rest." },
      { day: 3, title: "Dharchula – Panchachuli Base Camp", details: "Breakfast and departure for Panchachuli Glacier. Enjoy scenic mountain views along the way. Evening arrival at Panchachuli Base Camp. Overnight stay at Panchachuli." },
      { day: 4, title: "Panchachuli – Narayan Ashram – Napalchu", details: "Morning departure from Panchachuli to Narayan Ashram. Experience spiritual tranquility and have lunch at Narayan Ashram. Evening arrival at Napalchu, check-in and rest." },
      { day: 5, title: "Napalchu – Om Parvat – Napalchu", details: "Early morning departure for Om Parvat Darshan. Enjoy breathtaking views of the Himalayas throughout the journey. Return to Napalchu by evening for an overnight stay." },
      { day: 6, title: "Napalchu – Adi Kailash – Napalchu", details: "Breakfast followed by a journey to Adi Kailash. Perform circumambulation (parikrama) and darshan of the sacred mountain. Return to Napalchu for overnight stay." },
      { day: 7, title: "Napalchu – Kathgodam", details: "Morning departure. Enjoy sightseeing at local attractions en route. Evening arrival at Kathgodam, marking the end of the journey." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d926b12d?q=80&w=800"
  },
  {
    id: "adi-kailash-delhi",
    category: "adi_kailash",
    title: "Adi Kailash, Om Parvat Yatra Package",
    badge: "Delhi Route",
    duration: "4 Nights / 5 Days",
    price: "₹25,000",
    fromRoute: "Pickup & Drop: Delhi",
    overview: "Direct from Delhi! Experience a concise yet majestic spiritual yatra covering Adi Kailash and Om Parvat with comprehensive transport options.",
    difficulty: "Moderate",
    highlights: ["Direct pickup from Delhi", "Perform Pooja near Parvati Sarovar", "Meditate near sacred Om Parvat", "Multiple vehicle options (Bolero, Scorpio N, Isuzu, Dezire, Ertiga)"],
    inclusion: ["Transportation (Bolero vehicle , Scorpio N , Isuzu, dezire, Ertiga )", "Accommodation (Hotel/Homestay as mentioned)", "Meals as mentioned in the itinerary", "Inner Line Permit assistance"],
    exclusion: ["Personal expenses", "Additional sightseeing not mentioned in the itinerary", "Any other services not listed in inclusions"],
    itinerary: [
      { day: 1, title: "Arrival at Pithoragarh", details: "Morning pickup from Delhi. Arrival at Pithoragarh . Check-in and complete Inner Line Permit documentation. Dinner and overnight stay at the hotel." },
      { day: 2, title: "Pithoragarh to Gunji/Napalchu", details: "Breakfast at pithoragarh . Drive to Gunji/Napalchu, the base village for Adi Kailash and Om Parvat. Lunch en route. Arrival at Gunji in the evening. Dinner and overnight stay at a homestay." },
      { day: 3, title: "Gunji/Napalchu to Adi Kailash and Back", details: "Early morning drive from Gunji to Adi Kailash. Trek 2–3 KM from Jolingkong to Parvati Sarovar. Perform Pooja and meditate at Lord Shiva and Parvati Temple near the Sarovar. Lunch and return drive to Gunji. En route, visit Brahma Parvat, Pandava Parvat, Pandava Fort, and Parvati Mukut. Dinner and overnight stay at a homestay." },
      { day: 4, title: "Gunji to Om Parvat and Back to Pithoragarh", details: "Breakfast at Gunji. Drive to Om Parvat. Meditate near the sacred Om Parvat. En route, visit Kali Mandir, Kala Paani, Sheshnag Parvat, and Ved Vyas Gufa. Return to Pithoragarh dinner and overnight stay at the homestay." },
      { day: 5, title: "Pithoragarh to Delhi", details: "Breakfast at pithoragarh . Drive back to delhi. Drop-off at delhi." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1609137144814-7d5ca83050fb?q=80&w=800"
  }
];`;

const fileContent = fs.readFileSync('src/data.ts', 'utf8');

const regex = /export const YATRA_PACKAGES: YatraPackage\[\] = \[[\s\S]*?\];/;
const updatedContent = fileContent.replace(regex, newPackages);

fs.writeFileSync('src/data.ts', updatedContent, 'utf8');
console.log('Update complete');
