interface FeaturedJobBadgeProps {
  isFeatured: boolean;
}

export function FeaturedJobBadge({ isFeatured }: FeaturedJobBadgeProps) {
  if (!isFeatured) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black text-xs font-bold font-orbitron">
      ⭐ Featured
    </span>
  );
}
