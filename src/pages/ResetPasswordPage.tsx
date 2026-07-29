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

function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-4
}

const STRENGTH_LABEL = ["Too short", "Weak", "Okay", "Good", "Strong"];

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const card = useReveal<HTMLDivElement>(true);

  const strength = getStrength(password);
  const mismatch = confirmPassword.length > 0 && password !== confirmPassword;
  const canSubmit = password.length >= 8 && password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // wire up to your password-reset confirmation logic (token from URL, etc.)
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
                Set a new password.
              </h1>
              <p className="text-paper/60 text-sm max-w-sm mb-8 leading-relaxed">
                Choose something you haven't used before. It should be at least 8 characters.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* New password */}
                <div>
                  <div className="relative">
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/40 pointer-events-none"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
                    <span className="absolute left-11 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wide text-paper/40 pointer-events-none">
                      New password
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
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

                  {/* Strength meter */}
                  {password.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex gap-1 flex-1">
                        {[0, 1, 2, 3].map((i) => (
                          <span
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                              i < strength
                                ? strength <= 1
                                  ? "bg-red-400"
                                  : strength === 2
                                  ? "bg-amber-400"
                                  : "bg-lilac-light"
                                : "bg-white/10"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-paper/45 whitespace-nowrap">
                        {STRENGTH_LABEL[strength]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div className="relative">
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/40 pointer-events-none"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                  <span className="absolute left-11 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wide text-paper/40 pointer-events-none">
                    Confirm password
                  </span>
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full rounded-xl bg-white/10 backdrop-blur-md border pt-6 pb-2.5 pl-11 pr-11 text-sm text-paper placeholder:text-paper/25 outline-none transition-all duration-300 focus:bg-white/15 ${
                      mismatch
                        ? "border-red-400/60 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(248,113,113,0.15)]"
                        : "border-white/15 focus:border-lilac-light focus:shadow-[0_0_0_4px_rgba(184,168,232,0.15)]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-paper/50 hover:text-lilac-light transition-colors duration-200"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" fill="none">
                      {showConfirm ? (
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
                {mismatch && (
                  <p className="text-[11px] text-red-400 -mt-2.5 pl-1">Passwords don't match.</p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="relative overflow-hidden w-full rounded-xl bg-lilac-deep text-paper text-sm font-medium py-3 shadow-lg shadow-lilac-deep/40 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 group"
                >
                  <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative">Reset Password</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-6">
              <div className="relative w-14 h-14 mb-6">
                <span className="absolute inset-0 rounded-full bg-lilac-light/20 animate-ping" />
                <div className="absolute inset-0 rounded-full bg-lilac-deep flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-paper" stroke="currentColor" fill="none">
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <h1 className="font-display font-semibold text-xl text-paper mb-2">Password reset.</h1>
              <p className="text-paper/60 text-sm max-w-xs mb-8 leading-relaxed">
                Your password has been updated. Sign in with your new password to continue.
              </p>

              <a
                href="/login"
                className="relative overflow-hidden inline-block px-7 py-3 rounded-full bg-lilac-deep text-paper text-sm font-medium shadow-lg shadow-lilac-deep/30 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Sign In
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}