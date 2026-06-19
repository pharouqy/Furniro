import { Trophy, CheckCircle, Truck, Headphones } from "lucide-react";

export default function Infos() {
  return (
    <section className="section w-full bg-[var(--color-primary-subtle)]" aria-label="Service promises">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1.3fr]">
          <div className="flex items-start gap-5 rounded-xl border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-[var(--shadow-sm)] lg:col-start-1">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg text-[var(--color-primary)]">
              <Trophy size={20} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-bold leading-tight text-[var(--color-text)]">High Quality</h3>
              <p className="mt-1.5 text-xs leading-5 text-[var(--color-text-muted)]">Durable materials, carefully selected</p>
            </div>
          </div>
          <div className="flex items-start gap-5 rounded-xl border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-[var(--shadow-sm)] lg:col-start-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg text-[var(--color-primary)]">
              <CheckCircle size={20} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-bold leading-tight text-[var(--color-text)]">Warranty Protection</h3>
              <p className="mt-1.5 text-xs leading-5 text-[var(--color-text-muted)]">Coverage on every core product</p>
            </div>
          </div>
          <div className="flex items-start gap-5 rounded-xl border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-[var(--shadow-sm)] lg:col-span-2 lg:col-start-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg text-[var(--color-primary)]">
              <Truck size={20} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-bold leading-tight text-[var(--color-text)]">Free Shipping</h3>
              <p className="mt-1.5 text-xs leading-5 text-[var(--color-text-muted)]">Fast delivery on qualifying orders</p>
            </div>
          </div>
          <div className="flex items-start gap-5 rounded-xl border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-[var(--shadow-sm)] lg:col-span-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg text-[var(--color-primary)]">
              <Headphones size={20} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-bold leading-tight text-[var(--color-text)]">24/7 Support</h3>
              <p className="mt-1.5 text-xs leading-5 text-[var(--color-text-muted)]">Helpful support when you need it</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
