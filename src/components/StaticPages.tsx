import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactUs() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto min-h-[60vh] animate-fade-in">
      <div className="text-center mb-12">
        <span className="text-sky-500 font-mono text-xs font-bold uppercase tracking-[0.25em]">Get in Touch</span>
        <h2 className="font-serif text-3xl md:text-4xl text-slate-900 dark:text-zinc-100 font-extrabold mt-2">Contact Us</h2>
        <div className="h-0.5 w-16 bg-gradient-to-r from-sky-600 to-blue-500 rounded mx-auto mt-4" />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-sky-500" /> Our Office
          </h3>
          <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
            Adi Kailash Tirath Head Office<br />
            123 Sacred Valley Road,<br />
            Pithoragarh, Uttarakhand, 262501<br />
            India
          </p>

          <div className="space-y-4">
            <a href="tel:+919876543210" className="flex items-center gap-3 text-slate-600 dark:text-zinc-400 hover:text-sky-600 transition text-sm">
              <Phone className="h-4 w-4" /> +91 98765 43210
            </a>
            <a href="mailto:namaste@adikailashtirath.com" className="flex items-center gap-3 text-slate-600 dark:text-zinc-400 hover:text-sky-600 transition text-sm">
              <Mail className="h-4 w-4" /> namaste@adikailashtirath.com
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 p-8 rounded-xl shadow-lg space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
          <div>
            <label className="block text-xs font-mono text-slate-500 dark:text-zinc-400 mb-1">YOUR NAME</label>
            <input type="text" required className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-sky-500 text-slate-900 dark:text-zinc-100" />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-500 dark:text-zinc-400 mb-1">EMAIL ADDRESS</label>
            <input type="email" required className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-sky-500 text-slate-900 dark:text-zinc-100" />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-500 dark:text-zinc-400 mb-1">MESSAGE</label>
            <textarea required rows={4} className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-sky-500 text-slate-900 dark:text-zinc-100 resize-none"></textarea>
          </div>
          <button type="submit" className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded font-mono text-xs font-bold tracking-widest uppercase transition flex items-center justify-center gap-2 cursor-pointer shadow-md">
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
        <div className="h-0.5 w-16 bg-gradient-to-r from-sky-600 to-blue-500 rounded mx-auto mt-4" />
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

export function Feedback() {
  return (
    <div className="py-16 px-4 max-w-3xl mx-auto min-h-[60vh] animate-fade-in">
       <div className="text-center mb-12">
        <span className="text-sky-500 font-mono text-xs font-bold uppercase tracking-[0.25em]">Share Your Experience</span>
        <h2 className="font-serif text-3xl md:text-4xl text-slate-900 dark:text-zinc-100 font-extrabold mt-2">Pilgrim Feedback</h2>
        <div className="h-0.5 w-16 bg-gradient-to-r from-sky-600 to-blue-500 rounded mx-auto mt-4" />
      </div>

        <form className="bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 p-8 rounded-xl shadow-lg space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Hari Om! Thank you for your feedback."); }}>
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
  );
}
