function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40"
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
                  ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                  : "border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
