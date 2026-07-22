import { useEffect, useRef, useState } from "react";
import logo from "../assets/images/Business-logo.jpeg";
import signupImg from "../assets/images/Hero.jpeg";

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

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const art = useReveal<HTMLDivElement>(true);
  const form = useReveal<HTMLDivElement>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // wire up to your account-creation logic
  };

  const handleGoogleSignup = () => {
    // wire up to your Google OAuth flow
  };

  return (
    <div className="min-h-screen w-full bg-ink text-ink font-sans grid grid-cols-1 md:grid-cols-2 overflow-x-hidden">
      {/* LEFT — IMAGE, CONTAINED, WITH BACKGROUND ILLUSTRATIONS, STICKY ON SCROLL */}
      <div
        ref={art.ref}
        className={`relative hidden md:flex items-center justify-center overflow-hidden md:sticky md:top-0 md:h-screen p-6 transition-all duration-700 ease-out ${
          art.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-20 -left-16 w-96 h-96 rounded-full bg-lilac/25 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-lilac-deep/20 blur-[100px]" />

        {/* decorative illustrations */}
        <svg
          className="pointer-events-none absolute -top-6 -left-6 w-40 h-40 opacity-30"
          viewBox="0 0 160 160"
          aria-hidden="true"
        >
          <circle cx="80" cy="80" r="70" stroke="#8a6fd1" strokeWidth="1" fill="none" strokeDasharray="4 6" />
        </svg>

        <svg
          className="pointer-events-none absolute bottom-10 -right-8 w-32 h-32 opacity-25 animate-[spin_30s_linear_infinite]"
          viewBox="0 0 120 120"
          aria-hidden="true"
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 2 * Math.PI;
            const r1 = 55;
            const r2 = i % 3 === 0 ? 40 : 48;
            const x1 = 60 + r1 * Math.cos(angle);
            const y1 = 60 + r1 * Math.sin(angle);
            const x2 = 60 + r2 * Math.cos(angle);
            const y2 = 60 + r2 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b8a8e8" strokeWidth="1.2" />;
          })}
        </svg>

        <svg
          className="pointer-events-none absolute top-16 right-10 w-16 h-16 opacity-40"
          viewBox="0 0 40 40"
          aria-hidden="true"
        >
          <path
            d="M4 20c3-6 6-6 9 0s6 6 9 0 6-6 9 0"
            stroke="#6a56b0"
            strokeWidth="1.4"
            strokeDasharray="2.2 2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <span className="pointer-events-none absolute top-1/3 left-8 w-2 h-2 rounded-full bg-lilac-light/60" />
        <span className="pointer-events-none absolute bottom-1/4 left-16 w-1.5 h-1.5 rounded-full bg-lilac/50" />
        <span className="pointer-events-none absolute top-1/4 right-16 w-1.5 h-1.5 rounded-full bg-lilac-light/50" />

        {/* image container */}
        <div className="relative w-full max-w-[380px] rounded-[2rem] overflow-hidden border border-white/15 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] animate-[float_8s_ease-in-out_infinite]">
          <img
            src={signupImg}
            alt="Ssebbale Stitches workshop"
            className="w-full h-[min(58vh,440px)] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <span className="absolute inset-x-4 top-4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {/* floating glass quote */}
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/25 shadow-xl px-4 py-3 animate-[float_7s_ease-in-out_infinite_0.4s]">
            <span className="inline-flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-lilac-light animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-lilac-light">
                Join the workshop
              </span>
            </span>
            <p className="text-paper font-display text-sm leading-snug">
              "Every order, stitched from start to pickup."
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — FORM */}
      <div
        ref={form.ref}
        className={`relative flex flex-col items-center justify-center bg-paper px-[6vw] md:px-10 py-10 transition-all duration-700 ease-out ${
          form.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-lilac/15 blur-[100px]" />

        <a href="/" className="relative flex items-center no-underline mb-5 w-fit">
          <img src={logo} alt="Ssebbale Stitches" className="h-9 w-auto rounded-full object-cover" />
        </a>

        <div className="relative max-w-md w-full">
          <p className="font-mono uppercase tracking-[0.14em] text-[11px] text-lilac-deep mb-2">Tailor dashboard</p>
          <h1 className="font-display font-semibold text-[clamp(1.5rem,2.6vw,2rem)] leading-tight mb-1.5">
            Create your account.
          </h1>
          <p className="text-ink/60 text-sm mb-4">
            Set up your workshop profile and start managing orders online.
          </p>

          <div className="relative rounded-[1.5rem] bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_25px_60px_-25px_rgba(106,86,176,0.35)] p-5 sm:p-6">
            <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-white border border-ink/10 py-2.5 text-sm font-medium text-ink/80 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-lilac-deep/40 mb-4"
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
              <span className="whitespace-nowrap">Sign up with Google</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="h-px flex-1 bg-ink/10" />
              <span className="text-[11px] text-ink/40 whitespace-nowrap">or fill in your details</span>
              <span className="h-px flex-1 bg-ink/10" />
            </div>

            <form onSubmit={handleSubmit}>
              <label className="block mb-3.5">
                <span className="block text-xs font-medium text-ink/70 mb-1">Full name</span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ssebbale Isaac"
                  className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 outline-none transition-all duration-300 focus:border-lilac-deep focus:bg-white focus:shadow-[0_0_0_4px_rgba(106,86,176,0.12)]"
                />
              </label>

              <label className="block mb-3.5">
                <span className="block text-xs font-medium text-ink/70 mb-1">Email address</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@ssebbalestitches.com"
                  className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 outline-none transition-all duration-300 focus:border-lilac-deep focus:bg-white focus:shadow-[0_0_0_4px_rgba(106,86,176,0.12)]"
                />
              </label>

              <label className="block mb-3.5">
                <span className="block text-xs font-medium text-ink/70 mb-1">Phone number</span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+256 700 000 000"
                  className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 outline-none transition-all duration-300 focus:border-lilac-deep focus:bg-white focus:shadow-[0_0_0_4px_rgba(106,86,176,0.12)]"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-1">
                <label className="block">
                  <span className="block text-xs font-medium text-ink/70 mb-1">Password</span>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 pr-10 text-sm text-ink placeholder:text-ink/35 outline-none transition-all duration-300 focus:border-lilac-deep focus:bg-white focus:shadow-[0_0_0_4px_rgba(106,86,176,0.12)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-lilac-deep transition-colors duration-200"
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
                </label>

                <label className="block">
                  <span className="block text-xs font-medium text-ink/70 mb-1">Confirm password</span>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 pr-10 text-sm text-ink placeholder:text-ink/35 outline-none transition-all duration-300 focus:border-lilac-deep focus:bg-white focus:shadow-[0_0_0_4px_rgba(106,86,176,0.12)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-lilac-deep transition-colors duration-200"
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
                </label>
              </div>

              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1.5 mb-1">Passwords don't match.</p>
              )}

              <label className="flex items-start gap-2.5 cursor-pointer select-none mt-4 mb-5">
                <span
                  onClick={() => setAgreed((v) => !v)}
                  className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-all duration-200 ${
                    agreed ? "bg-lilac-deep border-lilac-deep" : "bg-white/60 border-ink/25"
                  }`}
                >
                  {agreed && (
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-paper" stroke="currentColor" fill="none">
                      <path d="M5 12.5l4.5 4.5L19 7.5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="text-xs text-ink/65 leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-lilac-deep hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-lilac-deep hover:underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={!agreed}
                className="relative overflow-hidden w-full rounded-xl bg-lilac-deep text-paper text-sm font-medium py-3 shadow-lg shadow-lilac-deep/30 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-lilac-deep/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg group"
              >
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative">Create Account</span>
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-ink/50 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-lilac-deep hover:underline font-medium">
              Sign in
            </a>
          </p>
          <p className="text-center text-xs text-ink/50 mt-2">
            <a href="/" className="text-lilac-deep hover:underline">
              Back to the storefront
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}