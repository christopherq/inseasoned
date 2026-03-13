export type Region = "europe" | "north-america";

// Month 0 = January
export const SEASONAL: Record<Region, Record<number, string[]>> = {
  "europe": {
    0: ["leek", "cabbage", "kale", "parsnip", "celeriac", "beetroot", "brussels sprouts", "turnip", "potato", "carrot", "onion", "apple", "pear", "clementine", "orange"],
    1: ["leek", "cabbage", "kale", "parsnip", "celeriac", "beetroot", "brussels sprouts", "turnip", "potato", "carrot", "onion", "apple", "pear", "blood orange", "rhubarb"],
    2: ["leek", "cabbage", "kale", "parsnip", "cauliflower", "spinach", "spring onion", "radish", "rhubarb", "potato", "carrot", "onion"],
    3: ["asparagus", "spinach", "radish", "spring onion", "lettuce", "watercress", "rhubarb", "new potato", "peas", "carrot", "onion"],
    4: ["asparagus", "spinach", "strawberry", "radish", "spring onion", "lettuce", "broad beans", "new potato", "peas", "elderflower", "carrot", "onion"],
    5: ["strawberry", "cherry", "broad beans", "courgette", "peas", "new potato", "fennel", "aubergine", "cucumber", "tomato", "carrot", "onion", "garlic"],
    6: ["strawberry", "raspberry", "blueberry", "cherry", "tomato", "courgette", "aubergine", "pepper", "cucumber", "green beans", "fennel", "sweetcorn", "carrot", "onion", "garlic"],
    7: ["tomato", "courgette", "aubergine", "pepper", "cucumber", "raspberry", "blueberry", "blackberry", "plum", "peach", "sweetcorn", "green beans", "fig", "carrot", "onion", "garlic"],
    8: ["pumpkin", "squash", "apple", "pear", "plum", "blackberry", "fig", "grape", "sweetcorn", "leek", "beetroot", "carrot", "onion", "garlic", "mushroom"],
    9: ["pumpkin", "squash", "apple", "pear", "quince", "beetroot", "leek", "parsnip", "kale", "brussels sprouts", "mushroom", "carrot", "onion", "potato"],
    10: ["pumpkin", "squash", "parsnip", "celeriac", "kale", "cabbage", "leek", "brussels sprouts", "beetroot", "cranberry", "apple", "pear", "clementine", "carrot", "onion", "potato"],
    11: ["parsnip", "celeriac", "kale", "cabbage", "leek", "brussels sprouts", "beetroot", "turnip", "cranberry", "clementine", "orange", "carrot", "onion", "potato"],
  },
  "north-america": {
    0: ["kale", "cabbage", "sweet potato", "turnip", "parsnip", "citrus", "beet", "carrot", "onion", "potato", "apple", "pear", "grapefruit"],
    1: ["kale", "cabbage", "sweet potato", "turnip", "parsnip", "citrus", "beet", "carrot", "onion", "potato", "grapefruit"],
    2: ["kale", "spinach", "artichoke", "asparagus", "mushroom", "radish", "pea shoots", "carrot", "onion", "potato"],
    3: ["asparagus", "artichoke", "spinach", "peas", "radish", "strawberry", "rhubarb", "spring onion", "lettuce", "carrot", "onion"],
    4: ["asparagus", "strawberry", "snap peas", "radish", "lettuce", "spinach", "spring onion", "fava beans", "carrot", "onion"],
    5: ["strawberry", "cherry", "blueberry", "peach", "tomato", "zucchini", "corn", "cucumber", "green beans", "bell pepper", "carrot", "onion", "garlic"],
    6: ["tomato", "corn", "peach", "blueberry", "raspberry", "watermelon", "zucchini", "bell pepper", "cucumber", "eggplant", "green beans", "carrot", "onion", "garlic"],
    7: ["tomato", "corn", "peach", "plum", "melon", "blackberry", "fig", "eggplant", "bell pepper", "okra", "carrot", "onion", "garlic"],
    8: ["apple", "pear", "grape", "pumpkin", "winter squash", "sweet potato", "beet", "broccoli", "cauliflower", "carrot", "onion", "garlic", "mushroom"],
    9: ["apple", "pear", "pumpkin", "winter squash", "sweet potato", "cranberry", "kale", "brussels sprouts", "turnip", "beet", "carrot", "onion", "potato"],
    10: ["sweet potato", "pumpkin", "winter squash", "cranberry", "kale", "cabbage", "parsnip", "turnip", "apple", "pear", "carrot", "onion", "potato"],
    11: ["sweet potato", "parsnip", "turnip", "kale", "cabbage", "citrus", "cranberry", "beet", "carrot", "onion", "potato"],
  },
};

export function getSeasonalIngredients(region: Region, month: number): string[] {
  return SEASONAL[region][month] || [];
}
