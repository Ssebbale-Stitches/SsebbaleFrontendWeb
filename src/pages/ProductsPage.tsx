import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import Modals, { type ModalType } from "../components/modals/Modals";

type ProductCategory =
  | "Fabric"
  | "Accessory"
  | "Ready-to-wear"
  | "Custom"
  | "Rental";

type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: string;
  stock: number;
  stockStatus: StockStatus;
  sku: string;
}

const STOCK_STYLES: Record<StockStatus, string> = {
  "In Stock": "bg-emerald-50 text-emerald-700",
  "Low Stock": "bg-amber-50 text-amber-700",
  "Out of Stock": "bg-red-50 text-red-600",
};

const CATEGORY_STYLES: Record<ProductCategory, string> = {
  Fabric: "bg-lilac/15 text-lilac-deep",
  Accessory: "bg-sky-50 text-sky-700",
  "Ready-to-wear": "bg-emerald-50 text-emerald-700",
  Custom: "bg-amber-50 text-amber-700",
  Rental: "bg-ink/5 text-ink/60",
};

const FILTERS: Array<{ label: string; value: ProductCategory | "All" }> = [
  { label: "All", value: "All" },
  { label: "Fabric", value: "Fabric" },
  { label: "Accessory", value: "Accessory" },
  { label: "Ready-to-wear", value: "Ready-to-wear" },
  { label: "Custom", value: "Custom" },
  { label: "Rental", value: "Rental" },
];

const PRODUCTS: Product[] = [
  { id: "#PR-101", name: "Silk Satin — Ivory", category: "Fabric", price: "UGX 85,000 / m", stock: 42, stockStatus: "In Stock", sku: "FAB-SLK-IVR" },
  { id: "#PR-102", name: "Italian Wool — Charcoal", category: "Fabric", price: "UGX 120,000 / m", stock: 8, stockStatus: "Low Stock", sku: "FAB-WOL-CHR" },
  { id: "#PR-103", name: "Lace Trim — Gold", category: "Accessory", price: "UGX 15,000 / m", stock: 0, stockStatus: "Out of Stock", sku: "ACC-LCE-GLD" },
  { id: "#PR-104", name: "Classic Navy Suit", category: "Ready-to-wear", price: "UGX 480,000", stock: 6, stockStatus: "Low Stock", sku: "RTW-SUT-NVY" },
  { id: "#PR-105", name: "Bespoke Wedding Gown", category: "Custom", price: "From UGX 2,500,000", stock: 12, stockStatus: "In Stock", sku: "CUS-GWN-BSP" },
  { id: "#PR-106", name: "Black Tuxedo (Hire)", category: "Rental", price: "UGX 150,000 / day", stock: 4, stockStatus: "Low Stock", sku: "RNT-TUX-BLK" },
  { id: "#PR-107", name: "Cotton Poplin — White", category: "Fabric", price: "UGX 45,000 / m", stock: 65, stockStatus: "In Stock", sku: "FAB-COT-WHT" },
  { id: "#PR-108", name: "Pearl Buttons (pack)", category: "Accessory", price: "UGX 25,000", stock: 0, stockStatus: "Out of Stock", sku: "ACC-BTN-PRL" },
];

const LOW_STOCK = [
  { name: "Italian Wool — Charcoal", left: "8 m left" },
  { name: "Classic Navy Suit", left: "6 pieces left" },
  { name: "Black Tuxedo (Hire)", left: "4 available" },
];

export default function ProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProductCategory | "All">("All");

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  const filteredProducts =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

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
                    Products
                  </p>
                  <h1 className="font-display font-semibold text-xl">
                    Your catalogue.
                  </h1>
                </div>
                <button className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs font-medium text-ink/60 hover:border-ink/20 transition-colors">
                  All categories
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
                  label="Total Products"
                  value="48"
                  sublabel="Across 5 categories"
                  variant="primary"
                />
                <StatCard
                  label="Low Stock"
                  value="3"
                  sublabel="Needs restocking"
                  variant="default"
                />
                <StatCard
                  label="Out of Stock"
                  value="2"
                  sublabel="Unavailable"
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

              {/* PRODUCTS TABLE */}
              <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-ink/8">
                  <h2 className="font-display font-semibold text-base">
                    Product catalogue
                  </h2>
                  <button className="text-xs text-lilac-deep font-medium hover:underline">
                    Manage inventory
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-ink/40 text-[11px] uppercase tracking-wide">
                        <th className="font-medium px-5 py-3">Product</th>
                        <th className="font-medium px-5 py-3 hidden sm:table-cell">
                          Category
                        </th>
                        <th className="font-medium px-5 py-3 hidden md:table-cell">
                          Price
                        </th>
                        <th className="font-medium px-5 py-3 hidden lg:table-cell">
                          Stock
                        </th>
                        <th className="font-medium px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-5 py-10 text-center text-xs text-ink/45"
                          >
                            No products match this filter.
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((product) => (
                          <tr
                            key={product.id}
                            className="border-t border-ink/5 hover:bg-ink/[0.015] transition-colors"
                          >
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-lilac/15 text-lilac-deep flex items-center justify-center font-display font-semibold text-[11px] shrink-0">
                                  {product.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium truncate">
                                    {product.name}
                                  </p>
                                  <p className="text-[11px] text-ink/45 truncate">
                                    {product.sku}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 hidden sm:table-cell whitespace-nowrap">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                  CATEGORY_STYLES[product.category]
                                }`}
                              >
                                {product.category}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 hidden md:table-cell text-ink/60 whitespace-nowrap">
                              {product.price}
                            </td>
                            <td className="px-5 py-3.5 hidden lg:table-cell text-ink/60 whitespace-nowrap">
                              {product.stock}
                            </td>
                            <td className="px-5 py-3.5">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${
                                  STOCK_STYLES[product.stockStatus]
                                }`}
                              >
                                {product.stockStatus}
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
                    Load more products
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT RAIL */}
            <div className="space-y-5">
              {/* LOW STOCK ALERTS */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35">
                    Low stock alerts
                  </p>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                </div>
                <div className="space-y-3.5">
                  {LOW_STOCK.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-display font-semibold text-[11px] shrink-0">
                        {item.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-ink/45 truncate">
                          {item.left}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CATEGORY BREAKDOWN */}
              <div className="rounded-2xl bg-white border border-ink/8 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-4">
                  Category breakdown
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Fabric", value: "18", pct: "75%" },
                    { label: "Accessories", value: "10", pct: "42%" },
                    { label: "Ready-to-wear", value: "8", pct: "33%" },
                    { label: "Custom", value: "6", pct: "25%" },
                    { label: "Rental", value: "6", pct: "25%" },
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
                    { label: "Add product", icon: "＋" },
                    { label: "Bulk restock", icon: "⇪" },
                    { label: "Export inventory", icon: "⤓" },
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