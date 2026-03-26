import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--c-border)",
        padding: "40px 24px",
        marginTop: 80,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--c-green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🥗</div>
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1rem" }}>
              Nutri<span style={{ color: "var(--c-green)" }}>Scan</span>
            </span>
          </div>
          <p style={{ color: "var(--c-muted)", fontSize: "0.85rem", maxWidth: 240, lineHeight: 1.6 }}>
            Kenali tubuhmu, pilih makananmu. Platform gizi interaktif untuk pelajar Indonesia.
          </p>
        </div>

        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.8rem", marginBottom: 12, color: "var(--c-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Fitur</p>
            {[["BMI Check", "/bmi"], ["Food Log", "/log"], ["Rekomendasi", "/rekomendasi"]].map(([label, to]) => (
              <Link key={to} to={to} style={{ display: "block", color: "var(--c-text)", textDecoration: "none", fontSize: "0.875rem", marginBottom: 8, opacity: 0.7 }}>{label}</Link>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.8rem", marginBottom: 12, color: "var(--c-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Info</p>
            {[["About", "/about"], ["Kontak", "/contact"]].map(([label, to]) => (
              <Link key={to} to={to} style={{ display: "block", color: "var(--c-text)", textDecoration: "none", fontSize: "0.875rem", marginBottom: 8, opacity: 0.7 }}>{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "32px auto 0",
          paddingTop: 24,
          borderTop: "1px solid var(--c-border)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <p style={{ color: "var(--c-muted)", fontSize: "0.8rem" }}>
          © 2026 NutriScan · TECHSOFT 2026 — Web Design Competition
        </p>
        <p style={{ color: "var(--c-muted)", fontSize: "0.8rem" }}>
          Data gizi berdasarkan PERMENKES RI 2019
        </p>
      </div>
    </footer>
  );
}
