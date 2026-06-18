import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import Banner from "@/common/components/layout/Banner";
import Infos from "@/common/components/layout/Infos";
import shopBanner from "/public/shop_banner.webp";

function Contact() {
  const contactItems = [
    { icon: faLocationDot, title: "Address", text: "400 University Drive Suite 200, Coral Gables, FL 33134" },
    { icon: faPhone, title: "Phone", text: "+1 305 555 0198" },
    { icon: faEnvelope, title: "Email", text: "hello@furniro.com" },
    { icon: faClock, title: "Hours", text: "Monday to Friday, 9:00 AM - 6:00 PM" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for your message. We will get back to you soon.");
    e.target.reset();
  };

  return (
    <main className="bg-[#fbfbf9]">
      <Banner title="Contact" bgImage={shopBanner} breadcrumbs={[{ label: "Contact" }]} />

      <section className="container-page py-16 lg:py-24">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow">Get in touch</p>
          <h1 className="section-heading mt-2">We are here to help.</h1>
          <p className="section-copy mx-auto mt-4">
            Questions about a product, delivery, or an order? Send us a note and our team will respond quickly.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {contactItems.map((item) => (
              <article key={item.title} className="flex gap-4 rounded-lg border border-stone-200 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#EEF4EF] text-[#8F6B1F]">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                <div>
                  <h2 className="font-bold text-stone-950">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-stone-500">{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-bold text-stone-800">
                Name
                <input name="name" required className="field-control mt-2" placeholder="Your name" />
              </label>
              <label className="text-sm font-bold text-stone-800">
                Email
                <input name="email" type="email" required className="field-control mt-2" placeholder="you@example.com" />
              </label>
              <label className="sm:col-span-2 text-sm font-bold text-stone-800">
                Subject
                <input name="subject" required className="field-control mt-2" placeholder="How can we help?" />
              </label>
              <label className="sm:col-span-2 text-sm font-bold text-stone-800">
                Message
                <textarea name="message" required className="field-control mt-2 min-h-36 resize-y" placeholder="Tell us a little more" />
              </label>
            </div>
            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Infos />
    </main>
  );
}

export default Contact;
