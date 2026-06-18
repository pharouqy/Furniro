import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faSliders, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";

export default function ToolBare({
  show,
  handleShow,
  sortBy = "default",
  handleSort = () => {},
  start,
  end,
  totalProducts,
}) {
  return (
    <div className="w-full border-y border-neutral-100 bg-[#FDF9F3]">
      <div className="container-page flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between lg:justify-start lg:gap-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Filters feature coming soon!")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-bold text-neutral-800 transition-all hover:border-neutral-900 active:scale-95 shadow-sm"
            >
              <FontAwesomeIcon icon={faSliders} className="text-[#B88E2F]" />
              Filter
            </button>
            <span className="hidden sm:block h-6 w-px bg-neutral-300" />
            <div className="flex items-center gap-2">
              <button
                aria-label="Grid view"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition-colors hover:border-[#B88E2F] hover:text-[#B88E2F] active:scale-95 shadow-sm"
              >
                <FontAwesomeIcon icon={faTableCellsLarge} />
              </button>
              <button
                aria-label="Compact grid view"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition-colors hover:border-[#B88E2F] hover:text-[#B88E2F] active:scale-95 shadow-sm"
              >
                <FontAwesomeIcon icon={faGrip} />
              </button>
            </div>
          </div>

          <p className="text-sm font-semibold text-neutral-500">
            Showing <span className="text-neutral-900">{totalProducts === 0 ? 0 : start + 1}</span>–<span className="text-neutral-900">{Math.min(end, totalProducts)}</span> of <span className="text-neutral-900">{totalProducts}</span> results
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <label className="flex items-center gap-3 text-sm font-bold text-neutral-700">
            Show
            <input
              type="number"
              id="show"
              value={show}
              min="1"
              className="w-16 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-center text-sm font-bold text-neutral-800 focus:border-[#B88E2F] focus:outline-none focus:ring-2 focus:ring-[#B88E2F]/15 transition-all shadow-sm"
              onChange={(e) => handleShow(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-3 text-sm font-bold text-neutral-700">
            Sort by
            <select
              id="sort"
              name="sort"
              value={sortBy}
              className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-bold text-neutral-800 focus:border-[#B88E2F] focus:outline-none focus:ring-2 focus:ring-[#B88E2F]/15 transition-all min-w-44 shadow-sm"
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
