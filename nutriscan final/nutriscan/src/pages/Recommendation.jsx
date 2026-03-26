import { useState, useMemo } from "react";
import { useNutri } from "../context/NutriContext";
import { getDeficientNutrients, recommendFoods, getPercentage } from "../utils/nutritionHelper";
import foods from "../data/foods.json";
import { Link } from "react-router-dom";

const MEAL_LABELS = { breakfast: "Sarapan", lunch: "Makan Siang", dinner: "Makan Malam", snack: "Camilan" };
const NUTRIENT_LABELS = { protein: "Protein", carbs: "Karbohidrat", fat: "Lemak", fiber: "Serat", calories: "Kalori" };
const NUTRIENT_COLORS = { protein: "#60a5fa", carbs: "#c084fc", fat: "#fb923c", fiber: "#4ade80", calories: "#fde047" };

export default function Recommendation() {
  const { totalNutrients, nutrientTargets, foodLog, addFood } = useNutri();
  const [mealFilter, setMealFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [added, setAdded] = useState({});

  const deficient = useMemo(
    () => (nutrientTargets ? getDeficientNutrients(totalNutrients, nutrientTargets) : []),
    [totalNutrients, nutrientTargets]
  );

  const loggedIds = foodLog.map((e) => e.food.id);

  const recommendations = useMemo(
    () => recommendFoods(foods, deficient.length ? deficient : ["protein", "fiber"], loggedIds),
    [deficient, loggedIds]
  );

  const filtered = recommendations.filter((f) => {
    const matchMeal = mealFilter === "all" || f.meal_time.includes(mealFilter);
    const matchSource = sourceFilter === "all" || f.category === sourceFilter;
    return matchMeal && matchSource;
  });

  function handleQuickAdd(food) {
    addFood(food, food.serving_size);
    setAdded((prev) => ({ ...prev, [food.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [food.id]: false })), 1500);
  }

  const hasData = foodLog.length > 0 || nutrientTargets;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Rekomendasi</span>
        <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: 12 }}>
          Rekomendasi <span style={{ color: "var(--c-green)" }}>Makananmu</span>
        </h1>
        <p style={{ color: "var(--c-muted)", fontSize: "0.95rem", maxWidth: 480 }}>
          Berdasarkan log makananmu hari ini, berikut rekomendasi untuk melengkapi kebutuhan gizi yang masih kurang.
        </p>
      </div>

      {/* Deficiency Banner */}
      {hasData && (
        <div style={{ marginBottom: 32 }}>
          {deficient.length > 0 ? (
            <div style={{
              padding: "20px 24px",
              borderRadius: 14,
              background: "rgba(248,113,113,0.06)",
              border: "1px solid rgba(248,113,113,0.2)",
              marginBottom: 24,
            }}>
              <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, marginBottom: 12, fontSize: "0.95rem" }}>
                ⚠️ Nutrisi yang masih kurang hari ini
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {deficient.map((key) => {
                  const value = totalNutrients[key] || 0;
                  const target = nutrientTargets?.[key];
                  const pct = target ? getPercentage(value, target) : 0;
                  return (
                    <div key={key} style={{
                      padding: "8px 14px",
                      borderRadius: 8,
                      background: `${NUTRIENT_COLORS[key]}15`,
                      border: `1px solid ${NUTRIENT_COLORS[key]}30`,
                    }}>
                      <p style={{ fontSize: "0.8rem", color: NUTRIENT_COLORS[key], fontWeight: 600 }}>{NUTRIENT_LABELS[key]}</p>
                      <p style={{ fontSize: "0.72rem", color: "var(--c-muted)", fontFamily: "JetBrains Mono, monospace" }}>{pct}% terpenuhi</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{
              padding: "16px 20px",
              borderRadius: 12,
              background: "rgba(74,222,128,0.06)",
              border: "1px solid rgba(74,222,128,0.2)",
              marginBottom: 24,
            }}>
              <p style={{ color: "var(--c-green)", fontSize: "0.9rem", fontWeight: 600 }}>
                ✅ Nutrisi harianmu sudah terpenuhi dengan baik! Berikut pilihan tambahan jika kamu masih lapar.
              </p>
            </div>
          )}
        </div>
      )}

      {/* No data prompt */}
      {!hasData && (
        <div style={{
          textAlign: "center",
          padding: "48px 24px",
          borderRadius: 16,
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          marginBottom: 40,
        }}>
          <p style={{ fontSize: "3rem", marginBottom: 16 }}>🥗</p>
          <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>
            Belum ada data untuk dianalisis
          </p>
          <p style={{ color: "var(--c-muted)", fontSize: "0.875rem", marginBottom: 24 }}>
            Isi BMI Check dan catat makananmu dulu agar rekomendasi lebih akurat
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/bmi"><button className="btn-primary">Isi BMI →</button></Link>
            <Link to="/log"><button className="btn-outline">Catat Makanan</button></Link>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
        <select className="input-field" value={mealFilter} onChange={(e) => setMealFilter(e.target.value)} style={{ width: "auto", minWidth: 150 }}>
          <option value="all">Semua Waktu</option>
          {Object.entries(MEAL_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select className="input-field" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} style={{ width: "auto", minWidth: 150 }}>
          <option value="all">Semua Sumber</option>
          <option value="local">Lokal 🇮🇩</option>
          <option value="international">Internasional 🌍</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--c-muted)" }}>
          <p>Tidak ada rekomendasi untuk filter ini</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filtered.map((food) => (
            <div key={food.id} className="card fade-in" style={{ transition: "transform 0.2s, border-color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "rgba(74,222,128,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--c-border)"; }}
            >
              {/* Top */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 6 }}>{food.name}</h3>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>{food.category === "local" ? "🇮🇩 Lokal" : "🌍 Internasional"}</span>
                    {food.meal_time.slice(0, 2).map((m) => (
                      <span key={m} className="tag" style={{ fontSize: "0.6rem" }}>{MEAL_LABELS[m]}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nutrients */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                {[
                  { label: "Kalori", value: `${food.nutrients.calories} kkal`, color: "#fde047" },
                  { label: "Protein", value: `${food.nutrients.protein}g`, color: "#60a5fa" },
                  { label: "Karbo", value: `${food.nutrients.carbs}g`, color: "#c084fc" },
                  { label: "Lemak", value: `${food.nutrients.fat}g`, color: "#fb923c" },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ padding: "8px 10px", background: "var(--c-bg)", borderRadius: 8 }}>
                    <p style={{ fontSize: "0.65rem", color: "var(--c-muted)", marginBottom: 2 }}>{label}</p>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 600, fontSize: "0.82rem", color }}>{value}</p>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: "0.72rem", color: "var(--c-muted)", marginBottom: 14 }}>
                per {food.serving_size} {food.serving_unit}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                {food.tags.map((t) => (
                  <span key={t} style={{ fontSize: "0.65rem", padding: "2px 8px", borderRadius: 99, background: "rgba(255,255,255,0.05)", color: "var(--c-muted)", border: "1px solid var(--c-border)" }}>
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleQuickAdd(food)}
                style={{
                  width: "100%",
                  background: added[food.id] ? "rgba(74,222,128,0.2)" : "rgba(74,222,128,0.08)",
                  border: "1px solid rgba(74,222,128,0.25)",
                  borderRadius: 8,
                  color: "var(--c-green)",
                  padding: "10px",
                  cursor: "pointer",
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  transition: "all 0.15s",
                }}
              >
                {added[food.id] ? "✓ Ditambahkan ke Log" : "+ Tambah ke Log"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
