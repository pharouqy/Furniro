import { useEffect, useMemo, useState } from "react";
import Banner from "@/common/components/layout/Banner";
import ProductCard from "@/common/components/molecules/ProductCard";
import ToolBare from "../components/ToolBare";
import Pagination from "../components/Pagination";
import Infos from "@/common/components/layout/Infos";
import { api } from "@/common/utils/api";
import shopBanner from "/public/shop_banner.webp";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setLoading(true);
    api.getProducts()
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const sortedProducts = useMemo(() => {
    const copy = [...products];
    switch (sortBy) {
      case "price-low":
        return copy.sort((a, b) => {
          const aP = a.discount ? a.price * (1 - parseInt(a.discount) / 100) : a.price;
          const bP = b.discount ? b.price * (1 - parseInt(b.discount) / 100) : b.price;
          return aP - bP;
        });
      case "price-high":
        return copy.sort((a, b) => {
          const aP = a.discount ? a.price * (1 - parseInt(a.discount) / 100) : a.price;
          const bP = b.discount ? b.price * (1 - parseInt(b.discount) / 100) : b.price;
          return bP - aP;
        });
      case "name-asc":
        return copy.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return copy;
    }
  }, [products, sortBy]);

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / show);
  const start = (currentPage - 1) * show;
  const end = start + show;
  const currentProducts = useMemo(() => sortedProducts.slice(start, end), [sortedProducts, start, end]);

  const handleShowChange = (value) => {
    const number = parseInt(value);
    if (!Number.isNaN(number) && number > 0) { setShow(number); setCurrentPage(1); }
  };

  const handleSortChange = (value) => { setSortBy(value); setCurrentPage(1); };

  return (
    <main className="w-full bg-[var(--color-bg)] flex flex-col justify-center items-center">
      <Banner title="Shop" bgImage={shopBanner} breadcrumbs={[{ label: "Shop" }]} />
      <ToolBare show={show} handleShow={handleShowChange} sortBy={sortBy} handleSort={handleSortChange} start={start} end={end} totalProducts={totalProducts} />

      <section className="container-page section">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-[var(--color-surface-2)]" />
            ))}
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] py-24 text-center shadow-[var(--shadow-sm)]">
            <p className="text-lg font-bold text-[var(--color-text)]">No products found.</p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">Try changing your filters or sorting options.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
            {currentProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                description={product.description}
                price={`${product.price} Da`}
                discount={product.discount}
                image={product.image}
              />
            ))}
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <div className="container-page py-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      )}

      <Infos />
    </main>
  );
}