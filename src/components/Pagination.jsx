function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <nav className="mb-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-[#B88E2F] hover:text-[#B88E2F] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`h-10 min-w-10 rounded-md px-3 text-sm font-bold transition-colors ${
              currentPage === page
                ? "bg-[#B88E2F] text-white"
                : "border border-stone-200 text-stone-700 hover:border-[#B88E2F] hover:text-[#B88E2F]"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-[#B88E2F] hover:text-[#B88E2F] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
