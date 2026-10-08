import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modals, { type ModalType } from "../components/modals/Modals";

interface ContactOption {
  title: string;
  description: string;
  action: string;
  icon: string;
  accent: "lilac" | "amber" | "emerald";
}

const CONTACT_OPTIONS: ContactOption[] = [
  {
    title: "WhatsApp Us",
    description: "Fastest response — usually under 10 minutes.",
    action: "Chat on WhatsApp",
    icon: "💬",
    accent: "emerald",
  },
  {
    title: "Call the Studio",
    description: "Speak with the team directly, Mon–Sat, 9am–6pm.",
    action: "+256 772 123 456",
    icon: "📞",
    accent: "lilac",
  },
  {
    title: "Email Support",
    description: "Best for non-urgent enquiries and documentation.",
    action: "support@ssebbalestitches.com",
    icon: "✉️",
    accent: "amber",
  },
];

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: "How do I track an order in progress?",
    answer:
      "Head to the Orders page in your sidebar. Each order shows its current stage — Pending, In Progress, Ready for Fitting, Ready for Pickup, or Completed — so you can always see exactly where things stand.",
  },
  {
    question: "Can I reschedule a fitting?",
    answer:
      "Yes. Go to the Bookings page, find the fitting you want to change, and let us know via WhatsApp or a quick call. We'll move it to a slot that works for you — no penalties for rescheduling with at least 24 hours' notice.",
  },
  {
    question: "How does suit hire work?",
    answer:
      "Pick a suit from the Suit Hire page, confirm your preferred dates, and pay the rental fee up front. The suit must be returned clean on the agreed date. Late returns incur a daily fee, and damages are charged separately.",
  },
  {
    question: "What's your return and refund policy?",
    answer:
      "Ready-to-wear items can be returned within 7 days in original condition. Custom-made pieces are non-refundable once production begins, but we offer free minor alterations within 14 days of delivery.",
  },
  {
    question: "Can I get a receipt for my order?",
    answer:
      "Absolutely. Every completed order generates an automatic e-receipt sent to your registered email. You can also download receipts from the Orders page by clicking the order and choosing 'Download Receipt'.",
  },
];

const RESOURCES = [
  { name: "Measurement Guide", meta: "PDF · 1.2MB", icon: "📏" },
  { name: "Fabric Catalogue 2026", meta: "PDF · 3.4MB", icon: "🧵" },
  { name: "Care Instructions", meta: "PDF · 480KB", icon: "🧺" },
  { name: "Pricing & Rates", meta: "PDF · 640KB", icon: "💵" },
];

const accentBg: Record<ContactOption["accent"], string> = {
  lilac: "bg-lilac/15 text-lilac-deep",
  amber: "bg-amber-100 text-amber-700",
  emerald: "bg-emerald-50 text-emerald-700",
};

export default function SupportPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

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
                  Support
                </p>
                <h1 className="font-display font-semibold text-xl">
                  How can we help?
                </h1>
                <p className="text-xs text-ink/50 mt-1">
                  Reach the Ssebbale Stitches team, browse common questions, or grab a resource.
                </p>
              </div>

              {/* CONTACT OPTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {CONTACT_OPTIONS.map((option) => (
                  <div
                    key={option.title}
                    className="rounded-2xl bg-white border border-ink/8 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_-8px_rgba(106,86,176,0.25)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-base mb-3 ${accentBg[option.accent]}`}
                    >
                      {option.icon}
                    </div>
                    <p className="font-display font-semibold text-sm mb-1">
                      {option.title}
                    </p>
                    <p className="text-[11px] text-ink/50 leading-relaxed mb-3">
                      {option.description}
                    </p>
                    <button className="text-xs font-medium text-lilac-deep hover:underline">
                      {option.action} →
                    </button>
                  </div>
                ))}
              </div>

              {/* FAQ ACCORDION */}
              <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-ink/8">
                  <h2 className="font-display font-semibold text-base">
                    Frequently asked questions
                  </h2>
                  <span className="text-[11px] text-ink/40">
                    {FAQS.length} topics
                  </span>
                </div>

                <div className="divide-y divide-ink/5">
                  {FAQS.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div key={faq.question}>
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-ink/[0.015] transition-colors"
                        >
                          <span className="text-sm font-medium text-ink">
                            {faq.question}
                          </span>
                          <svg
                            viewBox="0 0 24 24"
                            className={`w-4 h-4 shrink-0 text-ink/40 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            stroke="currentColor"
                            fill="none"
                          >
                            <path
                              d="M6 9l6 6 6-6"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 -mt-1">
                            <p className="text-xs text-ink/55 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STILL NEED HELP */}
              <div className="rounded-2xl bg-gradient-to-br from-lilac-deep to-ink p-6 text-paper relative overflow-hidden">
                <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-paper/60 mb-2 relative">
                  Still need help?
                </p>
                <h3 className="font-display font-semibold text-lg mb-1 relative">
                  We're one message away.
                </h3>
                <p className="text-xs text-paper/70 mb-4 relative leading-relaxed max-w-md">
                  Our team typically responds within 10 minutes during working hours. Reach out and we'll get you sorted.
                </p>
                <div className="flex items-center gap-2 relative">
                  <button className="rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 px-3.5 py-2 text-xs font-medium transition-colors duration-200">
                    Start a chat
                  </button>
                  <button className="rounded-lg bg-white text-lilac-deep hover:bg-paper px-3.5 py-2 text-xs font-medium transition-colors duration-200">
                    Call now
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT RAIL */}
            <div className="space-y-5">
              {/* QUICK RESOURCES */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Quick resources
                </p>
                <div className="space-y-2.5">
                  {RESOURCES.map((r) => (
                    <div
                      key={r.name}
                      className="flex items-center justify-between rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-base shrink-0">{r.icon}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium truncate">
                            {r.name}
                          </p>
                          <p className="text-[10px] text-ink/40">{r.meta}</p>
                        </div>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-ink/35 shrink-0"
                        stroke="currentColor"
                        fill="none"
                      >
                        <path
                          d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* STUDIO HOURS */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Studio hours
                </p>
                <div className="space-y-2.5 text-xs">
                  {[
                    { day: "Mon – Fri", hours: "9:00 AM – 6:00 PM" },
                    { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((row) => (
                    <div
                      key={row.day}
                      className="flex items-center justify-between"
                    >
                      <span className="text-ink/50">{row.day}</span>
                      <span className="font-medium">{row.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-ink/8 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-ink/50">
                    Open now — replies within 10 min
                  </span>
                </div>
              </div>

              {/* CONTACT SUMMARY */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Contact
                </p>
                <div className="space-y-3 text-xs">
                  <div>
                    <p className="text-ink/40 mb-0.5">Phone</p>
                    <p className="font-medium">+256 772 123 456</p>
                  </div>
                  <div>
                    <p className="text-ink/40 mb-0.5">Email</p>
                    <p className="font-medium">support@ssebbalestitches.com</p>
                  </div>
                  <div>
                    <p className="text-ink/40 mb-0.5">Studio</p>
                    <p className="font-medium">Kampala, Uganda</p>
                  </div>
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