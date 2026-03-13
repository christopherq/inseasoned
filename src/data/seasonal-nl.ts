// Dutch seasonal data — focus on Netherlands/Belgium
export const SEASONAL_NL: Record<number, string[]> = {
  0: ["prei", "boerenkool", "spruiten", "knolselderij", "pastinaak", "rode biet", "winterwortel", "aardappel", "ui", "appel", "peer", "mandarijn", "sinaasappel", "kool"],
  1: ["prei", "boerenkool", "spruiten", "knolselderij", "pastinaak", "rode biet", "winterwortel", "aardappel", "ui", "appel", "peer", "bloedsinaasappel", "rabarber", "kool"],
  2: ["prei", "boerenkool", "bloemkool", "spinazie", "bosui", "radijs", "rabarber", "aardappel", "wortel", "ui", "kool"],
  3: ["asperges", "spinazie", "radijs", "bosui", "sla", "waterkers", "rabarber", "nieuwe aardappel", "doperwten", "wortel", "ui"],
  4: ["asperges", "spinazie", "aardbeien", "radijs", "bosui", "sla", "tuinbonen", "nieuwe aardappel", "doperwten", "wortel", "ui"],
  5: ["aardbeien", "kersen", "tuinbonen", "courgette", "doperwten", "nieuwe aardappel", "venkel", "aubergine", "komkommer", "tomaat", "wortel", "ui", "knoflook"],
  6: ["aardbeien", "frambozen", "blauwe bessen", "kersen", "tomaat", "courgette", "aubergine", "paprika", "komkommer", "sperziebonen", "venkel", "maïs", "wortel", "ui", "knoflook"],
  7: ["tomaat", "courgette", "aubergine", "paprika", "komkommer", "frambozen", "blauwe bessen", "bramen", "pruim", "perzik", "maïs", "sperziebonen", "vijg", "wortel", "ui", "knoflook"],
  8: ["pompoen", "appel", "peer", "pruim", "bramen", "vijg", "druif", "maïs", "prei", "rode biet", "wortel", "ui", "knoflook", "paddenstoelen"],
  9: ["pompoen", "appel", "peer", "kwee", "rode biet", "prei", "pastinaak", "boerenkool", "spruiten", "paddenstoelen", "wortel", "ui", "aardappel"],
  10: ["pompoen", "pastinaak", "knolselderij", "boerenkool", "kool", "prei", "spruiten", "rode biet", "cranberry", "appel", "peer", "mandarijn", "wortel", "ui", "aardappel"],
  11: ["pastinaak", "knolselderij", "boerenkool", "kool", "prei", "spruiten", "rode biet", "raap", "cranberry", "mandarijn", "sinaasappel", "wortel", "ui", "aardappel"],
};

export function getSeasonalIngredientsNL(month: number): string[] {
  return SEASONAL_NL[month] || [];
}
