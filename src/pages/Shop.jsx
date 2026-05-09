import { useState } from "react";

import BannerShop from "../components/BannerShop";

import shopBanner from "/public/shop_banner.webp";

import couch from "/public/couch.jpg";

import ProductCard from "../components/ProductCard";
import ToolBare from "../components/ToolBare";
import Pagination from "../components/Pagination";
import Infos from "../components/Infos";

function Shop() {
  // Nombre de produits par page
  const [show, setShow] = useState(16);

  // Page actuelle
  const [currentPage, setCurrentPage] = useState(1);

  const totalProducts = 32;

  // Création des produits
  const products = Array.from({ length: totalProducts }, (_, index) => ({
    id: index + 1,
    title: `Couch ${index + 1}`,
  }));

  // Nombre total de pages
  const totalPages = Math.ceil(totalProducts / show);

  // Calcul pagination
  const start = (currentPage - 1) * show;
  const end = start + show;

  // Produits affichés
  const currentProducts = products.slice(start, end);

  // Changer le nombre affiché
  const handleShow = (value) => {
    const number = parseInt(value);

    if (!isNaN(number) && number > 0) {
      setShow(number);

      // Revenir à la page 1
      // sinon certaines pages deviennent invalides
      setCurrentPage(1);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full">
      {/* Banner */}
      <BannerShop shopBanner={shopBanner} />

      {/* Toolbar */}
      <ToolBare
        show={show}
        handleShow={handleShow}
        start={start}
        end={end}
        totalProducts={totalProducts}
      />

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10 w-full">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={couch}
            title={product.title}
            price="$199"
            discount="$79"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            feature="New"
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {/* Infos */}
      <Infos />
    </main>
  );
}

export default Shop;
