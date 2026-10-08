import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import Modals, { type ModalType } from "../components/modals/Modals";

type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "In Progress"
  | "Completed"
  | "Cancelled";

type BookingType = "Fitting" | "Consultation" | "Measurement" | "Delivery";

type SortOption = "Newest" | "Oldest" | "Longest" | "Shortest";

interface Booking {
  id: string;
  client: string;
  type: BookingType;
  status: BookingStatus;
  date: string;
  time: string;
  duration: string;
  durationMins: number;
  notes: string;
}

const STATUS_STYLES: Record<BookingStatus, string> = {
  Pending: "bg-ink/5 text-ink/60",
  Confirmed: "bg-lilac/15 text-lilac-deep",
  "In Progress": "bg-amber-50 text-amber-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-600",
};

const FILTERS: Array<{ label: string; value: BookingStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

const BOOKINGS: Booking[] = [
  { id: "#BK-201", client: "Grace Nakato", type: "Fitting", status: "Confirmed", date: "Aug 2", time: "10:00 AM", duration: "45 min", durationMins: 45, notes: "Wedding gown — first fitting" },
  { id: "#BK-202", client: "Brian Kato", type: "Measurement", status: "In Progress", date: "Aug 2", time: "11:30 AM", duration: "30 min", durationMins: 30, notes: "3-piece suit measurements" },
  { id: "#BK-203", client: "Esther Namono", type: "Consultation", status: "Pending", date: "Aug 3", time: "2:00 PM", duration: "20 min", durationMins: 20, notes: "Discuss kids occasion set design" },
  { id: "#BK-204", client: "Daniel Mugisha", type: "Delivery", status: "Confirmed", date: "Aug 4", time: "9:00 AM", duration: "15 min", durationMins: 15, notes: "Navy suit — size 40 delivery" },
  { id: "#BK-205", client: "Patricia Auma", type: "Fitting", status: "Completed", date: "Jul 31", time: "4:00 PM", duration: "45 min", durationMins: 45, notes: "Corset dress final fitting" },
  { id: "#BK-206", client: "Joseph Ochieng", type: "Fitting", status: "Confirmed", date: "Aug 5", time: "3:00 PM", duration: "45 min", durationMins: 45, notes: "Kanzu fitting" },
  { id: "#BK-207", client: "Sandra Akello", type: "Consultation", status: "Pending", date: "Aug 6", time: "11:00 AM", duration: "30 min", durationMins: 30, notes: "Bridesmaid dresses consultation" },
];

// ── ICONS ─────────────────────────────────────────────────
const IconPlus = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M12 5v14M5 12h14" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconBlock = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <rect x="5" y="5" width="14" height="14" rx="2" strokeWidth="1.6" />
    <path d="M9 9h6v6H9z" strokeWidth="1.6" />
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <rect x="4" y="5.5" width="16" height="14" rx="2" strokeWidth="1.6" />
    <path d="M4 9.5h16M8 3.5v3M16 3.5v3" strokeWidth="1.6" strokeLinecap="round" />
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

const IconScissors = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <circle cx="6" cy="6" r="2.5" strokeWidth="1.6" />
    <circle cx="6" cy="18" r="2.5" strokeWidth="1.6" />
    <path d="M8 8l12 10M8 16L20 6" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconChat = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6Z" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const IconRuler = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <rect x="3" y="8" width="18" height="8" rx="1.5" strokeWidth="1.6" />
    <path d="M7 8v3M11 8v3M15 8v3M19 8v3" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconBox = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M4 8.5V16l8 4.5 8-4.5V8.5" strokeWidth="1.6" />
  </svg>
);

const TYPE_ICONS: Record<BookingType, React.ReactNode> = {
  Fitting: <IconScissors />,
  Consultation: <IconChat />,
  Measurement: <IconRuler />,
  Delivery: <IconBox />,
};

