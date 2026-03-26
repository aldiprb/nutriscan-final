import BMIForm from "../components/bmi/BMIForm";
import { useNutri } from "../context/NutriContext";
import { Link } from "react-router-dom";

const BMI_RANGES = [
  { range: "< 17.0", label: "Sangat Kurus", color: "#60a5fa" },
  { range: "17.0 – 18.4", label: "Kurus", color: "#93c5fd" },
  { range: "18.5 – 24.9", label: "Normal ✓", color: "#4ade80" },
  { range: "25.0 – 26.9", label: "Gemuk", color: "#fde047" },
  { range: "≥ 27.0", label: "Obesitas", color: "#f87171" },
];

export default function BMICheck() {
  const { profile } = useNutri();

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>BMI & Kalori</span>
        <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.02em", marginBottom: 12 }}>
          Cek BMI & Kebutuhan<br />
          <span style={{ color: "var(--c-green)" }}>Kalori Harianmu</span>
        </h1>
        <p style={{ color: "var(--c-muted)", fontSize: "1rem", maxWidth: 500, lineHeight: 1.7 }}>
          Masukkan data tubuhmu untuk mendapatkan BMI, kategori berat badan, dan estimasi kebutuhan kalori harian yang dipersonalisasi.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr minmax(260px, 340px)", gap: 32, alignItems: "start" }}>
        {/* Form */}
        <div className="card">
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: 24 }}>
            Data Tubuh
          </h2>
          <BMIForm />

          {profile && (
            <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid var(--c-border)" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--c-muted)", marginBottom: 12 }}>Langkah selanjutnya:</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link to="/log">
                  <button className="btn-primary" style={{ fontSize: "0.85rem", padding: "10px 20px" }}>
                    Catat Makanan →
                  </button>
                </Link>
                <Link to="/rekomendasi">
                  <button className="btn-outline" style={{ fontSize: "0.85rem", padding: "10px 20px" }}>
                    Lihat Rekomendasi
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* BMI Table */}
          <div className="card">
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 16 }}>
              Tabel Kategori BMI
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {BMI_RANGES.map(({ range, label, color }) => (
                <div
                  key={range}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: profile?.category.label === label.replace(" ✓", "") ? `${color}15` : "transparent",
                    border: profile?.category.label === label.replace(" ✓", "") ? `1px solid ${color}30` : "1px solid transparent",
                  }}
                >
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.78rem", color: "var(--c-muted)" }}>{range}</span>
                  <span style={{ fontSize: "0.82rem", color, fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="card">
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 12 }}>
              ℹ️ Metode Kalkulasi
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--c-muted)", lineHeight: 1.7 }}>
              Kalori harian dihitung menggunakan rumus <strong style={{ color: "var(--c-text)" }}>Mifflin-St Jeor</strong> dengan faktor aktivitas sedang (1.55), sesuai pelajar aktif.
            </p>
            <p style={{ fontSize: "0.82rem", color: "var(--c-muted)", lineHeight: 1.7, marginTop: 8 }}>
              Referensi: <strong style={{ color: "var(--c-text)" }}>PERMENKES RI No. 28 Tahun 2019</strong> tentang Angka Kecukupan Gizi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
