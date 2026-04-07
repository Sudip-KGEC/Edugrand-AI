import "./styles/services.scss";
import { Search, Bot, FileCheck, Activity } from "lucide-react";

export default function ServicesSection() {
  return (
    <section className="services">
      <div className="container">
        <h2 className="section-title">What You Can Do</h2>
        <p className="section-subtitle">
          Powerful tools to simplify your scholarship journey
        </p>

        <div className="services__grid">
          <ServiceCard
            icon={<Search />}
            title="Easy Search"
            desc="Find scholarships tailored to your academic profile."
          />
          <ServiceCard
            icon={<Bot />}
            title="AI Chatbot"
            desc="Ask anything about scholarships instantly."
          />
          <ServiceCard
            icon={<FileCheck />}
            title="One-Click Apply"
            desc="Apply quickly with a streamlined process."
          />
          <ServiceCard
            icon={<Activity />}
            title="Track Status"
            desc="Monitor your applications in real time."
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="service-card">
      <div className="service-card__icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}