import { useState } from "react";

import couchSlider1 from "/public/couch-slider1.jpg";
import couchSlider2 from "/public/couch-slider2.jpg";
import couchSlider3 from "/public/couch-slider3.jpg";
import couchSlider4 from "/public/couch-slider4.jpg";

function SliderProduct() {
  const [selectedImage, setSelectedImage] = useState(couchSlider1);

  const handleSlider = (e) => {
    const slider = e.target.src;
    setSelectedImage(slider);
  };
  return (
    <div className="flex flex-row gap-5 justify-start items-start">
      <div className="flex flex-col gap-2 justify-start items-start">
        <img
          src={couchSlider1}
          alt="Couch Slider 1"
          onClick={handleSlider}
          className="w-50 h-full object-cover cursor-pointer rounded-xl"
        />
        <img
          src={couchSlider2}
          alt="Couch Slider 2"
          onClick={handleSlider}
          className="w-50 h-full object-cover cursor-pointer rounded-xl"
        />
        <img
          src={couchSlider3}
          alt="Couch Slider 3"
          onClick={handleSlider}
          className="w-50 h-full object-cover cursor-pointer rounded-xl"
        />
        <img
          src={couchSlider4}
          alt="Couch Slider 4"
          onClick={handleSlider}
          className="w-50 h-full object-cover cursor-pointer rounded-xl"
        />
      </div>
      <div>
        <img
          src={selectedImage}
          alt=""
          className="flex flex-row justify-center items-start w-200 h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}

export default SliderProduct;
