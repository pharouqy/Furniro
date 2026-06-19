export default function Skeleton({ className = "", as: Tag = "div", ...props }) {
  return (
    <Tag
      className={`animate-shimmer rounded-lg ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}
