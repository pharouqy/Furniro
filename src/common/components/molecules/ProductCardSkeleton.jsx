import Skeleton from "../atoms/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-sm" aria-label="Loading product">
      <Skeleton className="aspect-[4/5] w-full !rounded-none" />
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="mt-1 h-5 w-1/3" />
      </div>
    </div>
  );
}
