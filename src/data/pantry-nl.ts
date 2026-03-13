export interface PantryItemNL {
  name: string;
  category: string;
  default: boolean;
}

export const PANTRY_ITEMS_NL: PantryItemNL[] = [
  // Oliën & Vetten
  { name: "olijfolie", category: "Oliën & Vetten", default: true },
  { name: "boter", category: "Oliën & Vetten", default: true },
  { name: "zonnebloemolie", category: "Oliën & Vetten", default: true },

  // Kruiden
  { name: "zout", category: "Kruiden & Specerijen", default: true },
  { name: "zwarte peper", category: "Kruiden & Specerijen", default: true },
  { name: "paprikapoeder", category: "Kruiden & Specerijen", default: true },
  { name: "komijn", category: "Kruiden & Specerijen", default: true },
  { name: "oregano", category: "Kruiden & Specerijen", default: true },
  { name: "tijm", category: "Kruiden & Specerijen", default: true },
  { name: "chilivlokken", category: "Kruiden & Specerijen", default: true },
  { name: "kaneel", category: "Kruiden & Specerijen", default: true },
  { name: "laurier", category: "Kruiden & Specerijen", default: true },
  { name: "nootmuskaat", category: "Kruiden & Specerijen", default: false },
  { name: "kurkuma", category: "Kruiden & Specerijen", default: false },
  { name: "rozemarijn", category: "Kruiden & Specerijen", default: false },
  { name: "basilicum (gedroogd)", category: "Kruiden & Specerijen", default: false },
  { name: "kerrie", category: "Kruiden & Specerijen", default: true },

  // Voorraadkast
  { name: "bloem", category: "Voorraadkast", default: true },
  { name: "suiker", category: "Voorraadkast", default: true },
  { name: "rijst", category: "Voorraadkast", default: true },
  { name: "pasta", category: "Voorraadkast", default: true },
  { name: "brood", category: "Voorraadkast", default: true },
  { name: "bakpoeder", category: "Voorraadkast", default: true },
  { name: "azijn", category: "Voorraadkast", default: true },
  { name: "sojasaus", category: "Voorraadkast", default: true },
  { name: "honing", category: "Voorraadkast", default: false },
  { name: "mosterd", category: "Voorraadkast", default: true },
  { name: "tomatenpuree", category: "Voorraadkast", default: true },
  { name: "gepelde tomaten (blik)", category: "Voorraadkast", default: true },
  { name: "kippenbouillon", category: "Voorraadkast", default: false },
  { name: "groentebouillon", category: "Voorraadkast", default: false },
  { name: "kokosmelk", category: "Voorraadkast", default: false },
  { name: "linzen", category: "Voorraadkast", default: false },
  { name: "kikkererwten (blik)", category: "Voorraadkast", default: false },
  { name: "bonen (blik)", category: "Voorraadkast", default: false },
  { name: "havermout", category: "Voorraadkast", default: false },
  { name: "paneermeel", category: "Voorraadkast", default: false },
  { name: "sambal", category: "Voorraadkast", default: true },
  { name: "ketjap", category: "Voorraadkast", default: false },

  // Zuivel & Koelkast
  { name: "eieren", category: "Zuivel & Koelkast", default: true },
  { name: "melk", category: "Zuivel & Koelkast", default: true },
  { name: "kaas", category: "Zuivel & Koelkast", default: true },
  { name: "slagroom", category: "Zuivel & Koelkast", default: false },
  { name: "yoghurt", category: "Zuivel & Koelkast", default: false },
  { name: "parmezaan", category: "Zuivel & Koelkast", default: false },
  { name: "roomkaas", category: "Zuivel & Koelkast", default: false },

  // Altijd in huis
  { name: "knoflook", category: "Altijd in huis", default: true },
  { name: "ui", category: "Altijd in huis", default: true },
  { name: "citroen", category: "Altijd in huis", default: true },
  { name: "gember", category: "Altijd in huis", default: false },
];

export const PANTRY_CATEGORIES_NL = [...new Set(PANTRY_ITEMS_NL.map(i => i.category))];
