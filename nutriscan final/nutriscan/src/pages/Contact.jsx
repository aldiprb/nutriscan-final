import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Static form — simulate submit
    setSent(true);
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ marginBottom: 48 }}>
        <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Kontak</span>
        <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: 12 }}>
          Hubungi <span style={{ color: "var(--c-green)" }}>Kami</span>
        </h1>
        <p style={{ color: "var(--c-muted)", fontSize: "0.95rem", maxWidth: 440 }}>
          Ada pertanyaan, saran, atau laporan bug? Kami senang mendengar dari kamu.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
        {/* Form */}
        <div className="card">
          {sent ? (
            <div style={{ textAlign: "center", padding: "48px 24px" }} className="fade-up">
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: 12, color: "var(--c-green)" }}>
                Pesan Terkirim!
              </h2>
              <p style={{ color: "var(--c-muted)", marginBottom: 24 }}>
                Terima kasih sudah menghubungi kami. Kami akan merespons secepatnya.
              </p>
              <button className="btn-outline" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                Kirim Pesan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: 4 }}>
                Kirim Pesan
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "var(--c-muted)", marginBottom: 8, fontWeight: 500 }}>Nama</label>
                  <input className="input-field" placeholder="Nama kamu" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "var(--c-muted)", marginBottom: 8, fontWeight: 500 }}>Email</label>
                  <input type="email" className="input-field" placeholder="email@contoh.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "var(--c-muted)", marginBottom: 8, fontWeight: 500 }}>Subjek</label>
                <select className="input-field" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required>
                  <option value="">Pilih subjek...</option>
                  <option value="bug">Laporan Bug</option>
                  <option value="saran">Saran & Masukan</option>
                  <option value="data">Permintaan Data Makanan</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "var(--c-muted)", marginBottom: 8, fontWeight: 500 }}>Pesan</label>
                <textarea
                  className="input-field"
                  placeholder="Tulis pesanmu di sini..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  style={{ resize: "vertical" }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                Kirim Pesan →
              </button>
            </form>
          )}
        </div>

        {/* Info Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 16 }}>
              Info Kontak
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "📧", label: "Email", value: "nutriscan@email.com" },
                { icon: "📍", label: "Institusi", value: "Nama Institusimu" },
                { icon: "🏆", label: "Kompetisi", value: "TECHSOFT 2026 — Web Design" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "var(--c-muted)", marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500 }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: "rgba(74,222,128,0.04)", borderColor: "rgba(74,222,128,0.15)" }}>
            <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "var(--c-green)", marginBottom: 8, fontSize: "0.95rem" }}>
              💡 FAQ
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { q: "Apakah data saya tersimpan?", a: "Ya, data tersimpan di browser kamu via localStorage. Tidak ada server." },
                { q: "Apakah gratis?", a: "100% gratis dan tidak perlu akun." },
                { q: "Seberapa akurat kalkulasinya?", a: "Berdasarkan PERMENKES 2019 & formula Mifflin-St Jeor yang tervalidasi." },
              ].map(({ q, a }) => (
                <div key={q}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: 3 }}>{q}</p>
                  <p style={{ fontSize: "0.77rem", color: "var(--c-muted)", lineHeight: 1.6 }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
