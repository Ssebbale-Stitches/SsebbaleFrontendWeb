import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import Modals, { type ModalType } from "../components/modals/Modals";

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "In Progress"
  | "Ready for Fitting"
  | "Ready for Pickup"
  | "Completed";

type SortOption = "Newest" | "Oldest" | "Highest value" | "Lowest value";

interface Order {
  id: string;
  customer: string;
  item: string;
  status: OrderStatus;
  amount: string;
  amountValue: number;
  due: string;
  paid: boolean;
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  Pending: "bg-ink/5 text-ink/60",
  Confirmed: "bg-lilac/15 text-lilac-deep",
  "In Progress": "bg-amber-50 text-amber-700",
  "Ready for Fitting": "bg-sky-50 text-sky-700",
  "Ready for Pickup": "bg-lilac-deep/10 text-lilac-deep",
  Completed: "bg-emerald-50 text-emerald-700",
};

const FILTERS: Array<{ label: string; value: OrderStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "In Progress", value: "In Progress" },
  { label: "Ready for Fitting", value: "Ready for Fitting" },
  { label: "Ready for Pickup", value: "Ready for Pickup" },
  { label: "Completed", value: "Completed" },
];

const ORDERS: Order[] = [
  { id: "#SS-1042", customer: "Grace Nakato", item: "Wedding gown — bespoke", status: "In Progress", amount: "UGX 850,000", amountValue: 850000, due: "Aug 4", paid: false },
  { id: "#SS-1041", customer: "Brian Kato", item: "3-piece suit", status: "Ready for Fitting", amount: "UGX 620,000", amountValue: 620000, due: "Aug 2", paid: true },
  { id: "#SS-1040", customer: "Esther Namono", item: "Kids occasion set (x2)", status: "Confirmed", amount: "UGX 210,000", amountValue: 210000, due: "Aug 6", paid: false },
  { id: "#SS-1039", customer: "Daniel Mugisha", item: "Suit hire — Navy, size 40", status: "Ready for Pickup", amount: "UGX 95,000", amountValue: 95000, due: "Jul 31", paid: true },
  { id: "#SS-1038", customer: "Patricia Auma", item: "Corset dress", status: "Pending", amount: "UGX 340,000", amountValue: 340000, due: "Aug 9", paid: false },
  { id: "#SS-1037", customer: "Joseph Ochieng", item: "Kanzu — custom", status: "Completed", amount: "UGX 280,000", amountValue: 280000, due: "Jul 28", paid: true },
  { id: "#SS-1036", customer: "Sandra Akello", item: "Bridesmaid dresses (x4)", status: "In Progress", amount: "UGX 1,200,000", amountValue: 1200000, due: "Aug 12", paid: false },
  { id: "#SS-1035", customer: "Martha Nabirye", item: "Evening gown", status: "Confirmed", amount: "UGX 460,000", amountValue: 460000, due: "Aug 15", paid: false },
  { id: "#SS-1034", customer: "Ronald Kizza", item: "Agbada set", status: "Pending", amount: "UGX 720,000", amountValue: 720000, due: "Aug 18", paid: false },
  { id: "#SS-1033", customer: "Brenda Nakimuli", item: "Suit — classic black", status: "Ready for Fitting", amount: "UGX 540,000", amountValue: 540000, due: "Aug 3", paid: true },
  { id: "#SS-1032", customer: "Alex Tumusiime", item: "Kanzu — wedding", status: "Completed", amount: "UGX 380,000", amountValue: 380000, due: "Jul 22", paid: true },
];

// ── ICONS ─────────────────────────────────────────────────
const IconPlus = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M12 5v14M5 12h14" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconSort = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M7 4v16m0 0-3-3m3 3 3-3M17 20V4m0 0-3 3m3-3 3 3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.6" />
    <path d="m3 7 9 6 9-6" strokeWidth="1.6" strokeLinecap="round" />
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

