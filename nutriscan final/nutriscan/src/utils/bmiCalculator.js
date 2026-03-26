/**
 * BMI & Calorie Utilities
 */

export function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBMICategory(bmi) {
  if (bmi < 17.0) return { label: "Sangat Kurus", color: "#60a5fa", level: 0 };
  if (bmi < 18.5) return { label: "Kurus", color: "#93c5fd", level: 1 };
  if (bmi < 25.0) return { label: "Normal", color: "#4ade80", level: 2 };
  if (bmi < 27.0) return { label: "Gemuk", color: "#fde047", level: 3 };
  return { label: "Obesitas", color: "#f87171", level: 4 };
}

export function getBMIPosition(bmi) {
  // Returns 0–100 for progress bar
  const min = 14, max = 35;
  return Math.min(100, Math.max(0, ((bmi - min) / (max - min)) * 100));
}

/**
 * Harris-Benedict equation (revised Mifflin-St Jeor)
 * Activity factor for pelajar: 1.55 (moderately active)
 */
export function calculateDailyCalories(weightKg, heightCm, age, gender) {
  let bmr;
  if (gender === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  return Math.round(bmr * 1.55);
}

/**
 * Get nutrient targets based on age, gender, and calorie needs
 */
export function getNutrientTargets(calories, gender) {
  // Based on PERMENKES 2019 proportions
  const carbPct = 0.55;
  const proteinPct = gender === "male" ? 0.15 : 0.14;
  const fatPct = 0.30;

  return {
    calories,
    protein: Math.round((calories * proteinPct) / 4), // 4 kcal/g
    carbs: Math.round((calories * carbPct) / 4),       // 4 kcal/g
    fat: Math.round((calories * fatPct) / 9),           // 9 kcal/g
    fiber: gender === "male" ? 38 : 32,
  };
}

export function getBMIAdvice(bmiCategory) {
  const advice = {
    "Sangat Kurus": "Tingkatkan asupan kalori dengan makanan bergizi tinggi. Konsultasikan dengan dokter atau ahli gizi.",
    "Kurus": "Tambah asupan kalori +300–500 kkal/hari. Fokus pada protein dan karbohidrat kompleks.",
    "Normal": "Pertahankan pola makan seimbang. Kamu sudah dalam kondisi ideal!",
    "Gemuk": "Kurangi asupan kalori -300–500 kkal/hari. Perbanyak sayuran dan kurangi makanan tinggi lemak.",
    "Obesitas": "Kurangi asupan kalori secara bertahap. Konsultasikan dengan tenaga medis untuk program diet yang aman.",
  };
  return advice[bmiCategory] || "";
}
