import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Share2, Link2 } from "lucide-react";

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
import { useToastStore } from "@/common/stores/toastStore";
import { api } from "@/common/utils/api";

export default function SingleProduct() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      api.getProduct(id),
      api.getProducts(),
    ])
      .then(([productData, allData]) => {
        setProduct(productData.product);
        const others = (allData.products || []).filter((p) => p._id !== id).slice(0, 4);
        setRelatedProducts(others);
      })
      .catch(() => { setProduct(null); })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      {
        id: product._id,
        title: product.title,
        price: product.price,
        picture: product.image || couch,
        size: selectedSize,
        color: selectedColor,
      },
      quantity
    );
    addToast(`${quantity} x ${product.title} added to cart`, "success");
    setQuantity(1);
  };

  if (loading) {
    return (
      <main className="w-full bg-[var(--color-bg)] flex flex-col justify-center items-center">
        <Banner title="Loading..." bgImage={shopBanner} breadcrumbs={[{ label: "Shop", path: "/shop" }, { label: "Product" }]} />
        <section className="container-page grid gap-16 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="h-96 animate-pulse rounded-2xl bg-[var(--color-surface-2)]" />
          <div className="space-y-6">
            <div className="h-8 w-3/4 animate-pulse rounded bg-[var(--color-surface-2)]" />
            <div className="h-6 w-1/4 animate-pulse rounded bg-[var(--color-surface-2)]" />
            <div className="h-20 w-full animate-pulse rounded bg-[var(--color-surface-2)]" />
          </div>
        </section>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="w-full bg-[var(--color-bg)] flex flex-col justify-center items-center">
        <Banner title="Product Not Found" bgImage={shopBanner} breadcrumbs={[{ label: "Shop", path: "/shop" }, { label: "Not Found" }]} />
        <section className="container-page py-24 text-center">
          <p className="text-lg font-bold text-[var(--color-text)]">Product not found.</p>
          <Link to="/shop" className="btn-primary mt-6">Back to Shop</Link>
        </section>
      </main>
    );
  }

  const productImages = [product.image || couch, couchProduct1, couchProduct2, couchSlider1].filter(Boolean);
  const colorOptions = [
    { name: "red", label: "Clay red", className: "bg-[#C76543]" },
    { name: "green", label: "Sage green", className: "bg-[#637969]" },
    { name: "blue", label: "Deep blue", className: "bg-[#2F4F6F]" },
  ];

  return (
    <main className="w-full bg-[var(--color-bg)] flex flex-col justify-center items-center">
      <Banner
        title={product.title}
        bgImage={shopBanner}
        breadcrumbs={[{ label: "Shop", path: "/shop" }, { label: product.title }]}
      />

      <section className="container-page grid gap-16 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <SliderProduct images={productImages} />

        <div className="flex flex-col gap-8">
          <div>
            <p className="eyebrow">{product.category || "Furniro seating"}</p>
            <h1 className="mt-3 text-[var(--text-4xl)] font-black leading-[var(--leading-tight)] text-[var(--color-text)]">
              {product.title}
            </h1>
            <p className="mt-4 text-[var(--text-2xl)] font-black text-[var(--color-primary-hover)]">
              {product.price.toLocaleString("fr-FR")} Da
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <Stars rating={4} />
            <span className="h-4 w-px bg-[var(--color-border)]" />
            <span className="font-medium">5 customer reviews</span>
          </div>

          <p className="section-copy leading-relaxed">{product.description || "Premium upholstery, a solid hardwood frame, and balanced proportions make it easy to style in both compact and generous spaces."}</p>

          <div className="grid gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-[var(--shadow-sm)]">
            <div>
              <h3 className="text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">Size</h3>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`h-11 min-w-11 rounded-xl border px-4 text-xs font-extrabold transition-all duration-300 ${selectedSize === size ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-text-inverse)] shadow-md hover:shadow-lg" : "border-[var(--color-border)] bg-[var(--color-surface-1)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:shadow-sm"}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">Color</h3>
              <div className="mt-3 flex flex-wrap gap-3.5">
                {colorOptions.map((color) => (
                  <button key={color.name} onClick={() => setSelectedColor(color.name)}
                    className={`h-10 w-10 rounded-full border-2 transition-all duration-300 ${color.className} ${selectedColor === color.name ? "border-white ring-2 ring-[var(--color-primary)] scale-105 shadow-md" : "border-white hover:scale-105 hover:shadow-sm"}`}
                    aria-label={color.label} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex h-14 w-full items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] px-2 sm:w-36 shadow-sm">
              <button className="h-full px-3 text-lg font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300"
                onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">-</button>
              <input type="number" aria-label="Quantity" className="w-12 bg-transparent text-center text-sm font-bold text-[var(--color-text)] focus:outline-none"
                value={quantity} min="1" onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))} />
              <button className="h-full px-3 text-lg font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300"
                onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
            </div>

            <button onClick={handleAddToCart} className="btn-primary h-14 flex-1 shadow-md hover:shadow-lg">Add To Cart</button>
            <button onClick={() => addToast("Comparison feature coming soon", "info")} className="btn-secondary h-14">Compare</button>
          </div>

          <dl className="grid grid-cols-[90px_1fr] gap-x-4 gap-y-3.5 border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-text-muted)]">
            <dt className="font-semibold text-[var(--color-text-subtle)]">SKU</dt>
            <dd className="font-bold text-[var(--color-text)]">: SS-{product._id?.slice(-6) || "000000"}</dd>
            <dt className="font-semibold text-[var(--color-text-subtle)]">Category</dt>
            <dd className="font-bold text-[var(--color-text)]">: {product.category || "Sofas"}</dd>
            <dt className="font-semibold text-[var(--color-text-subtle)]">Tags</dt>
            <dd className="font-bold text-[var(--color-text)]">: {product.category || "Sofa"}, Chair, Home, Shop</dd>
            <dt className="font-semibold text-[var(--color-text-subtle)] flex items-center">Share</dt>
            <dd className="flex items-center gap-3 text-xl text-[var(--color-text)] font-bold">
              :
              <span className="flex gap-2">
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Share on Facebook" className="hover:text-[var(--color-primary)] transition-colors"><Share2 size={18} /></a>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Share via link" className="hover:text-[var(--color-primary)] transition-colors"><Link2 size={18} /></a>
              </span>
            </dd>
          </dl>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-1)] section">
        <div className="container-page">
          <div className="overflow-x-auto">
            <nav aria-label="Product information" className="min-w-max border-b border-[var(--color-border)] flex gap-8">
              {[
                { id: "description", label: "Description" },
                { id: "info", label: "Additional Information" },
                { id: "reviews", label: "Reviews (5)" },
              ].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`border-b-2 px-1 pb-4 text-base font-extrabold transition-all duration-300 ${activeTab === tab.id ? "border-[var(--color-text)] text-[var(--color-text)]" : "border-transparent text-[var(--color-text-subtle)] hover:text-[var(--color-text-muted)]"}`}>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-10 text-sm leading-8 text-[var(--color-text-muted)]">
            {activeTab === "description" && (
              <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                <p className="text-[var(--color-text-muted)] text-sm leading-8">{product.description || "Embodying clean lines and modern design, this piece is wrapped in premium materials and built for everyday comfort."}</p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <img src={couchProduct1} alt="Product detail view" loading="lazy" decoding="async" className="h-72 w-full rounded-2xl object-cover shadow-sm hover:scale-[1.02] transition-transform duration-500" />
                  <img src={couchProduct2} alt="Product styled in room" loading="lazy" decoding="async" className="h-72 w-full rounded-2xl object-cover shadow-sm hover:scale-[1.02] transition-transform duration-500" />
                </div>
              </div>
            )}

            {activeTab === "info" && (
              <div className="grid gap-6 sm:grid-cols-2 bg-[var(--color-surface-sunken)] p-6 rounded-2xl border border-[var(--color-border)]">
                <p><strong className="text-[var(--color-text)] font-bold">Frame:</strong> Hardwood solid frame with plywood reinforcements.</p>
                <p><strong className="text-[var(--color-text)] font-bold">Upholstery:</strong> Premium linen texture upholstery material.</p>
                <p><strong className="text-[var(--color-text)] font-bold">Legs:</strong> Natural ash wood legs with protection pads.</p>
                <p><strong className="text-[var(--color-text)] font-bold">Comfort:</strong> High density foam cushions for long-lasting support.</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="grid gap-6">
                {[
                  { author: "John Doe", rating: 5, date: "June 2, 2026", comment: "Outstanding quality. Perfect fit for my living room." },
                  { author: "Jane Smith", rating: 4, date: "May 28, 2026", comment: "Very comfortable and easy to assemble." },
                  { author: "Alex Johnson", rating: 5, date: "May 15, 2026", comment: "High quality materials and quick shipping." },
                ].map((review) => (
                  <article key={`${review.author}-${review.date}`} className="rounded-2xl border border-[var(--color-border)] p-6 bg-[var(--color-surface-sunken)]">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-extrabold text-[var(--color-text)]">{review.author}</span>
                      <Stars rating={review.rating} />
                      <span className="text-xs text-[var(--color-text-subtle)] font-medium">{review.date}</span>
                    </div>
                    <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">{review.comment}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="container-page py-16 lg:py-24">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">More to love</p>
              <h2 className="section-heading mt-3">Related Products</h2>
            </div>
            <Link to="/shop" className="btn-secondary w-fit">Back to Shop</Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp._id} id={rp._id} title={rp.title} description={rp.description} price={`${rp.price} Da`} discount={rp.discount} image={rp.image} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}