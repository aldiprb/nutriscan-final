import { useNutri } from "../../context/NutriContext";
import { getPercentage, getNutrientStatus, formatNutrient } from "../../utils/nutritionHelper";

const NUTRIENTS = [
  { key: "calories", label: "Kalori", unit: "kkal", color: "#fde047", icon: "🔥" },
  { key: "protein", label: "Protein", unit: "g", color: "#60a5fa", icon: "💪" },
  { key: "carbs", label: "Karbohidrat", unit: "g", color: "#c084fc", icon: "🌾" },
  { key: "fat", label: "Lemak", unit: "g", color: "#fb923c", icon: "🥑" },
  { key: "fiber", label: "Serat", unit: "g", color: "#4ade80", icon: "🥦" },
];

export default function NutriSummary() {
  const { totalNutrients, nutrientTargets } = useNutri();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {NUTRIENTS.map(({ key, label, unit, color, icon }) => {
        const value = totalNutrients[key] || 0;
        const target = nutrientTargets?.[key];
        const pct = target ? getPercentage(value, target) : null;
        const status = pct !== null ? getNutrientStatus(pct) : null;

        return (
          <div key={key}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "1rem" }}>{icon}</span>
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{label}</span>
                {status && (
                  <span style={{
                    fontSize: "0.65rem",
                    padding: "2px 6px",
                    borderRadius: 4,
                    background: `${status.color}20`,
                    color: status.color,
                    fontFamily: "JetBrains Mono, monospace",
                  }}>
                    {status.label}
                  </span>
                )}
              </div>
              <span style={{ fontSize: "0.8rem", fontFamily: "JetBrains Mono, monospace", color: "var(--c-muted)" }}>
                <span style={{ color: color, fontWeight: 600 }}>{formatNutrient(value, "")}</span>
                {target ? ` / ${target}` : ""} {unit}
              </span>
            </div>

            <div style={{ height: 6, background: "var(--c-border)", borderRadius: 99, overflow: "hidden" }}>
              {pct !== null ? (
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(100, pct)}%`,
                    background: pct > 110 ? "#f87171" : color,
                    borderRadius: 99,
                    transition: "width 0.6s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                />
              ) : (
                <div style={{ height: "100%", width: "30%", background: color, opacity: 0.3, borderRadius: 99 }} />
              )}
            </div>

            {pct !== null && (
              <p style={{ textAlign: "right", fontSize: "0.7rem", color: "var(--c-muted)", marginTop: 3, fontFamily: "JetBrains Mono, monospace" }}>
                {pct}%
              </p>
            )}
          </div>
        );
      })}

      {!nutrientTargets && (
        <div style={{
          marginTop: 8,
          padding: "12px 16px",
          background: "rgba(253,224,71,0.06)",
          borderRadius: 10,
          border: "1px solid rgba(253,224,71,0.15)",
        }}>
          <p style={{ fontSize: "0.8rem", color: "var(--c-yellow)", opacity: 0.9 }}>
            💡 Isi BMI Check dulu untuk melihat persentase pemenuhan gizi harian kamu
          </p>
        </div>
      )}
    </div>
  );
}
