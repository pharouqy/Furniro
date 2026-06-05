import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * cartStore - Store Zustand persistant pour gérer l'état du panier d'achat.
 * Utilise localStorage pour conserver le panier lors du rechargement de la page.
 */
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Ajouter un produit au panier
      addToCart: (product, quantityToAdd = 1) => {
        if (quantityToAdd <= 0) return;

        const items = get().items;
        // Créer un identifiant de variante unique basé sur l'ID, la taille et la couleur
        const variantId = `${product.id}-${product.size || "default"}-${product.color || "default"}`;

        const existingItemIndex = items.findIndex(
          (item) => item.variantId === variantId
        );

        if (existingItemIndex > -1) {
          // Si l'item existe déjà, on incrémente sa quantité
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantityToAdd;
          set({ items: updatedItems });
        } else {
          // Sinon, on l'ajoute comme nouvel item
          const newItem = {
            variantId,
            productId: product.id,
            title: product.title,
            price: Number(product.price),
            quantity: quantityToAdd,
            picture: product.picture,
            size: product.size || "",
            color: product.color || "",
          };
          set({ items: [...items, newItem] });
        }
      },

      // Retirer un article du panier
      removeFromCart: (variantId) => {
        set({
          items: get().items.filter((item) => item.variantId !== variantId),
        });
      },

      // Mettre à jour la quantité d'un article
      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(variantId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.variantId === variantId ? { ...item, quantity: Number(quantity) } : item
          ),
        });
      },

      // Vider le panier
      clearCart: () => {
        set({ items: [] });
      },

      // Sélecteurs de calculs (Helper getters)
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: "furniro-cart-storage", // Clé localStorage
    }
  )
);
