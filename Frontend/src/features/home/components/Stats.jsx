import "./styles/stats.scss";

const stats = [
  {
    value: "10,000+",
    label: "Scholarships Listed",
  },
  {
    value: "5,000+",
    label: "Students Helped",
  },
  {
    value: "₹50Cr+",
    label: "Funding Secured",
  },
];

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats__grid">
          {stats.map((item, i) => (
            <div className="stat-card" key={i}>
              <h2 className="stat-value">{item.value}</h2>
              <p className="stat-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}