import { Link } from "react-router-dom";
import { useToastStore } from "@/common/stores/toastStore";

export default function Footer() {
  const addToast = useToastStore((state) => state.addToast);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      addToast("Subscribed successfully", "success");
      e.target.reset();
    }
  };

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-1)] flex flex-col justify-center items-center">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-4 md:gap-12 lg:py-16">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-[var(--color-text)]">Furniro.</h2>
            <p className="mt-5 text-sm leading-8 text-[var(--color-text-muted)]">
              Curated furniture for calm, functional homes. Designed for everyday living,
              delivered with care.
            </p>
          </div>
          <p className="text-sm leading-7 text-[var(--color-text-subtle)]">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </p>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all duration-300 hover:border-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-text-inverse)] hover:translate-y-[-2px] hover:shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all duration-300 hover:border-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-text-inverse)] hover:translate-y-[-2px] hover:shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all duration-300 hover:border-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-text-inverse)] hover:translate-y-[-2px] hover:shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M17.232 3.232l-6.768 6.768"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="eyebrow text-[var(--color-text-subtle)]">Links</h3>
          <ul className="mt-6 flex flex-col gap-4 text-sm font-semibold text-[var(--color-text)]">
            <li><Link to="/" className="transition-colors duration-300 hover:text-[var(--color-primary)]">Home</Link></li>
            <li><Link to="/shop" className="transition-colors duration-300 hover:text-[var(--color-primary)]">Shop</Link></li>
            <li><Link to="/about" className="transition-colors duration-300 hover:text-[var(--color-primary)]">About</Link></li>
            <li><Link to="/contact" className="transition-colors duration-300 hover:text-[var(--color-primary)]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-[var(--color-text-subtle)]">Help</h3>
          <ul className="mt-6 flex flex-col gap-4 text-sm font-semibold text-[var(--color-text)]">
            <li><a href="#payment" className="transition-colors duration-300 hover:text-[var(--color-primary)]">Payment Options</a></li>
            <li><a href="#returns" className="transition-colors duration-300 hover:text-[var(--color-primary)]">Returns</a></li>
            <li><a href="#privacy" className="transition-colors duration-300 hover:text-[var(--color-primary)]">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-[var(--color-text-subtle)]">Newsletter</h3>
          <p className="mt-6 text-sm leading-7 text-[var(--color-text-muted)]">
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

      <div className="container-page border-t border-[var(--color-border)] py-6 text-sm text-[var(--color-text-subtle)] flex flex-col md:flex-row justify-between items-center gap-4 md:py-8">
        <p>Copyright &copy; {currentYear} Furniro. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#terms" className="transition-colors duration-300 hover:text-[var(--color-primary)]">Terms of Service</a>
          <a href="#privacy" className="transition-colors duration-300 hover:text-[var(--color-primary)]">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
