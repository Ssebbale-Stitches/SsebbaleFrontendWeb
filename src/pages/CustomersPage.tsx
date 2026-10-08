import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import Modals, { type ModalType } from "../components/modals/Modals";

type CustomerTier = "New" | "Regular" | "VIP";
type CustomerStatus = "Active" | "Inactive";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  tier: CustomerTier;
  status: CustomerStatus;
  orders: number;
  spend: string;
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
  { id: "#CU-201", name: "Grace Nakato", phone: "+256 772 123 456", email: "grace@example.com", tier: "VIP", status: "Active", orders: 8, spend: "UGX 4,200,000", lastOrder: "Aug 4" },
  { id: "#CU-202", name: "Brian Kato", phone: "+256 701 555 234", email: "brian@example.com", tier: "Regular", status: "Active", orders: 3, spend: "UGX 1,860,000", lastOrder: "Aug 2" },
  { id: "#CU-203", name: "Esther Namono", phone: "+256 788 444 111", email: "esther@example.com", tier: "New", status: "Active", orders: 1, spend: "UGX 210,000", lastOrder: "Aug 6" },
  { id: "#CU-204", name: "Daniel Mugisha", phone: "+256 750 999 888", email: "daniel@example.com", tier: "Regular", status: "Active", orders: 5, spend: "UGX 2,100,000", lastOrder: "Jul 31" },
  { id: "#CU-205", name: "Patricia Auma", phone: "+256 713 222 333", email: "patricia@example.com", tier: "VIP", status: "Active", orders: 12, spend: "UGX 6,800,000", lastOrder: "Aug 9" },
  { id: "#CU-206", name: "Joseph Ochieng", phone: "+256 704 111 777", email: "joseph@example.com", tier: "Regular", status: "Inactive", orders: 2, spend: "UGX 560,000", lastOrder: "Jun 14" },
  { id: "#CU-207", name: "Sandra Akello", phone: "+256 776 888 999", email: "sandra@example.com", tier: "New", status: "Active", orders: 1, spend: "UGX 1,200,000", lastOrder: "Aug 8" },
];

const RECENT_ACTIVITY = [
  { customer: "Sandra Akello", action: "Placed a new order", when: "2h ago" },
  { customer: "Patricia Auma", action: "Paid invoice #SS-1038", when: "5h ago" },
  { customer: "Grace Nakato", action: "Booked a fitting", when: "Yesterday" },
];

const TOP_SPENDERS = [
  { name: "Patricia Auma", spend: "UGX 6.8M" },
  { name: "Grace Nakato", spend: "UGX 4.2M" },
  { name: "Daniel Mugisha", spend: "UGX 2.1M" },
];

export default function CustomersPage() {
  const [activeNav, setActiveNav] = useState("Customers");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<CustomerTier | "All">("All");

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  const navigate = useNavigate();

  const handleNavChange = (label: string) => {
    setActiveNav(label);
    if (label === "Overview") navigate("/dashboard");
    if (label === "Bookings") navigate("/bookings");
    if (label === "Orders") navigate("/orders");
    if (label === "Suit Hire") navigate("/suit-hire");
    if (label === "Products") navigate("/products");
    if (label === "Customers") navigate("/customers");
  };

  const filteredCustomers =
    activeFilter === "All"
      ? CUSTOMERS
      : CUSTOMERS.filter((c) => c.tier === activeFilter);

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
                    Customers
                  </p>
                  <h1 className="font-display font-semibold text-xl">
                    Your people.
                  </h1>
                </div>
                <button className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs font-medium text-ink/60 hover:border-ink/20 transition-colors">
                  All time
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
                  label="Total Customers"
                  value="86"
                  sublabel="All time"
                  variant="primary"
                />
                <StatCard
                  label="New This Month"
                  value="12"
                  sublabel="First-time clients"
                  variant="default"
                />
                <StatCard
                  label="VIP Clients"
                  value="9"
                  sublabel="Top 10% spenders"
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

              {/* CUSTOMERS TABLE */}
              <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-ink/8">
                  <h2 className="font-display font-semibold text-base">
                    Customer directory
                  </h2>
                  <button className="text-xs text-lilac-deep font-medium hover:underline">
                    Export CSV
                  </button>
                </div>

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
                      {filteredCustomers.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-5 py-10 text-center text-xs text-ink/45"
                          >
                            No customers match this filter.
                          </td>
                        </tr>
                      ) : (
                        filteredCustomers.map((c) => (
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
                                  <p className="font-medium truncate">
                                    {c.name}
                                  </p>
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

                <div className="px-5 py-3.5 border-t border-ink/8 text-center">
                  <button className="text-xs text-ink/45 hover:text-lilac-deep transition-colors">
                    Load more customers
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT RAIL */}
            <div className="space-y-5">
              {/* RECENT ACTIVITY */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35">
                    Recent activity
                  </p>
                  <span className="w-1.5 h-1.5 rounded-full bg-lilac-deep animate-pulse" />
                </div>
                <div className="space-y-3.5">
                  {RECENT_ACTIVITY.map((a) => (
                    <div key={a.customer} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-lilac/15 text-lilac-deep flex items-center justify-center font-display font-semibold text-[11px] shrink-0">
                        {a.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {a.customer}
                        </p>
                        <p className="text-[11px] text-ink/45 truncate">
                          {a.action} · {a.when}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOP SPENDERS */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Top spenders
                </p>
                <div className="space-y-3">
                  {TOP_SPENDERS.map((s, i) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-display font-semibold ${
                            i === 0
                              ? "bg-amber-100 text-amber-700"
                              : "bg-lilac/15 text-lilac-deep"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <p className="text-sm font-medium truncate">
                          {s.name}
                        </p>
                      </div>
                      <p className="text-xs font-medium text-ink/60">
                        {s.spend}
                      </p>
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
                    { label: "Add customer", icon: "＋" },
                    { label: "Send bulk message", icon: "✉" },
                    { label: "Export contacts", icon: "⤓" },
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