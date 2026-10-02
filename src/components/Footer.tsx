export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 pt-6 border-t border-ink/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ink/40">
      <p>
        &copy; {currentYear} <span className="font-medium text-ink/55">Ssebbale Stitches</span>. All rights reserved.
      </p>

      <div className="flex items-center gap-4">
        <a href="/privacy" className="hover:text-lilac-deep transition-colors">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:text-lilac-deep transition-colors">
          Terms of Service
        </a>
        <a href="/help" className="hover:text-lilac-deep transition-colors">
          Help Center
        </a>
      </div>
    </footer>
  );
}