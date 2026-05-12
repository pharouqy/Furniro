import { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareLinkedin,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import BannerProduct from "../components/BannerProduct";
import SliderProduct from "../components/SliderProduct";
import Stars from "../components/Stars";

import Context from "../hooks/Context";

function SingleProduct() {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [cart, setCart] = useState(0);
  const { setQuantity } = useContext(Context);

  const addToCart = () => {
    setQuantity(cart);
  };

  return (
    <div className="single_product flex flex-col gap-5 justify-start items-center">
      <BannerProduct />
      <div className="flex flex-row gap-5 justify-center items-start w-120">
        <SliderProduct />
        <div className="flex flex-col gap-2 justify-start items-start">
          <h2 className="font-bold text-5xl">ASGARD SOFA</h2>
          <span className="text-3xl text-gray-300 ">250 000.00 Da</span>
          <div className="flex flex-row gap-2 justify-start items-center">
            <div>
              <Stars />
            </div>
            <div>
              <p>| 5 customers review</p>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non
            ratione sint deleniti dolore corporis, neque vero nobis soluta quam.
            Facilis inventore voluptatem veritatis! Deserunt maxime nisi
            nesciunt cumque. Aperiam, dolores.
          </p>
          <div>
            <h3>Size</h3>
            <div className="flex flex-row gap-2">
              <button
                onClick={() => setSelectedSize("S")}
                className={`w-5 h-5 flex items-center justify-center border border-gray-300 rounded-lg ${
                  selectedSize === "S"
                    ? "bg-amber-500 text-amber-50"
                    : "bg-amber-100 hover:bg-amber-500 hover:text-amber-50"
                }`}
              >
                S
              </button>
              <button
                onClick={() => setSelectedSize("M")}
                className={`w-5 h-5 flex items-center justify-center border border-gray-300 rounded-lg ${
                  selectedSize === "M"
                    ? "bg-amber-500 text-amber-50"
                    : "bg-amber-100 hover:bg-amber-500 hover:text-amber-50"
                }`}
              >
                M
              </button>
              <button
                onClick={() => setSelectedSize("L")}
                className={`w-5 h-5 flex items-center justify-center border border-gray-300 rounded-lg ${
                  selectedSize === "L"
                    ? "bg-amber-500 text-amber-50"
                    : "bg-amber-100 hover:bg-amber-500 hover:text-amber-50"
                }`}
              >
                L
              </button>
              <button
                onClick={() => setSelectedSize("XL")}
                className={`w-5 h-5 flex items-center justify-center border border-gray-300 rounded-lg ${
                  selectedSize === "XL"
                    ? "bg-amber-500 text-amber-50"
                    : "bg-amber-100 hover:bg-amber-500 hover:text-amber-50"
                }`}
              >
                XL
              </button>
              <button
                onClick={() => setSelectedSize("XS")}
                className={`w-5 h-5 flex items-center justify-center border border-gray-300 rounded-lg ${
                  selectedSize === "XS"
                    ? "bg-amber-500 text-amber-50"
                    : "bg-amber-100 hover:bg-amber-500 hover:text-amber-50"
                }`}
              >
                XS
              </button>
            </div>
          </div>
          <div>
            <h3>Color</h3>
            <div className="flex flex-row gap-2">
              <button
                onClick={() => setSelectedColor("red")}
                className={`w-2 h-2 rounded-full ${
                  selectedColor === "red" ? "bg-red-800" : "bg-red-500"
                }`}
              ></button>
              <button
                onClick={() => setSelectedColor("green")}
                className={`w-2 h-2 rounded-full ${
                  selectedColor === "green" ? "bg-green-800" : "bg-green-500"
                }`}
              ></button>
              <button
                onClick={() => setSelectedColor("blue")}
                className={`w-2 h-2 rounded-full ${
                  selectedColor === "blue" ? "bg-blue-800" : "bg-blue-500"
                }`}
              ></button>
            </div>
          </div>
          <div className="flex flex-row gap-1 justify-start items-center">
            <div className="flex flex-row justify-center items-center border h-8 rounded-2xl">
              <button
                className="text-zinc-950 text-3xl mx-2 cursor-pointer"
                onClick={() => setCart(Math.max(0, cart - 1))}
              >
                -
              </button>
              <input
                type="text"
                className="w-5 text-center text-3xl"
                value={cart}
                onChange={(e) => setCart(Number(e.target.value))}
              />
              <button
                className="text-zinc-950 text-3xl mx-2 cursor-pointer"
                onClick={() => setCart(cart + 1)}
              >
                +
              </button>
            </div>
            <button
              className="border text-zinc-950 text-xl rounded-2xl px-1 py-2 cursor-pointer hover:bg-amber-500 hover:text-amber-50 transition-all duration-300 ease-in-out"
              onClick={addToCart}
            >
              Add to cart
            </button>
            <button className="border text-zinc-950 text-xl rounded-2xl px-1 py-2 cursor-pointer hover:bg-amber-500 hover:text-amber-50 transition-all duration-300 ease-in-out">
              + Compare
            </button>
          </div>
          <hr className="w-full border-gray-300" />
          <div className="flex flex-row gap-5 justify-start items-start">
            <ul>
              <li>
                <p>SKU</p>
              </li>
              <li>
                <p>Category</p>
              </li>
              <li>
                <p>Tags</p>
              </li>
              <li>
                <p>Share</p>
              </li>
            </ul>
            <ul>
              <li>
                <p>: 123456789</p>
              </li>
              <li>
                <p>: Sofas</p>
              </li>
              <li>
                <p>: Sofa, Chair, Home, Shop</p>
              </li>
              <li className="flex">
                :
                <div>
                  <FontAwesomeIcon
                    icon={faSquareFacebook}
                    className="text-2xl rounded-2xl cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faSquareLinkedin}
                    className="text-2xl rounded-2xl cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faSquareXTwitter}
                    className="text-2xl rounded-2xl cursor-pointer"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
