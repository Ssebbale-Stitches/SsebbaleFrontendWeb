import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import Modals, { type ModalType } from "../components/modals/Modals";

type CustomerTier = "New" | "Regular" | "VIP";
type CustomerStatus = "Active" | "Inactive";
type SortOption = "Newest" | "Oldest" | "Spend: high" | "Spend: low";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  tier: CustomerTier;
  status: CustomerStatus;
  orders: number;
  spend: string;
  spendValue: number;
  lastOrder: string;
}

const TIER_STYLES: Record<CustomerTier, string> = {
  New: "bg-sky-50 text-sky-700",
  Regular: "bg-lilac/15 text-lilac-deep",
  VIP: "bg-amber-50 text-amber-700",
};

const STATUS_STYLES: Record<CustomerStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-ink/5 text-ink/50",
};

const FILTERS: Array<{ label: string; value: CustomerTier | "All" }> = [
  { label: "All", value: "All" },
  { label: "New", value: "New" },
  { label: "Regular", value: "Regular" },
  { label: "VIP", value: "VIP" },
];

const CUSTOMERS: Customer[] = [
  { id: "#CU-201", name: "Grace Nakato", phone: "+256 772 123 456", email: "grace@example.com", tier: "VIP", status: "Active", orders: 8, spend: "UGX 4,200,000", spendValue: 4200000, lastOrder: "Aug 4" },
  { id: "#CU-202", name: "Brian Kato", phone: "+256 701 555 234", email: "brian@example.com", tier: "Regular", status: "Active", orders: 3, spend: "UGX 1,860,000", spendValue: 1860000, lastOrder: "Aug 2" },
  { id: "#CU-203", name: "Esther Namono", phone: "+256 788 444 111", email: "esther@example.com", tier: "New", status: "Active", orders: 1, spend: "UGX 210,000", spendValue: 210000, lastOrder: "Aug 6" },
  { id: "#CU-204", name: "Daniel Mugisha", phone: "+256 750 999 888", email: "daniel@example.com", tier: "Regular", status: "Active", orders: 5, spend: "UGX 2,100,000", spendValue: 2100000, lastOrder: "Jul 31" },
  { id: "#CU-205", name: "Patricia Auma", phone: "+256 713 222 333", email: "patricia@example.com", tier: "VIP", status: "Active", orders: 12, spend: "UGX 6,800,000", spendValue: 6800000, lastOrder: "Aug 9" },
  { id: "#CU-206", name: "Joseph Ochieng", phone: "+256 704 111 777", email: "joseph@example.com", tier: "Regular", status: "Inactive", orders: 2, spend: "UGX 560,000", spendValue: 560000, lastOrder: "Jun 14" },
  { id: "#CU-207", name: "Sandra Akello", phone: "+256 776 888 999", email: "sandra@example.com", tier: "New", status: "Active", orders: 1, spend: "UGX 1,200,000", spendValue: 1200000, lastOrder: "Aug 8" },
];

// ── ICONS ─────────────────────────────────────────────────
const IconPlus = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M12 5v14M5 12h14" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.6" />
    <path d="m3 7 9 6 9-6" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

export default function CustomersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  // Filters & pagination
  const [activeFilter, setActiveFilter] = useState<CustomerTier | "All">("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("Newest");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const filteredCustomers = useMemo(() => {
    let list = [...CUSTOMERS];

    if (activeFilter !== "All") {
      list = list.filter((c) => c.tier === activeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "Spend: high":
        list.sort((a, b) => b.spendValue - a.spendValue);
        break;
      case "Spend: low":
        list.sort((a, b) => a.spendValue - b.spendValue);
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

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Compute pipeline counts from CUSTOMERS
  const pipeline = {
    total: CUSTOMERS.length,
    vip: CUSTOMERS.filter((c) => c.tier === "VIP").length,
    active: CUSTOMERS.filter((c) => c.status === "Active").length,
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
                  Customers
                </p>
                <h1 className="font-display font-semibold text-xl">
                  Your people.
                </h1>
              </div>
              <button className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs font-medium text-ink/60 hover:border-ink/20 transition-colors">
                All time
                <IconChevron />
              </button>
            </div>

            {/* TOP STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Total Customers"
                value={pipeline.total.toString()}
                sublabel="All time"
                variant="primary"
              />
              <StatCard
                label="Active"
                value={pipeline.active.toString()}
                sublabel="Currently active"
                variant="default"
              />
              <StatCard
                label="VIP Clients"
                value={pipeline.vip.toString()}
                sublabel="Top tier"
                variant="muted"
              />
            </div>

            {/* QUICK ACTIONS + SUMMARY */}
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
                      Add customer
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 text-xs font-medium transition-colors">
                      <IconMail />
                      Send bulk message
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 text-xs font-medium transition-colors">
                      <IconDownload />
                      Export contacts
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="lg:w-72 lg:border-l lg:border-ink/8 lg:pl-8">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-3">
                    Summary
                  </p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-display font-semibold text-xl">
                        {pipeline.total}
                      </p>
                      <p className="text-[10px] text-ink/45">Total</p>
                    </div>
                    <div className="w-px h-8 bg-ink/8" />
                    <div>
                      <p className="font-display font-semibold text-xl">
                        {pipeline.active}
                      </p>
                      <p className="text-[10px] text-ink/45">Active</p>
                    </div>
                    <div className="w-px h-8 bg-ink/8" />
                    <div>
                      <p className="font-display font-semibold text-xl">
                        {pipeline.vip}
                      </p>
                      <p className="text-[10px] text-ink/45">VIP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CUSTOMERS TABLE */}
            <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              {/* HEADER + SEARCH + SORT + FILTERS */}
              <div className="px-5 py-4 border-b border-ink/8 space-y-3">
                {/* Row 1: Title + Search + Sort + Export */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display font-semibold text-base">
                      Customer directory
                    </h2>
                    <p className="text-[11px] text-ink/45 mt-0.5">
                      {filteredCustomers.length} customer
                      {filteredCustomers.length === 1 ? "" : "s"}
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
                        placeholder="Search customers..."
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
                        <option value="Spend: high">Spend: high</option>
                        <option value="Spend: low">Spend: low</option>
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
                      <th className="font-medium px-5 py-3">Customer</th>
                      <th className="font-medium px-5 py-3 hidden sm:table-cell">
                        Tier
                      </th>
                      <th className="font-medium px-5 py-3 hidden md:table-cell">
                        Orders
                      </th>
                      <th className="font-medium px-5 py-3 hidden lg:table-cell">
                        Spend
                      </th>
                      <th className="font-medium px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCustomers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-10 text-center text-xs text-ink/45"
                        >
                          No customers match these filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedCustomers.map((c) => (
                        <tr
                          key={c.id}
                          className="border-t border-ink/5 hover:bg-ink/[0.015] transition-colors"
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-lilac/15 text-lilac-deep flex items-center justify-center font-display font-semibold text-[11px] shrink-0">
                                {c.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium truncate">{c.name}</p>
                                <p className="text-[11px] text-ink/45 truncate">
                                  {c.phone}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 hidden sm:table-cell whitespace-nowrap">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                TIER_STYLES[c.tier]
                              }`}
                            >
                              {c.tier}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 hidden md:table-cell text-ink/60 whitespace-nowrap">
                            <div>
                              <p>{c.orders}</p>
                              <p className="text-[10px] text-ink/40">
                                Last: {c.lastOrder}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 hidden lg:table-cell text-ink/60 whitespace-nowrap">
                            {c.spend}
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${
                                STATUS_STYLES[c.status]
                              }`}
                            >
                              {c.status}
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