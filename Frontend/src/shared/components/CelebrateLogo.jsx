import confetti from "canvas-confetti";
import { GraduationCap } from "lucide-react";
import { useRef } from "react";
import "./styles/celebrateLogo.scss";

export default function CelebrateLogo({ size = 110 }) {
  const lastClickRef = useRef(0);

  const handleCelebrate = (e) => {
    const now = Date.now();
    if (now - lastClickRef.current < 300) return;
    lastClickRef.current = now;

    const x = (e?.clientX || window.innerWidth / 2) / window.innerWidth;
    const y = (e?.clientY || window.innerHeight / 2) / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { x, y },
      colors: ["#14b8a6", "#22c55e", "#06b6d4"],
      gravity: 1,
      scalar: 0.9,
    });

    confetti({
      particleCount: 40,
      spread: 120,
      origin: { x, y },
      colors: ["#FFD700", "#FF69B4"],
      gravity: 1.2,
      scalar: 0.8,
    });
  };

  return (
    <button
      onClick={handleCelebrate}
      aria-label="Celebrate"
      className="celebrate"
    >
      <div className="celebrate__glow-lg" />
      <div className="celebrate__glow-sm" />

      <GraduationCap
        style={{ width: size, height: size }}
        className="celebrate__icon"
      />
    </button>
  );
}