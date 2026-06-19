import { ArrowRight } from "lucide-react";
import { useState } from "react";

function Slider({ objt }) {
  const [index, setIndex] = useState(0);
  const slide = objt[index];

  const handleNext = () => {
    setIndex((current) => (current + 1) % objt.length);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] min-h-[360px] overflow-hidden rounded-lg bg-stone-100">
        <img src={slide} alt={`Room inspiration ${index + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <button
          onClick={handleNext}
          className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-surface-elevated)] text-[var(--color-primary-hover)] shadow-md transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-text-inverse)]"
          aria-label="Next room inspiration"
        >
          <ArrowRight size={20} />
        </button>
      </div>
      <div className="flex justify-center gap-2">
        {objt.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              index === i                 ? "w-8 bg-[var(--color-primary)]" : "w-2.5 bg-[var(--color-border)] hover:bg-[var(--color-border-strong)]"
            }`}
            aria-label={`Show room inspiration ${i + 1}`}
            aria-current={index === i ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