export default function OrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  // Filters & pagination
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "All">("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("Newest");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const filteredOrders = useMemo(() => {
    let list = [...ORDERS];

    if (activeFilter !== "All") {
      list = list.filter((o) => o.status === activeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.customer.toLowerCase().includes(q) ||
          o.item.toLowerCase().includes(q) ||
          o.id.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "Highest value":
        list.sort((a, b) => b.amountValue - a.amountValue);
        break;
      case "Lowest value":
        list.sort((a, b) => a.amountValue - b.amountValue);
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

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Compute pipeline counts from ORDERS
  const pipeline = {
    inProgress: ORDERS.filter((o) => o.status === "In Progress").length,
    ready: ORDERS.filter(
      (o) => o.status === "Ready for Fitting" || o.status === "Ready for Pickup"
    ).length,
    done: ORDERS.filter((o) => o.status === "Completed").length,
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
                  Orders
                </p>
                <h1 className="font-display font-semibold text-xl">
                  Track every order.
                </h1>
              </div>
            </div>

            {/* TOP STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Active Orders"
                value={ORDERS.filter(
                  (o) =>
                    o.status === "In Progress" ||
                    o.status === "Confirmed" ||
                    o.status === "Ready for Fitting"
                ).length.toString()}
                sublabel="In progress"
                variant="primary"
              />
              <StatCard
                label="Awaiting Pickup"
                value={ORDERS.filter((o) => o.status === "Ready for Pickup")
                  .length.toString()}
                sublabel="Ready now"
                variant="default"
              />
              <StatCard
                label="Completed"
                value={ORDERS.filter((o) => o.status === "Completed")
                  .length.toString()}
                sublabel="All time"
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
                      New order
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 text-xs font-medium transition-colors">
                      <IconSort />
                      Bulk update status
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 text-xs font-medium transition-colors">
                      <IconMail />
                      Send receipts
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
                        {pipeline.inProgress}
                      </p>
                      <p className="text-[10px] text-ink/45">In progress</p>
                    </div>
                    <div className="w-px h-8 bg-ink/8" />
                    <div>
                      <p className="font-display font-semibold text-xl">
                        {pipeline.ready}
                      </p>
                      <p className="text-[10px] text-ink/45">Ready</p>
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

            {/* ORDERS TABLE */}
            <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              {/* HEADER + SEARCH + SORT + FILTERS */}
              <div className="px-5 py-4 border-b border-ink/8 space-y-3">
                {/* Row 1: Title + Search + Sort + Export */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display font-semibold text-base">
                      All orders
                    </h2>
                    <p className="text-[11px] text-ink/45 mt-0.5">
                      {filteredOrders.length} order
                      {filteredOrders.length === 1 ? "" : "s"}
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
                        placeholder="Search orders..."
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
                        <option value="Highest value">Highest value</option>
                        <option value="Lowest value">Lowest value</option>
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
                      <th className="font-medium px-5 py-3">Order</th>
                      <th className="font-medium px-5 py-3 hidden sm:table-cell">
                        Amount
                      </th>
                      <th className="font-medium px-5 py-3 hidden md:table-cell">
                        Due
                      </th>
                      <th className="font-medium px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-5 py-10 text-center text-xs text-ink/45"
                        >
                          No orders match these filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-t border-ink/5 hover:bg-ink/[0.015] transition-colors"
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-lilac/15 text-lilac-deep flex items-center justify-center font-display font-semibold text-[11px] shrink-0">
                                {order.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium truncate">
                                  {order.customer}
                                </p>
                                <p className="text-[11px] text-ink/45 truncate">
                                  {order.id} · {order.item}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 hidden sm:table-cell text-ink/60 whitespace-nowrap">
                            <div>
                              <p>{order.amount}</p>
                              <p className="text-[10px] text-ink/40">
                                {order.paid ? "Paid" : "Unpaid"}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 hidden md:table-cell text-ink/60 whitespace-nowrap">
                            {order.due}
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${
                                STATUS_STYLES[order.status]
                              }`}
                            >
                              {order.status}
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