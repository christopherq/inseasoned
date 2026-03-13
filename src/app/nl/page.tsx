"use client";

import { useState, useMemo } from "react";
import { PANTRY_ITEMS_NL, PANTRY_CATEGORIES_NL } from "@/data/pantry-nl";
import { getSeasonalIngredientsNL } from "@/data/seasonal-nl";

type Recipe = {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  steps: string[];
  matchedSeasonal: string[];
  matchedPantry: string[];
};

function generateRecipes(seasonal: string[], pantry: string[]): Recipe[] {
  const all = [...seasonal, ...pantry].map(i => i.toLowerCase());
  const has = (item: string) => all.some(a => a.includes(item) || item.includes(a));

  const recipes: Recipe[] = [];

  if (has("prei") && has("aardappel")) {
    recipes.push({
      title: "Prei-aardappelsoep",
      description: "Een klassieke romige soep, perfect voor koude maanden.",
      time: "35 min", servings: "4",
      ingredients: ["3 preien, in ringen", "4 aardappelen, in blokjes", "1 ui, gesnipperd", "2 el boter", "1L groentebouillon", "100ml slagroom (optioneel)", "Zout & peper"],
      steps: ["Smelt de boter in een grote pan. Fruit de ui en prei 5 min.", "Voeg aardappelen en bouillon toe. Breng aan de kook en laat 20 min sudderen.", "Pureer glad. Roer de slagroom erdoor als je wilt.", "Breng op smaak met zout en peper. Serveer met knapperig brood."],
      matchedSeasonal: ["prei", "aardappel"], matchedPantry: ["boter", "ui"],
    });
  }

  if (has("boerenkool") && (has("aardappel") || has("pasta") || has("rijst"))) {
    recipes.push({
      title: "Boerenkoolstamppot",
      description: "Dé Nederlandse klassieker. Simpel, voedzaam en perfect in de winter.",
      time: "30 min", servings: "4",
      ingredients: ["500g boerenkool, gewassen en gesneden", "1kg aardappelen, geschild", "1 rookworst", "Klontje boter", "Scheutje melk", "Mosterd", "Zout & peper"],
      steps: ["Kook de aardappelen gaar in gezouten water, ca. 20 min.", "Kook de rookworst apart warm in heet water.", "Giet de aardappelen af, bewaar wat kookvocht.", "Stamp de aardappelen met boter en melk. Schep de boerenkool erdoor.", "Serveer met rookworst en mosterd."],
      matchedSeasonal: ["boerenkool", "aardappel"], matchedPantry: ["boter", "melk", "mosterd"],
    });
  }

  if (has("pompoen")) {
    recipes.push({
      title: "Geroosterde pompoensoep",
      description: "Fluweelzachte herfstsoep met warming kruiden.",
      time: "45 min", servings: "4",
      ingredients: ["1 kleine pompoen, in blokjes", "1 ui, gesnipperd", "2 tenen knoflook", "1 tl komijn", "½ tl kaneel", "750ml groentebouillon", "Olijfolie", "Zout & peper"],
      steps: ["Besprenkel pompoenblokjes met olijfolie en zout. Rooster 25 min op 200°C.", "Fruit ui en knoflook. Voeg komijn en kaneel toe, 1 min bakken.", "Voeg de geroosterde pompoen en bouillon toe. 10 min laten sudderen.", "Pureer tot een gladde soep. Op smaak brengen."],
      matchedSeasonal: ["pompoen"], matchedPantry: ["ui", "knoflook", "komijn", "kaneel", "olijfolie"],
    });
  }

  if (has("spruiten")) {
    recipes.push({
      title: "Krokante spruitjes met honing en sojasaus",
      description: "Het recept dat spruitjeshaters overtuigt.",
      time: "25 min", servings: "3",
      ingredients: ["400g spruitjes, gehalveerd", "2 el olijfolie", "1 el honing", "1 el sojasaus", "Chilivlokken", "Zout"],
      steps: ["Meng de spruitjes met olijfolie en zout.", "Rooster op 220°C gedurende 20 min tot ze knapperig en donkerbruin zijn.", "Meng honing, sojasaus en chilivlokken.", "Schep de spruitjes door de glaze. Direct serveren."],
      matchedSeasonal: ["spruiten"], matchedPantry: ["olijfolie", "honing", "sojasaus", "chilivlokken"],
    });
  }

  if (has("asperges")) {
    recipes.push({
      title: "Asperges met een gepocheerd ei",
      description: "Simpel lentegerecht dat verse asperges laat schitteren.",
      time: "15 min", servings: "2",
      ingredients: ["1 bos asperges", "2 eieren", "Parmezaan, geschaafd", "Olijfolie", "Citroensap", "Zout & peper"],
      steps: ["Breek het houtige uiteinde van de asperges. Besprenkel met olijfolie, rooster 8 min op 200°C.", "Pocheer de eieren in zachtjes borrelend water met een scheutje azijn, 3 min.", "Leg de asperges op een bord, leg het ei erop met parmezaanschilfers.", "Besprenkel met olijfolie en citroen. Op smaak brengen."],
      matchedSeasonal: ["asperges"], matchedPantry: ["eieren", "olijfolie", "citroen", "parmezaan"],
    });
  }

  if (has("tomaat") && (has("aubergine") || has("courgette"))) {
    recipes.push({
      title: "Ratatouille uit de oven",
      description: "Kleurrijk zomergerecht vol groenten.",
      time: "50 min", servings: "4",
      ingredients: ["3 tomaten, in plakken", "1 aubergine, in plakken", "2 courgettes, in plakken", "1 paprika, in reepjes", "1 ui, gesnipperd", "3 tenen knoflook", "Olijfolie", "Tijm, oregano", "Zout & peper"],
      steps: ["Fruit ui en knoflook in olijfolie. Verdeel over een ovenschaal.", "Leg de plakjes tomaat, aubergine, courgette en paprika dakpansgewijs in de schaal.", "Besprenkel met olijfolie, bestrooi met tijm, oregano, zout en peper.", "Dek af met folie. 35 min in de oven op 200°C. Laatste 10 min zonder folie."],
      matchedSeasonal: ["tomaat", "aubergine", "courgette", "paprika"], matchedPantry: ["ui", "knoflook", "olijfolie", "tijm", "oregano"],
    });
  }

  if (has("aardbeien")) {
    recipes.push({
      title: "Aardbeien overnight oats",
      description: "Ontbijt zonder koken met verse aardbeien.",
      time: "5 min + overnacht", servings: "1",
      ingredients: ["50g havermout", "150ml melk of yoghurt", "Handje aardbeien, in plakjes", "1 el honing", "Snufje kaneel"],
      steps: ["Meng de havermout met melk of yoghurt in een potje.", "Roer de honing en kaneel erdoor.", "Leg de aardbeienplakjes erop. Dek af en zet een nacht in de koelkast.", "'s Ochtends koud eten. Eventueel extra verse aardbeien erbij."],
      matchedSeasonal: ["aardbeien"], matchedPantry: ["havermout", "melk", "honing", "kaneel"],
    });
  }

  if (has("rode biet")) {
    recipes.push({
      title: "Bietensalade met appel en walnoten",
      description: "Een levendige wintersalade met zoete en aardse smaken.",
      time: "15 min", servings: "2",
      ingredients: ["3 bieten, gekookt en in blokjes", "1 appel, in dunne plakjes", "50g walnoten", "Geitenkaas of feta (optioneel)", "2 el olijfolie", "1 el azijn", "Honing", "Zout & peper"],
      steps: ["Schik bieten en appelplakjes op een bord.", "Strooi walnoten erover en verkruimel de kaas.", "Klop olijfolie, azijn, honing, zout en peper tot een dressing.", "Besprenkel de salade met de dressing. Direct serveren."],
      matchedSeasonal: ["rode biet", "appel"], matchedPantry: ["olijfolie", "azijn"],
    });
  }

  if (has("bloemkool")) {
    recipes.push({
      title: "Bloemkool met kaassaus",
      description: "Comfortfood op z'n best — romig, kazig en goudbruin.",
      time: "35 min", servings: "4",
      ingredients: ["1 bloemkool, in roosjes", "40g boter", "40g bloem", "500ml melk", "150g kaas, geraspt", "1 tl mosterd", "Zout & peper", "Paneermeel (optioneel)"],
      steps: ["Kook de bloemkoolroosjes 5 min. Afgieten en in een ovenschaal leggen.", "Smelt boter, roer de bloem erdoor, bak 1 min. Voeg al roerend de melk toe.", "Laat indikken. Roer het meeste kaas en de mosterd erdoor.", "Giet over de bloemkool. Bestrooi met resterende kaas en paneermeel. Onder de grill tot goudbruin."],
      matchedSeasonal: ["bloemkool"], matchedPantry: ["boter", "bloem", "melk", "kaas", "mosterd"],
    });
  }

  if (has("spinazie") && has("eieren")) {
    recipes.push({
      title: "Shakshuka met spinazie",
      description: "Eieren gepocheerd in een pittige spinazie-tomatensaus.",
      time: "25 min", servings: "2",
      ingredients: ["Grote zak spinazie", "400g gepelde tomaten (blik)", "4 eieren", "1 ui, gesnipperd", "2 tenen knoflook", "1 tl komijn", "1 tl paprikapoeder", "Olijfolie", "Feta (optioneel)", "Brood om te dippen"],
      steps: ["Fruit ui en knoflook in olijfolie. Voeg komijn en paprikapoeder toe, 1 min bakken.", "Voeg de tomaten toe, 5 min laten sudderen. Roer de spinazie erdoor tot geslonken.", "Maak 4 kuiltjes in de saus. Breek in elk kuiltje een ei.", "Deksel erop, 5-7 min bakken tot het eiwit gestold is. Verkruimel feta erover. Serveer met brood."],
      matchedSeasonal: ["spinazie"], matchedPantry: ["eieren", "ui", "knoflook", "komijn", "paprikapoeder", "olijfolie", "gepelde tomaten (blik)"],
    });
  }

  if (has("pastinaak")) {
    recipes.push({
      title: "Pastinaak uit de oven met honing",
      description: "Gekarameliseerd en zoet — de perfecte winterbijlage.",
      time: "35 min", servings: "4",
      ingredients: ["500g pastinaak, in kwarten", "2 el olijfolie", "2 el honing", "1 tl tijm", "Zout & peper"],
      steps: ["Meng de pastinaak met olijfolie, honing, tijm, zout en peper.", "Verdeel over een bakplaat in één laag.", "Rooster op 200°C gedurende 30 min, halverwege omdraaien.", "Serveer goudbruin en gekarameliseerd."],
      matchedSeasonal: ["pastinaak"], matchedPantry: ["olijfolie", "honing", "tijm"],
    });
  }

  if (has("courgette")) {
    recipes.push({
      title: "Courgettekoekjes",
      description: "Knapperig van buiten, zacht van binnen. Lekker als snack of lichte maaltijd.",
      time: "20 min", servings: "2",
      ingredients: ["2 courgettes, geraspt", "1 ei", "50g bloem", "50g feta of parmezaan", "2 bosuitjes, gesneden", "Zout & peper", "Olijfolie om in te bakken"],
      steps: ["Rasp de courgettes en knijp het vocht eruit met een theedoek.", "Meng met ei, bloem, kaas, bosui, zout en peper.", "Verhit olijfolie in een koekenpan. Schep hoopjes beslag in de pan, druk plat.", "Bak 3 min per kant tot goudbruin. Serveer met yoghurt."],
      matchedSeasonal: ["courgette", "bosui"], matchedPantry: ["eieren", "bloem", "olijfolie"],
    });
  }

  if (has("wortel")) {
    recipes.push({
      title: "Wortel-komijnsoep",
      description: "Zoete geroosterde wortels met aardse komijn.",
      time: "40 min", servings: "4",
      ingredients: ["500g wortels, in stukken", "1 ui, gesnipperd", "2 tenen knoflook", "1 tl komijn", "750ml groentebouillon", "Olijfolie", "Zout & peper"],
      steps: ["Meng wortels met olijfolie, komijn en zout. Rooster 25 min op 200°C.", "Fruit ui en knoflook tot zacht.", "Voeg geroosterde wortels en bouillon toe. 10 min sudderen.", "Pureer glad. Op smaak brengen."],
      matchedSeasonal: ["wortel"], matchedPantry: ["ui", "knoflook", "komijn", "olijfolie"],
    });
  }

  if (has("kool")) {
    recipes.push({
      title: "Gestoofde kool met mosterd",
      description: "Een stevige, troostrijke bijlage.",
      time: "25 min", servings: "4",
      ingredients: ["½ kool, in reepjes", "1 ui, gesnipperd", "2 el boter", "1 el mosterd", "100ml kippenbouillon of groentebouillon", "1 el azijn", "Zout & peper"],
      steps: ["Smelt boter in een pan. Fruit de ui 3 min.", "Voeg de kool toe, roerbak 5 min tot ie begint te slinken.", "Voeg mosterd, bouillon en azijn toe. Deksel erop, 15 min sudderen.", "Op smaak brengen met zout en peper."],
      matchedSeasonal: ["kool"], matchedPantry: ["ui", "boter", "mosterd", "azijn"],
    });
  }

  if (recipes.length < 3 && seasonal.length > 0) {
    recipes.push({
      title: `Seizoensroerbak met ${seasonal[0]}`,
      description: "Een snelle roerbak met wat er nu in het seizoen is.",
      time: "15 min", servings: "2",
      ingredients: [...seasonal.slice(0, 4).map(s => `${s}, in reepjes`), "2 tenen knoflook", "1 el sojasaus", "1 el olijfolie", "Rijst of noedels"],
      steps: ["Kook rijst of noedels volgens de verpakking.", "Verhit olie in een wok of grote pan.", `Voeg knoflook toe, dan ${seasonal.slice(0, 4).join(', ')}. Roerbak 5 min.`, "Voeg sojasaus toe. Schep en serveer op rijst of noedels."],
      matchedSeasonal: seasonal.slice(0, 4), matchedPantry: ["knoflook", "sojasaus", "olijfolie", "rijst"],
    });
  }

  return recipes;
}

