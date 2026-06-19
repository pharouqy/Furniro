import { SlidersHorizontal, LayoutGrid, Grip } from "lucide-react";
import { useToastStore } from "@/common/stores/toastStore";

export default function ToolBare({
  show,
  handleShow,
  sortBy = "default",
  handleSort = () => {},
  start,
  end,
  totalProducts,
}) {
  const addToast = useToastStore((state) => state.addToast);
  return (
    <div className="w-full border-y border-[var(--color-border)] bg-[var(--color-primary-subtle)]">
      <div className="container-page flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between lg:justify-start lg:gap-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => addToast("Filters feature coming soon", "info")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-elevated)] px-5 py-2.5 text-sm font-bold text-[var(--color-text)] transition-all duration-300 hover:border-[var(--color-text)] hover:shadow-md active:scale-95 shadow-sm"
            >
              <SlidersHorizontal size={16} className="text-[var(--color-primary)]" />
              Filter
            </button>
            <span className="hidden sm:block h-6 w-px bg-[var(--color-border)]" />
            <div className="flex items-center gap-2">
              <button
                aria-label="Grid view"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] transition-all duration-300 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-sm active:scale-95 shadow-sm"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                aria-label="Compact grid view"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] transition-all duration-300 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-sm active:scale-95 shadow-sm"
              >
                <Grip size={16} />
              </button>
            </div>
          </div>

          <p className="text-sm font-semibold text-[var(--color-text-muted)]">
            Showing <span className="text-[var(--color-text)]">{totalProducts === 0 ? 0 : start + 1}</span>–<span className="text-[var(--color-text)]">{Math.min(end, totalProducts)}</span> of <span className="text-[var(--color-text)]">{totalProducts}</span> results
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <label className="flex items-center gap-3 text-sm font-bold text-[var(--color-text)]">
            Show
            <input
              type="number"
              id="show"
              value={show}
              min="1"
              className="w-16 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-center text-sm font-bold text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] transition-all duration-300 shadow-sm"
              onChange={(e) => handleShow(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-3 text-sm font-bold text-[var(--color-text)]">
            Sort by
            <select
              id="sort"
              name="sort"
              value={sortBy}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2 text-sm font-bold text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] transition-all duration-300 min-w-44 shadow-sm"
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
