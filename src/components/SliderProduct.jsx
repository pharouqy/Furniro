import { useEffect, useState } from "react";
import couchSlider1 from "/public/couch-slider1.jpg";
import couchSlider2 from "/public/couch-slider2.jpg";
import couchSlider3 from "/public/couch-slider3.jpg";
import couchSlider4 from "/public/couch-slider4.jpg";

export default function SliderProduct({ images = [] }) {
  const defaultImages = [couchSlider1, couchSlider2, couchSlider3, couchSlider4];
  const list = images.length > 0 ? images : defaultImages;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  return (
    <div className="grid w-full gap-4 md:grid-cols-[88px_1fr]">
      <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
        {list.map((img, idx) => (
          <button
            key={img}
            onClick={() => setActiveIndex(idx)}
            className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-stone-100 transition-all ${
              activeIndex === idx ? "border-[#B88E2F]" : "border-transparent opacity-70 hover:opacity-100"
            }`}
            aria-label={`Show product image ${idx + 1}`}
          >
            <img src={img} alt={`Product thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="aspect-square overflow-hidden rounded-lg bg-[#EEF4EF] md:aspect-[5/4]">
        <img
          src={list[activeIndex] || list[0]}
          alt="Product detail"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
}
