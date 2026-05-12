import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Stars() {
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex flex-row gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={`cursor-pointer text-xl transition-colors duration-200 ${
            star <= (hover || rating) ? "text-amber-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default Stars;
