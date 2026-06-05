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
    <main className="w-full">
      <section
        className="relative flex min-h-[560px] items-center overflow-hidden bg-cover bg-center md:min-h-[640px]"
        style={{ backgroundImage: `url(${livingRoomHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/75 via-stone-950/35 to-transparent" />
        <div className="container-page relative z-10 py-20 text-white">
          <div className="max-w-2xl animate-fade-in">
            <p className="eyebrow text-white/80">New arrival</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              Furniro
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/85 md:text-lg">
              Warm modern furniture for rooms that work beautifully every day.
              Discover balanced pieces, natural textures, and effortless delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary">
                Shop Collection
                <FontAwesomeIcon icon={faArrowRightLong} />
              </Link>
              <a href="#rooms" className="btn-secondary border-white/80 text-white hover:bg-white hover:text-stone-950">
                Browse Rooms
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="rooms" className="container-page py-16 md:py-20">
        <div className="mb-8 text-center">
          <p className="eyebrow">Rooms</p>
          <h2 className="section-heading mt-2">Browse the range</h2>
          <p className="section-copy mx-auto mt-3">
            Start from the room you are styling and find pieces that feel collected, not crowded.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <ContentHome living={dining} text="Dining Room" />
          <ContentHome living={living} text="Living Room" />
          <ContentHome living={bedroom} text="Bedroom" />
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Selected pieces</p>
              <h2 className="section-heading mt-2">Our Products</h2>
            </div>
            <Link to="/shop" className="btn-secondary w-fit">
              View All
              <FontAwesomeIcon icon={faArrowRightLong} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      <section className="bg-[#F7F1E8] py-16 md:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Inspiration</p>
            <h2 className="section-heading mt-2">50+ beautiful rooms inspiration</h2>
            <p className="section-copy mt-4">
              Explore complete room ideas built around proportion, comfort, and materials that age well.
            </p>
            <Link to="/shop" className="btn-primary mt-7">
              Explore More
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-[1fr_0.9fr]">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg">
              <img src={frameworks} alt="Calm bedroom inspiration" className="h-full w-full object-cover" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between rounded-lg bg-white/90 p-5 backdrop-blur">
                <div>
                  <span className="text-xs font-semibold text-stone-500">01 / Bedroom</span>
                  <h3 className="mt-1 text-xl font-bold text-stone-950">Inner Peace</h3>
                </div>
                <Link to="/shop" className="flex h-11 w-11 items-center justify-center rounded-md bg-[#B88E2F] text-white transition-colors hover:bg-[#8f6b1f]" aria-label="Shop bedroom inspiration">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </Link>
              </div>
            </div>
            <Slider objt={[room1, room2, room3, room4]} />
          </div>
        </div>
      </section>

      <section className="container-page py-16 text-center md:py-20">
        <p className="eyebrow">Share your setup</p>
        <h2 className="section-heading mt-2">#FurniroFurniture</h2>
        <div className="mt-8 overflow-hidden rounded-lg">
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
