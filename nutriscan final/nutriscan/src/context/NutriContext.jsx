import { createContext, useContext, useState, useEffect } from "react";
import { getNutrientTargets } from "../utils/bmiCalculator";
import { calculateTotalNutrients } from "../utils/nutritionHelper";

const NutriContext = createContext(null);

const STORAGE_KEY_PROFILE = "nutriscan_profile";
const STORAGE_KEY_LOG = "nutriscan_foodlog";

export function NutriProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [foodLog, setFoodLog] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOG);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Persist to localStorage
  useEffect(() => {
    if (profile) localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOG, JSON.stringify(foodLog));
  }, [foodLog]);

  const nutrientTargets = profile
    ? getNutrientTargets(profile.dailyCalories, profile.gender)
    : null;

  const totalNutrients = calculateTotalNutrients(foodLog);

  function addFood(food, quantity) {
    const entry = {
      id: Date.now().toString(),
      food,
      quantity,
      addedAt: new Date().toISOString(),
    };
    setFoodLog((prev) => [...prev, entry]);
  }

  function removeFood(entryId) {
    setFoodLog((prev) => prev.filter((e) => e.id !== entryId));
  }

  function clearLog() {
    setFoodLog([]);
  }

  return (
    <NutriContext.Provider
      value={{
        profile,
        setProfile,
        foodLog,
        addFood,
        removeFood,
        clearLog,
        nutrientTargets,
        totalNutrients,
      }}
    >
      {children}
    </NutriContext.Provider>
  );
}

export function useNutri() {
  const ctx = useContext(NutriContext);
  if (!ctx) throw new Error("useNutri must be inside NutriProvider");
  return ctx;
}
