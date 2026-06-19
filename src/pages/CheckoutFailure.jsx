import { Link, useSearchParams } from "react-router-dom";
import { CircleX } from "lucide-react";

export default function CheckoutFailure() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <main className="flex min-h-[70vh] items-center bg-[#fbfbf9]">
      <section className="container-page text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-error-muted)] text-4xl text-[var(--color-error)]">
          <CircleX size={40} />
        </span>
        <h1 className="mt-6 text-[var(--text-4xl)] font-extrabold text-[var(--color-text)]">Payment Failed</h1>
        <p className="mx-auto mt-4 max-w-md text-[var(--text-base)] leading-[var(--leading-normal)] text-[var(--color-text-muted)]">
          Your payment could not be processed. Please try again or choose a different payment method.
        </p>
        {orderId && (
          <p className="mt-3 text-sm text-stone-400">Order ID: {orderId.slice(0, 8)}...</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/checkout" className="btn-primary">Try Again</Link>
          <Link to="/cart" className="btn-secondary">Back to Cart</Link>
        </div>
      </section>
    </main>
  );
}
