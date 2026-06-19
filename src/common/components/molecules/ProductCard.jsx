import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Share2, GitCompare, Heart } from "lucide-react";
import { useLikeStore } from "@/features/products/store/likeStore";
import { useCartStore } from "@/features/cart/store/cartStore";
import LazyImage from "@/common/components/atoms/LazyImage";
import usePricing from "@/common/hooks/usePricing";
import { useToastStore } from "@/common/stores/toastStore";

function ProductCard({ image, title, price, discount, description, feature, id }) {
  const toggleLike = useLikeStore((state) => state.toggleLike);
  const isLiked = useLikeStore((state) => state.isLiked(id));
  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);
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
    addToast(`${title} added to cart`, "success");
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-sm transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      {/* Image Container with Hover Overlay */}
      <div className="relative aspect-square overflow-hidden bg-[var(--color-surface-2)]">
        <LazyImage
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {badgeText && (
          <span
            className={`absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm ${
              hasDiscount ? "bg-[var(--color-error)]" : "bg-[var(--color-success)]"
            }`}
          >
            {badgeText}
          </span>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-900/60 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
          <button
            onClick={handleAddToCart}
            className="w-44 rounded-full bg-[var(--color-surface-elevated)] py-3 text-sm font-bold text-[var(--color-primary)] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-[var(--color-text-inverse)] hover:scale-105 hover:shadow-lg active:scale-95 shadow-md"
          >
            <ShoppingCart size={16} className="mr-2 inline" />
            Add to Cart
          </button>
          
          <div className="mt-4 flex items-center justify-center gap-4 text-white text-xs font-semibold">
            <button className="flex items-center gap-1.5 transition-colors duration-300 hover:text-[var(--color-primary-muted)]" aria-label="Share product">
              <Share2 size={14} />
              Share
            </button>
            <span className="text-white/40">|</span>
            <button className="flex items-center gap-1.5 transition-colors duration-300 hover:text-[var(--color-primary-muted)]" aria-label="Compare product">
              <GitCompare size={14} />
              Compare
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-1.5 transition-colors duration-300 ${isLiked ? "text-[var(--color-error)]" : "hover:text-[var(--color-error)]"}`}
              aria-pressed={isLiked}
              aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={14} className={isLiked ? "fill-current" : ""} />
              {isLiked ? "Liked" : "Like"}
            </button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between p-4 bg-[var(--color-surface-2)] md:p-5">
        <div>
          <Link to={`/product/${id}`} className="block">
            <h3 className="truncate text-base font-extrabold text-[var(--color-text)] transition-colors duration-300 hover:text-[var(--color-primary)]" title={title}>
              {title}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--color-text-muted)]">{description}</p>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-base font-black text-[var(--color-text)]">
            {hasDiscount ? formattedFinalPrice : formattedPrice}
          </span>
          {hasDiscount && <span className="text-xs text-[var(--color-text-subtle)] line-through">{formattedPrice}</span>}
        </div>
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
