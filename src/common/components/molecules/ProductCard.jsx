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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
      {/* Image Container with Hover Overlay */}
      <div className="relative aspect-square overflow-hidden bg-[#EEF4EF]">
        <LazyImage
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        
        {badgeText && (
          <span
            className={`absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm ${
              hasDiscount ? "bg-[#C76543]" : "bg-emerald-700"
            }`}
          >
            {badgeText}
          </span>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-900/60 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
          <button
            onClick={handleAddToCart}
            className="w-44 rounded-full bg-white py-3 text-sm font-bold text-[#B88E2F] transition-all hover:bg-[#B88E2F] hover:text-white hover:scale-105 active:scale-95 shadow-md"
          >
            <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
            Add to Cart
          </button>
          
          <div className="mt-4 flex items-center justify-center gap-4 text-white text-xs font-semibold">
            <button className="flex items-center gap-1.5 transition-colors hover:text-[#dfcbb5]" aria-label="Share product">
              <FontAwesomeIcon icon={faShareNodes} />
              Share
            </button>
            <span className="text-white/40">|</span>
            <button className="flex items-center gap-1.5 transition-colors hover:text-[#dfcbb5]" aria-label="Compare product">
              <FontAwesomeIcon icon={faCodeCompare} />
              Compare
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-1.5 transition-colors ${isLiked ? "text-[#C76543]" : "hover:text-[#C76543]"}`}
              aria-pressed={isLiked}
              aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
            >
              <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartReg} />
              {isLiked ? "Liked" : "Like"}
            </button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between p-4 bg-neutral-50/50 md:p-5">
        <div>
          <Link to={`/product/${id}`} className="block">
            <h3 className="truncate text-base font-extrabold text-neutral-900 transition-colors hover:text-[#B88E2F]" title={title}>
              {title}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">{description}</p>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-base font-black text-neutral-900">
            {hasDiscount ? formattedFinalPrice : formattedPrice}
          </span>
          {hasDiscount && <span className="text-xs text-neutral-400 line-through">{formattedPrice}</span>}
        </div>
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
