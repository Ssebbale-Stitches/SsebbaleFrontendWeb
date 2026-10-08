import { useState } from "react";
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

interface Order {
  id: string;
  customer: string;
  item: string;
  status: OrderStatus;
  amount: string;
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
  { label: "In Progress", value: "In Progress" },
  { label: "Ready for Fitting", value: "Ready for Fitting" },
  { label: "Ready for Pickup", value: "Ready for Pickup" },
  { label: "Completed", value: "Completed" },
];

const ORDERS: Order[] = [
  { id: "#SS-1042", customer: "Grace Nakato", item: "Wedding gown — bespoke", status: "In Progress", amount: "UGX 850,000", due: "Aug 4", paid: false },
  { id: "#SS-1041", customer: "Brian Kato", item: "3-piece suit", status: "Ready for Fitting", amount: "UGX 620,000", due: "Aug 2", paid: true },
  { id: "#SS-1040", customer: "Esther Namono", item: "Kids occasion set (x2)", status: "Confirmed", amount: "UGX 210,000", due: "Aug 6", paid: false },
  { id: "#SS-1039", customer: "Daniel Mugisha", item: "Suit hire — Navy, size 40", status: "Ready for Pickup", amount: "UGX 95,000", due: "Jul 31", paid: true },
  { id: "#SS-1038", customer: "Patricia Auma", item: "Corset dress", status: "Pending", amount: "UGX 340,000", due: "Aug 9", paid: false },
  { id: "#SS-1037", customer: "Joseph Ochieng", item: "Kanzu — custom", status: "Completed", amount: "UGX 280,000", due: "Jul 28", paid: true },
  { id: "#SS-1036", customer: "Sandra Akello", item: "Bridesmaid dresses (x4)", status: "In Progress", amount: "UGX 1,200,000", due: "Aug 12", paid: false },
];

const UPCOMING_DEADLINES = [
  { customer: "Daniel Mugisha", item: "Suit hire pickup", when: "Today" },
  { customer: "Brian Kato", item: "Fitting session", when: "Tomorrow" },
  { customer: "Grace Nakato", item: "Wedding gown due", when: "Aug 4" },
];

export default function OrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "All">("All");

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  const filteredOrders =
    activeFilter === "All"
      ? ORDERS
      : ORDERS.filter((o) => o.status === activeFilter);

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
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            {/* LEFT / CENTER COLUMN */}
            <div className="space-y-6 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-lilac-deep mb-1">
                    Orders
                  </p>
                  <h1 className="font-display font-semibold text-xl">
                    Track every order.
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
                  label="Active Orders"
                  value="18"
                  sublabel="In progress"
                  variant="primary"
                />
                <StatCard
                  label="Awaiting Pickup"
                  value="4"
                  sublabel="Ready now"
                  variant="default"
                />
                <StatCard
                  label="Overdue"
                  value="1"
                  sublabel="Past due date"
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

              {/* ORDERS TABLE */}
              <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-ink/8">
                  <h2 className="font-display font-semibold text-base">
                    All orders
                  </h2>
                  <button className="text-xs text-lilac-deep font-medium hover:underline">
                    Export CSV
                  </button>
                </div>

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
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-5 py-10 text-center text-xs text-ink/45"
                          >
                            No orders match this filter.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
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

                <div className="px-5 py-3.5 border-t border-ink/8 text-center">
                  <button className="text-xs text-ink/45 hover:text-lilac-deep transition-colors">
                    Load more orders
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT RAIL */}
            <div className="space-y-5">
              {/* UPCOMING DEADLINES */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35">
                    Upcoming deadlines
                  </p>
                  <span className="w-1.5 h-1.5 rounded-full bg-lilac-deep animate-pulse" />
                </div>
                <div className="space-y-3.5">
                  {UPCOMING_DEADLINES.map((d) => (
                    <div key={d.customer} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-display font-semibold text-[11px] shrink-0">
                        {d.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {d.customer}
                        </p>
                        <p className="text-[11px] text-ink/45 truncate">
                          {d.item} · {d.when}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ORDER PIPELINE */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Order pipeline
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Pending", value: "3", pct: "8%" },
                    { label: "In progress", value: "10", pct: "45%" },
                    { label: "Ready for fitting", value: "6", pct: "25%" },
                    { label: "Ready for pickup", value: "4", pct: "15%" },
                    { label: "Completed", value: "22", pct: "100%" },
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
                    { label: "New order", icon: "＋" },
                    { label: "Bulk update status", icon: "⇅" },
                    { label: "Send receipts", icon: "✉" },
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