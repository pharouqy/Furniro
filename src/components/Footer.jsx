import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer flex flex-col gap-4 justify-center items-center py-10 px-6">
      <div className="flex flex-row gap-4 justify-center items-start w-120">
        <div className="flex flex-col gap-2 w-33">
          <h2 className="font-extrabold text-5xl">Furino</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eaque
            vitae labore nobis accusantium ex nulla quod magnam praesentium.
            Exercitationem.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-33">
          <h3 className="font-bold text-2xl">Links</h3>
          <ul className="flex flex-col gap-2">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </ul>
        </div>
        <div className="flex flex-col gap-2 w-33">
          <h3 className="font-bold text-2xl">Help</h3>
          <u className="flex flex-col gap-2">
            <a href="#">Payement Options</a>
            <a href="#">Returns</a>
            <a href="#">Pravicy Policies</a>
          </u>
        </div>
        <div className="flex flex-col gap-2 w-33">
          <h3 className="font-bold text-2xl">Subscribe</h3>
          <form className="flex gap-2">
            <input type="email" placeholder="Enter Your Email Adress" />
            <button
              type="submit"
              className="underline cursor-pointer uppercase"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <hr className="w-full h-1 border-zinc-400" />
      <div className="flex justify-start items-start w-120">
        <p>Copyright © 2026 Furino - All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
