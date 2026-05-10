import Banner from "../components/Banner";
import ContentHome from "../components/ContentHome";
import ProductCard from "../components/ProductCard";
import Slider from "../components/Slider";

import living from "/public/Living.jpg";
import bedroom from "/public/Bedroom.jpg";
import dining from "/public/Dining.jpg";

import couch from "/public/couch.jpg";
import frameworks from "/public/frameworks.jpg";

import house1 from "/public/house1.webp";
import house2 from "/public/house2.webp";
import house3 from "/public/house3.webp";
import house4 from "/public/house4.webp";
import house5 from "/public/house5.webp";
import house6 from "/public/house6.webp";
import house7 from "/public/house7.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import room1 from "/public/room1.jpg";
import room2 from "/public/room2.jpg";
import room3 from "/public/room3.jpg";
import room4 from "/public/room4.jpg";

import GridSection from "../components/GridSection";

function Home() {
  return (
    <>
      <main className="home flex flex-col gap-10 justify-center items-center border-b-2 border-zinc-200">
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
            {Array.from({ length: 16 }, (_, index) => ({
              id: index + 1,
              title: `Couch ${index + 1}`,
            }))
              .fill(couch)
              .map((item, index) => (
                <ProductCard
                  key={index}
                  image={item}
                  title={`Couch ${index + 1}`}
                  price="1000$"
                  discount="10%"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                  feature="10%"
                  id={index + 1}
                />
              ))}
          </div>
        </div>
        <div className="loading flex justify-center items-center gap-4 bg-amber-100 w-120 h-55">
          <div className="presentation w-33">
            <h2 className="font-bold text-2xl mb-4">
              Lorem ipsum dolor sit amet consectetur.
            </h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              mollitia in sit fugit maiores!
            </p>
            <button className="bg-amber-500 text-white px-4 py-2 my-5 font-bold cursor-pointer">
              Learn More
            </button>
          </div>
          <div className="presentation-title w-33 h-50 relative">
            <img
              src={frameworks}
              alt="frameworks"
              className="absolute left-0 top-0"
            />
            <div className="absolute bottom-2 left-2 w-25 flex justify-center items-end">
              <h3 className="bg-white/75 p-2 font-bold">
                <span className="text-sm font-light">01 --- Red Rooms</span>
                <br />
                Lorem ipsum dolor sit amet.
              </h3>
              <button className="bg-amber-500 text-white px-2 py-2 font-bold cursor-pointer">
                <FontAwesomeIcon icon={faArrowRightLong} />
              </button>
            </div>
          </div>
          <Slider objt={[room1, room2, room3, room4]} />
        </div>
        <div className="loading flex flex-col justify-center items-center bg-white w-120 my-5">
          <p className="text-sm">Share you setup with</p>
          <h2 className="text-2xl font-bold">#ForniroFourniture</h2>
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
      </main>
    </>
  );
}

export default Home;
