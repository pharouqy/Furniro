import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function ProductCard({ image, title, price, discount, description, feature }) {
  return (
    <article className="relative flex flex-col justify-items-start items-flex-start w-full h-45 group">
      <span
        className={
          feature
            ? "absolute top-1 right-1 text-white text-xs px-1.5 py-2 rounded-full bg-red-600"
            : "absolute top-1 right-1 text-white text-xs px-1.5 py-2 rounded-full bg-green-600"
        }
      >
        {feature ? feature : "New"}
      </span>
      <img src={image} alt="couch" className="w-full h-full object-cover" />
      <div className="bg-mist-200 px-2 py-1">
        <h3 className="font-bold">{title}</h3>
        <p>{description}</p>
        <p className="flex gap-5 text-sm font-bold">
          {price} $
          <span className="line-through text-zinc-400">{discount}</span>
        </p>
      </div>
      <div className="overlay hidden group-hover:flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full bg-black/50 transition-all duration-500">
        <button className="btn-cart cursor-pointer px-6 py-2 bg-white text-amber-700 font-bold">
          Buy Now
        </button>
        <div className="flex gap-2 text-amber-50 my-5">
          <button className="cursor-pointer">
            <FontAwesomeIcon icon={faShareNodes} />
            Share
          </button>
          <button className="cursor-pointer">
            <FontAwesomeIcon icon={faCodeCompare} />
            Compare
          </button>
          <button className="cursor-pointer">
            <FontAwesomeIcon icon={faHeart} />
            Like
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
