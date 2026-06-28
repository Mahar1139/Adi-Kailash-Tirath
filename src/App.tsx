import React, { useState, useEffect } from "react";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import DestinationsCarousel from "./components/DestinationsCarousel";
import QuickPlanner from "./components/QuickPlanner";
import PackageGrid from "./components/PackageGrid";
import InteractiveDial from "./components/InteractiveDial";
import TravelerReels from "./components/TravelerReels";
import YatraConsultant from "./components/YatraConsultant";
import DetailedModal from "./components/DetailedModal";
import BookingModal from "./components/BookingModal";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import WhyChooseUs from "./components/WhyChooseUs";
import { ContactUs, PrivacyPolicy, Feedback } from "./components/StaticPages";
import {
  t,
  getLocalizedPackages,
  getLocalizedBlogs,
  getLocalizedStories,
  getLocalizedFeedback,
  getLocalizedTickerText,
  getLocalizedCircularDestinations,
} from "./utils/lang";

import {
  BLOGS,
  ACCREDITATIONS,
  YATRA_PACKAGES,
  TRAVEL_STORIES,
  YATRI_FEEDBACKS,
} from "./data";
import { YatraPackage, Blog } from "./types";
import {
  Sparkles,
  Calendar,
  MapPin,
  Compass,
  Trophy,
  Star,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Mail,
  Phone,
  Heart,
  MessageCircle,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const DEFAULT_SITE_DATA = {
  logoText: "ADI KAILASH",
  companyName: "ADI KAILASH TIRATH",
  tagline: "The Spiritual Yatra Pioneer",
  activeSeason: "Yatra Season 2026 Active",
  headOffice: "Kmou station pithoragarh uttarakhand 262501 india",
  footerAddress: "Kmou station pithoragarh uttarakhand 262501 india",
  footerAbout:
    "Adi Kailash Tirath specializes in high-altitude spiritual yatras across the sacred Himalayan rim. Handcrafted plans incorporating gradual acclimatization, legal border clearance, certified oximetric health trackers, and high-clearance 4x4 vehicles for absolute camper safety.",
  copyrightText: `© 2026 Adi Kailash Tirath. All Rights Reserved. Spiritual parikrama guides.`,
  footerImportantLinks: [
    { label: "Contact Us", url: "contact_us" },
    { label: "Privacy Policy", url: "privacy_policy" },
    { label: "Feedback", url: "feedback" },
  ],
  footerBottomLinks: [
    { label: "Terms of Pilgrimage", url: "privacy_policy" },
    { label: "High-Altitude Health Policy", url: "privacy_policy" },
  ],
  contactFormFields: [
    { label: "YOUR NAME", type: "text", required: true },
    { label: "EMAIL ADDRESS", type: "email", required: true },
    { label: "MESSAGE", type: "textarea", required: true },
  ],
  phones: ["+91 9557092965", "+91 7248737777"],
  whatsapp: "https://wa.me/919557092965",
  email: "info@adikailashtirath.com",
  regNumber: "UT-NT-2026-904",
  nocNumber: "UT-NOC-SHIVA-9092",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    pinterest: "https://pinterest.com",
    reddit: "https://reddit.com",
    twitter: "https://twitter.com",
  },
  bannerTickerText: [
    "🕉️ Experience the Divine Adi Kailash & Om Parvat Yatra 2026 - Bookings Open!",
    "📞 Contact our High Altitude Specialists at +91 9557092965 or +91 7248737777",
    "💼 Registered with Uttarakhand Tourism Board (Reg ID: NT-2026)",
    "✈️ Mount Kailash Aerial Darshan Flight (Lucknow Base) - No Chinese Visa/Passport Required!",
    "🏔️ Outer Line Permits & medical forms handled seamlessly by Adi Kailash Tirath team.",
  ],
  heroSlides: [
    {
      title: "Travel Where Spirit Meets The Himalaya",
      subtitle: "Kailash Mansarovar Yatra",
      desc: "Adi Kailash Tirath curates spiritually meaningful journeys with clear planning, trusted stays, permit guidance, and dedicated mountain-ground support from departure to return.",
      img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
      pill: "Vyas Valley & Himalayas 2026",
      stat: "海拔 5,640m (Over 18,000 ft)",
    },
    {
      title: "Experience the Divine Mystery of Snow Symbolism",
      subtitle: "Adi Kailash & Om Parvat",
      desc: "Watch the holy self-formed divine Om symbol appear naturally in pristine white snow. Explore Parvati Kund, Gauri Kund, and the source of Vyas valley spirituality accompanied by seasoned native sherpas.",
      img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200",
      pill: "Border Region Authorized Tour Partner",
      stat: "100% Permit Success Rate",
    },
    {
      title: "The Ultimate Four Abodes of the Deities",
      subtitle: "Classics of Chardham",
      desc: "An all-inclusive, divine expedition covering Yamunotri, Gangotri, Kedarnath, and Badrinath. Relax in pre-vetted warm riverside cottages with healthy pure organic vegetarian cuisine.",
      img: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1200",
      pill: "Complete Kedarnath-Badrinath Ring",
      stat: "500+ Devotees Guided Yearly",
    },
  ],
  circularDestinations: [
    {
      title: "Adi Kailash Parvat",
      categoryRef: "adi_kailash",
      img: "https://i0.wp.com/dharmikvibes.com/wp-content/uploads/2025/10/adi-kailash-tour-package.webp?fit=750%2C419&ssl=1",
      description:
        "Sacred trek to Adi Kailash, Gauri Kund, Parvati Kund and Om Parvat.",
    },
    {
      title: "Om Parvat",
      categoryRef: "om_parvat",
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/04/56/b3/om-parvat.jpg?w=1200&h=-1&s=1",
      description:
        "Witness the miraculous Om symbol formed by snow on the sacred peak.",
    },
    {
      title: "Kailash Mansarovar",
      categoryRef: "kailash_mansarovar",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=200",
      description: "Divine aerial Darshan flights from Lucknow.",
    },
    {
      title: "Complete Chardham",
      categoryRef: "chardham",
      img: "https://images.travelbudie.com/uploads/blog/kLEm7kjp3RbbgIHnWRX8mL4Mk7G1rtyc7MzVag4w.jpg",
      description:
        "Divine yatra of Yamunotri, Gangotri, Kedarnath, and Badrinath shrines.",
    },
    {
      title: "Munsyari Exploration",
      categoryRef: "munsyari",
      img: "https://soulitude.in/wp-content/uploads/Munsiyari1.jpg",
      description:
        "Discover picturesque landscapes and the majestic Panchachuli peaks.",
    },
    {
      title: "Kainchi Dham",
      categoryRef: "kainchi_dham",
      img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH1UJBjYuxcThKaN1CvuMk12YDlgV7kV97wmD7ODun67CdGWEpTC-EgckKAnYFOMtHb0CfNlqqlYGwf5j_7KOkEQgKZ76F4Qy2SHRIjwiGK3naCH6jDw5NYpqy12IfBF3kKEqXc4kZ86fga=s680-w680-h510-rw",
      description: "Visit the renowned ashram of Neem Karoli Baba.",
    },
    {
      title: "Maa Purnagiri Shrine",
      categoryRef: "maa_purnagiri",
      img: "https://images.unsplash.com/photo-1626621341517-bbf3d926b12d?q=80&w=200",
      description: "Perform the sacred trek to the revered Shakti Peeth.",
    },
    {
      title: "Panchachuli Glaciers",
      categoryRef: "panchachuli",
      img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=200",
      description: "Trek to the majestic five-peak glacier base camp.",
    },
    {
      title: "Darma Valley",
      categoryRef: "darma_valley",
      img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=200",
      description:
        "Explore tribal villages and pristine high-altitude valley landscapes.",
    },
    {
      title: "Chirkilla Dam",
      categoryRef: "chirkilla_dam",
      img: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=200",
      description: "Enjoy a scenic lakeside retreat and picnic excursion.",
    },
    {
      title: "Narayan Ashram",
      categoryRef: "narayan_ashram",
      img: "https://images.unsplash.com/photo-1609137144814-7d5ca83050fb?q=80&w=200",
      description: "A tranquil spiritual retreat established by Narayan Swami.",
    },
    {
      title: "Badrinath Temple",
      categoryRef: "chardham",
      img: "https://images.unsplash.com/photo-1548543604-a87c9909abec?q=80&w=200",
      description:
        "The magnificent temple dedicated to Lord Vishnu in the Himalayas.",
    },
    {
      title: "Kedarnath Jyotirlinga",
      categoryRef: "chardham",
      img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=200",
      description:
        "One of the twelve jyotirlingas, revered deeply by millions of devotees.",
    },
    {
      title: "Gangotri",
      categoryRef: "chardham",
      img: "https://images.unsplash.com/photo-1626621341517-bbf3d926b12d?q=80&w=200",
      description: "The sacred origin point of the holy river Ganges.",
    },
    {
      title: "Yamunotri",
      categoryRef: "chardham",
      img: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=200",
      description:
        "The revered source of the Yamuna River and seat of Goddess Yamuna.",
    },
    {
      title: "Jageshwar Dham",
      categoryRef: "panchachuli",
      img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=200",
      description:
        "A cluster of over 100 ancient stone temples dedicated to Shiva.",
    },
    {
      title: "Tungnath & Chopta",
      categoryRef: "chardham",
      img: "https://images.unsplash.com/photo-1609137144814-7d5ca83050fb?q=80&w=200",
      description:
        "The highest Shiva temple in the world with breathtaking meadows.",
    },
    {
      title: "Amarnath & Vaishno Devi",
      categoryRef: "amarnath",
      img: "https://images.unsplash.com/photo-1548543604-a87c9909abec?q=80&w=200",
      description:
        "Divine combination yatra crossing Katra Bhavan & Srinagar heli routes.",
    },
    {
      title: "Amarnath Tours",
      categoryRef: "amarnath",
      img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=200",
      description:
        "Rigorous classic trekking groups via Pahalgam under certified medical guidelines.",
    },
  ],
  packages: YATRA_PACKAGES,
  travelStories: TRAVEL_STORIES,
  yatriFeedbacks: YATRI_FEEDBACKS,
  blogs: BLOGS,
  accreditations: ACCREDITATIONS,
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>("home");
  const [openedPackage, setOpenedPackage] = useState<YatraPackage | null>(null);
  const [bookingPackage, setBookingPackage] = useState<YatraPackage | null>(
    null,
  );
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
  const [isConsultantOpen, setIsConsultantOpen] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [siteData, setSiteData] = useState<any>(DEFAULT_SITE_DATA);
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchSiteData = async () => {
    try {
      const res = await fetch("/api/site-data");
      if (res.ok) {
        let data = await res.json();
        if (data && Object.keys(data).length > 0) {
          const mergedPackages = [
            ...(data.packages || []),
            ...YATRA_PACKAGES.filter(
              (p) =>
                !(data.packages || []).find(
                  (sp: any) => sp.id === p.id || sp.title === p.title,
                ),
            ),
          ];
          data.packages = mergedPackages;
          setSiteData(data);
        }
      }
    } catch (e) {
      console.error(
        "Failed to load backend site-data, using local dynamic fallback:",
        e,
      );
    }
  };

  useEffect(() => {
    fetchSiteData();
  }, []);

  // Localize site data properties dynamically for the selected language
  const localizedSiteData = {
    ...siteData,
    bannerTickerText: getLocalizedTickerText(
      siteData?.bannerTickerText || DEFAULT_SITE_DATA.bannerTickerText,
      currentLanguage,
    ),
    packages: getLocalizedPackages(
      [
        ...(siteData?.packages || []),
        ...YATRA_PACKAGES.filter(
          (p) =>
            !(siteData?.packages || []).find(
              (sp: any) => sp.id === p.id || sp.title === p.title,
            ),
        ),
      ],
      currentLanguage,
    ),
    blogs: getLocalizedBlogs(
      siteData?.blogs || DEFAULT_SITE_DATA.blogs,
      currentLanguage,
    ),
    travelStories: getLocalizedStories(
      siteData?.travelStories || DEFAULT_SITE_DATA.travelStories,
      currentLanguage,
    ),
    yatriFeedbacks: getLocalizedFeedback(
      siteData?.yatriFeedbacks || DEFAULT_SITE_DATA.yatriFeedbacks,
      currentLanguage,
    ),
    circularDestinations: getLocalizedCircularDestinations(
      siteData?.circularDestinations || DEFAULT_SITE_DATA.circularDestinations,
      currentLanguage,
    ),
  };

  const circularDestinations = localizedSiteData.circularDestinations;
  const blogsList = localizedSiteData.blogs;
  const accreditationsList =
    siteData?.accreditations || DEFAULT_SITE_DATA.accreditations;

  // Callback to open the new multi-step booking modal
  const handleConfirmBookingFromModal = (packageName: string) => {
    const pkg =
      localizedSiteData.packages.find(
        (p: YatraPackage) => p.title === packageName,
      ) || null;
    if (pkg) {
      setBookingPackage(pkg);
    }
  };

  // If active screen is admin panel: render layout cleanly
  if (activeCategory === "admin") {
    return (
      <AdminPanel
        onClose={() => setActiveCategory("home")}
        initialSiteData={siteData}
        onRefreshSiteData={fetchSiteData}
      />
    );
  }

  // Generate Google font import URL dynamically based on selections
  const generateGoogleFontsUrl = () => {
    if (!siteData) return "";
    const uniqueFonts = Array.from(
      new Set([
        siteData.font_headings || "Geist",
        siteData.font_body || "Inter",
        siteData.font_accent || "JetBrains Mono",
      ]),
    ).map((font) => font.replace(/\s+/g, "+"));

    if (uniqueFonts.length === 0) return "";
    return `https://fonts.googleapis.com/css2?${uniqueFonts.map((f) => `family=${f}:wght@400;500;600;700;800`).join("&")}&display=swap`;
  };

  return (
    <div
      className="min-h-screen bg-slate-50 overflow-x-hidden text-slate-900 dark:bg-[#0b1120] dark:text-slate-100 flex flex-col font-sans selection:bg-sky-600 selection:text-white relative"
      style={
        {
          "--font-sans": `"${siteData?.font_body || "Inter"}", ui-sans-serif, system-ui, sans-serif`,
          "--font-serif": `"${siteData?.font_headings || "Geist"}", ui-serif, Georgia, serif`,
          "--font-mono": `"${siteData?.font_accent || "JetBrains Mono"}", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`,
        } as React.CSSProperties
      }
    >
      <style>{`@import url('${generateGoogleFontsUrl()}');`}</style>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-sky-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] rounded-full bg-rose-500/5 blur-[120px]" />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen flex-1 w-full">
        {/* 1. Header Ticker */}
        <Ticker
          siteData={localizedSiteData}
          setActiveCategory={(cat) => {
            setActiveCategory(cat);
            setTimeout(() => {
              const el = document.getElementById("yatra-catalog-grid");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          onOpenConsultant={() => setIsConsultantOpen(true)}
        />

        {/* 2. Top Navigation */}
        <Navbar
          activeCategory={activeCategory}
          setActiveCategory={(cat) => {
            setActiveCategory(cat);
            if (cat === "home") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          onOpenConsultant={() => setIsConsultantOpen(true)}
          siteData={localizedSiteData}
          currentLanguage={currentLanguage}
          onChangeLanguage={setCurrentLanguage}
          onOpenPackage={setOpenedPackage}
          onOpenBlog={setActiveBlog}
        />

        {/* 3. Hero Carousel Banner */}
        {activeCategory === "home" && (
          <HeroSlider
            onExplorePackages={() => {
              const el = document.getElementById("yatra-catalog-grid");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            onOpenConsultant={() => setIsConsultantOpen(true)}
            siteData={localizedSiteData}
            currentLanguage={currentLanguage}
          />
        )}

        {/* 4. Journey Destinations Circular Grid */}
        {activeCategory === "home" && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="hidden md:block pt-10 pb-8 bg-gradient-to-b from-sky-50/40 via-white/80 to-sky-100/30 dark:from-sky-900/20 dark:via-[#0b1120]/50 dark:to-sky-900/20 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-800/60/50 select-none text-center"
          >
            <div className="w-full max-w-full mx-auto px-4 md:px-8">
              <span className="text-sky-500 font-sans text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.25em] block mb-2">
                {siteData?.text_shrineHeading ||
                  t("shrineHeading", currentLanguage)}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-100 dark:via-slate-300 dark:to-zinc-100 font-extrabold tracking-tight">
                {siteData?.text_shrineSub || t("shrineSub", currentLanguage)}
              </h2>
              <div className="h-0.5 w-[80%] md:w-[60%] max-w-2xl bg-gradient-to-r from-sky-600 to-blue-500 rounded mx-auto mt-2 mb-4" />
            </div>

            <div className="w-full">
              {/* Circular Grid Container with Horizontal Carousel & Autoplay */}
              <DestinationsCarousel
                circularDestinations={circularDestinations}
                currentLanguage={currentLanguage}
                setActiveCategory={setActiveCategory}
              />
            </div>
          </motion.section>
        )}

        {/* 5. Active Packages Grid System */}
        {activeCategory !== "why_choose_us" &&
          activeCategory !== "contact_us" &&
          activeCategory !== "privacy_policy" &&
          activeCategory !== "feedback" &&
          activeCategory !== "blogs" && (
            <PackageGrid
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onOpenPackage={(pkg) => setOpenedPackage(pkg)}
              siteData={localizedSiteData}
              currentLanguage={currentLanguage}
            />
          )}

        {activeCategory === "why_choose_us" && (
          <WhyChooseUs
            currentLanguage={currentLanguage}
            siteData={siteData}
            onOpenConsultant={() => setIsConsultantOpen(true)}
            onNavigateToCatalog={() => {
              setActiveCategory("home");
              setTimeout(() => {
                const el = document.getElementById("yatra-catalog-grid");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          />
        )}

        {activeCategory === "contact_us" && <ContactUs siteData={siteData} />}
        {activeCategory === "privacy_policy" && <PrivacyPolicy />}
        {activeCategory === "feedback" && (
          <Feedback feedbacks={localizedSiteData.yatriFeedbacks} />
        )}

        {/* 6. General Yatra Planning Form */}
        {activeCategory === "home" && (
          <QuickPlanner currentLanguage={currentLanguage} />
        )}

        {/* 7. Why Choose Adi Kailash Tirath (Spiritual Dial spinner) */}
        {activeCategory === "home" && (
          <InteractiveDial currentLanguage={currentLanguage} />
        )}

        {/* 8. Vertical Traveler Reels block */}
        {(activeCategory === "home" || activeCategory === "feedback") && (
          <TravelerReels
            siteData={localizedSiteData}
            currentLanguage={currentLanguage}
          />
        )}

        {/* 9. Blogs and Spiritual Vlogs section */}
        {(activeCategory === "home" || activeCategory === "blogs") && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`py-16 bg-gradient-to-b from-white via-sky-50/40 to-sky-100/30 dark:from-sky-900/20 dark:via-[#0b1120]/40 dark:to-sky-900/20 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-800/60/50 px-4 select-none ${activeCategory === "blogs" ? "pt-24 min-h-screen" : ""}`}
          >
            <div className="w-full max-w-full mx-auto px-4 md:px-8">
              <div className="text-center flex flex-col items-center gap-2 mb-10">
                <span className="text-sky-500 font-mono text-xs font-bold uppercase tracking-[0.25em]">
                  {siteData?.text_blogTitle
                    ? "BLOGS"
                    : t("blog", currentLanguage)}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-100 dark:via-slate-300 dark:to-zinc-100 font-extrabold tracking-tight">
                  {siteData?.text_blogTitle || t("blogTitle", currentLanguage)}
                </h2>
                <div className="h-0.5 w-[80%] md:w-[60%] max-w-2xl bg-gradient-to-r from-sky-600 to-blue-500 rounded mt-1.5" />
                <p className="text-slate-900 dark:text-slate-100 text-xs mt-1.5">
                  {siteData?.text_blogSub || t("blogSub", currentLanguage)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {blogsList.map((blog: any) => (
                  <div
                    key={blog.id}
                    onClick={() => setActiveBlog(blog)}
                    className="relative bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-lg hover:border-yellow-500/50 hover:shadow-2xl hover:-translate-y-2 hover:shadow-yellow-500/20 transition-all duration-500 flex flex-col justify-between cursor-pointer text-left group animate-fade-in"
                  >
                    {/* Golden slide effect overlay */}
                    <div className="absolute inset-0 z-20 pointer-events-none opacity-80 mix-blend-overlay">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-golden-slide" />
                    </div>

                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-100 transition-all duration-700 brightness-90"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-white/80 dark:bg-[#0b1120]/80 px-2.5 py-1 text-[10px] font-mono text-slate-900 dark:text-slate-100 rounded backdrop-blur-xs font-bold uppercase tracking-wider">
                        {blog.readTime}
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col gap-2.5">
                      <span className="text-[10px] font-mono text-slate-900 dark:text-slate-100 uppercase">
                        {blog.date} • {blog.author}
                      </span>
                      <h4 className="font-serif text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-400 transition duration-300 leading-snug">
                        {blog.title}
                      </h4>
                      <p className="text-slate-900 dark:text-slate-100 text-xs leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                    <div className="p-5 pt-0 text-sky-450 font-mono text-[11px] font-bold flex items-center gap-1 group-hover:text-sky-400 border-t border-slate-300/60 dark:border-slate-700/60/60 mt-3 pt-3">
                      {t("readArticleBtn", currentLanguage)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* 10. Accreditations Badges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="py-12 bg-gradient-to-b from-sky-50/30 to-sky-100/40 dark:from-sky-900/20 dark:to-sky-900/20 border-t border-slate-300/60 dark:border-slate-700/60/60 px-4 select-none"
        >
          <div className="w-full max-w-full mx-auto px-4 md:px-8 flex flex-col md:flex-row flex-wrap justify-center items-center gap-5 md:gap-10">
            <p className="text-zinc-505 font-mono text-[10px] uppercase tracking-widest font-bold text-center md:text-left">
              {t("verifiedPartner", currentLanguage)}
            </p>
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-3 md:gap-6 text-slate-900 dark:text-slate-100 text-[10px] md:text-xs font-serif font-semibold w-full md:w-auto">
              {accreditationsList.map((acc: any) => (
                <span
                  key={acc.id}
                  className="bg-white dark:bg-[#0b1120] border border-zinc-200 dark:border-slate-800/60 px-2 py-2 md:px-4 md:py-2.5 rounded-lg flex items-center justify-center md:justify-start gap-1.5 md:gap-2 hover:border-sky-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/20 transition-all duration-300 shadow-md whitespace-nowrap overflow-hidden text-ellipsis cursor-default"
                  title={acc.detail}
                >
                  <Trophy className="h-3 w-3 md:h-4 md:w-4 text-sky-500 shrink-0" />
                  <span className="truncate">{acc.name}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 11. Custom Accompanying footer */}
        <Footer
          setActiveCategory={(cat) => {
            setActiveCategory(cat);
            if (cat === "home") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          onOpenConsultant={() => setIsConsultantOpen(true)}
          siteData={localizedSiteData}
          currentLanguage={currentLanguage}
        />

        {/* 12. Day-Wise Detailed Drawer Overlay (Modal) */}
        {openedPackage && (
          <DetailedModal
            pkg={openedPackage}
            onClose={() => setOpenedPackage(null)}
            onConfirmBooking={(pkgName) => {
              handleConfirmBookingFromModal(pkgName);
            }}
            currentLanguage={currentLanguage}
          />
        )}

        {/* Booking Form Modal */}
        {bookingPackage && (
          <BookingModal
            pkg={bookingPackage}
            onClose={() => setBookingPackage(null)}
            currentLanguage={currentLanguage}
          />
        )}

        {/* 13. Blog Detailed Reader Modal */}
        {activeBlog && (
          <div className="fixed inset-0 z-50 bg-slate-50/90 dark:bg-[#0b1120]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto select-none">
            <div className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col my-8 animate-in zoom-in-95 duration-200">
              <div className="relative h-48 bg-slate-100 dark:bg-[#0f172a]">
                <img
                  src={activeBlog.imageUrl}
                  alt={activeBlog.title}
                  className="w-full h-full object-cover brightness-50"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setActiveBlog(null)}
                  className="absolute top-4 right-4 p-1.5 bg-slate-50/60 dark:bg-[#0b1120]/60 text-slate-900 hover:text-slate-900 dark:text-slate-100 rounded-full border border-slate-200 dark:border-slate-800/60 cursor-pointer"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-6 text-left">
                  <span className="text-[10px] font-mono text-sky-400 font-bold uppercase bg-sky-600/10 border border-sky-500/20 px-2 py-0.5 rounded">
                    {activeBlog.readTime}
                  </span>
                  <h3 className="font-serif text-lg md:text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-2 leading-tight">
                    {activeBlog.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 md:p-8 text-left max-h-[350px] overflow-y-auto text-xs text-zinc-320 leading-relaxed font-sans select-text">
                <p className="text-slate-900 dark:text-slate-100 font-mono text-[10px] uppercase mb-4">
                  Written by {activeBlog.author} • Published {activeBlog.date}
                </p>
                <div className="whitespace-pre-wrap leading-relaxed text-slate-900 dark:text-slate-100">
                  {activeBlog.content}
                </div>
              </div>
              <div className="p-5 bg-slate-100 dark:bg-[#0f172a] border-t border-slate-200 dark:border-slate-800/60 text-center flex justify-between items-center select-none">
                <button
                  onClick={() => {
                    setActiveBlog(null);
                    setIsConsultantOpen(true);
                  }}
                  className="text-xs text-sky-500 font-mono font-bold hover:text-sky-400 transition cursor-pointer"
                >
                  ASK AI ABOUT THIS TOPIC
                </button>
                <button
                  onClick={() => setActiveBlog(null)}
                  className="bg-sky-600 text-white font-mono text-xs font-bold px-4 py-2 rounded border border-sky-500/20 hover:bg-sky-550 transition cursor-pointer"
                >
                  CLOSE READ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 14. Floating Persistent Spiritual AI Chat Assistant Backdrop Blur Overlay */}
        {isConsultantOpen && (
          <div
            onClick={() => setIsConsultantOpen(false)}
            className="fixed inset-0 z-45 bg-slate-50/60 dark:bg-[#0b1120]/60 backdrop-blur-md transition-all duration-500 animate-in fade-in duration-300 cursor-zoom-out"
            title="Click backdrop to close"
          />
        )}

        <YatraConsultant
          isOpen={isConsultantOpen}
          onClose={() => setIsConsultantOpen(false)}
          currentLanguage={currentLanguage}
        />

        {/* Persistent Floating Arc/Quadrant Menu Group */}
        {!isConsultantOpen && (
          <div className="fixed bottom-8 right-6 z-40 select-none">
            {/* Subtle Backdrop Darkening for Expanded Floating Menu */}
            {isMenuExpanded && (
              <div
                onClick={() => setIsMenuExpanded(false)}
                className="fixed inset-0 z-30 bg-slate-50/60 dark:bg-[#0b1120]/60 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
              />
            )}

            {/* Quadrant Fan items Container */}
            <div className="relative z-40 flex items-center justify-center">
              {/* WhatsApp Item (fans out Left: -x) */}
              <a
                href={siteData?.whatsapp || "https://wa.me/919557092965"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuExpanded(false)}
                className={`absolute h-12 w-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#128C7E] border border-white/10 text-white flex items-center justify-center shadow-xl transition-all duration-500 hover:scale-110 active:scale-95 ${
                  isMenuExpanded
                    ? "opacity-100 translate-x-[-72px] translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 translate-x-0 translate-y-0 scale-50 pointer-events-none"
                }`}
                title="Chat with Us on WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="h-6.5 w-6.5 fill-white">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.501-5.717-1.457L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.39 1.45 5.568 0 10.103-4.52 10.106-10.076.002-2.693-1.04-5.226-2.935-7.127C16.31 1.5 13.785.457 11.19.457c-5.578 0-10.116 4.519-10.119 10.079a9.92 9.92 0 001.492 5.161l-.982 3.585 3.674-.963zm13.107-5.011c-.344-.173-2.042-1.008-2.356-1.123-.314-.115-.544-.173-.772.173-.229.347-.885 1.12-1.084 1.348-.2.23-.4.256-.745.083-1.36-.682-2.327-1.196-3.238-2.763-.242-.417-.242-.72 0-1.01.19-.23.344-.45.515-.67.172-.22.229-.374.344-.615.115-.24.057-.45-.028-.624-.086-.173-.772-1.865-1.057-2.553-.278-.673-.564-.58-.772-.59l-.66-.01c-.229 0-.601.086-.916.429-.315.343-1.202 1.176-1.202 2.87 0 1.695 1.231 3.33 1.402 3.56.173.23 2.422 3.7 5.87 5.18 2.378 1.02 3.197.808 3.82.72.636-.09 2.043-.834 2.33-1.64.286-.807.286-1.502.2-.163z" />
                </svg>
              </a>

              {/* Direct Phone Call Item (fans out Diagonal: -x, -y) */}
              <a
                href={`tel:${siteData?.phones?.[0] || "+919557092965"}`}
                onClick={() => setIsMenuExpanded(false)}
                className={`absolute h-12 w-12 rounded-full bg-[#34C759] hover:bg-[#28a745] active:bg-[#1e7e34] border border-white/10 text-white flex items-center justify-center shadow-xl transition-all duration-500 hover:scale-110 active:scale-95 ${
                  isMenuExpanded
                    ? "opacity-100 translate-x-[-51px] translate-y-[-51px] scale-100 pointer-events-auto"
                    : "opacity-0 translate-x-0 translate-y-0 scale-50 pointer-events-none"
                }`}
                title="Call Helpline"
              >
                <Phone className="h-5.5 w-5.5 stroke-2" />
              </a>

              {/* AI Assistant Item (fans out Top: -y) */}
              <button
                onClick={() => {
                  setIsConsultantOpen(true);
                  setIsMenuExpanded(false);
                }}
                className={`absolute h-12 w-12 rounded-full bg-gradient-to-r from-sky-600 to-blue-500 hover:from-sky-550 hover:to-blue-450 border border-white/10 text-white flex items-center justify-center shadow-xl transition-all duration-500 hover:scale-110 active:scale-95 cursor-pointer ${
                  isMenuExpanded
                    ? "opacity-100 translate-x-[35px] translate-y-[-63px] scale-100 pointer-events-auto"
                    : "opacity-0 translate-x-0 translate-y-0 scale-50 pointer-events-none"
                }`}
                title="Ask Spiritual AI Assistant"
              >
                <Sparkles className="h-5 w-5 animate-pulse" />
              </button>

              {/* Main Trigger Hub Button with custom logo/X toggle */}
              <button
                onClick={() => setIsMenuExpanded(!isMenuExpanded)}
                className={`relative h-14 w-14 rounded-full bg-gradient-to-r from-sky-600 to-blue-500 border-2 border-sky-500/40 text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer select-none ring-2 ring-sky-505/20 overflow-hidden ${
                  isMenuExpanded
                    ? "scale-105 rotate-135"
                    : "hover:scale-105 active:scale-95 animate-bounce"
                }`}
                title="Expand Options Menu"
              >
                {isMenuExpanded ? (
                  <X className="h-6 w-6 transform -rotate-135" />
                ) : (
                  <>
                    <span className="absolute -inset-1 rounded-full bg-sky-600/30 blur-xs animate-ping opacity-60" />
                    <span className="text-xl font-serif leading-none font-extrabold z-10">
                      ॐ
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Scroll to Top Arrow */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 left-6 z-[60] w-12 h-12 flex items-center justify-center bg-slate-900 border border-slate-700/60 dark:bg-white dark:border-slate-200 text-white dark:text-slate-900 shadow-xl rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${showScrollTop ? "opacity-100 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
          title="Scroll to Top"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 stroke-[2.5]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
