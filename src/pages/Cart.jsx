import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
    <main className="bg-[#fffdfa]">
      <Banner title="Cart" bgImage={shopBanner} breadcrumbs={[{ label: "Cart" }]} />

      <section className="container-page grid gap-8 py-12 xl:grid-cols-[1fr_380px] xl:items-start xl:py-16">
        <div className="min-w-0">
          {items.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-white px-6 py-20 text-center shadow-sm">
              <p className="text-2xl font-extrabold text-stone-950">Your cart is empty.</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-stone-500">
                Add a product from the shop and it will appear here with quantity, options, and totals.
              </p>
              <Link to="/shop" className="btn-primary mt-7">
                <FontAwesomeIcon icon={faArrowLeft} />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white shadow-sm">
              <div className="min-w-[720px]">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_48px] gap-4 border-b border-stone-200 bg-[#F7F1E8] px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-stone-600">
                  <span>Product</span>
                  <span className="text-center">Price</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-center">Subtotal</span>
                  <span />
                </div>

                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_48px] items-center gap-4 border-b border-stone-100 px-5 py-5 last:border-b-0"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <img src={item.picture} alt={item.title} className="h-20 w-20 shrink-0 rounded-md object-cover" />
                      <div className="min-w-0">
                        <p className="truncate font-bold text-stone-950" title={item.title}>{item.title}</p>
                        {(item.size || item.color) && (
                          <p className="mt-1 text-xs text-stone-500">
                            {item.size && `Size: ${item.size}`}
                            {item.size && item.color && " / "}
                            {item.color && `Color: ${item.color}`}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-center text-sm font-medium text-stone-600">
                      {item.price.toLocaleString("fr-FR")} Da
                    </div>

                    <div className="flex justify-center">
                      <div className="flex h-10 w-28 items-center justify-between rounded-md border border-stone-200">
                        <button
                          className="h-full px-3 font-bold text-stone-500 hover:text-stone-950"
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
                          className="w-10 bg-transparent text-center text-sm font-bold focus:outline-none"
                          aria-label={`Quantity for ${item.title}`}
                        />
                        <button
                          className="h-full px-3 font-bold text-stone-500 hover:text-stone-950"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          aria-label={`Increase quantity for ${item.title}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-center text-sm font-bold text-stone-950">
                      {(item.price * item.quantity).toLocaleString("fr-FR")} Da
                    </div>

                    <button
                      onClick={() => removeFromCart(item.variantId)}
                      className="flex h-10 w-10 items-center justify-center rounded-md text-[#C76543] transition-colors hover:bg-[#C76543] hover:text-white"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Link to="/shop" className="btn-secondary">
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear the cart?")) {
                    clearCart();
                  }
                }}
                className="rounded-md border border-[#C76543] px-6 py-3 text-sm font-bold text-[#C76543] transition-colors hover:bg-[#C76543] hover:text-white"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <aside className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm xl:sticky xl:top-24">
            <h2 className="text-2xl font-extrabold text-stone-950">Cart Totals</h2>
            <div className="mt-6 space-y-4 border-b border-stone-200 pb-5 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{totalPrice.toLocaleString("fr-FR")} Da</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="font-bold text-emerald-700">Free</span>
              </div>
            </div>
            <div className="mt-5 flex justify-between text-lg font-extrabold text-stone-950">
              <span>Total</span>
              <span className="text-[#8F6B1F]">{totalPrice.toLocaleString("fr-FR")} Da</span>
            </div>
            <Link to="/checkout" className="btn-primary mt-7 w-full">
              Proceed To Checkout
            </Link>
          </aside>
        )}
      </section>

      <Infos />
    </main>
  );
}
