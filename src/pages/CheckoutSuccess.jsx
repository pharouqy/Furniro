import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { api } from "@/common/utils/api";
import { useCartStore } from "@/features/cart/store/cartStore";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState("verifying");
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (!orderId) {
      setStatus("unknown");
      return;
    }
    let cancelled = false;
    const check = async () => {
      try {
        const data = await api.checkPaymentStatus(orderId);
        if (!cancelled) {
          if (data.status === "paid") {
            clearCart();
            setStatus("paid");
          } else {
            setStatus("pending");
          }
        }
      } catch {
        if (!cancelled) setStatus("unknown");
      }
    };
    const timer = setTimeout(check, 1500);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [orderId, clearCart]);

  return (
    <main className="flex flex-col justify-center items-center min-h-[70vh] bg-[var(--color-bg)]">
      <section className="container-page text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-success-muted)] text-4xl text-[var(--color-success)]">
          <CircleCheck size={40} />
        </span>
        <h1 className="mt-6 text-[var(--text-4xl)] font-extrabold text-[var(--color-text)]">Payment Successful</h1>
        <p className="mx-auto mt-4 max-w-md text-[var(--text-base)] leading-[var(--leading-normal)] text-[var(--color-text-muted)]">
          {status === "paid"
            ? "Your order has been confirmed and is being prepared. Your cart has been cleared."
            : status === "verifying"
              ? "Verifying your payment, please wait..."
              : "Thank you for your purchase. You will receive a confirmation email shortly."}
        </p>
        {orderId && (
          <p className="mt-3 text-sm text-[var(--color-text-subtle)]">Order ID: {orderId.slice(0, 8)}...</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">Back Home</Link>
          <Link to="/shop" className="btn-secondary">Continue Shopping</Link>
        </div>
      </section>
    </main>
  );
}