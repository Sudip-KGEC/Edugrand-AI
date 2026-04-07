import "./styles/testimonials.scss";

const testimonials = [
  {
    name: "Amit Sharma",
    course: "B.Tech Computer Science",
    result: "Got ₹2L Scholarship",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Priya Singh",
    course: "MBA Finance",
    result: "Secured Full Tuition Grant",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Rahul Das",
    course: "BCA",
    result: "Won ₹1.2L Aid",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">Success Stories</h2>
        <p className="section-subtitle">
          Real students. Real results. Powered by EduGrand AI.
        </p>

        <div className="testimonials__grid">
          {testimonials.map((item, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-card__avatar">
                <img src={item.avatar} alt={item.name} />
              </div>

              <div className="testimonial-card__content">
                <h3>{item.name}</h3>
                <span className="course">{item.course}</span>
                <p className="result">{item.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}