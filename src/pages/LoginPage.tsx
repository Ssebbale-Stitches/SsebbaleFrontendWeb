import { useEffect, useRef, useState } from "react";
import logo from "../assets/images/Business-logo.jpeg";
import bgImg from "../assets/images/Hero.jpeg";

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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const card = useReveal<HTMLDivElement>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // wire up to your auth logic
  };

  const handleGoogleSignIn = () => {
    // wire up to your Google OAuth flow
  };

  return (
    <div className="min-h-screen w-full bg-[#3a3a45] flex items-center justify-center p-4 md:p-8">
      <div
        ref={card.ref}
        className={`relative w-full max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 ease-out ${
          card.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* BACKGROUND IMAGE + OVERLAY */}
        <img src={bgImg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/40" />
        <div className="absolute inset-0 bg-ink/20" />

        {/* decorative illustrations */}
        <svg
          className="pointer-events-none absolute top-10 right-10 w-40 h-40 opacity-20 animate-[spin_40s_linear_infinite]"
          viewBox="0 0 160 160"
          aria-hidden="true"
        >
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = (i / 30) * 2 * Math.PI;
            const r1 = 72;
            const r2 = i % 3 === 0 ? 52 : 62;
            const x1 = 80 + r1 * Math.cos(angle);
            const y1 = 80 + r1 * Math.sin(angle);
            const x2 = 80 + r2 * Math.cos(angle);
            const y2 = 80 + r2 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b8a8e8" strokeWidth="1.2" />;
          })}
        </svg>
        <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-lilac/20 blur-[110px]" />

        {/* CONTENT */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 px-8 md:px-14 py-10 md:py-14">
          {/* TOP BAR - Logo only on left */}
          <div className="md:col-span-2 flex items-center justify-between mb-2">
            <a href="/" className="flex items-center group">
              <img src={logo} alt="Ssebbale Stitches" className="h-14 w-auto rounded-full object-cover ring-2 ring-white/20 transition-transform duration-300 group-hover:scale-105" />
            </a>
          </div>

          {/* LEFT — WELCOMING WORDS */}
          <div className="flex flex-col justify-center md:pr-6 order-2 md:order-1">
            <p className="font-mono uppercase tracking-[0.14em] text-xs text-lilac-light mb-4">
              Welcome back
            </p>
            <h1 className="font-display font-semibold text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-paper mb-5">
              Tailored to fit{" "}
              <span className="italic font-normal text-lilac-light">every story</span>, one order at a time.
            </h1>
            <p className="text-paper/65 text-sm max-w-md mb-8 leading-relaxed">
              Sign in to manage orders, bookings, and your collections — everything tracked from first
              sketch to final fitting.
            </p>
            <div className="flex gap-3.5 flex-wrap">
              <a
                href="/"
                className="inline-block px-6 py-3 rounded-full border border-paper/40 text-paper text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Explore Collections
              </a>
              <a
                href="/#book"
                className="inline-block px-6 py-3 rounded-full bg-lilac-light text-ink text-sm font-medium shadow-lg shadow-lilac/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Book a Consultation
              </a>
            </div>
          </div>

          {/* RIGHT — FORM with Back button */}
          <div className="flex flex-col justify-center order-1 md:order-2">
            {/* Back button on form side */}
            <a
              href="/"
              className="text-xs text-paper/60 hover:text-paper transition-colors flex items-center gap-1.5 mb-4"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
                <path d="M15 6l-6 6 6 6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to storefront
            </a>

            <p className="font-mono uppercase tracking-[0.14em] text-[11px] text-lilac-light mb-2">
              Tailor dashboard
            </p>
            <h2 className="font-display font-semibold text-2xl text-paper mb-1">Welcome back.</h2>
            <p className="text-paper/50 text-xs mb-6">
              Don't have an account?{" "}
              <a href="/signup" className="text-lilac-light hover:underline font-medium">
                Create one
              </a>
            </p>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-paper/95 py-2.5 text-sm font-medium text-ink/80 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 mb-4"
            >
              <svg viewBox="0 0 48 48" className="w-4 h-4 shrink-0">
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5Z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.7 0-14.4 4.3-17.7 10.7Z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35.4 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.5 39.6 16.2 44 24 44Z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.5l6.3 5.3C40.9 36.4 44 30.8 44 24c0-1.3-.1-2.7-.4-3.5Z"
                />
              </svg>
              <span className="whitespace-nowrap">Sign in with Google</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="h-px flex-1 bg-paper/15" />
              <span className="text-[11px] text-paper/40 whitespace-nowrap">or continue with email</span>
              <span className="h-px flex-1 bg-paper/15" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Email with icon */}
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/40 pointer-events-none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="absolute left-11 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wide text-paper/40 pointer-events-none">
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@ssebbalestitches.com"
                  className="w-full rounded-xl bg-white/10 backdrop-blur-md border border-white/15 pt-6 pb-2.5 pl-11 pr-4 text-sm text-paper placeholder:text-paper/25 outline-none transition-all duration-300 focus:border-lilac-light focus:bg-white/15 focus:shadow-[0_0_0_4px_rgba(184,168,232,0.15)]"
                />
              </div>

              {/* Password with icon */}
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/40 pointer-events-none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <span className="absolute left-11 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wide text-paper/40 pointer-events-none">
                  Password
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-white/10 backdrop-blur-md border border-white/15 pt-6 pb-2.5 pl-11 pr-11 text-sm text-paper placeholder:text-paper/25 outline-none transition-all duration-300 focus:border-lilac-light focus:bg-white/15 focus:shadow-[0_0_0_4px_rgba(184,168,232,0.15)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-paper/50 hover:text-lilac-light transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" fill="none">
                    {showPassword ? (
                      <>
                        <path d="M3 3l18 18" strokeWidth="1.6" strokeLinecap="round" />
                        <path
                          d="M10.6 10.6a2.3 2.3 0 0 0 3.2 3.2M6.6 6.7C4.5 8 3 10 2 12c1.8 3.6 5.5 6.5 10 6.5 1.6 0 3.1-.4 4.4-1M17.4 17.3C19.4 16 21 14 22 12c-1.1-2.3-3-4.3-5.3-5.6a10.9 10.9 0 0 0-4.7-1.1c-.7 0-1.4.06-2 .2"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          d="M2 12c1.8-3.6 5.5-6.5 10-6.5s8.2 2.9 10 6.5c-1.8 3.6-5.5 6.5-10 6.5S3.8 15.6 2 12Z"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="12" r="2.6" strokeWidth="1.6" />
                      </>
                    )}
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span
                    onClick={() => setRemember((v) => !v)}
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 ${
                      remember ? "bg-lilac-light border-lilac-light" : "bg-white/10 border-white/30"
                    }`}
                  >
                    {remember && (
                      <svg viewBox="0 0 24 24" className="w-3 h-3 text-ink" stroke="currentColor" fill="none">
                        <path d="M5 12.5l4.5 4.5L19 7.5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="text-xs text-paper/60 whitespace-nowrap">Remember me</span>
                </label>
                <a href="#" className="text-xs text-lilac-light hover:underline whitespace-nowrap">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="relative overflow-hidden w-full rounded-xl bg-lilac-deep text-paper text-sm font-medium py-3 shadow-lg shadow-lilac-deep/40 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl group"
              >
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative">Sign In</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}