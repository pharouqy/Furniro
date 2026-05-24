import { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import logo from "/public/logo.svg";

import Context from "../context/Context";

import OffCart from "./OffCart";

function Header() {
  const { quantity, panier } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="header flex justify-between items-center py-6 px-6">
        <div className="header__logo flex gap-2">
          <img src={logo} alt="logo" />
          <span className="text-3xl font-bold">Furniro</span>
        </div>
        <div className="header__menu">
          <ul className="flex justify-between items-center gap-8 font-bold">
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="header__search">
          <ul className="flex justify-between items-center gap-5">
            <li>
              <FontAwesomeIcon icon={faUser} />
            </li>
            <li>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </li>
            <li>
              <FontAwesomeIcon icon={faHeart} />
            </li>
            <li
              className="relative cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="bg-red-500 text-white rounded-2xl px-1 absolute bottom-1.5 left-1.5">
                {quantity}
              </span>
              <FontAwesomeIcon icon={faCartShopping} />
            </li>
          </ul>
        </div>
      </div>
      <OffCart panier={panier} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Header;
