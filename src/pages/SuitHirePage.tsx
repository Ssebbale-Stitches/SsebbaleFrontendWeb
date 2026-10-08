import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import Modals, { type ModalType } from "../components/modals/Modals";

type SuitStatus = "Available" | "On Hire" | "Reserved" | "Maintenance";
type SuitSize = "S" | "M" | "L" | "XL" | "XXL";
type SortOption = "Newest" | "Oldest" | "Rate: high" | "Rate: low";

interface Suit {
  id: string;
  name: string;
  size: SuitSize;
  color: string;
  status: SuitStatus;
  rate: string;
  rateValue: number;
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
  { id: "#SH-001", name: "Classic Navy Suit", size: "L", color: "Navy", status: "On Hire", rate: "UGX 95,000 / day", rateValue: 95000, rentedTo: "Daniel Mugisha", dueBack: "Jul 31" },
  { id: "#SH-002", name: "Charcoal 3-Piece", size: "M", color: "Charcoal", status: "Available", rate: "UGX 120,000 / day", rateValue: 120000 },
  { id: "#SH-003", name: "Black Tuxedo", size: "L", color: "Black", status: "Reserved", rate: "UGX 150,000 / day", rateValue: 150000, rentedTo: "Joseph Ochieng", dueBack: "Aug 6" },
  { id: "#SH-004", name: "Beige Linen Suit", size: "M", color: "Beige", status: "Available", rate: "UGX 85,000 / day", rateValue: 85000 },
  { id: "#SH-005", name: "Burgundy Velvet", size: "S", color: "Burgundy", status: "Maintenance", rate: "UGX 130,000 / day", rateValue: 130000 },
  { id: "#SH-006", name: "Grey Slim Fit", size: "XL", color: "Grey", status: "On Hire", rate: "UGX 100,000 / day", rateValue: 100000, rentedTo: "Brian Kato", dueBack: "Aug 2" },
  { id: "#SH-007", name: "Ivory Wedding Suit", size: "L", color: "Ivory", status: "Reserved", rate: "UGX 180,000 / day", rateValue: 180000, rentedTo: "Grace Nakato", dueBack: "Aug 4" },
  { id: "#SH-008", name: "Midnight Blue Tux", size: "M", color: "Midnight Blue", status: "Available", rate: "UGX 160,000 / day", rateValue: 160000 },
  { id: "#SH-009", name: "Olive Green Suit", size: "L", color: "Olive", status: "On Hire", rate: "UGX 110,000 / day", rateValue: 110000, rentedTo: "Alex Tumusiime", dueBack: "Aug 8" },
];

