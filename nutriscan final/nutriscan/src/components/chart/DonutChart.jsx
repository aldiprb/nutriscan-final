import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNutri } from "../../context/NutriContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart() {
  const { totalNutrients, nutrientTargets } = useNutri();

  const consumed = Math.round(totalNutrients.calories);
  const target = nutrientTargets?.calories || 2000;
  const remaining = Math.max(0, target - consumed);
  const over = Math.max(0, consumed - target);
  const pct = Math.min(150, Math.round((consumed / target) * 100));

  const data = {
    datasets: [{
      data: over > 0 ? [target, over] : [consumed, remaining],
      backgroundColor: over > 0
        ? ["#fde047", "#f87171"]
        : ["#4ade80", "rgba(42,40,38,0.8)"],
      borderWidth: 0,
      hoverOffset: 4,
    }],
  };

  const options = {
    cutout: "72%",
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    animation: { animateRotate: true, duration: 800 },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ position: "relative", width: 180, height: 180 }}>
        <Doughnut data={data} options={options} />
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <p style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "1.8rem",
            lineHeight: 1,
            color: over > 0 ? "#f87171" : "#4ade80",
          }}>
            {pct}%
          </p>
          <p style={{ fontSize: "0.7rem", color: "var(--c-muted)", marginTop: 2 }}>terpenuhi</p>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", color: "var(--c-text)", fontWeight: 600 }}>
          {consumed.toLocaleString()} <span style={{ color: "var(--c-muted)", fontWeight: 400 }}>/ {target.toLocaleString()} kkal</span>
        </p>
        {over > 0 ? (
          <p style={{ fontSize: "0.75rem", color: "#f87171", marginTop: 4 }}>+{over} kkal melebihi target</p>
        ) : (
          <p style={{ fontSize: "0.75rem", color: "var(--c-muted)", marginTop: 4 }}>{remaining.toLocaleString()} kkal tersisa</p>
        )}
      </div>
    </div>
  );
}
