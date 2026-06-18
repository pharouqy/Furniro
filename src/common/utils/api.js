const BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export { BASE_URL };

export const api = {
  getProducts: () => request("/products"),

  getProduct: (id) => request(`/products/${id}`),

  createOrder: (orderData) =>
    request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    }),

  createCheckout: (checkoutData) =>
    request("/payments/create-checkout", {
      method: "POST",
      body: JSON.stringify(checkoutData),
    }),

  checkPaymentStatus: (orderId) =>
    request(`/payments/check-status/${orderId}`),
};
