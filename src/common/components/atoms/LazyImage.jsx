import React from "react";

/**
 * Simple lazy‑loading wrapper using the native `loading="lazy"` attribute.
 * Props:
 *   - src: image source URL
 *   - alt: alternative text (required for accessibility)
 *   - className: Tailwind or custom CSS classes
 *   - fallback: optional JSX displayed while the image loads (e.g., a blurred placeholder)
 */
export default function LazyImage({ src, alt, className = "", fallback = null }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={e => {
        // simple fallback: replace broken image with a transparent pixel
        e.target.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      }}
    />
  );
}
