import { useEffect, useRef, useState } from "react";
import "./styles/how.scss";

export default function HowItWorks() {
  const glowRef = useRef(null);
  const containerRef = useRef(null);
  const pointsRef = useRef([]);

  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 300 });

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDimensions({
        width: mobile ? 300 : 1000,
        height: mobile ? 900 : 300,
      });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const updatePoints = () => {
    const path = glowRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const total = pointsRef.current.length;

    pointsRef.current.forEach((el, i) => {
      if (!el) return;
      const t = total > 1 ? i / (total - 1) : 0;
      const point = path.getPointAtLength(t * length);

      if (isMobile) {
        el.style.transform = "translate(10px, -50%)";
        el.style.left = `${point.x + 15}px`;
        el.style.top = `${point.y}px`;
      } else {
        el.style.transform = "translate(-50%, -50%)";
        el.style.left = `${point.x}px`;
        el.style.top = `${point.y}px`;
      }
    });
  };

  const updateScroll = () => {
    const path = glowRef.current;
    const section = containerRef.current;
    if (!path || !section) return;

    const length = path.getTotalLength();
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    const start = vh * 0.1;
    const end = vh * -0.3;

    let progress = 0;

    if (rect.top <= start && rect.bottom >= end) {
      const total = start - end;
      const current = start - rect.top;
      progress = current / total;
    } else if (rect.top > start) {
      progress = 0;
    } else if (rect.bottom < end) {
      progress = 1;
    }

    progress = Math.max(0, Math.min(1, progress));

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length * (1 - progress);
  };

  useEffect(() => {
    const path = glowRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    updatePoints();
    updateScroll();

    window.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", () => {
      updatePoints();
      updateScroll();
    });

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [isMobile]);

  const steps = [
    { title: "Create Profile", description: "Sign up and build your profile" },
    { title: "AI Recommendations", description: "Get smart scholarship matches" },
    { title: "Apply Easily", description: "One-click applications" },
    { title: "Track Status", description: "Monitor your progress" },
  ];

  const desktopPath = `
    M 80 150
    C 250 30, 350 30, 500 150
    S 650 270, 800 150
    S 920 100, 950 150
  `;

  const mobilePath = `
    M 150 60
    C 280 150, 20 250, 150 350
    S 280 550, 150 650
    S 20 750, 150 850
  `;

  return (
    <section className="how-it-works" ref={containerRef}>
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Your journey in 4 simple steps</p>

        <div className="timeline">
          <svg
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            className="timeline__svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pathGradient">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            <path
              d={isMobile ? mobilePath : desktopPath}
              className="timeline__base"
              fill="none"
            />

            <path
              ref={glowRef}
              d={isMobile ? mobilePath : desktopPath}
              className="timeline__glow"
              fill="none"
            />
          </svg>

          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (pointsRef.current[index] = el)}
              className="timeline__point"
            >
              <div className="timeline__point-dot">{index + 1}</div>
              <div className="timeline__point-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}