export default function BookingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  // Filters & pagination
  const [activeFilter, setActiveFilter] = useState<BookingStatus | "All">("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("Newest");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const filteredBookings = useMemo(() => {
    let list = [...BOOKINGS];

    if (activeFilter !== "All") {
      list = list.filter((b) => b.status === activeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.client.toLowerCase().includes(q) ||
          b.notes.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "Longest":
        list.sort((a, b) => b.durationMins - a.durationMins);
        break;
      case "Shortest":
        list.sort((a, b) => a.durationMins - b.durationMins);
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

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Compute pipeline counts from BOOKINGS
  const pipeline = {
    pending: BOOKINGS.filter((b) => b.status === "Pending").length,
    confirmed: BOOKINGS.filter(
      (b) => b.status === "Confirmed" || b.status === "In Progress"
    ).length,
    done: BOOKINGS.filter((b) => b.status === "Completed").length,
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
                  Bookings
                </p>
                <h1 className="font-display font-semibold text-xl">
                  Manage your schedule.
                </h1>
              </div>
              <button className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs font-medium text-ink/60 hover:border-ink/20 transition-colors">
                This week
                <IconChevron />
              </button>
            </div>

            {/* TOP STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Today"
                value="6"
                sublabel="Scheduled slots"
                variant="primary"
              />
              <StatCard
                label="This Week"
                value={BOOKINGS.length.toString()}
                sublabel="Bookings"
                variant="default"
              />
              <StatCard
                label="Pending"
                value={pipeline.pending.toString()}
                sublabel="Awaiting confirmation"
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
                      Schedule booking
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 text-xs font-medium transition-colors">
                      <IconBlock />
                      Block time slot
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 text-xs font-medium transition-colors">
                      <IconCalendar />
                      View calendar
                    </button>
                  </div>
                </div>

                {/* Pipeline summary */}
                <div className="lg:w-72 lg:border-l lg:border-ink/8 lg:pl-8">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-3">
                    Pipeline
                  </p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-display font-semibold text-xl">
                        {pipeline.pending}
                      </p>
                      <p className="text-[10px] text-ink/45">Pending</p>
                    </div>
                    <div className="w-px h-8 bg-ink/8" />
                    <div>
                      <p className="font-display font-semibold text-xl">
                        {pipeline.confirmed}
                      </p>
                      <p className="text-[10px] text-ink/45">Confirmed</p>
                    </div>
                    <div className="w-px h-8 bg-ink/8" />
                    <div>
                      <p className="font-display font-semibold text-xl">
                        {pipeline.done}
                      </p>
                      <p className="text-[10px] text-ink/45">Done</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOOKINGS TABLE */}
            <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              {/* HEADER + SEARCH + SORT + FILTERS */}
              <div className="px-5 py-4 border-b border-ink/8 space-y-3">
                {/* Row 1: Title + Search + Sort + Export */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display font-semibold text-base">
                      All bookings
                    </h2>
                    <p className="text-[11px] text-ink/45 mt-0.5">
                      {filteredBookings.length} booking
                      {filteredBookings.length === 1 ? "" : "s"}
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
                        placeholder="Search bookings..."
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
                        <option value="Longest">Longest</option>
                        <option value="Shortest">Shortest</option>
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
                      <th className="font-medium px-5 py-3">Client</th>
                      <th className="font-medium px-5 py-3 hidden sm:table-cell">
                        Type
                      </th>
                      <th className="font-medium px-5 py-3 hidden md:table-cell">
                        Date & Time
                      </th>
                      <th className="font-medium px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBookings.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-5 py-10 text-center text-xs text-ink/45"
                        >
                          No bookings match these filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedBookings.map((b) => (
                        <tr
                          key={b.id}
                          className="border-t border-ink/5 hover:bg-ink/[0.015] transition-colors"
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-lilac/15 text-lilac-deep flex items-center justify-center font-display font-semibold text-[11px] shrink-0">
                                {b.client
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium truncate">{b.client}</p>
                                <p className="text-[11px] text-ink/45 truncate">
                                  {b.id} · {b.notes}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 hidden sm:table-cell text-ink/60 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5">
                              {TYPE_ICONS[b.type]}
                              {b.type}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 hidden md:table-cell text-ink/60 whitespace-nowrap">
                            <div>
                              <p>{b.date}</p>
                              <p className="text-[11px] text-ink/45">
                                {b.time} · {b.duration}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${
                                STATUS_STYLES[b.status]
                              }`}
                            >
                              {b.status}
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