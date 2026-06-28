import React, { useState, useEffect } from "react";
import {
  Key,
  ShieldCheck,
  Mail,
  Phone,
  Edit2,
  Trash2,
  Plus,
  ArrowLeft,
  Save,
  CheckCircle,
  Layers,
  FileText,
  MapPin,
  Image,
  Star,
  Eye,
  Calendar,
  Sliders,
  Globe,
  Award,
  ShieldAlert,
  Users,
  List,
  RefreshCw,
  Video,
} from "lucide-react";

interface AdminPanelProps {
  onClose: () => void;
  initialSiteData: any;
  onRefreshSiteData: () => void;
}

function ImageUploader({
  value,
  onChange,
  label = "Image Link or Upload",
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  const [mode, setMode] = useState<"link" | "upload">("link");
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: file.name, base64 }),
        });
        if (res.ok) {
          const data = await res.json();
          onChange(data.url);
        } else {
          console.error("Upload failed.");
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
          {label}
        </label>
        <div className="flex bg-slate-200 dark:bg-[#1e293b] rounded p-0.5">
          <button
            type="button"
            onClick={() => setMode("link")}
            className={`px-2 py-0.5 text-[9px] rounded font-bold uppercase transition cursor-pointer ${mode === "link" ? "bg-white dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
          >
            Google Link
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2 py-0.5 text-[9px] rounded font-bold uppercase transition cursor-pointer ${mode === "upload" ? "bg-white dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
          >
            Manual Upload
          </button>
        </div>
      </div>
      {mode === "link" ? (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL..."
          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-3 py-2.5 focus:border-sky-500/50 outline-none font-mono"
        />
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="flex-1 text-slate-600 dark:text-slate-400 text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-sky-500/10 file:text-sky-600 hover:file:bg-sky-500/20 cursor-pointer"
          />
          {uploading && (
            <span className="text-[10px] text-sky-500 font-bold uppercase animate-pulse">
              Uploading...
            </span>
          )}
        </div>
      )}
      {value && mode === "upload" && (
        <div className="mt-1">
          <img
            src={value}
            alt="Preview"
            className="h-16 w-16 object-cover rounded border border-slate-200 dark:border-slate-800/60"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
}

export default function AdminPanel({
  onClose,
  initialSiteData,
  onRefreshSiteData,
}: AdminPanelProps) {
  const [secretKey, setSecretKey] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<
    | "bookings"
    | "global"
    | "slides"
    | "destinations"
    | "packages"
    | "gallery"
    | "reviews"
    | "blogs"
    | "accreditations"
    | "reels"
    | "footer"
    | "contact"
    | "typography"
  >("bookings");
  const [siteData, setSiteData] = useState<any>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    message: string;
    action: () => void;
  } | null>(null);

  // Real-time Booking Enquiries
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Forms states
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formMode, setFormMode] = useState<"edit" | "create">("edit");
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [saveMessage, setSaveMessage] = useState("");

  // Sub-item drafts
  const [packageDraft, setPackageDraft] = useState<any>(null);
  const [slideDraft, setSlideDraft] = useState<any>(null);
  const [storyDraft, setStoryDraft] = useState<any>(null);
  const [feedbackDraft, setFeedbackDraft] = useState<any>(null);
  const [blogDraft, setBlogDraft] = useState<any>(null);
  const [destDraft, setDestDraft] = useState<any>(null);
  const [accredDraft, setAccredDraft] = useState<any>(null);

  // Initialize
  useEffect(() => {
    if (initialSiteData) {
      setSiteData(JSON.parse(JSON.stringify(initialSiteData))); // deep copy
    }
  }, [initialSiteData]);

  const loadBookings = async () => {
    setBookingLoading(true);
    try {
      const res = await fetch("/api/planners");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      loadBookings();
    }
  }, [isAuthorized]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretKey === "@12321@##") {
      setIsAuthorized(true);
      setAuthError("");
    } else {
      setAuthError("Invalid administrative secret key. Please try again.");
    }
  };

  const saveToBackend = async (updatedData: any) => {
    setSaveStatus("saving");
    setSaveMessage("Publishing updates to site database...");
    try {
      const res = await fetch("/api/site-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey, data: updatedData }),
      });
      if (res.ok) {
        setSaveStatus("success");
        setSaveMessage("Changes saved & published successfully!");
        setSiteData(updatedData);
        onRefreshSiteData();
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        const err = await res.json();
        setSaveStatus("error");
        setSaveMessage(err.error || "Failed to update configuration.");
      }
    } catch (e: any) {
      setSaveStatus("error");
      setSaveMessage(e.message || "Network Error.");
    }
  };

  const updateBookingStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch("/api/planners/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey, id, status: newStatus }),
      });
      if (res.ok) {
        loadBookings();
      } else {
        console.error("Failed to update status.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteBooking = async (id: number) => {
    setConfirmDialog({
      message: "Are you sure you want to delete this yatra booking lead?",
      action: async () => {
        try {
          const res = await fetch("/api/planners/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ secretKey, id }),
          });
          if (res.ok) {
            loadBookings();
          } else {
            console.error("Failed to delete booking.");
          }
        } catch (e) {
          console.error(e);
        }
      },
    });
  };

  // Generalized structural updates helper
  const handleSaveGlobalField = (field: string, value: any) => {
    const updated = { ...siteData, [field]: value };
    saveToBackend(updated);
  };

  const handleSaveGlobalMultiFields = (fields: { [key: string]: any }) => {
    const updated = { ...siteData, ...fields };
    saveToBackend(updated);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0b1120] flex flex-col justify-center items-center px-4 select-none">
        <div className="absolute top-6 left-6">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:text-slate-100 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Sanctuary
          </button>
        </div>

        <div className="w-full max-w-md bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 p-8 rounded-2xl shadow-2xl relative">
          <div className="absolute -top-10 left-12 w-fit rounded-full border border-sky-500/30 overflow-hidden bg-slate-50 dark:bg-[#0b1120]">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="w-16 h-16 object-contain bg-white dark:bg-[#0b1120]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mt-4 mb-6">
            <h2 className="font-serif text-2xl font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              ADMINISTRATIVE LOGON
            </h2>
            <p className="text-slate-900 dark:text-slate-100 text-xs mt-1 leading-relaxed">
              Authenticate using your master spiritual secret key to modify the
              Adi Kailash Tirath website content dynamically.
            </p>
          </div>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-2 text-red-400 text-xs mb-5 font-mono">
              <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-slate-900 dark:text-slate-100 text-[10.5px] font-mono uppercase tracking-wider">
                Enter Master Secret Key
              </label>
              <div className="relative">
                <input
                  required
                  type="password"
                  placeholder="Secret access key..."
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-sky-500/50"
                />
                <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-900 dark:text-slate-100" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-650 to-sky-500 hover:from-sky-600 hover:to-sky-400 text-white font-mono text-xs font-bold py-3.5 rounded-lg border border-sky-500/30 tracking-widest cursor-pointer shadow-lg shadow-sky-600/10 mt-4"
            >
              UNLOCK PORTAL
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 font-sans select-none flex flex-col md:flex-row">
      {/* Sidebar Controls */}
      <aside className="w-full md:w-64 bg-slate-100 dark:bg-[#0f172a] border-r border-slate-200/80 dark:border-slate-800/60/80 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand/Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800/60 flex justify-between items-center bg-white dark:bg-[#0b1120]">
            <div className="flex flex-col">
              <span className="font-serif text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-wide">
                ADI KAILASH <span className="text-sky-500">ADMIN</span>
              </span>
              <span className="text-[9px] font-mono text-slate-900 dark:text-slate-100 uppercase tracking-widest mt-0.5">
                Dynamic Site Architect
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-xs font-mono uppercase text-sky-400 hover:text-sky-355 transition bg-sky-500/10 px-2 py-1 rounded"
            >
              EXIT
            </button>
          </div>

          {/* Navigation Controls */}
          <nav className="p-3 space-y-1 text-left">
            <p className="text-[9px] font-mono text-slate-900 dark:text-slate-100 tracking-wider uppercase px-3 py-2">
              REAL-TIME LEADS
            </p>
            <button
              onClick={() => {
                setActiveTab("bookings");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono transition ${
                activeTab === "bookings"
                  ? "bg-sky-500/10 text-sky-400 font-semibold"
                  : "text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Yatra Enquiries
              </span>
              {bookings.length > 0 && (
                <span className="bg-red-500 text-white text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-full">
                  {bookings.length}
                </span>
              )}
            </button>

            <p className="text-[9px] font-mono text-slate-900 dark:text-slate-100 tracking-wider uppercase px-3 py-2 pt-4">
              EDITORIAL MANAGER
            </p>

            <button
              onClick={() => {
                setActiveTab("global");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono transition border ${
                activeTab === "global"
                  ? "bg-sky-500/15 text-sky-400 font-bold border-sky-500/30"
                  : "text-slate-900 dark:text-slate-100 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-sky-500" />
                Manage & Live Edit (लाइव चेंज)
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("slides");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono transition border ${
                activeTab === "slides"
                  ? "bg-sky-500/15 text-sky-400 font-bold border-sky-500/30"
                  : "text-slate-900 dark:text-slate-100 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-sky-500" />
                Top Slider Slides (होम पेज स्लाइडर बदलें)
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("destinations");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-mono transition ${
                activeTab === "destinations"
                  ? "bg-sky-500/10 text-sky-400 font-semibold"
                  : "text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <MapPin className="h-4 w-4" /> Destinations Circle
            </button>

            <button
              onClick={() => {
                setActiveTab("packages");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-mono transition ${
                activeTab === "packages"
                  ? "bg-sky-500/10 text-sky-400 font-semibold"
                  : "text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <List className="h-4 w-4" /> Yatra Packages (
              {siteData?.packages?.length || 0})
            </button>

            <button
              onClick={() => {
                setActiveTab("gallery");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-mono transition ${
                activeTab === "gallery"
                  ? "bg-sky-500/10 text-sky-400 font-semibold"
                  : "text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <Image className="h-4 w-4" /> Sub-Destinations
            </button>

            <button
              onClick={() => {
                setActiveTab("reviews");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-mono transition ${
                activeTab === "reviews"
                  ? "bg-sky-500/10 text-sky-400 font-semibold"
                  : "text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <Star className="h-4 w-4" /> Yatri Feedbacks ✍️ (लिखित फीडबैक)
            </button>

            <button
              onClick={() => {
                setActiveTab("reels");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-mono transition ${
                activeTab === "reels"
                  ? "bg-sky-500/10 text-sky-400 font-semibold"
                  : "text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <Video className="h-4 w-4" /> Pilgrim Video Reels 📹 (वीडियो
              रील्स)
            </button>

            <button
              onClick={() => {
                setActiveTab("blogs");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-mono transition ${
                activeTab === "blogs"
                  ? "bg-sky-500/10 text-sky-400 font-semibold"
                  : "text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <FileText className="h-4 w-4" /> News & Blogs
            </button>

            <button
              onClick={() => {
                setActiveTab("accreditations");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-mono transition ${
                activeTab === "accreditations"
                  ? "bg-sky-500/10 text-sky-400 font-semibold"
                  : "text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <Award className="h-4 w-4" /> Accreditations
            </button>

            <button
              onClick={() => {
                setActiveTab("footer");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-mono transition ${
                activeTab === "footer"
                  ? "bg-sky-500/10 text-sky-400 font-semibold"
                  : "text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <FileText className="h-4 w-4" /> Footer Manager
            </button>

            <button
              onClick={() => {
                setActiveTab("contact");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-mono transition ${
                activeTab === "contact"
                  ? "bg-sky-500/10 text-sky-400 font-semibold"
                  : "text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <Phone className="h-4 w-4" /> Contact Form
            </button>

            <button
              onClick={() => {
                setActiveTab("typography");
                setEditingIndex(null);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-mono transition ${
                activeTab === "typography"
                  ? "bg-sky-500/10 text-sky-400 font-semibold"
                  : "text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-white"
              }`}
            >
              <Star className="h-4 w-4" /> Fonts & Typography
            </button>
          </nav>
        </div>

        {/* Global Action Feed */}
        <div className="p-4 bg-white dark:bg-[#0b1120] border-t border-slate-200 dark:border-slate-800/60 text-left">
          <p className="text-[9px] font-mono text-slate-900 dark:text-slate-100 uppercase tracking-widest block mb-2">
            DATABASE STATUS
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-green-400">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>Site Sync Live</span>
          </div>

          {saveStatus !== "idle" && (
            <div
              className={`mt-3 p-2 rounded text-[11px] font-mono ${
                saveStatus === "saving"
                  ? "bg-sky-500/10 text-sky-400"
                  : saveStatus === "success"
                    ? "bg-green-500/10 text-green-400 border border-green-550/20"
                    : "bg-red-500/10 text-red-400"
              }`}
            >
              {saveMessage}
            </div>
          )}
        </div>
      </aside>

      {/* Primary Workspace Panel */}
      <main className="flex-1 bg-white dark:bg-[#0b1120] p-6 md:p-8 overflow-y-auto text-left">
        {!siteData ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="h-7 w-7 text-slate-900 dark:text-slate-100 animate-spin" />
            <p className="text-xs font-mono text-slate-900 dark:text-slate-100">
              Initializing Database Connection...
            </p>
          </div>
        ) : (
          <div>
            {/* TAB CONTENT: BOOKINGS */}
            {activeTab === "bookings" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Yatra Bookings Lead Console
                    </h2>
                    <p className="text-slate-900 dark:text-slate-100 text-xs mt-0.5">
                      Manage planning logs registered in real time by pilgrims
                      using the website form.
                    </p>
                  </div>
                  <button
                    onClick={loadBookings}
                    className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] p-2 rounded transition cursor-pointer text-xs font-mono flex items-center gap-1 text-sky-400"
                  >
                    <RefreshCw
                      className={`h-3 w-3 ${bookingLoading ? "animate-spin" : ""}`}
                    />{" "}
                    Refresh Leads
                  </button>
                </div>

                {bookings.length === 0 ? (
                  <div className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 p-12 rounded-xl text-center">
                    <p className="text-sm font-serif text-slate-900 dark:text-slate-100">
                      No active planning requests found in memory.
                    </p>
                    <p className="text-xs font-mono text-slate-900 dark:text-slate-100 mt-1">
                      Submit names through the Quick Planner block to populate
                      records instantly.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-zinc-90 w-full border border-slate-200 dark:border-slate-800/60 p-5 rounded-xl hover:border-slate-200 dark:border-slate-800/60 transition relative flex flex-col md:flex-row md:justify-between md:items-start gap-4"
                      >
                        <div className="space-y-2 text-left">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="text-sky-450 font-bold font-mono text-xs">
                              {booking.reference}
                            </span>
                            <span className="text-slate-900 dark:text-slate-100 font-mono text-xs">
                              |
                            </span>
                            <span className="font-serif text-sm font-bold text-slate-900 dark:text-slate-100">
                              {booking.name}
                            </span>
                            <span className="text-slate-900 dark:text-slate-100 font-mono text-xs sm:inline">
                              |
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-sky-400 bg-sky-500/5 px-2 py-0.5 rounded border border-sky-500/10">
                              {booking.destination}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1.5 gap-x-6 text-xs font-mono text-slate-900 dark:text-slate-100 pt-1">
                            <div className="flex items-center gap-1.5">
                              <Phone className="h-3 w-3 text-sky-500" />
                              <a
                                href={`tel:${booking.phone}`}
                                className="hover:text-slate-900 dark:text-slate-100 transition"
                              >
                                {booking.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Mail className="h-3 w-3 text-sky-500" />
                              <span>{booking.email}</span>
                            </div>
                            <div>
                              <span>👫 Travelers: </span>
                              <span className="text-slate-900 dark:text-slate-100 font-bold">
                                {booking.travelers} Yatri(s)
                              </span>
                            </div>
                          </div>

                          <p className="text-xs leading-relaxed text-slate-900 dark:text-slate-100 bg-white dark:bg-[#0b1120] p-3 rounded border border-slate-300 dark:border-slate-700/60 mt-2">
                            <span className="text-[10px] uppercase font-mono block text-blue-500/80 mb-0.5">
                              Special Dietary & Health Backups request:
                            </span>
                            {booking.message}
                          </p>

                          <div className="text-[10px] font-mono text-slate-900 dark:text-slate-100 flex items-center gap-1 mt-1">
                            <span>Requested date: </span>
                            <span className="text-slate-900 dark:text-slate-100">
                              {booking.date}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 md:items-end">
                          <div className="flex items-center gap-1.5">
                            <label className="text-[10px] font-mono text-slate-900 dark:text-slate-100 uppercase">
                              Status:
                            </label>
                            <select
                              value={booking.status}
                              onChange={(e) =>
                                updateBookingStatus(booking.id, e.target.value)
                              }
                              className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 px-2 py-1 text-xs font-mono text-blue-400 rounded focus:border-sky-500/50 cursor-pointer"
                            >
                              <option value="Consultant Assigned">
                                Consultant Assigned
                              </option>
                              <option value="Documents Under Verification">
                                Docs Under Verification
                              </option>
                              <option value="Permit Applied">
                                Permit Applied
                              </option>
                              <option value="Booking Approved / Deposited">
                                Approved / Deposited
                              </option>
                              <option value="Yatra Fully Completed">
                                Fully Completed
                              </option>
                              <option value="Lead Cancelled">
                                Lead Cancelled
                              </option>
                            </select>
                          </div>

                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="bg-red-500/10 border border-red-500/15 hover:bg-red-500 hover:text-white p-2 rounded transition cursor-pointer text-xs font-mono flex items-center justify-center gap-1.5 text-red-400 mt-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete Enquiry
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: GLOBAL SETTINGS */}
            {activeTab === "global" && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-sky-500">⚙️</span> Manage & Edit Live
                  (लाइव चेंज और मैनेज करें)
                </h2>
                <p className="text-slate-900 dark:text-slate-100 text-xs mb-6">
                  शीर्ष बैनर टिकर (Top Ticker), फ़ोन नंबर, ईमेल, सोशल मीडिया
                  लिंक्स और उत्तराखंड टूरिज्म रजिस्ट्रेशन क्रेडेंशियल्स को यहाँ
                  से तुरंत लाइव बदलें।
                </p>

                <div className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 p-6 rounded-xl space-y-6">
                  {/* Banner Notices list (TOP RE-ORDERED MODULE) */}
                  <div className="flex flex-col gap-3 pb-6 border-b border-slate-200 dark:border-slate-800/60">
                    <div className="flex flex-col gap-1">
                      <span className="text-sky-450 text-xs font-mono uppercase tracking-wider font-bold">
                        📢 Top Banner Ticker Announcements (शीर्ष बैनर घूमतें
                        हुए संदेश)
                      </span>
                      <p className="text-[11px] text-slate-900 dark:text-slate-100 leading-relaxed">
                        इन्हें बदलें और यह तुरंत मुख्य पृष्ठ के शीर्ष पर घूमते
                        हुए दिखाई देगा। बदलाव करने के बाद बाहर क्लिक (blur)
                        करें।
                      </p>
                    </div>
                    <div className="space-y-2 mt-1">
                      {siteData.bannerTickerText.map(
                        (notice: string, nIdx: number) => (
                          <div key={nIdx} className="flex gap-2 items-center">
                            <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">
                              {nIdx + 1}.
                            </span>
                            <input
                              type="text"
                              defaultValue={notice}
                              onBlur={(e) => {
                                const nt = [...siteData.bannerTickerText];
                                nt[nIdx] = e.target.value;
                                handleSaveGlobalField("bannerTickerText", nt);
                              }}
                              className="flex-1 bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 hover:border-slate-300 dark:border-slate-700/60 focus:border-sky-500/60 text-slate-900 dark:text-slate-900 text-xs rounded px-3 py-2 focus:outline-none transition-all font-sans"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const nt = [...siteData.bannerTickerText];
                                nt.splice(nIdx, 1);
                                handleSaveGlobalField("bannerTickerText", nt);
                              }}
                              className="p-2 border border-slate-200 dark:border-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] hover:text-red-400 rounded text-slate-900 dark:text-slate-100 cursor-pointer transition-colors"
                              title="Delete Announcement Line"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ),
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const nt = [
                          ...siteData.bannerTickerText,
                          "🕉️ Enter your brand new sacred announcement ticker detail here...",
                        ];
                        handleSaveGlobalField("bannerTickerText", nt);
                      }}
                      className="mt-2 w-fit bg-white dark:bg-[#0b1120] border border-slate-300 dark:border-slate-700/60 hover:border-sky-500/50 hover:text-sky-400 text-slate-900 dark:text-slate-100 font-mono text-xs px-4 py-2 rounded inline-flex items-center gap-1.5 cursor-pointer transition"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add New Notice Line (नया
                      संदेश जोड़ें)
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-900 dark:text-slate-100 text-[10px] font-mono uppercase tracking-wider">
                        Navbar Logo Primary Text
                      </label>
                      <input
                        type="text"
                        defaultValue={siteData.logoText}
                        onBlur={(e) =>
                          handleSaveGlobalField("logoText", e.target.value)
                        }
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-900 dark:text-slate-100 text-[10px] font-mono uppercase tracking-wider">
                        Full Company / Brand Name
                      </label>
                      <input
                        type="text"
                        defaultValue={siteData.companyName}
                        onBlur={(e) =>
                          handleSaveGlobalField("companyName", e.target.value)
                        }
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-900 dark:text-slate-100 text-[10px] font-mono uppercase tracking-wider">
                        Motto / Sub-tagline
                      </label>
                      <input
                        type="text"
                        defaultValue={siteData.tagline}
                        onBlur={(e) =>
                          handleSaveGlobalField("tagline", e.target.value)
                        }
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-900 dark:text-slate-100 text-[10px] font-mono uppercase tracking-wider">
                        Active Season Pill Text
                      </label>
                      <input
                        type="text"
                        defaultValue={siteData.activeSeason}
                        onBlur={(e) =>
                          handleSaveGlobalField("activeSeason", e.target.value)
                        }
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="col-span-full bg-zinc-955/80 border border-sky-500/35 p-6 rounded-xl space-y-6 shadow-2xl my-2">
                    <div className="flex items-start gap-2.5 pb-3 border-b border-slate-200/70 dark:border-slate-800/60/70">
                      <Phone className="h-5 w-5 text-sky-500 mt-0.5 animate-pulse" />
                      <div>
                        <span className="text-sky-400 text-xs font-mono uppercase tracking-widest font-bold block">
                          📞 Phone & Support Contacts (हेल्पलाइन फ़ोन नंबर और
                          व्हाट्सएप सेटिंग)
                        </span>
                        <p className="text-[11.5px] text-slate-900 dark:text-slate-100 mt-1 leading-relaxed">
                          यहाँ आप जो दोनों फ़ोन नंबर डालेंगे, वे मुख्य ऊपर पट्टी
                          (Navbar Header) और घूमते टीकर (Announcement Ticker)
                          में तुरंत लाइव अपडेट हो जायेंगे।
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sky-300 text-[10.5px] font-mono uppercase tracking-wider font-bold">
                          ☎️ Toll-Free Phone 1 (पहला मुख्य हेल्पलाइन फ़ोन नंबर)
                        </label>
                        <input
                          type="text"
                          defaultValue={siteData.phones?.[0] || ""}
                          placeholder="+91 XXXXXXXXXX"
                          onBlur={(e) => {
                            const ph = siteData.phones
                              ? [...siteData.phones]
                              : [];
                            ph[0] = e.target.value;
                            handleSaveGlobalField("phones", ph);
                          }}
                          className="bg-zinc-90 w-full bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 focus:border-sky-500 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 outline-none transition-all font-mono hover:border-slate-300 dark:border-slate-700/60"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-sky-300 text-[10.5px] font-mono uppercase tracking-wider font-bold">
                          ☎️ Toll-Free Phone 2 (दूसरा मुख्य हेल्पलाइन फ़ोन नंबर)
                        </label>
                        <input
                          type="text"
                          defaultValue={siteData.phones?.[1] || ""}
                          placeholder="+91 XXXXXXXXXX"
                          onBlur={(e) => {
                            const ph = siteData.phones
                              ? [...siteData.phones]
                              : [];
                            if (ph.length < 2) {
                              ph.push("");
                            }
                            ph[1] = e.target.value;
                            handleSaveGlobalField("phones", ph);
                          }}
                          className="bg-zinc-90 w-full bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 focus:border-sky-500 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 outline-none transition-all font-mono hover:border-slate-300 dark:border-slate-700/60"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-900 dark:text-slate-100 text-[10px] font-mono uppercase tracking-wider font-bold">
                          WhatsApp Link-Phone (व्हाट्सएप डायरेक्ट लिंक - e.g.
                          https://wa.me/917017535116)
                        </label>
                        <input
                          type="text"
                          defaultValue={
                            siteData.whatsapp || "https://wa.me/917017535116"
                          }
                          onBlur={(e) =>
                            handleSaveGlobalField("whatsapp", e.target.value)
                          }
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500 outline-none transition-all font-mono hover:border-slate-300 dark:border-slate-700/60"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-900 dark:text-slate-100 text-[10px] font-mono uppercase tracking-wider font-bold">
                          Primary Email Address (ईमेल पता)
                        </label>
                        <input
                          type="email"
                          defaultValue={
                            siteData.email || "info@adikailashtirath.com"
                          }
                          onBlur={(e) =>
                            handleSaveGlobalField("email", e.target.value)
                          }
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none transition-all font-mono hover:border-slate-300 dark:border-slate-700/60"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-900 dark:text-slate-100 text-[10px] font-mono uppercase tracking-wider">
                        Uttarakhand Tourism Registration ID
                      </label>
                      <input
                        type="text"
                        defaultValue={siteData.regNumber}
                        onBlur={(e) =>
                          handleSaveGlobalField("regNumber", e.target.value)
                        }
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-900 dark:text-slate-100 text-[10px] font-mono uppercase tracking-wider">
                        Official Inner Line NOC Certification
                      </label>
                      <input
                        type="text"
                        defaultValue={siteData.nocNumber}
                        onBlur={(e) =>
                          handleSaveGlobalField("nocNumber", e.target.value)
                        }
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-900 dark:text-slate-100 text-[10px] font-mono uppercase tracking-wider font-bold">
                        Contact Page Full Address (मल्टीलाइन पता)
                      </label>
                      <textarea
                        defaultValue={
                          siteData.headOffice ||
                          `Adi Kailash Tirath Head Office\nNear Kmou Station Pithoragarh\nuttarakhand, 262501\nIndia`
                        }
                        onBlur={(e) =>
                          handleSaveGlobalField("headOffice", e.target.value)
                        }
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none min-h-[100px]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-900 dark:text-slate-100 text-[10px] font-mono uppercase tracking-wider font-bold">
                        Footer Address Line (फूटर का पता)
                      </label>
                      <textarea
                        defaultValue={
                          siteData.footerAddress ||
                          `Near Kmou Station Pithoragarh uttarakhand 262501`
                        }
                        onBlur={(e) =>
                          handleSaveGlobalField("footerAddress", e.target.value)
                        }
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Section Headings Customization */}
                  <div className="flex flex-col gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/60">
                    <span className="text-sky-500 font-mono text-[11px] uppercase tracking-wider font-bold block">
                      Page Section Titles (सभी सेक्शन्स के टाइटल बदलें)
                    </span>
                    <p className="text-[11px] text-slate-900 dark:text-slate-100">
                      Leave blank to use default titles. (खाली छोड़ने पर डिफ़ॉल्ट
                      नाम दिखेंगे)
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4">
                      {/* Destinations */}
                      <div className="flex flex-col gap-1.5 border border-slate-200 dark:border-slate-800/60 p-3 rounded bg-white dark:bg-[#0b1120]">
                        <label className="text-sky-400 text-[10px] font-mono uppercase font-bold">
                          Destinations Section Heading
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Breathtaking Holy Shrines"
                          defaultValue={siteData.text_shrineHeading || ""}
                          onBlur={(e) =>
                            handleSaveGlobalField(
                              "text_shrineHeading",
                              e.target.value,
                            )
                          }
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-2 py-1.5 focus:border-sky-500/50 outline-none w-full"
                        />
                        <input
                          type="text"
                          placeholder="e.g. Explore Destinations"
                          defaultValue={siteData.text_shrineSub || ""}
                          onBlur={(e) =>
                            handleSaveGlobalField(
                              "text_shrineSub",
                              e.target.value,
                            )
                          }
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-2 py-1.5 mt-1 focus:border-sky-500/50 outline-none w-full"
                        />
                      </div>

                      {/* Packages */}
                      <div className="flex flex-col gap-1.5 border border-slate-200 dark:border-slate-800/60 p-3 rounded bg-white dark:bg-[#0b1120]">
                        <label className="text-sky-400 text-[10px] font-mono uppercase font-bold">
                          Packages Section Heading
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Yatra Catalog"
                          defaultValue={siteData.text_catalogTitle || ""}
                          onBlur={(e) =>
                            handleSaveGlobalField(
                              "text_catalogTitle",
                              e.target.value,
                            )
                          }
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-2 py-1.5 focus:border-sky-500/50 outline-none w-full"
                        />
                        <input
                          type="text"
                          placeholder="e.g. Sacred High Altitude Expeditions"
                          defaultValue={siteData.text_packagesSub || ""}
                          onBlur={(e) =>
                            handleSaveGlobalField(
                              "text_packagesSub",
                              e.target.value,
                            )
                          }
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-2 py-1.5 mt-1 focus:border-sky-500/50 outline-none w-full"
                        />
                      </div>

                      {/* Why Choose Us */}
                      <div className="flex flex-col gap-1.5 border border-slate-200 dark:border-slate-800/60 p-3 rounded bg-white dark:bg-[#0b1120]">
                        <label className="text-sky-400 text-[10px] font-mono uppercase font-bold">
                          Why Choose Us Heading
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Authentic Pilgrimage"
                          defaultValue={siteData.text_whyChooseUsHeading || ""}
                          onBlur={(e) =>
                            handleSaveGlobalField(
                              "text_whyChooseUsHeading",
                              e.target.value,
                            )
                          }
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-2 py-1.5 focus:border-sky-500/50 outline-none w-full"
                        />
                        <input
                          type="text"
                          placeholder="e.g. Safety & Experience First"
                          defaultValue={siteData.text_whyChooseUsSub || ""}
                          onBlur={(e) =>
                            handleSaveGlobalField(
                              "text_whyChooseUsSub",
                              e.target.value,
                            )
                          }
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-2 py-1.5 mt-1 focus:border-sky-500/50 outline-none w-full"
                        />
                      </div>

                      {/* Reels & Feedbacks */}
                      <div className="flex flex-col gap-1.5 border border-slate-200 dark:border-slate-800/60 p-3 rounded bg-white dark:bg-[#0b1120]">
                        <label className="text-sky-400 text-[10px] font-mono uppercase font-bold">
                          Yatri Reels Heading
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Yatri Feedbacks"
                          defaultValue={siteData.text_reelsHeading || ""}
                          onBlur={(e) =>
                            handleSaveGlobalField(
                              "text_reelsHeading",
                              e.target.value,
                            )
                          }
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-2 py-1.5 focus:border-sky-500/50 outline-none w-full"
                        />
                        <input
                          type="text"
                          placeholder="e.g. Live Pilgrim Encounters"
                          defaultValue={siteData.text_reelsSub || ""}
                          onBlur={(e) =>
                            handleSaveGlobalField(
                              "text_reelsSub",
                              e.target.value,
                            )
                          }
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-2 py-1.5 mt-1 focus:border-sky-500/50 outline-none w-full"
                        />
                      </div>

                      {/* Blogs */}
                      <div className="flex flex-col gap-1.5 border border-slate-200 dark:border-slate-800/60 p-3 rounded bg-white dark:bg-[#0b1120]">
                        <label className="text-sky-400 text-[10px] font-mono uppercase font-bold">
                          Blogs Heading
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Devotional Blogs"
                          defaultValue={siteData.text_blogTitle || ""}
                          onBlur={(e) =>
                            handleSaveGlobalField(
                              "text_blogTitle",
                              e.target.value,
                            )
                          }
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-2 py-1.5 focus:border-sky-500/50 outline-none w-full"
                        />
                        <input
                          type="text"
                          placeholder="e.g. Essential Guidelines"
                          defaultValue={siteData.text_blogSub || ""}
                          onBlur={(e) =>
                            handleSaveGlobalField(
                              "text_blogSub",
                              e.target.value,
                            )
                          }
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-2 py-1.5 mt-1 focus:border-sky-500/50 outline-none w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Configurable Divine Social Media Links */}
                  <div className="flex flex-col gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/60">
                    <span className="text-slate-900 dark:text-slate-100 text-[10px] font-mono uppercase tracking-wider block">
                      Social Media Platform Redirection Links
                    </span>
                    <p className="text-[11px] text-slate-900 dark:text-slate-100">
                      Paste the complete destination URLs (https://...) for your
                      social channels. Fields commit automatically when you
                      click away.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Facebook */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-900 dark:text-slate-100 text-[9px] font-mono uppercase tracking-wide">
                          Facebook URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://facebook.com/your-page"
                          defaultValue={siteData.socialLinks?.facebook || ""}
                          onBlur={(e) => {
                            const updated = {
                              ...(siteData.socialLinks || {}),
                              facebook: e.target.value,
                            };
                            handleSaveGlobalField("socialLinks", updated);
                          }}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-3 py-2 focus:border-sky-500/50 outline-none"
                        />
                      </div>
                      {/* Instagram */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-900 dark:text-slate-100 text-[9px] font-mono uppercase tracking-wide">
                          Instagram URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://instagram.com/your-username"
                          defaultValue={siteData.socialLinks?.instagram || ""}
                          onBlur={(e) => {
                            const updated = {
                              ...(siteData.socialLinks || {}),
                              instagram: e.target.value,
                            };
                            handleSaveGlobalField("socialLinks", updated);
                          }}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-3 py-2 focus:border-sky-500/50 outline-none"
                        />
                      </div>
                      {/* LinkedIn */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-900 dark:text-slate-100 text-[9px] font-mono uppercase tracking-wide">
                          LinkedIn URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://linkedin.com/company/your-brand"
                          defaultValue={siteData.socialLinks?.linkedin || ""}
                          onBlur={(e) => {
                            const updated = {
                              ...(siteData.socialLinks || {}),
                              linkedin: e.target.value,
                            };
                            handleSaveGlobalField("socialLinks", updated);
                          }}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-3 py-2 focus:border-sky-500/50 outline-none"
                        />
                      </div>
                      {/* YouTube */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-900 dark:text-slate-100 text-[9px] font-mono uppercase tracking-wide">
                          YouTube Channel URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://youtube.com/c/your-channel"
                          defaultValue={siteData.socialLinks?.youtube || ""}
                          onBlur={(e) => {
                            const updated = {
                              ...(siteData.socialLinks || {}),
                              youtube: e.target.value,
                            };
                            handleSaveGlobalField("socialLinks", updated);
                          }}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-3 py-2 focus:border-sky-500/50 outline-none"
                        />
                      </div>
                      {/* Pinterest */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-900 dark:text-slate-100 text-[9px] font-mono uppercase tracking-wide">
                          Pinterest URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://pinterest.com/your-profile"
                          defaultValue={siteData.socialLinks?.pinterest || ""}
                          onBlur={(e) => {
                            const updated = {
                              ...(siteData.socialLinks || {}),
                              pinterest: e.target.value,
                            };
                            handleSaveGlobalField("socialLinks", updated);
                          }}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-3 py-2 focus:border-sky-500/50 outline-none"
                        />
                      </div>
                      {/* Reddit */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-900 dark:text-slate-100 text-[9px] font-mono uppercase tracking-wide">
                          Reddit URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://reddit.com/r/your-community"
                          defaultValue={siteData.socialLinks?.reddit || ""}
                          onBlur={(e) => {
                            const updated = {
                              ...(siteData.socialLinks || {}),
                              reddit: e.target.value,
                            };
                            handleSaveGlobalField("socialLinks", updated);
                          }}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-3 py-2 focus:border-sky-500/50 outline-none"
                        />
                      </div>
                      {/* Twitter / X */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-900 dark:text-slate-100 text-[9px] font-mono uppercase tracking-wide">
                          Twitter / X URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://x.com/your-handle"
                          defaultValue={siteData.socialLinks?.twitter || ""}
                          onBlur={(e) => {
                            const updated = {
                              ...(siteData.socialLinks || {}),
                              twitter: e.target.value,
                            };
                            handleSaveGlobalField("socialLinks", updated);
                          }}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-3 py-2 focus:border-sky-500/50 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: HERO SLIDER SIDES */}
            {activeTab === "slides" && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 uppercase tracking-wider flex items-center gap-2">
                      <span className="text-sky-500">🌅</span> Top Slider Slides
                      (होम पेज का मुख्य स्लाइडर)
                    </h2>
                    <p className="text-slate-900 dark:text-slate-100 text-xs">
                      मुख्य पृष्ठ (Home Page) के सबसे ऊपर दिखने वाली सुंदर
                      तस्वीरों, मुख्य शीर्षकों (Titles) और विवरणों
                      (Descriptions) को यहाँ से तुरंत बदलें या नई तस्वीरें
                      जोड़ें।
                    </p>
                  </div>
                  {editingIndex === null && (
                    <button
                      onClick={() => {
                        setFormMode("create");
                        setEditingIndex(-1);
                        setSlideDraft({
                          pill: "EXPEDITION",
                          stat: "5,100 M",
                          title: "Shree Adi Kailash Tour",
                          subtitle: "Sacred Pilgrimage Adventure",
                          desc: "A spiritual odyssey to the high-altitude holy peaks of Uttarakhand. Join our expert-guided trek.",
                          img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
                        });
                      }}
                      className="bg-sky-650 hover:bg-sky-600 text-white font-mono text-xs px-4 py-2.5 rounded inline-flex items-center gap-1.5 cursor-pointer font-bold transition-all shrink-0 shadow-lg"
                    >
                      <Plus className="h-4 w-4" /> Add New Slide (नई स्लाइड
                      जोड़े)
                    </button>
                  )}
                </div>

                {editingIndex === null ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {siteData.heroSlides &&
                      siteData.heroSlides.map((slide: any, sIdx: number) => (
                        <div
                          key={sIdx}
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between"
                        >
                          <div className="relative h-32 bg-white dark:bg-[#0b1120]">
                            <img
                              src={slide.img}
                              alt={slide.subtitle}
                              className="w-full h-full object-cover opacity-60"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-100 to-transparent" />
                            <span className="absolute top-3 left-3 bg-sky-600/90 text-[10px] font-mono font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded border border-sky-500/20">
                              {slide.pill}
                            </span>
                          </div>

                          <div className="p-4 flex-1 text-left">
                            <span className="text-[10px] font-mono text-blue-500 uppercase block mb-0.5">
                              {slide.subtitle}
                            </span>
                            <h4 className="font-serif text-base font-bold text-slate-900 dark:text-slate-100 leading-tight mb-2">
                              {slide.title}
                            </h4>
                            <p className="text-slate-900 dark:text-slate-100 text-xs line-clamp-3 leading-relaxed mb-4">
                              {slide.desc}
                            </p>
                            <div className="text-[10px] font-mono text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-800/60 pt-2.5">
                              <span>Altitude parameter: </span>
                              <span className="text-slate-900 dark:text-slate-100">
                                {slide.stat}
                              </span>
                            </div>
                          </div>

                          <div className="p-3 bg-white dark:bg-[#0b1120] border-t border-slate-200/80 dark:border-slate-800/60/80 flex gap-2">
                            <button
                              onClick={() => {
                                setFormMode("edit");
                                setEditingIndex(sIdx);
                                setSlideDraft({ ...slide });
                              }}
                              className="flex-1 bg-slate-100 dark:bg-[#0f172a] hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] text-sky-400 font-mono text-xs py-2 rounded text-center border border-slate-200 dark:border-slate-800/60 transition cursor-pointer inline-flex items-center justify-center gap-1.5"
                            >
                              <Edit2 className="h-3 w-3" /> Edit Slide Details
                            </button>
                            {siteData.heroSlides.length > 1 && (
                              <button
                                onClick={() => {
                                  const updatedSlides =
                                    siteData.heroSlides.filter(
                                      (_: any, idx: number) => idx !== sIdx,
                                    );
                                  handleSaveGlobalField(
                                    "heroSlides",
                                    updatedSlides,
                                  );
                                }}
                                className="p-2 border border-slate-200 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 hover:text-red-405 rounded cursor-pointer transition-colors"
                                title="Delete Slide (स्लाइड हटाएं)"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 p-6 rounded-xl text-left">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/60">
                      <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                        {formMode === "create"
                          ? "Add New Slide (नई स्लाइड जोड़ें)"
                          : `Modify Slide (स्लाइड बदलें) #${editingIndex + 1}`}
                      </h3>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:text-slate-100 transition cursor-pointer text-xs font-mono"
                      >
                        Cancel (रद्द करें)
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Top Pill Category/Tag (ऊपर छोटा पीला टैग - e.g.
                            EXPEDITION)
                          </label>
                          <input
                            type="text"
                            value={slideDraft.pill}
                            onChange={(e) =>
                              setSlideDraft({
                                ...slideDraft,
                                pill: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2.5 outline-none focus:border-sky-500/50"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Altitude Badge/Stat (दाहिनी ओर ऊंचाई मीटर - e.g.
                            5,100 M)
                          </label>
                          <input
                            type="text"
                            value={slideDraft.stat}
                            onChange={(e) =>
                              setSlideDraft({
                                ...slideDraft,
                                stat: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2.5 outline-none focus:border-sky-500/50"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                          Slide Main Display Title (मुख्य बड़ी हेडिंग/शीर्षक)
                        </label>
                        <input
                          type="text"
                          value={slideDraft.title}
                          onChange={(e) =>
                            setSlideDraft({
                              ...slideDraft,
                              title: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2.5 outline-none focus:border-sky-500/50"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                          Slide Colored Subtitle (उप-शीर्षक / जैसे: Adi Kailash
                          Yatra)
                        </label>
                        <input
                          type="text"
                          value={slideDraft.subtitle}
                          onChange={(e) =>
                            setSlideDraft({
                              ...slideDraft,
                              subtitle: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2.5 outline-none focus:border-sky-500/50"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                          Descriptive Copy Text (स्लाइड की जानकारी/विवरण)
                        </label>
                        <textarea
                          rows={3}
                          value={slideDraft.desc}
                          onChange={(e) =>
                            setSlideDraft({
                              ...slideDraft,
                              desc: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-xs rounded px-3 py-2.5 outline-none focus:border-sky-500/50 font-sans"
                        />
                      </div>

                      <ImageUploader
                        label="Slide Background Image"
                        value={slideDraft.img}
                        onChange={(url) =>
                          setSlideDraft({ ...slideDraft, img: url })
                        }
                      />

                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex gap-2">
                        <button
                          onClick={() => {
                            const updatedSlides = [...siteData.heroSlides];
                            if (formMode === "create") {
                              updatedSlides.push(slideDraft);
                            } else {
                              updatedSlides[editingIndex] = slideDraft;
                            }
                            handleSaveGlobalField("heroSlides", updatedSlides);
                            setEditingIndex(null);
                          }}
                          className="bg-sky-650 hover:bg-sky-600 text-white font-mono text-xs px-5 py-3 rounded inline-flex items-center gap-1.5 cursor-pointer font-bold transition-all"
                        >
                          <Save className="h-4 w-4" />{" "}
                          {formMode === "create"
                            ? "Create Slide (स्लाइड जोड़ें)"
                            : "Save Slide Changes (स्लाइड सेव करें)"}
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="bg-white dark:bg-[#0b1120] hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 font-mono text-xs px-4 py-3 rounded cursor-pointer"
                        >
                          Disregard (बंद करें)
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: DESTINATIONS */}
            {activeTab === "destinations" && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                      <MapPin className="text-sky-500 h-6 w-6" /> Journey
                      Destinations List
                    </h2>
                    <p className="text-slate-900 dark:text-slate-100 text-xs">
                      Manage the Shrine Headings and Circular Destinations Grid
                      block.
                    </p>
                  </div>
                </div>

                {editingIndex === null ? (
                  <div className="flex flex-col gap-6">
                    {/* Header Editing */}
                    <div className="bg-slate-50 dark:bg-[#0f172a]/50 rounded border border-slate-200 dark:border-slate-800/60 p-5">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-800/60 pb-2">
                        Destinations Banner Section{" "}
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                            Top Shrine Heading
                          </label>
                          <input
                            type="text"
                            defaultValue={
                              siteData.text_shrineHeading ||
                              "CHOOSE YOUR NEXT PILGRIMAGE"
                            }
                            onBlur={(e) =>
                              handleSaveGlobalField(
                                "text_shrineHeading",
                                e.target.value,
                              )
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                            Main Shrine Banner Subtitle
                          </label>
                          <input
                            type="text"
                            defaultValue={
                              siteData.text_shrineSub || "Major Shrine Regions"
                            }
                            onBlur={(e) =>
                              handleSaveGlobalField(
                                "text_shrineSub",
                                e.target.value,
                              )
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Circular Destinations Editing */}
                    <div className="bg-slate-50 dark:bg-[#0f172a]/50 rounded border border-slate-200 dark:border-slate-800/60 p-5">
                      <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-slate-800/60 pb-2">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          Destinations List
                        </h3>
                        <button
                          onClick={() => {
                            setFormMode("create");
                            setEditingIndex(-1);
                            setDestDraft({
                              title: "New Destination",
                              categoryRef: "home",
                              img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=200",
                              description:
                                "Spiritual connection to the divine.",
                            });
                          }}
                          className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-1 text-[10px] font-mono rounded"
                        >
                          + ADD DESTINATION
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(siteData.circularDestinations || []).map(
                          (item: any, idx: number) => (
                            <div
                              key={idx}
                              className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 rounded p-4 relative group"
                            >
                              <div className="flex items-center gap-4">
                                {item.img && (
                                  <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-800/60"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                                    {item.title}
                                  </h4>
                                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-[#0f172a] px-1 py-0.5 rounded mt-1 inline-block truncate max-w-full">
                                    Ref: {item.categoryRef}
                                  </span>
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 flex opacity-0 group-hover:opacity-100 transition">
                                <button
                                  onClick={() => {
                                    setFormMode("edit");
                                    setEditingIndex(idx);
                                    setDestDraft({ ...item });
                                  }}
                                  className="p-1 text-slate-500 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    setConfirmDialog({
                                      message: `Delete destination '${item.title}' permanently?`,
                                      action: () => {
                                        const arr = [
                                          ...(siteData.circularDestinations ||
                                            []),
                                        ];
                                        arr.splice(idx, 1);
                                        handleSaveGlobalField(
                                          "circularDestinations",
                                          arr,
                                        );
                                        setConfirmDialog(null);
                                      },
                                    });
                                  }}
                                  className="p-1 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-[#0f172a]/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800/60 relative shadow-lg">
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-zinc-100 flex items-center gap-1 text-xs font-mono font-bold uppercase"
                    >
                      <ArrowLeft className="h-3 w-3" /> Back
                    </button>
                    <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                      {formMode === "create"
                        ? "Add New Destination"
                        : "Edit Destination"}
                    </h3>

                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase font-mono font-bold text-slate-900 dark:text-slate-100">
                            Destination Title
                          </label>
                          <input
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 w-full"
                            value={destDraft?.title || ""}
                            onChange={(e) =>
                              setDestDraft((p: any) => ({
                                ...p,
                                title: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase font-mono font-bold text-slate-900 dark:text-slate-100">
                            Category Reference ID
                          </label>
                          <input
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 w-full"
                            value={destDraft?.categoryRef || ""}
                            onChange={(e) =>
                              setDestDraft((p: any) => ({
                                ...p,
                                categoryRef: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-mono font-bold text-slate-900 dark:text-slate-100">
                          Image URL
                        </label>
                        <ImageUploader
                          value={destDraft?.img || ""}
                          onChange={(url) =>
                            setDestDraft((p: any) => ({ ...p, img: url }))
                          }
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-mono font-bold text-slate-900 dark:text-slate-100">
                          Short Description
                        </label>
                        <textarea
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 min-h-[60px]"
                          value={destDraft?.description || ""}
                          onChange={(e) =>
                            setDestDraft((p: any) => ({
                              ...p,
                              description: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          onClick={() => {
                            const arr = [
                              ...(siteData.circularDestinations || []),
                            ];
                            if (formMode === "create") {
                              arr.push(destDraft);
                            } else if (editingIndex !== -1) {
                              arr[editingIndex] = destDraft;
                            }
                            handleSaveGlobalField("circularDestinations", arr);
                            setEditingIndex(null);
                          }}
                          className="bg-sky-600 hover:bg-sky-500 text-white font-mono font-bold text-xs px-6 py-2 rounded transition shadow flex items-center gap-2"
                        >
                          <Save className="h-4 w-4" /> Save Destination
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: YATRA PACKAGES */}
            {activeTab === "packages" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Yatra Packages Catalog
                    </h2>
                    <p className="text-slate-900 dark:text-slate-100 text-xs mt-0.5">
                      Define pricing details, inclusions, exclusions, highlights
                      list, and day-wise itineraries directly.
                    </p>
                  </div>
                  {editingIndex === null && (
                    <button
                      onClick={() => {
                        setFormMode("create");
                        setEditingIndex(-1); // special flag for new
                        setPackageDraft({
                          id: "yatra-package-" + Date.now(),
                          category: "adi_kailash",
                          title: "New Pilgrimage Expedition Tour",
                          badge: "Dynamic Journey",
                          duration: "5 Nights / 6 Days",
                          price: "₹35,000",
                          numericPrice: 35000,
                          fromRoute: "Haldwani Base Pickup",
                          overview:
                            "This is a brief general overview describing the holy peaks, stays, and route approvals included in this newly established yatra package.",
                          difficulty: "Moderate",
                          highlights: [
                            "Sacred Darshan with local guiding technicians",
                            "All Outer and Inner line permits managed dynamically",
                          ],
                          inclusion: [
                            "Comfortable warm local homestay and pure vegetarian cuisine",
                            "Backup oxygen cylinders and support staff guides",
                          ],
                          exclusion: ["Personal porter and pony expenses"],
                          itinerary: [
                            {
                              day: 1,
                              title:
                                "Assembling at base station and detailed orientation",
                              details:
                                "Meet coordinators, submit medical checklist papers, and prepare transit permits.",
                            },
                          ],
                          imageUrl:
                            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800",
                        });
                      }}
                      className="bg-sky-650 hover:bg-sky-600 text-white font-mono text-xs px-4 py-2.5 rounded font-bold uppercase tracking-wider cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Plus className="h-4 w-4" /> Create New Yatra Package
                    </button>
                  )}
                </div>

                {editingIndex === null ? (
                  <div className="space-y-4">
                    {siteData.packages.length > 0 && (
                      <div className="flex items-center justify-between bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 p-3 rounded-xl mb-4">
                        <div className="flex items-center gap-3 px-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-sky-500 focus:ring-sky-500/50 bg-white dark:bg-[#0b1120] cursor-pointer"
                            checked={
                              selectedPackages.length ===
                                siteData.packages.length &&
                              siteData.packages.length > 0
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPackages(
                                  siteData.packages.map((pkg: any) => pkg.id),
                                );
                              } else {
                                setSelectedPackages([]);
                              }
                            }}
                          />
                          <span className="text-xs font-mono text-slate-700 dark:text-slate-300">
                            Select All ({siteData.packages.length} packages)
                          </span>
                        </div>
                        {selectedPackages.length > 0 && (
                          <button
                            onClick={() => {
                              setConfirmDialog({
                                message: `Are you sure you want to permanently delete ${selectedPackages.length} selected packages?`,
                                action: async () => {
                                  const updatedPackages =
                                    siteData.packages.filter(
                                      (pkg: any) =>
                                        !selectedPackages.includes(pkg.id),
                                    );
                                  handleSaveGlobalField(
                                    "packages",
                                    updatedPackages,
                                  );
                                  setSelectedPackages([]);
                                },
                              });
                            }}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-mono text-xs px-3 py-1.5 rounded cursor-pointer transition border border-red-500/20 inline-flex items-center gap-1.5 font-bold"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete Selected (
                            {selectedPackages.length})
                          </button>
                        )}
                      </div>
                    )}

                    {siteData.packages.map((pkg: any, pIdx: number) => (
                      <div
                        key={pkg.id}
                        className={`bg-slate-100 dark:bg-[#0f172a] border p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${selectedPackages.includes(pkg.id) ? "border-sky-500/50 bg-sky-500/5 dark:bg-sky-500/5" : "border-slate-200 dark:border-slate-800/60"}`}
                      >
                        <div className="flex items-center gap-4 text-left w-full">
                          <div className="flex-shrink-0 self-center pl-1">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-sky-500 focus:ring-sky-500/50 bg-white dark:bg-[#0b1120] cursor-pointer"
                              checked={selectedPackages.includes(pkg.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedPackages([
                                    ...selectedPackages,
                                    pkg.id,
                                  ]);
                                } else {
                                  setSelectedPackages(
                                    selectedPackages.filter(
                                      (id) => id !== pkg.id,
                                    ),
                                  );
                                }
                              }}
                            />
                          </div>
                          <img
                            src={pkg.imageUrl}
                            alt={pkg.title}
                            className="h-16 w-20 object-cover rounded border border-slate-200 dark:border-slate-800/60 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-mono uppercase bg-slate-200 dark:bg-[#1e293b] text-slate-900 dark:text-slate-100 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700/60">
                                {pkg.category}
                              </span>
                              <span className="text-[10px] font-mono uppercase bg-sky-550/15 text-sky-400 px-2 py-0.5 rounded border border-sky-500/10 font-bold">
                                {pkg.badge}
                              </span>
                              <span className="text-xs text-slate-900 dark:text-slate-100 font-mono">
                                {pkg.duration}
                              </span>
                            </div>
                            <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 leading-snug">
                              {pkg.title}
                            </h4>
                            <div className="flex items-center gap-4 text-xs font-mono text-slate-900 dark:text-slate-100 mt-1">
                              <span>
                                From:{" "}
                                <strong className="text-slate-900 dark:text-slate-100 font-normal">
                                  {pkg.fromRoute}
                                </strong>
                              </span>
                              <span>•</span>
                              <span>
                                Price:{" "}
                                <strong className="text-sky-400 font-bold">
                                  {pkg.price}
                                </strong>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 shrink-0 justify-end">
                          <button
                            onClick={() => {
                              setFormMode("edit");
                              setEditingIndex(pIdx);
                              setPackageDraft(JSON.parse(JSON.stringify(pkg))); // deep local draft setup
                            }}
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] text-sky-400 font-mono text-xs px-3.5 py-2 rounded inline-flex items-center gap-1 cursor-pointer transition"
                          >
                            <Edit2 className="h-3 w-3" /> Edit Package Content
                          </button>
                          <button
                            onClick={() => {
                              setConfirmDialog({
                                message: `Are you absolutely sure you want to delete "${pkg.title}" package permanently from catalog?`,
                                action: async () => {
                                  const updatedPackages = [
                                    ...siteData.packages,
                                  ];
                                  updatedPackages.splice(pIdx, 1);
                                  handleSaveGlobalField(
                                    "packages",
                                    updatedPackages,
                                  );
                                },
                              });
                            }}
                            className="bg-red-500/5 hover:bg-red-500/20 text-red-400 p-2 border border-slate-200 dark:border-slate-800/60 rounded cursor-pointer transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 p-6 rounded-xl text-left">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/60">
                      <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                        {formMode === "create"
                          ? "Establish New Pilgrimage Package"
                          : `Modify Package: ${packageDraft.title}`}
                      </h3>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:text-slate-100 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Section A: Essential parameters */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Category Filter ID Tag
                          </label>
                          <select
                            value={packageDraft.category}
                            onChange={(e) =>
                              setPackageDraft({
                                ...packageDraft,
                                category: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 cursor-pointer outline-none font-mono"
                          >
                            <option value="adi_kailash">
                              Adi Kailash Packages
                            </option>
                            <option value="kailash_mansarovar">
                              Kailash Mansarovar
                            </option>
                            <option value="chardham">Chardham Yatra</option>
                            <option value="amarnath">Amarnath Yatra</option>
                            <option value="om_parvat">Om Parvat Yatra</option>
                            <option value="munsyari">Munsyari Tour</option>
                            <option value="kainchi_dham">
                              Kainchi Dham Yatra
                            </option>
                            <option value="maa_purnagiri">
                              Maa Purnagiri Yatra
                            </option>
                            <option value="panchachuli">
                              Panchachuli Range
                            </option>
                            <option value="darma_valley">Darma Valley</option>
                            <option value="chirkilla_dam">Chirkilla Dam</option>
                            <option value="narayan_ashram">
                              Narayan Ashram
                            </option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Package Special Badge
                          </label>
                          <input
                            type="text"
                            value={packageDraft.badge}
                            onChange={(e) =>
                              setPackageDraft({
                                ...packageDraft,
                                badge: e.target.value,
                              })
                            }
                            placeholder="e.g., Best Seller / Elite Experience"
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Difficulty Rating
                          </label>
                          <select
                            value={packageDraft.difficulty}
                            onChange={(e) =>
                              setPackageDraft({
                                ...packageDraft,
                                difficulty: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 cursor-pointer outline-none"
                          >
                            <option value="Easy">Easy</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Challenging">Challenging</option>
                            <option value="Extreme Trekking">
                              Extreme Trekking
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Itinerary Duration Label
                          </label>
                          <input
                            type="text"
                            value={packageDraft.duration}
                            onChange={(e) =>
                              setPackageDraft({
                                ...packageDraft,
                                duration: e.target.value,
                              })
                            }
                            placeholder="e.g., 7 Nights / 8 Days"
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Cost Pricing Label
                          </label>
                          <input
                            type="text"
                            value={packageDraft.price}
                            onChange={(e) =>
                              setPackageDraft({
                                ...packageDraft,
                                price: e.target.value,
                              })
                            }
                            placeholder="e.g., ₹42,000"
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Numeric Pricing Value (for calculations)
                          </label>
                          <input
                            type="number"
                            value={packageDraft.numericPrice || 0}
                            onChange={(e) =>
                              setPackageDraft({
                                ...packageDraft,
                                numericPrice: Number(e.target.value),
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                          Travel Title Header
                        </label>
                        <input
                          type="text"
                          value={packageDraft.title}
                          onChange={(e) =>
                            setPackageDraft({
                              ...packageDraft,
                              title: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Route / Pickup Base Location
                          </label>
                          <input
                            type="text"
                            value={packageDraft.fromRoute}
                            onChange={(e) =>
                              setPackageDraft({
                                ...packageDraft,
                                fromRoute: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 focus:border-sky-500/50 outline-none"
                          />
                        </div>
                        <ImageUploader
                          label="Card Poster Image"
                          value={packageDraft.imageUrl}
                          onChange={(url) =>
                            setPackageDraft({ ...packageDraft, imageUrl: url })
                          }
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                          Introduction & Overview
                        </label>
                        <textarea
                          rows={3}
                          value={packageDraft.overview}
                          onChange={(e) =>
                            setPackageDraft({
                              ...packageDraft,
                              overview: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-3 py-2.5 focus:border-sky-500/50 outline-none font-sans"
                        />
                      </div>

                      {/* Lists of Highlights, Inclusions, Exclusions */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800/60">
                        {/* Highlights */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 block font-bold">
                            🎯 Package Highlights
                          </span>
                          {packageDraft.highlights.map(
                            (hlt: string, hIdx: number) => (
                              <div
                                key={hIdx}
                                className="flex gap-1.5 items-center"
                              >
                                <input
                                  type="text"
                                  value={hlt}
                                  onChange={(e) => {
                                    const temp = [...packageDraft.highlights];
                                    temp[hIdx] = e.target.value;
                                    setPackageDraft({
                                      ...packageDraft,
                                      highlights: temp,
                                    });
                                  }}
                                  className="flex-1 bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-xs rounded px-2 py-1.5"
                                />
                                <button
                                  onClick={() => {
                                    const temp = [...packageDraft.highlights];
                                    temp.splice(hIdx, 1);
                                    setPackageDraft({
                                      ...packageDraft,
                                      highlights: temp,
                                    });
                                  }}
                                  className="text-red-500 text-xs font-bold"
                                >
                                  X
                                </button>
                              </div>
                            ),
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              setPackageDraft({
                                ...packageDraft,
                                highlights: [
                                  ...packageDraft.highlights,
                                  "New amazing highlight",
                                ],
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-xs font-mono text-slate-900 dark:text-slate-100 px-2 py-1 rounded"
                          >
                            + Highlight
                          </button>
                        </div>

                        {/* Inclusions */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-green-400 block font-bold">
                            🟢 Inclusions
                          </span>
                          {packageDraft.inclusion.map(
                            (inc: string, iIdx: number) => (
                              <div
                                key={iIdx}
                                className="flex gap-1.5 items-center"
                              >
                                <input
                                  type="text"
                                  value={inc}
                                  onChange={(e) => {
                                    const temp = [...packageDraft.inclusion];
                                    temp[iIdx] = e.target.value;
                                    setPackageDraft({
                                      ...packageDraft,
                                      inclusion: temp,
                                    });
                                  }}
                                  className="flex-1 bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-xs rounded px-2 py-1.5"
                                />
                                <button
                                  onClick={() => {
                                    const temp = [...packageDraft.inclusion];
                                    temp.splice(iIdx, 1);
                                    setPackageDraft({
                                      ...packageDraft,
                                      inclusion: temp,
                                    });
                                  }}
                                  className="text-red-500 text-xs font-bold"
                                >
                                  X
                                </button>
                              </div>
                            ),
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              setPackageDraft({
                                ...packageDraft,
                                inclusion: [
                                  ...packageDraft.inclusion,
                                  "New dynamic inclusion",
                                ],
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-xs font-mono text-slate-900 dark:text-slate-100 px-2 py-1 rounded"
                          >
                            + Inclusion
                          </button>
                        </div>

                        {/* Exclusions */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block font-bold">
                            🔴 Exclusions
                          </span>
                          {packageDraft.exclusion.map(
                            (exc: string, eIdx: number) => (
                              <div
                                key={eIdx}
                                className="flex gap-1.5 items-center"
                              >
                                <input
                                  type="text"
                                  value={exc}
                                  onChange={(e) => {
                                    const temp = [...packageDraft.exclusion];
                                    temp[eIdx] = e.target.value;
                                    setPackageDraft({
                                      ...packageDraft,
                                      exclusion: temp,
                                    });
                                  }}
                                  className="flex-1 bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-xs rounded px-2 py-1.5"
                                />
                                <button
                                  onClick={() => {
                                    const temp = [...packageDraft.exclusion];
                                    temp.splice(eIdx, 1);
                                    setPackageDraft({
                                      ...packageDraft,
                                      exclusion: temp,
                                    });
                                  }}
                                  className="text-red-500 text-xs font-bold"
                                >
                                  X
                                </button>
                              </div>
                            ),
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              setPackageDraft({
                                ...packageDraft,
                                exclusion: [
                                  ...packageDraft.exclusion,
                                  "New general exclusion",
                                ],
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-xs font-mono text-slate-900 dark:text-slate-100 px-2 py-1 rounded"
                          >
                            + Exclusion
                          </button>
                        </div>
                      </div>

                      {/* Day wise itineraries! */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 space-y-4">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-blue-500 block font-bold">
                          📅 Day-by-Day Historical Tour Itinerary Details
                        </span>
                        {packageDraft.itinerary.map((itn: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 p-4 rounded-lg space-y-3"
                          >
                            <div className="flex justify-between items-center bg-slate-100 dark:bg-[#0f172a] px-3 py-1.5 rounded">
                              <span className="text-xs font-mono font-bold text-sky-400">
                                DAY {itn.day || idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const temp = [...packageDraft.itinerary];
                                  temp.splice(idx, 1);
                                  // Re-align day numbers
                                  const aligned = temp.map((val, i) => ({
                                    ...val,
                                    day: i + 1,
                                  }));
                                  setPackageDraft({
                                    ...packageDraft,
                                    itinerary: aligned,
                                  });
                                }}
                                className="text-red-400 hover:text-red-300 text-xs font-mono"
                              >
                                Remove day
                              </button>
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-mono uppercase text-slate-900 dark:text-slate-100">
                                Day Header title
                              </label>
                              <input
                                type="text"
                                value={itn.title}
                                onChange={(e) => {
                                  const temp = [...packageDraft.itinerary];
                                  temp[idx].title = e.target.value;
                                  setPackageDraft({
                                    ...packageDraft,
                                    itinerary: temp,
                                  });
                                }}
                                className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-xs rounded px-3 py-2 outline-none focus:border-sky-500/50"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-mono uppercase text-slate-900 dark:text-slate-100">
                                Full detailed Day explanation narrative
                              </label>
                              <textarea
                                rows={2}
                                value={itn.details}
                                onChange={(e) => {
                                  const temp = [...packageDraft.itinerary];
                                  temp[idx].details = e.target.value;
                                  setPackageDraft({
                                    ...packageDraft,
                                    itinerary: temp,
                                  });
                                }}
                                className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-xs rounded px-3 py-2 outline-none focus:border-sky-500/50 font-sans"
                              />
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newDayNum = packageDraft.itinerary.length + 1;
                            const newDay = {
                              day: newDayNum,
                              title: "Unveiled Spiritual Destination",
                              details:
                                "Enter detailed explanations about local transit halts, acclimatization practices, and holy visits here.",
                            };
                            setPackageDraft({
                              ...packageDraft,
                              itinerary: [...packageDraft.itinerary, newDay],
                            });
                          }}
                          className="w-full py-2.5 border border-dashed border-slate-200 dark:border-slate-800/60 hover:border-sky-500/30 text-slate-900 dark:text-slate-100 hover:text-sky-400 font-mono text-xs rounded text-center transition"
                        >
                          + Add Next Travel Day Segment
                        </button>
                      </div>

                      {/* Core bottom save buttons */}
                      <div className="pt-6 border-t border-slate-200 dark:border-slate-800/60 flex gap-2">
                        <button
                          onClick={() => {
                            let updated = [...siteData.packages];
                            if (formMode === "create") {
                              updated.push(packageDraft);
                            } else {
                              updated[editingIndex] = packageDraft;
                            }
                            handleSaveGlobalField("packages", updated);
                            setEditingIndex(null);
                          }}
                          className="bg-sky-650 hover:bg-sky-600 text-white font-mono text-xs px-5 py-3.5 rounded inline-flex items-center gap-1.5 cursor-pointer font-bold"
                        >
                          <Save className="h-4 w-4" /> Save Package Details
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 font-mono text-xs px-4 py-3.5 rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: GALLERY / CIRCULAR SUB-DESTINATIONS */}
            {activeTab === "gallery" && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 uppercase tracking-wider">
                  Sub-Destinations Grid & Category References
                </h2>
                <p className="text-slate-900 dark:text-slate-100 text-xs mb-6">
                  Modify circular navigation circles displayed inside individual
                  packages detail boxes.
                </p>

                {editingIndex === null ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {siteData.circularDestinations.map(
                      (dest: any, dIdx: number) => (
                        <div
                          key={dIdx}
                          className="bg-white dark:bg-[#0b1120] border border-slate-300 dark:border-slate-700/60 hover:border-slate-200 dark:border-slate-800/60 transition p-4 rounded-xl flex items-center gap-3.5"
                        >
                          <img
                            src={dest.img}
                            alt={dest.title}
                            className="h-14 w-14 rounded-full object-cover border border-sky-500/25 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 text-left">
                            <span className="text-[9px] font-mono uppercase text-slate-900 dark:text-slate-100 block">
                              {dest.categoryRef}
                            </span>
                            <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-slate-900">
                              {dest.title}
                            </h4>
                            <p className="text-slate-900 dark:text-slate-100 text-[11px] line-clamp-2 leading-tight">
                              {dest.description}
                            </p>
                            <div className="mt-2.5 flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingIndex(dIdx);
                                  setDestDraft({ ...dest });
                                }}
                                className="text-[10px] font-mono text-sky-400 flex items-center gap-0.5 cursor-pointer"
                              >
                                <Edit2 className="h-3 w-3" /> Edit details
                              </button>
                              <button
                                onClick={() => {
                                  setConfirmDialog({
                                    message: `Are you absolutely sure you want to delete "${dest.title}" from sub-destinations?`,
                                    action: async () => {
                                      const updated = [
                                        ...siteData.circularDestinations,
                                      ];
                                      updated.splice(dIdx, 1);
                                      handleSaveGlobalField(
                                        "circularDestinations",
                                        updated,
                                      );
                                    },
                                  });
                                }}
                                className="text-[10px] font-mono text-red-500 hover:text-red-400 flex items-center gap-0.5 cursor-pointer"
                              >
                                <Trash2 className="h-3 w-3" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-100 dark:bg-[#0f172a] border border-slate-300 dark:border-slate-700/60 p-6 rounded-xl text-left">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/60">
                      <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                        Edit Sub-Destination Details
                      </h3>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:text-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 font-mono">
                          <label className="text-[10px] uppercase text-slate-900 dark:text-slate-100 tracking-wider">
                            Related Category Reference ID
                          </label>
                          <input
                            type="text"
                            value={destDraft.categoryRef}
                            onChange={(e) =>
                              setDestDraft({
                                ...destDraft,
                                categoryRef: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase text-slate-900 dark:text-slate-100 tracking-wider">
                            Sub-Destination Header Title
                          </label>
                          <input
                            type="text"
                            value={destDraft.title}
                            onChange={(e) =>
                              setDestDraft({
                                ...destDraft,
                                title: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase text-slate-900 dark:text-slate-100 tracking-wider">
                          Summary Narrative
                        </label>
                        <textarea
                          rows={2}
                          value={destDraft.description}
                          onChange={(e) =>
                            setDestDraft({
                              ...destDraft,
                              description: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-xs rounded px-3 py-2 focus:border-sky-500/50 outline-none font-sans"
                        />
                      </div>

                      <ImageUploader
                        label="Circular Destination Image"
                        value={destDraft.img}
                        onChange={(url) =>
                          setDestDraft({ ...destDraft, img: url })
                        }
                      />

                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex gap-2">
                        <button
                          onClick={() => {
                            const updated = [...siteData.circularDestinations];
                            updated[editingIndex] = destDraft;
                            handleSaveGlobalField(
                              "circularDestinations",
                              updated,
                            );
                            setEditingIndex(null);
                          }}
                          className="bg-sky-650 hover:bg-sky-600 text-white font-mono text-xs px-5 py-2.5 rounded font-bold cursor-pointer"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 font-mono text-xs px-4 py-2.5 rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: WRITTEN FEEDBACKS */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Yatri Feedbacks ✍️ (लिखित फीडबैक)
                    </h2>
                    <p className="text-slate-900 dark:text-slate-100 text-xs mt-0.5">
                      Manage written customer reviews, star ratings, and
                      personal yatra testimonials.
                    </p>
                  </div>
                  {editingIndex === null && (
                    <button
                      onClick={() => {
                        setFormMode("create");
                        setEditingIndex(-1);
                        setFeedbackDraft({
                          id: "fb-" + Date.now(),
                          name: "Shri Devotee Pilgrim",
                          location: "Mumbai, Maharashtra",
                          trip: "Adi Kailash Om Parvat Yatra",
                          rating: 5,
                          quote:
                            "A truly blissful, deeply divine and well-organized pilgrimage experience. The hospitality, guidance, and meals were outstanding.",
                        });
                      }}
                      className="bg-sky-650 hover:bg-sky-600 text-white font-mono text-xs px-3 py-2 rounded inline-flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Plus className="h-4.5 w-4.5" /> Add New Yatri Feedback
                    </button>
                  )}
                </div>

                {editingIndex === null ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    {(siteData.yatriFeedbacks || []).map(
                      (fb: any, idx: number) => (
                        <div
                          key={fb.id}
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 rounded-xl overflow-hidden shadow flex flex-col justify-between"
                        >
                          <div className="p-4 flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[10px] font-mono text-sky-400 block uppercase font-bold">
                                {fb.trip}
                              </span>
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, r_idx) => (
                                  <Star
                                    key={r_idx}
                                    className={`h-3 w-3 ${r_idx < (fb.rating || 5) ? "fill-blue-450 text-blue-450 font-bold" : "text-slate-900 dark:text-slate-100"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs italic leading-relaxed text-slate-900 dark:text-slate-100">
                              "{fb.quote}"
                            </p>
                            <div className="mt-4 flex items-center gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800/60">
                              <span className="h-9 w-9 text-slate-900 dark:text-slate-100 rounded-full border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#0b1120] flex items-center justify-center font-serif text-sm font-bold text-sky-400">
                                {fb.name ? fb.name.charAt(0) : "Y"}
                              </span>
                              <div>
                                <h5 className="font-serif text-sm font-bold text-slate-900 dark:text-slate-100">
                                  {fb.name}
                                </h5>
                                <span className="text-[10px] font-mono text-slate-900 dark:text-slate-100">
                                  {fb.location}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-white dark:bg-[#0b1120] border-t border-slate-200/85 dark:border-slate-800/60/85 flex justify-between gap-2.5">
                            <button
                              onClick={() => {
                                setFormMode("edit");
                                setEditingIndex(idx);
                                setFeedbackDraft({ ...fb });
                              }}
                              className="bg-slate-100 dark:bg-[#0f172a] hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] text-sky-400 border border-slate-200 dark:border-slate-800/60 hover:border-sky-500/20 text-xs font-mono px-3 py-1.5 rounded cursor-pointer flex items-center gap-1"
                            >
                              <Edit2 className="h-3 w-3" /> Edit Feedback
                            </button>
                            <button
                              onClick={() => {
                                setConfirmDialog({
                                  message: "Delete this feedback review?",
                                  action: async () => {
                                    const temp = [
                                      ...(siteData.yatriFeedbacks || []),
                                    ];
                                    temp.splice(idx, 1);
                                    handleSaveGlobalField(
                                      "yatriFeedbacks",
                                      temp,
                                    );
                                  },
                                });
                              }}
                              className="text-red-400 hover:text-red-300 text-xs font-mono p-1"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 p-6 rounded-xl text-left">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/60">
                      <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                        Establish/Edit Yatri Feedback Review
                      </h3>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:text-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Yatri Pilgrim Name
                          </label>
                          <input
                            type="text"
                            value={feedbackDraft?.name || ""}
                            onChange={(e) =>
                              setFeedbackDraft({
                                ...feedbackDraft,
                                name: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Home City / Location
                          </label>
                          <input
                            type="text"
                            value={feedbackDraft?.location || ""}
                            onChange={(e) =>
                              setFeedbackDraft({
                                ...feedbackDraft,
                                location: e.target.value,
                              })
                            }
                            placeholder="e.g., Bangalore, Karnataka"
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Pilgrimage Undertaken
                          </label>
                          <input
                            type="text"
                            value={feedbackDraft?.trip || ""}
                            onChange={(e) =>
                              setFeedbackDraft({
                                ...feedbackDraft,
                                trip: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Star Rating (1 to 5)
                          </label>
                          <select
                            value={feedbackDraft?.rating || 5}
                            onChange={(e) =>
                              setFeedbackDraft({
                                ...feedbackDraft,
                                rating: Number(e.target.value),
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2"
                          >
                            <option value={5}>5 Stars (Excellent)</option>
                            <option value={4}>4 Stars (Very Good)</option>
                            <option value={3}>3 Stars (Average)</option>
                            <option value={2}>2 Stars (Below Average)</option>
                            <option value={1}>1 Star (Poor)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                          Testimonial Feedback Quote
                        </label>
                        <textarea
                          rows={4}
                          value={feedbackDraft?.quote || ""}
                          onChange={(e) =>
                            setFeedbackDraft({
                              ...feedbackDraft,
                              quote: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-xs rounded px-3 py-2 font-sans"
                        />
                      </div>

                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex gap-2">
                        <button
                          onClick={() => {
                            let temp = siteData.yatriFeedbacks
                              ? [...siteData.yatriFeedbacks]
                              : [];
                            if (formMode === "create") {
                              temp.push(feedbackDraft);
                            } else {
                              temp[editingIndex!] = feedbackDraft;
                            }
                            handleSaveGlobalField("yatriFeedbacks", temp);
                            setEditingIndex(null);
                          }}
                          className="bg-sky-650 hover:bg-sky-600 text-white font-mono text-xs px-5 py-2.5 rounded font-bold cursor-pointer"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 font-mono text-xs px-4 py-2.5 rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: TRAVELER VIDEO REELS */}
            {activeTab === "reels" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Pilgrim Video Reels 📹 (वीडियो रील्स)
                    </h2>
                    <p className="text-slate-900 dark:text-slate-100 text-xs mt-0.5">
                      Control mobile-friendly video clips, Instagram reels, and
                      YouTube shorts backgrounds.
                    </p>
                  </div>
                  {editingIndex === null && (
                    <button
                      onClick={() => {
                        setFormMode("create");
                        setEditingIndex(-1);
                        setStoryDraft({
                          id: "story-" + Date.now(),
                          name: "Yatri Pilgrim",
                          location: "Varanasi, UP",
                          trip: "Adi Kailash Om Parvat Yatra",
                          quote:
                            "Absolutely beautiful and blissful. The local guides were highly helpful and made sure everything went perfectly.",
                          coverImage:
                            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400",
                          videoUrl:
                            "https://assets.mixkit.co/videos/preview/mixkit-cold-mountain-stream-under-a-bridge-34440-large.mp4",
                          duration: "0:45",
                        });
                      }}
                      className="bg-sky-650 hover:bg-sky-600 text-white font-mono text-xs px-3 py-2 rounded inline-flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Plus className="h-4.5 w-4.5" /> Add New Video Reel
                    </button>
                  )}
                </div>

                {editingIndex === null ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    {(siteData.travelStories || []).map(
                      (story: any, idx: number) => (
                        <div
                          key={story.id}
                          className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 rounded-xl overflow-hidden shadow flex flex-col justify-between"
                        >
                          <div className="p-4 flex-1">
                            <span className="text-[10px] font-mono text-sky-400 block mb-1 uppercase font-bold">
                              {story.trip}
                            </span>
                            <p className="text-xs italic leading-relaxed text-slate-900 dark:text-slate-100">
                              "{story.quote}"
                            </p>
                            <div className="mt-2 text-[10px] text-slate-900 dark:text-slate-100 font-mono truncate">
                              Video Link:{" "}
                              <span className="text-sky-300">
                                {story.videoUrl || "None"}
                              </span>
                            </div>
                            <div className="mt-4 flex items-center gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800/60">
                              <img
                                src={story.coverImage}
                                alt={story.name}
                                className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-slate-800/60"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <h5 className="font-serif text-sm font-bold text-slate-900 dark:text-slate-100">
                                  {story.name}
                                </h5>
                                <span className="text-[10px] font-mono text-slate-900 dark:text-slate-100">
                                  {story.location} ({story.duration})
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-white dark:bg-[#0b1120] border-t border-slate-200/85 dark:border-slate-800/60/85 flex justify-between gap-2.5">
                            <button
                              onClick={() => {
                                setFormMode("edit");
                                setEditingIndex(idx);
                                setStoryDraft({ ...story });
                              }}
                              className="bg-slate-100 dark:bg-[#0f172a] hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-[#1e293b] text-sky-400 border border-slate-200 dark:border-slate-800/60 hover:border-sky-500/20 text-xs font-mono px-3 py-1.5 rounded cursor-pointer flex items-center gap-1"
                            >
                              <Edit2 className="h-3 w-3" /> Edit Reel
                            </button>
                            <button
                              onClick={() => {
                                setConfirmDialog({
                                  message: "Delete this pilgrim video reel?",
                                  action: async () => {
                                    const temp = [
                                      ...(siteData.travelStories || []),
                                    ];
                                    temp.splice(idx, 1);
                                    handleSaveGlobalField(
                                      "travelStories",
                                      temp,
                                    );
                                  },
                                });
                              }}
                              className="text-red-400 hover:text-red-300 text-xs font-mono p-1"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 p-6 rounded-xl text-left">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/60">
                      <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                        Establish/Edit Pilgrim Video Reel
                      </h3>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:text-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Yatri Pilgrim Name
                          </label>
                          <input
                            type="text"
                            value={storyDraft?.name || ""}
                            onChange={(e) =>
                              setStoryDraft({
                                ...storyDraft,
                                name: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Home City / Location
                          </label>
                          <input
                            type="text"
                            value={storyDraft?.location || ""}
                            onChange={(e) =>
                              setStoryDraft({
                                ...storyDraft,
                                location: e.target.value,
                              })
                            }
                            placeholder="e.g., Mumbai, Maharashtra"
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Pilgrimage Undertaken
                          </label>
                          <input
                            type="text"
                            value={storyDraft?.trip || ""}
                            onChange={(e) =>
                              setStoryDraft({
                                ...storyDraft,
                                trip: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Video duration label
                          </label>
                          <input
                            type="text"
                            value={storyDraft?.duration || ""}
                            onChange={(e) =>
                              setStoryDraft({
                                ...storyDraft,
                                duration: e.target.value,
                              })
                            }
                            placeholder="e.g., 0:45"
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                          Brief Testimonial Quote
                        </label>
                        <textarea
                          rows={3}
                          value={storyDraft?.quote || ""}
                          onChange={(e) =>
                            setStoryDraft({
                              ...storyDraft,
                              quote: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-xs rounded px-3 py-2 font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageUploader
                          label="Poster Cover Image URL"
                          value={storyDraft?.coverImage}
                          onChange={(url) =>
                            setStoryDraft({ ...storyDraft, coverImage: url })
                          }
                        />
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Reel Video Link / URL (Supports Instagram Reels &
                            YouTube Shorts/Videos & MP4)
                          </label>
                          <input
                            type="text"
                            value={storyDraft?.videoUrl || ""}
                            onChange={(e) =>
                              setStoryDraft({
                                ...storyDraft,
                                videoUrl: e.target.value,
                              })
                            }
                            placeholder="e.g., https://www.instagram.com/reel/C8q8qUfS_R9/ or https://youtu.be/..."
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-xs rounded px-3 py-2.5 font-mono"
                          />
                          <span className="text-[10px] text-slate-900 dark:text-slate-100 font-mono">
                            You can paste standard .mp4 video links, YouTube
                            video/shorts links, or public Instagram Reels links.
                            We will auto-embed them perfectly.
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex gap-2">
                        <button
                          onClick={() => {
                            let temp = [...(siteData.travelStories || [])];
                            if (formMode === "create") {
                              temp.push(storyDraft);
                            } else {
                              temp[editingIndex!] = storyDraft;
                            }
                            handleSaveGlobalField("travelStories", temp);
                            setEditingIndex(null);
                          }}
                          className="bg-sky-650 hover:bg-sky-600 text-white font-mono text-xs px-5 py-2.5 rounded font-bold cursor-pointer"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 font-mono text-xs px-4 py-2.5 rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: BLOGS */}
            {activeTab === "blogs" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Dynamic Blog Posts & Advisories
                    </h2>
                    <p className="text-slate-900 dark:text-slate-100 text-xs mt-0.5">
                      Edit detailed guide instructions, reading times, write-ups
                      and poster image assets.
                    </p>
                  </div>
                  {editingIndex === null && (
                    <button
                      onClick={() => {
                        setFormMode("create");
                        setEditingIndex(-1);
                        setBlogDraft({
                          id: "blog-" + Date.now(),
                          title: "New Spiritual Advancements Yatra Blog",
                          excerpt:
                            "Brief summary describing high-level details of this incredible new guide post info.",
                          date: "05 Jun 2026",
                          author: "Adi Kailash Tirath Guides Team",
                          readTime: "5 Min Read",
                          imageUrl:
                            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=500",
                          content:
                            "This is the full detailed informational body of your blog post. Share helpful advice about permissions registries, packing checklist items, breathing systems exercises and itinerary maps.",
                        });
                      }}
                      className="bg-sky-650 hover:bg-sky-600 text-white font-mono text-xs px-3 py-2 rounded inline-flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Plus className="h-4.5 w-4.5" /> Compose New Blog
                    </button>
                  )}
                </div>

                {editingIndex === null ? (
                  <div className="space-y-4">
                    {siteData.blogs.map((blog: any, bIdx: number) => (
                      <div
                        key={blog.id}
                        className="bg-zinc-90 w-full border border-slate-200 dark:border-slate-800/60 p-4 rounded-xl flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4 text-left">
                          <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="h-14 w-14 object-cover rounded border border-slate-200 dark:border-slate-800/60 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-slate-900 dark:text-slate-100">
                                {blog.date}
                              </span>
                              <span className="text-[10px] text-slate-900 dark:text-slate-100 font-mono">
                                |
                              </span>
                              <span className="text-[10px] font-mono text-sky-400 bg-sky-500/5 px-2 py-0.5 border border-sky-500/10 rounded">
                                {blog.readTime}
                              </span>
                            </div>
                            <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-slate-900 mt-1 leading-tight">
                              {blog.title}
                            </h4>
                            <p className="text-slate-900 dark:text-slate-100 text-xs line-clamp-1">
                              {blog.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setFormMode("edit");
                              setEditingIndex(bIdx);
                              setBlogDraft({ ...blog });
                            }}
                            className="text-xs font-mono text-sky-450 bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-[#0f172a] px-3 py-2 rounded cursor-pointer"
                          >
                            Modify
                          </button>
                          <button
                            onClick={() => {
                              setConfirmDialog({
                                message: "Delete this blog post?",
                                action: async () => {
                                  const temp = [...siteData.blogs];
                                  temp.splice(bIdx, 1);
                                  handleSaveGlobalField("blogs", temp);
                                },
                              });
                            }}
                            className="text-red-400 hover:text-red-300 text-xs font-mono p-1"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-100 dark:bg-[#0f172a] border border-slate-300 dark:border-slate-700/60 p-6 rounded-xl text-left">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/60">
                      <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                        Compose/Edit Blog Post Content
                      </h3>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:text-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-wider text-slate-900 dark:text-slate-100">
                            Date Published
                          </label>
                          <input
                            type="text"
                            value={blogDraft.date}
                            onChange={(e) =>
                              setBlogDraft({
                                ...blogDraft,
                                date: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2 outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-wider text-slate-900 dark:text-slate-100">
                            Author Name
                          </label>
                          <input
                            type="text"
                            value={blogDraft.author}
                            onChange={(e) =>
                              setBlogDraft({
                                ...blogDraft,
                                author: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2 outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-wider text-slate-900 dark:text-slate-100">
                            Read Time duration
                          </label>
                          <input
                            type="text"
                            value={blogDraft.readTime}
                            onChange={(e) =>
                              setBlogDraft({
                                ...blogDraft,
                                readTime: e.target.value,
                              })
                            }
                            className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-sm rounded px-3 py-2 outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-slate-900 dark:text-slate-100">
                          Blog Header Title
                        </label>
                        <input
                          type="text"
                          value={blogDraft.title}
                          onChange={(e) =>
                            setBlogDraft({
                              ...blogDraft,
                              title: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2.5 outline-none font-medium"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-slate-900 dark:text-slate-100">
                          Introductory Summary Excerpt
                        </label>
                        <textarea
                          rows={2}
                          value={blogDraft.excerpt}
                          onChange={(e) =>
                            setBlogDraft({
                              ...blogDraft,
                              excerpt: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-xs rounded px-3 py-2 outline-none font-sans"
                        />
                      </div>

                      <ImageUploader
                        label="Main Poster Image URL Link"
                        value={blogDraft.imageUrl}
                        onChange={(url) =>
                          setBlogDraft({ ...blogDraft, imageUrl: url })
                        }
                      />

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-slate-900 dark:text-slate-100 font-bold">
                          Detailed Write-Up / Blog Body Content
                        </label>
                        <textarea
                          rows={8}
                          value={blogDraft.content}
                          onChange={(e) =>
                            setBlogDraft({
                              ...blogDraft,
                              content: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-900 text-xs rounded px-3 py-2 outline-none font-sans leading-relaxed"
                        />
                      </div>

                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex gap-2">
                        <button
                          onClick={() => {
                            let temp = [...siteData.blogs];
                            if (formMode === "create") {
                              temp.push(blogDraft);
                            } else {
                              temp[editingIndex] = blogDraft;
                            }
                            handleSaveGlobalField("blogs", temp);
                            setEditingIndex(null);
                          }}
                          className="bg-sky-650 hover:bg-sky-600 text-white font-mono text-xs px-5 py-2.5 rounded font-bold cursor-pointer"
                        >
                          Save Blog
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 font-mono text-xs px-4 py-2.5 rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: ACCREDITATIONS */}
            {activeTab === "accreditations" && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 uppercase tracking-wider">
                  Accreditations & Badges of Honor
                </h2>
                <p className="text-slate-900 dark:text-slate-100 text-xs mb-6">
                  Modify official registration tags shown in footer and security
                  blocks list.
                </p>

                {editingIndex === null ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {siteData.accreditations.map((accred: any, idx: number) => (
                      <div
                        key={accred.id}
                        className="bg-zinc-90 w-full border border-slate-200 dark:border-slate-800/60 p-4 rounded-xl flex flex-col justify-between text-left"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-sky-400 block mb-1 font-bold uppercase">
                            {accred.id}
                          </span>
                          <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-slate-100">
                            {accred.name}
                          </h4>
                          <p className="text-slate-900 dark:text-slate-100 text-xs mt-1 leading-normal">
                            {accred.detail}
                          </p>
                        </div>
                        <div className="pt-4 mt-3 border-t border-slate-200/80 dark:border-slate-800/60/80 flex gap-2 justify-end">
                          <button
                            onClick={() => {
                              setEditingIndex(idx);
                              setAccredDraft({ ...accred });
                            }}
                            className="text-[10px] font-mono text-sky-450 bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-[#0f172a] cursor-pointer flex items-center gap-0.5"
                          >
                            <Edit2 className="h-3 w-3" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              setConfirmDialog({
                                message: `Are you absolutely sure you want to delete accreditation "${accred.name}"?`,
                                action: async () => {
                                  const updated = [...siteData.accreditations];
                                  updated.splice(idx, 1);
                                  handleSaveGlobalField(
                                    "accreditations",
                                    updated,
                                  );
                                },
                              });
                            }}
                            className="text-[10px] font-mono text-red-500 hover:text-white hover:bg-red-500 bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 px-3 py-1 rounded cursor-pointer flex items-center gap-0.5 transition"
                          >
                            <Trash2 className="h-3 w-3" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/60 p-6 rounded-xl text-left">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/60">
                      <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                        Modify Accreditation Certification Details
                      </h3>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:text-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-slate-900 dark:text-slate-100">
                          Badge Title
                        </label>
                        <input
                          type="text"
                          value={accredDraft.name}
                          onChange={(e) =>
                            setAccredDraft({
                              ...accredDraft,
                              name: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-slate-900 dark:text-slate-100">
                          Badge Detail Sub-explanation
                        </label>
                        <input
                          type="text"
                          value={accredDraft.detail}
                          onChange={(e) =>
                            setAccredDraft({
                              ...accredDraft,
                              detail: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none"
                        />
                      </div>

                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex gap-2">
                        <button
                          onClick={() => {
                            const updated = [...siteData.accreditations];
                            updated[editingIndex] = accredDraft;
                            handleSaveGlobalField("accreditations", updated);
                            setEditingIndex(null);
                          }}
                          className="bg-sky-650 hover:bg-sky-600 text-white font-mono text-xs px-5 py-2.5 rounded font-bold cursor-pointer"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 font-mono text-xs px-4 py-2.5 rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: FOOTER */}
            {activeTab === "footer" && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 uppercase tracking-wider">
                  Footer Manager
                </h2>
                <p className="text-slate-900 dark:text-slate-100 text-xs mb-6">
                  Manage footer descriptions, links, and copyright text.
                </p>

                <div className="bg-slate-50 dark:bg-[#0f172a]/50 rounded-xl border border-slate-200 dark:border-slate-800/60 p-5 mt-4 flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                        Footer About Text
                      </label>
                      <textarea
                        defaultValue={siteData.footerAbout || ""}
                        onBlur={(e) =>
                          handleSaveGlobalField("footerAbout", e.target.value)
                        }
                        placeholder="Specialized high-altitude pilgrimage operators..."
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none w-full min-h-[100px]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                        Footer Address Text
                      </label>
                      <textarea
                        defaultValue={siteData.footerAddress || ""}
                        onBlur={(e) =>
                          handleSaveGlobalField("footerAddress", e.target.value)
                        }
                        placeholder="Near Kmou Station Pithoragarh uttarakhand 262501"
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none w-full min-h-[100px]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                      Copyright Text
                    </label>
                    <input
                      type="text"
                      defaultValue={siteData.copyrightText || ""}
                      onBlur={(e) =>
                        handleSaveGlobalField("copyrightText", e.target.value)
                      }
                      placeholder="e.g. 2026 Adi Kailash Tirath. All Rights Reserved."
                      className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none w-full"
                    />
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800/60 pt-5">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">
                      Important Links (Middle Column)
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[0, 1, 2, 3].map((idx) => {
                        const links = siteData.footerImportantLinks || [
                          { label: "Contact Us", url: "contact_us" },
                          { label: "Privacy Policy", url: "privacy_policy" },
                          { label: "Feedback", url: "feedback" },
                        ];
                        const link = links[idx] || { label: "", url: "" };
                        return (
                          <div key={idx} className="flex gap-3">
                            <input
                              type="text"
                              defaultValue={link.label}
                              placeholder={`Link ${idx + 1} Label`}
                              onBlur={(e) => {
                                const newLinks = [...links];
                                if (!newLinks[idx])
                                  newLinks[idx] = { label: "", url: "" };
                                newLinks[idx].label = e.target.value;
                                handleSaveGlobalField(
                                  "footerImportantLinks",
                                  newLinks,
                                );
                              }}
                              className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none w-1/2"
                            />
                            <input
                              type="text"
                              defaultValue={link.url}
                              placeholder={`Link ${idx + 1} URL or ID`}
                              onBlur={(e) => {
                                const newLinks = [...links];
                                if (!newLinks[idx])
                                  newLinks[idx] = { label: "", url: "" };
                                newLinks[idx].url = e.target.value;
                                handleSaveGlobalField(
                                  "footerImportantLinks",
                                  newLinks,
                                );
                              }}
                              className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none w-1/2"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800/60 pt-5">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">
                      Bottom Links (Next to Copyright)
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[0, 1].map((idx) => {
                        const links = siteData.footerBottomLinks || [
                          {
                            label: "Terms of Pilgrimage",
                            url: "privacy_policy",
                          },
                          {
                            label: "High-Altitude Health Policy",
                            url: "privacy_policy",
                          },
                        ];
                        const link = links[idx] || { label: "", url: "" };
                        return (
                          <div key={idx} className="flex gap-3">
                            <input
                              type="text"
                              defaultValue={link.label}
                              placeholder={`Bottom Link ${idx + 1} Label`}
                              onBlur={(e) => {
                                const newLinks = [...links];
                                if (!newLinks[idx])
                                  newLinks[idx] = { label: "", url: "" };
                                newLinks[idx].label = e.target.value;
                                handleSaveGlobalField(
                                  "footerBottomLinks",
                                  newLinks,
                                );
                              }}
                              className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none w-1/2"
                            />
                            <input
                              type="text"
                              defaultValue={link.url}
                              placeholder={`URL or Section ID`}
                              onBlur={(e) => {
                                const newLinks = [...links];
                                if (!newLinks[idx])
                                  newLinks[idx] = { label: "", url: "" };
                                newLinks[idx].url = e.target.value;
                                handleSaveGlobalField(
                                  "footerBottomLinks",
                                  newLinks,
                                );
                              }}
                              className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none w-1/2"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CONTACT */}
            {activeTab === "contact" && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 uppercase tracking-wider">
                  Contact Form Config
                </h2>
                <p className="text-slate-900 dark:text-slate-100 text-xs mb-6">
                  Manage the contact us page descriptions, direct contact info,
                  and dynamic form fields.
                </p>

                <div className="bg-slate-50 dark:bg-[#0f172a]/50 rounded-xl border border-slate-200 dark:border-slate-800/60 p-5 mt-4 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                      Contact Us Page Description
                    </label>
                    <textarea
                      defaultValue={siteData.contactPageDesc || ""}
                      onBlur={(e) =>
                        handleSaveGlobalField("contactPageDesc", e.target.value)
                      }
                      placeholder="Reach out to us for spiritual queries..."
                      className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none w-full min-h-[60px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-slate-200 dark:border-slate-800/60">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                        Primary Phone
                      </label>
                      <input
                        type="text"
                        defaultValue={siteData.phones?.[0] || ""}
                        onBlur={(e) => {
                          const ph = siteData.phones
                            ? [...siteData.phones]
                            : [];
                          ph[0] = e.target.value;
                          handleSaveGlobalField("phones", ph);
                        }}
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                        Secondary Phone
                      </label>
                      <input
                        type="text"
                        defaultValue={siteData.phones?.[1] || ""}
                        onBlur={(e) => {
                          const ph = siteData.phones
                            ? [...siteData.phones]
                            : [""];
                          ph[1] = e.target.value;
                          handleSaveGlobalField("phones", ph);
                        }}
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={siteData.email || ""}
                        onBlur={(e) =>
                          handleSaveGlobalField("email", e.target.value)
                        }
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                        Head Office Address
                      </label>
                      <textarea
                        defaultValue={siteData.headOffice || ""}
                        onBlur={(e) =>
                          handleSaveGlobalField("headOffice", e.target.value)
                        }
                        className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 w-full min-h-[60px]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Dynamic Form Fields
                      </h3>
                      <button
                        onClick={() => {
                          const currentFields = siteData.contactFormFields || [
                            {
                              label: "YOUR NAME",
                              type: "text",
                              required: true,
                            },
                            {
                              label: "EMAIL ADDRESS",
                              type: "email",
                              required: true,
                            },
                            {
                              label: "MESSAGE",
                              type: "textarea",
                              required: true,
                            },
                          ];
                          handleSaveGlobalField("contactFormFields", [
                            ...currentFields,
                            {
                              label: "NEW FIELD",
                              type: "text",
                              required: false,
                            },
                          ]);
                        }}
                        className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded text-xs font-mono font-bold uppercase transition"
                      >
                        + Add Field
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      {(
                        siteData.contactFormFields || [
                          { label: "YOUR NAME", type: "text", required: true },
                          {
                            label: "EMAIL ADDRESS",
                            type: "email",
                            required: true,
                          },
                          {
                            label: "MESSAGE",
                            type: "textarea",
                            required: true,
                          },
                        ]
                      ).map((field: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex flex-col md:flex-row gap-3 bg-white dark:bg-[#0b1120] p-3 rounded border border-slate-200 dark:border-slate-800/60"
                        >
                          <input
                            type="text"
                            defaultValue={field.label}
                            placeholder="Field Label"
                            onBlur={(e) => {
                              const newFields = [
                                ...(siteData.contactFormFields || []),
                              ];
                              if (newFields[idx]) {
                                newFields[idx].label = e.target.value;
                                handleSaveGlobalField(
                                  "contactFormFields",
                                  newFields,
                                );
                              }
                            }}
                            className="flex-1 bg-transparent border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-2 py-1.5"
                          />
                          <select
                            defaultValue={field.type}
                            onChange={(e) => {
                              const newFields = [
                                ...(siteData.contactFormFields || []),
                              ];
                              if (newFields[idx]) {
                                newFields[idx].type = e.target.value;
                                handleSaveGlobalField(
                                  "contactFormFields",
                                  newFields,
                                );
                              }
                            }}
                            className="bg-transparent border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-2 py-1.5"
                          >
                            <option value="text">Text Input</option>
                            <option value="email">Email Input</option>
                            <option value="number">Number Input</option>
                            <option value="textarea">Textarea (Long)</option>
                          </select>
                          <label className="flex items-center gap-1.5 text-xs text-slate-900 dark:text-slate-100 whitespace-nowrap cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={field.required}
                              onChange={(e) => {
                                const newFields = [
                                  ...(siteData.contactFormFields || []),
                                ];
                                if (newFields[idx]) {
                                  newFields[idx].required = e.target.checked;
                                  handleSaveGlobalField(
                                    "contactFormFields",
                                    newFields,
                                  );
                                }
                              }}
                              className="accent-sky-500 rounded"
                            />{" "}
                            Required
                          </label>
                          <button
                            onClick={() => {
                              const newFields = [
                                ...(siteData.contactFormFields || []),
                              ];
                              newFields.splice(idx, 1);
                              handleSaveGlobalField(
                                "contactFormFields",
                                newFields,
                              );
                            }}
                            className="text-red-500 hover:text-red-600 p-1"
                            title="Remove Field"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: TYPOGRAPHY */}
            {activeTab === "typography" && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 uppercase tracking-wider">
                  Fonts & Typography Settings
                </h2>
                <p className="text-slate-900 dark:text-slate-100 text-xs mb-6">
                  Assign distinct Google Fonts to different sections and pages
                  globally.
                </p>

                <div className="bg-slate-50 dark:bg-[#0f172a]/50 rounded-xl border border-slate-200 dark:border-slate-800/60 p-5 mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                      Global Headings Font (Primary)
                    </label>
                    <input
                      type="text"
                      defaultValue={siteData.font_headings || "Geist"}
                      onBlur={(e) =>
                        handleSaveGlobalField("font_headings", e.target.value)
                      }
                      placeholder="e.g. Inter, Playfair Display, Space Grotesk"
                      className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                      Global Body Text Font
                    </label>
                    <input
                      type="text"
                      defaultValue={siteData.font_body || "Inter"}
                      onBlur={(e) =>
                        handleSaveGlobalField("font_body", e.target.value)
                      }
                      placeholder="e.g. Inter, Roboto, Arial"
                      className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-900 dark:text-slate-100">
                      Accent / Meta Tags Font
                    </label>
                    <input
                      type="text"
                      defaultValue={siteData.font_accent || "JetBrains Mono"}
                      onBlur={(e) =>
                        handleSaveGlobalField("font_accent", e.target.value)
                      }
                      placeholder="e.g. JetBrains Mono, Fira Code"
                      className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/60 text-slate-900 dark:text-slate-100 text-sm rounded px-3 py-2 focus:border-sky-500/50 outline-none w-full"
                    />
                  </div>
                </div>

                <div className="mt-4 p-4 border border-sky-500/30 bg-sky-500/5 rounded text-sm text-sky-600 dark:text-sky-400">
                  <strong>Note:</strong> Changes to typography require a full
                  page reload to inject the relevant font families dynamically
                  from Google Fonts. Simply type the exact font family name as
                  seen on fonts.google.com.
                </div>
              </div>
            )}
          </div>
        )}

        {confirmDialog && (
          <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0b1120] p-6 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-2xl max-w-sm w-full text-center">
              <div className="text-sky-500 mb-4 flex justify-center">
                <ShieldAlert className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                Confirm Action
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                {confirmDialog.message}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setConfirmDialog(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800/60 rounded font-mono text-xs hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-900 dark:text-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    confirmDialog.action();
                    setConfirmDialog(null);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-mono text-xs font-bold cursor-pointer"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
