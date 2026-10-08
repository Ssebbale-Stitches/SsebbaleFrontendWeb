import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modals, { type ModalType } from "../components/modals/Modals";

type NotificationType =
  | "order"
  | "booking"
  | "payment"
  | "customer"
  | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const TYPE_STYLES: Record<
  NotificationType,
  { bg: string; text: string; icon: string }
> = {
  order: { bg: "bg-lilac/15", text: "text-lilac-deep", icon: "📦" },
  booking: { bg: "bg-sky-50", text: "text-sky-700", icon: "📅" },
  payment: { bg: "bg-emerald-50", text: "text-emerald-700", icon: "💵" },
  customer: { bg: "bg-amber-100", text: "text-amber-700", icon: "👤" },
  system: { bg: "bg-ink/5", text: "text-ink/60", icon: "⚙️" },
};

const FILTERS: Array<{ label: string; value: "all" | "unread" | "mentions" }> =
  [
    { label: "All", value: "all" },
    { label: "Unread", value: "unread" },
    { label: "Mentions", value: "mentions" },
  ];

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "order",
    title: "New order placed",
    description:
      "Sandra Akello placed order #SS-1036 — Bridesmaid dresses (x4) for UGX 1,200,000.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "n2",
    type: "payment",
    title: "Payment received",
    description:
      "Patricia Auma paid invoice #SS-1038 in full. UGX 340,000 deposited.",
    time: "18 min ago",
    read: false,
  },
  {
    id: "n3",
    type: "booking",
    title: "New booking request",
    description:
      "Joseph Ochieng requested a fitting for Thursday at 4:00 PM.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "n4",
    type: "customer",
    title: "New customer registered",
    description:
      "Esther Namono signed up and placed her first order for a kids occasion set.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "n5",
    type: "order",
    title: "Order marked ready for pickup",
    description:
      "Order #SS-1039 (Daniel Mugisha · Navy suit) is ready for pickup.",
    time: "Yesterday · 5:42 PM",
    read: true,
  },
  {
    id: "n6",
    type: "system",
    title: "Weekly summary ready",
    description:
      "Your weekly business summary for last week is available to view.",
    time: "Yesterday · 8:00 AM",
    read: true,
  },
  {
    id: "n7",
    type: "booking",
    title: "Booking cancelled",
    description:
      "Brian Kato cancelled his measurement session scheduled for Aug 3.",
    time: "2 days ago",
    read: true,
  },
];

export default function NotificationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "mentions">(
    "all"
  );
  const [notifications, setNotifications] =
    useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const filtered = notifications.filter((n) => {
    if (activeFilter === "unread") return !n.read;
    if (activeFilter === "mentions") return n.type === "customer";
    return true;
  });

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
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-lilac-deep mb-1">
                    Notifications
                  </p>
                  <h1 className="font-display font-semibold text-xl">
                    Your activity.
                  </h1>
                  <p className="text-xs text-ink/50 mt-1">
                    {unreadCount > 0
                      ? `You have ${unreadCount} unread notification${
                          unreadCount === 1 ? "" : "s"
                        }.`
                      : "You're all caught up."}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="hidden sm:flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs font-medium text-ink/60 hover:border-ink/20 hover:text-ink transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* FILTER TABS */}
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
                    {f.value === "unread" && unreadCount > 0 && (
                      <span
                        className={`ml-1.5 inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[10px] font-semibold ${
                          activeFilter === "unread"
                            ? "bg-paper text-lilac-deep"
                            : "bg-lilac-deep text-paper"
                        }`}
                      >
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ))}

                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="sm:hidden shrink-0 text-xs text-lilac-deep font-medium hover:underline ml-auto"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* NOTIFICATIONS LIST */}
              <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                {filtered.length === 0 ? (
                  <div className="px-5 py-16 text-center">
                    <div className="w-12 h-12 rounded-full bg-lilac/15 text-lilac-deep flex items-center justify-center mx-auto mb-3 text-xl">
                      🔔
                    </div>
                    <p className="font-display font-semibold text-sm text-ink mb-1">
                      No notifications here
                    </p>
                    <p className="text-xs text-ink/45">
                      You're all caught up on this filter.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-ink/5">
                    {filtered.map((n) => {
                      const style = TYPE_STYLES[n.type];
                      return (
                        <button
                          key={n.id}
                          onClick={() => handleToggleRead(n.id)}
                          className={`w-full text-left flex items-start gap-3.5 px-5 py-4 hover:bg-ink/[0.015] transition-colors ${
                            !n.read ? "bg-lilac/[0.03]" : ""
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0 ${style.bg}`}
                          >
                            {style.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p
                                className={`text-sm truncate ${
                                  !n.read
                                    ? "font-semibold text-ink"
                                    : "font-medium text-ink/75"
                                }`}
                              >
                                {n.title}
                              </p>
                              {!n.read && (
                                <span className="w-1.5 h-1.5 rounded-full bg-lilac-deep shrink-0" />
                              )}
                            </div>
                            <p className="text-[11px] text-ink/55 leading-relaxed line-clamp-2">
                              {n.description}
                            </p>
                            <p className="text-[10px] text-ink/40 mt-1.5">
                              {n.time}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT RAIL */}
            <div className="space-y-5">
              {/* SUMMARY */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Summary
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-lilac-deep text-paper p-3.5">
                    <p className="font-display font-semibold text-xl">
                      {unreadCount}
                    </p>
                    <p className="text-[11px] text-paper/70">Unread</p>
                  </div>
                  <div className="rounded-xl bg-ink/[0.03] p-3.5">
                    <p className="font-display font-semibold text-xl">
                      {notifications.length}
                    </p>
                    <p className="text-[11px] text-ink/45">Total</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { label: "Orders", type: "order" as const },
                    { label: "Bookings", type: "booking" as const },
                    { label: "Payments", type: "payment" as const },
                  ].map((row) => {
                    const count = notifications.filter(
                      (n) => n.type === row.type
                    ).length;
                    const pct = Math.min(
                      100,
                      Math.round((count / notifications.length) * 100)
                    );
                    return (
                      <div key={row.type}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-ink/50">{row.label}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-ink/5 overflow-hidden mt-1.5">
                          <div
                            className="h-full bg-lilac-deep rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PREFERENCES */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Preferences
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Order updates", enabled: true },
                    { label: "Booking reminders", enabled: true },
                    { label: "Payment alerts", enabled: true },
                    { label: "Marketing emails", enabled: false },
                  ].map((pref) => (
                    <label
                      key={pref.label}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-xs text-ink/70">{pref.label}</span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          defaultChecked={pref.enabled}
                          className="peer sr-only"
                        />
                        <div className="w-9 h-5 rounded-full bg-ink/10 peer-checked:bg-lilac-deep transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
                      </div>
                    </label>
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
                    { label: "Mark all read", icon: "✓" },
                    { label: "Clear history", icon: "🗑" },
                    { label: "Notification settings", icon: "⚙" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      onClick={
                        action.label === "Mark all read"
                          ? handleMarkAllRead
                          : undefined
                      }
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