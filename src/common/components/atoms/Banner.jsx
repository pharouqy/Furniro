import React from 'react';

/**
 * Generic banner component.
 * Props:
 *   - image: source of the banner image
 *   - title: main headline
 *   - subtitle: optional sub‑headline
 *   - ctaLabel: label for the call‑to‑action button
 *   - ctaHref: link target for the CTA
 *   - className: additional Tailwind classes
 */
export default function Banner({
  image,
  title,
  subtitle = '',
  ctaLabel = '',
  ctaHref = '#',
  className = ''
}) {
  return (
    <section className={`relative w-full h-64 md:h-96 bg-cover bg-center ${className}`} style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl mb-4">{subtitle}</p>}
        {ctaLabel && (
          <a href={ctaHref} className="px-6 py-2 bg-amber-500 hover:bg-amber-600 rounded transition">
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
