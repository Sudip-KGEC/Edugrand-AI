import { useRef, useEffect } from "react";
import "./otpInput.scss";

export default function OtpInput({ otp, setOtp }) {
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const otpArr = otp.split("").concat(Array(6).fill("")).slice(0, 6);
    otpArr[index] = value;

    const newOtp = otpArr.join("").slice(0, 6);
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const otpArr = otp.split("").concat(Array(6).fill("")).slice(0, 6);

      if (otpArr[index]) {
        otpArr[index] = "";
        setOtp(otpArr.join(""));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        otpArr[index - 1] = "";
        setOtp(otpArr.join(""));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(paste);

    const focusIndex = Math.min(paste.length, 5);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="otp" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[i] || ""}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="otp__input"
        />
      ))}
    </div>
  );
}