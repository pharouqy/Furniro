function GridSection({ house1, house2, house3, house4, house5, house6, house7 }) {
  const images = [
    { src: house1, alt: "Dining setup with wooden furniture", className: "md:col-span-2 md:row-span-2" },
    { src: house5, alt: "Compact home decor detail", className: "" },
    { src: house7, alt: "Living room furniture setup", className: "md:col-span-2" },
    { src: house2, alt: "Neutral lounge room", className: "" },
    { src: house6, alt: "Warm interior styling", className: "" },
    { src: house4, alt: "Bedroom furniture inspiration", className: "md:col-span-2" },
    { src: house3, alt: "Modern home detail", className: "md:col-span-2" },
  ];

  return (
    <div className="grid auto-rows-[140px] grid-cols-2 gap-2 sm:auto-rows-[170px] sm:gap-3 md:grid-cols-4 md:auto-rows-[190px]">
      {images.map((image) => (
        <div key={image.alt} className={`overflow-hidden rounded-lg bg-[var(--color-surface-2)] ${image.className}`}>
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export default GridSection;
