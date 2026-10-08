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
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  Pending: "bg-ink/5 text-ink/60",
  Confirmed: "bg-lilac/15 text-lilac-deep",
  "In Progress": "bg-amber-50 text-amber-700",
  "Ready for Fitting": "bg-sky-50 text-sky-700",
  "Ready for Pickup": "bg-lilac-deep/10 text-lilac-deep",
  Completed: "bg-emerald-50 text-emerald-700",
};

const ORDERS: Order[] = [
  { id: "#SS-1042", customer: "Grace Nakato", item: "Wedding gown — bespoke", status: "In Progress", amount: "UGX 850,000", due: "Aug 4" },
  { id: "#SS-1041", customer: "Brian Kato", item: "3-piece suit", status: "Ready for Fitting", amount: "UGX 620,000", due: "Aug 2" },
  { id: "#SS-1040", customer: "Esther Namono", item: "Kids occasion set (x2)", status: "Confirmed", amount: "UGX 210,000", due: "Aug 6" },
  { id: "#SS-1039", customer: "Daniel Mugisha", item: "Suit hire — Navy, size 40", status: "Ready for Pickup", amount: "UGX 95,000", due: "Jul 31" },
  { id: "#SS-1038", customer: "Patricia Auma", item: "Corset dress", status: "Pending", amount: "UGX 340,000", due: "Aug 9" },
];

const NEW_LEADS = [
  { name: "Patricia Auma", note: "Asked about corset pricing" },
  { name: "Joseph Ochieng", note: "Wants a kanzu fitting" },
];

const FILES = [
  { name: "Measurement Guide", meta: "PDF · 1.2MB" },
  { name: "Price List 2026", meta: "PDF · 640KB" },
  { name: "Fabric Catalogue", meta: "PDF · 3.4MB" },
];

// ── ICONS ─────────────────────────────────────────────────
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" fill="none">
    <rect x="4" y="5.5" width="16" height="14" rx="2" strokeWidth="1.6" />
    <path d="M4 9.5h16M8 3.5v3M16 3.5v3" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconScissors = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" fill="none">
    <circle cx="6" cy="6" r="2.5" strokeWidth="1.6" />
    <circle cx="6" cy="18" r="2.5" strokeWidth="1.6" />
    <path d="M8 8l12 10M8 16L20 6" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconCoin = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" fill="none">
    <circle cx="12" cy="12" r="8.5" strokeWidth="1.6" />
    <path d="M15 9.5c-.6-.9-1.7-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2c-1.3 0-2.4-.6-3-1.5M12 6.5v11" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconHanger = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" fill="none">
    <path d="M12 7.5a1.8 1.8 0 1 1 1.8 1.8H12M3 10l9-4.5 9 4.5-8 3.2v6.3M4 20h16" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" fill="none">
    <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

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
                  Overview
                </p>
                <h1 className="font-display font-semibold text-xl">
                  Good afternoon, Isaac.
                </h1>
              </div>
            </div>

            {/* TOP STAT CARDS WITH ICONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Total Bookings"
                value="128"
                sublabel="This month"
                variant="default"
                icon={<IconCalendar />}
              />
              <StatCard
                label="Active Orders"
                value="18"
                sublabel="In progress"
                variant="muted"
                icon={<IconScissors />}
              />
              <StatCard
                label="Revenue"
                value="6.2M"
                sublabel="UGX this month"
                variant="primary"
                icon={<IconCoin />}
              />
              <StatCard
                label="Suits on Hire"
                value="9 / 20"
                sublabel="Available"
                variant="default"
                icon={<IconHanger />}
              />
            </div>

            {/* MAIN GRID: LEFT + RIGHT RAIL */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
              {/* LEFT / CENTER COLUMN */}
              <div className="space-y-6 min-w-0">
                {/* ORDER HISTORY */}
                <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-ink/8">
                    <h2 className="font-display font-semibold text-base">
                      Order history
                    </h2>
                    <button className="text-xs text-lilac-deep font-medium hover:underline">
                      View all orders
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
                          <th className="font-medium px-5 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ORDERS.map((order) => (
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
                                    {order.item}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-ink/60 hidden sm:table-cell whitespace-nowrap">
                              {order.amount}
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-5 py-3.5 border-t border-ink/8 text-center">
                    <button className="text-xs text-ink/45 hover:text-lilac-deep transition-colors">
                      View all orders
                    </button>
                  </div>
                </div>

                {/* QUICK FILES */}
                <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                    Quick files
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {FILES.map((file) => (
                      <div
                        key={file.name}
                        className="flex items-center justify-between rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 transition-colors duration-200 cursor-pointer"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-medium truncate">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-ink/40">{file.meta}</p>
                        </div>
                        <IconDownload />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT RAIL */}
              <div className="space-y-5">
                {/* PROGRESS */}
                <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                    Business at a glance
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink/50">Consultations</span>
                      <span className="font-medium">42</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink/5 overflow-hidden">
                      <div className="h-full w-[65%] bg-lilac-deep rounded-full" />
                    </div>

                    <div className="flex items-center justify-between text-sm pt-1">
                      <span className="text-ink/50">Suits on hire</span>
                      <span className="font-medium">9 / 20</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink/5 overflow-hidden">
                      <div className="h-full w-[45%] bg-lilac rounded-full" />
                    </div>

                    <div className="flex items-center justify-between text-sm pt-1">
                      <span className="text-ink/50">Orders completed</span>
                      <span className="font-medium">22</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink/5 overflow-hidden">
                      <div className="h-full w-[85%] bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* NEW LEADS */}
                <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35">
                      New inquiries
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-lilac-deep animate-pulse" />
                  </div>
                  <div className="space-y-3.5">
                    {NEW_LEADS.map((lead) => (
                      <div key={lead.name} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-display font-semibold text-[11px] shrink-0">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {lead.name}
                          </p>
                          <p className="text-[11px] text-ink/45 truncate">
                            {lead.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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