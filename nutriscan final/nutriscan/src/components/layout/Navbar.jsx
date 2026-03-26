import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/bmi", label: "BMI Check" },
  { to: "/log", label: "Food Log" },
  { to: "/rekomendasi", label: "Rekomendasi" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Kontak" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(15, 14, 13, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--c-border)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "var(--c-green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            🥗
          </div>
          <span
            style={{
              /* Use 'Plus Jakarta Sans' if you've imported it, 
                 otherwise 'Inter' or 'system-ui' are great fallbacks */
              fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1rem", // Slightly larger for better presence
              // letterSpacing: "-0.04em", // Tighter spacing makes it look like a custom logo
              color: "var(--c-text)",
              textTransform: "tight",
            }}
          >
            Nutri<span style={{ color: "var(--c-green)" }}>Scan</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{gap: 4 }} className="hidden md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 8,
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.875rem",
                fontWeight: pathname === l.to ? 600 : 400,
                color: pathname === l.to ? "var(--c-green)" : "var(--c-muted)",
                background: pathname === l.to ? "rgba(74,222,128,0.08)" : "transparent",
                transition: "all 0.15s",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            color: "var(--c-text)",
            cursor: "pointer",
            padding: 4,
          }}
          className="flex md:hidden"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <>
                <line x1="3" y1="3" x2="19" y2="19" />
                <line x1="19" y1="3" x2="3" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" />
                <line x1="3" y1="12" x2="19" y2="12" />
                <line x1="3" y1="18" x2="19" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          style={{
            borderTop: "1px solid var(--c-border)",
            padding: "12px 24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
          className="md:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                textDecoration: "none",
                padding: "10px 14px",
                borderRadius: 8,
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.95rem",
                fontWeight: pathname === l.to ? 600 : 400,
                color: pathname === l.to ? "var(--c-green)" : "var(--c-text)",
                background: pathname === l.to ? "rgba(74,222,128,0.08)" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
