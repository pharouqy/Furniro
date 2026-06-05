import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareLinkedin,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import couchProduct1 from "/public/couchProduct1.jpg";
import couchProduct2 from "/public/couchProduct2.jpg";
import couch from "/public/couch.jpg";
import couchSlider1 from "/public/couch-slider1.jpg";
import shopBanner from "/public/shop_banner.webp";

import Banner from "@/common/components/layout/Banner";
import SliderProduct from "../components/SliderProduct";
import Stars from "../components/Stars";
import ProductCard from "@/common/components/molecules/ProductCard";
import { useCartStore } from "@/features/cart/store/cartStore";

export default function SingleProduct() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const product = useMemo(() => {
    const list = [
      { id: 1, title: "Syltherine Sofa", price: 3600000, description: "A stylish sofa with generous proportions and soft support." },
      { id: 2, title: "Leviosa Sofa", price: 1250000, description: "A minimalist sofa for compact living rooms and quiet corners." },
      { id: 3, title: "Lolito Sofa", price: 14000000, description: "A luxury sofa with deep comfort and a refined silhouette." },
      { id: 4, title: "Respira Sofa", price: 500000, description: "An easy outdoor piece for relaxed hosting and open-air rooms." },
    ];
    return list.find((item) => String(item.id) === String(id)) || {
      id: id || "asgard",
      title: "ASGARD SOFA",
      price: 250000,
      description: "A clean, grounded sofa designed for everyday comfort.",
    };
  }, [id]);

  const handleAddToCart = () => {
    addToCart(
      {
        id: String(product.id),
        title: product.title,
        price: product.price,
        picture: couch,
        size: selectedSize,
        color: selectedColor,
      },
      quantity
    );

    alert(`${quantity} x ${product.title} has been added to your cart.`);
    setQuantity(1);
  };

  const productImages = [couch, couchProduct1, couchProduct2, couchSlider1];
  const colorOptions = [
    { name: "red", label: "Clay red", className: "bg-[#C76543]" },
    { name: "green", label: "Sage green", className: "bg-[#637969]" },
    { name: "blue", label: "Deep blue", className: "bg-[#2F4F6F]" },
  ];

  return (
    <main className="w-full">
      <Banner
        title={product.title}
        bgImage={shopBanner}
        breadcrumbs={[{ label: "Shop", path: "/shop" }, { label: product.title }]}
      />

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_0.9fr] lg:py-16">
        <SliderProduct images={productImages} />

        <div className="flex flex-col gap-6">
          <div>
            <p className="eyebrow">Furniro seating</p>
            <h1 className="mt-2 text-4xl font-extrabold leading-tight text-stone-950 md:text-5xl">
              {product.title}
            </h1>
            <p className="mt-3 text-2xl font-bold text-[#8F6B1F]">
              {product.price.toLocaleString("fr-FR")} Da
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
            <Stars rating={4} />
            <span className="h-4 w-px bg-stone-200" />
            <span>5 customer reviews</span>
          </div>

          <p className="section-copy">{product.description} Premium upholstery, a solid frame, and balanced proportions make it easy to style in both compact and generous spaces.</p>

          <div className="grid gap-5 rounded-lg border border-stone-200 bg-white p-5">
            <div>
              <h3 className="text-sm font-bold text-stone-950">Size</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 min-w-10 rounded-md border px-3 text-sm font-bold transition-colors ${
                      selectedSize === size
                        ? "border-[#B88E2F] bg-[#B88E2F] text-white"
                        : "border-stone-200 bg-white text-stone-700 hover:border-[#B88E2F]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-950">Color</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-9 w-9 rounded-full border-2 ${color.className} ${
                      selectedColor === color.name ? "border-stone-950 ring-2 ring-stone-200" : "border-white"
                    }`}
                    aria-label={color.label}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex h-12 w-full items-center justify-between rounded-md border border-stone-200 bg-white sm:w-36">
              <button
                className="h-full px-4 text-lg font-bold text-stone-600 hover:text-stone-950"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="number"
                aria-label="Quantity"
                className="w-12 bg-transparent text-center text-sm font-bold focus:outline-none"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              />
              <button
                className="h-full px-4 text-lg font-bold text-stone-600 hover:text-stone-950"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button onClick={handleAddToCart} className="btn-primary h-12 flex-1">
              Add To Cart
            </button>
            <button
              onClick={() => alert("Comparison feature is coming soon!")}
              className="btn-secondary h-12"
            >
              Compare
            </button>
          </div>

          <dl className="grid grid-cols-[90px_1fr] gap-x-4 gap-y-2 border-t border-stone-200 pt-6 text-sm text-stone-500">
            <dt>SKU</dt>
            <dd>: SS-00{product.id}</dd>
            <dt>Category</dt>
            <dd>: Sofas</dd>
            <dt>Tags</dt>
            <dd>: Sofa, Chair, Home, Shop</dd>
            <dt>Share</dt>
            <dd className="flex items-center gap-3 text-lg text-stone-900">
              :
              <button aria-label="Share on Facebook" className="hover:text-[#B88E2F]"><FontAwesomeIcon icon={faSquareFacebook} /></button>
              <button aria-label="Share on LinkedIn" className="hover:text-[#B88E2F]"><FontAwesomeIcon icon={faSquareLinkedin} /></button>
              <button aria-label="Share on X" className="hover:text-[#B88E2F]"><FontAwesomeIcon icon={faSquareXTwitter} /></button>
            </dd>
          </dl>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-12">
        <div className="container-page">
          <div className="overflow-x-auto">
            <nav aria-label="Product information" className="min-w-max border-b border-stone-100">
              {[
                { id: "description", label: "Description" },
                { id: "info", label: "Additional Information" },
                { id: "reviews", label: "Reviews (5)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`mr-8 border-b-2 px-1 pb-4 text-base font-bold transition-colors ${
                    activeTab === tab.id ? "border-stone-950 text-stone-950" : "border-transparent text-stone-400 hover:text-stone-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8 text-sm leading-7 text-stone-600">
            {activeTab === "description" && (
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <p>
                  Embodying clean lines and modern design, this sofa is wrapped in premium upholstery and set on tapered wooden legs. It is designed for movie nights, long conversations, and relaxed everyday use.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <img src={couchProduct1} alt="Sofa detail view" className="h-72 w-full rounded-lg object-cover" />
                  <img src={couchProduct2} alt="Sofa styled in room" className="h-72 w-full rounded-lg object-cover" />
                </div>
              </div>
            )}

            {activeTab === "info" && (
              <div className="grid gap-3 sm:grid-cols-2">
                <p><strong>Frame:</strong> Hardwood solid frame with plywood reinforcements.</p>
                <p><strong>Upholstery:</strong> Premium linen texture upholstery material.</p>
                <p><strong>Legs:</strong> Natural ash wood legs with protection pads.</p>
                <p><strong>Comfort:</strong> High density foam cushions for long-lasting support.</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="grid gap-4">
                {[
                  { author: "John Doe", rating: 5, date: "June 2, 2026", comment: "Outstanding sofa. Perfect fit for my living room." },
                  { author: "Jane Smith", rating: 4, date: "May 28, 2026", comment: "Very comfortable and easy to assemble." },
                  { author: "Alex Johnson", rating: 5, date: "May 15, 2026", comment: "High quality materials and quick shipping." },
                ].map((review) => (
                  <article key={`${review.author}-${review.date}`} className="rounded-lg border border-stone-200 p-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-bold text-stone-950">{review.author}</span>
                      <Stars rating={review.rating} />
                      <span className="text-xs text-stone-400">{review.date}</span>
                    </div>
                    <p className="mt-3">{review.comment}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">More to love</p>
            <h2 className="section-heading mt-2">Related Products</h2>
          </div>
          <Link to="/shop" className="btn-secondary w-fit">Back to Shop</Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((itemIndex) => (
            <ProductCard
              key={itemIndex}
              id={itemIndex}
              title={`Related Sofa ${itemIndex}`}
              description="A comfortable piece for a collected home."
              price="250000 Da"
              discount={itemIndex === 2 ? "15%" : ""}
              image={couch}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
