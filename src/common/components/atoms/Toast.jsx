import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { useToastStore } from "@/common/stores/toastStore";

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const Icon = icons[toast.type] || Info;

  return (
    <div
      role="status"
      className={`flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-5 py-4 shadow-[var(--shadow-lg)] backdrop-blur-md transition-all duration-300 ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <Icon size={18} className="shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
      <p className="text-sm font-semibold text-[var(--color-text)]">{toast.message}</p>
      <button onClick={onDismiss} className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[var(--color-text-subtle)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)] transition-colors" aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  );
}
