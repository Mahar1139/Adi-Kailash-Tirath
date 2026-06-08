export interface ItineraryDay {
  day: number;
  title: string;
  details: string;
}

export interface YatraPackage {
  id: string;
  category: "adi_kailash" | "kailash_mansarovar" | "chardham" | "amarnath" | "om_parvat" | "munsyari" | "kainchi_dham" | "maa_purnagiri" | "panchachuli" | "darma_valley" | "chirkilla_dam" | "narayan_ashram";
  title: string;
  badge: string;
  duration: string;
  price: string;
  numericPrice?: number; // to facilitate some sorting or processing if needed
  fromRoute: string;
  overview: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Extreme Trekking";
  highlights: string[];
  inclusion: string[];
  exclusion: string[];
  itinerary: ItineraryDay[];
  imageUrl: string;
}

export interface PlannerRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelers: number;
  message: string;
  date: string;
  status: string;
  reference: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  imageUrl: string;
  content: string; // detailed reading
}

export interface TravelerStory {
  id: string;
  name: string;
  location: string;
  trip: string;
  quote: string;
  coverImage: string;
  videoUrl?: string;
  videoThumb?: string;
  duration: string;
}

export interface YatriFeedback {
  id: string;
  name: string;
  location: string;
  trip: string;
  rating: number;
  quote: string;
}

