import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import Modals, { type ModalType } from "../components/modals/Modals";

type SuitStatus = "Available" | "On Hire" | "Reserved" | "Maintenance";
type SuitSize = "S" | "M" | "L" | "XL" | "XXL";

interface Suit {
  id: string;
  name: string;
  size: SuitSize;
  color: string;
  status: SuitStatus;
  rate: string;
  rentedTo?: string;
  dueBack?: string;
}

const STATUS_STYLES: Record<SuitStatus, string> = {
  Available: "bg-emerald-50 text-emerald-700",
  "On Hire": "bg-lilac-deep/10 text-lilac-deep",
  Reserved: "bg-sky-50 text-sky-700",
  Maintenance: "bg-amber-50 text-amber-700",
};

const FILTERS: Array<{ label: string; value: SuitStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Available", value: "Available" },
  { label: "On Hire", value: "On Hire" },
  { label: "Reserved", value: "Reserved" },
  { label: "Maintenance", value: "Maintenance" },
];

const SUITS: Suit[] = [
  { id: "#SH-001", name: "Classic Navy Suit", size: "L", color: "Navy", status: "On Hire", rate: "UGX 95,000 / day", rentedTo: "Daniel Mugisha", dueBack: "Jul 31" },
  { id: "#SH-002", name: "Charcoal 3-Piece", size: "M", color: "Charcoal", status: "Available", rate: "UGX 120,000 / day" },
  { id: "#SH-003", name: "Black Tuxedo", size: "L", color: "Black", status: "Reserved", rate: "UGX 150,000 / day", rentedTo: "Joseph Ochieng", dueBack: "Aug 6" },
  { id: "#SH-004", name: "Beige Linen Suit", size: "M", color: "Beige", status: "Available", rate: "UGX 85,000 / day" },
  { id: "#SH-005", name: "Burgundy Velvet", size: "S", color: "Burgundy", status: "Maintenance", rate: "UGX 130,000 / day" },
  { id: "#SH-006", name: "Grey Slim Fit", size: "XL", color: "Grey", status: "On Hire", rate: "UGX 100,000 / day", rentedTo: "Brian Kato", dueBack: "Aug 2" },
  { id: "#SH-007", name: "Ivory Wedding Suit", size: "L", color: "Ivory", status: "Reserved", rate: "UGX 180,000 / day", rentedTo: "Grace Nakato", dueBack: "Aug 4" },
];

const RETURNS_DUE = [
  { customer: "Daniel Mugisha", suit: "Classic Navy Suit", when: "Today" },
  { customer: "Brian Kato", suit: "Grey Slim Fit", when: "Aug 2" },
  { customer: "Grace Nakato", suit: "Ivory Wedding Suit", when: "Aug 4" },
];

