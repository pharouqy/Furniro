import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faHeadset, faTruckFast, faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function Infos() {
  const items = [
    { icon: faTrophy, title: "High Quality", description: "Durable materials, carefully selected" },
    { icon: faCircleCheck, title: "Warranty Protection", description: "Coverage on every core product" },
    { icon: faTruckFast, title: "Free Shipping", description: "Fast delivery on qualifying orders" },
    { icon: faHeadset, title: "24/7 Support", description: "Helpful support when you need it" },
  ];

  return (
    <section className="w-full bg-[#EEF4EF] py-10 md:py-12" aria-label="Service promises">
      <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-4 rounded-lg bg-white/70 p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white text-xl text-[#8F6B1F] shadow-sm">
              <FontAwesomeIcon icon={item.icon} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-base font-bold leading-tight text-stone-950">{item.title}</h3>
              <p className="mt-1 text-sm leading-5 text-stone-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
