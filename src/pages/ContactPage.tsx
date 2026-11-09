import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import logo from "../assets/images/Business-logo.jpeg";

const WHATSAPP_NUMBER = "256776419829";
const EMAIL = "ssebbaleisaac4@gmail.com";

const SERVICE_OPTIONS = [
  "Consultation",
  "Custom Tailoring",
  "Suit Hiring",
  "Booking a fitting",
  "Something else",
];

const CONTACT_ITEMS = [
  {
    label: "Visit the workshop",
    value: "California plaza Luwum st 2F 27",
    sub: "Kampala, Uganda",
    href: undefined as string | undefined,
    icon: (
      <>
        <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.3" strokeWidth="1.5" />
      </>
    ),
  },
  {
    label: "Call or WhatsApp",
    value: "+256 776 419829",
    sub: "Fastest way to reach us",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: (
      <path
        d="M6 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A17 17 0 0 1 4.5 5.1 1.5 1.5 0 0 1 6 3.5Z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Email us",
    value: EMAIL,
    sub: "We reply within a day",
    href: `mailto:${EMAIL}`,
    icon: <path d="M4 6.5 12 13l8-6.5M4 6.5h16v11H4v-11Z" strokeWidth="1.5" strokeLinejoin="round" />,
  },
];

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
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
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
    path: <path d="M5 4.5 18.5 19.5M18.5 4.5 5 19.5" strokeWidth="1.6" strokeLinecap="round" />,
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { name: "", email: "", phone: "", service: SERVICE_OPTIONS[0], message: "" };

const fieldBase =
  "w-full rounded-xl bg-white/60 border px-4 py-3 text-sm text-ink placeholder:text-ink/40 outline-none transition-all duration-300 focus:bg-white focus:border-lilac-deep focus:ring-4 focus:ring-lilac/20";
const labelBase = "block font-mono uppercase tracking-[0.12em] text-[11px] text-lilac-deep mb-2";

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (f.phone.trim() && !/^[+\d][\d\s-]{6,}$/.test(f.phone.trim())) e.phone = "Enter a valid phone number.";
  if (f.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
  return e;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // No backend yet: hand the enquiry over to WhatsApp with the details pre-filled.
    const text = [
      `Hello Ssebbale Stitches, my name is ${form.name.trim()}.`,
      `Service: ${form.service}`,
      form.phone.trim() ? `Phone: ${form.phone.trim()}` : "",
      `Email: ${form.email.trim()}`,
      "",
      form.message.trim(),
    ]
      .filter((line, i) => line !== "" || i > 0)
      .join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setSent(false);
  };

  const reveal = (delay: number) => ({
    className: `transition-all duration-700 ease-out ${
      ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <div className="bg-paper text-ink font-sans min-h-screen">
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-[6vw] py-4 bg-white/40 backdrop-blur-2xl border-b border-white/50">
        <a className="group flex items-center no-underline" href="/">
          <img
            src={logo}
            alt="Ssebbale Stitches"
            className="h-12 w-auto rounded-full object-cover ring-2 ring-white/60 shadow-md transition-transform duration-500 group-hover:scale-105"
          />
        </a>
        <nav className="flex items-center gap-5 md:gap-8 text-sm">
          <a href="/" className="relative text-ink no-underline group">
            Home
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-lilac-deep transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="/#collections" className="hidden sm:inline relative text-ink no-underline group">
            Collections
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-lilac-deep transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="/#services" className="hidden sm:inline relative text-ink no-underline group">
            Services
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-lilac-deep transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="/contact"
            className="relative text-lilac-deep no-underline font-medium"
            aria-current="page"
          >
            Contact
            <span className="absolute -bottom-1 left-0 h-px w-full bg-lilac-deep" />
          </a>
        </nav>
      </header>

      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-ink text-paper px-[6vw] py-20 md:py-24">
        <div className="pointer-events-none absolute -top-32 -left-20 w-96 h-96 rounded-full bg-lilac/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-24 w-[28rem] h-[28rem] rounded-full bg-lilac-deep/25 blur-[120px]" />

        <div className="relative max-w-3xl">
          <div {...reveal(0)}>
            <p className="font-mono uppercase tracking-[0.14em] text-xs text-lilac-light mb-3.5">Contact</p>
          </div>
          <div {...reveal(100)}>
            <h1 className="font-display font-semibold text-[clamp(2.4rem,5.4vw,4rem)] leading-[1.08]">
              Let's start with
              <br />
              <span className="italic font-normal bg-[linear-gradient(#b8a8e8,#b8a8e8)] bg-no-repeat bg-[length:100%_3px] bg-[position:0_92%]">
                a conversation.
              </span>
            </h1>
          </div>
          <div {...reveal(200)}>
            <p className="text-paper/75 text-base md:text-lg leading-relaxed max-w-[52ch] mt-6">
              Questions about a custom piece, a suit for hire or a fitting date? Send us a message and we'll
              get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="relative px-[6vw] py-16 md:py-20">
        <div className="pointer-events-none absolute top-20 right-0 w-80 h-80 rounded-full bg-lilac/20 blur-[100px]" />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-start">
          {/* FORM CARD */}
          <div
            {...reveal(250)}
            className={`${reveal(250).className} relative rounded-[2rem] bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_30px_70px_-25px_rgba(106,86,176,0.35)] p-6 sm:p-10`}
          >
            <span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

            {sent ? (
              <div className="flex flex-col items-center text-center py-10" role="status">
                <div className="relative w-16 h-16 mb-6">
                  <span className="absolute inset-0 rounded-full bg-lilac animate-ping opacity-30" />
                  <div className="absolute inset-0 rounded-full bg-paper border-2 border-lilac flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-lilac-deep" stroke="currentColor" fill="none">
                      <path d="M8 12.3l2.7 2.7L16.3 9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <h2 className="font-display font-semibold text-2xl mb-3">Almost there, {form.name.split(" ")[0]}.</h2>
                <p className="text-ink/65 max-w-sm leading-relaxed mb-8">
                  WhatsApp should have opened with your message ready. Press send there and we'll reply as soon
                  as we can.
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                  <button
                    type="button"
                    onClick={reset}
                    className="px-6 py-3 rounded-full bg-lilac-deep text-paper text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
                  >
                    Send another message
                  </button>
                  <a
                    href="/"
                    className="px-6 py-3 rounded-full border border-ink/70 text-ink text-sm font-medium no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/60"
                  >
                    Back to home
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
                <div>
                  <h2 className="font-display font-semibold text-2xl mb-1">Send us a message</h2>
                  <p className="text-sm text-ink/60">Fields marked * are required.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelBase}>
                      Full name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`${fieldBase} ${errors.name ? "border-red-400" : "border-white/80"}`}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-red-500 mt-1.5">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className={labelBase}>
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`${fieldBase} ${errors.email ? "border-red-400" : "border-white/80"}`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-500 mt-1.5">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelBase}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="+256 7XX XXX XXX"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={`${fieldBase} ${errors.phone ? "border-red-400" : "border-white/80"}`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-xs text-red-500 mt-1.5">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="service" className={labelBase}>
                      I'm interested in
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={onChange}
                      className={`${fieldBase} border-white/80 appearance-none cursor-pointer bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236a56b0%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1rem]`}
                    >
                      {SERVICE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelBase}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={onChange}
                    placeholder="Tell us about the outfit, the occasion, or your dates..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`${fieldBase} resize-none ${errors.message ? "border-red-400" : "border-white/80"}`}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-red-500 mt-1.5">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-lilac-deep text-paper text-sm font-medium shadow-lg shadow-lilac-deep/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-xl"
                  >
                    Send message
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      stroke="currentColor"
                      fill="none"
                    >
                      <path d="M4 12h15M13 6l6 6-6 6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <p className="text-xs text-ink/50">Your message opens in WhatsApp, ready to send.</p>
                </div>
              </form>
            )}
          </div>

          {/* INFO COLUMN */}
          <div {...reveal(400)}>
            <p className="font-mono uppercase tracking-[0.14em] text-xs text-lilac-deep mb-3.5">Find us</p>
            <h2 className="font-display font-semibold text-[clamp(1.6rem,2.6vw,2.1rem)] max-w-[18ch] mb-8">
              Come in, call, or write.
            </h2>

            <ul className="flex flex-col gap-4">
              {CONTACT_ITEMS.map((item) => {
                const inner = (
                  <>
                    <div className="relative w-11 h-11 shrink-0">
                      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,_#b8a8e8,_#6a56b0,_#b8a8e8)] opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-[2px] rounded-full bg-paper flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-lilac-deep" stroke="currentColor" fill="none">
                          {item.icon}
                        </svg>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono uppercase tracking-[0.1em] text-[11px] text-ink/50 mb-1">{item.label}</p>
                      <p className="text-sm font-medium text-ink break-words">{item.value}</p>
                      <p className="text-xs text-ink/55 mt-0.5">{item.sub}</p>
                    </div>
                  </>
                );
                const cls =
                  "group flex items-start gap-4 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 p-4 transition-all duration-300 no-underline hover:-translate-y-1 hover:bg-white/60 hover:shadow-[0_15px_40px_-15px_rgba(106,86,176,0.3)]";
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={cls}
                        {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              <p className="font-mono uppercase tracking-[0.12em] text-[11px] text-ink/50 mb-3">Follow the work</p>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 backdrop-blur-md border border-white/70 text-ink/70 transition-all duration-300 hover:text-paper hover:bg-lilac-deep hover:border-lilac-deep hover:-translate-y-0.5"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor">
                      {s.path}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER STRIP */}
      <footer className="bg-ink text-paper px-[6vw] py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="text-xs text-paper/45">Ssebbale Stitches · Kampala, Uganda</span>
        <span className="font-mono text-xs text-paper/45">© {new Date().getFullYear()} All rights reserved</span>
      </footer>
    </div>
  );
}