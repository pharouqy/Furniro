import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useCartStore } from "@/features/cart/store/cartStore";

export default function OffCart({ isOpen, setIsOpen }) {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const subtotal = useCartStore((state) => state.getTotalPrice());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-modal="true" role="dialog">
      <button
        className="absolute inset-0 h-full w-full bg-stone-950/45 backdrop-blur-[2px]"
        onClick={() => setIsOpen(false)}
        aria-label="Close cart overlay"
      />

      <aside className="animate-slide-in absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-[var(--color-surface-elevated)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] p-6">
          <div>
            <p className="eyebrow">Furniro</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[var(--color-text)]">Shopping Cart</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-lg font-bold text-[var(--color-text)]">Your cart is empty.</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--color-text-muted)]">
                Add a piece from the shop and it will appear here.
              </p>
              <button onClick={() => setIsOpen(false)} className="btn-primary mt-6">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--color-border)]">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4 py-5">
                  <img src={item.picture} alt={item.title} loading="lazy" decoding="async" className="h-20 w-20 shrink-0 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex gap-3">
                      <h3 className="min-w-0 flex-1 truncate font-bold text-[var(--color-text)]" title={item.title}>
                        {item.title}
                      </h3>
                      <span className="shrink-0 text-sm font-bold text-[var(--color-text)]">
                        {(item.price * item.quantity).toLocaleString("fr-FR")} Da
                      </span>
                    </div>
                    {(item.size || item.color) && (
                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && " / "}
                        {item.color && `Color: ${item.color}`}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <p className="text-[var(--color-text-muted)]">
                        Qty {item.quantity} x {item.price.toLocaleString("fr-FR")} Da
                      </p>
                      <button
                        onClick={() => removeFromCart(item.variantId)}
                        className="font-bold text-[var(--color-error)] hover:text-[var(--color-error)]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

          {items.length > 0 && (
            <div className="border-t border-[var(--color-border)] bg-[var(--color-primary-subtle)] p-6">
              <div className="flex items-center justify-between font-bold text-[var(--color-text)]">
                <span>Subtotal</span>
                <span className="text-xl text-[var(--color-primary-hover)]">{subtotal.toLocaleString("fr-FR")} Da</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="btn-secondary bg-white px-4"
              >
                Cart
              </Link>
              <Link
                to="/checkout"
                onClick={() => setIsOpen(false)}
                className="btn-primary px-4"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
