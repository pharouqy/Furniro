const BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const { headers: extraHeaders, ...fetchOpts } = options;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...extraHeaders },
    ...fetchOpts,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export { BASE_URL };

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

function adminRequest(path, options = {}, token) {
  return request(path, {
    ...options,
    headers: { ...options.headers, ...authHeaders(token) },
  });
}

export const api = {
  getProducts: () => request("/products"),

  getProduct: (id) => request(`/products/${id}`),

  createProduct: (data, token) =>
    adminRequest("/products", {
      method: "POST",
      body: JSON.stringify(data),
    }, token),

  updateProduct: (id, data, token) =>
    adminRequest(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }, token),

  deleteProduct: (id, token) =>
    adminRequest(`/products/${id}`, { method: "DELETE" }, token),

  createOrder: (orderData) =>
    request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    }),

  getOrders: (params, token) =>
    adminRequest(`/orders?${new URLSearchParams(params)}`, {}, token),

  updateOrderStatus: (id, status, token) =>
    adminRequest(`/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }, token),

  deleteOrder: (id, token) =>
    adminRequest(`/orders/${id}`, { method: "DELETE" }, token),

  createCheckout: (checkoutData) =>
    request("/payments/create-checkout", {
      method: "POST",
      body: JSON.stringify(checkoutData),
    }),

  checkPaymentStatus: (orderId) =>
    request(`/payments/check-status/${orderId}`),
};
