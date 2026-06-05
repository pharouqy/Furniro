/**
 * usePricing - Hook utilitaire pour calculer le prix final et le formatage des devises.
 * Gère les pourcentages (ex. "10%") et les valeurs absolues (ex. "$79" ou "79").
 * 
 * @param {string|number} price - Le prix d'origine (ex. 1000, "1000$", "250000 Da")
 * @param {string|number} discount - La réduction (ex. "10%", 200, "$50")
 * @returns {object} { finalPrice, formattedPrice, formattedFinalPrice, formattedDiscount }
 */
export default function usePricing(price, discount) {
  // Déterminer la devise (par défaut "Da" ou "$" selon la chaîne d'origine)
  const priceStr = String(price || "0");
  const discountStr = String(discount || "");
  
  let currency = "Da";
  if (priceStr.includes("$")) {
    currency = "$";
  } else if (priceStr.toLowerCase().includes("da")) {
    currency = "Da";
  }

  // Extraire les valeurs numériques
  const numericPrice = Number(priceStr.replace(/[^0-9.]/g, "")) || 0;
  
  let finalPrice = numericPrice;
  let formattedDiscount = null;

  if (discountStr) {
    if (discountStr.includes("%")) {
      const percent = Number(discountStr.replace(/[^0-9.]/g, "")) || 0;
      finalPrice = numericPrice * (1 - percent / 100);
      formattedDiscount = `-${percent}%`;
    } else {
      // Réduction absolue
      const absoluteDiscount = Number(discountStr.replace(/[^0-9.]/g, "")) || 0;
      finalPrice = Math.max(0, numericPrice - absoluteDiscount);
      formattedDiscount = `-${absoluteDiscount} ${currency}`;
    }
  }

  // Formatage propre avec séparateur de milliers
  const formatValue = (val) => {
    return val.toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return {
    finalPrice, // Nombre pur pour les calculs panier
    formattedPrice: `${formatValue(numericPrice)} ${currency}`,
    formattedFinalPrice: `${formatValue(finalPrice)} ${currency}`,
    formattedDiscount,
  };
}
