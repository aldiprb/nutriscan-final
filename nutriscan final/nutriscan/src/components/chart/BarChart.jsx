import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";
import { useNutri } from "../../context/NutriContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function BarChart() {
  const { totalNutrients, nutrientTargets } = useNutri();

  const nutrients = [
    { label: "Protein", consumed: totalNutrients.protein, target: nutrientTargets?.protein, color: "#60a5fa" },
    { label: "Karbo", consumed: totalNutrients.carbs, target: nutrientTargets?.carbs, color: "#c084fc" },
    { label: "Lemak", consumed: totalNutrients.fat, target: nutrientTargets?.fat, color: "#fb923c" },
    { label: "Serat", consumed: totalNutrients.fiber, target: nutrientTargets?.fiber, color: "#4ade80" },
  ];

  const data = {
    labels: nutrients.map((n) => n.label),
    datasets: [
      {
        label: "Dikonsumsi",
        data: nutrients.map((n) => Math.round(n.consumed * 10) / 10),
        backgroundColor: nutrients.map((n) => n.color + "cc"),
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Target",
        data: nutrients.map((n) => n.target || 0),
        backgroundColor: "rgba(255,255,255,0.05)",
        borderColor: "rgba(255,255,255,0.12)",
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1a1917",
        borderColor: "#2a2826",
        borderWidth: 1,
        titleColor: "#f5f0eb",
        bodyColor: "#8a8480",
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}g`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#8a8480", font: { family: "DM Sans", size: 12 } },
        border: { display: false },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: { color: "#8a8480", font: { family: "JetBrains Mono", size: 10 } },
        border: { display: false },
      },
    },
  };

  return (
    <div>
      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.875rem", marginBottom: 12, color: "var(--c-muted)" }}>
        Makronutrien (g)
      </p>
      <Bar data={data} options={options} />
      <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
        {[{ label: "Dikonsumsi", color: "#4ade80" }, { label: "Target", color: "rgba(255,255,255,0.15)" }].map(({ label, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
            <span style={{ fontSize: "0.75rem", color: "var(--c-muted)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
