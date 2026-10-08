import { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import Modals, { type ModalType } from "../components/modals/Modals";

const ACTIVITY = [
  { action: "Logged in from Chrome on Windows", when: "Today · 9:31 AM" },
  { action: "Marked order #SS-1039 as ready for pickup", when: "Yesterday · 5:42 PM" },
  { action: "Added 3 new products to catalogue", when: "2 days ago" },
  { action: "Updated business profile settings", when: "3 days ago" },
  { action: "Created account", when: "Jan 12, 2026" },
];

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: "Isaac Ssebbale",
    email: "isaac@ssebbalestitches.com",
    phone: "+256 772 123 456",
    role: "Tailor",
    business: "Ssebbale Stitches",
    location: "Kampala, Uganda",
  });

  // 👇 Profile image state + file input ref
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    // TODO: wire up to API
    console.log("Saved profile:", { ...form, profileImage });
  };

  // 👇 Handle image file selection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 👇 Compute initials as fallback
  const initials = form.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

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
                    Profile
                  </p>
                  <h1 className="font-display font-semibold text-xl">
                    Your account.
                  </h1>
                </div>
                <button
                  onClick={() => setEditing(!editing)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
                    editing
                      ? "bg-white border-ink/10 text-ink/60 hover:border-ink/20 hover:text-ink"
                      : "bg-lilac-deep border-lilac-deep text-paper hover:opacity-90"
                  }`}
                >
                  {editing ? "Cancel" : "Edit profile"}
                </button>
              </div>

              {/* PROFILE HERO */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 md:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  {/* AVATAR WITH UPLOAD */}
                  <div className="relative shrink-0 group">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={form.fullName}
                        className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-[0_4px_12px_-4px_rgba(106,86,176,0.4)]"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-lilac-deep text-paper flex items-center justify-center font-display font-semibold text-2xl border-2 border-white shadow-[0_4px_12px_-4px_rgba(106,86,176,0.4)]">
                        {initials}
                      </div>
                    )}

                    {/* Online indicator */}
                    <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />

                    {/* Camera overlay button */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      aria-label="Upload profile image"
                      className="absolute inset-0 rounded-full bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        stroke="currentColor"
                        fill="none"
                      >
                        <path
                          d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.6a1 1 0 0 0 .8-.4l.8-1a1 1 0 0 1 .8-.4h5a1 1 0 0 1 .8.4l.8 1a1 1 0 0 0 .8.4h1.6A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-9Z"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="13" r="3.2" strokeWidth="1.6" />
                      </svg>
                    </button>

                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-display font-semibold text-lg text-ink">
                      {form.fullName}
                    </h2>
                    <p className="text-xs text-ink/50 mt-0.5">
                      {form.role} · {form.business}
                    </p>
                    <p className="text-[11px] text-ink/40 mt-1">
                      {form.email} · {form.phone}
                    </p>

                    {/* Upload / Remove buttons */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[11px] font-medium text-lilac-deep hover:underline"
                      >
                        {profileImage ? "Change photo" : "Upload photo"}
                      </button>
                      {profileImage && (
                        <>
                          <span className="text-ink/20">·</span>
                          <button
                            onClick={() => setProfileImage(null)}
                            className="text-[11px] font-medium text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* EDITABLE INFO */}
              <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="px-5 py-4 border-b border-ink/8">
                  <h2 className="font-display font-semibold text-base">
                    Personal information
                  </h2>
                </div>

                <form onSubmit={handleSave} className="p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium text-ink/55 mb-1.5">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        disabled={!editing}
                        className="w-full rounded-lg bg-ink/[0.03] border border-ink/8 px-3 py-2.5 text-sm outline-none focus:border-lilac-deep focus:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-ink/55 mb-1.5">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={!editing}
                        className="w-full rounded-lg bg-ink/[0.03] border border-ink/8 px-3 py-2.5 text-sm outline-none focus:border-lilac-deep focus:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-ink/55 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        disabled={!editing}
                        className="w-full rounded-lg bg-ink/[0.03] border border-ink/8 px-3 py-2.5 text-sm outline-none focus:border-lilac-deep focus:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-ink/55 mb-1.5">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={form.role}
                        disabled
                        className="w-full rounded-lg bg-ink/[0.03] border border-ink/8 px-3 py-2.5 text-sm outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-ink/55 mb-1.5">
                        Business name
                      </label>
                      <input
                        type="text"
                        name="business"
                        value={form.business}
                        onChange={handleChange}
                        disabled={!editing}
                        className="w-full rounded-lg bg-ink/[0.03] border border-ink/8 px-3 py-2.5 text-sm outline-none focus:border-lilac-deep focus:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-ink/55 mb-1.5">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        disabled={!editing}
                        className="w-full rounded-lg bg-ink/[0.03] border border-ink/8 px-3 py-2.5 text-sm outline-none focus:border-lilac-deep focus:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {editing && (
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="px-4 py-2 rounded-lg text-xs font-medium text-ink/60 hover:text-ink hover:bg-ink/[0.05] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg text-xs font-medium bg-lilac-deep text-paper hover:opacity-90 transition-opacity"
                      >
                        Save changes
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* RECENT ACTIVITY */}
              <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="px-5 py-4 border-b border-ink/8">
                  <h2 className="font-display font-semibold text-base">
                    Recent activity
                  </h2>
                </div>

                <div className="divide-y divide-ink/5">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="px-5 py-3.5 flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-lilac-deep mt-2 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-ink/80">{a.action}</p>
                        <p className="text-[10px] text-ink/40 mt-0.5">
                          {a.when}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT RAIL */}
            <div className="space-y-5">
              {/* QUICK STATS */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Your activity
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <StatCard label="Orders" value="42" variant="default" />
                  <StatCard label="Bookings" value="18" variant="primary" />
                  <StatCard label="Clients" value="86" variant="muted" />
                  <StatCard label="Products" value="48" variant="default" />
                </div>
              </div>

              {/* SECURITY */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Security
                </p>
                <div className="space-y-2.5">
                  <button className="w-full flex items-center justify-between rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 transition-colors duration-200">
                    <span className="text-xs font-medium">Change password</span>
                    <span className="text-xs">🔒</span>
                  </button>
                  <button className="w-full flex items-center justify-between rounded-xl bg-red-50 hover:bg-red-100 text-red-600 px-3.5 py-2.5 transition-colors duration-200">
                    <span className="text-xs font-medium">Delete account</span>
                    <span className="text-xs">⚠️</span>
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