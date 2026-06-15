import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Star, User } from 'lucide-react';

export function ContactUs({ siteData }: { siteData?: any }) {
  return (
    <div className="py-16 px-4 md:px-8 w-full max-w-full mx-auto min-h-[60vh] animate-fade-in">
      <div className="text-center mb-12">
        <span className="text-sky-500 font-mono text-xs font-bold uppercase tracking-[0.25em]">Get in Touch</span>
        <h2 className="font-serif text-3xl md:text-4xl text-slate-900 dark:text-zinc-100 font-extrabold mt-2">Contact Us</h2>
        <div className="h-0.5 w-[80%] md:w-[60%] max-w-2xl bg-gradient-to-r from-sky-600 to-blue-500 rounded mx-auto mt-4 mb-4" />
        <p className="text-slate-600 dark:text-zinc-400 text-sm max-w-2xl mx-auto">
          {siteData?.contactPageDesc || "Reach out to us for spiritual queries, custom group planning, or assistance with your pilgrimage."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-sky-500" /> Our Office
          </h3>
          <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
            {siteData?.headOffice || `Adi Kailash Tirath Office\nNear Kmou Station Pithoragarh\nuttarakhand, 262501\nIndia`}
          </p>

          <div className="space-y-4">
            {(siteData?.phones || ["+91 9557092965", "+91 7248737777"]).map((phone: string, idx: number) => (
              <a key={idx} href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-slate-600 dark:text-zinc-400 hover:text-sky-600 transition text-sm">
                <Phone className="h-4 w-4" /> {phone}
              </a>
            ))}
            <a href={`mailto:${siteData?.email || "info@adikailashtirath.com"}`} className="flex items-center gap-3 text-slate-600 dark:text-zinc-400 hover:text-sky-600 transition text-sm">
              <Mail className="h-4 w-4" /> {siteData?.email || "info@adikailashtirath.com"}
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 p-8 rounded-xl shadow-lg space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
          {(siteData?.contactFormFields || [
            { label: "YOUR NAME", type: "text", required: true },
            { label: "EMAIL ADDRESS", type: "email", required: true },
            { label: "MESSAGE", type: "textarea", required: true }
          ]).map((field: any, idx: number) => (
            <div key={idx}>
              <label className="block text-xs font-mono text-slate-500 dark:text-zinc-400 mb-1">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea required={field.required} rows={4} className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-sky-500 text-slate-900 dark:text-zinc-100 resize-none"></textarea>
              ) : field.type === "select" ? (
                <select required={field.required} className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-sky-500 text-slate-900 dark:text-zinc-100">
                  <option value="">Select an option</option>
                  {(field.options || []).map((opt: string, i: number) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input type={field.type || "text"} required={field.required} className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-sky-500 text-slate-900 dark:text-zinc-100" />
              )}
            </div>
          ))}
          <button type="submit" className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded font-mono text-xs font-bold tracking-widest uppercase transition flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4">
            <Send className="h-4 w-4" /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <div className="py-16 px-4 max-w-4xl mx-auto min-h-[60vh] animate-fade-in text-slate-800 dark:text-zinc-200">
      <div className="text-center mb-12">
        <span className="text-sky-500 font-mono text-xs font-bold uppercase tracking-[0.25em]">Legal Information</span>
        <h2 className="font-serif text-3xl md:text-4xl text-slate-900 dark:text-zinc-100 font-extrabold mt-2">Privacy Policy</h2>
        <div className="h-0.5 w-[80%] md:w-[60%] max-w-2xl bg-gradient-to-r from-sky-600 to-blue-500 rounded mx-auto mt-4" />
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <p>At Adi Kailash Tirath, we respect your privacy and are committed to protecting your personal data. This privacy policy informs you about how we look after your personal data when you visit our website and tells you about your privacy rights and how the law protects you.</p>
        
        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 mt-8 mb-4">1. Information We Collect</h3>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data (first name, last name), Contact Data (email address, telephone numbers), and Technical Data (IP address, browser type).</p>

        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 mt-8 mb-4">2. How We Use Your Data</h3>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform the contract we are about to enter into or have entered into with you (e.g., booking a Yatra).</p>

        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 mt-8 mb-4">3. Data Security</h3>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered, or disclosed.</p>
      </div>
    </div>
  );
}

export function Feedback({ feedbacks = [] }: { feedbacks?: any[] }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto min-h-[60vh] animate-fade-in">
       <div className="text-center mb-12">
        <span className="text-sky-500 font-mono text-xs font-bold uppercase tracking-[0.25em]">Share Your Experience</span>
        <h2 className="font-serif text-3xl md:text-4xl text-slate-900 dark:text-zinc-100 font-extrabold mt-2">Pilgrim Feedback</h2>
        <div className="h-0.5 w-[80%] md:w-[60%] max-w-2xl bg-gradient-to-r from-sky-600 to-blue-500 rounded mx-auto mt-4" />
      </div>

      {!showForm ? (
        <div className="space-y-8 text-center animate-fade-in">
          <button 
            onClick={() => setShowForm(true)}
            className="mb-8 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded font-mono text-sm font-bold tracking-widest uppercase transition inline-flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            Add Your Feedback
          </button>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {feedbacks.map((fb, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                 <div className="flex items-center gap-3 mb-4">
                   <div className="h-10 w-10 bg-slate-200 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                     <User className="h-5 w-5 text-slate-500 dark:text-zinc-400" />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900 dark:text-zinc-100 text-sm">{fb.name}</h4>
                     <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">{fb.location}</p>
                   </div>
                 </div>
                 <div className="flex gap-1 mb-3">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} className={`h-4 w-4 ${i < (fb.rating || 5) ? 'text-amber-500 fill-amber-500' : 'text-slate-300 dark:text-zinc-700'}`} />
                   ))}
                 </div>
                 <p className="text-slate-600 dark:text-zinc-300 text-sm leading-relaxed italic border-l-2 border-slate-200 dark:border-zinc-700 pl-4">{fb.quote}</p>
                 {fb.trip && (
                     <p className="mt-4 text-xs font-mono text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20 inline-block px-2 py-1 rounded">
                         {fb.trip}
                     </p>
                 )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in relative max-w-2xl mx-auto">
          <button 
            onClick={() => setShowForm(false)}
            className="mb-6 text-sm text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-mono tracking-widest uppercase transition flex items-center gap-2"
          >
            ← Back to Feedbacks
          </button>
          <form className="bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 p-8 rounded-xl shadow-lg space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Hari Om! Thank you for your feedback."); setShowForm(false); }}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-zinc-400 mb-1">YOUR NAME</label>
                <input type="text" required className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-sky-500 text-slate-900 dark:text-zinc-100" />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-zinc-400 mb-1">YATRA PACKAGE</label>
                <select required className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-sky-500 text-slate-900 dark:text-zinc-100">
                  <option value="">Select Package</option>
                  <option value="adi_kailash">Adi Kailash Parvat</option>
                  <option value="chardham">Chardham Yatra</option>
                  <option value="amarnath">Amarnath Yatra</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 dark:text-zinc-400 mb-1">YOUR RATING (Out of 5)</label>
              <input type="number" min="1" max="5" defaultValue={5} required className="w-full md:w-1/3 bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-sky-500 text-slate-900 dark:text-zinc-100" />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 dark:text-zinc-400 mb-1">EXPERIENCE HIGHLIGHTS</label>
              <textarea required rows={5} placeholder="Describe your sacred journey..." className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-sky-500 text-slate-900 dark:text-zinc-100 resize-none"></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded font-mono text-xs font-bold tracking-widest uppercase transition flex items-center justify-center gap-2 cursor-pointer shadow-md">
              <Send className="h-4 w-4" /> Submit Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
