import { content } from "../content";

export default function About() {
  const a = content.about;
  return (
    <section className="section">
      <div className="section-inner section-split">
        <div>
          <h2 className="section-heading">{a.heading}</h2>
          <p className="section-intro">{a.body}</p>
          <ul className="section-list">
            {a.points.map((p) => (<li key={p}>{p}</li>))}
          </ul>
        </div>
        <div className="section-grid" style={{ marginTop: 0 }}>
          {a.stats.map((s) => (
            <div key={s.label} className="section-card">
              <div className="section-stat-value">{s.value}</div>
              <div className="section-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}