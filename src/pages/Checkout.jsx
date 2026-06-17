import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Banner from "@/common/components/layout/Banner";
import Infos from "@/common/components/layout/Infos";
import Form from "../components/Form";
import { useCartStore } from "@/features/cart/store/cartStore";
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
      alert("Your cart is empty. Please add products before checkout.");
      return;
    }

    if (!selectedMethod) {
      alert("Please select a payment method.");
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
        alert("Order placed successfully. Thank you for shopping with Furniro.");
        navigate("/");
      }
    } catch (err) {
      alert(err.message || "Something went wrong. Please try again.");
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
    <main className="bg-[#fffdfa]">
      <Banner
        title="Checkout"
        bgImage={shopBanner}
        breadcrumbs={[{ label: "Shop", path: "/shop" }, { label: "Checkout" }]}
      />

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_440px] lg:items-start lg:py-16">
        <Form formData={formData} onChange={handleFormChange} errors={errors} />

        <aside className="sticky top-24 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <h2 className="text-2xl font-extrabold text-stone-950">Order Summary</h2>
            <span className="text-sm font-semibold text-stone-500">{items.length} items</span>
          </div>

          {items.length === 0 ? (
            <p className="py-8 text-center text-sm text-stone-500">Your cart is empty.</p>
          ) : (
            <div className="divide-y divide-stone-100">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 py-4">
                  <img src={item.picture} alt={item.title} className="h-16 w-16 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-stone-950">{item.title}</p>
                    <p className="mt-1 text-xs text-stone-500">
                      Qty {item.quantity}
                      {item.size && ` / ${item.size}`}
                      {item.color && ` / ${item.color}`}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-stone-700">
                    {(item.price * item.quantity).toLocaleString("fr-FR")} Da
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 border-t border-stone-200 pt-5 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span>{totalPrice.toLocaleString("fr-FR")} Da</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Shipping</span>
              <span className="font-bold text-emerald-700">Free</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-4 text-lg font-extrabold text-stone-950">
              <span>Total</span>
              <span className="text-[#8F6B1F]">{totalPrice.toLocaleString("fr-FR")} Da</span>
            </div>
          </div>

          <fieldset className="mt-6 space-y-3">
            <legend className="mb-3 text-sm font-bold text-stone-950">Payment Method</legend>
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`block rounded-lg border p-4 transition-colors ${
                  selectedMethod === method.id ? "border-[#B88E2F] bg-[#F7F1E8]" : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    className="h-4 w-4 accent-[#B88E2F]"
                    checked={selectedMethod === method.id}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                  />
                  <span className="text-sm font-bold text-stone-900">{method.label}</span>
                </span>
                {selectedMethod === method.id && (
                  <span className="mt-2 block pl-7 text-xs leading-6 text-stone-500">{method.description}</span>
                )}
              </label>
            ))}
          </fieldset>

          <p className="mt-5 text-xs leading-6 text-stone-500">
            Your personal data will be used to process your order and support your experience on this website.
          </p>

          <button onClick={handlePlaceOrder} disabled={submitting} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Processing..." : "Place Order"}
          </button>
        </aside>
      </section>

      <Infos />
    </main>
  );
}
