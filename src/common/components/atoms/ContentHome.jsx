export default function ContentHome({ living, text }) {
  return (
    <article className="group cursor-pointer">
      <div className="relative h-[360px] overflow-hidden rounded-lg bg-stone-100 shadow-sm">
        <img
          src={living}
          alt={text}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/65 to-transparent p-5 pt-16">
          <h3 className="text-left text-xl font-bold text-white">{text}</h3>
        </div>
      </div>
    </article>
  );
}
