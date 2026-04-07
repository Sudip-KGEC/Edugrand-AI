import "./styles/cta.scss";

export default function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__box">
          <h2>Start Your Scholarship Journey Today</h2>
          <p>
            Discover the best scholarships tailored to you with the power of AI.
          </p>

          <div className="cta__actions">
            <button className="btn-primary">Get Started</button>
            <button className="btn-outline">Try AI</button>
          </div>
        </div>
      </div>
    </section>
  );
}