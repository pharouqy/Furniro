import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Banner from "@/common/components/layout/Banner";
import Infos from "@/common/components/layout/Infos";
import Form from "../components/Form";
import { useCartStore } from "@/features/cart/store/cartStore";
import { useToastStore } from "@/common/stores/toastStore";
import { api } from "@/common/utils/api";
import shopBanner from "/public/shop_banner.webp";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const addToast = useToastStore((state) => state.addToast);
  const [submitting, setSubmitting] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["firstName", "lastName", "country", "address", "city", "state", "zip", "phone", "email"];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      addToast("Your cart is empty. Add products before checking out.", "error");
      return;
    }

    if (!selectedMethod) {
      addToast("Please select a payment method.", "error");
      return;
    }

    if (!validateForm()) {
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    try {
      const { orderId } = await api.createOrder({
        items: items.map((i) => ({
          productId: i.productId,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          color: i.color,
        })),
        ...formData,
      });

      if (selectedMethod === "card") {
        const { checkoutUrl } = await api.createCheckout({
          orderId,
          items: items.map((i) => ({
            price: i.price,
            quantity: i.quantity,
          })),
          customer: { email: formData.email },
        });
        window.location.href = checkoutUrl;
      } else {
        clearCart();
        addToast("Order placed successfully. Thank you!", "success");
        navigate("/");
      }
    } catch (err) {
      addToast(err.message || "Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const paymentMethods = [
    {
      id: "bank",
      label: "Direct Bank Transfer",
      description: "Make your payment directly into our bank account. Use your order ID as the payment reference.",
    },
    {
      id: "cash",
      label: "Cash On Delivery",
      description: "Pay with cash upon delivery. Our courier will collect the payment when your order arrives.",
    },
    {
      id: "card",
      label: "Pay with CIB / EDAHABIA",
      description: "Pay securely online via Chargily Pay using your CIB or EDAHABIA card.",
    },
  ];

  return (
    <main className="bg-[var(--color-bg)] flex flex-col justify-center items-center">
      <Banner
        title="Checkout"
        bgImage={shopBanner}
        breadcrumbs={[{ label: "Shop", path: "/shop" }, { label: "Checkout" }]}
      />

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_460px] lg:items-start lg:py-24">
        <Form formData={formData} onChange={handleFormChange} errors={errors} />

        <aside className="sticky top-28 rounded-3xl border border-[var(--color-border)] bg-[var(--color-primary-subtle)] p-8 shadow-[var(--shadow-md)]">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-5">
            <h2 className="text-2xl font-black text-[var(--color-text)]">Order Summary</h2>
            <span className="text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{items.length} items</span>
          </div>

          {items.length === 0 ? (
            <p className="py-12 text-center text-sm text-[var(--color-text-muted)]">Your cart is empty.</p>
          ) : (
            <div className="divide-y divide-[var(--color-border)] max-h-96 overflow-y-auto pr-2 my-2">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 py-5">
                  <img src={item.picture} alt={item.title} loading="lazy" decoding="async" className="h-16 w-16 rounded-xl object-cover shadow-sm bg-white" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-extrabold text-[var(--color-text)] text-sm">{item.title}</p>
                    <p className="mt-1 text-xs text-[var(--color-primary)] font-bold">
                      Qty {item.quantity}
                      {item.size && ` / ${item.size}`}
                      {item.color && ` / ${item.color}`}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[var(--color-text)]">
                    {(item.price * item.quantity).toLocaleString("fr-FR")} Da
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4 border-t border-[var(--color-border)] pt-6 text-sm">
            <div className="flex justify-between text-[var(--color-text-muted)] font-semibold">
              <span>Subtotal</span>
              <span>{totalPrice.toLocaleString("fr-FR")} Da</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-muted)] font-semibold">
              <span>Shipping</span>
              <span className="font-bold text-[var(--color-success)]">Free</span>
            </div>
            <div className="flex justify-between border-t border-[var(--color-border)] pt-5 text-lg font-black text-[var(--color-text)]">
              <span>Total</span>
              <span className="text-2xl text-[var(--color-primary-hover)]">{totalPrice.toLocaleString("fr-FR")} Da</span>
            </div>
          </div>

          <fieldset className="mt-8 space-y-4">
            <legend className="mb-4 text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">Payment Method</legend>
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`block rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                  selectedMethod === method.id 
                    ? "border-[var(--color-primary)] bg-[var(--color-surface-1)] shadow-sm" 
                    : "border-[var(--color-border)] bg-[var(--color-surface-1)] hover:border-[var(--color-border-strong)]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    className="h-4.5 w-4.5 accent-[var(--color-primary)] cursor-pointer"
                    checked={selectedMethod === method.id}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                  />
                  <span className="text-sm font-extrabold text-[var(--color-text)]">{method.label}</span>
                </span>
                {selectedMethod === method.id && (
                  <span className="mt-3 block pl-7 text-xs leading-6 text-[var(--color-text-muted)] transition-all duration-300">{method.description}</span>
                )}
              </label>
            ))}
          </fieldset>

          <p className="mt-6 text-xs leading-6 text-[var(--color-text-subtle)] font-medium">
            Your personal data will be used to process your order and support your experience on this website.
          </p>

          <button onClick={handlePlaceOrder} disabled={submitting} className="btn-primary mt-8 w-full shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Processing..." : "Place Order"}
          </button>
        </aside>
      </section>

      <Infos />
    </main>
  );
}
