import { Link } from "react-router-dom";

function BannerShop() {
  return (
    <div className="flex flex-col justify-center items-center bg-[url('./public/shop_banner.webp')] bg-cover bg-center w-full h-28">
      <h1 className="text-center text-4xl font-bold">Shop</h1>

      <p>
        <Link to="/">Home</Link> \ Shop
      </p>
    </div>
  );
}

export default BannerShop;
