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

// ── CHART DATA ────────────────────────────────────────────
const REVENUE_TREND = [
  { month: "Feb", value: 2.1 },
  { month: "Mar", value: 3.4 },
  { month: "Apr", value: 2.8 },
  { month: "May", value: 4.6 },
  { month: "Jun", value: 5.1 },
  { month: "Jul", value: 4.3 },
  { month: "Aug", value: 6.2 },
];

const ORDER_BREAKDOWN = [
  { label: "Completed", value: 22, color: "#10b981" },
  { label: "In Progress", value: 10, color: "#6a56b0" },
  { label: "Ready for Fitting", value: 6, color: "#8a6fd1" },
  { label: "Ready for Pickup", value: 4, color: "#38bdf8" },
  { label: "Pending", value: 3, color: "#f59e0b" },
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

// ── LINE CHART (SVG) ──────────────────────────────────────
function RevenueLineChart() {
  const w = 600;
  const h = 180;
  const padX = 40;
  const padY = 24;

  const max = Math.max(...REVENUE_TREND.map((d) => d.value));
  const min = 0;

  const points = REVENUE_TREND.map((d, i) => {
    const x = padX + (i / (REVENUE_TREND.length - 1)) * (w - padX * 2);
    const y = h - padY - ((d.value - min) / (max - min)) * (h - padY * 2);
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x},${h - padY} L${points[0].x},${h - padY} Z`;

  return (
    <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-1">
            Revenue trend
          </p>
          <h3 className="font-display font-semibold text-base">
            UGX 6.2M this month
          </h3>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
            ↑ 18% vs last month
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-[11px] text-ink/50 hover:text-ink transition-colors">
            6M
          </button>
          <button className="text-[11px] text-lilac-deep font-medium bg-lilac/15 rounded-full px-2.5 py-1">
            7M
          </button>
          <button className="text-[11px] text-ink/50 hover:text-ink transition-colors">
            1Y
          </button>
        </div>
      </div>

      {/* Chart */}
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-44"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8a6fd1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8a6fd1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = padY + t * (h - padY * 2);
          return (
            <line
              key={t}
              x1={padX}
              y1={y}
              x2={w - padX}
              y2={y}
              stroke="#6a56b0"
              strokeOpacity="0.08"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Area */}
        <path d={areaPath} fill="url(#lineFill)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#6a56b0"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {points.map((p) => (
          <g key={p.month}>
            <circle cx={p.x} cy={p.y} r="6" fill="#6a56b0" fillOpacity="0.15" />
            <circle
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#6a56b0"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </g>
        ))}

        {/* X-axis labels */}
        {points.map((p) => (
          <text
            key={`label-${p.month}`}
            x={p.x}
            y={h - 6}
            textAnchor="middle"
            className="fill-ink/40"
            style={{ fontSize: "10px", fontFamily: "monospace" }}
          >
            {p.month}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ── DONUT CHART (SVG) ─────────────────────────────────────
function OrdersDonutChart() {
  const total = ORDER_BREAKDOWN.reduce((sum, d) => sum + d.value, 0);
  const size = 160;
  const radius = 60;
  const stroke = 20;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  return (
    <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-1">
            Order breakdown
          </p>
          <h3 className="font-display font-semibold text-base">
            {total} active orders
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Donut */}
        <div className="relative shrink-0">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-40 h-40 -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke="#6a56b0"
              strokeOpacity="0.08"
              strokeWidth={stroke}
            />

            {/* Segments */}
            {ORDER_BREAKDOWN.map((slice) => {
              const fraction = slice.value / total;
              const dash = fraction * circumference;
              const gap = circumference - dash;
              const el = (
                <circle
                  key={slice.label}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth={stroke}
                  strokeDasharray={`${dash} ${gap}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                />
              );
              offset += dash;
              return el;
            })}
          </svg>

          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-semibold text-2xl text-ink">
              {total}
            </span>
            <span className="text-[10px] text-ink/45 uppercase tracking-wide">
              Total
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5 min-w-0">
          {ORDER_BREAKDOWN.map((slice) => {
            const pct = Math.round((slice.value / total) * 100);
            return (
              <div
                key={slice.label}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: slice.color }}
                  />
                  <span className="text-xs text-ink/65 truncate">
                    {slice.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-ink">
                    {slice.value}
                  </span>
                  <span className="text-[10px] text-ink/40 w-8 text-right">
                    {pct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">
              <RevenueLineChart />
              <OrdersDonutChart />
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