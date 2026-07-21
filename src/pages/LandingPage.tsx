import { useEffect, useRef, useState } from "react";
import logo from "../assets/images/Business-logo.jpeg";

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

import mensImg from "../assets/images/Men.png";
import womensImg from "../assets/images/Women.png";
import childrensImg from "../assets/images/Children.png";

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

const btnPrimary =
  "inline-block px-6 py-3 rounded bg-lilac-deep text-paper text-sm font-medium transition-colors transition-transform hover:-translate-y-0.5 hover:bg-ink";
const btnGhost =
  "inline-block px-6 py-3 rounded border border-ink text-ink text-sm font-medium transition-transform hover:-translate-y-0.5";
const eyebrow = "font-mono uppercase tracking-[0.14em] text-xs text-lilac-deep mb-3.5";

const SOCIALS = [
  {
    label: "Instagram",
    path: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" strokeWidth="1.6" fill="none" />
        <circle cx="12" cy="12" r="4" strokeWidth="1.6" fill="none" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Facebook",
    path: (
      <path
        d="M14 8.5h2.5V5H14c-2 0-3.3 1.4-3.3 3.5V11H8.5v3H10.7v6h3V14h2.3l.5-3H13.7V9c0-.5.2-.5.3-.5Z"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    label: "WhatsApp",
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
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hero = useReveal<HTMLDivElement>(true);
  const categories = useReveal<HTMLDivElement>();
  const services = useReveal<HTMLDivElement>();
  const journey = useReveal<HTMLDivElement>();
  const admin = useReveal<HTMLDivElement>();
  const cta = useReveal<HTMLDivElement>();

  return (
    <div className="bg-paper text-ink font-sans">
      {/* NAV */}
      <header
        className={`sticky top-0 flex items-center justify-between px-[6vw] z-50 transition-all duration-300 ${
          scrolled ? "bg-paper/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <a className="flex items-center no-underline" href="/">
          <img src={logo} alt="Ssebbale Stitches" className="h-14 w-auto rounded-full object-cover" />
        </a>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-7 absolute md:static top-full right-[6vw] md:right-auto bg-paper md:bg-transparent p-5 md:p-0 rounded-lg md:rounded-none shadow-lg md:shadow-none`}
        >
          <a className="text-ink no-underline text-sm" href="#collections">
            Collections
          </a>
          <a className="text-ink no-underline text-sm" href="#services">
            Services
          </a>
          <a className="text-ink no-underline text-sm" href="#journey">
            How it works
          </a>
          <a className="text-ink no-underline text-sm border border-ink rounded-full px-4 py-2" href="/login">
            Tailor Sign In
          </a>
        </nav>

        <button
          className="flex md:hidden flex-col gap-1.5 bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="w-5.5 h-0.5 bg-ink" />
          <span className="w-5.5 h-0.5 bg-ink" />
        </button>
      </header>

      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-10 px-[6vw] pt-10 pb-24 overflow-x-clip">
        <div
          ref={hero.ref}
          className={`transition-all duration-700 ease-out ${
            hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className={eyebrow}>Ssebbale Stitches · Kampala</p>
          <h1 className="font-display font-semibold text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[1.08]">
            Cut to fit
            <br />
            <span className="italic font-normal bg-[linear-gradient(#8a6fd1,#8a6fd1)] bg-no-repeat bg-[length:100%_3px] bg-[position:0_92%]">
              every story.
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-[46ch] my-6 text-ink/70">
            Browse collections, request custom pieces from your own inspiration, hire a suit, or book a
            consultation — all tracked from first sketch to final fitting.
          </p>
          <div className="flex gap-3.5 flex-wrap">
            <a className={btnPrimary} href="#book">
              Book a Consultation
            </a>
            <a className={btnGhost} href="#collections">
              Browse Collections
            </a>
          </div>
        </div>

        <div
          className={`flex justify-center order-first md:order-none transition-all duration-700 delay-150 ease-out ${
            hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 320 320" className="w-[min(340px,80vw)] h-auto">
            <circle cx="160" cy="160" r="130" className="fill-none stroke-ink" strokeOpacity="0.25" strokeWidth="1" />
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i / 36) * 2 * Math.PI;
              const long = i % 3 === 0;
              const r1 = 130;
              const r2 = long ? 112 : 120;
              const x1 = 160 + r1 * Math.cos(angle);
              const y1 = 160 + r1 * Math.sin(angle);
              const x2 = 160 + r2 * Math.cos(angle);
              const y2 = 160 + r2 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-lilac" strokeWidth="1.2" />;
            })}
            <circle cx="160" cy="160" r="88" className="fill-ink" />
            <text x="160" y="168" textAnchor="middle" className="fill-paper font-display italic" fontSize="20">
              Ssebbale
            </text>
          </svg>
        </div>
      </section>

    {/* CATEGORIES */}
<section id="collections" className="px-[6vw] py-[70px]" ref={categories.ref}>
  <p className={eyebrow}>Collections</p>
  <h2 className="font-display font-semibold text-[clamp(1.7rem,3vw,2.3rem)] max-w-[20ch] mb-10">
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

        <p className="font-mono uppercase tracking-[0.14em] text-xs text-lilac-light mb-3.5 relative">What we do</p>
        <h2 className="font-display font-semibold text-[clamp(1.7rem,3vw,2.3rem)] max-w-[20ch] mb-12 text-paper relative">
          Four ways to get dressed with us.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`group relative rounded-3xl p-6 bg-paper/[0.06] backdrop-blur-xl border border-paper/15 transition-all duration-700 ease-out hover:bg-paper/[0.1] hover:border-lilac-light/50 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(138,111,209,0.4)] ${
                services.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-paper/40 to-transparent" />
              <span className="absolute top-5 right-5 font-mono text-[11px] text-paper/25">0{i + 1}</span>

              <div className="relative w-12 h-12 mb-6">
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,_#b8a8e8,_#6a56b0,_#b8a8e8)] opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-[2px] rounded-full bg-ink flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 text-lilac-light" stroke="currentColor">
                    {s.icon}
                  </svg>
                </div>
              </div>

              <h3 className="font-display text-base mb-2 text-paper">{s.title}</h3>
              <p className="text-sm text-paper/60 leading-relaxed">{s.copy}</p>

              <span className="absolute bottom-0 left-6 right-6 h-px bg-lilac-light/0 group-hover:bg-lilac-light/60 transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* ORDER JOURNEY */}
      <section id="journey" className="px-[6vw] py-[70px]">
        <p className={eyebrow}>Order journey</p>
        <h2 className="font-display font-semibold text-[clamp(1.7rem,3vw,2.3rem)] max-w-[20ch] mb-10">
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
            <h2 className="font-display font-semibold text-[clamp(1.7rem,3vw,2.3rem)]">
              Built for the tailor's bench, not a spreadsheet.
            </h2>
            <p className="text-paper/75 my-5 max-w-[46ch] leading-relaxed">
              Manage products, bookings, suit hire and customer orders from one dashboard — built for daily use,
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

      {/* CTA */}
      <section
        id="book"
        ref={cta.ref}
        className={`px-[6vw] py-[70px] text-center transition-all duration-700 ease-out ${
          cta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="font-display font-semibold text-[clamp(1.9rem,4vw,2.8rem)] mb-7">Ready to be measured?</h2>
        <div className="flex gap-3.5 flex-wrap justify-center">
          <a className={btnPrimary} href="#book">
            Book a Consultation
          </a>
          <a className={btnGhost} href="/login">
            Tailor Sign In
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-ink text-paper overflow-hidden">
        <div className="pointer-events-none absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-lilac/15 blur-[100px]" />

        <div className="relative px-[6vw] pt-16 pb-10 grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">
          {/* BRAND */}
          <div>
            <a className="flex items-center no-underline mb-4" href="/">
              <img src={logo} alt="Ssebbale Stitches" className="h-12 w-auto rounded-full object-cover" />
            </a>
            <p className="text-sm text-paper/60 leading-relaxed max-w-[32ch] mb-5">
              Bespoke tailoring for men, women and children — from first sketch to final fitting, all in one
              workshop.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-paper/20 text-paper/70 hover:text-paper hover:border-lilac-light hover:bg-paper/[0.06] transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor">
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-display text-sm mb-4 text-paper">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-paper/60">
              <li>
                <a className="hover:text-lilac-light transition-colors" href="#collections">
                  Collections
                </a>
              </li>
              <li>
                <a className="hover:text-lilac-light transition-colors" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:text-lilac-light transition-colors" href="#journey">
                  How it works
                </a>
              </li>
              <li>
                <a className="hover:text-lilac-light transition-colors" href="#book">
                  Book a Consultation
                </a>
              </li>
              <li>
                <a className="hover:text-lilac-light transition-colors" href="/login">
                  Tailor Sign In
                </a>
              </li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="font-display text-sm mb-4 text-paper">Services</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-paper/60">
              <li>Consultation</li>
              <li>Custom Tailoring</li>
              <li>Suit Hiring</li>
              <li>Booking</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-display text-sm mb-4 text-paper">Get in Touch</h4>
            <ul className="flex flex-col gap-3 text-sm text-paper/60">
              <li className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 shrink-0 text-lilac-light" stroke="currentColor" fill="none">
                  <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="2.3" strokeWidth="1.5" />
                </svg>
                Kampala, Uganda
              </li>
              <li className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 shrink-0 text-lilac-light" stroke="currentColor" fill="none">
                  <path d="M4 6.5 12 13l8-6.5M4 6.5h16v11H4v-11Z" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                ssebbaleisaac4@gmail.com
              </li>
              <li className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 shrink-0 text-lilac-light" stroke="currentColor" fill="none">
                  <path
                    d="M6 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A17 17 0 0 1 4.5 5.1 1.5 1.5 0 0 1 6 3.5Z"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                +256 776 419829
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="relative border-t border-paper/10 px-[6vw] py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-xs text-paper/45">Ssebbale Stitches · Kampala, Uganda</span>
          <span className="font-mono text-xs text-paper/45">© {new Date().getFullYear()} All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}