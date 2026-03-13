export interface PantryItem {
  name: string;
  category: string;
  default: boolean; // true = most people have it, pre-checked
}

export const PANTRY_ITEMS: PantryItem[] = [
  // Oils & Fats
  { name: "olive oil", category: "Oils & Fats", default: true },
  { name: "butter", category: "Oils & Fats", default: true },
  { name: "vegetable oil", category: "Oils & Fats", default: true },

  // Seasonings
  { name: "salt", category: "Seasonings", default: true },
  { name: "black pepper", category: "Seasonings", default: true },
  { name: "paprika", category: "Seasonings", default: true },
  { name: "cumin", category: "Seasonings", default: true },
  { name: "oregano", category: "Seasonings", default: true },
  { name: "thyme", category: "Seasonings", default: true },
  { name: "chili flakes", category: "Seasonings", default: true },
  { name: "cinnamon", category: "Seasonings", default: true },
  { name: "bay leaves", category: "Seasonings", default: true },
  { name: "nutmeg", category: "Seasonings", default: false },
  { name: "turmeric", category: "Seasonings", default: false },
  { name: "rosemary", category: "Seasonings", default: false },
  { name: "basil (dried)", category: "Seasonings", default: false },

  // Pantry staples
  { name: "flour", category: "Pantry Staples", default: true },
  { name: "sugar", category: "Pantry Staples", default: true },
  { name: "rice", category: "Pantry Staples", default: true },
  { name: "pasta", category: "Pantry Staples", default: true },
  { name: "bread", category: "Pantry Staples", default: true },
  { name: "baking powder", category: "Pantry Staples", default: true },
  { name: "vinegar", category: "Pantry Staples", default: true },
  { name: "soy sauce", category: "Pantry Staples", default: true },
  { name: "honey", category: "Pantry Staples", default: false },
  { name: "mustard", category: "Pantry Staples", default: true },
  { name: "tomato paste", category: "Pantry Staples", default: true },
  { name: "canned tomatoes", category: "Pantry Staples", default: true },
  { name: "chicken stock", category: "Pantry Staples", default: false },
  { name: "vegetable stock", category: "Pantry Staples", default: false },
  { name: "coconut milk", category: "Pantry Staples", default: false },
  { name: "lentils", category: "Pantry Staples", default: false },
  { name: "chickpeas (canned)", category: "Pantry Staples", default: false },
  { name: "beans (canned)", category: "Pantry Staples", default: false },
  { name: "oats", category: "Pantry Staples", default: false },
  { name: "breadcrumbs", category: "Pantry Staples", default: false },

  // Dairy & Fridge
  { name: "eggs", category: "Dairy & Fridge", default: true },
  { name: "milk", category: "Dairy & Fridge", default: true },
  { name: "cheese", category: "Dairy & Fridge", default: true },
  { name: "cream", category: "Dairy & Fridge", default: false },
  { name: "yogurt", category: "Dairy & Fridge", default: false },
  { name: "parmesan", category: "Dairy & Fridge", default: false },
  { name: "cream cheese", category: "Dairy & Fridge", default: false },

  // Alliums (always in stock for most)
  { name: "garlic", category: "Always Around", default: true },
  { name: "onion", category: "Always Around", default: true },
  { name: "lemon", category: "Always Around", default: true },
  { name: "ginger", category: "Always Around", default: false },
];

export const PANTRY_CATEGORIES = [...new Set(PANTRY_ITEMS.map(i => i.category))];
