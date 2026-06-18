import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

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

export default function Home() {
  const products = useMemo(
    () => [
      { id: 1, title: "Syltherine", description: "Stylish cafe chair", price: 3600000, discount: "30%", image: couch },
      { id: 2, title: "Leviosa", description: "Minimalist cafe chair", price: 1250000, discount: "", image: couch },
      { id: 3, title: "Lolito", description: "Luxury big sofa", price: 14000000, discount: "50%", image: couch },
      { id: 4, title: "Respira", description: "Outdoor bar table and stool", price: 500000, discount: "", image: couch },
      { id: 5, title: "Grifo", description: "Night lamp", price: 1500000, discount: "", image: couch },
      { id: 6, title: "Muggo", description: "Small hanger", price: 150000, discount: "10%", image: couch },
      { id: 7, title: "Pingky", description: "Soft bedroom set", price: 7000000, discount: "20%", image: couch },
      { id: 8, title: "Potty", description: "Minimalist flower pot", price: 500000, discount: "", image: couch },
    ],
    []
  );

  return (
    <main className="w-full bg-[#fbfbf9]">
      {/* Hero Section */}
      <section
        className="relative flex min-h-[600px] items-center overflow-hidden bg-cover bg-center md:min-h-[720px] lg:min-h-[800px]"
        style={{ backgroundImage: `url(${livingRoomHero})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-page relative z-10 py-16 flex justify-end md:py-20">
          <div className="w-full max-w-lg rounded-3xl bg-[#FDF9F3]/95 p-8 shadow-[0_30px_70px_rgba(184,142,47,0.15)] backdrop-blur-md border border-white/60 text-neutral-900 md:p-10 lg:max-w-xl lg:p-12 animate-fade-in">
            <p className="eyebrow text-[#b88e2f] font-bold">New Arrival</p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
              Discover Our New Collection
            </h1>
            <p className="mt-6 text-sm leading-8 text-neutral-600 md:text-base">
              Warm modern furniture for spaces that work beautifully every day.
              Crafted with premium materials, balanced textures, and effortless utility.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary">
                Shop Collection
                <FontAwesomeIcon icon={faArrowRightLong} />
              </Link>
              <a href="#rooms" className="btn-secondary">
                Browse Rooms
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="container-page py-20 md:py-28">
        <div className="mb-12 text-center">
          <p className="eyebrow">Rooms</p>
          <h2 className="section-heading mt-3">Browse the range</h2>
          <p className="section-copy mx-auto mt-4">
            Start from the room you are styling and find balanced pieces that feel curated and purposeful.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 sm:gap-8 lg:gap-10">
          <ContentHome living={dining} text="Dining Room" />
          <ContentHome living={living} text="Living Room" />
          <ContentHome living={bedroom} text="Bedroom" />
        </div>
      </section>

      {/* Selected Pieces / Products Section */}
      <section className="bg-white py-20 md:py-28 border-y border-neutral-100">
        <div className="container-page">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Selected pieces</p>
              <h2 className="section-heading mt-3">Our Products</h2>
            </div>
            <Link to="/shop" className="btn-secondary w-fit">
              View All Products
              <FontAwesomeIcon icon={faArrowRightLong} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
            {products.map((product) => (
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
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="bg-[#fcf9f4] py-20 md:py-28">
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
              <img src={frameworks} alt="Calm bedroom inspiration" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between rounded-2xl bg-white/95 p-6 shadow-md backdrop-blur-md border border-white/50">
                <div>
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">01 / Bedroom</span>
                  <h3 className="mt-1 text-xl font-extrabold text-neutral-900">Inner Peace</h3>
                </div>
                <Link to="/shop" className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#B88E2F] text-white transition-all hover:bg-[#8f6b1f] hover:translate-y-[-2px] shadow-sm" aria-label="Shop bedroom inspiration">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </Link>
              </div>
            </div>
            <Slider objt={[room1, room2, room3, room4]} />
          </div>
        </div>
      </section>

      {/* Share setup Section */}
      <section className="container-page py-20 text-center md:py-28">
        <p className="eyebrow">Share your setup</p>
        <h2 className="section-heading mt-3">#FurniroFurniture</h2>
        <div className="mt-12 overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4 shadow-subtle">
          <GridSection
            house1={house1}
            house2={house2}
            house3={house3}
            house4={house4}
            house5={house5}
            house6={house6}
            house7={house7}
          />
        </div>
      </section>
    </main>
  );
}
