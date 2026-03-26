const team = [
  { name: "Sarah Aulia Rahmah", role: "Ketua Tim", emoji: "👩‍💻" },
  { name: "Aldi Beneditc Purba", role: "Anggota", emoji: "👨‍💻" },
  { name: "Luthfi Budi Amin", role: "Anggota", emoji: "🧑‍🔬" },
];

const sources = [
  { title: "PERMENKES RI No. 28 Tahun 2019", desc: "Angka Kecukupan Gizi yang Dianjurkan untuk Masyarakat Indonesia" },
  { title: "Mifflin-St Jeor Equation (1990)", desc: "Rumus perhitungan Basal Metabolic Rate yang paling akurat untuk kalkulasi kalori harian" },
  { title: "WHO BMI Classification", desc: "Standar internasional klasifikasi Indeks Massa Tubuh oleh World Health Organization" },
  { title: "USDA FoodData Central", desc: "Referensi nilai gizi makanan internasional dari United States Department of Agriculture" },
];

export default function About() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      {/* Header */}
      <div style={{ maxWidth: 600, marginBottom: 64 }}>
        <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Tentang Kami</span>
        <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: 20 }}>
          Tentang <span style={{ color: "var(--c-green)" }}>NutriScan</span>
        </h1>
        <p style={{ color: "var(--c-muted)", fontSize: "1rem", lineHeight: 1.8 }}>
          NutriScan adalah platform gizi interaktif yang dirancang khusus untuk pelajar Indonesia — dari SMP hingga mahasiswa — untuk membantu mereka memahami kebutuhan gizi harian mereka secara mudah dan menyenangkan.
        </p>
      </div>

      {/* Mission */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 64 }}>
        {[
          { icon: "🎯", title: "Misi Kami", desc: "Meningkatkan kesadaran gizi di kalangan pelajar Indonesia melalui teknologi yang mudah diakses dan dipahami.", color: "#4ade80" },
          { icon: "💡", title: "Pendekatan", desc: "Data-driven dan personal. Setiap rekomendasi disesuaikan dengan kondisi tubuh dan kebiasaan makan pengguna.", color: "#60a5fa" },
          { icon: "🌱", title: "Dampak", desc: "Membantu pelajar membangun kebiasaan makan sehat sejak dini untuk mendukung tumbuh kembang optimal.", color: "#fde047" },
        ].map(({ icon, title, desc, color }) => (
          <div key={title} className="card">
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>{icon}</div>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color, marginBottom: 10 }}>{title}</h3>
            <p style={{ color: "var(--c-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* Theme Alignment */}
      <div style={{ marginBottom: 64 }}>
        <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Kesesuaian Tema</span>
        <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.02em", marginBottom: 24 }}>
          INNOVATE × NutriScan
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { letter: "I", word: "Impel Novelty", desc: "Pendekatan baru dalam edukasi gizi yang personal dan interaktif" },
            { letter: "N", word: "Navigate", desc: "Memandu pelajar memahami kebutuhan nutrisi mereka" },
            { letter: "N", word: "Nourish", desc: "Memberikan asupan informasi gizi yang akurat untuk mendukung pertumbuhan fisik dan kognitif pelajar" }, 
            { letter: "O", word: "Optimize", desc: "Optimasi pola makan berdasarkan data BMI yang akurat" },
            { letter: "V", word: "Validate", desc: "Validasi data gizi berdasarkan standar PERMENKES & WHO" },
            { letter: "A", word: "Advance Tech", desc: "Memanfaatkan teknologi web modern untuk solusi kesehatan" },
            { letter: "T", word: "Traceable", desc: "Pantau perkembangan gizi harianmu dengan sistem pencatatan log makanan yang mudah dan terstruktur"},
            { letter: "E", word: "Empower", desc: "Meningkatkan kemandirian pelajar dalam mengelola gaya hidup sehat melalui literasi gizi digital"},
          ].map(({ letter, word, desc }) => (
            <div key={letter} style={{
              padding: "20px",
              background: "var(--c-surface)",
              borderRadius: 12,
              border: "1px solid var(--c-border)",
            }}>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--c-green)", lineHeight: 1, marginBottom: 8 }}>{letter}</div>
              <p style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: 6 }}>{word}</p>
              <p style={{ color: "var(--c-muted)", fontSize: "0.78rem", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={{ marginBottom: 64 }}>
        <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Tim</span>
        <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.02em", marginBottom: 24 }}>
          Tim Pengembang
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {team.map(({ name, role, emoji }) => (
            <div key={name} className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{emoji}</div>
              <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, marginBottom: 6 }}>{name}</p>
              <p style={{ color: "var(--c-muted)", fontSize: "0.8rem" }}>{role}</p>
            </div>
          ))}
        </div>
        {/* <p style={{ color: "var(--c-muted)", fontSize: "0.8rem", marginTop: 16, textAlign: "center" }}>
          * Ganti nama di atas sesuai anggota tim kamu
        </p> */}
      </div>

      {/* Data Sources */}
      <div style={{ marginBottom: 40 }}>
        <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Referensi</span>
        <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.02em", marginBottom: 24 }}>
          Sumber Data
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sources.map(({ title, desc }) => (
            <div key={title} style={{
              padding: "16px 20px",
              background: "var(--c-surface)",
              borderRadius: 10,
              border: "1px solid var(--c-border)",
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--c-green)", marginTop: 6, flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 4 }}>{title}</p>
                <p style={{ color: "var(--c-muted)", fontSize: "0.8rem" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