const MAAND_NAMEN = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];

export default function NLPage() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [uncheckedPantry, setUncheckedPantry] = useState<Set<string>>(new Set());
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);
  const [showPantry, setShowPantry] = useState(false);

  const seasonal = useMemo(() => getSeasonalIngredientsNL(month), [month]);

  const pantryNames = useMemo(() => {
    const checked = new Set<string>();
    PANTRY_ITEMS_NL.forEach(i => {
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
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">🌿 InSeasoned</h1>
        <p className="text-[var(--color-muted)] text-lg">
          Kook met wat er in het seizoen is. Recepten op basis van wat je in huis hebt.
        </p>
        <a href="/" className="text-sm text-[var(--color-accent)] hover:underline mt-2 inline-block">🇬🇧 English version</a>
      </header>

      <div className="flex flex-wrap gap-3 items-center justify-center mb-6">
        <select
          value={month}
          onChange={e => setMonth(Number(e.target.value))}
          className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          {MAAND_NAMEN.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span>🥕</span> In het seizoen in {MAAND_NAMEN[month]}
        </h2>
        <div className="flex flex-wrap gap-2">
          {seasonal.map(item => (
            <span key={item} className="px-3 py-1.5 rounded-full text-sm font-medium bg-[var(--color-accent)] text-white">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <button
          onClick={() => setShowPantry(!showPantry)}
          className="flex items-center gap-2 text-lg font-semibold mb-3 hover:text-[var(--color-accent)] transition-colors"
        >
          <span>🏪</span> Jouw voorraadkast
          <span className="text-sm font-normal text-[var(--color-muted)]">
            ({pantryNames.length} items) — {showPantry ? "verbergen" : "aanpassen"}
          </span>
          <svg className={`w-4 h-4 transition-transform ${showPantry ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showPantry && (
          <div className="bg-white border border-[var(--color-border)] rounded-xl p-4 space-y-4">
            <p className="text-sm text-[var(--color-muted)]">
              Vink uit wat je niet hebt. Vink aan wat je wel hebt. Recepten passen zich aan.
            </p>
            {PANTRY_CATEGORIES_NL.map(cat => (
              <div key={cat}>
                <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-2">{cat}</h3>
                <div className="flex flex-wrap gap-2">
                  {PANTRY_ITEMS_NL.filter(i => i.category === cat).map(item => (
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

      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>🍳</span> {recipes.length} recept{recipes.length !== 1 ? "en" : ""} die je kunt maken
        </h2>

        {recipes.length === 0 && (
          <div className="text-center py-12 text-[var(--color-muted)]">
            <p className="text-4xl mb-3">🤷</p>
            <p>Geen recepten gevonden. Probeer meer items aan te vinken of verander de maand.</p>
          </div>
        )}

        <div className="space-y-4">
          {recipes.map((recipe, i) => (
            <div key={i} className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <button onClick={() => setExpandedRecipe(expandedRecipe === i ? null : i)} className="w-full text-left p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{recipe.title}</h3>
                    <p className="text-sm text-[var(--color-muted)] mb-3">{recipe.description}</p>
                    <div className="flex gap-3 text-xs text-[var(--color-muted)]">
                      <span>⏱ {recipe.time}</span>
                      <span>👤 {recipe.servings} personen</span>
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
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-[var(--color-muted)] mb-2">Ingrediënten</h4>
                      <ul className="space-y-1">
                        {recipe.ingredients.map((ing, j) => (
                          <li key={j} className="text-sm flex items-start gap-2">
                            <span className="text-[var(--color-accent)]">•</span>{ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-[var(--color-muted)] mb-2">Bereidingswijze</h4>
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
        <p>InSeasoned — Kook met wat er in het seizoen is 🌿</p>
        <p className="mt-1">Geen account nodig. Geen data opgeslagen. Alleen recepten.</p>
      </footer>
    </div>
  );
}
