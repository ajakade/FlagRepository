import countryFlagColors from "country-flag-colors";

function hexToSimpleColor(hex) {
  const h = hex.toLowerCase();

  if (h === "#ffffff" || h === "#fff") return "blanc";
  
  if (h === "#000000" || h === "#000") return "noir";
  
  if (parseInt(h.substring(1, 3), 16) > 150 && 
      parseInt(h.substring(3, 5), 16) < 100 && 
      parseInt(h.substring(5, 7), 16) < 100) return "rouge";
  
  if (parseInt(h.substring(5, 7), 16) > 150 && 
      parseInt(h.substring(1, 3), 16) < 100 && 
      parseInt(h.substring(3, 5), 16) < 100) return "bleu";
  
  if (parseInt(h.substring(3, 5), 16) > 150 && 
      parseInt(h.substring(1, 3), 16) < 100 && 
      parseInt(h.substring(5, 7), 16) < 100) return "vert";
  
  if (parseInt(h.substring(1, 3), 16) > 150 && 
      parseInt(h.substring(3, 5), 16) > 150 && 
      parseInt(h.substring(5, 7), 16) < 100) return "jaune";
  
  if (parseInt(h.substring(1, 3), 16) > 150 && 
      parseInt(h.substring(3, 5), 16) > 80 && 
      parseInt(h.substring(3, 5), 16) < 150 &&
      parseInt(h.substring(5, 7), 16) < 100) return "orange";
  
  if (parseInt(h.substring(1, 3), 16) > 100 && 
      parseInt(h.substring(5, 7), 16) > 100 && 
      parseInt(h.substring(3, 5), 16) < 100) return "violet";
  
  const r = parseInt(h.substring(1, 3), 16);
  const g = parseInt(h.substring(3, 5), 16);
  const b = parseInt(h.substring(5, 7), 16);
  if (Math.abs(r - g) < 30 && Math.abs(g - b) < 30 && Math.abs(r - b) < 30 &&
      r > 50 && r < 200) return "gris";
  
  if (parseInt(h.substring(1, 3), 16) > 100 && 
      parseInt(h.substring(3, 5), 16) < 100 && 
      parseInt(h.substring(5, 7), 16) < 80) return "marron";

  return "autre";
}

/**
 * Retourne les couleurs d'un pays
 * @param country objet REST Countries
 */
export function getFlagColors(country) {
  const item = countryFlagColors.find(
    c => c.name === country.name.common
  );

  if (!item) return [];

  return [...new Set(item.colors.map(hexToSimpleColor))];
}
