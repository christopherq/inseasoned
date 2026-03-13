"use client";

import { useState, useMemo } from "react";
import { PANTRY_ITEMS, PANTRY_CATEGORIES } from "@/data/pantry";
import { getSeasonalIngredients, Region } from "@/data/seasonal";
import { getRecipeImage } from "@/data/recipe-images";

type Diet = "omnivore" | "vegetarian" | "vegan" | "pescatarian" | "flexitarian";

type Recipe = {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  steps: string[];
  matchedSeasonal: string[];
  matchedPantry: string[];
  tags: string[];
};

const DIETS: { id: Diet; emoji: string; label: string; desc: string }[] = [
  { id: "omnivore", emoji: "🥩", label: "Omnivore", desc: "I eat everything" },
  { id: "flexitarian", emoji: "🌱", label: "Flexitarian", desc: "Mostly plant-based, sometimes meat" },
  { id: "pescatarian", emoji: "🐟", label: "Pescatarian", desc: "Fish & seafood, no meat" },
  { id: "vegetarian", emoji: "🥚", label: "Vegetarian", desc: "No meat, no fish" },
  { id: "vegan", emoji: "🌿", label: "Vegan", desc: "Fully plant-based" },
];

function generateRecipes(seasonal: string[], pantry: string[], diet: Diet): Recipe[] {
  const all = [...seasonal, ...pantry].map(i => i.toLowerCase());
  const has = (item: string) => all.some(a => a.includes(item) || item.includes(a));

  const recipes: Recipe[] = [];

  // Helper to check diet compatibility
  const allowMeat = diet === "omnivore" || diet === "flexitarian";
  const allowFish = diet === "omnivore" || diet === "flexitarian" || diet === "pescatarian";
  const allowDairy = diet !== "vegan";
  const allowEggs = diet !== "vegan";

  // === SOUPS ===

  if (has("leek") && has("potato")) {
    recipes.push({
      title: "Leek & Potato Soup",
      description: "A classic creamy soup, perfect for cold months when leeks are at their best.",
      time: "35 min", servings: "4",
      ingredients: ["3 leeks, sliced", "4 potatoes, diced", "1 onion, chopped", allowDairy ? "2 tbsp butter" : "2 tbsp olive oil", "1L vegetable stock", ...(allowDairy ? ["100ml cream (optional)"] : []), "Salt & pepper"],
      steps: [allowDairy ? "Melt butter in a large pot. Add onion and leeks, cook 5 min until soft." : "Heat oil in a large pot. Add onion and leeks, cook 5 min until soft.", "Add potatoes and stock. Bring to boil, then simmer 20 min.", "Blend until smooth." + (allowDairy ? " Stir in cream if using." : ""), "Season with salt and pepper. Serve with crusty bread."],
      matchedSeasonal: ["leek", "potato"], matchedPantry: [allowDairy ? "butter" : "olive oil", "onion"],
      tags: ["soup", "vegan", "vegetarian", "comfort"],
    });
  }

  if (has("pumpkin") || has("squash")) {
    recipes.push({
      title: "Roasted Pumpkin Soup",
      description: "Velvety autumn soup with warming spices.",
      time: "45 min", servings: "4",
      ingredients: ["1 small pumpkin or squash, cubed", "1 onion, chopped", "2 cloves garlic", "1 tsp cumin", "½ tsp cinnamon", "750ml vegetable stock", "Olive oil", "Salt & pepper"],
      steps: ["Toss pumpkin cubes with olive oil, salt. Roast at 200°C for 25 min.", "Sauté onion and garlic in a pot. Add cumin, cinnamon, cook 1 min.", "Add roasted pumpkin and stock. Simmer 10 min.", "Blend until smooth. Season to taste."],
      matchedSeasonal: ["pumpkin", "squash"], matchedPantry: ["onion", "garlic", "cumin", "cinnamon", "olive oil"],
      tags: ["soup", "vegan", "vegetarian", "comfort"],
    });
  }

  if (has("carrot")) {
    recipes.push({
      title: "Roasted Carrot & Cumin Soup",
      description: "Sweet roasted carrots with earthy cumin.",
      time: "40 min", servings: "4",
      ingredients: ["500g carrots, chopped", "1 onion, chopped", "2 cloves garlic", "1 tsp cumin", "750ml vegetable stock", "Olive oil", "Salt & pepper"],
      steps: ["Toss carrots with olive oil, cumin, salt. Roast at 200°C for 25 min.", "Sauté onion and garlic until soft.", "Add roasted carrots and stock. Simmer 10 min.", "Blend until smooth. Season to taste."],
      matchedSeasonal: ["carrot"], matchedPantry: ["onion", "garlic", "cumin", "olive oil"],
      tags: ["soup", "vegan", "vegetarian"],
    });
  }

  // === SALADS ===

  if (has("beetroot")) {
    recipes.push({
      title: "Beetroot & Apple Salad",
      description: "A vibrant winter salad with sweet and earthy flavours.",
      time: "15 min", servings: "2",
      ingredients: ["3 beetroot, cooked and diced", "1 apple, thinly sliced", "50g walnuts", ...(allowDairy ? ["Goat cheese or feta"] : []), "2 tbsp olive oil", "1 tbsp vinegar", "Honey", "Salt & pepper"],
      steps: ["Arrange beetroot and apple slices on a plate.", "Scatter walnuts" + (allowDairy ? " and crumble cheese over." : " over."), "Whisk olive oil, vinegar, honey, salt and pepper.", "Drizzle dressing over salad. Serve immediately."],
      matchedSeasonal: ["beetroot", "apple"], matchedPantry: ["olive oil", "vinegar"],
      tags: ["salad", "vegetarian", "quick", ...(allowDairy ? [] : ["vegan"])],
    });
  }

  if (has("sweetcorn") || has("corn")) {
    recipes.push({
      title: "Mexican Street Corn Salad",
      description: "Smoky, creamy, tangy — summer in a bowl.",
      time: "15 min", servings: "4",
      ingredients: ["4 ears of corn (or 400g frozen)", allowDairy ? "2 tbsp mayo or yogurt" : "2 tbsp vegan mayo", "Juice of 1 lime or lemon", "1 tsp paprika", "Chili flakes", "Fresh coriander or parsley", ...(allowDairy ? ["Feta, crumbled"] : []), "Salt"],
      steps: ["Char corn in a hot pan or on the grill until blistered. Cut kernels off.", "Mix mayo, lime juice, paprika, chili flakes.", "Toss corn with dressing.", (allowDairy ? "Top with crumbled feta and herbs." : "Top with herbs.")],
      matchedSeasonal: ["sweetcorn", "corn"], matchedPantry: ["lemon", "paprika", "chili flakes"],
      tags: ["salad", "vegetarian", "quick"],
    });
  }

  // === MAINS ===

  if (has("asparagus") && allowEggs) {
    recipes.push({
      title: "Asparagus with Poached Egg",
      description: "Simple spring dish that lets fresh asparagus shine.",
      time: "15 min", servings: "2",
      ingredients: ["1 bunch asparagus", "2 eggs", ...(allowDairy ? ["Parmesan, shaved"] : []), "Olive oil", "Lemon juice", "Salt & pepper"],
      steps: ["Trim asparagus. Toss with olive oil, roast at 200°C for 8 min or griddle.", "Poach eggs in simmering water with a splash of vinegar, 3 min.", "Plate asparagus, top with poached egg" + (allowDairy ? " and parmesan shavings." : "."), "Drizzle with olive oil and lemon. Season."],
      matchedSeasonal: ["asparagus"], matchedPantry: ["eggs", "olive oil", "lemon"],
      tags: ["main", "vegetarian", "quick"],
    });
  }

  if (has("tomato") && (has("aubergine") || has("eggplant"))) {
    recipes.push({
      title: "Baked Ratatouille",
      description: "A colourful Provençal dish celebrating summer vegetables.",
      time: "50 min", servings: "4",
      ingredients: ["3 tomatoes, sliced", "1 aubergine, sliced", "2 courgettes, sliced", "1 pepper, sliced", "1 onion, diced", "3 cloves garlic", "Olive oil", "Thyme, oregano", "Salt & pepper"],
      steps: ["Sauté onion and garlic in olive oil. Spread in baking dish.", "Layer sliced tomatoes, aubergine, courgettes, and pepper in alternating pattern.", "Drizzle with olive oil, sprinkle with thyme, oregano, salt, pepper.", "Cover with foil. Bake 200°C for 35 min. Uncover last 10 min."],
      matchedSeasonal: ["tomato", "aubergine", "courgette", "pepper"], matchedPantry: ["onion", "garlic", "olive oil", "thyme", "oregano"],
      tags: ["main", "vegan", "vegetarian"],
    });
  }

  if (has("spinach") && allowEggs) {
    recipes.push({
      title: "Spinach & Egg Shakshuka",
      description: "Eggs poached in a spiced spinach and tomato sauce.",
      time: "25 min", servings: "2",
      ingredients: ["Large bag spinach", "400g canned tomatoes", "4 eggs", "1 onion, diced", "2 cloves garlic", "1 tsp cumin", "1 tsp paprika", "Olive oil", ...(allowDairy ? ["Feta (optional)"] : []), "Bread for serving"],
      steps: ["Sauté onion and garlic in olive oil. Add cumin and paprika, cook 1 min.", "Add canned tomatoes, simmer 5 min. Stir in spinach until wilted.", "Make 4 wells in the sauce. Crack an egg into each.", "Cover, cook 5-7 min until whites are set." + (allowDairy ? " Crumble feta over." : "") + " Serve with bread."],
      matchedSeasonal: ["spinach"], matchedPantry: ["eggs", "onion", "garlic", "cumin", "paprika", "olive oil", "canned tomatoes"],
      tags: ["main", "vegetarian"],
    });
  }

  if (has("kale") && has("pasta")) {
    recipes.push({
      title: "Garlic Kale Pasta",
      description: "Quick weeknight dinner with crispy kale and garlic.",
      time: "20 min", servings: "2",
      ingredients: ["200g pasta", "Large bunch kale, stems removed", "4 cloves garlic, sliced", "Chili flakes", "Olive oil", ...(allowDairy ? ["Parmesan"] : ["Nutritional yeast (optional)"]), "Lemon juice", "Salt"],
      steps: ["Cook pasta according to package. Reserve 1 cup pasta water before draining.", "Heat olive oil in a pan. Fry garlic slices until golden, 1 min.", "Add kale, toss until wilted. Add chili flakes.", "Toss in pasta with a splash of pasta water. Top with " + (allowDairy ? "parmesan" : "nutritional yeast") + " and lemon."],
      matchedSeasonal: ["kale"], matchedPantry: ["pasta", "garlic", "olive oil", "chili flakes", "lemon"],
      tags: ["main", "vegetarian", "quick", ...(allowDairy ? [] : ["vegan"])],
    });
  }

  // === FISH (pescatarian+) ===

  if (allowFish && has("asparagus")) {
    recipes.push({
      title: "Pan-Fried Salmon with Asparagus",
      description: "Simple, elegant spring dinner in 20 minutes.",
      time: "20 min", servings: "2",
      ingredients: ["2 salmon fillets", "1 bunch asparagus, trimmed", "2 cloves garlic, minced", "Olive oil", "Lemon juice", "Salt & pepper", ...(allowDairy ? ["Knob of butter"] : [])],
      steps: ["Season salmon with salt, pepper. Pan-fry skin-side down 4 min, flip, cook 3 min.", "Meanwhile, toss asparagus with olive oil, garlic. Roast at 200°C for 10 min.", "Squeeze lemon over salmon" + (allowDairy ? ", add a knob of butter to the pan." : "."), "Serve salmon on top of asparagus."],
      matchedSeasonal: ["asparagus"], matchedPantry: ["garlic", "olive oil", "lemon"],
      tags: ["main", "pescatarian", "quick"],
    });
  }

  if (allowFish && has("tomato")) {
    recipes.push({
      title: "Cod in Tomato & Olive Sauce",
      description: "Mediterranean-style fish in a rich tomato sauce.",
      time: "25 min", servings: "2",
      ingredients: ["2 cod fillets (or any white fish)", "400g canned tomatoes", "Handful of olives", "2 cloves garlic, sliced", "1 tsp paprika", "Olive oil", "Fresh parsley", "Salt & pepper"],
      steps: ["Heat olive oil, fry garlic and paprika 1 min.", "Add canned tomatoes and olives. Simmer 10 min.", "Nestle cod fillets into the sauce. Cover, cook 8-10 min until fish flakes.", "Scatter parsley over. Serve with bread or rice."],
      matchedSeasonal: ["tomato"], matchedPantry: ["garlic", "paprika", "olive oil", "canned tomatoes"],
      tags: ["main", "pescatarian"],
    });
  }

  // === MEAT (omnivore/flexitarian) ===

  if (allowMeat && has("parsnip")) {
    recipes.push({
      title: "Roast Chicken with Parsnips & Carrots",
      description: "A one-tray Sunday dinner — set it and forget it.",
      time: "55 min", servings: "4",
      ingredients: ["4 chicken thighs", "3 parsnips, quartered", "3 carrots, halved", "1 onion, quartered", "3 cloves garlic", "Olive oil", "Thyme", "Salt & pepper"],
      steps: ["Toss parsnips, carrots, onion, garlic with olive oil, thyme, salt, pepper on a baking tray.", "Nestle chicken thighs on top, skin-side up. Season generously.", "Roast at 200°C for 45 min until chicken is golden and veg is tender.", "Rest 5 min before serving."],
      matchedSeasonal: ["parsnip", "carrot"], matchedPantry: ["onion", "garlic", "olive oil", "thyme"],
      tags: ["main", "meat", "comfort"],
    });
  }

  if (allowMeat && (has("cabbage") || has("kale"))) {
    recipes.push({
      title: "Sausage & Cabbage One-Pot",
      description: "Hearty, warming one-pot dinner that's ready in 25 minutes.",
      time: "25 min", servings: "4",
      ingredients: ["4 sausages (pork or chicken)", "½ cabbage, shredded", "2 potatoes, diced small", "1 onion, sliced", "2 cloves garlic", "1 tbsp mustard", "500ml chicken stock", "Olive oil", "Salt & pepper"],
      steps: ["Brown sausages in olive oil. Remove and slice.", "Sauté onion and garlic 3 min. Add potatoes, cook 2 min.", "Add cabbage, mustard, stock. Bring to boil, simmer 15 min.", "Return sliced sausages to the pot. Season and serve."],
      matchedSeasonal: ["cabbage", "potato"], matchedPantry: ["onion", "garlic", "mustard", "olive oil"],
      tags: ["main", "meat", "comfort", "one-pot"],
    });
  }

  // === SIDES ===

  if (has("brussels sprouts")) {
    recipes.push({
      title: "Crispy Brussels Sprouts with Honey",
      description: "The recipe that converts sprout-haters.",
      time: "25 min", servings: "3",
      ingredients: ["400g brussels sprouts, halved", "2 tbsp olive oil", "1 tbsp honey", "1 tbsp soy sauce", "Chili flakes", "Salt"],
      steps: ["Toss halved sprouts with olive oil and salt.", "Roast at 220°C for 20 min until crispy and charred.", "Mix honey, soy sauce, chili flakes.", "Toss roasted sprouts in the glaze. Serve immediately."],
      matchedSeasonal: ["brussels sprouts"], matchedPantry: ["olive oil", "honey", "soy sauce", "chili flakes"],
      tags: ["side", "vegan", "vegetarian"],
    });
  }

  if (has("parsnip")) {
    recipes.push({
      title: "Honey-Roasted Parsnips",
      description: "Caramelised and sweet — the perfect winter side.",
      time: "35 min", servings: "4",
      ingredients: ["500g parsnips, quartered lengthways", "2 tbsp olive oil", "2 tbsp honey", "1 tsp thyme", "Salt & pepper"],
      steps: ["Toss parsnips with olive oil, honey, thyme, salt and pepper.", "Spread on a baking tray in a single layer.", "Roast at 200°C for 30 min, turning halfway.", "Serve golden and caramelised."],
      matchedSeasonal: ["parsnip"], matchedPantry: ["olive oil", "honey", "thyme"],
      tags: ["side", "vegan", "vegetarian"],
    });
  }

  if (has("cauliflower") && allowDairy) {
    recipes.push({
      title: "Cauliflower Cheese",
      description: "The ultimate comfort food — creamy, cheesy, bubbly.",
      time: "35 min", servings: "4",
      ingredients: ["1 cauliflower, broken into florets", "40g butter", "40g flour", "500ml milk", "150g cheddar, grated", "1 tsp mustard", "Salt & pepper", "Breadcrumbs (optional)"],
      steps: ["Boil cauliflower florets for 5 min. Drain and place in a baking dish.", "Melt butter, stir in flour, cook 1 min. Gradually whisk in milk.", "Simmer until thick. Stir in most of the cheese and mustard.", "Pour over cauliflower. Top with remaining cheese and breadcrumbs. Grill until golden."],
      matchedSeasonal: ["cauliflower"], matchedPantry: ["butter", "flour", "milk", "cheese", "mustard"],
      tags: ["side", "vegetarian", "comfort"],
    });
  }

  if (has("cabbage")) {
    recipes.push({
      title: "Braised Cabbage with Mustard",
      description: "A hearty, comforting side dish.",
      time: "25 min", servings: "4",
      ingredients: ["½ cabbage, shredded", "1 onion, sliced", allowDairy ? "2 tbsp butter" : "2 tbsp olive oil", "1 tbsp mustard", "100ml vegetable stock", "1 tbsp vinegar", "Salt & pepper"],
      steps: [(allowDairy ? "Melt butter" : "Heat oil") + " in a pan. Sauté onion 3 min.", "Add cabbage, toss to coat. Cook 5 min until starting to soften.", "Add mustard, stock, vinegar. Cover and simmer 15 min.", "Season with salt and pepper. Serve as a side."],
      matchedSeasonal: ["cabbage"], matchedPantry: ["onion", allowDairy ? "butter" : "olive oil", "mustard", "vinegar"],
      tags: ["side", "vegan", "vegetarian"],
    });
  }

  if (has("courgette") && allowEggs) {
    recipes.push({
      title: "Courgette Fritters",
      description: "Crispy on the outside, soft inside. Great as a snack or light meal.",
      time: "20 min", servings: "2",
      ingredients: ["2 courgettes, grated", "1 egg", "50g flour", ...(allowDairy ? ["50g feta or parmesan"] : []), "2 spring onions, chopped", "Salt & pepper", "Olive oil for frying"],
      steps: ["Grate courgettes, squeeze out excess moisture with a tea towel.", "Mix with egg, flour, " + (allowDairy ? "cheese, " : "") + "spring onions, salt and pepper.", "Heat olive oil in a pan. Drop spoonfuls of mixture, flatten slightly.", "Fry 3 min each side until golden. Serve with " + (allowDairy ? "yogurt." : "a squeeze of lemon.")],
      matchedSeasonal: ["courgette", "spring onion"], matchedPantry: ["eggs", "flour", "olive oil"],
      tags: ["side", "vegetarian", "quick"],
    });
  }

  // === BREAKFAST ===

  if (has("strawberry")) {
    recipes.push({
      title: "Strawberry Overnight Oats",
      description: "No-cook breakfast showcasing fresh strawberries.",
      time: "5 min + overnight", servings: "1",
      ingredients: ["50g oats", allowDairy ? "150ml milk or yogurt" : "150ml oat milk or coconut yogurt", "Handful strawberries, sliced", "1 tbsp honey or maple syrup", "Pinch of cinnamon"],
      steps: ["Mix oats with " + (allowDairy ? "milk/yogurt" : "oat milk/coconut yogurt") + " in a jar.", "Stir in honey and cinnamon.", "Top with sliced strawberries. Cover and refrigerate overnight.", "Eat cold in the morning. Add more fresh strawberries on top."],
      matchedSeasonal: ["strawberry"], matchedPantry: ["oats", "milk"],
      tags: ["breakfast", "vegetarian", ...(allowDairy ? [] : ["vegan"])],
    });
  }

  // Fallback
  if (recipes.length < 3 && seasonal.length > 0) {
    recipes.push({
      title: `Seasonal ${seasonal[0].charAt(0).toUpperCase() + seasonal[0].slice(1)} Stir Fry`,
      description: "A quick stir fry featuring what's in season right now.",
      time: "15 min", servings: "2",
      ingredients: [...seasonal.slice(0, 4).map(s => `${s}, sliced`), "2 cloves garlic", "1 tbsp soy sauce", "1 tbsp olive oil", "Rice or noodles"],
      steps: ["Cook rice or noodles according to package.", "Heat oil in a wok or large pan.", `Add garlic, then ${seasonal.slice(0, 4).join(', ')}. Stir fry 5 min.`, "Add soy sauce. Toss and serve over rice/noodles."],
      matchedSeasonal: seasonal.slice(0, 4), matchedPantry: ["garlic", "soy sauce", "olive oil", "rice"],
      tags: ["main", "vegan", "vegetarian", "quick"],
    });
  }

  return recipes;
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Home() {
  const [step, setStep] = useState<"diet" | "pantry" | "recipes">("diet");
  const [diet, setDiet] = useState<Diet | null>(null);
  const [region, setRegion] = useState<Region>("europe");
  const [month, setMonth] = useState(new Date().getMonth());
  const [uncheckedPantry, setUncheckedPantry] = useState<Set<string>>(new Set());
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);
  const [showPantry, setShowPantry] = useState(false);

  const seasonal = useMemo(() => getSeasonalIngredients(region, month), [region, month]);

  const pantryNames = useMemo(() => {
    const checked = new Set<string>();
    PANTRY_ITEMS.forEach(i => {
      if (i.default && !uncheckedPantry.has(i.name)) checked.add(i.name);
      if (!i.default && uncheckedPantry.has("__added__" + i.name)) checked.add(i.name);
    });
    return [...checked];
  }, [uncheckedPantry]);

  const recipes = useMemo(
    () => diet ? generateRecipes(seasonal, pantryNames, diet) : [],
    [seasonal, pantryNames, diet]
  );

  const togglePantryItem = (name: string, isDefault: boolean) => {
    setUncheckedPantry(prev => {
      const next = new Set(prev);
      if (isDefault) {
        if (next.has(name)) next.delete(name);
        else next.add(name);
      } else {
        const key = "__added__" + name;
        if (next.has(key)) next.delete(key);
        else next.add(key);
      }
      return next;
    });
  };

  const isChecked = (name: string, isDefault: boolean) => {
    if (isDefault) return !uncheckedPantry.has(name);
    return uncheckedPantry.has("__added__" + name);
  };

  // === STEP 1: DIET ===
  if (step === "diet") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-3">🌿 InSeasoned</h1>
          <p className="text-[var(--color-muted)] text-xl">
            Recipes based on what&apos;s in season and what you have at home.
          </p>
        </header>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-center mb-6">What&apos;s your diet?</h2>
          <div className="grid gap-3">
            {DIETS.map(d => (
              <button
                key={d.id}
                onClick={() => { setDiet(d.id); setStep("pantry"); }}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                  diet === d.id
                    ? "border-[var(--color-accent)] bg-green-50"
                    : "border-[var(--color-border)] bg-white hover:border-[var(--color-accent-light)]"
                }`}
              >
                <span className="text-3xl">{d.emoji}</span>
                <div>
                  <div className="font-semibold text-lg">{d.label}</div>
                  <div className="text-sm text-[var(--color-muted)]">{d.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <select
            value={region}
            onChange={e => setRegion(e.target.value as Region)}
            className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm"
          >
            <option value="europe">🇪🇺 Europe</option>
            <option value="north-america">🇺🇸 North America</option>
          </select>
          <select
            value={month}
            onChange={e => setMonth(Number(e.target.value))}
            className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm"
          >
            {MONTH_NAMES.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>
        </div>

        <p className="text-center text-sm text-[var(--color-muted)] mt-8">
          <a href="/nl" className="text-[var(--color-accent)] hover:underline">🇳🇱 Nederlandse versie</a>
        </p>
      </div>
    );
  }

  // === STEP 2: PANTRY ===
  if (step === "pantry") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">🏪 What&apos;s in your kitchen?</h1>
          <p className="text-[var(--color-muted)]">
            We&apos;ve checked the basics most people have. Uncheck what you&apos;re missing, check what you&apos;ve got extra.
          </p>
        </header>

        <div className="bg-white border border-[var(--color-border)] rounded-xl p-5 space-y-5 mb-8">
          {PANTRY_CATEGORIES.map(cat => (
            <div key={cat}>
              <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-2">{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {PANTRY_ITEMS.filter(i => i.category === cat).map(item => (
                  <button
                    key={item.name}
                    onClick={() => togglePantryItem(item.name, item.default)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      isChecked(item.name, item.default)
                        ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                        : "bg-white text-[var(--color-muted)] border-[var(--color-border)] hover:border-[var(--color-accent)]"
                    }`}
                  >
                    {isChecked(item.name, item.default) ? "✓ " : ""}{item.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setStep("diet")}
            className="px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-muted)] font-medium hover:bg-white transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={() => setStep("recipes")}
            className="px-8 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors shadow-md"
          >
            Show me recipes 🍳
          </button>
        </div>
      </div>
    );
  }

  // === STEP 3: RECIPES ===
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1">🌿 InSeasoned</h1>
        <p className="text-sm text-[var(--color-muted)]">
          {DIETS.find(d => d.id === diet)?.emoji} {DIETS.find(d => d.id === diet)?.label} · {MONTH_NAMES[month]} · {region === "europe" ? "🇪🇺 Europe" : "🇺🇸 North America"}
          {" · "}
          <button onClick={() => setStep("diet")} className="text-[var(--color-accent)] hover:underline">change</button>
        </p>
      </header>

      {/* Seasonal */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span>🥕</span> In season in {MONTH_NAMES[month]}
        </h2>
        <div className="flex flex-wrap gap-2">
          {seasonal.map(item => (
            <span key={item} className="px-3 py-1.5 rounded-full text-sm font-medium bg-[var(--color-accent)] text-white">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Pantry toggle */}
      <section className="mb-6">
        <button
          onClick={() => setShowPantry(!showPantry)}
          className="flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
        >
          🏪 Your pantry ({pantryNames.length} items) — {showPantry ? "hide" : "edit"}
          <svg className={`w-3 h-3 transition-transform ${showPantry ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showPantry && (
          <div className="bg-white border border-[var(--color-border)] rounded-xl p-4 space-y-4 mt-3">
            {PANTRY_CATEGORIES.map(cat => (
              <div key={cat}>
                <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-2">{cat}</h3>
                <div className="flex flex-wrap gap-2">
                  {PANTRY_ITEMS.filter(i => i.category === cat).map(item => (
                    <button
                      key={item.name}
                      onClick={() => togglePantryItem(item.name, item.default)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                        isChecked(item.name, item.default)
                          ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                          : "bg-white text-[var(--color-muted)] border-[var(--color-border)] hover:border-[var(--color-accent)]"
                      }`}
                    >
                      {isChecked(item.name, item.default) ? "✓ " : ""}{item.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recipes */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>🍳</span> {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} you can make
        </h2>

        {recipes.length === 0 && (
          <div className="text-center py-12 text-[var(--color-muted)]">
            <p className="text-4xl mb-3">🤷</p>
            <p>No matching recipes found. Try checking more pantry items or changing the month.</p>
          </div>
        )}

        <div className="space-y-4">
          {recipes.map((recipe, i) => (
            <div key={i} className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              {getRecipeImage(recipe.title) && (
                <div className="w-full h-48 overflow-hidden">
                  <img src={getRecipeImage(recipe.title)!} alt={recipe.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
              <button onClick={() => setExpandedRecipe(expandedRecipe === i ? null : i)} className="w-full text-left p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{recipe.title}</h3>
                    <p className="text-sm text-[var(--color-muted)] mb-3">{recipe.description}</p>
                    <div className="flex gap-3 text-xs text-[var(--color-muted)]">
                      <span>⏱ {recipe.time}</span>
                      <span>👤 {recipe.servings} servings</span>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-[var(--color-muted)] transition-transform flex-shrink-0 mt-1 ${expandedRecipe === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {recipe.matchedSeasonal.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">🌿 {s}</span>
                  ))}
                  {recipe.matchedPantry.map(p => (
                    <span key={p} className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800">🏪 {p}</span>
                  ))}
                </div>
              </button>

              {expandedRecipe === i && (
                <div className="px-5 pb-5 border-t border-[var(--color-border)] pt-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-[var(--color-muted)] mb-2">Ingredients</h4>
                      <ul className="space-y-1">
                        {recipe.ingredients.map((ing, j) => (
                          <li key={j} className="text-sm flex items-start gap-2">
                            <span className="text-[var(--color-accent)]">•</span>{ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-[var(--color-muted)] mb-2">Steps</h4>
                      <ol className="space-y-2">
                        {recipe.steps.map((step, j) => (
                          <li key={j} className="text-sm flex items-start gap-2">
                            <span className="font-semibold text-[var(--color-accent)] flex-shrink-0">{j + 1}.</span>{step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center mt-16 pb-8 text-sm text-[var(--color-muted)]">
        <p>InSeasoned — Cook with what&apos;s in season 🌿</p>
        <p className="mt-1">No account needed. No data stored. Just recipes.</p>
      </footer>
    </div>
  );
}
