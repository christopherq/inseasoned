// Approximate AH.nl prices (March 2026)
// Based on typical AH prices — not live data
// Prices are per common purchase unit

export const PRICES_NL: Record<string, { price: number; unit: string; note?: string }> = {
  // Groenten
  "prei": { price: 0.99, unit: "stuk" },
  "aardappel": { price: 1.99, unit: "kg" },
  "boerenkool": { price: 1.49, unit: "zak 300g" },
  "spruiten": { price: 1.99, unit: "500g" },
  "knolselderij": { price: 1.49, unit: "stuk" },
  "pastinaak": { price: 1.79, unit: "500g" },
  "rode biet": { price: 1.29, unit: "500g" },
  "winterwortel": { price: 0.99, unit: "kg" },
  "wortel": { price: 0.99, unit: "kg" },
  "kool": { price: 1.29, unit: "stuk" },
  "bloemkool": { price: 1.99, unit: "stuk" },
  "spinazie": { price: 1.49, unit: "zak 250g" },
  "bosui": { price: 0.79, unit: "bosje" },
  "radijs": { price: 0.89, unit: "bosje" },
  "sla": { price: 1.09, unit: "stuk" },
  "asperges": { price: 3.99, unit: "500g" },
  "doperwten": { price: 1.99, unit: "300g" },
  "tuinbonen": { price: 2.49, unit: "300g" },
  "courgette": { price: 0.89, unit: "stuk" },
  "aubergine": { price: 1.29, unit: "stuk" },
  "tomaat": { price: 1.79, unit: "500g" },
  "paprika": { price: 0.99, unit: "stuk" },
  "komkommer": { price: 0.89, unit: "stuk" },
  "sperziebonen": { price: 2.29, unit: "400g" },
  "venkel": { price: 1.49, unit: "stuk" },
  "maïs": { price: 1.79, unit: "2 stuks" },
  "pompoen": { price: 2.49, unit: "stuk" },
  "paddenstoelen": { price: 1.89, unit: "250g" },
  "rabarber": { price: 2.29, unit: "500g" },
  "waterkers": { price: 1.49, unit: "bakje" },
  "nieuwe aardappel": { price: 2.29, unit: "kg" },

  // Fruit
  "appel": { price: 1.99, unit: "kg" },
  "peer": { price: 2.29, unit: "kg" },
  "aardbeien": { price: 2.99, unit: "400g" },
  "frambozen": { price: 2.99, unit: "125g" },
  "blauwe bessen": { price: 2.49, unit: "125g" },
  "kersen": { price: 3.99, unit: "500g" },
  "bramen": { price: 2.49, unit: "125g" },
  "pruim": { price: 2.49, unit: "500g" },
  "perzik": { price: 2.49, unit: "4 stuks" },
  "vijg": { price: 2.99, unit: "4 stuks" },
  "druif": { price: 2.49, unit: "500g" },
  "mandarijn": { price: 2.29, unit: "net" },
  "sinaasappel": { price: 1.99, unit: "net" },
  "bloedsinaasappel": { price: 2.49, unit: "net" },
  "cranberry": { price: 2.49, unit: "125g" },
  "kwee": { price: 1.99, unit: "stuk" },
  "raap": { price: 0.99, unit: "stuk" },

  // Voorraadkast
  "olijfolie": { price: 4.99, unit: "500ml", note: "gaat lang mee" },
  "boter": { price: 1.89, unit: "250g" },
  "zonnebloemolie": { price: 1.79, unit: "1L", note: "gaat lang mee" },
  "zout": { price: 0.49, unit: "500g", note: "gaat lang mee" },
  "zwarte peper": { price: 1.49, unit: "potje", note: "gaat lang mee" },
  "paprikapoeder": { price: 1.29, unit: "potje", note: "gaat lang mee" },
  "komijn": { price: 1.29, unit: "potje", note: "gaat lang mee" },
  "oregano": { price: 1.09, unit: "potje", note: "gaat lang mee" },
  "tijm": { price: 1.09, unit: "potje", note: "gaat lang mee" },
  "chilivlokken": { price: 1.49, unit: "potje", note: "gaat lang mee" },
  "kaneel": { price: 1.09, unit: "potje", note: "gaat lang mee" },
  "laurier": { price: 1.29, unit: "potje", note: "gaat lang mee" },
  "nootmuskaat": { price: 1.79, unit: "potje", note: "gaat lang mee" },
  "kurkuma": { price: 1.29, unit: "potje", note: "gaat lang mee" },
  "rozemarijn": { price: 1.09, unit: "potje", note: "gaat lang mee" },
  "basilicum (gedroogd)": { price: 1.09, unit: "potje", note: "gaat lang mee" },
  "kerrie": { price: 1.29, unit: "potje", note: "gaat lang mee" },
  "bloem": { price: 0.69, unit: "kg" },
  "suiker": { price: 0.89, unit: "kg" },
  "rijst": { price: 1.49, unit: "kg" },
  "pasta": { price: 0.89, unit: "500g" },
  "brood": { price: 1.49, unit: "heel brood" },
  "bakpoeder": { price: 0.79, unit: "potje" },
  "azijn": { price: 0.99, unit: "500ml" },
  "sojasaus": { price: 1.99, unit: "fles" },
  "honing": { price: 2.99, unit: "pot" },
  "mosterd": { price: 1.19, unit: "pot" },
  "tomatenpuree": { price: 0.79, unit: "tube" },
  "gepelde tomaten (blik)": { price: 0.89, unit: "blik 400g" },
  "kippenbouillon": { price: 0.99, unit: "pak 1L" },
  "groentebouillon": { price: 0.99, unit: "pak 1L" },
  "kokosmelk": { price: 1.49, unit: "blik 400ml" },
  "linzen": { price: 1.49, unit: "500g" },
  "kikkererwten (blik)": { price: 0.99, unit: "blik" },
  "bonen (blik)": { price: 0.99, unit: "blik" },
  "havermout": { price: 0.99, unit: "500g" },
  "paneermeel": { price: 0.99, unit: "200g" },
  "sambal": { price: 1.49, unit: "pot" },
  "ketjap": { price: 1.79, unit: "fles" },

  // Zuivel
  "eieren": { price: 2.29, unit: "10 stuks" },
  "melk": { price: 1.09, unit: "1L" },
  "kaas": { price: 3.99, unit: "stuk ~400g" },
  "slagroom": { price: 1.29, unit: "200ml" },
  "yoghurt": { price: 0.89, unit: "500ml" },
  "parmezaan": { price: 2.99, unit: "stuk 100g" },
  "roomkaas": { price: 1.49, unit: "bakje" },

  // Altijd in huis
  "knoflook": { price: 0.69, unit: "bol" },
  "ui": { price: 1.29, unit: "kg" },
  "citroen": { price: 0.49, unit: "stuk" },
  "gember": { price: 0.99, unit: "stuk" },

  // Overig voor recepten
  "rookworst": { price: 2.49, unit: "stuk" },
  "walnoten": { price: 2.99, unit: "100g" },
  "geitenkaas": { price: 2.49, unit: "100g" },
  "feta": { price: 1.99, unit: "200g" },
};

