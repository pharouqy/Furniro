import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

/**
 * Stars - Composant de notation par étoiles.
 * Supporte le mode lecture seule (affichage de la note) et le mode interactif (formulaire).
 * 
 * Props:
 * @param {number} rating - La note actuelle (0 à 5)
 * @param {boolean} interactive - Si vrai, l'utilisateur peut cliquer pour modifier la note
 * @param {function} onChange - Callback déclenché lors du changement de note en mode interactif
 */
export default function Stars({ rating = 0, interactive = false, onChange = () => {} }) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = interactive ? (hoverRating || rating) : rating;

  const handleClick = (value) => {
    if (!interactive) return;
    onChange(value);
  };

  return (
    <div 
      className="flex items-center gap-1"
      role="img" 
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => handleClick(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`text-xl transition-colors duration-200 ${
            interactive ? "cursor-pointer" : "cursor-default pointer-events-none"
          } ${
            star <= displayRating ? "text-amber-500" : "text-stone-300"
          }`}
          aria-label={interactive ? `Rate ${star} out of 5` : undefined}
        >
          <FontAwesomeIcon icon={faStar} />
        </button>
      ))}
    </div>
  );
}
