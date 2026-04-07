import "./styles/categories.scss";
import { Cpu, HeartPulse, Globe, Landmark } from "lucide-react";

const categories = [
  {
    title: "Engineering",
    icon: <Cpu />,
    desc: "Explore tech & engineering scholarships",
  },
  {
    title: "Medical",
    icon: <HeartPulse />,
    desc: "Scholarships for medical students",
  },
  {
    title: "Study Abroad",
    icon: <Globe />,
    desc: "Global opportunities & funding",
  },
  {
    title: "Government",
    icon: <Landmark />,
    desc: "Central & state funded schemes",
  },
];

export default function Categories() {
  return (
    <section className="categories">
      <div className="container">
        <h2 className="section-title">Explore by Category</h2>
        <p className="section-subtitle">
          Find scholarships tailored to your goals
        </p>

        <div className="categories__grid">
          {categories.map((cat, i) => (
            <div className="category-card" key={i}>
              <div className="category-icon">{cat.icon}</div>

              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}