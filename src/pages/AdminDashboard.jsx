import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Trash2, Package, AlertTriangle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/common/stores/toastStore";
import { api } from "@/common/utils/api";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const STATUSES = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];

const BADGE = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-emerald-100 text-emerald-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const { token, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const addToast = useToastStore((state) => state.addToast);
  const [updatingId, setUpdatingId] = useState(null);
  const limit = 20;

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page, limit });
      if (filterStatus) params.set("status", filterStatus);
      const res = await fetch(`${API_BASE}/orders?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const txt = await res.text();
      const data = txt ? JSON.parse(txt) : {};
      if (!res.ok) throw new Error(data.error);
      setOrders(data.orders);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, page, filterStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const txt = await res.text();
      const data = txt ? JSON.parse(txt) : {};
      if (!res.ok) throw new Error(data.error);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Delete this order permanently?")) return;
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const txt = await res.text();
      const data = txt ? JSON.parse(txt) : {};
      if (!res.ok) throw new Error(data.error);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      addToast("Order deleted", "success");
    } catch (err) {
      addToast(err.message, "error");
    }
  };

  const totalPages = Math.ceil(total / limit);

  if (!token) {
    navigate("/admin/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)] text-sm font-bold text-[var(--color-text-inverse)]">
              F
            </span>
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

      <div className="container-page py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[var(--text-2xl)] font-extrabold text-[var(--color-text)]">Orders</h2>
            <p className="mt-1 text-[var(--text-sm)] text-[var(--color-text-muted)]">{total} total orders</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
              className="field-control h-10 w-44"
            >
              <option value="">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-3 rounded-md bg-[var(--color-error-muted)] px-4 py-3 text-sm font-semibold text-[var(--color-error)]">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-[var(--color-surface-2)]" />
            ))}
          </div>
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
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {orders.map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-[var(--color-surface-2)]">
                    <td className="max-w-[100px] px-4 py-4 font-mono text-xs font-bold text-[var(--color-text)]">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[var(--color-text)]">{order.customer_name}</p>
                      <p className="text-xs text-[var(--color-text-subtle)]">{order.customer_email}</p>
                    </td>
                    <td className="px-4 py-4 text-[var(--color-text-muted)]">
                      {new Date(order.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-4 font-bold text-[var(--color-text)]">
                      {Number(order.total_amount).toLocaleString("fr-FR")} Da
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        disabled={updatingId === order.id}
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${BADGE[order.status] || "bg-[var(--color-surface-2)] text-[var(--color-text-muted)]"} border-0 cursor-pointer`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-text-subtle)] transition-colors hover:bg-[var(--color-error-muted)] hover:text-[var(--color-error)]"
                        aria-label="Delete order"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-3 text-sm font-semibold text-[var(--color-text-muted)]">
              Page {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
