export function SkeletonCard() {
  return (
    <div className="panel overflow-hidden p-5">
      <div className="h-12 w-12 animate-pulse rounded-2xl bg-aura-hover" />
      <div className="mt-5 h-4 w-3/4 animate-pulse rounded bg-aura-hover" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-aura-hover" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-aura-hover" />
    </div>
  );
}
