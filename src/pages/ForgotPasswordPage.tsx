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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const card = useReveal<HTMLDivElement>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // wire up to your password-reset logic
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#3a3a45] flex items-center justify-center p-4 md:p-8">
      <div
        ref={card.ref}
        className={`relative w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 ease-out ${
          card.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* BACKGROUND IMAGE + OVERLAY */}
        <img src={bgImg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/95 via-ink/90 to-ink/80" />

        {/* decorative illustrations */}
        <svg
          className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 opacity-20 animate-[spin_45s_linear_infinite]"
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
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-lilac/15 blur-[100px]" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col px-8 md:px-12 py-10 md:py-12">
          {/* TOP BAR */}
          <div className="flex items-center justify-between mb-8">
            <a href="/" className="flex items-center group">
              <img
                src={logo}
                alt="Ssebbale Stitches"
                className="h-11 w-auto rounded-full object-cover ring-2 ring-white/20 transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <a
              href="/login"
              className="text-xs text-paper/60 hover:text-paper transition-colors flex items-center gap-1.5"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
                <path d="M15 6l-6 6 6 6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to sign in
            </a>
          </div>

          {!submitted ? (
            <>
              <span className="inline-flex items-center gap-2 w-fit rounded-full bg-white/5 border border-white/15 px-3.5 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-lilac-light animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-lilac-light">
                  Account recovery
                </span>
              </span>

              <h1 className="font-display font-semibold text-[clamp(1.7rem,3.4vw,2.3rem)] leading-tight text-paper mb-2.5">
                Forgot your password?
              </h1>
              <p className="text-paper/60 text-sm max-w-sm mb-8 leading-relaxed">
                Enter the email tied to your tailor account and we'll send a link to reset it.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/40 pointer-events-none"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
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

                <button
                  type="submit"
                  className="relative overflow-hidden w-full rounded-xl bg-lilac-deep text-paper text-sm font-medium py-3 shadow-lg shadow-lilac-deep/40 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl group"
                >
                  <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative">Send Reset Link</span>
                </button>
              </form>

              <p className="text-center text-xs text-paper/45 mt-6">
                Remembered it after all?{" "}
                <a href="/login" className="text-lilac-light hover:underline font-medium">
                  Sign in
                </a>
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-6">
              <div className="relative w-14 h-14 mb-6">
                <span className="absolute inset-0 rounded-full bg-lilac-light/20 animate-ping" />
                <div className="absolute inset-0 rounded-full bg-lilac-deep flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-paper" stroke="currentColor" fill="none">
                    <path
                      d="M4 6.5 12 13l8-6.5M4 6.5h16v11H4v-11Z"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="font-display font-semibold text-xl text-paper mb-2">Check your inbox.</h1>
              <p className="text-paper/60 text-sm max-w-xs mb-8 leading-relaxed">
                If an account exists for <span className="text-paper">{email}</span>, a reset link is on
                its way.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-lilac-light hover:underline font-medium mb-4"
              >
                Use a different email
              </button>

              <a
                href="/login"
                className="inline-block px-6 py-3 rounded-full border border-paper/30 text-paper text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Back to sign in
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}