import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import logo from "/public/logo.svg";
import { useCartStore } from "@/features/cart/store/cartStore";
import { useLikeStore } from "@/features/products/store/likeStore";
import OffCart from "./OffCart";

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const countOfLikes = useLikeStore((state) => state.getCountOfLikes());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const navClass = ({ isActive }) =>
    `relative py-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
      isActive ? "text-[#B88E2F]" : "text-neutral-700 hover:text-[#B88E2F]"
    } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:bg-[#B88E2F] after:transition-transform after:duration-300 ${
      isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/90 shadow-sm backdrop-blur-md transition-all duration-300">
        <div className="container-page flex min-h-[72px] items-center justify-between gap-5 py-3 md:min-h-[88px] md:py-4">
          <Link
            to="/"
            className="flex items-center gap-3 transition-transform hover:scale-[1.02]"
            aria-label="Furniro home"
          >
            <img src={logo} alt="" className="h-9 w-9 object-contain" />
            <span className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
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
            <Link
              to="/admin/login"
              className="hidden rounded-lg bg-[#F7F1E8] px-4 py-2 text-sm font-semibold text-[#8F6B1F] transition-transform hover:scale-[1.02] md:block"
              aria-label="Shop now"
            >
              <button
                aria-label="User account"
                className="hidden h-11 w-11 items-center justify-center rounded-full text-neutral-700 transition-all hover:bg-neutral-50 hover:text-[#B88E2F] sm:flex active:scale-95"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
            </Link>

            <button
              aria-label="Search"
              className="hidden h-11 w-11 items-center justify-center rounded-full text-neutral-700 transition-all hover:bg-neutral-50 hover:text-[#B88E2F] sm:flex active:scale-95"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <button
              onClick={() =>
                alert(`You have ${countOfLikes} items in your wishlist.`)
              }
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-neutral-700 transition-all hover:bg-neutral-50 hover:text-[#B88E2F] active:scale-95"
              aria-label={`Wishlist, ${countOfLikes} items`}
            >
              {countOfLikes > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#dd6b20] px-1.5 text-[9px] font-bold text-white shadow-sm animate-pulse">
                  {countOfLikes}
                </span>
              )}
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-neutral-700 transition-all hover:bg-neutral-50 hover:text-[#B88E2F] active:scale-95"
              aria-label={`Cart, ${totalItems} items`}
            >
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1.5 text-[9px] font-bold text-white shadow-sm">
                  {totalItems}
                </span>
              )}
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-neutral-800 transition-all hover:bg-neutral-50 md:hidden active:scale-95"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav
            className="border-t border-neutral-100 bg-[#fffdfa] md:hidden shadow-lg animate-fade-in"
            aria-label="Mobile navigation"
          >
            <ul className="container-page flex flex-col py-6 gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3.5 text-sm font-semibold tracking-wide transition-all ${
                        isActive
                          ? "bg-[#F7F1E8] text-[#8F6B1F]"
                          : "text-neutral-800 hover:bg-neutral-50"
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
