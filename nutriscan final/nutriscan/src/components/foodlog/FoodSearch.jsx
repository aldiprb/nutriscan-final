import { useState, useMemo } from "react";
import foods from "../../data/foods.json";
import { useNutri } from "../../context/NutriContext";

const MEAL_LABELS = {
  breakfast: "Sarapan",
  lunch: "Makan Siang",
  dinner: "Makan Malam",
  snack: "Camilan",
};

export default function FoodSearch() {
  const { addFood } = useNutri();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [quantities, setQuantities] = useState({});
  const [added, setAdded] = useState({});

  const filtered = useMemo(() => {
    return foods.filter((f) => {
      const matchQuery = f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.tags.some((t) => t.includes(query.toLowerCase()));
      const matchFilter = filter === "all" || f.meal_time.includes(filter) || f.category === filter;
      return matchQuery && matchFilter;
    });
  }, [query, filter]);

  function handleAdd(food) {
    const qty = quantities[food.id] || food.serving_size;
    addFood(food, Number(qty));
    setAdded((prev) => ({ ...prev, [food.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [food.id]: false })), 1500);
  }

  return (
    <div>
      {/* Search & Filter */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          className="input-field"
          placeholder="Cari makanan... (e.g. ayam, nasi, protein)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, minWidth: 200 }}
        />
        <select
          className="input-field"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: "auto", minWidth: 150 }}
        >
          <option value="all">Semua</option>
          <option value="breakfast">Sarapan</option>
          <option value="lunch">Makan Siang</option>
          <option value="dinner">Makan Malam</option>
          <option value="snack">Camilan</option>
          <option value="local">Lokal 🇮🇩</option>
          <option value="international">Internasional 🌍</option>
        </select>
      </div>

      {/* Results */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 480, overflowY: "auto", paddingRight: 4 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--c-muted)" }}>
            <p style={{ fontSize: "2rem", marginBottom: 8 }}>🔍</p>
            <p>Makanan tidak ditemukan</p>
          </div>
        ) : (
          filtered.map((food) => (
            <div
              key={food.id}
              className="fade-in"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background: "var(--c-bg)",
                borderRadius: 12,
                border: "1px solid var(--c-border)",
                transition: "border-color 0.15s",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                  <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{food.name}</p>
                  <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>{food.category === "local" ? "🇮🇩" : "🌍"}</span>
                  {food.meal_time.map((m) => (
                    <span key={m} className="tag" style={{ fontSize: "0.6rem" }}>{MEAL_LABELS[m]}</span>
                  ))}
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--c-muted)", fontFamily: "JetBrains Mono, monospace" }}>
                  {food.nutrients.calories} kkal · P {food.nutrients.protein}g · K {food.nutrients.carbs}g · L {food.nutrients.fat}g
                  <span style={{ opacity: 0.6 }}> per {food.serving_size}{food.serving_unit}</span>
                </p>
              </div>

              {/* Quantity Input */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="number"
                  value={quantities[food.id] ?? food.serving_size}
                  onChange={(e) => setQuantities((prev) => ({ ...prev, [food.id]: e.target.value }))}
                  style={{
                    width: 72,
                    background: "var(--c-surface)",
                    border: "1px solid var(--c-border)",
                    borderRadius: 8,
                    color: "var(--c-text)",
                    padding: "6px 10px",
                    fontSize: "0.85rem",
                    outline: "none",
                    fontFamily: "JetBrains Mono, monospace",
                    textAlign: "center",
                  }}
                />
                <span style={{ fontSize: "0.75rem", color: "var(--c-muted)" }}>{food.serving_unit}</span>

                <button
                  onClick={() => handleAdd(food)}
                  style={{
                    background: added[food.id] ? "rgba(74,222,128,0.2)" : "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.3)",
                    borderRadius: 8,
                    color: "var(--c-green)",
                    padding: "7px 12px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 600,
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {added[food.id] ? "✓ Ditambah" : "+ Tambah"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <p style={{ marginTop: 12, color: "var(--c-muted)", fontSize: "0.78rem" }}>
        {filtered.length} makanan ditemukan
      </p>
    </div>
  );
}
