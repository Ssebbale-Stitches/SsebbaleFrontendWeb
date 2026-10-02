import logo from "../assets/images/Business-logo.jpeg";

const NAV = [
  {
    label: "Overview",
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1.5" strokeWidth="1.6" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" strokeWidth="1.6" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" strokeWidth="1.6" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" strokeWidth="1.6" />
      </>
    ),
  },
  {
    label: "Orders",
    icon: (
      <>
        <rect x="4" y="5.5" width="16" height="14" rx="2" strokeWidth="1.6" />
        <path d="M4 9.5h16M8 3.5v3M16 3.5v3" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Bookings",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" strokeWidth="1.6" />
        <path d="M12 7.5V12l3 2" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Suit Hire",
    icon: (
      <path
        d="M12 5.5a1.8 1.8 0 1 1 1.8 1.8H12M3 10l9-4.5 9 4.5-8 3.2v6.3M4 20h16"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Products",
    icon: (
      <>
        <path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M4 8.5V16l8 4.5 8-4.5V8.5M12 13v7.5" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Customers",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" strokeWidth="1.6" />
        <path d="M5 20c1.5-4 4.2-6 7-6s5.5 2 7 6" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
];

interface SidebarProps {
  activeNav: string;
  setActiveNav: (label: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
}

export default function Sidebar({ 
  activeNav, 
  setActiveNav, 
  sidebarOpen, 
  setSidebarOpen,
  onLogout,
}: SidebarProps) {
  return (
    <aside
      className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 shrink-0 bg-white border-r border-ink/8 flex flex-col z-50 transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="flex items-center gap-2.5 px-6 py-6">
        <img src={logo} alt="Ssebbale Stitches" className="h-9 w-auto rounded-full object-cover" />
        <span className="font-display font-semibold text-sm text-ink">Ssebbale Stitches</span>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-1">
        {NAV.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setActiveNav(item.label);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
              activeNav === item.label
                ? "bg-lilac-deep text-paper"
                : "text-ink/55 hover:text-ink hover:bg-ink/[0.04]"
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 shrink-0" stroke="currentColor" fill="none">
              {item.icon}
            </svg>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-4 space-y-1">
        <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-ink/55 hover:text-ink hover:bg-ink/[0.04] transition-colors duration-200">
          <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 shrink-0" stroke="currentColor" fill="none">
            <path
              d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Support
        </button>

        {/* LOGOUT BUTTON */}
        <button  onClick={onLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-ink/55 hover:text-red-500 hover:bg-red-50 transition-colors duration-200">
          <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 shrink-0" stroke="currentColor" fill="none">
            <path
              d="M15 16l4-4m0 0l-4-4m4 4H9M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Logout
        </button>
      </div>

      <div className="mx-3 mb-5 rounded-2xl bg-gradient-to-br from-lilac-deep to-ink p-4 text-paper relative overflow-hidden">
        <div className="pointer-events-none absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />
        <p className="font-display font-semibold text-sm mb-1 relative">Need a hand?</p>
        <p className="text-[11px] text-paper/70 mb-3 relative leading-relaxed">
          Reach the Ssebbale Stitches team anytime.
        </p>
        <a
          href="/#book"
          className="relative inline-block w-full text-center rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 px-3 py-2 text-xs font-medium transition-colors duration-200"
        >
          Contact us
        </a>
      </div>
    </aside>
  );
}