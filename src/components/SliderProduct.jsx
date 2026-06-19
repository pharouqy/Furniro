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
    <div className="flex w-full flex-col gap-4 md:grid md:grid-cols-[88px_1fr]">
      <div className="order-2 flex gap-3 md:order-1 md:flex-col">
        {list.map((img, idx) => (
          <button
            key={img}
            onClick={() => setActiveIndex(idx)}
            className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-[var(--color-surface-2)] transition-all md:h-20 md:w-20 ${
              activeIndex === idx ? "border-[var(--color-primary)]" : "border-transparent opacity-70 hover:opacity-100"
            }`}
            aria-label={`Show product image ${idx + 1}`}
          >
            <img src={img} alt={`Product thumbnail ${idx + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="order-1 aspect-square overflow-hidden rounded-lg bg-[var(--color-surface-2)] md:order-2 md:aspect-[5/4]">
        <img
          src={list[activeIndex] || list[0]}
          alt="Product detail"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
}
