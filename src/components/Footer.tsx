import React from "react";
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart, FileText, Landmark } from "lucide-react";
import { t } from "../utils/lang";

interface FooterProps {
  setActiveCategory: (cat: string) => void;
  onOpenConsultant: () => void;
  siteData?: any;
  currentLanguage?: string;
}

export default function Footer({ setActiveCategory, onOpenConsultant, siteData, currentLanguage = "en" }: FooterProps) {
  const quickCategories = [
    { key: "adi_kailash", label: t("adiKailashRef", currentLanguage) },
    { key: "kailash_mansarovar", label: t("kailashMansarovarRef", currentLanguage) },
    { key: "chardham", label: t("chardhamRef", currentLanguage) },
    { key: "amarnath", label: t("amarnathRef", currentLanguage) }
  ];

  const companyName = siteData?.companyName || "Adi Kailash Tirath";
  const regNumber = siteData?.regNumber || "UT-NT-2026-904";
  const nocNumber = siteData?.nocNumber || "UT-NOC-SHIVA-9092";

  return (
    <footer className="bg-[#112038] border-t-2 border-sky-800/40 text-slate-300 text-xs select-none">
      
      {/* Top Accent Spiritual Line */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-500 to-red-600 h-1 w-full" />

      <div className="w-full max-w-full mx-auto px-4 md:px-8 xl:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Brand & Introduction */}
        <div className="lg:col-span-4 text-left flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-600 to-blue-500 opacity-20 blur"></div>
              <img 
                src="/logo.jpg" 
                alt="Logo" 
                className="relative w-12 h-12 rounded-full border border-sky-500/30 object-contain bg-[#112038]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-serif text-lg font-extrabold text-white tracking-wider">
                {companyName.split(" ")[0]} <span className="text-sky-400">{companyName.split(" ").slice(1).join(" ")}</span>
              </h3>
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-300">
                Authorized Pilgrimage Operator
              </p>
            </div>
          </div>
          
          <p className="text-slate-300 leading-relaxed text-xs">
            Adi Kailash Tirath specializes in high-altitude spiritual yatras across the sacred Himalayan rim. Handcrafted plans incorporating gradual acclimatization, legal border clearance, certified oximetric health trackers, and high-clearance 4x4 vehicles for absolute camper safety.
          </p>

          <div className="bg-[#193054] border border-sky-900/50 p-4 rounded-xl flex items-center gap-3 mt-1.5">
            <ShieldCheck className="h-8 w-8 text-sky-400 shrink-0" />
            <div className="text-left leading-tight">
              <p className="text-white font-serif font-bold text-[11.5px]">GOVT APPROVED LIAISON</p>
              <p className="text-slate-300 text-[10px] mt-0.5">Registration Number: {regNumber}</p>
            </div>
          </div>
        </div>

        {/* Quick Links Menu */}
        <div className="lg:col-span-3 text-left">
          <h4 className="text-white font-serif font-bold text-sm tracking-wider uppercase pb-2 border-b border-sky-900/50 mb-4 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            {t("quickLinks", currentLanguage)}
          </h4>
          <ul className="space-y-3">
            {quickCategories.map((qc) => (
              <li key={qc.key}>
                <button
                  onClick={() => {
                    setActiveCategory(qc.key);
                    setTimeout(() => {
                      const el = document.getElementById("yatra-catalog-grid");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="hover:text-sky-300 text-slate-300 border-b border-transparent hover:border-sky-500/25 pb-0.5 text-left transition cursor-pointer"
                >
                  {qc.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Physical Office Hubs */}
        <div className="lg:col-span-5 text-left flex flex-col gap-6">
          <div>
            <h4 className="text-white font-serif font-bold text-sm tracking-wider uppercase pb-2 border-b border-sky-900/50 mb-4 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              Our Himalayan Office Hubs
            </h4>
            
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif font-bold text-white">HALDWANI REVENUE OFFICE (HEADQUARTERS)</p>
                  <p className="mt-0.5 text-slate-300">First Floor, Pithoragarh Chauraha, Near Mansarovar Collection, Haldwani, Uttarakhand, India.</p>
                </div>
              </div>

              <div className="flex gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif font-bold text-white">PITHORAGARH BASE CAMP LIAISON</p>
                  <p className="mt-0.5 text-slate-300">Jagannath Complex, Sharif Ghaat Chauraha, Ranikhet Hills Road, Pithoragarh, Uttarakhand.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment gateways and accounts credentials */}
          <div className="pt-4 border-t border-sky-900/50">
            <h5 className="text-slate-300 font-mono text-[9px] font-bold uppercase tracking-widest mb-2.5">
              UPI & MAJOR BANK TRANSACTION CARDS ACCEPTED
            </h5>
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="bg-[#193054] text-white font-bold border border-sky-900/50 text-[9.5px] px-2 py-1 rounded tracking-wide flex items-center gap-1">
                <Landmark className="h-3 w-3 text-sky-400" />
                BHIM UPI
              </span>
              <span className="bg-[#193054] text-white font-bold border border-sky-900/50 text-[9.5px] px-2 py-1 rounded tracking-wide">
                VISA / MASTERCARD
              </span>
              <span className="w-full text-[9px] text-slate-400 mt-1 leading-normal font-mono block">
                NOC Certificate ID: {nocNumber}. Security audit passed.
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Extreme bottom copyright and disclaimer */}
      <div className="bg-[#0b162a] border-t border-sky-900/40">
        <div className="py-6 text-center text-slate-400 w-full max-w-full mx-auto px-4 md:px-8 xl:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-serif text-[11px]">
            © {new Date().getFullYear()} {companyName}. All Rights Reserved. Spiritual parikrama guides.
          </p>
          <div className="flex gap-4 justify-center text-[10.5px] font-serif">
            <a href="#" className="hover:text-sky-300 transition font-mono uppercase text-[9.5px] font-bold text-sky-500/80 tracking-wider" onClick={(e) => { e.preventDefault(); setActiveCategory("admin"); }}>🔑 ADMIN PANEL LOGON</a>
            <span>•</span>
            <a href="#" className="hover:text-sky-300 transition mt-0.5">Terms of Pilgrimage</a>
            <span>•</span>
            <a href="#" className="hover:text-sky-300 transition mt-0.5">High-Altitude Health Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
