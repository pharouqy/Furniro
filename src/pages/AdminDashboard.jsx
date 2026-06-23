import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Trash2, Package, AlertTriangle, Plus, Pencil, X, Save, ListOrdered } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/common/stores/toastStore";
import { api } from "@/common/utils/api";

const STATUSES = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];

const BADGE = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-emerald-100 text-emerald-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const DEFAULT_PRODUCT_FORM = {
  title: "", description: "", price: "", discount: "", image: "", category: "",
};

function ProductForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial || DEFAULT_PRODUCT_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "Valid price required";
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    onSave({ ...form, price: Number(form.price) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onCancel}>
      <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-extrabold text-[var(--color-text)]">{initial ? "Edit Product" : "New Product"}</h3>
          <button onClick={onCancel} className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-text-subtle)] hover:bg-[var(--color-surface-2)]"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-[var(--color-text)]">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} className={`field-control mt-1 ${errors.title ? "border-[var(--color-error)]" : ""}`} />
            {errors.title && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.title}</p>}
          </div>
          <div>
            <label className="text-sm font-bold text-[var(--color-text)]">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="field-control mt-1 min-h-20 resize-y" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-[var(--color-text)]">Price (Da) *</label>
              <input name="price" type="number" min="0" value={form.price} onChange={handleChange} className={`field-control mt-1 ${errors.price ? "border-[var(--color-error)]" : ""}`} />
              {errors.price && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.price}</p>}
            </div>
            <div>
              <label className="text-sm font-bold text-[var(--color-text)]">Discount (%)</label>
              <input name="discount" value={form.discount} onChange={handleChange} placeholder="e.g. 30%" className="field-control mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-[var(--color-text)]">Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} className="field-control mt-1" />
            </div>
            <div>
              <label className="text-sm font-bold text-[var(--color-text)]">Category</label>
              <input name="category" value={form.category} onChange={handleChange} className="field-control mt-1" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? "Saving..." : <><Save size={16} /> {initial ? "Update" : "Create"}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { token, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);

  const [tab, setTab] = useState("orders");

  // Orders state
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const limit = 20;

  // Products state
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoading(true); setError("");
    try {
      const data = await api.getOrders({ page, limit, ...(filterStatus && { status: filterStatus }) }, token);
      setOrders(data.orders);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, page, filterStatus]);

  useEffect(() => { if (tab === "orders") fetchOrders(); }, [fetchOrders, tab]);

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data.products);
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setProductsLoading(false);
    }
  }, [addToast]);

  useEffect(() => { if (tab === "products") fetchProducts(); }, [fetchProducts, tab]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await api.updateOrderStatus(orderId, newStatus, token);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      addToast(`Order status updated`, "success");
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Delete this order permanently?")) return;
    try {
      await api.deleteOrder(orderId, token);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      addToast("Order deleted", "success");
    } catch (err) {
      addToast(err.message, "error");
    }
  };

  const handleSaveProduct = async (data) => {
    setSavingProduct(true);
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct._id, data, token);
        setProducts((prev) => prev.map((p) => (p._id === editingProduct._id ? { ...p, ...data } : p)));
        addToast("Product updated", "success");
      } else {
        const res = await api.createProduct(data, token);
        setProducts((prev) => [...prev, res.product]);
        addToast("Product created", "success");
      }
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      await api.deleteProduct(productId, token);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      addToast("Product deleted", "success");
    } catch (err) {
      addToast(err.message, "error");
    }
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const openNewProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const totalPages = Math.ceil(total / limit);

  if (!token) {
    navigate("/admin/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col justify-center items-center">
      {showProductForm && (
        <ProductForm
          initial={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => { setShowProductForm(false); setEditingProduct(null); }}
          saving={savingProduct}
        />
      )}

      <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)] text-sm font-bold text-[var(--color-text-inverse)]">F</span>
            <div>
              <h1 className="text-base font-extrabold text-[var(--color-text)]">Admin</h1>
              <p className="text-xs text-[var(--color-text-subtle)]">{user?.email}</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate("/admin/login"); }}
            className="flex items-center gap-2 rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-2)]">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="container-page py-8 w-full">
        <div className="mb-6 flex gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-1 w-fit">
          <button onClick={() => setTab("orders")} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors ${tab === "orders" ? "bg-[var(--color-surface-elevated)] text-[var(--color-text)] shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}>
            <ListOrdered size={16} /> Orders
          </button>
          <button onClick={() => setTab("products")} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors ${tab === "products" ? "bg-[var(--color-surface-elevated)] text-[var(--color-text)] shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}>
            <Package size={16} /> Products
          </button>
        </div>

        {tab === "orders" && (
          <>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-[var(--text-2xl)] font-extrabold text-[var(--color-text)]">Orders</h2>
                <p className="mt-1 text-[var(--text-sm)] text-[var(--color-text-muted)]">{total} total orders</p>
              </div>
              <div className="flex items-center gap-3">
                <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="field-control h-10 w-44">
                  <option value="">All statuses</option>
                  {STATUSES.map((s) => (<option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>))}
                </select>
              </div>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-3 rounded-md bg-[var(--color-error-muted)] px-4 py-3 text-sm font-semibold text-[var(--color-error)]">
                <AlertTriangle size={16} /> {error}
              </div>
            )}

            {loading ? (
              <div className="space-y-3">{[1,2,3].map((i) => (<div key={i} className="h-20 animate-pulse rounded-lg bg-[var(--color-surface-2)]" />))}</div>
            ) : orders.length === 0 ? (
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)] py-16 text-center">
                <Package className="mx-auto mb-3 text-3xl text-[var(--color-text-subtle)]" />
                <p className="text-lg font-semibold text-[var(--color-text-muted)]">No orders found</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] bg-[var(--color-primary-subtle)] text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      <th className="px-4 py-3">Order</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Payment</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {orders.map((order) => (
                      <tr key={order.id} className="transition-colors hover:bg-[var(--color-surface-2)]">
                        <td className="max-w-[100px] px-4 py-4 font-mono text-xs font-bold text-[var(--color-text)]">#{order.id?.slice(0, 8)}</td>
                        <td className="px-4 py-4">
                          <p className="font-semibold text-[var(--color-text)]">{order.customer_name}</p>
                          <p className="text-xs text-[var(--color-text-subtle)]">{order.customer_email}</p>
                        </td>
                        <td className="px-4 py-4 text-[var(--color-text-muted)]">{new Date(order.created_at).toLocaleDateString("fr-FR")}</td>
                        <td className="px-4 py-4 text-xs font-semibold text-[var(--color-text-muted)]">{order.payment_method || "—"}</td>
                        <td className="px-4 py-4 font-bold text-[var(--color-text)]">{Number(order.total_amount).toLocaleString("fr-FR")} Da</td>
                        <td className="px-4 py-4">
                          <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)} disabled={updatingId === order.id}
                            className={`rounded-full px-2.5 py-1 text-xs font-bold ${BADGE[order.status] || "bg-[var(--color-surface-2)] text-[var(--color-text-muted)]"} border-0 cursor-pointer`}>
                            {STATUSES.map((s) => (<option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>))}
                          </select>
                        </td>
                        <td className="px-4 py-4">
                          <button onClick={() => handleDeleteOrder(order.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-text-subtle)] transition-colors hover:bg-[var(--color-error-muted)] hover:text-[var(--color-error)]"
                            aria-label="Delete order"><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] disabled:opacity-40">Previous</button>
                <span className="px-3 text-sm font-semibold text-[var(--color-text-muted)]">Page {page} / {totalPages}</span>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] disabled:opacity-40">Next</button>
              </div>
            )}
          </>
        )}

        {tab === "products" && (
          <>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-[var(--text-2xl)] font-extrabold text-[var(--color-text)]">Products</h2>
                <p className="mt-1 text-[var(--text-sm)] text-[var(--color-text-muted)]">{products.length} total products</p>
              </div>
              <button onClick={openNewProduct} className="btn-primary flex items-center gap-2">
                <Plus size={16} /> Add Product
              </button>
            </div>

            {productsLoading ? (
              <div className="space-y-3">{[1,2,3].map((i) => (<div key={i} className="h-20 animate-pulse rounded-lg bg-[var(--color-surface-2)]" />))}</div>
            ) : products.length === 0 ? (
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)] py-16 text-center">
                <Package className="mx-auto mb-3 text-3xl text-[var(--color-text-subtle)]" />
                <p className="text-lg font-semibold text-[var(--color-text-muted)]">No products yet</p>
                <button onClick={openNewProduct} className="btn-primary mt-4">Add your first product</button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] bg-[var(--color-primary-subtle)] text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Discount</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {products.map((product) => (
                      <tr key={product._id} className="transition-colors hover:bg-[var(--color-surface-2)]">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            {product.image && <img src={product.image} alt="" className="h-10 w-10 rounded-lg object-cover bg-white" />}
                            <div>
                              <p className="font-semibold text-[var(--color-text)]">{product.title}</p>
                              <p className="text-xs text-[var(--color-text-subtle)] line-clamp-1">{product.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-xs font-semibold text-[var(--color-text-muted)]">{product.category || "—"}</td>
                        <td className="px-4 py-4 font-bold text-[var(--color-text)]">{Number(product.price).toLocaleString("fr-FR")} Da</td>
                        <td className="px-4 py-4 text-xs font-bold text-[var(--color-error)]">{product.discount || "—"}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEditProduct(product)}
                              className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-text-subtle)] transition-colors hover:bg-[var(--color-primary-subtle)] hover:text-[var(--color-primary)]"
                              aria-label="Edit product"><Pencil size={14} /></button>
                            <button onClick={() => handleDeleteProduct(product._id)}
                              className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-text-subtle)] transition-colors hover:bg-[var(--color-error-muted)] hover:text-[var(--color-error)]"
                              aria-label="Delete product"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}