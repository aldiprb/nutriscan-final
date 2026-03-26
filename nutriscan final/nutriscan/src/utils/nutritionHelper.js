/**
 * Nutrition calculation helpers
 */

export function calculateTotalNutrients(foodLog) {
  return foodLog.reduce(
    (acc, item) => {
      const ratio = item.quantity / item.food.serving_size;
      acc.calories += item.food.nutrients.calories * ratio;
      acc.protein += item.food.nutrients.protein * ratio;
      acc.carbs += item.food.nutrients.carbs * ratio;
      acc.fat += item.food.nutrients.fat * ratio;
      acc.fiber += item.food.nutrients.fiber * ratio;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
}

export function getPercentage(value, target) {
  if (!target) return 0;
  return Math.min(150, Math.round((value / target) * 100));
}

export function getNutrientStatus(pct) {
  if (pct < 50) return { label: "Sangat Kurang", color: "#f87171" };
  if (pct < 75) return { label: "Kurang", color: "#fb923c" };
  if (pct <= 110) return { label: "Cukup", color: "#4ade80" };
  if (pct <= 130) return { label: "Berlebih", color: "#fde047" };
  return { label: "Jauh Berlebih", color: "#f87171" };
}

export function getDeficientNutrients(totals, targets) {
  const deficient = [];
  if (targets.protein && totals.protein / targets.protein < 0.75) deficient.push("protein");
  if (targets.carbs && totals.carbs / targets.carbs < 0.75) deficient.push("carbs");
  if (targets.fat && totals.fat / targets.fat < 0.75) deficient.push("fat");
  if (targets.fiber && totals.fiber / targets.fiber < 0.75) deficient.push("fiber");
  if (targets.calories && totals.calories / targets.calories < 0.75) deficient.push("calories");
  return deficient;
}

export function recommendFoods(foods, deficientNutrients, loggedFoodIds = []) {
  if (!deficientNutrients.length) return [];

  return foods
    .filter((f) => !loggedFoodIds.includes(f.id))
    .map((food) => {
      let score = 0;
      const n = food.nutrients;
      if (deficientNutrients.includes("protein") && n.protein > 5) score += n.protein * 2;
      if (deficientNutrients.includes("carbs") && n.carbs > 10) score += n.carbs;
      if (deficientNutrients.includes("fiber") && n.fiber > 1) score += n.fiber * 5;
      if (deficientNutrients.includes("fat") && n.fat > 3) score += n.fat;
      return { ...food, score };
    })
    .filter((f) => f.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

export function formatNutrient(value, unit = "g") {
  return `${Math.round(value * 10) / 10}${unit}`;
}
