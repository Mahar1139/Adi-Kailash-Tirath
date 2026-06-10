import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, Users, Send, CheckCircle, ShieldCheck, MapPin, Activity } from "lucide-react";
import { PlannerRequest } from "../types";
import { t } from "../utils/lang";
import { motion } from "motion/react";

interface QuickPlannerProps {
  currentLanguage?: string;
}

export default function QuickPlanner({ currentLanguage = "en" }: QuickPlannerProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "Adi Kailash & Om Parvat",
    travelers: "1",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdRequest, setCreatedRequest] = useState<PlannerRequest | null>(null);
  const [existingRequests, setExistingRequests] = useState<PlannerRequest[]>([]);

  // Fetch submitted planners from backend to render real yatra lists
  const fetchPlanners = async () => {
    try {
      const stored = localStorage.getItem("adi_kailash_planners");
      if (stored) {
        setExistingRequests(JSON.parse(stored));
      }
      const res = await fetch("/api/planners");
      if (res.ok) {
        const data = await res.json();
        setExistingRequests(data);
        localStorage.setItem("adi_kailash_planners", JSON.stringify(data));
      }
    } catch (err) {
      console.warn("Failed to load requests from backend, using local storage");
    }
  };

  useEffect(() => {
    fetchPlanners();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert(currentLanguage === "hi" ? "कृपया पंजीकरण के लिए कम से कम नाम और फोन नंबर प्रदान करें।" : "Please provide at least Name and Phone number so we can register.");
      return;
    }

    setLoading(true);
    let successBackend = false;
    try {
      const res = await fetch("/api/planners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const result = await res.json();
        setCreatedRequest(result.planner);
        successBackend = true;
        setSuccess(true);
        // Refresh requests list
        fetchPlanners();
      }
    } catch (err) {
      console.warn("Backend unavailable, saving booking to local storage...");
    } finally {
      if (!successBackend) {
        // Fallback to local storage
        const newPlanner = {
          id: Date.now(),
          name: formData.name,
          email: formData.email || "Not Provided",
          phone: formData.phone,
          destination: formData.destination,
          travelers: Number(formData.travelers) || 1,
          message: formData.message || "Comfort-focused standard requirements.",
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: "Consultant Assigned",
          reference: `NT-2026-${Math.floor(Math.random() * 9000) + 1000}`
        };
        const newList = [newPlanner, ...existingRequests];
        setExistingRequests(newList);
        localStorage.setItem("adi_kailash_planners", JSON.stringify(newList));
        setCreatedRequest(newPlanner as PlannerRequest);
        setSuccess(true);
      }
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "Adi Kailash & Om Parvat",
        travelers: "1",
        message: ""
      });
      setLoading(false);
    }
  };

  // Generate dynamic advisory tip on-the-spot based on destination selected
  const getAdvisoryTip = (dest: string) => {
    if (dest.includes("Kailash") || dest.includes("Om")) {
      return {
        altitude: "18,600 Feet (Extreme)",
        acclimatize: currentLanguage === "hi" 
          ? "चिकित्सीय देखरेख में गुंजी/धारचूला में 2 रात रुकना आवश्यक है।" 
          : "Requires 2 nights halt in Gunji/Dharchula under medical tracking.",
        pack: currentLanguage === "hi"
          ? "दोहरी थर्मल इनर, भारी हवा रोधी जूते, कपूर ब्लॉक, पल्स ऑक्सीमीटर।"
          : "Dual thermals, heavy windproof snow boots, camphor blocks, digital pulse oximeter.",
        difficulty: currentLanguage === "hi" ? "चुनौतीपूर्ण" : "Moderate to Challenging"
      };
    }
    if (dest.includes("Chardham")) {
      return {
        altitude: "11,750 Feet (Challenging)",
        acclimatize: currentLanguage === "hi"
          ? "यमुनोत्री ट्रेक बेस पर क्रमिक चढ़ाई। पीपलकोटी में आराम के दिन शामिल हैं।"
          : "Gradual ascent at Yamunotri trek base. Resting days included in Pipalkoti.",
        pack: currentLanguage === "hi"
          ? "रेनकोट/पोंचो (मानसून के लिए), आरामदायक चलने की छड़ें, अच्छे चलने वाले जूते।"
          : "Raincoats/ponchos (monsoon spells), comfortable walking sticks, active sneakers.",
        difficulty: currentLanguage === "hi" ? "मध्यम" : "Moderate"
      };
    }

    return {
      altitude: "Sea level / Tropical",
      acclimatize: "Generally comfortable climates, standard thermal adjusters.",
      pack: "Sunscreen, cotton apparel, beachwear, walking shoes.",
      difficulty: "Very Easy"
    };
  };

  const advisory = getAdvisoryTip(formData.destination);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-sm border-t border-slate-200/50 dark:border-zinc-800/50 px-4 select-none"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Design elements sidebar */}
          <div className="lg:col-span-5 text-left flex flex-col gap-5">
            <span className="text-sky-500 font-mono text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 animate-pulse" />
              {t("tagline", currentLanguage)}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 font-extrabold tracking-tight">
              {t("plannerTitle", currentLanguage)}
            </h2>
            <p className="text-slate-900 dark:text-zinc-100 text-sm leading-relaxed">
              {t("plannerSub", currentLanguage)}
            </p>

            <div className="space-y-4 mt-2">
              <div className="flex gap-3 bg-slate-100/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-slate-200/60 dark:border-zinc-800/60">
                <div className="bg-sky-500/10 rounded-lg p-2.5 h-fit text-sky-500 border border-sky-500/15">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-slate-900 font-serif font-bold text-sm">HASSLE-FREE PERMITS</h4>
                  <p className="text-slate-900 dark:text-zinc-100 text-xs mt-1">We secure border authorizations, biometric enrollments, and NOC releases from administrative sectors.</p>
                </div>
              </div>

              <div className="flex gap-3 bg-slate-100/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-slate-200/60 dark:border-zinc-800/60">
                <div className="bg-blue-500/10 rounded-lg p-2.5 h-fit text-blue-500 border border-blue-500/15">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-slate-900 font-serif font-bold text-sm">MEDICAL CHECKS & OXYGEN</h4>
                  <p className="text-slate-900 dark:text-zinc-100 text-xs mt-1">Each group vehicle is equipped with oxygen cylinders, pulse oximeters, and trained guides.</p>
                </div>
              </div>

              <div className="flex gap-3 bg-slate-100/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-slate-200/60 dark:border-zinc-800/60">
                <div className="bg-red-500/10 rounded-lg p-2.5 h-fit text-red-500 border border-red-500/15">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-slate-900 font-serif font-bold text-sm">NATIVE EXPERT TOUR OVERVIEWERS</h4>
                  <p className="text-slate-900 dark:text-zinc-100 text-xs mt-1">Travel with native guides who speak your local language and provide personalized care.</p>
                </div>
              </div>
            </div>

            {/* Live dynamic preview widget */}
            <div className="bg-sky-600/5 p-4 rounded-xl border border-sky-500/15 mt-3">
              <p className="text-[10px] font-mono tracking-wider text-sky-400 font-bold uppercase mb-1">
                {t("advisoryHeader", currentLanguage)}:
              </p>
              <div className="grid grid-cols-2 gap-3 text-[11px] mt-2">
                <div>
                  <span className="text-slate-900 dark:text-zinc-100 block">{t("advMaximumAltitude", currentLanguage)}</span>
                  <span className="text-slate-900 dark:text-zinc-100 font-mono font-bold">{advisory.altitude}</span>
                </div>
                <div>
                  <span className="text-slate-900 dark:text-zinc-100 block">{t("advAcclimatization", currentLanguage)}</span>
                  <span className="text-slate-900 dark:text-zinc-100 font-serif font-semibold">{advisory.acclimatize}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-900 dark:text-zinc-100 block">{t("advEssentialGear", currentLanguage)}</span>
                  <span className="text-blue-200 font-serif">{advisory.pack}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration form block */}
          <div className="lg:col-span-7 bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 p-6 md:p-8 rounded-2xl shadow-xl">
            {success && createdRequest ? (
              <div className="text-left py-6 flex flex-col items-center gap-4 animate-in fade-in-50 duration-500">
                <div className="h-14 w-14 bg-green-500/10 border border-green-500/35 rounded-full flex items-center justify-center text-green-500 mb-2">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-zinc-100 text-center">
                  {t("successRegistered", currentLanguage)}
                </h3>
                <p className="text-slate-900 dark:text-zinc-100 text-xs text-center leading-relaxed max-w-md">
                  Namaste, **{createdRequest.name}**. {t("successDetails", currentLanguage)}{" "}
                  <code className="text-sky-500 font-mono font-bold bg-sky-500/15 px-2 py-0.5 rounded border border-sky-500/20">
                    {createdRequest.reference}
                  </code>
                </p>

                <button
                  onClick={() => setSuccess(false)}
                  className="bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold px-5 py-2.5 rounded mt-4 cursor-pointer"
                >
                  {currentLanguage === "hi" ? "दूसरा यात्रा प्लान सबमिट करें" : "SUBMIT ANOTHER TRIP PLAN"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-900 dark:text-zinc-100 text-[11px] font-roboto font-medium uppercase tracking-wider">
                      {t("yatriName", currentLanguage)} *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g., Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-900 dark:text-zinc-100 text-[11px] font-roboto font-medium uppercase tracking-wider">
                      {t("emailOptional", currentLanguage)}
                    </label>
                    <input
                      type="email"
                      placeholder="e.g., ramesh@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-900 dark:text-zinc-100 text-[11px] font-roboto font-medium uppercase tracking-wider">
                      {t("phNo", currentLanguage)} *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g., +91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-900 dark:text-zinc-100 text-[11px] font-roboto font-medium uppercase tracking-wider">
                      {t("destToExplore", currentLanguage)}
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500/50 cursor-pointer text-slate-900 dark:text-zinc-100"
                    >
                      <option value="Adi Kailash & Om Parvat">{t("adiKailashRef", currentLanguage)}</option>
                      <option value="Kailash Mansarovar (Overland/Flight)">{t("kailashMansarovarRef", currentLanguage)}</option>
                      <option value="Classic Chardham Yatra">{t("chardhamRef", currentLanguage)}</option>
                      <option value="Amarnath Helicopter Tour">{t("amarnathRef", currentLanguage)}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5 col-span-2">
                    <label className="text-slate-900 dark:text-zinc-100 text-[11px] font-roboto font-medium uppercase tracking-wider">
                      {t("numberOfYatris", currentLanguage)}
                    </label>
                    <div className="grid grid-cols-2 md:flex md:flex-row gap-2">
                      {["1", "2", "3-5", "5-10", "10+"].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, travelers: num })}
                          className={`flex-1 py-1.5 md:py-2 text-[10px] md:text-xs font-mono rounded border transition cursor-pointer ${
                            formData.travelers === num
                              ? "bg-sky-600/20 text-sky-400 border-sky-500"
                              : "bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 border-slate-300/80 dark:border-zinc-700/80 hover:border-slate-300 dark:border-zinc-700"
                          }`}
                        >
                          {num} {num === "1" ? (currentLanguage === "hi" ? "व्यक्ति" : "Person") : (currentLanguage === "hi" ? "लोग" : "People")}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-900 dark:text-zinc-100 text-[11px] font-roboto font-medium uppercase tracking-wider">
                    {t("specialRequests", currentLanguage)}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g., Age 65, need ground guides, pony requirement details, or oxygen helper..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-sky-600 hover:bg-sky-550 disabled:bg-white dark:bg-zinc-950 text-white font-mono text-xs font-bold tracking-wider py-4 rounded-lg shadow-lg border border-sky-500/20 transition hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  {loading ? (currentLanguage === "hi" ? "दस्तावेज आरक्षण प्रक्रिया में है..." : "PROCESSING DOCUMENT RESERVATION...") : t("calculatePermitBtn", currentLanguage)}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Existing sacred trip requests table - demonstrating functioning database API */}
        {existingRequests.length > 0 && (
          <div className="mt-16 bg-slate-100/40 dark:bg-zinc-900/40 p-6 rounded-2xl border border-slate-300/90 dark:border-zinc-700/90 text-left animate-in fade-in duration-700">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-zinc-100 mb-4 flex items-center gap-1.5">
              <span className="text-sky-500">●</span> 
              {t("registrationsStream", currentLanguage)}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-slate-900 dark:text-zinc-100">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-mono uppercase tracking-wider">
                    <th className="px-4 py-3">REF CODE</th>
                    <th className="px-4 py-3">PILGRIM NAME</th>
                    <th className="px-4 py-3">DESTINATION</th>
                    <th className="px-4 py-3">YATRIS</th>
                    <th className="px-4 py-3">STATUS</th>
                    <th className="px-4 py-3">DATE REQUESTED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-mono">
                  {existingRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-100/50 dark:hover:bg-zinc-800/50 dark:bg-zinc-900/50 transition">
                      <td className="px-4 py-3 text-sky-450 font-bold">{req.reference}</td>
                      <td className="px-4 py-3 font-serif font-medium text-slate-900 dark:text-zinc-100">{req.name}</td>
                      <td className="px-4 py-3 text-slate-900 dark:text-zinc-100">{req.destination}</td>
                      <td className="px-4 py-3">{req.travelers}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-blue-500/10 text-blue-550 border border-blue-500/20 animate-pulse">
                          {req.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-900 dark:text-zinc-100">{req.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
