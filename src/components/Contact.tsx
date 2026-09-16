import { Link } from "react-router-dom";
import { content } from "../content";

export default function Contact() {
  const c = content.contact;
  const rows = [
    ["Email", c.email],
    ["Phone", c.phone],
    ["Office", c.address],
    ["Hours", c.hours],
  ] as const;
  return (
    <section className="section">
      <div className="section-inner section-split">
        <div>
          <h2 className="section-heading">{c.heading}</h2>
          <p className="section-intro">{c.body}</p>
          <Link to="/contact" className="cta-button" style={{ display: "inline-block", marginTop: 28 }}>{c.ctaLabel}</Link>
        </div>
        <div className="section-list" style={{ marginTop: 0 }}>
          {rows.map(([label, value]) => (
            <div key={label} className="section-row">
              <span>{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}