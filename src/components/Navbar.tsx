import React, { useState, useEffect, useRef } from "react";
import { Phone, Mail, Search, Menu, X, Globe, MapPin, Sparkles, Compass, Moon, Sun } from "lucide-react";
import { t } from "../utils/lang";
import { YATRA_PACKAGES, BLOGS } from "../data";

interface NavbarProps {
  activeCategory: string;
  setActiveCategory: (cat: any) => void;
  onOpenConsultant: () => void;
  siteData?: any;
  currentLanguage?: string;
  onChangeLanguage?: (lang: string) => void;
  onOpenPackage?: (pkg: any) => void;
  onOpenBlog?: (blog: any) => void;
}

export default function Navbar({ 
  activeCategory, 
  setActiveCategory, 
  onOpenConsultant, 
  siteData,
  currentLanguage = "en",
  onChangeLanguage,
  onOpenPackage,
  onOpenBlog
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
      }
    }
    if (isSearchExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchExpanded]);

  const categories = [
    { key: "home", label: t("home", currentLanguage) },
    { key: "packages", label: "Packages" },
    { key: "blogs", label: "News & Blogs" },
    { key: "contact_us", label: "Contact Us" },
    { key: "feedback", label: "Feedback" },
    { key: "privacy_policy", label: "Privacy Policy" }
  ];

  const languages = [
    { code: "en", label: "English", nativeLabel: "EN" },
    { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
    { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
    { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
    { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી" },
    { code: "pa", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ" }
  ];

  const logoText = siteData?.logoText || "ADI KAILASH TIRATH";
  const tagline = t("tagline", currentLanguage);
  const activeSeason = t("seasonActive", currentLanguage);
  const phones = siteData?.phones || ["+91 9557092965", "+91 7248737777"];
  const emailVal = siteData?.email || "info@adikailashtirath.com";

  const socialLinks = siteData?.socialLinks || {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    pinterest: "https://pinterest.com",
    reddit: "https://reddit.com",
    twitter: "https://twitter.com"
  };

  const sitePackagesNav = siteData?.packages || [];
  const allPackages = [...sitePackagesNav, ...YATRA_PACKAGES.filter(p => !sitePackagesNav.find((sp: any) => sp.id === p.id))];
  const allBlogs = siteData?.blogs || BLOGS;

  const filteredPackages = searchQuery.trim()
    ? allPackages.filter((p: any) =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.route?.some((r: string) => r.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const filteredBlogs = searchQuery.trim()
    ? allBlogs.filter((b: any) =>
        b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const matchedCategories = searchQuery.trim()
    ? [
        { label: "Adi Kailash Om Parvat Packages", ref: "adi_kailash", keyword: "adi kailash om parvat vyas valley" },
        { label: "Kailash Mansarovar Aerial Packages", ref: "kailash_mansarovar", keyword: "kailash mansarovar aerial flight srinagar lucknow" },
        { label: "Chardham Helicopters & Roads", ref: "chardham", keyword: "chardham kedarnath badrinath gangotri yamunotri tour" },
        { label: "Amarnath Shrine & Vaishno Devi Tours", ref: "amarnath", keyword: "amarnath cave baltal pahalgam helis vaishno devi" }
      ].filter(c => c.keyword.toLowerCase().includes(searchQuery.toLowerCase()) || c.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-lg border-b border-sky-500/10">
      {/* Top Contact Utility Bar */}
      <div className="bg-[#2563eb] px-1 py-1 md:px-4 md:py-2 text-[10px] md:text-[13px] font-medium text-white">
        <div className="w-full max-w-full mx-auto flex flex-wrap items-center justify-between md:justify-start gap-y-2 md:gap-0 px-1 md:px-8">
          {/* Phones (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-2 md:gap-4 order-3 md:order-1">
            {phones.map((phone: string, idx: number) => (
              <React.Fragment key={idx}>
                <a href={`tel:${phone}`} className="flex items-center gap-1 md:gap-1.5 hover:text-white hover:brightness-125 transition">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 text-emerald-400" />
                  <span className="tracking-wide">{phone}</span>
                </a>
                {idx < phones.length - 1 && <span className="text-white/40">|</span>}
              </React.Fragment>
            ))}
            <span className="text-white/40 hidden sm:inline">|</span>
          </div>

          {/* Email (Hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-1 md:gap-1.5 order-4 md:order-2 md:mr-3">
            <a href={`mailto:${emailVal}`} className="flex items-center gap-1 md:gap-1.5 hover:text-white hover:brightness-125 transition">
              <Mail className="h-3 w-3 md:h-4 md:w-4 text-rose-300" />
              <span className="tracking-wide">{emailVal}</span>
            </a>
            <span className="text-white/40 hidden sm:inline ml-2">|</span>
          </div>

          {/* Expandable Search Input Bar */}
          <div ref={searchContainerRef} className="relative flex items-center order-1 md:order-3 md:mr-auto">
              <div className={`flex items-center bg-[#1d4ed8] border border-blue-400/50 ${isSearchExpanded ? "w-36 md:w-40 sm:w-56 pr-2" : "w-7 md:w-8 hover:bg-[#1e40af]"} transition-all duration-300 rounded h-7 md:h-8 overflow-hidden`}>
                <button
                  type="button"
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  className="h-full px-1.5 md:px-2 text-white/90 hover:text-white flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                  title="Search Packages & Shrines"
                >
                  <Search className="h-3 w-3 md:h-4 md:w-4" />
                </button>
                {isSearchExpanded && (
                  <input
                    type="text"
                    placeholder="Search package, route, blog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none text-[11px] md:text-[12.5px] text-white placeholder:text-sky-300 focus:outline-none focus:ring-0 py-0 pl-1 font-sans"
                    autoFocus
                  />
                )}
                {isSearchExpanded && (
                  <button
                    type="button"
                    onClick={() => {
                      if (searchQuery) {
                        setSearchQuery("");
                      } else {
                        setIsSearchExpanded(false);
                      }
                    }}
                    className="text-slate-900 dark:text-zinc-100 hover:text-sky-600 px-1.5 text-xs font-bold cursor-pointer transition-colors focus:outline-none flex items-center justify-center"
                    title={searchQuery ? "Clear Search Input" : "Close Search"}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Floating Help / Search Results Overlay */}
              {isSearchExpanded && searchQuery.trim().length >= 2 && (
                <>
                  <div className="fixed inset-0 z-45" onClick={() => setIsSearchExpanded(false)} />
                  <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-2xl z-50 py-3 max-h-96 overflow-y-auto text-left animate-in fade-in-50 zoom-in-95 duration-150">
                    <p className="text-[10px] font-mono tracking-widest text-slate-900 dark:text-zinc-100 uppercase px-3 pb-1.5 border-b border-slate-200/80 dark:border-zinc-800/80 mb-2 font-bold">
                      Yatra Search Matches
                    </p>

                    {/* Category matches */}
                    {matchedCategories.length > 0 && (
                      <div className="mb-2.5">
                        <p className="text-[9px] font-bold uppercase text-sky-500/85 tracking-widest px-3 mb-1 font-mono">Sacred Destinations</p>
                        {matchedCategories.map((cat) => (
                          <button
                            key={cat.ref}
                            onClick={() => {
                              setActiveCategory(cat.ref);
                              setIsSearchExpanded(false);
                              setSearchQuery("");
                              setTimeout(() => {
                                const el = document.getElementById("yatra-catalog-grid");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                              }, 150);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 text-xs font-semibold text-slate-900 dark:text-slate-900 hover:text-sky-600 transition flex items-center gap-2 cursor-pointer"
                          >
                            <MapPin className="h-3 w-3 text-sky-500 shrink-0" />
                            <span>{cat.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Package matches */}
                    {filteredPackages.length > 0 && (
                      <div className="mb-2.5">
                        <p className="text-[9px] font-bold uppercase text-sky-450 tracking-widest px-3 mb-1 font-mono">Yatra Packages</p>
                        {filteredPackages.map((pkg: any) => (
                          <button
                            key={pkg.id}
                            onClick={() => {
                              if (onOpenPackage) {
                                onOpenPackage(pkg);
                              }
                              setIsSearchExpanded(false);
                              setSearchQuery("");
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-slate-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 text-xs font-semibold text-slate-900 dark:text-slate-900 hover:text-sky-600 transition flex flex-col gap-0.5 cursor-pointer border-b border-slate-200 dark:border-zinc-800 last:border-b-0"
                          >
                            <div className="flex items-center gap-1.5">
                              <Compass className="h-3 w-3 text-sky-450 shrink-0" />
                              <span className="truncate">{pkg.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-900 dark:text-zinc-100 font-normal truncate pl-4.5">{pkg.duration} • {pkg.price}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Blog matches */}
                    {filteredBlogs.length > 0 && (
                      <div className="mb-1">
                        <p className="text-[9px] font-bold uppercase text-blue-500 tracking-widest px-3 mb-1 font-mono">Guides & Blogs</p>
                        {filteredBlogs.map((blog: any) => (
                          <button
                            key={blog.id}
                            onClick={() => {
                              if (onOpenBlog) {
                                onOpenBlog(blog);
                              }
                              setIsSearchExpanded(false);
                              setSearchQuery("");
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-white dark:bg-zinc-950 text-xs font-semibold text-slate-900 dark:text-slate-900 hover:text-sky-600 transition flex flex-col gap-0.5 cursor-pointer border-b border-slate-200 dark:border-zinc-800 last:border-b-0"
                          >
                            <div className="flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-blue-550 shrink-0" />
                              <span className="truncate">{blog.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-900 dark:text-zinc-100 font-normal truncate pl-4.5">{blog.readTime} • by {blog.author}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {matchedCategories.length === 0 && filteredPackages.length === 0 && filteredBlogs.length === 0 && (
                      <div className="p-4 text-center text-xs text-slate-900 dark:text-zinc-100">
                        No matchmaking results found.<br />
                        <span className="text-[10px] text-slate-900 dark:text-zinc-100 mt-1.5 block">Try searching &quot;Parvat&quot;, &quot;Kailash&quot; or &quot;Heli&quot;</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

          {/* Active Season */}
          <div className="flex items-center order-2 md:order-4 shrink-0 mr-2 md:mr-4">
            <span className="inline-flex items-center gap-1 md:gap-1.5 text-amber-500 text-[10px] md:text-[11.5px] font-medium bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full select-none whitespace-nowrap">
              <Sparkles className="h-2 w-2 md:h-2.5 md:w-2.5 animate-pulse" />
              {activeSeason}
            </span>
          </div>
            
          {/* Elegant Dropdown for English, Hindi, Tamil, Telugu, Gujarati, Punjabi */}
          <div className="relative order-3 md:order-5 shrink-0">
              <button
                id="language-dropdown-trigger"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 cursor-pointer hover:text-sky-600 transition text-[11.5px] uppercase tracking-wider text-slate-900 dark:text-zinc-100 bg-slate-200 dark:bg-zinc-800 px-3 py-1 rounded border border-slate-300 dark:border-zinc-700 font-medium whitespace-nowrap outline-none"
              >
                <Globe className="h-3 w-3 text-sky-500" />
                <span>{languages.find((l) => l.code === currentLanguage)?.label || "English"}</span>
                <span className="text-[7px] text-slate-900 dark:text-zinc-100 ml-0.5">▼</span>
              </button>
              
              {isLangMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg shadow-2xl z-50 py-1.5 animate-in fade-in-50 zoom-in-95 duration-100 text-left">
                    <p className="text-[9px] font-mono tracking-widest text-slate-900 dark:text-zinc-100 uppercase px-3 py-1 border-b border-slate-200/80 dark:border-zinc-800/80 mb-1">
                      {t("chooseLanguage", currentLanguage)}
                    </p>
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          if (onChangeLanguage) onChangeLanguage(l.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-serif tracking-wide transition flex items-center justify-between ${
                          currentLanguage === l.code
                            ? "bg-sky-50 text-sky-600 font-bold"
                            : "text-slate-900 dark:text-zinc-100 hover:bg-white dark:bg-zinc-950 hover:text-sky-600"
                        }`}
                      >
                        <span>{l.label}</span>
                        <span className="text-[10px] text-slate-900 dark:text-zinc-100 font-sans font-medium">{l.nativeLabel}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Social Icons inside Header Right Zone */}
            <div className="flex items-center justify-start md:justify-center gap-1.5 w-full md:w-auto border-t border-white/20 md:border-t-0 md:border-l md:border-slate-300/60 pt-1.5 md:pt-0 mt-1.5 md:mt-0 md:pl-3 pr-[100px] md:pr-0 -ml-1 md:ml-0.5 order-5 md:order-6 pb-0.5 md:pb-0 relative">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-slate-900 dark:text-zinc-100 hover:text-sky-500 hover:bg-slate-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition" title="Facebook">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-slate-900 dark:text-zinc-100 hover:text-sky-500 hover:bg-slate-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition" title="Instagram">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-slate-900 dark:text-zinc-100 hover:text-sky-500 hover:bg-slate-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition" title="LinkedIn">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-slate-900 dark:text-zinc-100 hover:text-sky-500 hover:bg-slate-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition" title="YouTube">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
              )}
              {socialLinks.pinterest && (
                <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-slate-900 dark:text-zinc-100 hover:text-sky-500 hover:bg-slate-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition" title="Pinterest">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.16-.1-.95-.2-2.4.04-3.43.22-.94 1.4-5.94 1.4-5.94s-.36-.72-.36-1.78c0-1.67.97-2.92 2.18-2.92 1.03 0 1.53.77 1.53 1.69 0 1.03-.66 2.58-.99 4.01-.28 1.2.6 2.18 1.78 2.18 2.14 0 3.78-2.25 3.78-5.5 0-2.88-2.07-4.89-5.02-4.89-3.42 0-5.43 2.57-5.43 5.22 0 1.03.4 2.14.9 2.75.1.12.11.23.08.35-.09.38-.3.1.22-.38.5-.05.12-.11.24-.08.36a3.53 3.53 0 0 0 3.32-2.14c.24-.46.36-1.04.36-1.63 0-2.15-1.56-4.12-4.5-4.12-2.6 0-4.63 1.86-4.63 4.34 0 1.6.82 2.68 1.78 2.68.21 0 .39-.08.45-.25.07-.18.22-.6.28-.85.04-.15.02-.28-.09-.42-.64-.78-.97-1.9-1.22-3.08-.13-.6-.05-1.24.23-1.79.52-1 1.54-1.72 2.73-1.94s2.44.02 3.31.67c1 1.08 1.57 2.65 1.57 4.35 0 2.5-.94 4.54-2.25 4.54-.7 0-1.35-.36-1.58-.79l-.43 1.63c-.15.6-.57 1.34-1 1.94C10.15 23.82 11.06 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/></svg>
                </a>
              )}
              {socialLinks.reddit && (
                <a href={socialLinks.reddit} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-slate-900 dark:text-zinc-100 hover:text-sky-500 hover:bg-slate-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition" title="Reddit">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.23-1.72l1.24-5.59 4.09.91c.07 1.03.93 1.85 1.98 1.85 1.1 0 2-1 2-2s-.9-2-2-2c-.76 0-1.42.43-1.76 1.07l-4.52-1a.987.987 0 0 0-1.12.72l-1.41 6.33c-2.4.07-4.63.71-6.29 1.73-.56-.75-1.45-1.22-2.41-1.22-1.65 0-3 1.35-3 3 0 1.21.72 2.24 1.77 2.72-.05.26-.07.52-.07.78 0 3.87 4.49 7 10 7s10-3.13 10-7c0-.26-.02-.52-.07-.78 1.05-.48 1.77-1.51 1.77-2.72zm-14.72 1.44c-.75 0-1.36-.61-1.36-1.36s.61-1.36 1.36-1.36 1.36.61 1.36 1.36-.61 1.36-1.36 1.36zm6.35 4.14c-1.3.85-3.4 1.02-4.13 1.02s-2.83-.17-4.13-1.02c-.17-.11-.22-.34-.11-.51.11-.17.34-.22.51-.11 1.07.7 2.87.83 3.73.83s2.66-.13 3.73-.83c.17-.11.4-.06.51.11.11.17.06.4-.11.51zm-.25-2.78c-.75 0-1.36-.61-1.36-1.36s.61-1.36 1.36-1.36 1.36.61 1.36 1.36-.61 1.36-1.36 1.36z"/></svg>
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-slate-900 dark:text-zinc-100 hover:text-sky-500 hover:bg-slate-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition" title="Twitter / X">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              )}
              
              <button
                onClick={() => {
                  setActiveCategory("contact_us");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="md:hidden absolute right-2 text-[10.5px] font-bold text-slate-900 dark:text-zinc-100 uppercase tracking-widest flex items-center justify-center gap-1.5 hover:text-sky-500 transition px-4 sm:px-5 py-1.5 rounded-full border border-slate-300 dark:border-zinc-700 dark:hover:border-sky-500 bg-white dark:bg-zinc-900 shadow-sm whitespace-nowrap min-w-max"
              >
                <Phone className="h-3 w-3 text-sky-500" />
                Contact
              </button>
            </div>
        </div>
      </div>

      {/* Main Core Navbar */}
      <div className="w-full max-w-full mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
        {/* Dynamic Image Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer flex items-center gap-3" onClick={() => {
            setActiveCategory("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}>
            <img 
              src="/logo.jpg" 
              alt="Adi Kailash Tirath Logo" 
              className="relative w-[3.25rem] h-[3.25rem] md:w-14 md:h-14 rounded-full border border-sky-500/30 object-contain shadow-lg"
              referrerPolicy="no-referrer"
            />
            <div className="hidden sm:flex flex-col">
               <span className="font-serif text-xl md:text-2xl tracking-wider font-extrabold text-slate-900 dark:text-zinc-100 leading-none drop-shadow-sm">
                 ADI KAILASH <span className="text-sky-500">TIRATH</span>
               </span>
               <span className="text-[9.5px] md:text-[10.5px] tracking-[0.2em] md:tracking-[0.25em] text-slate-900 dark:text-zinc-100 uppercase font-mono mt-1">
                 {tagline}
               </span>
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {activeCategory !== "home" && (
            <button
              onClick={() => {
                setActiveCategory("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mr-3 px-3 py-1.5 rounded-md text-[13px] font-bold tracking-wide transition-all bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 hover:border-sky-300 text-sky-600 hover:text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 cursor-pointer shadow-md select-none"
            >
              <svg className="h-3.5 w-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              <span>{currentLanguage === "hi" ? "मुख्य पृष्ठ" : "Back to Home"}</span>
            </button>
          )}
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                if (cat.key !== "home" && cat.key !== "why_choose_us") {
                  setTimeout(() => {
                    const el = document.getElementById("yatra-catalog-grid");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium tracking-wide transition-all ${
                activeCategory === cat.key
                  ? "bg-gradient-to-r from-sky-600/20 to-sky-500/10 text-sky-600 border border-sky-500/35"
                  : "text-slate-900 dark:text-zinc-100 hover:text-sky-600 hover:bg-zinc-90 w/10 border border-transparent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenConsultant}
            className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold font-mono tracking-wider px-4 py-2.5 rounded-md shadow-lg shadow-amber-600/15 border border-amber-400 hover:scale-[1.02] transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-100" />
            AI YATRA COACH
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-2.5 text-slate-900 dark:text-zinc-100 hover:text-sky-600 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-md transition cursor-pointer"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Navigation Toggler */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-900 dark:text-zinc-100 hover:text-sky-600 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded transition cursor-pointer"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={onOpenConsultant}
            className="p-2 text-amber-600 bg-amber-500/10 border border-amber-500/30 rounded"
            title="Ask AI Guide"
          >
            <Sparkles className="h-4.5 w-4.5 animate-pulse" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-900 dark:text-zinc-100 hover:text-sky-600 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded transition"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-zinc-950 border-t border-slate-300 dark:border-zinc-700 px-4 py-3 flex flex-col gap-2 shadow-2xl transition duration-300 animate-in fade-in-50">
          <p className="text-[10px] font-mono tracking-widest text-slate-900 dark:text-zinc-100 uppercase pb-1 border-b border-slate-300 dark:border-zinc-700">
            BROWSE SACRED YATRAS
          </p>
          {activeCategory !== "home" && (
            <button
              onClick={() => {
                setActiveCategory("home");
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full text-left px-3 py-2.5 rounded text-[13px] font-bold text-sky-600 bg-sky-500/10 border border-sky-500/20 flex items-center gap-2 select-none"
            >
              <svg className="h-4 w-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              <span>{currentLanguage === "hi" ? "मुख्य पृष्ठ" : "Back to Home"}</span>
            </button>
          )}
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setIsOpen(false);
                if (cat.key !== "home" && cat.key !== "why_choose_us") {
                  setTimeout(() => {
                    const el = document.getElementById("yatra-catalog-grid");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className={`w-full text-left px-3 py-2.5 rounded text-[13px] font-medium transition ${
                activeCategory === cat.key
                  ? "bg-sky-600/15 text-sky-600 border border-sky-500/20"
                  : "text-slate-900 dark:text-zinc-100 hover:bg-white dark:bg-zinc-950 hover:text-sky-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-300 dark:border-zinc-700 flex flex-col gap-2 mt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenConsultant();
              }}
              className="w-full bg-sky-600 py-2.5 rounded text-white text-xs font-mono font-bold text-center border border-sky-500/30"
            >
              CHAT WITH AI ASSISTANT
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
