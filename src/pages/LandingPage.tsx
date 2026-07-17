import { useEffect, useRef, useState } from "react";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
  }, []);

  return { ref, visible };
}

const CATEGORIES = [
  {
    name: "Men's Wear",
    items: "Suits · Shirts · Traditional Wear",
    count: "24",
    swatch: "bg-[repeating-linear-gradient(45deg,_#1c2129,_#1c2129_10px,_#2e3542_10px,_#2e3542_20px)]",
  },
  {
    name: "Women's Wear",
    items: "Dresses · Blazers · Corsets",
    count: "31",
    swatch: "bg-[repeating-linear-gradient(45deg,_#7a2e3d,_#7a2e3d_10px,_#8f3d4d_10px,_#8f3d4d_20px)]",
  },
  {
    name: "Children's Wear",
    items: "Occasion Outfits · Casual Wear",
    count: "12",
    swatch: "bg-[repeating-linear-gradient(45deg,_#b98a3d,_#b98a3d_10px,_#c99c52_10px,_#c99c52_20px)]",
  },
];

const SERVICES = [
  { title: "Consultation", copy: "Bring your ideas, fabric and measurements to the table before anything is cut." },
  { title: "Custom Tailoring", copy: "Upload inspiration, choose a category, and we draft the pattern around you." },
  { title: "Suit Hiring", copy: "Browse available suits by size and reserve them for your dates." },
  { title: "Booking", copy: "Schedule measurements, fittings, and pickup in one calendar." },
];

const JOURNEY = ["Pending", "Confirmed", "In Progress", "Ready for Fitting", "Ready for Pickup", "Completed"];

const STATS = [
  { label: "Active orders", value: "18" },
  { label: "Consultations booked", value: "42" },
  { label: "Suits on hire", value: "9" },
];

const btnPrimary =
  "inline-block px-6 py-3 rounded bg-wine text-chalk text-sm font-medium transition-transform hover:-translate-y-0.5 hover:bg-[#612232]";
const btnGhost =
  "inline-block px-6 py-3 rounded border border-ink text-ink text-sm font-medium transition-transform hover:-translate-y-0.5";
const eyebrow = "font-mono uppercase tracking-[0.14em] text-xs text-wine mb-3.5";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const journey = useReveal<HTMLDivElement>();
  const services = useReveal<HTMLDivElement>();
  const categories = useReveal<HTMLDivElement>();
  const admin = useReveal<HTMLDivElement>();

  return (
    <div className="bg-paper text-ink font-sans overflow-x-hidden">
      {/* NAV */}
      <header className="flex items-center justify-between px-[6vw] py-5 relative z-10">
        <a className="flex items-center gap-2.5 font-display font-semibold text-lg text-ink no-underline" href="/">
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            <circle cx="11" cy="11" r="9.5" className="stroke-brass" strokeWidth="1.4" fill="none" />
            <path
              d="M5 11c1.6-2.4 3.2-2.4 4.8 0s3.2 2.4 4.8 0"
              className="stroke-wine"
              strokeWidth="1.4"
              strokeDasharray="2.4 2.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span>Ssebbale Stitches</span>
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
      <section className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-10 px-[6vw] pt-10 pb-24">
        <div>
          <p className={eyebrow}>Ssebbale Stitches · Kampala</p>
          <h1 className="font-display font-semibold text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[1.08]">
            Cut to fit
            <br />
            <span className="italic font-normal bg-[linear-gradient(#b98a3d,#b98a3d)] bg-no-repeat bg-[length:100%_3px] bg-[position:0_92%]">
              every story.
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-[46ch] my-6 text-[#3c4351]">
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

        <div className="flex justify-center order-first md:order-none" aria-hidden="true">
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
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-brass" strokeWidth="1.2" />;
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.name}
              className={`bg-chalk rounded-xl overflow-hidden transition-all duration-700 ease-out ${
                categories.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className={`h-32 ${cat.swatch}`} />
              <div className="p-5">
                <h3 className="font-display text-lg mb-1.5">{cat.name}</h3>
                <p className="text-sm text-[#5a6070] mb-3">{cat.items}</p>
                <span className="font-mono text-xs text-wine">{cat.count} pieces</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-[6vw] py-[70px]" ref={services.ref}>
        <p className={eyebrow}>What we do</p>
        <h2 className="font-display font-semibold text-[clamp(1.7rem,3vw,2.3rem)] max-w-[20ch] mb-10">
          Four ways to get dressed with us.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4.5">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`border-t-2 border-brass pt-4 transition-all duration-700 ease-out ${
                services.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="font-display text-base mb-2">{s.title}</h3>
              <p className="text-sm text-[#5a6070] leading-relaxed">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ORDER JOURNEY — signature stitch line */}
      <section id="journey" className="px-[6vw] py-[70px]">
        <p className={eyebrow}>Order journey</p>
        <h2 className="font-display font-semibold text-[clamp(1.7rem,3vw,2.3rem)] max-w-[20ch] mb-10">
          Every order, stitched from start to pickup.
        </h2>

        <div ref={journey.ref} className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-0 pt-8">
          {/* horizontal stitch (desktop) */}
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
              className="stroke-wine"
              strokeWidth="2"
              strokeDasharray="10 8"
              strokeLinecap="round"
              style={{
                strokeDashoffset: journey.visible ? 0 : 1000,
                transition: "stroke-dashoffset 1.4s ease",
              }}
            />
          </svg>
          {/* vertical stitch (mobile) */}
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
              className="stroke-wine"
              strokeWidth="2"
              strokeDasharray="10 8"
              strokeLinecap="round"
              style={{
                strokeDashoffset: journey.visible ? 0 : 1000,
                transition: "stroke-dashoffset 1.4s ease",
              }}
            />
          </svg>

          {JOURNEY.map((stage, i) => (
            <div
              key={stage}
              className={`flex md:flex-col items-center gap-2.5 flex-1 relative z-10 transition-all duration-500 ${
                journey.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="w-3 h-3 rounded-full bg-brass border-2 border-paper shadow-[0_0_0_1px_#1c2129]" />
              <span className="text-xs text-center max-w-[12ch] md:max-w-[10ch] text-[#4a4f5b]">{stage}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ADMIN TEASER */}
      <section className="px-[6vw] py-[70px]" ref={admin.ref}>
        <div
          className={`bg-ink text-chalk rounded-2xl grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 p-8 md:p-12 transition-all duration-700 ${
            admin.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div>
            <p className="font-mono uppercase tracking-[0.14em] text-xs text-brass mb-3.5">For the workshop</p>
            <h2 className="font-display font-semibold text-[clamp(1.7rem,3vw,2.3rem)]">
              Built for the tailor's bench, not a spreadsheet.
            </h2>
            <p className="text-[#c9cbd4] my-5 max-w-[46ch] leading-relaxed">
              Manage products, bookings, suit hire and customer orders from one dashboard — built for daily use,
              not quarterly reports.
            </p>
            <a className={btnPrimary} href="/login">
              Sign In to Dashboard
            </a>
          </div>
          <div className="flex flex-col gap-5 justify-center border-t md:border-t-0 md:border-l border-[#3a4152] pt-5 md:pt-0 md:pl-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-mono text-3xl text-brass">{stat.value}</span>
                <span className="text-sm text-[#a4a9b6]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="px-[6vw] py-[70px] text-center">
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

      <footer className="flex justify-between px-[6vw] pb-10 pt-6 text-sm text-[#5a6070]">
        <span>Ssebbale Stitches · Kampala, Uganda</span>
        <span className="font-mono">© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}