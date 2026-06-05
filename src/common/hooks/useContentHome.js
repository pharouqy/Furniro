/**
 * Hook that returns JSX for a content block (image + caption).
 * Params:
 *   - image: image source
 *   - title: caption text
 */
import React from 'react';
export default function useContentHome({ image, title }) {
  return (
    <article>
      <img
        src={image}
        alt="banner"
        className="w-full h-full object-cover rounded-xl hover:scale-105 transition-all duration-500"
      />
      <h3 className="text-center my-3 font-bold">{title}</h3>
    </article>
  );
}
