

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

function Slider({ objt }) {
  const [slide, setSlide] = useState(objt[0]);
  const [index, setIndex] = useState(0);
  const [dots, setDots] = useState(0);

  const handleClick = (index) => {
    console.log(index);
    if (index === objt.length - 1) {
      setIndex(0);
      setDots(0);
      setSlide(objt[0]);
      return;
    }
    index++;
    setIndex(index);
    setDots(index);
    setSlide(objt[index]);
  };
  return (
    <div className="presentation-slider w-33">
      <div className="slides relative w-full h-full flex justify-center items-center">
        <img
          src={slide}
          alt={`room-${index}`}
          className="flex w-50 h-45 object-cover"
        />
        <button
          onClick={() => handleClick(index)}
          className="absolute right-2 bottom-6 bg-white text-amber-500 px-2 py-2 font-bold cursor-pointer rounded-full"
        >
          {" "}
          <FontAwesomeIcon icon={faArrowRightLong} />
        </button>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((item) => (
          <div key={item}>
            <input
              type="radio"
              id={`dot-${item}`}
              name="dot"
              checked={dots === item}
              onChange={() => handleClick(item - 1)}
              className="hidden peer"
            />

            <label
              htmlFor={`dot-${item}`}
              className="
          w-2 h-2
          mt-3
          rounded-full
          border border-amber-500
          bg-white
          cursor-pointer
          block
          transition-all
          duration-300
          peer-checked:bg-amber-500
          peer-checked:scale-125
        "
            ></label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
