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

const OTP_LENGTH = 6;
const RESEND_SECONDS = 45;

export default function OtpVerificationPage() {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const card = useReveal<HTMLDivElement>(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const code = digits.join("");
  const isComplete = digits.every((d) => d !== "");

  const setDigitAt = (index: number, value: string) => {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "");
    if (!clean) {
      setDigitAt(index, "");
      return;
    }
    setError(false);
    // handle a full paste landing in one field
    if (clean.length > 1) {
      const chars = clean.slice(0, OTP_LENGTH - index).split("");
      setDigits((prev) => {
        const next = [...prev];
        chars.forEach((c, i) => {
          if (index + i < OTP_LENGTH) next[index + i] = c;
        });
        return next;
      });
      const lastIndex = Math.min(index + chars.length, OTP_LENGTH - 1);
      inputRefs.current[lastIndex]?.focus();
      return;
    }
    setDigitAt(index, clean);
    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((c, i) => (next[i] = c));
    setDigits(next);
    setError(false);
    const lastIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;

    // TODO: replace with your real verification call, e.g.
    // const ok = await verifyOtp(code);
    // if (!ok) { setError(true); return; }
    console.log("Verifying code:", code);

    setSubmitted(true);
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    // wire up to your resend-code logic
    setSecondsLeft(RESEND_SECONDS);
    setDigits(Array(OTP_LENGTH).fill(""));
    setError(false);
    inputRefs.current[0]?.focus();
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
                  Verification
                </span>
              </span>

              <h1 className="font-display font-semibold text-[clamp(1.7rem,3.4vw,2.3rem)] leading-tight text-paper mb-2.5">
                Enter your code.
              </h1>
              <p className="text-paper/60 text-sm max-w-sm mb-8 leading-relaxed">
                We sent a 6-digit verification code to your email. Enter it below to continue.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between gap-2.5 sm:gap-3.5 mb-2">
                  {digits.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        inputRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={OTP_LENGTH}
                      value={digit}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onPaste={handlePaste}
                      className={`w-full aspect-square max-w-[3.2rem] rounded-xl bg-white/10 backdrop-blur-md border text-center text-lg font-display font-semibold text-paper outline-none transition-all duration-300 focus:bg-white/15 ${
                        error
                          ? "border-red-400/60 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(248,113,113,0.15)]"
                          : "border-white/15 focus:border-lilac-light focus:shadow-[0_0_0_4px_rgba(184,168,232,0.15)]"
                      }`}
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-[11px] text-red-400 mb-4">That code didn't work. Try again.</p>
                )}

                <button
                  type="submit"
                  disabled={!isComplete}
                  className="relative overflow-hidden w-full rounded-xl bg-lilac-deep text-paper text-sm font-medium py-3 mt-4 shadow-lg shadow-lilac-deep/40 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 group"
                >
                  <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative">Verify Code</span>
                </button>
              </form>

              <p className="text-center text-xs text-paper/45 mt-6">
                Didn't get a code?{" "}
                {secondsLeft > 0 ? (
                  <span className="text-paper/35">Resend in {secondsLeft}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-lilac-light hover:underline font-medium"
                  >
                    Resend code
                  </button>
                )}
              </p>
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

              <h1 className="font-display font-semibold text-xl text-paper mb-2">Verified.</h1>
              <p className="text-paper/60 text-sm max-w-xs mb-8 leading-relaxed">
                Your code checked out. You're good to continue.
              </p>

              <a
                href="/login"
                className="relative overflow-hidden inline-block px-7 py-3 rounded-full bg-lilac-deep text-paper text-sm font-medium shadow-lg shadow-lilac-deep/30 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Continue
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}