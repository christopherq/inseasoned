// Curated Unsplash images for recipes
// All images are free to use (Unsplash license)

export const RECIPE_IMAGES: Record<string, string> = {
  // English recipes
  "Leek & Potato Soup": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=500&fit=crop",
  "Roasted Pumpkin Soup": "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&h=500&fit=crop",
  "Beetroot & Apple Salad": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop",
  "Asparagus with Poached Egg": "https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=800&h=500&fit=crop",
  "Baked Ratatouille": "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=800&h=500&fit=crop",
  "Strawberry Overnight Oats": "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800&h=500&fit=crop",
  "Garlic Kale Pasta": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=500&fit=crop",
  "Braised Cabbage with Mustard": "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&h=500&fit=crop",
  "Courgette Fritters": "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&h=500&fit=crop",
  "Crispy Brussels Sprouts with Honey": "https://images.unsplash.com/photo-1614611848467-4e8493c00228?w=800&h=500&fit=crop",
  "Roasted Carrot & Cumin Soup": "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&h=500&fit=crop",
  "Spinach & Egg Shakshuka": "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&h=500&fit=crop",
  "Honey-Roasted Parsnips": "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&h=500&fit=crop",
  "Cauliflower Cheese": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=500&fit=crop",
  "Mexican Street Corn Salad": "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=800&h=500&fit=crop",

  // Dutch recipes
  "Prei-aardappelsoep": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=500&fit=crop",
  "Boerenkoolstamppot": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop",
  "Geroosterde pompoensoep": "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&h=500&fit=crop",
  "Krokante spruitjes met honing en sojasaus": "https://images.unsplash.com/photo-1614611848467-4e8493c00228?w=800&h=500&fit=crop",
  "Asperges met een gepocheerd ei": "https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=800&h=500&fit=crop",
  "Ratatouille uit de oven": "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=800&h=500&fit=crop",
  "Aardbeien overnight oats": "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800&h=500&fit=crop",
  "Bietensalade met appel en walnoten": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop",
  "Bloemkool met kaassaus": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=500&fit=crop",
  "Shakshuka met spinazie": "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&h=500&fit=crop",
  "Pastinaak uit de oven met honing": "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&h=500&fit=crop",
  "Courgettekoekjes": "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&h=500&fit=crop",
  "Wortel-komijnsoep": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=500&fit=crop",
  "Gestoofde kool met mosterd": "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&h=500&fit=crop",
};

export function getRecipeImage(title: string): string | null {
  return RECIPE_IMAGES[title] || null;
}
