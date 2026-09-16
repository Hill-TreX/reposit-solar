import { content } from "../content";

export default function Services() {
  return (
    <section className="section">
      <div className="section-inner">
        <h2 className="section-heading">{content.services.heading}</h2>
        <p className="section-intro">{content.services.intro}</p>
        <div className="section-grid">
          {content.services.items.map((item) => (
            <div key={item.no} className="section-card">
              <div className="section-no">{item.no}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}