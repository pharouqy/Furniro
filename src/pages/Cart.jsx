import { Link } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";

import Banner from "@/common/components/layout/Banner";
import Infos from "@/common/components/layout/Infos";
import { useCartStore } from "@/features/cart/store/cartStore";
import shopBanner from "/public/shop_banner.webp";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  return (
    <main className="bg-[var(--color-bg)]">
      <Banner title="Cart" bgImage={shopBanner} breadcrumbs={[{ label: "Cart" }]} />

      <section className="container-page grid gap-12 py-16 xl:grid-cols-[1fr_400px] xl:items-start xl:py-24">
        <div className="min-w-0">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] px-6 py-24 text-center shadow-[var(--shadow-sm)]">
              <p className="text-[var(--text-3xl)] font-black text-[var(--color-text)]">Your cart is empty.</p>
              <p className="mx-auto mt-4 max-w-md text-[var(--text-base)] leading-[var(--leading-normal)] text-[var(--color-text-muted)]">
                Browse our collections to add items to your cart, then complete your order here.
              </p>
              <Link to="/shop" className="btn-primary mt-8">
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-[var(--shadow-sm)]">
              <div className="min-w-[720px]">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_48px] gap-4 border-b border-[var(--color-border)] bg-[var(--color-primary-subtle)] px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text)]">
                  <span>Product</span>
                  <span className="text-center">Price</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-center">Subtotal</span>
                  <span />
                </div>

                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_48px] items-center gap-4 border-b border-[var(--color-border)] px-6 py-6 last:border-b-0"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <img src={item.picture} alt={item.title} loading="lazy" decoding="async" className="h-20 w-20 shrink-0 rounded-xl object-cover shadow-sm" />
                      <div className="min-w-0">
                        <p className="truncate font-extrabold text-[var(--color-text)]" title={item.title}>{item.title}</p>
                        {(item.size || item.color) && (
                          <p className="mt-1 text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
                            {item.size && `Size: ${item.size}`}
                            {item.size && item.color && " / "}
                            {item.color && `Color: ${item.color}`}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-center text-sm font-semibold text-[var(--color-text-muted)]">
                      {item.price.toLocaleString("fr-FR")} Da
                    </div>

                    <div className="flex justify-center">
                      <div className="flex h-11 w-28 items-center justify-between rounded-xl border border-[var(--color-border)] px-1 shadow-sm bg-[var(--color-surface-1)]">
                        <button
                          className="h-full px-2.5 font-bold text-[var(--color-text-subtle)] hover:text-[var(--color-text)] transition-colors"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          aria-label={`Decrease quantity for ${item.title}`}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.variantId, Number(e.target.value))}
                          className="w-8 bg-transparent text-center text-sm font-bold text-[var(--color-text)] focus:outline-none"
                          aria-label={`Quantity for ${item.title}`}
                        />
                        <button
                          className="h-full px-2.5 font-bold text-[var(--color-text-subtle)] hover:text-[var(--color-text)] transition-colors"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          aria-label={`Increase quantity for ${item.title}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-center text-sm font-bold text-[var(--color-text)]">
                      {(item.price * item.quantity).toLocaleString("fr-FR")} Da
                    </div>

                    <button
                      onClick={() => removeFromCart(item.variantId)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--color-text-subtle)] transition-all hover:bg-[var(--color-error-muted)] hover:text-[var(--color-error)] active:scale-95"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4 justify-between">
              <Link to="/shop" className="btn-secondary">
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear the cart?")) {
                    clearCart();
                  }
                }}
                className="rounded-full border border-[var(--color-error-muted)] bg-transparent px-8 py-3.5 text-sm font-bold text-[var(--color-error)] transition-all hover:border-[var(--color-error)] hover:bg-[var(--color-error)] hover:text-white cursor-pointer active:scale-95"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <aside className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-primary-subtle)] p-8 shadow-[var(--shadow-md)] xl:sticky xl:top-28">
            <h2 className="text-2xl font-black tracking-tight text-[var(--color-text)]">Cart Totals</h2>
            <div className="mt-8 space-y-5 border-b border-[var(--color-border)] pb-6 text-sm">
              <div className="flex justify-between text-[var(--color-text-muted)] font-semibold">
                <span>Subtotal</span>
                <span>{totalPrice.toLocaleString("fr-FR")} Da</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-muted)] font-semibold">
                <span>Shipping</span>
                <span className="font-bold text-[var(--color-success)]">Free</span>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-baseline text-lg font-black text-[var(--color-text)]">
              <span>Total</span>
              <span className="text-2xl text-[var(--color-primary-hover)]">{totalPrice.toLocaleString("fr-FR")} Da</span>
            </div>
            <Link to="/checkout" className="btn-primary mt-8 w-full shadow-md hover:shadow-lg">
              Proceed To Checkout
            </Link>
          </aside>
        )}
      </section>

      <Infos />
    </main>
  );
}
