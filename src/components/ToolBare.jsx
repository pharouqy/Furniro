import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faTableCellsLarge,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";

function ToolBare({ show, handleShow, start, end, totalProducts }) {
    return (
              <div className="flex flex-row justify-between items-center w-full px-10 py-5 bg-amber-100">
        <div className="flex flex-row items-center gap-5">
          <div className="flex flex-row gap-5 items-center border-r-2 pr-5">
            <button>
              <FontAwesomeIcon icon={faSliders} /> Filter
            </button>

            <button>
              <FontAwesomeIcon icon={faTableCellsLarge} />
            </button>

            <button>
              <FontAwesomeIcon icon={faGrip} />
            </button>
          </div>

          <div>
            <span>
              Showing {start + 1}-{Math.min(end, totalProducts)} of{" "}
              {totalProducts}
            </span>
          </div>
        </div>

        <div className="flex flex-row gap-5 items-center">
          {/* Show */}
          <div className="flex flex-row justify-center items-center gap-3">
            <label htmlFor="show" className="text-gray-500">
              Show
            </label>

            <input
              type="number"
              id="show"
              value={show}
              min="1"
              className="bg-white w-8 h-5"
              onChange={(e) => handleShow(e.target.value)}
            />
          </div>

          {/* Sort */}
          <div className="flex flex-row justify-center items-center gap-3">
            <label htmlFor="sort" className="text-gray-500">
              Sort By
            </label>

            <select id="sort" name="sort" className="bg-white w-20 h-4 px-2">
              <option value="relevance">Relevance</option>

              <option value="price-low">Price: Low to High</option>

              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
      );
}

export default ToolBare;