// Estimate cost per recipe ingredient line
// This is rough — we match the main ingredient and estimate fraction used
export function estimateRecipeCost(ingredients: string[]): number {
  let total = 0;

  for (const line of ingredients) {
    const lower = line.toLowerCase();
    let matched = false;

    for (const [name, info] of Object.entries(PRICES_NL)) {
      if (lower.includes(name)) {
        // Estimate fraction of package used
        let fraction = 1;

        // Common fraction patterns
        if (lower.includes("1 el") || lower.includes("1 tl") || lower.includes("snufje") || lower.includes("scheutje")) {
          fraction = 0.05; // tiny amount
        } else if (lower.includes("2 el") || lower.includes("2 tl")) {
          fraction = 0.1;
        } else if (lower.includes("½") || lower.includes("half")) {
          fraction = 0.5;
        } else if (lower.includes("100ml") || lower.includes("100g")) {
          fraction = 0.25;
        } else if (lower.includes("200g") || lower.includes("200ml")) {
          fraction = 0.5;
        } else if (lower.includes("50g")) {
          fraction = 0.15;
        } else if (lower.includes("klontje")) {
          fraction = 0.1;
        } else if (lower.match(/[123] te[nl]/)) {
          fraction = 0.15; // a few cloves of garlic
        } else if (info.note === "gaat lang mee") {
          fraction = 0.05; // spices, oils used in small amounts
        }

        total += info.price * fraction;
        matched = true;
        break;
      }
    }

    // If no match, assume ~€0.50 for unknown ingredients
    if (!matched && !lower.includes("zout") && !lower.includes("peper") && !lower.includes("optioneel")) {
      total += 0.30;
    }
  }

  return Math.round(total * 100) / 100;
}
