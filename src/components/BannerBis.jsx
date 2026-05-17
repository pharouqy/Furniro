import { Link } from "react-router-dom";
import logo from "/public/logo.svg";

function BannerBis({ title, shopBanner }) {
  return (
    <div
      className={`flex flex-col justify-center items-center bg-cover bg-center w-full h-28`}
      style={{ backgroundImage: `url(${shopBanner})` }}
    >
      <div>
        <img src={logo} alt="logo" className="w-7 h-7" />
      </div>
      <div>
        <h1 className="text-center text-4xl font-bold">Shop</h1>

        <p>
          <Link to="/">Home</Link> \ {title}
        </p>
      </div>
    </div>
  );
}

export default BannerBis;
