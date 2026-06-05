import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      e.target.reset();
    }
  };

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_0.7fr_0.7fr_1.2fr]">
        <div className="max-w-sm">
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-950">Furniro.</h2>
          <p className="mt-5 text-sm leading-7 text-stone-500">
            Curated furniture for calm, functional homes. Designed for everyday living,
            delivered with care.
          </p>
          <p className="mt-5 text-sm leading-7 text-stone-400">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-stone-400">Links</h3>
          <ul className="mt-5 flex flex-col gap-3 text-sm font-semibold text-stone-800">
            <li><Link to="/" className="hover:text-[#B88E2F]">Home</Link></li>
            <li><Link to="/shop" className="hover:text-[#B88E2F]">Shop</Link></li>
            <li><Link to="/about" className="hover:text-[#B88E2F]">About</Link></li>
            <li><Link to="/contact" className="hover:text-[#B88E2F]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-stone-400">Help</h3>
          <ul className="mt-5 flex flex-col gap-3 text-sm font-semibold text-stone-800">
            <li><a href="#payment" className="hover:text-[#B88E2F]">Payment Options</a></li>
            <li><a href="#returns" className="hover:text-[#B88E2F]">Returns</a></li>
            <li><a href="#privacy" className="hover:text-[#B88E2F]">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-stone-400">Newsletter</h3>
          <p className="mt-5 text-sm leading-6 text-stone-500">
            New pieces, styling notes, and private offers. No noise.
          </p>
          <form onSubmit={handleSubscribe} className="mt-5 flex gap-2">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              aria-label="Email address"
              className="field-control min-w-0"
            />
            <button type="submit" className="btn-primary shrink-0 px-4">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container-page border-t border-stone-100 py-6 text-sm text-stone-500">
        <p>Copyright &copy; {currentYear} Furniro. All rights reserved.</p>
      </div>
    </footer>
  );
}
