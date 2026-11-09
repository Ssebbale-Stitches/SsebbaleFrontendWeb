import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import logo from "../assets/images/Business-logo.jpeg";
import heroImg from "../assets/images/Hero.jpeg";
import mensImg from "../assets/images/Men.png";
import womensImg from "../assets/images/Women.png";
import childrensImg from "../assets/images/Children.png";
import suitImg from "../assets/images/Suit.png";

const SUIT_IMG = suitImg;

function useReveal<T extends HTMLElement>(startVisible = false) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(startVisible);

  useEffect(() => {
    if (startVisible) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startVisible]);

  return { ref, visible };
}

const CATEGORIES = [
  {
    name: "Men's Wear",
    items: "Suits · Shirts · Traditional Wear",
    count: "24",
    image: mensImg,
  },
  {
    name: "Women's Wear",
    items: "Dresses · Blazers · Corsets",
    count: "31",
    image: womensImg,
  },
  {
    name: "Children's Wear",
    items: "Occasion Outfits · Casual Wear",
    count: "12",
    image: childrensImg,
  },
];

const SERVICES = [
  {
    title: "Consultation",
    copy: "Bring your ideas, fabric and measurements to the table before anything is cut.",
    icon: (
      <path
        d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.2-3.6A7.96 7.96 0 0 1 4 12Z"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "Custom Tailoring",
    copy: "Upload inspiration, choose a category, and we draft the pattern around you.",
    icon: (
      <>
        <circle cx="6" cy="6" r="2.2" strokeWidth="1.6" fill="none" />
        <circle cx="6" cy="18" r="2.2" strokeWidth="1.6" fill="none" />
        <path d="M8 7.5 19 18M8 16.5 19 6" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    title: "Suit Hiring",
    copy: "Browse available suits by size and reserve them for your dates.",
    icon: (
      <path
        d="M12 5.5a1.8 1.8 0 1 1 1.8 1.8H12M3 10l9-4.5 9 4.5-8 3.2v6.3M4 20h16"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "Booking",
    copy: "Schedule measurements, fittings, and pickup in one calendar.",
    icon: (
      <>
        <rect x="4" y="5.5" width="16" height="14" rx="2" strokeWidth="1.6" fill="none" />
        <path d="M4 9.5h16M8 3.5v3M16 3.5v3" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
];

const JOURNEY = [
  {
    label: "Pending",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" strokeWidth="1.6" fill="none" />
        <path d="M12 7.5V12l3 2" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    label: "Confirmed",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" strokeWidth="1.6" fill="none" />
        <path d="M8.5 12.2l2.4 2.4 4.6-5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    ),
  },
  {
    label: "In Progress",
    icon: (
      <>
        <circle cx="6" cy="6" r="2" strokeWidth="1.6" fill="none" />
        <circle cx="6" cy="18" r="2" strokeWidth="1.6" fill="none" />
        <path d="M7.6 7.4 17 17M7.6 16.6 17 7" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    label: "Ready for Fitting",
    icon: (
      <path
        d="M4 16 16 4l4 4-12 12H4v-4Z"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    label: "Ready for Pickup",
    icon: (
      <>
        <path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
        <path d="M4 8.5V16l8 4.5 8-4.5V8.5M12 13v7.5" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    label: "Completed",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" strokeWidth="1.6" fill="none" />
        <path d="M8 12.3l2.7 2.7L16.3 9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    ),
  },
];

const STATS = [
  { label: "Active orders", value: "18" },
  { label: "Consultations booked", value: "42" },
  { label: "Suits on hire", value: "9" },
];

const HERO_FEATURES = [
  {
    title: "Custom Tailoring",
    copy: "Your inspiration, drafted around you",
    icon: (
      <>
        <circle cx="6" cy="6" r="2.2" strokeWidth="1.5" fill="none" />
        <circle cx="6" cy="18" r="2.2" strokeWidth="1.5" fill="none" />
        <path d="M8 7.5 19 18M8 16.5 19 6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    title: "Perfect Fit",
    copy: "Measured and fitted in person",
    icon: (
      <path
        d="M4 16 16 4l4 4-12 12H4v-4ZM13 7l4 4M8 12l2 2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "Suit Hiring",
    copy: "Reserve by size and date",
    icon: (
      <path
        d="M12 5.5a1.8 1.8 0 1 1 1.8 1.8H12M3 10l9-4.5 9 4.5-8 3.2v6.3M4 20h16"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
];

const HERO_STATS = [
  { value: "120+", label: "Garments tailored this year" },
  { value: "67", label: "Pieces across 3 collections" },
  { value: "6", label: "Stage order tracking" },
  { value: "Kampala", label: "Workshop based" },
];

const FAQS = [
  {
    q: "How does custom tailoring work?",
    a: "Bring your inspiration, choose a category and book a consultation. We take your measurements, draft the pattern around you and invite you back for fittings before the final piece is ready for pickup.",
  },
  {
    q: "Can I hire a suit instead of buying one?",
    a: "Yes. Browse the suits available by size, then reserve the one you like for your dates. Tell us the occasion and we will help you pick the right fit.",
  },
  {
    q: "How do I book a consultation or a fitting?",
    a: "Use any Book a Consultation button on this page, send us a message on the contact page, or chat with us on WhatsApp. Measurements, fittings and pickup are all scheduled in one calendar.",
  },
  {
    q: "Can I follow the progress of my order?",
    a: "Every order moves through six clear stages: Pending, Confirmed, In Progress, Ready for Fitting, Ready for Pickup and Completed, so you always know where your outfit is.",
  },
  {
    q: "Do you make clothes for women and children too?",
    a: "Yes. We have three collections: men's wear (suits, shirts and traditional wear), women's wear (dresses, blazers and corsets) and children's wear (occasion outfits and casual wear).",
  },
  {
    q: "Where can I find you?",
    a: "Our workshop is at California Plaza, Luwum Street, 2F 27 in Kampala. You can also reach us on WhatsApp at +256 776 419829 or by email at ssebbaleisaac4@gmail.com.",
  },
];

const btnPrimary =
  "inline-block px-6 py-3 rounded bg-lilac-deep text-paper text-sm font-medium transition-transform hover:-translate-y-0.5 hover:bg-ink";
const eyebrow = "font-mono uppercase tracking-[0.14em] text-xs text-lilac-deep mb-3.5";
const eyebrowDark = "font-mono uppercase tracking-[0.14em] text-xs text-lilac-light mb-3.5";
const h2Base = "font-display font-semibold text-[clamp(1.7rem,3vw,2.3rem)] leading-[1.1] max-w-[20ch]";
// Route that renders the HomeContact page. Change this one value if your router uses a different path.
const CONTACT_PATH = "/contact";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ssebbale_stitches?igsh=NWEyaHdxeHdya3N0",
    path: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" strokeWidth="1.6" fill="none" />
        <circle cx="12" cy="12" r="4" strokeWidth="1.6" fill="none" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/256776419829",
    path: (
      <path
        d="M7 17.5 4.5 20l1-3.7A8 8 0 1 1 12 20a8 8 0 0 1-5-1.7Z M9 9c0 3 2.5 5.5 5.5 5.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ssebbale_stitches",
    path: (
      <path
        d="M14 3.5c.4 2 1.8 3.4 3.8 3.6v2.6c-1.4 0-2.7-.4-3.8-1.2v6.3a4.9 4.9 0 1 1-4.9-4.9c.3 0 .6 0 .9.07v2.6a2.3 2.3 0 1 0 1.6 2.2V3.5H14Z"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    label: "X",
    href: "https://x.com/ssebbaleisaac?s=11",
    path: (
      <path
        d="M5 4.5 18.5 19.5M18.5 4.5 5 19.5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ),
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [newsEmail, setNewsEmail] = useState("");
  const [newsStatus, setNewsStatus] = useState<"idle" | "invalid" | "sent">("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setHeroReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const categories = useReveal<HTMLDivElement>();
  const services = useReveal<HTMLDivElement>();
  const journey = useReveal<HTMLDivElement>();
  const admin = useReveal<HTMLDivElement>();
  const faq = useReveal<HTMLDivElement>();
  const cta = useReveal<HTMLDivElement>();

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const email = newsEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsStatus("invalid");
      return;
    }
    // No backend yet: open the visitor's email app with a pre-filled request.
    const subject = encodeURIComponent("Please add me to Ssebbale Stitches updates");
    const body = encodeURIComponent(`Hello, please add ${email} to your updates list.`);
    window.location.href = `mailto:ssebbaleisaac4@gmail.com?subject=${subject}&body=${body}`;
    setNewsEmail("");
    setNewsStatus("sent");
  };

  const heroIn = (delay: number) => ({
    className: `transition-all duration-700 ease-out ${
      heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  const renderServiceCard = (index: number, side: "left" | "right") => {
    const s = SERVICES[index];
    const isLeft = side === "left";
    return (
      <div
        key={s.title}
        className={`group relative rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 p-5 transition-all duration-700 ease-out hover:bg-white/[0.1] hover:border-lilac-light/50 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(138,111,209,0.4)] ${
          services.visible
            ? "opacity-100 translate-x-0"
            : `opacity-0 ${isLeft ? "-translate-x-6" : "translate-x-6"}`
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Connector to the suit (desktop only) */}
        <span
          aria-hidden="true"
          className={`hidden lg:block absolute top-1/2 h-px w-10 ${
            isLeft
              ? "left-full bg-gradient-to-r from-lilac-light/70 to-transparent"
              : "right-full bg-gradient-to-l from-lilac-light/70 to-transparent"
          }`}
        />
        <span
          aria-hidden="true"
          className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-lilac-light shadow-[0_0_10px_#b8a8e8] ${
            isLeft ? "left-full -ml-0.5" : "right-full -mr-0.5"
          }`}
        />

        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-lilac to-lilac-deep flex items-center justify-center mb-4 shadow-lg shadow-lilac-deep/40 transition-transform duration-500 group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" stroke="currentColor">
            {s.icon}
          </svg>
        </div>

        <h3 className="font-display text-base mb-1.5 text-paper">{s.title}</h3>
        <p className="text-sm text-paper/60 leading-relaxed">{s.copy}</p>
      </div>
    );
  };

  return (
    <div className="bg-paper text-ink font-sans">

      {/* NAV */}
      <header
        className={`sticky top-0 z-50 flex items-center justify-between px-[6vw] transition-all duration-500 ease-out ${
          scrolled
            ? "py-3 bg-white/40 backdrop-blur-2xl border-b border-white/50 shadow-[0_8px_30px_-15px_rgba(106,86,176,0.25)]"
            : "py-5 bg-white/10 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <a className="group flex items-center no-underline" href="/">
          <img
            src={logo}
            alt="Ssebbale Stitches"
            className="h-14 w-auto rounded-full object-cover ring-2 ring-white/60 shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:ring-lilac/60"
          />
        </a>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 absolute md:static top-full right-[6vw] md:right-auto mt-2 md:mt-0 bg-white/60 md:bg-transparent backdrop-blur-2xl md:backdrop-blur-none p-5 md:p-0 rounded-2xl md:rounded-none border border-white/50 md:border-none shadow-xl md:shadow-none`}
        >
          {[
            { label: "Collections", href: "#collections" },
            { label: "Services", href: "#services" },
            { label: "How it works", href: "#journey" },
            { label: "FAQs", href: "#faq" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-ink no-underline text-sm group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-lilac-deep transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}

          <a
            className="text-sm text-paper no-underline rounded-full px-5 py-2 bg-lilac-deep shadow-md shadow-lilac-deep/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
            href={CONTACT_PATH}
          >
            Contact
          </a>
        </nav>

        <button
          className="flex md:hidden flex-col gap-1.5 bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`w-5.5 h-0.5 bg-ink transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
          <span className={`w-5.5 h-0.5 bg-ink transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
        </button>
      </header>

      {/* HERO */}
      <section className="relative isolate flex flex-col min-h-[calc(100svh-88px)] overflow-hidden bg-ink text-paper">
        {/* Background image */}
        <img
          src={heroImg}
          alt="Ssebbale Stitches tailoring"
          className={`absolute inset-0 -z-20 w-full h-full object-cover object-[65%_center] transition-transform duration-[1800ms] ease-out ${
            heroReady ? "scale-100" : "scale-110"
          }`}
        />
        {/* Overlays for legibility */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/10 md:via-ink/55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
        <div className="pointer-events-none absolute -top-24 -left-24 -z-10 w-96 h-96 rounded-full bg-lilac-deep/30 blur-[110px]" />

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-[6vw] pt-16 pb-14 md:pt-20">
          <div className="max-w-2xl">
            <div {...heroIn(0)}>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/25 px-4 py-1.5 mb-6 font-mono uppercase tracking-[0.14em] text-[11px] text-lilac-light">
                <span className="w-1.5 h-1.5 rounded-full bg-lilac-light animate-pulse" />
                Ssebbale Stitches · Kampala
              </p>
            </div>

            <div {...heroIn(120)}>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,6.2vw,5rem)] leading-[1.05] text-paper">
                Tailored to fit
                <br />
                <span className="italic font-normal bg-[linear-gradient(#b8a8e8,#b8a8e8)] bg-no-repeat bg-[length:100%_3px] bg-[position:0_92%]">
                  every story.
                </span>
              </h1>
            </div>

            <div {...heroIn(240)}>
              <p className="text-base md:text-lg leading-relaxed max-w-[48ch] mt-6 mb-8 text-paper/80">
                Browse collections, request custom pieces from your own inspiration, hire a suit, or book a
                consultation, all tracked from first sketch to final fitting.
              </p>
            </div>

            <div {...heroIn(360)}>
              <div className="flex gap-3.5 flex-wrap">
                <a
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded bg-lilac-deep text-paper text-sm font-medium shadow-lg shadow-lilac-deep/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-lilac-light hover:text-ink"
                  href={CONTACT_PATH}
                >
                  Book a Consultation
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path d="M4 12h15M13 6l6 6-6 6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  className="inline-block px-7 py-3.5 rounded border border-white/60 text-paper text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:border-white"
                  href="#collections"
                >
                  Browse Collections
                </a>
              </div>
            </div>

            {/* Feature strip */}
            <div {...heroIn(480)}>
              <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-0 sm:divide-x sm:divide-white/20 max-w-2xl">
                {HERO_FEATURES.map((f) => (
                  <li key={f.title} className="flex items-start gap-3 sm:px-5 first:sm:pl-0 last:sm:pr-0">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0 mt-0.5 text-lilac-light" stroke="currentColor">
                      {f.icon}
                    </svg>
                    <div>
                      <p className="font-mono uppercase tracking-[0.1em] text-[11px] text-paper">{f.title}</p>
                      <p className="text-xs text-paper/60 leading-relaxed mt-1">{f.copy}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className={`relative border-t border-white/10 bg-ink/75 backdrop-blur-xl transition-all duration-700 ease-out ${
            heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="px-[6vw] grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/10">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center py-5 px-3">
                <span className="font-display text-2xl md:text-3xl text-lilac-light">{s.value}</span>
                <span className="font-mono uppercase tracking-[0.1em] text-[10px] text-paper/55 mt-1.5">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="collections" className="px-[6vw] py-[70px]" ref={categories.ref}>
        <p className={eyebrow}>Collections</p>
        <h2 className={`${h2Base} mb-10`}>
          Three wardrobes, one workshop.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.name}
              className={`group relative rounded-3xl overflow-hidden aspect-[4/5] transition-all duration-700 ease-out hover:-translate-y-2 ${
                categories.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/0 to-ink/0 group-hover:from-ink/60 transition-all duration-500" />

              <span className="absolute top-4 right-4 rounded-full bg-white/30 backdrop-blur-md border border-white/50 px-3 py-1 font-mono text-[11px] text-white shadow-sm">
                {cat.count} pieces
              </span>

              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/25 backdrop-blur-xl border border-white/40 p-4 shadow-lg transition-all duration-500 ease-out group-hover:bg-white/35">
                <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                <h3 className="font-display text-lg text-white drop-shadow-sm mb-1">{cat.name}</h3>
                <p className="text-xs text-white/85 leading-relaxed max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden">
                  {cat.items}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative bg-ink overflow-hidden px-[6vw] py-24" ref={services.ref}>
        <div className="pointer-events-none absolute -top-32 -left-20 w-96 h-96 rounded-full bg-lilac/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-24 w-[28rem] h-[28rem] rounded-full bg-lilac-deep/25 blur-[120px]" />

        <div className="relative mb-12">
          <p className={eyebrowDark}>What we do</p>
          <h2 className={`${h2Base} text-paper`}>Four ways to get dressed with us.</h2>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,24rem)_1fr] gap-6 lg:gap-10 items-stretch">
          {/* Left cards */}
          <div className="flex flex-col justify-between gap-6">
            {renderServiceCard(0, "left")}
            {renderServiceCard(1, "left")}
          </div>

          {/* Centre: suit on a glowing platform */}
          <div
            className={`relative order-first lg:order-none flex items-end justify-center h-[24rem] lg:h-[30rem] pb-10 transition-all duration-1000 ease-out ${
              services.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="pointer-events-none absolute inset-x-6 top-6 bottom-12 rounded-full bg-lilac-deep/35 blur-[90px]" />
            <div className="pointer-events-none absolute bottom-12 inset-x-[22%] h-2/3 bg-gradient-to-t from-lilac-light/30 to-transparent [clip-path:polygon(22%_0,78%_0,100%_100%,0_100%)] blur-sm" />

            <img
              src={SUIT_IMG}
              alt="Tailored suit"
              className="relative z-10 h-full w-auto max-w-full rounded-3xl object-contain drop-shadow-[0_0_40px_rgba(138,111,209,0.5)] [mask-image:linear-gradient(to_bottom,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
            />

            <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 w-72 max-w-full h-14">
              <span className="absolute inset-0 rounded-[50%] border border-lilac-light/30" />
              <span className="absolute inset-x-6 inset-y-2 rounded-[50%] border border-lilac-light/50" />
              <span className="absolute inset-x-12 inset-y-3.5 rounded-[50%] bg-lilac-light/50 blur-md" />
              <span className="absolute inset-x-14 inset-y-4 rounded-[50%] border-2 border-white/70 shadow-[0_0_20px_#b8a8e8]" />
            </div>
          </div>

          {/* Right cards */}
          <div className="flex flex-col justify-between gap-6">
            {renderServiceCard(2, "right")}
            {renderServiceCard(3, "right")}
          </div>
        </div>

        <div className="relative mt-14 flex justify-start">
          <a
            href={CONTACT_PATH}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-lilac-deep to-lilac text-paper text-sm font-medium shadow-lg shadow-lilac-deep/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Book a Consultation
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" stroke="currentColor" fill="none">
              <path d="M4 12h15M13 6l6 6-6 6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* ORDER JOURNEY */}
      <section id="journey" className="px-[6vw] py-[70px]">
        <p className={eyebrow}>Order journey</p>
        <h2 className={`${h2Base} mb-10`}>
          Every order, stitched from start to pickup.
        </h2>

        <div ref={journey.ref} className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-0 pt-8">
          <svg
            className="hidden md:block absolute top-0 left-0 w-full h-5"
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="20"
              y1="20"
              x2="980"
              y2="20"
              className="stroke-lilac-deep"
              strokeWidth="2"
              strokeDasharray="10 8"
              strokeLinecap="round"
              style={{
                strokeDashoffset: journey.visible ? 0 : 1000,
                transition: "stroke-dashoffset 1.4s ease",
              }}
            />
          </svg>
          <svg
            className="block md:hidden absolute top-0 left-[5px] w-5 h-full"
            viewBox="0 0 20 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="10"
              y1="20"
              x2="10"
              y2="980"
              className="stroke-lilac-deep"
              strokeWidth="2"
              strokeDasharray="10 8"
              strokeLinecap="round"
              style={{
                strokeDashoffset: journey.visible ? 0 : 1000,
                transition: "stroke-dashoffset 1.4s ease",
              }}
            />
          </svg>

          {JOURNEY.map((stage, i) => {
            const isLast = i === JOURNEY.length - 1;
            return (
              <div
                key={stage.label}
                className={`flex md:flex-col items-center gap-3 flex-1 relative z-10 transition-all duration-500 ease-out ${
                  journey.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-75"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="relative w-10 h-10 shrink-0">
                  {isLast && <span className="absolute inset-0 rounded-full bg-lilac animate-ping opacity-40" />}
                  <div className="absolute inset-0 rounded-full bg-paper border-2 border-lilac flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-lilac-deep" stroke="currentColor">
                      {stage.icon}
                    </svg>
                  </div>
                </div>
                <span className="text-xs text-center max-w-[12ch] md:max-w-[10ch] text-ink/65">{stage.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ADMIN TEASER */}
      <section className="px-[6vw] py-[70px]" ref={admin.ref}>
        <div
          className={`bg-ink text-paper rounded-2xl grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 p-8 md:p-12 transition-all duration-700 ${
            admin.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div>
            <p className="font-mono uppercase tracking-[0.14em] text-xs text-lilac-light mb-3.5">For the workshop</p>
            <h2 className={h2Base}>
              Built for the tailor's bench, not a spreadsheet.
            </h2>
            <p className="text-paper/75 my-5 max-w-[46ch] leading-relaxed">
              Manage products, bookings, suit hire and customer orders from one dashboard built for daily use,
              not quarterly reports.
            </p>
            <a className={btnPrimary} href="/login">
              Sign In to Dashboard
            </a>
          </div>
          <div className="flex flex-col gap-5 justify-center border-t md:border-t-0 md:border-l border-paper/15 pt-5 md:pt-0 md:pl-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-mono text-3xl text-lilac-light">{stat.value}</span>
                <span className="text-sm text-paper/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        ref={faq.ref}
        className="relative overflow-hidden bg-gradient-to-b from-ink via-lilac-deep/45 to-ink px-[6vw] py-24"
      >
        <div className="pointer-events-none absolute top-1/3 -left-24 w-96 h-96 rounded-full bg-lilac/25 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-10 -right-24 w-96 h-96 rounded-full bg-lilac-deep/30 blur-[120px]" />

        <div className="relative grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
        <div
          className={`transition-all duration-700 ease-out lg:sticky lg:top-28 ${
            faq.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className={eyebrowDark}>// FAQs</p>
          <h2 className={`${h2Base} text-paper`}>Frequently asked questions</h2>
          <p className="text-sm text-paper/60 leading-relaxed max-w-[38ch] mt-5">
            Can't find your answer?{" "}
            <a href={CONTACT_PATH} className="text-lilac-light underline underline-offset-4 hover:text-paper transition-colors">
              Send us a message
            </a>{" "}
            and we'll get back to you.
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          {FAQS.map((item, i) => {
            const open = openFaq === i;
            return (
              <div
                key={item.q}
                className={`transition-all duration-700 ease-out ${
                  faq.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                  className={`group w-full flex items-center justify-between gap-4 text-left rounded-xl border px-5 py-4 backdrop-blur-xl transition-all duration-300 ${
                    open
                      ? "bg-white/[0.14] border-lilac-light/50"
                      : "bg-white/[0.06] border-white/15 hover:bg-white/[0.1] hover:border-white/30"
                  }`}
                >
                  <span className="font-display text-base md:text-lg text-paper">{item.q}</span>
                  <span className="shrink-0 w-9 h-9 rounded-lg bg-ink/60 border border-white/10 flex items-center justify-center text-lilac-light">
                    <svg
                      viewBox="0 0 24 24"
                      className={`w-4 h-4 transition-transform duration-500 ease-out ${open ? "rotate-180" : ""}`}
                      stroke="currentColor"
                      fill="none"
                    >
                      <path d="M7 17 17 7M9 7h8v8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={`grid transition-all duration-500 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pt-4 pb-2 text-sm leading-relaxed text-paper/70 max-w-[62ch]">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="book"
        ref={cta.ref}
        className={`relative overflow-hidden px-[6vw] py-24 transition-all duration-700 ease-out ${
          cta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-lilac/20 blur-[110px]" />

        <div className="relative max-w-4xl rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_30px_70px_-25px_rgba(106,86,176,0.4)] px-8 py-16 sm:px-16">
          <span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

          <span className="inline-flex items-center gap-2 rounded-full bg-white/50 border border-white/70 px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-lilac-deep animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-lilac-deep">Booking now</span>
          </span>

          <h2 className={`${h2Base} mb-4`}>Your next outfit starts here.</h2>
          <p className="text-ink/65 max-w-md mb-8 leading-relaxed">
            Book a consultation, bring your ideas, and we'll take care of the measuring, the fitting and the
            finishing.
          </p>

          <ul className="flex flex-wrap justify-start gap-x-6 gap-y-2 mb-10 text-sm text-ink/70">
            {["Made around your measurements", "Suits available to hire", "Fittings and pickup, all booked in one place"].map(
              (perk) => (
                <li key={perk} className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-lilac-deep" stroke="currentColor" fill="none">
                    <path d="M5 12.5l4.2 4.2L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {perk}
                </li>
              )
            )}
          </ul>

          <div className="flex gap-3.5 flex-wrap justify-start">
            <a
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-lilac-deep text-paper text-sm font-medium shadow-lg shadow-lilac-deep/30 transition-all duration-300 hover:-translate-y-1 hover:bg-ink hover:shadow-xl hover:shadow-lilac-deep/40"
              href={CONTACT_PATH}
            >
              Book a Consultation
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                stroke="currentColor"
                fill="none"
              >
                <path d="M4 12h15M13 6l6 6-6 6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              className="inline-block px-7 py-3.5 rounded-full border border-ink/70 text-ink text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 hover:border-lilac-deep"
              href="https://wa.me/256776419829"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-ink text-paper overflow-hidden">
        <div className="pointer-events-none absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-lilac/15 blur-[100px]" />
        <div className="pointer-events-none absolute -top-24 right-0 w-72 h-72 rounded-full bg-lilac-deep/20 blur-[100px]" />

        <div className="relative px-[6vw] pt-16 pb-14">
          {/* Headline row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-white/10">
            <h2 className="font-display font-semibold text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
              Let's <span className="text-lilac-light">Connect</span> there
            </h2>
            <a
              href={CONTACT_PATH}
              className="group self-start md:self-auto inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-lilac-deep text-paper text-sm font-medium shadow-lg shadow-lilac-deep/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-lilac hover:text-ink"
            >
              Contact Us
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                stroke="currentColor"
                fill="none"
              >
                <path d="M4 12h15M13 6l6 6-6 6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr_1.3fr] gap-10 pt-10">
            {/* BRAND */}
            <div>
              <a className="inline-flex items-center gap-3 no-underline mb-4" href="/">
                <img src={logo} alt="Ssebbale Stitches" className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20" />
                <span className="font-display text-lg text-paper">
                  Ssebbale<span className="text-lilac-light"> Stitches.</span>
                </span>
              </a>
              <p className="text-sm text-paper/60 leading-relaxed max-w-[34ch] mb-6">
                Bespoke tailoring for men, women and children from first sketch to final fitting, all in one
                workshop.
              </p>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.07] border border-white/15 text-paper/70 transition-all duration-300 hover:text-paper hover:bg-lilac-deep hover:border-lilac-deep hover:-translate-y-0.5"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor">
                      {s.path}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* LINKS */}
            <div>
              <h4 className="font-display text-base mb-5 text-paper">Links</h4>
              <ul className="flex flex-col gap-3 text-sm text-paper/60">
                {[
                  { label: "Collections", href: "#collections" },
                  { label: "Services", href: "#services" },
                  { label: "How it works", href: "#journey" },
                  { label: "FAQs", href: "#faq" },
                  { label: "Book a Consultation", href: CONTACT_PATH },
                  { label: "Contact", href: CONTACT_PATH },
                ].map((l) => (
                  <li key={l.label}>
                    <a className="inline-block no-underline text-paper/60 transition-all duration-300 hover:text-lilac-light hover:translate-x-1" href={l.href}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="font-display text-base mb-5 text-paper">Contact</h4>
              <ul className="flex flex-col gap-4 text-sm text-paper/60">
                <li className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 shrink-0 text-lilac-light" stroke="currentColor" fill="none">
                    <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.3" strokeWidth="1.5" />
                  </svg>
                  California plaza Luwum st 2F 27, Kampala, Uganda
                </li>
                <li>
                  <a className="flex items-start gap-3 no-underline text-paper/60 transition-colors hover:text-lilac-light break-all" href="mailto:ssebbaleisaac4@gmail.com">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 shrink-0 text-lilac-light" stroke="currentColor" fill="none">
                      <path d="M4 6.5 12 13l8-6.5M4 6.5h16v11H4v-11Z" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    ssebbaleisaac4@gmail.com
                  </a>
                </li>
                <li>
                  <a className="flex items-start gap-3 no-underline text-paper/60 transition-colors hover:text-lilac-light" href="tel:+256776419829">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 shrink-0 text-lilac-light" stroke="currentColor" fill="none">
                      <path
                        d="M6 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A17 17 0 0 1 4.5 5.1 1.5 1.5 0 0 1 6 3.5Z"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                    +256 776 419829
                  </a>
                </li>
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div>
              <h4 className="font-display text-base mb-5 text-paper">Get the latest information</h4>
              <form
                onSubmit={onSubscribe}
                noValidate
                className="flex items-center gap-2 rounded-full bg-white/[0.07] border border-white/15 pl-5 pr-1.5 py-1.5 transition-colors duration-300 focus-within:border-lilac-light/60 focus-within:bg-white/[0.1]"
              >
                <label htmlFor="news-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="news-email"
                  type="email"
                  autoComplete="email"
                  value={newsEmail}
                  onChange={(e) => {
                    setNewsEmail(e.target.value);
                    if (newsStatus !== "idle") setNewsStatus("idle");
                  }}
                  placeholder="Email address"
                  aria-invalid={newsStatus === "invalid"}
                  className="flex-1 min-w-0 bg-transparent text-sm text-paper placeholder:text-paper/40 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="shrink-0 w-10 h-10 rounded-full bg-lilac-deep text-paper flex items-center justify-center shadow-md shadow-lilac-deep/40 transition-all duration-300 hover:bg-lilac hover:text-ink hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" fill="none">
                    <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5 21 3Z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
              <p className="text-xs mt-3 min-h-[1.25rem]" role="status">
                {newsStatus === "invalid" && <span className="text-red-400">Please enter a valid email address.</span>}
                {newsStatus === "sent" && (
                  <span className="text-lilac-light">Your email app should have opened. Press send to join the list.</span>
                )}
                {newsStatus === "idle" && <span className="text-paper/45">New collections and suit availability, straight to your inbox.</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Purple bottom bar */}
        <div className="relative bg-lilac-deep">
          <div className="px-[6vw] py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-paper">
            <span className="font-medium">© {new Date().getFullYear()} Ssebbale Stitches. All rights reserved.</span>
            <span className="flex items-center gap-4">
              <span className="text-paper/80">Kampala, Uganda</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-medium no-underline text-paper hover:underline"
              >
                Back to top ↑
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}