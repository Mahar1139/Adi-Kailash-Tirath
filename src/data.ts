import { YatraPackage, TravelerStory, Blog } from "./types";

export const YATRA_PACKAGES: YatraPackage[] = [
  {
    id: "adi-kailash-short",
    category: "adi_kailash",
    title: "Adi Kailash & Om Parvat Tour",
    badge: "Short Trip",
    duration: "2 Nights / 3 Days",
    price: "₹17,500",
    fromRoute: "Pickup & Drop: Pithoragarh",
    overview:
      "A quick but deeply fulfilling 3-day spiritual adventure covering the very core parts of the Adi Kailash and Om Parvat region. Ideal if you are short on time.",
    difficulty: "Easy",
    highlights: [
      "Adi Kailash peak darshan",
      "Om Parvat mystical 'ॐ' symbol",
      "Complimentary visit to Lipulekh",
      "Unlimited Tea & Coffee",
      "First Aid kit available",
    ],
    inclusion: [
      "Meals: Breakfast & Dinner",
      "Traditional homestay experience",
      "Transport: SUV (Bolero, Scorpio, ISUZU)",
      "First Aid Kit",
      "Unlimited Tea & Coffee",
      "Complimentary Visit to Lipulekh",
    ],
    exclusion: [
      "Personal expenses",
      "Additional sightseeing not mentioned",
      "Lunch",
    ],
    itinerary: [
      {
        day: 1,
        title: "Pithoragarh to Napalchu",
        details:
          "Depart from Pithoragarh in a comfortable SUV (Bolero/Scorpio/ISUZU). Enjoy scenic mountain views en route to Napalchu. Check-in at a cozy homestay and relax. Evening at leisure, followed by dinner.",
      },
      {
        day: 2,
        title: "Napalchu to Adi Kailash",
        details:
          "Early morning departure for Adi Kailash, one of the holiest peaks in the Himalayas. Witness the breathtaking landscapes and spiritual vibes of the sacred mountain. Explore the area and soak in the divine energy. Return to Napalchu for dinner and an overnight stay.",
      },
      {
        day: 3,
        title: "Adi Kailash to Om Parvat to Pithoragarh",
        details:
          "Visit the mystical Om Parvat, where snow naturally forms the sacred 'ॐ' symbol. Experience the serenity of this rare phenomenon. Complimentary visit to Lipulekh, adding to the spiritual journey. Return journey to Pithoragarh, concluding the tour.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800",
  },
  {
    id: "adi-kailash-tanakpur",
    category: "adi_kailash",
    title: "Adi Kailash, Om Parvat Yatra and Panchachuli Package",
    badge: "Tanakpur Route",
    duration: "5 Nights / 6 Days",
    price: "From ₹22,000",
    fromRoute: "Pickup & Drop: Tanakpur",
    overview:
      "Experience the divine presence of Adi Kailash and Om Parvat, plus the beauty of Panchachuli base camp, beginning from Tanakpur.",
    difficulty: "Moderate",
    highlights: [
      "Jolingkong to Parvati Sarovar Trek",
      "Sacred Om Parvat darshan",
      "Panchachuli base camp trek",
      "Multiple vehicle options (Bolero, Scorpio N, Isuzu)",
    ],
    inclusion: [
      "Transportation (Bolero vehicle)",
      "Accommodation (Hotel/Homestay as mentioned)",
      "Meals as mentioned in the itinerary",
      "Inner Line Permit assistance",
    ],
    exclusion: [
      "Personal expenses",
      "Additional sightseeing not mentioned",
      "Any other services not listed",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Pithoragarh",
        details:
          "Morning pickup from Tanakpur. Arrival at Pithoragarh. Check-in and complete Inner Line Permit documentation. After lunch, enjoy leisure time exploring nearby. Dinner and overnight stay at the hotel.",
      },
      {
        day: 2,
        title: "Pithoragarh to Gunji/Napalchu",
        details:
          "Breakfast at Dharchula. Drive to Gunji/Napalchu, the base village for Adi Kailash and Om Parvat. Lunch en route. Arrival at Gunji in the evening. Dinner and overnight stay at a homestay.",
      },
      {
        day: 3,
        title: "Gunji/Napalchu to Adi Kailash and Back",
        details:
          "Early morning drive from Gunji to Adi Kailash. Trek 2–3 KM from Jolingkong to Parvati Sarovar. Perform Pooja and meditate at Lord Shiva and Parvati Temple near the Sarovar. Lunch and return drive to Gunji. En route, visit Brahma Parvat, Pandava Parvat, Pandava Fort, and Parvati Mukut. Dinner and overnight stay at a homestay.",
      },
      {
        day: 4,
        title: "Gunji to Om Parvat and Back",
        details:
          "Breakfast at Gunji. Drive to Om Parvat. Meditate near the sacred Om Parvat. En route, visit Kali Mandir, Kala Paani, Sheshnag Parvat, and Ved Vyas Gufa. Return to Gunji/Nabhi for dinner and overnight stay at the homestay.",
      },
      {
        day: 5,
        title: "Gunji to Pithoragarh",
        details:
          "Breakfast at Gunji. Drive to Dantu. Trek to panchachuli base camp.",
      },
      {
        day: 6,
        title: "Pithoragarh to Tanakpur",
        details:
          "Breakfast at Dharchula. Drive back to Tanakpur. Drop-off at Tanakpur.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=800",
  },
  {
    id: "adi-kailash-haldwani",
    category: "adi_kailash",
    title: "Adi Kailash, Om Parvat Yatra and Panchachuli Package",
    badge: "Haldwani Route",
    duration: "5 Nights / 6 Days",
    price: "₹28,000",
    fromRoute: "Pickup & Drop: Haldwani",
    overview:
      "Explore the majestic peaks of Adi Kailash and Om Parvat along with a serene visit to the Panchachuli base camp. Starts and ends securely in Haldwani.",
    difficulty: "Moderate",
    highlights: [
      "Trek to Parvati Sarovar",
      "Meditate near Om Parvat",
      "Trek to Panchachuli base camp",
      "Includes home stay accommodation",
    ],
    inclusion: [
      "Transportation (Bolero vehicle, Scorpio n, Isuzu)",
      "Accommodation (Hotel/Homestay as mentioned)",
      "Meals as mentioned in the itinerary",
      "Inner Line Permit assistance",
    ],
    exclusion: [
      "Personal expenses",
      "Additional sightseeing not mentioned in the itinerary",
      "Any other services not listed in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Pithoragarh",
        details:
          "Morning pickup from Haldwani. Arrival at Pithoragarh. Check-in and complete Inner Line Permit documentation. After lunch, enjoy leisure time exploring nearby. Dinner and overnight stay at the hotel.",
      },
      {
        day: 2,
        title: "Pithoragarh to Gunji/Napalchu",
        details:
          "Breakfast at Dharchula. Drive to Gunji/Napalchu, the base village for Adi Kailash and Om Parvat. Lunch en route. Arrival at Gunji in the evening. Dinner and overnight stay at a homestay.",
      },
      {
        day: 3,
        title: "Gunji/Napalchu to Adi Kailash and Back",
        details:
          "Early morning drive from Gunji to Adi Kailash. Trek 2–3 KM from Jolingkong to Parvati Sarovar. Perform Pooja and meditate at Lord Shiva and Parvati Temple near the Sarovar. Lunch and return drive to Gunji. En route, visit Brahma Parvat, Pandava Parvat, Pandava Fort, and Parvati Mukut. Dinner and overnight stay at a homestay.",
      },
      {
        day: 4,
        title: "Gunji to Om Parvat and Back",
        details:
          "Breakfast at Gunji. Drive to Om Parvat. Meditate near the sacred Om Parvat. En route, visit Kali Mandir, Kala Paani, Sheshnag Parvat, and Ved Vyas Gufa. Return to Gunji/Nabhi for dinner and overnight stay at the homestay.",
      },
      {
        day: 5,
        title: "Gunji to Pithoragarh",
        details:
          "Breakfast at Gunji. Drive to Dantu. Trek to panchachuli base camp.",
      },
      {
        day: 6,
        title: "Pithoragarh to Haldwani",
        details:
          "Breakfast at Dharchula. Drive back to Haldwani. Drop-off at Haldwani.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800",
  },
  {
    id: "chardham-yatra-8n",
    category: "chardham",
    title: "Char Dham Yatra Package",
    badge: "Complete Circuit",
    duration: "8 Nights / 9 Days",
    price: "From ₹32,000",
    fromRoute: "Pickup & Drop: Haridwar",
    overview:
      "Embark on the sacred Char Dham Yatra and seek divine blessings at Yamunotri, Gangotri, Kedarnath, and Badrinath. This 9-day journey takes you through Uttarakhand’s spiritual and scenic landscapes.",
    difficulty: "Challenging",
    highlights: [
      "Homestays at all locations",
      "Yamunotri and Gangotri Darshan",
      "Kedarnath Trek & Prayers",
      "Badrinath Evening Darshan",
      "Vehicle options: Ertiga, Bolero, Scorpio, Isuzu",
    ],
    inclusion: [
      "Homestay accommodation for an authentic and comfortable experience",
      "Comfortable vehicle with an experienced driver",
      "Breakfast & Dinner (Veg meals)",
      "Unlimited tea & coffee",
      "First aid kit in the vehicle",
    ],
    exclusion: [
      "Lunch, personal expenses, pony/doli for trekking",
      "Helicopter tickets for Kedarnath",
      "Any temple donations or additional sightseeing not mentioned",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Haridwar – Barkot/Jankichatti",
        details:
          "Take a holy dip in the Ganges. Drive via Dehradun & Mussoorie. En route visit Kempty Falls. Check-in at the homestay in Barkot/Jankichatti. Meals: Dinner | Stay: Homestay",
      },
      {
        day: 2,
        title: "Barkot/Jankichatti – Yamunotri – Barkot/Jankichatti",
        details:
          "Drive to Janki Chatti via Hanuman Chatti & Fool Chatti. Trek 6 km to Yamunotri. Take a dip in Garam Kund, perform Pooja & Darshan. Trek back and return to Barkot. Meals: Breakfast & Dinner | Stay: Homestay",
      },
      {
        day: 3,
        title: "Barkot – Uttarkashi",
        details:
          "Drive to Uttarkashi (100 km). Visit Vishwanath Temple. Leisure time in Uttarkashi. Meals: Breakfast & Dinner | Stay: Homestay",
      },
      {
        day: 4,
        title: "Uttarkashi – Gangotri – Uttarkashi",
        details:
          "Early morning drive to Gangotri. Pooja & Darshan at Gangotri Temple. Visit Gangnani & Harsil en route. Return to Uttarkashi. Meals: Breakfast & Dinner | Stay: Homestay",
      },
      {
        day: 5,
        title: "Uttarkashi – Guptkashi/Sitapur",
        details:
          "Early morning departure. Drive via Tehri Dam. Check-in at Sitapur/Guptkashi. Meals: Breakfast & Dinner | Stay: Homestay",
      },
      {
        day: 6,
        title: "Sitapur – Kedarnath",
        details:
          "Drive to Phata/Sonprayag. Trek to Kedarnath (or take a helicopter ride at extra cost). Pooja & Darshan at Kedarnath Temple. Meals: Breakfast & Dinner | Stay: Camps/Tents",
      },
      {
        day: 7,
        title: "Kedarnath – Phata/Guptkashi",
        details:
          "Return to Phata/Guptkashi after Darshan. Meals: Breakfast & Dinner | Stay: Homestay",
      },
      {
        day: 8,
        title: "Sitapur/Chopta – Badrinath",
        details:
          "Drive via Chopta & Joshimath. Visit Narsimha Temple & Shankaracharya Math. Evening Darshan at Badrinath Temple. Meals: Breakfast & Dinner | Stay: Homestay",
      },
      {
        day: 9,
        title: "Badrinath – Haridwar",
        details:
          "Early morning Tapt Kund bath & Badrivishal Darshan. Visit Mana, Vyas Gufa, Charanpaduka, Bhimkund. En route, visit Rudraprayag, Devprayag & Rishikesh. Drop at Haridwar Railway Station – Tour Ends! Meals: Breakfast.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1548543604-a87c9909abec?q=80&w=800",
  },
  {
    id: "adi-kailash-pithoragarh-kathgodam",
    category: "adi_kailash",
    title: "7-Day Adi Kailash & Pithoragarh Tour Package",
    badge: "Extended Spiritual Journey",
    duration: "6 Nights / 7 Days",
    price: "₹32,500",
    fromRoute: "Pickup & Drop: Kathgodam",
    overview:
      "A comprehensive spiritual journey from Kathgodam covering Kainchi Dham, Jageshwar, Patal Bhuvaneshwar, Panchachuli, Om Parvat and Adi Kailash. Great for deep peace and high adventure.",
    difficulty: "Moderate",
    highlights: [
      "Kainchi Dham & Jageshwar Temple",
      "Patal Bhuvaneshwar Cave",
      "Panchachuli Base Camp overnight stay",
      "Om Parvat Darshan",
      "Adi Kailash Parikrama",
    ],
    inclusion: [
      "Transportation (ISUZU DMAX, SCORPIO N, BOLERO – Optional)",
      "Two meals per day (Breakfast & Dinner)",
      "Tea",
      "Homestay accommodation",
      "All permits and taxes during the trip",
    ],
    exclusion: [
      "Personal expenses (Shopping, snacks, extra meals)",
      "Travel insurance",
      "Special puja & darshan charges at temples",
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam – Kainchi Dham – Jageshwar Temple – Chaukori",
        details:
          "Departure from Kathgodam in the morning. Visit and rest at Kainchi Dham. Visit Jageshwar Dham and have lunch. Evening arrival at Chaukori, check-in at homestay and rest.",
      },
      {
        day: 2,
        title:
          "Chaukori – Patal Bhuvaneshwar – Hat Kalika Temple – Pithoragarh – Dharchula",
        details:
          "Breakfast followed by a visit to Patal Bhuvaneshwar Cave. Visit Hat Kalika Temple in Gangolihat. Lunch in Pithoragarh and sightseeing. Evening arrival at Dharchula, check-in at homestay and rest.",
      },
      {
        day: 3,
        title: "Dharchula – Panchachuli Base Camp",
        details:
          "Breakfast and departure for Panchachuli Glacier. Enjoy scenic mountain views along the way. Evening arrival at Panchachuli Base Camp. Overnight stay at Panchachuli.",
      },
      {
        day: 4,
        title: "Panchachuli – Narayan Ashram – Napalchu",
        details:
          "Morning departure from Panchachuli to Narayan Ashram. Experience spiritual tranquility and have lunch at Narayan Ashram. Evening arrival at Napalchu, check-in and rest.",
      },
      {
        day: 5,
        title: "Napalchu – Om Parvat – Napalchu",
        details:
          "Early morning departure for Om Parvat Darshan. Enjoy breathtaking views of the Himalayas throughout the journey. Return to Napalchu by evening for an overnight stay.",
      },
      {
        day: 6,
        title: "Napalchu – Adi Kailash – Napalchu",
        details:
          "Breakfast followed by a journey to Adi Kailash. Perform circumambulation (parikrama) and darshan of the sacred mountain. Return to Napalchu for overnight stay.",
      },
      {
        day: 7,
        title: "Napalchu – Kathgodam",
        details:
          "Morning departure. Enjoy sightseeing at local attractions en route. Evening arrival at Kathgodam, marking the end of the journey.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1626621341517-bbf3d926b12d?q=80&w=800",
  },
  {
    id: "adi-kailash-delhi",
    category: "adi_kailash",
    title: "Adi Kailash, Om Parvat Yatra Package",
    badge: "Delhi Route",
    duration: "4 Nights / 5 Days",
    price: "₹25,000",
    fromRoute: "Pickup & Drop: Delhi",
    overview:
      "Direct from Delhi! Experience a concise yet majestic spiritual yatra covering Adi Kailash and Om Parvat with comprehensive transport options.",
    difficulty: "Moderate",
    highlights: [
      "Direct pickup from Delhi",
      "Perform Pooja near Parvati Sarovar",
      "Meditate near sacred Om Parvat",
      "Multiple vehicle options (Bolero, Scorpio N, Isuzu, Dezire, Ertiga)",
    ],
    inclusion: [
      "Transportation (Bolero vehicle , Scorpio N , Isuzu, dezire, Ertiga )",
      "Accommodation (Hotel/Homestay as mentioned)",
      "Meals as mentioned in the itinerary",
      "Inner Line Permit assistance",
    ],
    exclusion: [
      "Personal expenses",
      "Additional sightseeing not mentioned in the itinerary",
      "Any other services not listed in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Pithoragarh",
        details:
          "Morning pickup from Delhi. Arrival at Pithoragarh . Check-in and complete Inner Line Permit documentation. Dinner and overnight stay at the hotel.",
      },
      {
        day: 2,
        title: "Pithoragarh to Gunji/Napalchu",
        details:
          "Breakfast at pithoragarh . Drive to Gunji/Napalchu, the base village for Adi Kailash and Om Parvat. Lunch en route. Arrival at Gunji in the evening. Dinner and overnight stay at a homestay.",
      },
      {
        day: 3,
        title: "Gunji/Napalchu to Adi Kailash and Back",
        details:
          "Early morning drive from Gunji to Adi Kailash. Trek 2–3 KM from Jolingkong to Parvati Sarovar. Perform Pooja and meditate at Lord Shiva and Parvati Temple near the Sarovar. Lunch and return drive to Gunji. En route, visit Brahma Parvat, Pandava Parvat, Pandava Fort, and Parvati Mukut. Dinner and overnight stay at a homestay.",
      },
      {
        day: 4,
        title: "Gunji to Om Parvat and Back to Pithoragarh",
        details:
          "Breakfast at Gunji. Drive to Om Parvat. Meditate near the sacred Om Parvat. En route, visit Kali Mandir, Kala Paani, Sheshnag Parvat, and Ved Vyas Gufa. Return to Pithoragarh dinner and overnight stay at the homestay.",
      },
      {
        day: 5,
        title: "Pithoragarh to Delhi",
        details:
          "Breakfast at pithoragarh . Drive back to delhi. Drop-off at delhi.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1609137144814-7d5ca83050fb?q=80&w=800",
  },
  {
    id: "kedarnath-heli-yatra",
    category: "chardham",
    title: "Kedarnath Helicopter Darshan Package",
    badge: "VIP Helicopter",
    duration: "2 Nights / 3 Days",
    price: "From ₹14,500",
    fromRoute: "Pickup: Phata/Sirsi",
    overview:
      "Avoid the arduous trek with this quick, scenic, and spiritually uplifting helicopter ride directly to the Kedarnath holy shrine.",
    difficulty: "Easy",
    highlights: [
      "Round-trip Helicopter tickets",
      "VIP Darshan pass assistance",
      "Breathtaking aerial views of the Mandakini valley",
      "Overnight stay near the temple",
    ],
    inclusion: [
      "Helicopter tickets (Phata/Sirsi to Kedarnath and return)",
      "Accommodation in Kedarnath",
      "Breakfast & Dinner",
      "Shuttle service to helipad",
    ],
    exclusion: [
      "Travel to Phata/Sirsi",
      "Pony/Palki rides",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Guptkashi/Phata",
        details:
          "Arrive at Phata. Check-in at the hotel. Evening at leisure. Briefing for the helicopter ride tomorrow.",
      },
      {
        day: 2,
        title: "Kedarnath Darshan",
        details:
          "Morning flight to Kedarnath. Perform pooja and VIP darshan at the ancient temple. Explore the surroundings. Overnight stay at Kedarnath.",
      },
      {
        day: 3,
        title: "Return to Phata & Departure",
        details:
          "Morning flight back to Phata/Sirsi. Collect luggage and proceed for your onward journey.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800",
  },
  {
    id: "badrinath-exclusive",
    category: "chardham",
    title: "1-Day Exclusive Badrinath Darshan Safari",
    badge: "Fast-Track Darshan",
    duration: "1 Night / 2 Days",
    price: "₹8,000",
    fromRoute: "Pickup & Drop: Joshimath",
    overview:
      "A focused, comfortable round-trip to the seat of Lord Vishnu. Experience Tapt Kund and secure hassle-free darshan.",
    difficulty: "Easy",
    highlights: [
      "VIP Darshan at Badrinath Temple",
      "Tapt Kund holy bath",
      "Visit to Mana Village & Vyas Gufa",
    ],
    inclusion: [
      "Transportation in SUV",
      "Accommodation at Joshimath",
      "Meals (Breakfast and Dinner)",
    ],
    exclusion: ["Special pooja charges", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Joshimath to Badrinath",
        details:
          "Drive from Joshimath to Badrinath. Participate in evening Aarti. Overnight stay near the temple.",
      },
      {
        day: 2,
        title: "Darshan and Return",
        details:
          "Early morning bath in Tapt Kund followed by Badrinath Darshan. Optional visit to Mana Village. Return to Joshimath.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1548543604-a87c9909abec?q=80&w=800",
  },
  {
    id: "panchachuli-trek-adventure",
    category: "panchachuli",
    title: "Panchachuli Base Camp Trek & Darma Valley",
    badge: "Trekking Adventure",
    duration: "6 Nights / 7 Days",
    price: "₹21,000",
    fromRoute: "Pickup & Drop: Kathgodam",
    overview:
      "Explore the striking five peaks of Panchachuli through a well-paced trek navigating the remote and picturesque Darma Valley.",
    difficulty: "Hard",
    highlights: [
      "Trek to Panchachuli Base Camp",
      "Immerse in Darma Valley's untouched beauty",
      "Pass through dense cedar forests",
      "Experience nomadic tribal hospitality",
    ],
    inclusion: [
      "Transport from Kathgodam to Dharchula/Dantu",
      "Trekking guide and permits",
      "Meals during the trek",
      "Tents and sleeping bags",
    ],
    exclusion: [
      "Porter/mule for personal luggage",
      "Travel insurance",
      "Personal trekking gear",
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam to Dharchula",
        details: "Long drive into the Kumaon hills. Rest at Dharchula.",
      },
      {
        day: 2,
        title: "Dharchula to Dantu",
        details:
          "Drive into Darma Valley, reaching Dantu village. Briefing for the trek.",
      },
      {
        day: 3,
        title: "Dantu to Base Camp",
        details:
          "Trek through the beautiful bugyals (meadows) to the Panchachuli base camp. Camp under the stars.",
      },
      {
        day: 4,
        title: "Explore Glacier",
        details:
          "Spend the day exploring the glacier and taking in the panoramic 5 peaks. Return to Base Camp.",
      },
      {
        day: 5,
        title: "Base Camp to Duk",
        details: "Descend slowly exploring neighboring tribal hamlets.",
      },
      {
        day: 6,
        title: "Duk to Dharchula",
        details: "Trek back to the road head and drive down to Dharchula.",
      },
      {
        day: 7,
        title: "Return to Kathgodam",
        details: "Concluding journey back to Kathgodam railway station.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=800",
  },
];

export const TRAVEL_STORIES: TravelerStory[] = [
  {
    id: "story-1",
    name: "Dr. Rajesh K. Sharma",
    location: "New Delhi, India",
    trip: "Adi Kailash Om Parvat Yatra",
    quote:
      "Standing before the giant natural Om on the peak at Nabhidhang was the most emotional second of my lifetime. Adi Kailash Tirath's coordination was fantastic. Stays were warm and clean despite freezing climates.",
    coverImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "0:45",
  },
  {
    id: "story-2",
    name: "Mrs. Revathi Subramanian",
    location: "Chennai, Tamil Nadu",
    trip: "Kailash Aerial Darshan Flight",
    quote:
      "As elderly yatris, my husband and I had lost hope of seeing Mount Kailash due to medical trek restrictions. Adi Kailash Tirath's Aerial flight yatra let us see Shiva's Lordly peak elegantly. Har Har Mahadev!",
    coverImage:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=400",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "1:15",
  },
  {
    id: "story-3",
    name: "Amit & Priya Deshmukh",
    location: "Mumbai, Maharashtra",
    trip: "Chardham Yatra Epic Garhwal",
    quote:
      "With helicopter blockages in Kedarnath, our guide managed immediate local pony resources and luxury homestays for us. Pure vegetarian organic food was cooked fresh every day. Absolute five stars!",
    coverImage:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=400",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "0:58",
  },
  {
    id: "story-4",
    name: "Shri Mahendra Pratap Singh",
    location: "Varanasi, Uttar Pradesh",
    trip: "Adi Kailash Om Parvat Yatra",
    quote:
      "Being a senior citizen, I was worried about physical fatigue at high altitudes. The local guides treated me like family and helped me reach Parvati Kund with total convenience.",
    coverImage:
      "https://images.unsplash.com/photo-1548543604-a87c9909abec?q=80&w=400",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    duration: "1:02",
  },
  {
    id: "story-5",
    name: "Dr. Anjali Deshpande",
    location: "Pune, Maharashtra",
    trip: "Kailash Aerial Darshan Flight",
    quote:
      "Breathtakingly simple! Seeing holy Mount Kailash without Chinese visa delay or biometric stress was a spiritual boom. Strongly recommend Adi Kailash Tirath.",
    coverImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    duration: "0:55",
  },
  {
    id: "story-6",
    name: "Vikram & Shreya Patel",
    location: "Ahmedabad, Gujarat",
    trip: "Chardham Helicopters Exclusive",
    quote:
      "A perfectly organized yatra with five-star hospitality in remote valleys. Helicopter slots, VIP Darshans, and premium stays were completely top-notch.",
    coverImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    duration: "1:10",
  },
];

export const BLOGS: Blog[] = [
  {
    id: "blog-1",
    title: "Comprehensive Preparation Guide for Adi Kailash & Om Parvat Yatra",
    excerpt:
      "Preparing your body, lungs, and packing lists for high altitude treks over 12,000 feet. Best medical tips and permit requirements analyzed.",
    date: "12 May 2026",
    author: "Shri Ajay Basera",
    readTime: "6 Min Read",
    imageUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=500",
    content:
      "The Adi Kailash Yatra is a dream spiritual journey for millions of Shiva devotees. However, rising to Jotling and Parvati Kund (above 12,000 ft) requires deep preparation. First, spend 30 days prior working on cardiovascular breathing exercises (Anulom Vilom and walking 5 km with weights). Second, pack layered thermal woolens as temperatures in Vyas valley drop drastically near 0°C at night. Finally, always carry a small packet of camphor tabs; inhaling its aroma helps open constricted airways under low oxygen levels.",
  },
  {
    id: "blog-2",
    title: "Why Mount Kailash Aerial Flight Darshan has Changed Sacred Tourism",
    excerpt:
      "Understand how pressurized high-flying flights now offer window viewings of Mount Kailash without China passport struggles or physical fatigue.",
    date: "28 April 2026",
    author: "Dr. K. Dwivedi",
    readTime: "4 Min Read",
    imageUrl:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=500",
    content:
      "For decades, spiritual pilgrims had to undergo complex Chinese consulate biometrics, visa waitlists, and extremely thin Himalayan air to catch a glimpse of the holy abode of Shiva. Adi Kailash Tirath pioneered the customized mountain aviation flights. Cruising stably at high altitudes, yatris get large-window views of Kailash, Mansarovar Lake, and Mount Gurla Mandhata. It is fully accessible to children, senior citizens, and physically challenged yatris, marking a golden era in yatra accessibility.",
  },
  {
    id: "blog-3",
    title: "Acclimatization Hacks for High Altitude Yatris: The Golden Rules",
    excerpt:
      "The vital health rules that every yatri crossing Dharchula and rising into Gunji must follow to avoid Acute Mountain Sickness (AMS).",
    date: "15 Jan 2026",
    author: "Adi Kailash Tirath Medical Board Advisories",
    readTime: "8 Min Read",
    imageUrl:
      "https://images.unsplash.com/photo-1548543604-a87c9909abec?q=80&w=500",
    content:
      "High Altitude sickness is completely preventable if rules are followed. Rule 1: Never ascend more than 1,000 meters in a single day once you cross 8,000 feet. That is why our itineraries feature 2 rest nights in Pithoragarh & Dharchula standard. Rule 2: Force hydrate! Drink 4-5 liters of lukewarm water daily. Rule 3: Avoid caffeine, alcohol, and heavy sleep medicines, which slow breathing rates. Listen to your guide, and check oxygen levels on oximeters twice daily.",
  },
  {
    id: "blog-4",
    title: "Chardham Yatra 2026: Opening Dates, Helicopters, and VIP Protocols",
    excerpt:
      "Get ahead of the summer rush by understanding the newly released opening dates for Kedarnath, Badrinath, Yamunotri, and Gangotri.",
    date: "10 April 2026",
    author: "Shri Ajay Basera",
    readTime: "7 Min Read",
    imageUrl:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=500",
    content:
      "Every year on Akshaya Tritiya, the holy portals of Yamunotri and Gangotri are opened, marking the start of the Chardham Yatra. Kedarnath opens a few days later following the Bhairavnath rituals. In 2026, helicopter quotas have been restricted strictly to early-bird bookings to prevent stampede delays at Phata and Sirsi. Make sure your local operators confirm your biometric registrations locally first—otherwise even an e-pass won't let you bypass the long queues.",
  },
];

export const ACCREDITATIONS = [
  {
    name: "Uttarakhand Tourism board Authorized",
    icon: "Mountain",
    id: "a1",
    detail: "Uttarakhand Govt. Registered Operator",
  },
  {
    name: "MSME Certified Operator",
    icon: "ShieldAlert",
    id: "a2",
    detail: "Ministry of MSME Govt. of India",
  },
  {
    name: "NIDHI Portal Verified ID",
    icon: "FileSpreadsheet",
    id: "a3",
    detail: "National Database of Hospitality Industry",
  },
  {
    name: "TripAdvisor Excellence Award",
    icon: "Award",
    id: "a4",
    detail: "Rated 4.9+ Stars by 500+ Yatris",
  },
  {
    name: "GST Fully Verified Operator",
    icon: "FileText",
    id: "a5",
    detail: "Registered Active GST Payer entity",
  },
];

export const YATRI_FEEDBACKS = [
  {
    id: "fb-1",
    name: "Shri Srinivasan Iyer",
    location: "Chennai, Tamil Nadu",
    trip: "Adi Kailash Road Route (8 Days)",
    rating: 5,
    quote:
      "The tour organization was flawless. Going to an altitude of 14,000 feet requires great logistic care, and the team provided continuous medical oxygen backup and outstanding homestays.",
  },
  {
    id: "fb-2",
    name: "Smt. Meenakshi Dhoundiyal",
    location: "Dehradun, Uttarakhand",
    trip: "Chardham Classic Yatra",
    rating: 5,
    quote:
      "Our entire family completed the holy Chardham Yatra safely. The food was 100% pure organic vegetarian, cooked fresh every day with hygienic guidelines. Incredible experience!",
  },
  {
    id: "fb-3",
    name: "Ravi Teja Yadav",
    location: "Hyderabad, Telangana",
    trip: "Kailash Aerial Darshan Flight",
    rating: 5,
    quote:
      "Due to health constraints, standard high-altitude walking was impossible for me. The Aerial flight gave such stunningly close window viewings of Kailash & Mansarovar. Truly divine!",
  },
  {
    id: "fb-4",
    name: "Shri Naresh Chandra Sen",
    location: "Kolkata, West Bengal",
    trip: "Adi Kailash Road Route (8 Days)",
    rating: 5,
    quote:
      "Every single day was blessed. The driver had incredible skills on Himalayan curves, and the spiritual satsangs organized in Dharchula warmed our souls.",
  },
  {
    id: "fb-5",
    name: "Smt. Sharda Devadiga",
    location: "Bangalore, Karnataka",
    trip: "Chardham Classic Yatra",
    rating: 5,
    quote:
      "Pristine arrangements. From wheelchair accessibility to timely medical check-ups under local administration directions. Har Har Gange and Kedar!",
  },
  {
    id: "fb-6",
    name: "Vijay & Sarita Malhotra",
    location: "Ludhiana, Punjab",
    trip: "Kailash Aerial Darshan Flight",
    rating: 5,
    quote:
      "Absolute comfort for seniors. Witnessing Kailash and Lake Manasarovar side-by-side on our window seat is an image burned into our minds for eternity.",
  },
];
