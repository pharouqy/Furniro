import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCodeCompare, faShareNodes, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { useLikeStore } from "@/features/products/store/likeStore";
import { useCartStore } from "@/features/cart/store/cartStore";
import LazyImage from "@/common/components/atoms/LazyImage";
import usePricing from "@/common/hooks/usePricing";

function ProductCard({ image, title, price, discount, description, feature, id }) {
  const toggleLike = useLikeStore((state) => state.toggleLike);
  const isLiked = useLikeStore((state) => state.isLiked(id));
  const addToCart = useCartStore((state) => state.addToCart);
  const { finalPrice, formattedPrice, formattedFinalPrice, formattedDiscount } = usePricing(price, discount);

  const hasDiscount = Boolean(formattedDiscount);
  const badgeText = formattedDiscount || feature;

  const handleLikeClick = (e) => {
    e.preventDefault();
    toggleLike(id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(
      {
        id,
        title,
        price: finalPrice,
        picture: image,
        size: "M",
        color: "Default",
      },
      1
    );
    alert(`${title} has been added to your cart.`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${id}`} className="relative block aspect-[4/3] overflow-hidden bg-[#EEF4EF]">
        <LazyImage
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badgeText && (
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white ${
              hasDiscount ? "bg-[#C76543]" : "bg-emerald-700"
            }`}
          >
            {badgeText}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[72px]">
          <Link to={`/product/${id}`} className="block">
            <h3 className="truncate text-lg font-bold text-stone-950 transition-colors hover:text-[#B88E2F]" title={title}>
              {title}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-stone-500">{description}</p>
        </div>

        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-extrabold text-stone-950">
            {hasDiscount ? formattedFinalPrice : formattedPrice}
          </span>
          {hasDiscount && <span className="text-sm text-stone-400 line-through">{formattedPrice}</span>}
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-stone-100 pt-4">
          <button onClick={handleAddToCart} className="btn-primary flex-1 px-3 py-2.5">
            <FontAwesomeIcon icon={faCartPlus} />
            Add
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 text-stone-600 transition-colors hover:border-[#B88E2F] hover:text-[#B88E2F]"
            aria-label="Share product"
          >
            <FontAwesomeIcon icon={faShareNodes} />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 text-stone-600 transition-colors hover:border-[#B88E2F] hover:text-[#B88E2F]"
            aria-label="Compare product"
          >
            <FontAwesomeIcon icon={faCodeCompare} />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 text-stone-600 transition-colors hover:border-[#C76543] hover:text-[#C76543]"
            onClick={handleLikeClick}
            aria-pressed={isLiked}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartReg} className={isLiked ? "text-[#C76543]" : ""} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
