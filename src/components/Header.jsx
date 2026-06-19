import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import logo from "/public/logo.svg";
import { useCartStore } from "@/features/cart/store/cartStore";
import { useLikeStore } from "@/features/products/store/likeStore";
import { useToastStore } from "@/common/stores/toastStore";
import OffCart from "./OffCart";
import ThemeToggle from "@/common/components/atoms/ThemeToggle";

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const countOfLikes = useLikeStore((state) => state.getCountOfLikes());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const addToast = useToastStore((state) => state.addToast);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const navClass = ({ isActive }) =>
    `relative py-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
      isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
    } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:bg-[var(--color-primary)] after:transition-transform after:duration-300 ${
      isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface-1)]/90 shadow-sm backdrop-blur-md transition-all duration-300 flex flex-col justify-center items-center">
        <div className="container-page flex min-h-[72px] items-center justify-between gap-5 py-3 md:min-h-16 md:py-0">
          <Link
            to="/"
            className="flex items-center gap-3 transition-transform hover:scale-[1.02]"
            aria-label="Furniro home"
          >
            <img src={logo} alt="" className="h-9 w-9 object-contain" />
            <span className="text-2xl font-black tracking-tight text-[var(--color-text)] sm:text-[var(--text-2xl)]">
              Furniro
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className={navClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              aria-label="Search"
              className="hidden h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-all duration-300 hover:bg-[var(--color-surface-2)] hover:text-[var(--color-primary)] hover:shadow-sm sm:flex active:scale-95"
            >
              <Search size={18} />
            </button>
            
            <Link
              to="/admin/login"
              aria-label="User account"
              className="hidden h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-all duration-300 hover:bg-[var(--color-surface-2)] hover:text-[var(--color-primary)] hover:shadow-sm sm:flex active:scale-95"
            >
              <User size={18} />
            </Link>
            
            <button
              onClick={() =>
                addToast(`${countOfLikes} item${countOfLikes > 1 ? "s" : ""} in wishlist`, "info")
              }
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-all duration-300 hover:bg-[var(--color-surface-2)] hover:text-[var(--color-primary)] hover:shadow-sm active:scale-95"
              aria-label={`Wishlist, ${countOfLikes} items`}
            >
              {countOfLikes > 0 && (
                <span key={countOfLikes} className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-error)] px-1.5 text-[9px] font-bold text-white shadow-sm animate-badge-pop">
                  {countOfLikes}
                </span>
              )}
              <Heart size={18} />
            </button>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-all duration-300 hover:bg-[var(--color-surface-2)] hover:text-[var(--color-primary)] hover:shadow-sm active:scale-95"
              aria-label={`Cart, ${totalItems} items`}
            >
              {totalItems > 0 && (
                <span key={totalItems} className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-text)] px-1.5 text-[9px] font-bold text-[var(--color-text-inverse)] shadow-sm animate-badge-pop">
                  {totalItems}
                </span>
              )}
              <ShoppingCart size={18} />
            </button>
            
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-[var(--color-text)] transition-all duration-300 hover:bg-[var(--color-surface-2)] hover:shadow-sm md:hidden active:scale-95"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav
            className="border-t border-[var(--color-border)] bg-[var(--color-surface-1)] md:hidden shadow-lg animate-fade-in"
            aria-label="Mobile navigation"
          >
            <ul className="container-page flex flex-col py-6 gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
                        isActive
                          ? "bg-[var(--color-primary-muted)] text-[var(--color-primary-hover)]"
                          : "text-[var(--color-text)] hover:bg-[var(--color-surface-2)]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <OffCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </>
  );
}
