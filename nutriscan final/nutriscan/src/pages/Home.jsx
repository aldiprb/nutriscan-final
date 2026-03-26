import { Link } from "react-router-dom";
import { useNutri } from "../context/NutriContext";

const stats = [
  { value: "30+", label: "Database Makanan" },
  { value: "5", label: "Nutrisi Terlacak" },
  { value: "100%", label: "Client-Side" },
];

const features = [
  {
    icon: "⚖️",
    title: "BMI & Kalori Check",
    desc: "Hitung BMI-mu dan dapatkan target kalori harian yang dipersonalisasi berdasarkan usia, gender, tinggi, dan beratmu.",
    to: "/bmi",
    color: "#fde047",
  },
  {
    icon: "📋",
    title: "Food Log Harian",
    desc: "Catat semua makanan yang kamu konsumsi hari ini dan lihat visualisasi nutrisi secara real-time.",
    to: "/log",
    color: "#60a5fa",
  },
  {
    icon: "🥗",
    title: "Rekomendasi Makanan",
    desc: "Dapatkan rekomendasi makanan berdasarkan kekurangan nutrisimu hari ini. Lokal & internasional.",
    to: "/rekomendasi",
    color: "#4ade80",
  },
];

export default function Home() {
  const { profile } = useNutri();

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
      {/* Hero */}
      <section style={{ paddingTop: 80, paddingBottom: 80, textAlign: "center" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 99, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--c-green)", display: "inline-block" }} />
          <span className="tag" style={{ background: "none", border: "none", padding: 0 }}>Kesehatan · Pendidikan · TECHSOFT 2026</span>
        </div>

        <h1
          className="fade-up"
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            lineHeight: 1.05,
            // letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          Kenali Tubuhmu,<br />
          <span style={{
            background: "linear-gradient(135deg, #4ade80 0%, #fde047 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Pilih Makananmu.
          </span>
        </h1>

        <p
          className="fade-up"
          style={{
            fontSize: "1.15rem",
            color: "var(--c-muted)",
            maxWidth: 520,
            margin: "0 auto 40px",
            lineHeight: 1.7,
            animationDelay: "0.1s",
          }}
        >
          Platform gizi interaktif untuk pelajar Indonesia. Pantau asupan nutrisimu, hitung BMI, dan dapatkan rekomendasi makanan yang tepat.
        </p>

        <div className="fade-up" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animationDelay: "0.2s" }}>
          <Link to="/bmi">
            <button className="btn-primary" style={{ fontSize: "1rem", padding: "14px 32px" }}>
              Mulai Sekarang →
            </button>
          </Link>
          <Link to="/log">
            <button className="btn-outline" style={{ fontSize: "1rem", padding: "14px 32px" }}>
              Lihat Food Log
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 64, flexWrap: "wrap" }}>
          {stats.map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--c-green)" }}>{value}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--c-muted)" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Profile Banner (if exists) */}
      {profile && (
        <section style={{ marginBottom: 64 }}>
          <div style={{
            padding: "24px 32px",
            borderRadius: 16,
            background: "linear-gradient(135deg, rgba(74,222,128,0.08) 0%, rgba(253,224,71,0.06) 100%)",
            border: "1px solid rgba(74,222,128,0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}>
            <div>
              <p style={{ fontSize: "0.8rem", color: "var(--c-muted)", marginBottom: 4 }}>Selamat datang kembali 👋</p>
              <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.3rem" }}>{profile.name}</p>
              <p style={{ fontSize: "0.875rem", color: "var(--c-muted)", marginTop: 4 }}>
                BMI: <span style={{ color: profile.category.color, fontWeight: 600 }}>{profile.bmi} ({profile.category.label})</span>
                &nbsp;·&nbsp; Target: <span style={{ color: "var(--c-yellow)", fontWeight: 600 }}>{profile.dailyCalories.toLocaleString()} kkal/hari</span>
              </p>
            </div>
            <Link to="/log">
              <button className="btn-primary">Catat Makanan →</button>
            </Link>
          </div>
        </section>
      )}

      {/* Features */}
      <section style={{ marginBottom: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Fitur Utama</span>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
            Semua yang kamu butuhkan
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {features.map(({ icon, title, desc, to, color }) => (
            <Link key={to} to={to} style={{ textDecoration: "none" }}>
              <div
                className="card"
                style={{
                  transition: "transform 0.2s, border-color 0.2s",
                  cursor: "pointer",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = `${color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--c-border)";
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: 10, color }}>
                  {title}
                </h3>
                <p style={{ color: "var(--c-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>{desc}</p>
                <p style={{ marginTop: 20, fontSize: "0.85rem", color, fontWeight: 600 }}>Buka →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ marginBottom: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Cara Kerja</span>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
            3 langkah mudah
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {[
            { step: "01", title: "Isi Data Diri", desc: "Masukkan tinggi, berat, usia, dan gender untuk mendapatkan profil gizi yang dipersonalisasi.", color: "#fde047" },
            { step: "02", title: "Catat Makanan", desc: "Log semua makanan yang kamu makan hari ini dari database 30+ makanan lokal & internasional.", color: "#60a5fa" },
            { step: "03", title: "Pantau & Perbaiki", desc: "Lihat visualisasi nutrisimu dan dapatkan rekomendasi makanan untuk melengkapi kekurangan gizi.", color: "#4ade80" },
          ].map(({ step, title, desc, color }) => (
            <div key={step} style={{ position: "relative" }}>
              <div style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: "3.5rem",
                color,
                opacity: 0.15,
                lineHeight: 1,
                marginBottom: -8,
              }}>
                {step}
              </div>
              <div className="card">
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, marginBottom: 8, color }}>{title}</h3>
                <p style={{ color: "var(--c-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ marginBottom: 80, textAlign: "center" }}>
        <div style={{
          padding: "64px 32px",
          borderRadius: 24,
          background: "radial-gradient(ellipse at center, rgba(74,222,128,0.08) 0%, transparent 70%)",
          border: "1px solid rgba(74,222,128,0.15)",
        }}>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: 16 }}>
            Mulai pantau gizimu hari ini
          </h2>
          <p style={{ color: "var(--c-muted)", marginBottom: 32, fontSize: "1rem" }}>
            Gratis, tanpa akun, langsung bisa dipakai. Data tersimpan di browser kamu.
          </p>
          <Link to="/bmi">
            <button className="btn-primary" style={{ fontSize: "1rem", padding: "14px 36px" }}>
              Cek BMI Sekarang →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
