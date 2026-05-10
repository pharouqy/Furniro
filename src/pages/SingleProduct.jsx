import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faSquareFacebook,
  faSquareLinkedin,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import couchSlider1 from "/public/couch-slider1.jpg";
import couchSlider2 from "/public/couch-slider2.jpg";
import couchSlider3 from "/public/couch-slider3.jpg";
import couchSlider4 from "/public/couch-slider4.jpg";

function SingleProduct() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(couchSlider1);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSlider = (e) => {
    const slider = e.target.src;
    setSelectedImage(slider);
  };

  return (
    <div className="single_product">
      <div className="bg-amber-100 py-7 px-5 flex flex-row gap-1 justify-start items-center">
        <Link to="/" className="font-bold">
          Home
        </Link>{" "}
        \{" "}
        <Link to="/shop" className="font-bold">
          Shop
        </Link>{" "}
        | Product {id}
      </div>
      <div className="flex flex-row gap-5 justify-center items-center">
        <div>
          <div>
            <img
              src={couchSlider1}
              alt="Couch Slider 1"
              onClick={handleSlider}
            />
            <img
              src={couchSlider2}
              alt="Couch Slider 2"
              onClick={handleSlider}
            />
            <img
              src={couchSlider3}
              alt="Couch Slider 3"
              onClick={handleSlider}
            />
            <img
              src={couchSlider4}
              alt="Couch Slider 4"
              onClick={handleSlider}
            />
          </div>
          <div>
            <img src={selectedImage} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-start items-start">
          <h2 className="font-bold text-2xl mb-4">
            Lorem ipsum dolor sit amet.
          </h2>
          <span>2 500 Da</span>
          <div className="flex flex-row gap-2 justify-start items-center">
            <div>
              <div className="flex flex-row gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className={`cursor-pointer text-xl transition-colors duration-200 ${
                      star <= (hover || rating)
                        ? "text-amber-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
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
            <div>
              <button>L</button>
              <button>XL</button>
              <button>XS</button>
            </div>
          </div>
          <div>
            <h3>Color</h3>
            <div>
              <button className="w-5 h-5 rounded-full bg-red-500"></button>
              <button className="w-5 h-5 rounded-full bg-green-500"></button>
              <button className="w-5 h-5 rounded-full bg-blue-500"></button>
            </div>
          </div>
          <div>
            <div>
              <button>-</button>
              <input type="text" />
              <button>+</button>
            </div>
            <button>Add to cart</button>
            <button>+ Compare</button>
          </div>
          <hr />
          <div>
            <ul>
              <li>
                <p>SKU : 123456789</p>
              </li>
              <li>
                <p>Category : Sofas</p>
              </li>
              <li>
                <p>Tags : Sofa, Chair, Home, Shop</p>
              </li>
              <li>
                <p>
                  Share :{" "}
                  <div>
                    <FontAwesomeIcon icon={faSquareFacebook} />
                    <FontAwesomeIcon icon={faSquareLinkedin} />
                    <FontAwesomeIcon icon={faSquareXTwitter} />
                  </div>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
