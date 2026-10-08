import { useMemo, useState } from "react";
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
type SortOption = "Newest" | "Oldest" | "Price: high" | "Price: low";

interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: string;
  priceValue: number;
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
  { id: "#PR-101", name: "Silk Satin — Ivory", category: "Fabric", price: "UGX 85,000 / m", priceValue: 85000, stock: 42, stockStatus: "In Stock", sku: "FAB-SLK-IVR" },
  { id: "#PR-102", name: "Italian Wool — Charcoal", category: "Fabric", price: "UGX 120,000 / m", priceValue: 120000, stock: 8, stockStatus: "Low Stock", sku: "FAB-WOL-CHR" },
  { id: "#PR-103", name: "Lace Trim — Gold", category: "Accessory", price: "UGX 15,000 / m", priceValue: 15000, stock: 0, stockStatus: "Out of Stock", sku: "ACC-LCE-GLD" },
  { id: "#PR-104", name: "Classic Navy Suit", category: "Ready-to-wear", price: "UGX 480,000", priceValue: 480000, stock: 6, stockStatus: "Low Stock", sku: "RTW-SUT-NVY" },
  { id: "#PR-105", name: "Bespoke Wedding Gown", category: "Custom", price: "From UGX 2,500,000", priceValue: 2500000, stock: 12, stockStatus: "In Stock", sku: "CUS-GWN-BSP" },
  { id: "#PR-106", name: "Black Tuxedo (Hire)", category: "Rental", price: "UGX 150,000 / day", priceValue: 150000, stock: 4, stockStatus: "Low Stock", sku: "RNT-TUX-BLK" },
  { id: "#PR-107", name: "Cotton Poplin — White", category: "Fabric", price: "UGX 45,000 / m", priceValue: 45000, stock: 65, stockStatus: "In Stock", sku: "FAB-COT-WHT" },
  { id: "#PR-108", name: "Pearl Buttons (pack)", category: "Accessory", price: "UGX 25,000", priceValue: 25000, stock: 0, stockStatus: "Out of Stock", sku: "ACC-BTN-PRL" },
  { id: "#PR-109", name: "Chiffon — Blush Pink", category: "Fabric", price: "UGX 60,000 / m", priceValue: 60000, stock: 24, stockStatus: "In Stock", sku: "FAB-CHF-BLS" },
  { id: "#PR-110", name: "Silk Thread — Gold", category: "Accessory", price: "UGX 8,000 / spool", priceValue: 8000, stock: 3, stockStatus: "Low Stock", sku: "ACC-THR-GLD" },
];

// ── ICONS ─────────────────────────────────────────────────
const IconPlus = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M12 5v14M5 12h14" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconRestock = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" fill="none">
    <path d="M12 4v12m0 0 4-4m-4 4-4-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 20h14" strokeWidth="1.6" strokeLinecap="round" />
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

export default function ProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  // Filters & pagination
  const [activeFilter, setActiveFilter] = useState<ProductCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("Newest");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeFilter !== "All") {
      list = list.filter((p) => p.category === activeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "Price: high":
        list.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case "Price: low":
        list.sort((a, b) => a.priceValue - b.priceValue);
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

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Compute pipeline counts from PRODUCTS
  const pipeline = {
    total: PRODUCTS.length,
    low: PRODUCTS.filter((p) => p.stockStatus === "Low Stock").length,
    out: PRODUCTS.filter((p) => p.stockStatus === "Out of Stock").length,
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
                  Products
                </p>
                <h1 className="font-display font-semibold text-xl">
                  Your catalogue.
                </h1>
              </div>
              <button className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs font-medium text-ink/60 hover:border-ink/20 transition-colors">
                All categories
                <IconChevron />
              </button>
            </div>

            {/* TOP STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Total Products"
                value={pipeline.total.toString()}
                sublabel="Across all categories"
                variant="primary"
              />
              <StatCard
                label="Low Stock"
                value={pipeline.low.toString()}
                sublabel="Needs restocking"
                variant="default"
              />
              <StatCard
                label="Out of Stock"
                value={pipeline.out.toString()}
                sublabel="Unavailable"
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
                      Add product
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 text-xs font-medium transition-colors">
                      <IconRestock />
                      Bulk restock
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] px-3.5 py-2.5 text-xs font-medium transition-colors">
                      <IconDownload />
                      Export inventory
                    </button>
                  </div>
                </div>

                {/* Stock summary */}
                <div className="lg:w-72 lg:border-l lg:border-ink/8 lg:pl-8">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-ink/35 mb-3">
                    Stock summary
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
                        {pipeline.low}
                      </p>
                      <p className="text-[10px] text-ink/45">Low</p>
                    </div>
                    <div className="w-px h-8 bg-ink/8" />
                    <div>
                      <p className="font-display font-semibold text-xl">
                        {pipeline.out}
                      </p>
                      <p className="text-[10px] text-ink/45">Out</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCTS TABLE */}
            <div className="rounded-2xl bg-white border border-ink/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              {/* HEADER + SEARCH + SORT + FILTERS */}
              <div className="px-5 py-4 border-b border-ink/8 space-y-3">
                {/* Row 1: Title + Search + Sort + Export */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display font-semibold text-base">
                      Product catalogue
                    </h2>
                    <p className="text-[11px] text-ink/45 mt-0.5">
                      {filteredProducts.length} product
                      {filteredProducts.length === 1 ? "" : "s"}
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
                        placeholder="Search products..."
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
                        <option value="Price: high">Price: high</option>
                        <option value="Price: low">Price: low</option>
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
                    {paginatedProducts.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-10 text-center text-xs text-ink/45"
                        >
                          No products match these filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedProducts.map((product) => (
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