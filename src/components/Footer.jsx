import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faPinterestP,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

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

  const socialLinks = [
    { icon: faFacebookF, label: "Facebook", url: "https://facebook.com" },
    { icon: faInstagram, label: "Instagram", url: "https://instagram.com" },
    { icon: faXTwitter, label: "X (formerly Twitter)", url: "https://x.com" },
    { icon: faPinterestP, label: "Pinterest", url: "https://pinterest.com" },
  ];

  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-4 md:gap-12 lg:py-16">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-neutral-900">Furniro.</h2>
            <p className="mt-5 text-sm leading-8 text-neutral-500">
              Curated furniture for calm, functional homes. Designed for everyday living,
              delivered with care.
            </p>
          </div>
          <p className="text-sm leading-7 text-neutral-400">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-all hover:border-neutral-950 hover:bg-neutral-950 hover:text-white hover:translate-y-[-2px]"
              >
                <FontAwesomeIcon icon={link.icon} size="sm" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow text-neutral-400">Links</h3>
          <ul className="mt-6 flex flex-col gap-4 text-sm font-semibold text-neutral-800">
            <li><Link to="/" className="hover:text-[#B88E2F]">Home</Link></li>
            <li><Link to="/shop" className="hover:text-[#B88E2F]">Shop</Link></li>
            <li><Link to="/about" className="hover:text-[#B88E2F]">About</Link></li>
            <li><Link to="/contact" className="hover:text-[#B88E2F]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-neutral-400">Help</h3>
          <ul className="mt-6 flex flex-col gap-4 text-sm font-semibold text-neutral-800">
            <li><a href="#payment" className="hover:text-[#B88E2F]">Payment Options</a></li>
            <li><a href="#returns" className="hover:text-[#B88E2F]">Returns</a></li>
            <li><a href="#privacy" className="hover:text-[#B88E2F]">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-neutral-400">Newsletter</h3>
          <p className="mt-6 text-sm leading-7 text-neutral-500">
            New pieces, styling notes, and private offers. No noise.
          </p>
          <form onSubmit={handleSubscribe} className="mt-6 flex gap-3">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              aria-label="Email address"
              className="field-control min-w-0"
            />
            <button type="submit" className="btn-primary shrink-0 px-6">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container-page border-t border-neutral-100 py-6 text-sm text-neutral-400 flex flex-col md:flex-row justify-between items-center gap-4 md:py-8">
        <p>Copyright &copy; {currentYear} Furniro. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#terms" className="hover:text-[#B88E2F]">Terms of Service</a>
          <a href="#privacy" className="hover:text-[#B88E2F]">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
