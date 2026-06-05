import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * likeStore - Store Zustand persistant pour gérer les produits aimés/favoris.
 */
export const useLikeStore = create(
  persist(
    (set, get) => ({
      likedProductIds: [],

      // Ajouter ou retirer des favoris
      toggleLike: (productId) => {
        const idStr = String(productId);
        const current = get().likedProductIds;
        const exists = current.includes(idStr);

        if (exists) {
          set({ likedProductIds: current.filter((id) => id !== idStr) });
        } else {
          set({ likedProductIds: [...current, idStr] });
        }
      },

      // Vérifier si un produit est dans les favoris
      isLiked: (productId) => {
        return get().likedProductIds.includes(String(productId));
      },

      // Obtenir le nombre total de favoris
      getCountOfLikes: () => {
        return get().likedProductIds.length;
      },
    }),
    {
      name: "furniro-likes-storage",
    }
  )
);
