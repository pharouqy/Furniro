import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import living from "/public/Living.jpg";
import bedroom from "/public/Bedroom.jpg";
import dining from "/public/Dining.jpg";
import couch from "/public/couch.jpg";
import frameworks from "/public/frameworks.jpg";
import livingRoomHero from "/public/living-room.jpg";

import room1 from "/public/room1.jpg";
import room2 from "/public/room2.jpg";
import room3 from "/public/room3.jpg";
import room4 from "/public/room4.jpg";

import house1 from "/public/house1.webp";
import house2 from "/public/house2.webp";
import house3 from "/public/house3.webp";
import house4 from "/public/house4.webp";
import house5 from "/public/house5.webp";
import house6 from "/public/house6.webp";
import house7 from "/public/house7.webp";

import ContentHome from "@/common/components/atoms/ContentHome";
import ProductCard from "@/common/components/molecules/ProductCard";
import Slider from "@/common/components/atoms/Slider";
import GridSection from "@/common/components/atoms/GridSection";
import useInView from "@/common/hooks/useInView";
import { api } from "@/common/utils/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts()
      .then((data) => setProducts((data.products || []).slice(0, 8)))
      .catch(() => {});
  }, []);

  const [roomsRef, roomsInView] = useInView();
  const [productsRef, productsInView] = useInView();
  const [inspirationRef, inspirationInView] = useInView();

  return (
    <main className="w-full bg-[var(--color-bg)] flex flex-col justify-center items-center">
      <section
        className="w-full relative flex min-h-[600px] items-center overflow-hidden bg-cover bg-center md:min-h-[720px] lg:min-h-[800px]"
        style={{ backgroundImage: `url(${livingRoomHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        <div className="container-page relative z-10 py-16 flex justify-end md:py-20">
          <div className="w-full max-w-lg rounded-3xl bg-[var(--color-surface-1)]/95 p-8 shadow-[var(--shadow-lg)] backdrop-blur-md border border-[var(--color-border)] text-[var(--color-text)] md:p-10 lg:max-w-xl lg:p-12 animate-fade-in transition-shadow duration-500">
            <p className="eyebrow text-[var(--color-primary)] font-bold">New Arrival</p>
            <h1 className="mt-4 text-[var(--text-5xl)] font-black leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-[var(--color-text)]">
              Discover Our New Collection
            </h1>
            <p className="mt-6 text-[var(--text-base)] leading-[var(--leading-normal)] text-[var(--color-text-muted)]">
              Warm modern furniture for spaces that work beautifully every day.
              Crafted with premium materials, balanced textures, and effortless utility.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary">
                Shop Collection
                <ArrowRight size={16} />
              </Link>
              <a href="#rooms" className="btn-secondary">
                Browse Rooms
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="rooms" ref={roomsRef} className={`container-page py-20 md:py-28 ${roomsInView ? "animate-reveal" : "opacity-0"}`}>
        <div className="mb-12 text-center">
          <p className="eyebrow">Rooms</p>
          <h2 className="section-heading mt-3">Browse the range</h2>
          <p className="section-copy mx-auto mt-4">
            Start from the room you are styling and find balanced pieces that feel curated and purposeful.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 sm:gap-8 lg:gap-10">
          <div className={roomsInView ? "animate-reveal animate-reveal-delay-1" : "opacity-0"}><ContentHome living={dining} text="Dining Room" /></div>
          <div className={roomsInView ? "animate-reveal animate-reveal-delay-2" : "opacity-0"}><ContentHome living={living} text="Living Room" /></div>
          <div className={roomsInView ? "animate-reveal animate-reveal-delay-3" : "opacity-0"}><ContentHome living={bedroom} text="Bedroom" /></div>
        </div>
      </section>

      <section ref={productsRef} className={`bg-[var(--color-surface-1)] section border-y border-[var(--color-border)] ${productsInView ? "animate-reveal" : "opacity-0"}`}>
        <div className="container-page">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Selected pieces</p>
              <h2 className="section-heading mt-3">Our Products</h2>
            </div>
            <Link to="/shop" className="btn-secondary w-fit">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
            {products.length === 0 ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-2xl bg-[var(--color-surface-2)]" />
              ))
            ) : (
              products.map((product, i) => (
                <div key={product._id} className={productsInView ? `animate-reveal animate-reveal-delay-${Math.min(i + 1, 5)}` : "opacity-0"}>
                  <ProductCard
                    id={product._id}
                    title={product.title}
                    description={product.description}
                    price={`${product.price} Da`}
                    discount={product.discount}
                    image={product.image}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section ref={inspirationRef} className={`bg-[var(--color-surface-sunken)] section ${inspirationInView ? "animate-reveal" : "opacity-0"}`}>
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col items-start">
            <p className="eyebrow">Inspiration</p>
            <h2 className="section-heading mt-3">50+ beautiful rooms inspiration</h2>
            <p className="section-copy mt-5">
              Explore complete interior designs built around proportion, comfort, and sustainable materials that age beautifully.
            </p>
            <Link to="/shop" className="btn-primary mt-8">
              Explore More Designs
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_0.9fr] md:gap-8">
            <div className="relative min-h-[460px] overflow-hidden rounded-2xl shadow-lg group">
              <img src={frameworks} alt="Calm bedroom inspiration" loading="lazy" decoding="async" fetchpriority="high" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between rounded-2xl bg-[var(--color-surface-elevated)]/95 p-6 shadow-md backdrop-blur-md border border-[var(--color-border)]">
                <div>
                  <span className="text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">01 / Bedroom</span>
                  <h3 className="mt-1 text-xl font-extrabold text-[var(--color-text)]">Inner Peace</h3>
                </div>
                <Link to="/shop" className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)] text-[var(--color-text-inverse)] transition-all hover:bg-[var(--color-primary-hover)] hover:translate-y-[-2px] shadow-sm" aria-label="Shop bedroom inspiration">
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <Slider objt={[room1, room2, room3, room4]} />
          </div>
        </div>
      </section>

      <section className="container-page section text-center">
        <p className="eyebrow">Share your setup</p>
        <h2 className="section-heading mt-3">#FurniroFurniture</h2>
        <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-4 shadow-[var(--shadow-sm)]">
          <GridSection house1={house1} house2={house2} house3={house3} house4={house4} house5={house5} house6={house6} house7={house7} />
        </div>
      </section>
    </main>
  );
}