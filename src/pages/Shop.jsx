import { useMemo, useState } from "react";
import Banner from "@/common/components/layout/Banner";
import ProductCard from "@/common/components/molecules/ProductCard";
import ToolBare from "../components/ToolBare";
import Pagination from "../components/Pagination";
import Infos from "@/common/components/layout/Infos";
import shopBanner from "/public/shop_banner.webp";
import couch from "/public/couch.jpg";

export default function Shop() {
  const [show, setShow] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");

  const originalProducts = useMemo(() => {
    const baseNames = ["Syltherine", "Leviosa", "Lolito", "Respira", "Grifo", "Muggo", "Pingky", "Potty"];
    const baseDescriptions = [
      "Stylish cafe chair",
      "Minimalist cafe chair",
      "Luxury big sofa",
      "Outdoor bar table and stool",
      "Night lamp",
      "Small hanger",
      "Soft bedroom set",
      "Minimalist flower pot",
    ];

    return Array.from({ length: 32 }, (_, index) => {
      const baseIdx = index % 8;
      const price = (baseIdx + 1) * 250000 + index * 45000;
      let discount = "";
      if (index % 3 === 0) discount = "10%";
      if (index % 5 === 0) discount = "30%";

      return {
        id: index + 1,
        title: `${baseNames[baseIdx]} ${Math.ceil((index + 1) / 8)}`,
        description: baseDescriptions[baseIdx],
        price,
        discount,
        image: couch,
      };
    });
  }, []);

  const sortedProducts = useMemo(() => {
    const productsCopy = [...originalProducts];

    switch (sortBy) {
      case "price-low":
        return productsCopy.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - parseInt(a.discount) / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - parseInt(b.discount) / 100) : b.price;
          return priceA - priceB;
        });
      case "price-high":
        return productsCopy.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - parseInt(a.discount) / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - parseInt(b.discount) / 100) : b.price;
          return priceB - priceA;
        });
      case "name-asc":
        return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return productsCopy;
    }
  }, [originalProducts, sortBy]);

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / show);
  const start = (currentPage - 1) * show;
  const end = start + show;
  const currentProducts = useMemo(() => sortedProducts.slice(start, end), [sortedProducts, start, end]);

  const handleShowChange = (value) => {
    const number = parseInt(value);
    if (!Number.isNaN(number) && number > 0) {
      setShow(number);
      setCurrentPage(1);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <main className="w-full bg-[#fbfbf9]">
      <Banner title="Shop" bgImage={shopBanner} breadcrumbs={[{ label: "Shop" }]} />

      <ToolBare
        show={show}
        handleShow={handleShowChange}
        sortBy={sortBy}
        handleSort={handleSortChange}
        start={start}
        end={end}
        totalProducts={totalProducts}
      />

      <section className="container-page py-16 lg:py-24">
        {currentProducts.length === 0 ? (
          <div className="rounded-2xl border border-neutral-100 bg-white py-24 text-center shadow-subtle">
            <p className="text-lg font-bold text-neutral-800">No products found.</p>
            <p className="mt-2 text-sm text-neutral-500">Try changing your filters or sorting options.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
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
