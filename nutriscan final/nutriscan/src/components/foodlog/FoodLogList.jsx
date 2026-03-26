import { useNutri } from "../../context/NutriContext";

export default function FoodLogList() {
  const { foodLog, removeFood, clearLog } = useNutri();

  if (foodLog.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "32px 0", color: "var(--c-muted)" }}>
        <p style={{ fontSize: "2.5rem", marginBottom: 8 }}>🍽️</p>
        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, marginBottom: 4 }}>Log masih kosong</p>
        <p style={{ fontSize: "0.875rem" }}>Tambah makanan dari panel kiri</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem" }}>
          {foodLog.length} item hari ini
        </p>
        <button
          onClick={clearLog}
          style={{
            background: "rgba(248,113,113,0.1)",
            border: "1px solid rgba(248,113,113,0.2)",
            borderRadius: 8,
            color: "#f87171",
            padding: "6px 14px",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          Hapus Semua
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {foodLog.map((entry) => {
          const ratio = entry.quantity / entry.food.serving_size;
          const cal = Math.round(entry.food.nutrients.calories * ratio);
          return (
            <div
              key={entry.id}
              className="fade-in"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                background: "var(--c-bg)",
                borderRadius: 10,
                border: "1px solid var(--c-border)",
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500, fontSize: "0.875rem", marginBottom: 2 }}>{entry.food.name}</p>
                <p style={{ color: "var(--c-muted)", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace" }}>
                  {entry.quantity}{entry.food.serving_unit} · {cal} kkal
                </p>
              </div>
              <div style={{ textAlign: "right", marginRight: 8 }}>
                <p style={{ fontSize: "0.75rem", color: "var(--c-muted)", fontFamily: "JetBrains Mono, monospace" }}>
                  P {Math.round(entry.food.nutrients.protein * ratio * 10) / 10}g
                </p>
              </div>
              <button
                onClick={() => removeFood(entry.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--c-muted)",
                  cursor: "pointer",
                  fontSize: "1rem",
                  padding: 4,
                  lineHeight: 1,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => e.target.style.color = "#f87171"}
                onMouseLeave={(e) => e.target.style.color = "var(--c-muted)"}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
