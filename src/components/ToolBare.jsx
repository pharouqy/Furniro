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
    <div className="w-full border-y border-stone-200 bg-white">
      <div className="container-page flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Filters feature coming soon!")}
              className="btn-secondary px-4 py-2.5"
            >
              <FontAwesomeIcon icon={faSliders} />
              Filter
            </button>
            <button
              aria-label="Grid view"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 text-stone-700 transition-colors hover:border-[#B88E2F] hover:text-[#B88E2F]"
            >
              <FontAwesomeIcon icon={faTableCellsLarge} />
            </button>
            <button
              aria-label="Compact grid view"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 text-stone-700 transition-colors hover:border-[#B88E2F] hover:text-[#B88E2F]"
            >
              <FontAwesomeIcon icon={faGrip} />
            </button>
          </div>

          <p className="text-sm font-medium text-stone-500">
            Showing {totalProducts === 0 ? 0 : start + 1}-{Math.min(end, totalProducts)} of {totalProducts} results
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-3 text-sm font-semibold text-stone-700">
            Show
            <input
              type="number"
              id="show"
              value={show}
              min="1"
              className="field-control h-10 w-20 px-3 py-2 text-center"
              onChange={(e) => handleShow(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-3 text-sm font-semibold text-stone-700">
            Sort by
            <select
              id="sort"
              name="sort"
              value={sortBy}
              className="field-control h-10 min-w-44 px-3 py-2"
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
