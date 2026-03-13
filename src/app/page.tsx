"use client";

import { useState, useMemo, useEffect } from "react";
import { PANTRY_ITEMS, PANTRY_CATEGORIES } from "@/data/pantry";
import { getSeasonalIngredients, Region } from "@/data/seasonal";

type Recipe = {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  steps: string[];
  matchedSeasonal: string[];
  matchedPantry: string[];
  source?: string;
};

// Simple recipe database using seasonal + pantry combos
function generateRecipes(seasonal: string[], pantry: string[]): Recipe[] {
  const all = [...seasonal, ...pantry].map(i => i.toLowerCase());
  const has = (item: string) => all.some(a => a.includes(item) || item.includes(a));

  const recipes: Recipe[] = [];

  // Soups
  if (has("leek") && has("potato")) {
    recipes.push({
      title: "Leek & Potato Soup",
      description: "A classic creamy soup, perfect for cold months when leeks are at their best.",
      time: "35 min", servings: "4",
      ingredients: ["3 leeks, sliced", "4 potatoes, diced", "1 onion, chopped", "2 tbsp butter", "1L vegetable stock", "100ml cream (optional)", "Salt & pepper"],
      steps: ["Melt butter in a large pot. Add onion and leeks, cook 5 min until soft.", "Add potatoes and stock. Bring to boil, then simmer 20 min until potatoes are tender.", "Blend until smooth. Stir in cream if using.", "Season with salt and pepper. Serve with crusty bread."],
      matchedSeasonal: ["leek", "potato"], matchedPantry: ["butter", "onion"],
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
    });
  }

  if (has("beetroot")) {
    recipes.push({
      title: "Beetroot & Apple Salad",
      description: "A vibrant winter salad with sweet and earthy flavours.",
      time: "15 min", servings: "2",
      ingredients: ["3 beetroot, cooked and diced", "1 apple, thinly sliced", "50g walnuts", "Goat cheese or feta (optional)", "2 tbsp olive oil", "1 tbsp vinegar", "Honey", "Salt & pepper"],
      steps: ["Arrange beetroot and apple slices on a plate.", "Scatter walnuts and crumble cheese over.", "Whisk olive oil, vinegar, honey, salt and pepper.", "Drizzle dressing over salad. Serve immediately."],
      matchedSeasonal: ["beetroot", "apple"], matchedPantry: ["olive oil", "vinegar"],
    });
  }

  if (has("asparagus")) {
    recipes.push({
      title: "Asparagus with Poached Egg",
      description: "Simple spring dish that lets fresh asparagus shine.",
      time: "15 min", servings: "2",
      ingredients: ["1 bunch asparagus", "2 eggs", "Parmesan, shaved", "Olive oil", "Lemon juice", "Salt & pepper"],
      steps: ["Trim asparagus. Toss with olive oil, roast at 200°C for 8 min or griddle.", "Poach eggs in simmering water with a splash of vinegar, 3 min.", "Plate asparagus, top with poached egg and parmesan shavings.", "Drizzle with olive oil and lemon. Season."],
      matchedSeasonal: ["asparagus"], matchedPantry: ["eggs", "olive oil", "lemon", "parmesan"],
    });
  }

  if (has("tomato") && has("aubergine") || has("tomato") && has("eggplant")) {
    recipes.push({
      title: "Baked Ratatouille",
      description: "A colourful Provençal dish celebrating summer vegetables.",
      time: "50 min", servings: "4",
      ingredients: ["3 tomatoes, sliced", "1 aubergine, sliced", "2 courgettes, sliced", "1 pepper, sliced", "1 onion, diced", "3 cloves garlic", "Olive oil", "Thyme, oregano", "Salt & pepper"],
      steps: ["Sauté onion and garlic in olive oil. Spread in baking dish.", "Layer sliced tomatoes, aubergine, courgettes, and pepper in alternating pattern.", "Drizzle with olive oil, sprinkle with thyme, oregano, salt, pepper.", "Cover with foil. Bake 200°C for 35 min. Uncover last 10 min."],
      matchedSeasonal: ["tomato", "aubergine", "courgette", "pepper"], matchedPantry: ["onion", "garlic", "olive oil", "thyme", "oregano"],
    });
  }

  if (has("strawberry")) {
    recipes.push({
      title: "Strawberry Overnight Oats",
      description: "No-cook breakfast showcasing fresh strawberries.",
      time: "5 min + overnight", servings: "1",
      ingredients: ["50g oats", "150ml milk or yogurt", "Handful strawberries, sliced", "1 tbsp honey", "Pinch of cinnamon"],
      steps: ["Mix oats with milk/yogurt in a jar.", "Stir in honey and cinnamon.", "Top with sliced strawberries. Cover and refrigerate overnight.", "Eat cold in the morning. Add more fresh strawberries on top."],
      matchedSeasonal: ["strawberry"], matchedPantry: ["oats", "milk", "honey", "cinnamon"],
    });
  }

  if (has("kale") && (has("pasta") || has("rice"))) {
    recipes.push({
      title: "Garlic Kale Pasta",
      description: "Quick weeknight dinner with crispy kale and garlic.",
      time: "20 min", servings: "2",
      ingredients: ["200g pasta", "Large bunch kale, stems removed", "4 cloves garlic, sliced", "Chili flakes", "Olive oil", "Parmesan", "Lemon juice", "Salt"],
      steps: ["Cook pasta according to package. Reserve 1 cup pasta water before draining.", "Heat olive oil in a pan. Fry garlic slices until golden, 1 min.", "Add kale, toss until wilted. Add chili flakes.", "Toss in pasta with a splash of pasta water. Top with parmesan and lemon."],
      matchedSeasonal: ["kale"], matchedPantry: ["pasta", "garlic", "olive oil", "chili flakes", "parmesan", "lemon"],
    });
  }

  if (has("cabbage")) {
    recipes.push({
      title: "Braised Cabbage with Mustard",
      description: "A hearty, comforting side dish.",
      time: "25 min", servings: "4",
      ingredients: ["½ cabbage, shredded", "1 onion, sliced", "2 tbsp butter", "1 tbsp mustard", "100ml chicken or vegetable stock", "1 tbsp vinegar", "Salt & pepper"],
      steps: ["Melt butter in a pan. Sauté onion 3 min.", "Add cabbage, toss to coat. Cook 5 min until starting to soften.", "Add mustard, stock, vinegar. Cover and simmer 15 min.", "Season with salt and pepper. Serve as a side."],
      matchedSeasonal: ["cabbage"], matchedPantry: ["onion", "butter", "mustard", "vinegar"],
    });
  }

  if (has("courgette") || has("zucchini")) {
    recipes.push({
      title: "Courgette Fritters",
      description: "Crispy on the outside, soft inside. Great as a snack or light meal.",
      time: "20 min", servings: "2",
      ingredients: ["2 courgettes, grated", "1 egg", "50g flour", "50g feta or parmesan", "2 spring onions, chopped", "Salt & pepper", "Olive oil for frying"],
      steps: ["Grate courgettes, squeeze out excess moisture with a tea towel.", "Mix with egg, flour, cheese, spring onions, salt and pepper.", "Heat olive oil in a pan. Drop spoonfuls of mixture, flatten slightly.", "Fry 3 min each side until golden. Serve with yogurt."],
      matchedSeasonal: ["courgette", "spring onion"], matchedPantry: ["eggs", "flour", "olive oil"],
    });
  }

  if (has("brussels sprouts")) {
    recipes.push({
      title: "Crispy Brussels Sprouts with Honey",
      description: "The recipe that converts sprout-haters.",
      time: "25 min", servings: "3",
      ingredients: ["400g brussels sprouts, halved", "2 tbsp olive oil", "1 tbsp honey", "1 tbsp soy sauce", "Chili flakes", "Salt"],
      steps: ["Toss halved sprouts with olive oil and salt.", "Roast at 220°C for 20 min until crispy and charred.", "Mix honey, soy sauce, chili flakes.", "Toss roasted sprouts in the glaze. Serve immediately."],
      matchedSeasonal: ["brussels sprouts"], matchedPantry: ["olive oil", "honey", "soy sauce", "chili flakes"],
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
    });
  }

  if (has("spinach") && has("eggs")) {
    recipes.push({
      title: "Spinach & Egg Shakshuka",
      description: "Eggs poached in a spiced spinach and tomato sauce.",
      time: "25 min", servings: "2",
      ingredients: ["Large bag spinach", "400g canned tomatoes", "4 eggs", "1 onion, diced", "2 cloves garlic", "1 tsp cumin", "1 tsp paprika", "Olive oil", "Feta (optional)", "Bread for serving"],
      steps: ["Sauté onion and garlic in olive oil. Add cumin and paprika, cook 1 min.", "Add canned tomatoes, simmer 5 min. Stir in spinach until wilted.", "Make 4 wells in the sauce. Crack an egg into each.", "Cover, cook 5-7 min until whites are set. Crumble feta over. Serve with bread."],
      matchedSeasonal: ["spinach"], matchedPantry: ["eggs", "onion", "garlic", "cumin", "paprika", "olive oil", "canned tomatoes"],
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
    });
  }

  if (has("cauliflower")) {
    recipes.push({
      title: "Cauliflower Cheese",
      description: "The ultimate comfort food — creamy, cheesy, bubbly.",
      time: "35 min", servings: "4",
      ingredients: ["1 cauliflower, broken into florets", "40g butter", "40g flour", "500ml milk", "150g cheddar, grated", "1 tsp mustard", "Salt & pepper", "Breadcrumbs (optional)"],
      steps: ["Boil cauliflower florets for 5 min. Drain and place in a baking dish.", "Melt butter, stir in flour, cook 1 min. Gradually whisk in milk.", "Simmer until thick. Stir in most of the cheese and mustard.", "Pour over cauliflower. Top with remaining cheese and breadcrumbs. Grill until golden."],
      matchedSeasonal: ["cauliflower"], matchedPantry: ["butter", "flour", "milk", "cheese", "mustard"],
    });
  }

  if (has("sweetcorn") || has("corn")) {
    recipes.push({
      title: "Mexican Street Corn Salad",
      description: "Smoky, creamy, tangy — summer in a bowl.",
      time: "15 min", servings: "4",
      ingredients: ["4 ears of corn (or 400g frozen)", "2 tbsp mayo or yogurt", "Juice of 1 lime or lemon", "1 tsp paprika", "Chili flakes", "Fresh coriander or parsley", "Feta, crumbled", "Salt"],
      steps: ["Char corn in a hot pan or on the grill until blistered. Cut kernels off.", "Mix mayo/yogurt, lime juice, paprika, chili flakes.", "Toss corn with dressing.", "Top with crumbled feta and herbs."],
      matchedSeasonal: ["sweetcorn", "corn"], matchedPantry: ["lemon", "paprika", "chili flakes"],
    });
  }

  // Fallback: simple seasonal stir fry
  if (recipes.length < 3 && seasonal.length > 0) {
    recipes.push({
      title: `Seasonal ${seasonal[0].charAt(0).toUpperCase() + seasonal[0].slice(1)} Stir Fry`,
      description: `A quick stir fry featuring what's in season right now.`,
      time: "15 min", servings: "2",
      ingredients: [...seasonal.slice(0, 4).map(s => `${s}, sliced`), "2 cloves garlic", "1 tbsp soy sauce", "1 tbsp olive oil", "Rice or noodles"],
      steps: ["Cook rice or noodles according to package.", "Heat oil in a wok or large pan.", `Add garlic, then ${seasonal.slice(0, 4).join(', ')}. Stir fry 5 min.`, "Add soy sauce. Toss and serve over rice/noodles."],
      matchedSeasonal: seasonal.slice(0, 4), matchedPantry: ["garlic", "soy sauce", "olive oil", "rice"],
    });
  }

  return recipes;
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Home() {
  const [region, setRegion] = useState<Region>("europe");
  const [month, setMonth] = useState(new Date().getMonth());
  const [uncheckedPantry, setUncheckedPantry] = useState<Set<string>>(new Set());
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);
  const [showPantry, setShowPantry] = useState(false);

  const seasonal = useMemo(() => getSeasonalIngredients(region, month), [region, month]);

  const activePantry = useMemo(() =>
    PANTRY_ITEMS.filter(i => i.default && !uncheckedPantry.has(i.name))
      .concat(PANTRY_ITEMS.filter(i => !i.default && !uncheckedPantry.has(i.name) && uncheckedPantry.has("__added__" + i.name)))
      .map(i => i.name),
    [uncheckedPantry]
  );

  const pantryNames = useMemo(() => {
    const checked = new Set<string>();
    PANTRY_ITEMS.forEach(i => {
      if (i.default && !uncheckedPantry.has(i.name)) checked.add(i.name);
      if (!i.default && uncheckedPantry.has("__added__" + i.name)) checked.add(i.name);
    });
    return [...checked];
  }, [uncheckedPantry]);

  const recipes = useMemo(() => generateRecipes(seasonal, pantryNames), [seasonal, pantryNames]);

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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          🌿 InSeasoned
        </h1>
        <p className="text-[var(--color-muted)] text-lg">
          Cook with what&apos;s in season. Recipes based on what you actually have.
        </p>
      </header>

      {/* Region & Month selector */}
      <div className="flex flex-wrap gap-3 items-center justify-center mb-6">
        <select
          value={region}
          onChange={e => setRegion(e.target.value as Region)}
          className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          <option value="europe">🇪🇺 Europe</option>
          <option value="north-america">🇺🇸 North America</option>
        </select>

        <select
          value={month}
          onChange={e => setMonth(Number(e.target.value))}
          className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          {MONTH_NAMES.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>
      </div>

      {/* Seasonal ingredients */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span>🥕</span> In season in {MONTH_NAMES[month]}
        </h2>
        <div className="flex flex-wrap gap-2">
          {seasonal.map(item => (
            <span
              key={item}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-[var(--color-accent)] text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Pantry toggle */}
      <section className="mb-8">
        <button
          onClick={() => setShowPantry(!showPantry)}
          className="flex items-center gap-2 text-lg font-semibold mb-3 hover:text-[var(--color-accent)] transition-colors"
        >
          <span>🏪</span> Your pantry
          <span className="text-sm font-normal text-[var(--color-muted)]">
            ({pantryNames.length} items) — {showPantry ? "hide" : "edit"}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${showPantry ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showPantry && (
          <div className="bg-white border border-[var(--color-border)] rounded-xl p-4 space-y-4">
            <p className="text-sm text-[var(--color-muted)]">
              Uncheck anything you don&apos;t have. Check items you do have. Recipes will adapt.
            </p>
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
            <div
              key={i}
              className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setExpandedRecipe(expandedRecipe === i ? null : i)}
                className="w-full text-left p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{recipe.title}</h3>
                    <p className="text-sm text-[var(--color-muted)] mb-3">{recipe.description}</p>
                    <div className="flex gap-3 text-xs text-[var(--color-muted)]">
                      <span>⏱ {recipe.time}</span>
                      <span>👤 {recipe.servings} servings</span>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-[var(--color-muted)] transition-transform flex-shrink-0 mt-1 ${expandedRecipe === i ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Ingredient tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {recipe.matchedSeasonal.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                      🌿 {s}
                    </span>
                  ))}
                  {recipe.matchedPantry.map(p => (
                    <span key={p} className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800">
                      🏪 {p}
                    </span>
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
                            <span className="text-[var(--color-accent)]">•</span>
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-[var(--color-muted)] mb-2">Steps</h4>
                      <ol className="space-y-2">
                        {recipe.steps.map((step, j) => (
                          <li key={j} className="text-sm flex items-start gap-2">
                            <span className="font-semibold text-[var(--color-accent)] flex-shrink-0">{j + 1}.</span>
                            {step}
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

      {/* Footer */}
      <footer className="text-center mt-16 pb-8 text-sm text-[var(--color-muted)]">
        <p>InSeasoned — Cook with what&apos;s in season 🌿</p>
        <p className="mt-1">No account needed. No data stored. Just recipes.</p>
      </footer>
    </div>
  );
}