export default function SuitHirePage() {
  const [activeNav, setActiveNav] = useState("Suit Hire");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<SuitStatus | "All">("All");

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  const navigate = useNavigate();

  const handleNavChange = (label: string) => {
    setActiveNav(label);
    if (label === "Overview") navigate("/dashboard");
    if (label === "Bookings") navigate("/bookings");
    if (label === "Orders") navigate("/orders");
    if (label === "Suit Hire") navigate("/suit-hire");
  };

  const filteredSuits =
    activeFilter === "All"
      ? SUITS
      : SUITS.filter((s) => s.status === activeFilter);

  return (
    <div className="min-h-screen w-full bg-[#f3f1fa] flex relative">
      {/* AMBIENT GRADIENT BLOBS */}
      <div className="pointer-events-none fixed -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-lilac-deep/25 blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-48 -right-32 w-[36rem] h-[36rem] rounded-full bg-lilac/30 blur-[130px]" />
      <div className="pointer-events-none fixed top-1/3 right-10 w-64 h-64 rounded-full bg-amber-200/20 blur-[100px]" />

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-ink/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={handleNavChange}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={() => setActiveModal("confirm-logout")}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0 flex flex-col relative z-10 h-screen overflow-hidden">
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto px-5 md:px-8 pb-8">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            {/* LEFT / CENTER COLUMN */}
            <div className="space-y-6 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-lilac-deep mb-1">
                    Suit Hire
                  </p>
                  <h1 className="font-display font-semibold text-xl">
                    Rentals in motion.
                  </h1>
                </div>
                <button className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs font-medium text-ink/60 hover:border-ink/20 transition-colors">
                  This month
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* TOP STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  label="Available"
                  value="12"
                  sublabel="Ready to rent"
                  variant="primary"
                />
                <StatCard
                  label="On Hire"
                  value="9"
                  sublabel="Currently rented"
                  variant="default"
                />
                <StatCard
                  label="Returns Due"
                  value="3"
                  sublabel="Next 7 days"
                  variant="muted"
                />
              </div>

              {/* FILTER PILLS */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setActiveFilter(f.value)}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors ${
                      activeFilter === f.value
                        ? "bg-lilac-deep text-paper border-lilac-deep"
                        : "bg-white text-ink/60 border-ink/10 hover:border-ink/20 hover:text-ink"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* SUITS TABLE */}
              <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-ink/8">
                  <h2 className="font-display font-semibold text-base">
                    Suit inventory
                  </h2>
                  <button className="text-xs text-lilac-deep font-medium hover:underline">
                    Manage rates
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-ink/40 text-[11px] uppercase tracking-wide">
                        <th className="font-medium px-5 py-3">Suit</th>
                        <th className="font-medium px-5 py-3 hidden sm:table-cell">
                          Size
                        </th>
                        <th className="font-medium px-5 py-3 hidden md:table-cell">
                          Rate
                        </th>
                        <th className="font-medium px-5 py-3 hidden lg:table-cell">
                          Rented To
                        </th>
                        <th className="font-medium px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSuits.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-5 py-10 text-center text-xs text-ink/45"
                          >
                            No suits match this filter.
                          </td>
                        </tr>
                      ) : (
                        filteredSuits.map((suit) => (
                          <tr
                            key={suit.id}
                            className="border-t border-ink/5 hover:bg-ink/[0.015] transition-colors"
                          >
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-lilac/15 text-lilac-deep flex items-center justify-center font-display font-semibold text-[11px] shrink-0">
                                  {suit.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium truncate">
                                    {suit.name}
                                  </p>
                                  <p className="text-[11px] text-ink/45 truncate">
                                    {suit.id} · {suit.color}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 hidden sm:table-cell text-ink/60 whitespace-nowrap">
                              {suit.size}
                            </td>
                            <td className="px-5 py-3.5 hidden md:table-cell text-ink/60 whitespace-nowrap">
                              {suit.rate}
                            </td>
                            <td className="px-5 py-3.5 hidden lg:table-cell text-ink/60 whitespace-nowrap">
                              {suit.rentedTo ? (
                                <div>
                                  <p>{suit.rentedTo}</p>
                                  <p className="text-[10px] text-ink/40">
                                    Due {suit.dueBack}
                                  </p>
                                </div>
                              ) : (
                                <span className="text-ink/30">—</span>
                              )}
                            </td>
                            <td className="px-5 py-3.5">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${
                                  STATUS_STYLES[suit.status]
                                }`}
                              >
                                {suit.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="px-5 py-3.5 border-t border-ink/8 text-center">
                  <button className="text-xs text-ink/45 hover:text-lilac-deep transition-colors">
                    Load more suits
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT RAIL */}
            <div className="space-y-5">
              {/* RETURNS DUE */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35">
                    Returns due
                  </p>
                  <span className="w-1.5 h-1.5 rounded-full bg-lilac-deep animate-pulse" />
                </div>
                <div className="space-y-3.5">
                  {RETURNS_DUE.map((r) => (
                    <div key={r.customer} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-display font-semibold text-[11px] shrink-0">
                        {r.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {r.customer}
                        </p>
                        <p className="text-[11px] text-ink/45 truncate">
                          {r.suit} · {r.when}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* INVENTORY BREAKDOWN */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Inventory breakdown
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Available", value: "12", pct: "55%" },
                    { label: "On hire", value: "9", pct: "40%" },
                    { label: "Reserved", value: "4", pct: "20%" },
                    { label: "Maintenance", value: "2", pct: "10%" },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-ink/50">{row.label}</span>
                        <span className="font-medium">{row.value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-ink/5 overflow-hidden mt-1.5">
                        <div
                          className="h-full bg-lilac-deep rounded-full"
                          style={{ width: row.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Quick actions
                </p>
                <div className="space-y-2.5">
                  {[
                    { label: "New rental", icon: "＋" },
                    { label: "Return a suit", icon: "↩" },
                    { label: "Mark as maintenance", icon: "🛠" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="w-full flex items-center justify-between rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 transition-colors duration-200"
                    >
                      <span className="text-xs font-medium">
                        {action.label}
                      </span>
                      <span className="text-ink/40 text-xs">{action.icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <Modals activeModal={activeModal} closeModal={closeModal} />
    </div>
  );
}