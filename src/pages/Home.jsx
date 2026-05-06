import React from "react";
import Banner from "../components/Banner";
import ContentHome from "../components/ContentHome";
import ProductCard from "../components/ProductCard";

import living from "../assets/Living.jpg";
import bedroom from "../assets/Bedroom.jpg";
import dining from "../assets/Dining.jpg";

import couch from "../assets/couch.jpg";

function Home() {
  return (
    <main className="home flex flex-col gap-10 justify-center items-center">
      <Banner />
      <div className="home__content flex flex-col gap-4 justify-center items-center w-120">
        <h2 className="text-2xl font-bold">Brows The Range</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="grid grid-cols-3 gap-4">
          <ContentHome living={living} text="Living Room" />
          <ContentHome living={bedroom} text="Bedroom" />
          <ContentHome living={dining} text="Dining Room" />
        </div>
      </div>
      <div className="product__section flex flex-col gap-4 justify-center items-center">
        <h2 className="text-2xl font-bold">Our Products</h2>
        <div className="our_products grid grid-cols-4 gap-4 justify-center items-center w-120">
          <ProductCard
            image={couch}
            title="Couch"
            price="1000$"
            discount="10%"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            feature="10%"
          />
          <ProductCard
            image={couch}
            title="Couch"
            price="1000$"
            discount="10%"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            feature=""
          />
          <ProductCard
            image={couch}
            title="Couch"
            price="2000$"
            discount="10%"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            feature=""
          />
          <ProductCard
            image={couch}
            title="Couch"
            price="1000$"
            discount="10%"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            feature=""
          />
          <ProductCard
            image={couch}
            title="Couch"
            price="1000$"
            discount="15%"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            feature="20%"
          />
          <ProductCard
            image={couch}
            title="Couch"
            price="1000$"
            discount="10%"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            feature="30%"
          />
          <ProductCard
            image={couch}
            title="Couch"
            price="1000$"
            discount="10%"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            feature=""
          />
          <ProductCard
            image={couch}
            title="Couch"
            price="1000$"
            discount="10%"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            feature=""
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
