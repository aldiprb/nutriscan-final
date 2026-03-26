import FoodSearch from "../components/foodlog/FoodSearch";
import FoodLogList from "../components/foodlog/FoodLogList";
import NutriSummary from "../components/foodlog/NutriSummary";
import DonutChart from "../components/chart/DonutChart";
import BarChart from "../components/chart/BarChart";
import { useNutri } from "../context/NutriContext";
import { Link } from "react-router-dom";

export default function FoodLog() {
  const { profile, foodLog } = useNutri();

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Food Log</span>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: 8 }}>
              Catat <span style={{ color: "var(--c-green)" }}>Makananmu</span>
            </h1>
            <p style={{ color: "var(--c-muted)", fontSize: "0.95rem" }}>
              {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          {!profile && (
            <div style={{
              padding: "12px 18px",
              borderRadius: 10,
              background: "rgba(253,224,71,0.06)",
              border: "1px solid rgba(253,224,71,0.2)",
              maxWidth: 280,
            }}>
              <p style={{ fontSize: "0.8rem", color: "var(--c-yellow)", lineHeight: 1.6 }}>
                💡 <Link to="/bmi" style={{ color: "var(--c-yellow)", fontWeight: 600 }}>Isi BMI Check</Link> dulu untuk melihat persentase pemenuhan gizi
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ alignItems: "start" }} className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-6">
        {/* Left: Search + Log */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Food Search */}
          <div className="card">
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: 20 }}>
              🔍 Cari & Tambah Makanan
            </h2>
            <FoodSearch />
          </div>

          {/* Log List */}
          <div className="card">
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: 20 }}>
              📋 Log Hari Ini
            </h2>
            <FoodLogList />
          </div>
        </div>

        {/* Right: Summary & Charts */}
        <div className="flex flex-col gap-5 relative md:sticky md:top-20">
          {/* Calorie Donut */}
          <div className="card" style={{ textAlign: "center" }}>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 20, textAlign: "left" }}>
              🔥 Kalori Hari Ini
            </h3>
            <DonutChart />
          </div>

          {/* Macro Bar */}
          <div className="card">
            <BarChart />
          </div>

          {/* Nutrient Progress */}
          <div className="card">
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 20 }}>
              📊 Ringkasan Nutrisi
            </h3>
            <NutriSummary />
          </div>

          {/* Recommendation CTA */}
          {foodLog.length > 0 && (
            <Link to="/rekomendasi">
              <div style={{
                padding: "16px 20px",
                borderRadius: 12,
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.2)",
                cursor: "pointer",
                transition: "background 0.2s",
              }}>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--c-green)", marginBottom: 4 }}>
                  🥗 Lihat Rekomendasi →
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--c-muted)" }}>
                  Dapatkan saran makanan untuk melengkapi nutrisi yang masih kurang
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
