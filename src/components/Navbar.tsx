interface NavbarProps {
  onOpenSidebar: () => void;
}

export default function Navbar({ onOpenSidebar }: NavbarProps) {
  return (
    <header className="flex items-center gap-3 px-5 md:px-8 py-5 shrink-0 bg-transparent">
      <button
        className="md:hidden text-ink/70"
        aria-label="Open menu"
        onClick={onOpenSidebar}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" stroke="currentColor" fill="none">
          <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <div className="relative flex-1 max-w-md">
        <svg
          viewBox="0 0 24 24"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/35"
          stroke="currentColor"
          fill="none"
        >
          <circle cx="11" cy="11" r="7" strokeWidth="1.6" />
          <path d="M20 20l-3.2-3.2" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search orders, customers..."
          className="w-full rounded-full bg-white border border-ink/8 pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-ink/35 outline-none transition-all duration-300 focus:border-lilac-deep focus:shadow-[0_0_0_4px_rgba(106,86,176,0.1)]"
        />
      </div>

      <button className="hidden sm:flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs font-medium text-ink/60 hover:text-ink hover:border-ink/20 transition-colors">
        Filter
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
          <path d="M6 9l6 6 6-6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        aria-label="Notifications"
        className="relative w-9 h-9 rounded-full bg-white border border-ink/8 flex items-center justify-center text-ink/60 hover:text-ink transition-colors shrink-0"
      >
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" stroke="currentColor" fill="none">
          <path
            d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-lilac-deep" />
      </button>

      <div className="w-9 h-9 rounded-full bg-lilac-deep text-paper flex items-center justify-center font-display font-semibold text-sm shrink-0">
        I
      </div>
    </header>
  );
}