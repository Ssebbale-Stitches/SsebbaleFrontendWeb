import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

type BookingType =
  | "Fitting"
  | "Consultation"
  | "Measurement"
  | "Delivery";

interface Booking {
  id: string;
  client: string;
  type: BookingType;
  status: BookingStatus;
  date: string;
  time: string;
  duration: string;
  notes: string;
}

const STATUS_STYLES: Record<BookingStatus, string> = {
  Pending: "bg-ink/5 text-ink/60",
  Confirmed: "bg-lilac/15 text-lilac-deep",
  "In Progress": "bg-amber-50 text-amber-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-600",
};

const TYPE_ICONS: Record<BookingType, string> = {
  Fitting: "✂️",
  Consultation: "💬",
  Measurement: "📏",
  Delivery: "📦",
};

const BOOKINGS: Booking[] = [
  {
    id: "#BK-201",
    client: "Grace Nakato",
    type: "Fitting",
    status: "Confirmed",
    date: "Aug 2",
    time: "10:00 AM",
    duration: "45 min",
    notes: "Wedding gown — first fitting",
  },
  {
    id: "#BK-202",
    client: "Brian Kato",
    type: "Measurement",
    status: "In Progress",
    date: "Aug 2",
    time: "11:30 AM",
    duration: "30 min",
    notes: "3-piece suit measurements",
  },
  {
    id: "#BK-203",
    client: "Esther Namono",
    type: "Consultation",
    status: "Pending",
    date: "Aug 3",
    time: "2:00 PM",
    duration: "20 min",
    notes: "Discuss kids occasion set design",
  },
  {
    id: "#BK-204",
    client: "Daniel Mugisha",
    type: "Delivery",
    status: "Confirmed",
    date: "Aug 4",
    time: "9:00 AM",
    duration: "15 min",
    notes: "Navy suit — size 40 delivery",
  },
  {
    id: "#BK-205",
    client: "Patricia Auma",
    type: "Fitting",
    status: "Completed",
    date: "Jul 31",
    time: "4:00 PM",
    duration: "45 min",
    notes: "Corset dress final fitting",
  },
];

const UPCOMING = [
  { client: "Grace Nakato", type: "Fitting", when: "Today · 10:00 AM" },
  { client: "Brian Kato", type: "Measurement", when: "Today · 11:30 AM" },
  { client: "Esther Namono", type: "Consultation", when: "Tomorrow · 2:00 PM" },
];

export default function BookingsPage() {
  const [activeNav, setActiveNav] = useState("Bookings");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  const navigate = useNavigate();

  // Keep sidebar navigation in sync with routes
  const handleNavChange = (label: string) => {
    setActiveNav(label);
    if (label === "Overview") navigate("/dashboard");
    if (label === "Bookings") navigate("/bookings");
    // Other pages can be wired later
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
                    Bookings
                  </p>
                  <h1 className="font-display font-semibold text-xl">
                    Manage your schedule.
                  </h1>
                </div>
                <button className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs font-medium text-ink/60 hover:border-ink/20 transition-colors">
                  This week
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
                  label="Today"
                  value="6"
                  sublabel="Scheduled slots"
                  variant="primary"
                />
                <StatCard
                  label="This Week"
                  value="24"
                  sublabel="Bookings"
                  variant="default"
                />
                <StatCard
                  label="Pending"
                  value="3"
                  sublabel="Awaiting confirmation"
                  variant="muted"
                />
              </div>

              {/* BOOKINGS TABLE */}
              <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-ink/8">
                  <h2 className="font-display font-semibold text-base">
                    Upcoming bookings
                  </h2>
                  <button className="text-xs text-lilac-deep font-medium hover:underline">
                    View all
                  </button>
                </div>

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
                      {BOOKINGS.map((b) => (
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
                                  {b.notes}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 hidden sm:table-cell text-ink/60 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5">
                              <span>{TYPE_ICONS[b.type]}</span>
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
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-5 py-3.5 border-t border-ink/8 text-center">
                  <button className="text-xs text-ink/45 hover:text-lilac-deep transition-colors">
                    Load more bookings
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT RAIL */}
            <div className="space-y-5">
              {/* TODAY'S AGENDA */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35">
                    Next up
                  </p>
                  <span className="w-1.5 h-1.5 rounded-full bg-lilac-deep animate-pulse" />
                </div>
                <div className="space-y-3.5">
                  {UPCOMING.map((u) => (
                    <div key={u.client} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-lilac/15 text-lilac-deep flex items-center justify-center font-display font-semibold text-[11px] shrink-0">
                        {u.client
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{u.client}</p>
                        <p className="text-[11px] text-ink/45 truncate">
                          {u.type} · {u.when}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOOKING SUMMARY */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Weekly breakdown
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Fittings", value: "12", pct: "50%" },
                    { label: "Consultations", value: "6", pct: "25%" },
                    { label: "Measurements", value: "4", pct: "17%" },
                    { label: "Deliveries", value: "2", pct: "8%" },
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
                    { label: "Schedule booking", icon: "＋" },
                    { label: "Block time slot", icon: "◼" },
                    { label: "View calendar", icon: "📅" },
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