// ── ICONS ─────────────────────────────────────────────────
const IconPlus = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M12 5v14M5 12h14" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconReturn = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M9 14 5 10l4-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10h10a5 5 0 0 1 0 10h-3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTool = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M14.7 6.3a4 4 0 1 1 5 5l-9.4 9.4a2 2 0 1 1-2.8-2.8l9.4-9.4z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <circle cx="11" cy="11" r="7" strokeWidth="1.6" />
    <path d="M20 20l-3.2-3.2" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconChevron = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M6 9l6 6 6-6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" fill="none">
    <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function SuitHirePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  // Filters & pagination
  const [activeFilter, setActiveFilter] = useState<SuitStatus | "All">("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("Newest");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const filteredSuits = useMemo(() => {
    let list = [...SUITS];

    if (activeFilter !== "All") {
      list = list.filter((s) => s.status === activeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.color.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          (s.rentedTo?.toLowerCase().includes(q) ?? false)
      );
    }

    switch (sort) {
      case "Rate: high":
        list.sort((a, b) => b.rateValue - a.rateValue);
        break;
      case "Rate: low":
        list.sort((a, b) => a.rateValue - b.rateValue);
        break;
      case "Oldest":
        list.reverse();
        break;
      case "Newest":
      default:
        break;
    }

    return list;
  }, [activeFilter, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredSuits.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedSuits = filteredSuits.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Compute pipeline counts from SUITS
  const pipeline = {
    available: SUITS.filter((s) => s.status === "Available").length,
    onHire: SUITS.filter((s) => s.status === "On Hire").length,
    reserved: SUITS.filter((s) => s.status === "Reserved").length,
    maintenance: SUITS.filter((s) => s.status === "Maintenance").length,
  };

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
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={() => setActiveModal("confirm-logout")}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0 flex flex-col relative z-10 h-screen overflow-hidden">
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto px-5 md:px-8 pb-8">
          <div className="space-y-6">
            {/* HEADER */}
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
                <IconChevron />
              </button>
            </div>

            {/* TOP STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Available"
                value={pipeline.available.toString()}
                sublabel="Ready to rent"
                variant="primary"
              />
              <StatCard
                label="On Hire"
                value={pipeline.onHire.toString()}
                sublabel="Currently rented"
                variant="default"
              />
              <StatCard
                label="Reserved"
                value={pipeline.reserved.toString()}
                sublabel="Upcoming bookings"
                variant="muted"
              />
            </div>

            {/* QUICK ACTIONS + PIPELINE */}
            <div className="rounded-2xl bg-white border border-ink/8 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                {/* Quick actions */}
                <div className="flex-1 min-w-0">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-3">
                    Quick actions
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button className="inline-flex items-center gap-2 rounded-xl bg-lilac-deep text-paper px-3.5 py-2.5 text-xs font-medium hover:opacity-90 transition-opacity">
                      <IconPlus />
                      New rental
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 text-xs font-medium transition-colors">
                      <IconReturn />
                      Return a suit
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 text-xs font-medium transition-colors">
                      <IconTool />
                      Mark maintenance
                    </button>
                  </div>
                </div>

                {/* Pipeline summary */}
                <div className="lg:w-72 lg:border-l lg:border-ink/8 lg:pl-8">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-3">
                    Inventory
                  </p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-display font-semibold text-xl">
                        {pipeline.available}
                      </p>
                      <p className="text-[10px] text-ink/45">Available</p>
                    </div>
                    <div className="w-px h-8 bg-ink/8" />
                    <div>
                      <p className="font-display font-semibold text-xl">
                        {pipeline.onHire}
                      </p>
                      <p className="text-[10px] text-ink/45">On hire</p>
                    </div>
                    <div className="w-px h-8 bg-ink/8" />
                    <div>
                      <p className="font-display font-semibold text-xl">
                        {pipeline.maintenance}
                      </p>
                      <p className="text-[10px] text-ink/45">Service</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SUITS TABLE */}
            <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              {/* HEADER + SEARCH + SORT + FILTERS */}
              <div className="px-5 py-4 border-b border-ink/8 space-y-3">
                {/* Row 1: Title + Search + Sort + Export */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display font-semibold text-base">
                      Suit inventory
                    </h2>
                    <p className="text-[11px] text-ink/45 mt-0.5">
                      {filteredSuits.length} suit
                      {filteredSuits.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35">
                        <IconSearch />
                      </div>
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setPage(1);
                        }}
                        placeholder="Search suits..."
                        className="w-full sm:w-56 rounded-lg bg-ink/[0.03] border border-ink/8 pl-9 pr-3 py-2 text-xs outline-none focus:border-lilac-deep focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                        className="appearance-none rounded-lg bg-ink/[0.03] border border-ink/8 pl-3 pr-8 py-2 text-xs outline-none focus:border-lilac-deep focus:bg-white transition-colors cursor-pointer"
                      >
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                        <option value="Rate: high">Rate: high</option>
                        <option value="Rate: low">Rate: low</option>
                      </select>
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none">
                        <IconChevron />
                      </div>
                    </div>

                    <button className="inline-flex items-center gap-1.5 rounded-lg bg-ink/[0.03] hover:bg-ink/[0.06] px-3 py-2 text-xs font-medium transition-colors">
                      <IconDownload />
                      <span className="hidden sm:inline">Export</span>
                    </button>
                  </div>
                </div>

                {/* Row 2: Filter pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {FILTERS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => {
                        setActiveFilter(f.value);
                        setPage(1);
                      }}
                      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors ${
                        activeFilter === f.value
                          ? "bg-lilac-deep text-paper border-lilac-deep"
                          : "bg-ink/[0.03] text-ink/60 border-ink/10 hover:border-ink/20 hover:text-ink"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* TABLE */}
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
                    {paginatedSuits.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-10 text-center text-xs text-ink/45"
                        >
                          No suits match these filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedSuits.map((suit) => (
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

              {/* PAGINATION */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-ink/8">
                <div className="flex items-center gap-2 text-[11px] text-ink/50">
                  <span>Rows:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setPage(1);
                    }}
                    className="appearance-none rounded-md bg-ink/[0.03] border border-ink/8 px-2 py-1 text-[11px] cursor-pointer outline-none focus:border-lilac-deep"
                  >
                    {[5, 10, 20, 50].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <span>
                    · Page {currentPage} of {totalPages}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="rounded-md px-2.5 py-1.5 text-xs font-medium text-ink/60 hover:bg-ink/[0.05] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`min-w-[28px] rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                        currentPage === i + 1
                          ? "bg-lilac-deep text-paper"
                          : "text-ink/60 hover:bg-ink/[0.05]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-md px-2.5 py-1.5 text-xs font-medium text-ink/60 hover:bg-ink/[0.05] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
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