import { useState } from "react";
import { Link } from "react-router-dom";
import { content } from "../content";

const ROUTES: Record<string, string> = {
  "How It Works": "/services",
  "Our Cases": "/services",
  "About Us": "/about",
  Careers: "/about",
  Resources: "/blog",
  Customers: "/contact",
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <img src="/logo.svg" alt={content.brandName} className="logo" />
        <span className="brand-name">{content.brandName}</span>
      </Link>
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        {content.navLinks.map((l) => (
          <Link key={l} to={ROUTES[l] ?? "/services"}>{l}</Link>
        ))}
        <Link to="/contact" className="cta-button drawer-cta">{content.ctaLabel}</Link>
      </div>
      <Link to="/contact" className="cta-button nav-cta">{content.ctaLabel}</Link>
      <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen((o) => !o)}>
        <span />
        <span />
        <span />
      </div>
    </nav>
  );
}