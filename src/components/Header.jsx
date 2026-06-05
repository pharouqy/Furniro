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
    `relative py-2 text-sm font-semibold transition-colors ${
      isActive ? "text-[#B88E2F]" : "text-stone-800 hover:text-[#B88E2F]"
    } after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:bg-[#B88E2F] after:transition-transform ${
      isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-[#fffdfa]/95 backdrop-blur">
        <div className="container-page flex min-h-[76px] items-center justify-between gap-5">
          <Link to="/" className="flex items-center gap-3" aria-label="Furniro home">
            <img src={logo} alt="" className="h-8 w-8 object-contain" />
            <span className="text-2xl font-extrabold tracking-tight text-stone-950 sm:text-3xl">
              Furniro
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className={navClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              aria-label="User account"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-100 hover:text-[#B88E2F] sm:flex"
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
            <button
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-100 hover:text-[#B88E2F] sm:flex"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <button
              onClick={() => alert(`You have ${countOfLikes} items in your wishlist.`)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-100 hover:text-[#B88E2F]"
              aria-label={`Wishlist, ${countOfLikes} items`}
            >
              {countOfLikes > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C76543] px-1 text-[10px] font-bold text-white">
                  {countOfLikes}
                </span>
              )}
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-100 hover:text-[#B88E2F]"
              aria-label={`Cart, ${totalItems} items`}
            >
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1F2933] px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-stone-800 transition-colors hover:bg-stone-100 md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-stone-200 bg-[#fffdfa] md:hidden" aria-label="Mobile navigation">
            <ul className="container-page flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-3 text-sm font-semibold ${
                        isActive ? "bg-[#F7F1E8] text-[#8F6B1F]" : "text-stone-800 hover:bg-stone-100"
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
