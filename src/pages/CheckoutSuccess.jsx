import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { api } from "@/common/utils/api";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    if (!orderId) {
      setStatus("unknown");
      return;
    }
    let cancelled = false;
    const check = async () => {
      try {
        const data = await api.checkPaymentStatus(orderId);
        if (!cancelled) setStatus(data.status === "paid" ? "paid" : "pending");
      } catch {
        if (!cancelled) setStatus("unknown");
      }
    };
    const timer = setTimeout(check, 1500);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [orderId]);

  return (
    <main className="flex min-h-[70vh] items-center bg-[#fbfbf9]">
      <section className="container-page text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-600">
          <FontAwesomeIcon icon={faCircleCheck} />
        </span>
        <h1 className="mt-6 text-4xl font-extrabold text-stone-950">Payment Successful</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-stone-500">
          {status === "paid"
            ? "Your order has been confirmed and is being prepared."
            : status === "verifying"
              ? "Verifying your payment, please wait..."
              : "Thank you for your purchase. You will receive a confirmation email shortly."}
        </p>
        {orderId && (
          <p className="mt-3 text-sm text-stone-400">Order ID: {orderId.slice(0, 8)}...</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">Back Home</Link>
          <Link to="/shop" className="btn-secondary">Continue Shopping</Link>
        </div>
      </section>
    </main>
  );
}
