import React, { useState } from "react";
import {
  X,
  Users,
  Heart,
  Phone,
  FileText,
  ArrowRight,
  CheckCircle,
  CreditCard,
  User,
} from "lucide-react";
import { YatraPackage } from "../types";
import { t } from "../utils/lang";

interface BookingModalProps {
  pkg: YatraPackage;
  onClose: () => void;
  currentLanguage: string;
}

interface Traveler {
  name: string;
  age: string;
  fitnessLevel: string;
  specialRequirements: string;
}

export default function BookingModal({
  pkg,
  onClose,
  currentLanguage,
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [pax, setPax] = useState(1);
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [travelers, setTravelers] = useState<Traveler[]>([
    { name: "", age: "", fitnessLevel: "Average", specialRequirements: "" },
  ]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPax = parseInt(e.target.value) || 1;
    setPax(newPax);
    
    setTravelers((prev) => {
      const updated = [...prev];
      if (newPax > prev.length) {
        for (let i = prev.length; i < newPax; i++) {
          updated.push({ name: "", age: "", fitnessLevel: "Average", specialRequirements: "" });
        }
      } else if (newPax < prev.length) {
        updated.splice(newPax);
      }
      return updated;
    });
  };

  const updateTraveler = (index: number, field: keyof Traveler, value: string) => {
    const updated = [...travelers];
    updated[index] = { ...updated[index], [field]: value };
    setTravelers(updated);
  };

  // Note: For a real Razorpay integration, we'd load the Razorpay SDK
  // Here we'll simulate the checkout popup or use a mock redirect.
  const handlePayment = () => {
    setIsProcessing(true);

    // In a real application, you would make an API call to your backend
    // to create a Razorpay order, then load the checkout script.
    // We'll simulate the payment process here.

    setTimeout(() => {
      // Simulate Razorpay mock payment popup
      const isConfirmed = window.confirm(
        `[Razorpay Mock Checkout]\n\nPackage: ${pkg.title}\nAmount: ${pkg.price} x ${pax}\n\nClick OK to simulate successful payment.`,
      );

      if (isConfirmed) {
        setIsProcessing(false);
        setIsSuccess(true);
      } else {
        setIsProcessing(false);
      }
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-50/90 dark:bg-[#0b1120]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto select-none">
        <div className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
          <div className="h-16 w-16 bg-green-500/10 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold font-sans text-slate-900 dark:text-slate-100 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Your booking for <strong>{pkg.title}</strong> has been confirmed. A
            confirmation email has been sent to {email}.
          </p>
          <button
            onClick={onClose}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-lg text-sm font-bold w-full cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-50/90 dark:bg-[#0b1120]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto select-none">
      <div className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col my-8 animate-in zoom-in-95 duration-200 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 dark:border-slate-800/60 sticky top-0 bg-white dark:bg-[#0b1120] z-10">
          <div>
            <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-slate-100">
              {step === 1 ? "Traveler Details" : "Payment Details"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Booking: {pkg.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-100 dark:bg-[#1e293b] text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 rounded-full cursor-pointer transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              {/* Primary Contact and Pax */}
              <div className="bg-slate-50 dark:bg-[#0f172a] p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-sky-500" /> Number of
                      Travelers
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={pax}
                      onChange={handlePaxChange}
                      className="w-full bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-green-500" /> Primary Contact
                    </label>
                    <input
                      type="tel"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+91..."
                      className="w-full bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                      Primary Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* Individual Travelers */}
              <div className="space-y-4">
                <h4 className="font-sans font-bold text-slate-900 dark:text-slate-100 text-sm border-b border-slate-200 dark:border-slate-800/60 pb-2">
                  Passenger Details
                </h4>
                
                {travelers.map((traveler, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-[#0f172a] p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 space-y-4 relative">
                    <div className="absolute top-0 right-0 bg-sky-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">
                      TRAVELER {index + 1} {index === 0 && "(LEAD)"}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-sky-500" /> Full Name
                        </label>
                        <input
                          type="text"
                          value={traveler.name}
                          onChange={(e) => updateTraveler(index, "name", e.target.value)}
                          placeholder="Full Name"
                          className="w-full bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                            Age
                          </label>
                          <input
                            type="number"
                            value={traveler.age}
                            onChange={(e) => updateTraveler(index, "age", e.target.value)}
                            placeholder="Age"
                            className="w-full bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500/50"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                            <Heart className="h-3.5 w-3.5 text-red-500" /> Fitness
                          </label>
                          <select
                            value={traveler.fitnessLevel}
                            onChange={(e) => updateTraveler(index, "fitnessLevel", e.target.value)}
                            className="w-full bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500/50"
                          >
                            <option value="Excellent">Excellent</option>
                            <option value="Average">Average</option>
                            <option value="Poor">Poor</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-amber-500" />{" "}
                        Medical/Special Requirements
                      </label>
                      <input
                        type="text"
                        value={traveler.specialRequirements}
                        onChange={(e) => updateTraveler(index, "specialRequirements", e.target.value)}
                        placeholder="Any allergies, medical conditions, or dietary preferences..."
                        className="w-full bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const allNamesFilled = travelers.every(t => t.name.trim() !== "");
                  if (allNamesFilled && contact && email) {
                    setStep(2);
                  } else {
                    alert(
                      "Please fill in the Primary Contact, Email, and Full Name for all travelers.",
                    );
                  }
                }}
                className="w-full mt-4 bg-sky-600 hover:bg-sky-550 text-white font-sans text-sm font-bold py-3 rounded-lg shadow-lg shadow-sky-600/10 border border-sky-500/20 hover:scale-[1.01] transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Continue to Payment <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 rounded-xl p-4">
                <h4 className="font-sans font-bold text-slate-900 dark:text-slate-100 mb-3 border-b border-slate-200 dark:border-slate-800/60 pb-2">
                  Order Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Package:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-slate-100 text-right">
                      {pkg.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Travelers:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-slate-100 text-right">
                      {pax} Person(s)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Price per person:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-slate-100 text-right">
                      {pkg.price}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 flex justify-between font-bold text-lg">
                    <span className="text-slate-900 dark:text-slate-100">
                      Total Payable:
                    </span>
                    <span className="text-sky-500">
                      ₹
                      {(
                        parseInt(pkg.price.replace(/[^0-9]/g, "")) *
                        pax
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 rounded-xl p-4">
                <h4 className="font-sans font-bold text-slate-900 dark:text-slate-100 mb-3 border-b border-slate-200 dark:border-slate-800/60 pb-2">
                  Traveler Details
                </h4>
                <div className="space-y-2 text-sm max-h-40 overflow-y-auto">
                  {travelers.map((t, i) => (
                    <div key={i} className="flex justify-between items-center py-1 border-b border-slate-200 dark:border-slate-800/60 last:border-0">
                      <div>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{t.name || `Traveler ${i+1}`}</span>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {t.age ? `${t.age} yrs` : 'Age N/A'} • {t.fitnessLevel}
                        </div>
                      </div>
                      {i === 0 && <span className="text-[10px] bg-sky-500/10 text-sky-500 px-2 py-0.5 rounded font-bold">LEAD</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3">
                <div className="bg-amber-500/20 p-1.5 rounded-full text-amber-600 dark:text-amber-400 shrink-0">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-amber-700 dark:text-amber-400">
                    Secure Payment with Razorpay
                  </h5>
                  <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-1">
                    You will be redirected to our secure payment gateway to
                    complete your booking. We accept UPI, Credit/Debit Cards,
                    and Netbanking.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-[#1e293b] dark:hover:bg-[#334155] text-slate-700 dark:text-slate-300 font-bold rounded-lg text-sm transition w-1/3 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 bg-[#3399cc] hover:bg-[#2b82ad] text-white font-sans text-sm font-bold py-3 rounded-lg shadow-lg border border-[#3399cc]/20 transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />{" "}
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      Pay with Razorpay <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

