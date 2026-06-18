import Banner from "@/common/components/layout/Banner";
import Infos from "@/common/components/layout/Infos";
import shopBanner from "/public/shop_banner.webp";
import room1 from "/public/room1.jpg";
import room2 from "/public/room2.jpg";
import room3 from "/public/room3.jpg";

function About() {
  const values = [
    { title: "Materials first", text: "We choose woods, fabrics, and finishes that hold up to daily life." },
    { title: "Balanced design", text: "Every piece is selected for comfort, proportion, and easy styling." },
    { title: "Clear service", text: "From browsing to delivery, the experience stays simple and reliable." },
  ];

  return (
    <main className="bg-[#fbfbf9]">
      <Banner title="About" bgImage={shopBanner} breadcrumbs={[{ label: "About" }]} />

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
        <div>
          <p className="eyebrow">Our approach</p>
          <h1 className="section-heading mt-2">Furniture that makes a room easier to live in.</h1>
          <p className="section-copy mt-5">
            Furniro brings together warm modern pieces for homes that need to feel calm, useful,
            and personal. We focus on furniture that works hard without looking busy.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img src={room1} alt="Warm living room" className="h-72 w-full rounded-lg object-cover" />
          <img src={room2} alt="Bedroom interior" className="h-72 w-full rounded-lg object-cover" />
          <img src={room3} alt="Dining room detail" className="col-span-2 h-64 w-full rounded-lg object-cover" />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-lg border border-stone-200 p-6">
              <h2 className="text-xl font-bold text-stone-950">{value.title}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-500">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <Infos />
    </main>
  );
}

export default About;
