import { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareLinkedin,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import couchProduct1 from "../../public/couchProduct1.jpg";
import couchProduct2 from "../../public/couchProduct2.jpg";

import couch from "../../public/couch.jpg";

import BannerProduct from "../components/BannerProduct";
import SliderProduct from "../components/SliderProduct";
import Stars from "../components/Stars";

import Context from "../context/Context";

import ProductCard from "../components/ProductCard";

function SingleProduct() {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [cart, setCart] = useState(0);
  const { panier, setPanier } = useContext(Context);

  const { setQuantity } = useContext(Context);

  const addToPanier = () => {
    // empêcher l'ajout de 0 produit
    if (cart <= 0) return;

    const newItem = {
      productId: Math.random().toString(36).substr(2, 9), // Génère un ID unique pour le produit
      quantity: cart,
      picture: couch,
      title: "ASGARD SOFA",
      price: 250000,
      size: selectedSize,
      color: selectedColor,
    };

    const existingItem = panier.find(
      (item) =>
        item.productId === newItem.productId &&
        item.size === newItem.size &&
        item.color === newItem.color,
    );
    if (existingItem) {
      const updatedPanier = panier.map((item) =>
        item.productId === newItem.productId &&
        item.size === newItem.size &&
        item.color === newItem.color
          ? {
              ...item,
              quantity: item.quantity + cart,
            }
          : item,
      );

      setPanier(updatedPanier);
    } else {
      setPanier([...panier, newItem]);
    }
    setQuantity(
      panier.reduce((total, item) => total + item.quantity, 0) + cart,
    );
    // reset quantité après ajout
    setCart(0);
  };

  const [showDescription, setShowDescription] = useState(true);
  const [showAditionnalInformation, setShowAditionnalInformation] =
    useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const switchToReviews = () => {
    setShowDescription(false);
    setShowAditionnalInformation(false);
    setShowReviews(true);
  };

  const switchToDescription = () => {
    setShowDescription(true);
    setShowAditionnalInformation(false);
    setShowReviews(false);
  };

  const switchToAditionnalInformation = () => {
    setShowDescription(false);
    setShowAditionnalInformation(true);
    setShowReviews(false);
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
              onClick={addToPanier}
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
      <hr className="w-full border-gray-300" />
      <div className="flex flex-col gap-5 justify-start items-start w-full">
        <div className="flex flex-row gap-5 justify-center items-center w-full">
          <ul className="flex flex-row gap-5 justify-center items-center w-full text-2xl">
            <li>
              {showDescription ? (
                <button
                  className="text-gray-800 underline"
                  onClick={switchToDescription}
                >
                  Description
                </button>
              ) : (
                <button className="text-gray-400" onClick={switchToDescription}>
                  Description
                </button>
              )}
            </li>
            <li>
              {showAditionnalInformation ? (
                <button
                  className="text-gray-800 underline"
                  onClick={switchToAditionnalInformation}
                >
                  Aditionnal information
                </button>
              ) : (
                <button
                  className="text-gray-400"
                  onClick={switchToAditionnalInformation}
                >
                  Aditionnal information
                </button>
              )}
            </li>
            <li>
              {showReviews ? (
                <button
                  className="text-gray-800 underline"
                  onClick={switchToReviews}
                >
                  Reviews (5)
                </button>
              ) : (
                <button className="text-gray-400" onClick={switchToReviews}>
                  Reviews (5)
                </button>
              )}
            </li>
          </ul>
        </div>
        {showDescription && (
          <div className="p-5">
            <p className="text-gray-700 font-popins">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              delectus deserunt facilis officiis fuga optio, saepe ratione!
              Deserunt aut nam eveniet possimus recusandae? Saepe illo commodi
              ratione tempora eum dolorum?
            </p>
            <div className="flex flex-row justify-around items-center">
              <img
                src={couchProduct1}
                alt="Product Image"
                className="w-60 h-30 my-5 object-cover rounded-2xl box-border hover:scale-105 transition-transform"
              />
              <img
                src={couchProduct2}
                alt="Product Image"
                className="w-60 h-30 my-5 object-cover rounded-2xl box-border hover:scale-105 transition-transform"
              />
            </div>
          </div>
        )}
        {showAditionnalInformation && (
          <div className="p-5">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              delectus deserunt facilis officiis fuga optio, saepe ratione!
              Deserunt aut nam eveniet possimus recusandae? Saepe illo commodi
              ratione tempora eum dolorum?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              delectus deserunt facilis officiis fuga optio, saepe ratione!
              Deserunt aut nam eveniet possimus recusandae? Saepe illo commodi
              ratione tempora eum dolorum?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              delectus deserunt facilis officiis fuga optio, saepe ratione!
              Deserunt aut nam eveniet possimus recusandae? Saepe illo commodi
              ratione tempora eum dolorum?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              delectus deserunt facilis officiis fuga optio, saepe ratione!
              Deserunt aut nam eveniet possimus recusandae? Saepe illo commodi
              ratione tempora eum dolorum?
            </p>
          </div>
        )}
        {showReviews && (
          <div className="p-5">
            <div>
              <p className="font-bold text-2xl">John Doe</p>
              <p className="text-gray-600">5.0</p>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                delectus deserunt facilis officiis fuga optio, saepe ratione!
                Deserunt aut nam eveniet possimus recusandae? Saepe illo commodi
                ratione tempora eum dolorum?
              </p>
            </div>
            <div>
              <p className="font-bold text-2xl">John Doe</p>
              <p className="text-gray-600">5.0</p>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                delectus deserunt facilis officiis fuga optio, saepe ratione!
                Deserunt aut nam eveniet possimus recusandae? Saepe illo commodi
                ratione tempora eum dolorum?
              </p>
            </div>
            <div>
              <p className="font-bold text-2xl">John Doe</p>
              <p className="text-gray-600">5.0</p>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                delectus deserunt facilis officiis fuga optio, saepe ratione!
                Deserunt aut nam eveniet possimus recusandae? Saepe illo commodi
                ratione tempora eum dolorum?
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 justify-start items-center w-full">
        <h2 className="text-2xl font-bold align-middle">Related Products</h2>
        <div className="flex flex-row gap-5 justify-start items-start w-120">
          {[1, 2, 3, 4].map((_, index) => (
            <ProductCard
              key={index}
              image={couch}
              title="ASGARD SOFA"
              price="250"
              discount="200"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              feature="New"
              id={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
