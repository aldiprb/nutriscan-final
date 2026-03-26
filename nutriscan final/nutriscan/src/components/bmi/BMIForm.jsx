import { useState } from "react";
import { calculateBMI, calculateDailyCalories, getBMICategory, getBMIAdvice } from "../../utils/bmiCalculator";
import { useNutri } from "../../context/NutriContext";

export default function BMIForm() {
  const { setProfile } = useNutri();
  const [form, setForm] = useState({
    name: "", age: "", gender: "male", height: "", weight: "",
  });
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.age || form.age < 10 || form.age > 30) e.age = "Usia 10–30 tahun";
    if (!form.height || form.height < 100 || form.height > 220) e.height = "Tinggi 100–220 cm";
    if (!form.weight || form.weight < 25 || form.weight > 200) e.weight = "Berat 25–200 kg";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const bmi = calculateBMI(Number(form.weight), Number(form.height));
    const category = getBMICategory(bmi);
    const dailyCalories = calculateDailyCalories(
      Number(form.weight), Number(form.height), Number(form.age), form.gender
    );
    const advice = getBMIAdvice(category.label);

    const profileData = {
      ...form,
      age: Number(form.age),
      height: Number(form.height),
      weight: Number(form.weight),
      bmi: Math.round(bmi * 10) / 10,
      category,
      dailyCalories,
      advice,
    };

    setResult(profileData);
    setProfile(profileData);
  }

  const inputStyle = (field) => ({
    background: "var(--c-bg)",
    border: `1.5px solid ${errors[field] ? "#f87171" : "var(--c-border)"}`,
    borderRadius: 10,
    color: "var(--c-text)",
    fontFamily: "DM Sans, sans-serif",
    padding: "12px 16px",
    fontSize: "0.95rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  });

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Name */}
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--c-muted)", marginBottom: 8, fontWeight: 500 }}>Nama</label>
          <input
            style={inputStyle("name")}
            placeholder="Nama kamu"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p style={{ color: "#f87171", fontSize: "0.78rem", marginTop: 4 }}>{errors.name}</p>}
        </div>

        {/* Age & Gender */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--c-muted)", marginBottom: 8, fontWeight: 500 }}>Usia (tahun)</label>
            <input
              type="number"
              style={inputStyle("age")}
              placeholder="e.g. 17"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
            {errors.age && <p style={{ color: "#f87171", fontSize: "0.78rem", marginTop: 4 }}>{errors.age}</p>}
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--c-muted)", marginBottom: 8, fontWeight: 500 }}>Jenis Kelamin</label>
            <select
              style={inputStyle("gender")}
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>
        </div>

        {/* Height & Weight */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--c-muted)", marginBottom: 8, fontWeight: 500 }}>Tinggi Badan (cm)</label>
            <input
              type="number"
              style={inputStyle("height")}
              placeholder="e.g. 165"
              value={form.height}
              onChange={(e) => setForm({ ...form, height: e.target.value })}
            />
            {errors.height && <p style={{ color: "#f87171", fontSize: "0.78rem", marginTop: 4 }}>{errors.height}</p>}
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--c-muted)", marginBottom: 8, fontWeight: 500 }}>Berat Badan (kg)</label>
            <input
              type="number"
              style={inputStyle("weight")}
              placeholder="e.g. 60"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />
            {errors.weight && <p style={{ color: "#f87171", fontSize: "0.78rem", marginTop: 4 }}>{errors.weight}</p>}
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
          Hitung BMI →
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="fade-up" style={{ marginTop: 32, padding: 24, background: "var(--c-bg)", borderRadius: 16, border: `1.5px solid ${result.category.color}30` }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
            <div>
              <p style={{ color: "var(--c-muted)", fontSize: "0.8rem", marginBottom: 4 }}>Halo, {result.name}!</p>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2.5rem", lineHeight: 1, color: result.category.color }}>
                {result.bmi}
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--c-muted)", marginTop: 4 }}>Indeks Massa Tubuh</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{
                padding: "6px 16px",
                borderRadius: 99,
                background: `${result.category.color}20`,
                color: result.category.color,
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}>
                {result.category.label}
              </span>
              <p style={{ marginTop: 12, color: "var(--c-muted)", fontSize: "0.85rem" }}>
                Kebutuhan kalori harian
              </p>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "var(--c-yellow)" }}>
                {result.dailyCalories.toLocaleString()} kkal
              </p>
            </div>
          </div>

          {/* BMI Scale */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--c-muted)", marginBottom: 6, fontFamily: "JetBrains Mono, monospace" }}>
              <span>Sangat Kurus</span><span>Normal</span><span>Obesitas</span>
            </div>
            <div style={{ height: 8, background: "linear-gradient(to right, #60a5fa, #4ade80, #fde047, #f87171)", borderRadius: 99, position: "relative" }}>
              <div style={{
                position: "absolute",
                top: "50%",
                left: `${Math.min(95, Math.max(5, ((result.bmi - 14) / (35 - 14)) * 100))}%`,
                transform: "translate(-50%, -50%)",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "white",
                border: `3px solid ${result.category.color}`,
                boxShadow: `0 0 8px ${result.category.color}`,
              }} />
            </div>
          </div>

          <p style={{ fontSize: "0.875rem", color: "var(--c-text)", opacity: 0.8, lineHeight: 1.6 }}>
            💡 {result.advice}
          </p>
        </div>
      )}
    </div>
  );
}
