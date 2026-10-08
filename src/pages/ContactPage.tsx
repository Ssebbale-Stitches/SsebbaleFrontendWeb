import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modals, { type ModalType } from "../components/modals/Modals";

const TOPICS = [
  "General enquiry",
  "Order support",
  "Suit hire",
  "Custom design",
  "Partnership",
  "Feedback",
];

const SOCIALS = [
  { name: "Instagram", handle: "@ssebbalestitches", icon: "📷" },
  { name: "WhatsApp", handle: "+256 772 123 456", icon: "💬" },
  { name: "Facebook", handle: "/ssebbalestitches", icon: "📘" },
  { name: "TikTok", handle: "@ssebbalestitches", icon: "🎵" },
];

const STUDIOS = [
  {
    city: "Kampala HQ",
    address: "Plot 24, Kampala Road, Kampala, Uganda",
    phone: "+256 772 123 456",
    hours: "Mon – Sat · 9:00 AM – 6:00 PM",
    primary: true,
  },
  {
    city: "Entebbe Workshop",
    address: "12 Berkeley Road, Entebbe, Uganda",
    phone: "+256 772 987 654",
    hours: "Mon – Fri · 10:00 AM – 5:00 PM",
    primary: false,
  },
];

export default function ContactPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: TOPICS[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to API
    console.log("Form submitted:", form);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", topic: TOPICS[0], message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full bg-[#f3f1fa] flex relative">
      {/* AMBIENT GRADIENT BLOBS */}
      <div className="pointer-events-none fixed -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-lilac-deep/25 blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-48 -right-32 w-[36rem] h-[36rem] rounded-full bg-lilac/30 blur-[130px]" />
      <div className="pointer-events-none fixed top-1/3 right-10 w-64 h-64 rounded-full bg-amber-200/20 blur-[100px]" />

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-ink/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={() => setActiveModal("confirm-logout")}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0 flex flex-col relative z-10 h-screen overflow-hidden">
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto px-5 md:px-8 pb-8">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            {/* LEFT / CENTER COLUMN */}
            <div className="space-y-6 min-w-0">
              <div>
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-lilac-deep mb-1">
                  Contact
                </p>
                <h1 className="font-display font-semibold text-xl">
                  Let's talk.
                </h1>
                <p className="text-xs text-ink/50 mt-1">
                  Send us a message, visit a studio, or drop a line on socials —
                  we usually respond within a few hours.
                </p>
              </div>

              {/* CONTACT FORM */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 md:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display font-semibold text-base">
                    Send a message
                  </h2>
                  <span className="text-[11px] text-ink/40">
                    Avg. reply: 2 hours
                  </span>
                </div>

                {submitted ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-5 text-center">
                    <p className="font-display font-semibold text-sm text-emerald-700 mb-1">
                      Message sent ✓
                    </p>
                    <p className="text-xs text-emerald-700/70">
                      We'll get back to you at {form.email || "your email"} shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-medium text-ink/55 mb-1.5">
                          Full name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Grace Nakato"
                          className="w-full rounded-lg bg-ink/[0.03] border border-ink/8 px-3 py-2.5 text-sm outline-none focus:border-lilac-deep focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-ink/55 mb-1.5">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="w-full rounded-lg bg-ink/[0.03] border border-ink/8 px-3 py-2.5 text-sm outline-none focus:border-lilac-deep focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-ink/55 mb-1.5">
                        Topic
                      </label>
                      <select
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-ink/[0.03] border border-ink/8 px-3 py-2.5 text-sm outline-none focus:border-lilac-deep focus:bg-white transition-colors"
                      >
                        {TOPICS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-ink/55 mb-1.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className="w-full rounded-lg bg-ink/[0.03] border border-ink/8 px-3 py-2.5 text-sm outline-none focus:border-lilac-deep focus:bg-white transition-colors resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <p className="text-[11px] text-ink/40">
                        We'll never share your details.
                      </p>
                      <button
                        type="submit"
                        className="rounded-lg bg-lilac-deep text-paper px-4 py-2 text-xs font-medium hover:opacity-90 transition-opacity"
                      >
                        Send message
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* STUDIO LOCATIONS */}
              <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="px-5 py-4 border-b border-ink/8 flex items-center justify-between">
                  <h2 className="font-display font-semibold text-base">
                    Visit a studio
                  </h2>
                  <button className="text-xs text-lilac-deep font-medium hover:underline">
                    Get directions
                  </button>
                </div>

                <div className="divide-y divide-ink/5">
                  {STUDIOS.map((s) => (
                    <div
                      key={s.city}
                      className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-ink/[0.015] transition-colors"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                            s.primary
                              ? "bg-lilac/15 text-lilac-deep"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          📍
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-display font-semibold text-sm">
                              {s.city}
                            </p>
                            {s.primary && (
                              <span className="inline-flex items-center rounded-full bg-lilac-deep/10 text-lilac-deep text-[10px] font-medium px-2 py-0.5">
                                Main
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-ink/50 mt-0.5">
                            {s.address}
                          </p>
                          <p className="text-[11px] text-ink/40 mt-0.5">
                            {s.phone} · {s.hours}
                          </p>
                        </div>
                      </div>
                      <button className="text-xs font-medium text-lilac-deep hover:underline self-start sm:self-auto shrink-0">
                        Open in Maps →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT RAIL */}
            <div className="space-y-5">
              {/* QUICK CONTACT */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Quick contact
                </p>
                <div className="space-y-3">
                  <a className="flex items-center justify-between rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-base">💬</span>
                      <span className="text-xs font-medium">WhatsApp</span>
                    </div>
                    <span className="text-[10px] text-ink/40">Fastest</span>
                  </a>
                  <a className="flex items-center justify-between rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-base">📞</span>
                      <span className="text-xs font-medium">Call us</span>
                    </div>
                    <span className="text-[10px] text-ink/40">9–6pm</span>
                  </a>
                  <a className="flex items-center justify-between rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-base">✉️</span>
                      <span className="text-xs font-medium">Email</span>
                    </div>
                    <span className="text-[10px] text-ink/40">24h</span>
                  </a>
                </div>
              </div>

              {/* SOCIALS */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Follow us
                </p>
                <div className="space-y-2.5">
                  {SOCIALS.map((s) => (
                    <button
                      key={s.name}
                      className="w-full flex items-center justify-between rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-base shrink-0">{s.icon}</span>
                        <div className="min-w-0 text-left">
                          <p className="text-xs font-medium truncate">
                            {s.name}
                          </p>
                          <p className="text-[10px] text-ink/40 truncate">
                            {s.handle}
                          </p>
                        </div>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5 text-ink/35 shrink-0"
                        stroke="currentColor"
                        fill="none"
                      >
                        <path
                          d="M9 6l6 6-6 6"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* MAP PLACEHOLDER */}
              <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="relative h-48 bg-gradient-to-br from-lilac/30 via-paper to-amber-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-lilac-deep text-paper flex items-center justify-center mx-auto mb-2 shadow-[0_8px_20px_-4px_rgba(106,86,176,0.5)]">
                        📍
                      </div>
                      <p className="font-display font-semibold text-xs text-ink">
                        Ssebbale Stitches HQ
                      </p>
                      <p className="text-[10px] text-ink/50">
                        Kampala Road, Uganda
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <p className="text-[11px] text-ink/50">
                    Interactive map coming soon
                  </p>
                  <button className="text-xs font-medium text-lilac-deep hover:underline">
                    Open Maps →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <Modals activeModal={activeModal} closeModal={closeModal} />
    </div>
  );
}