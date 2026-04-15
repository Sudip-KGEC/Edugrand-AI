import { useEffect } from "react";
import useAuthFlow from "../hooks/useAuthFlow";
import OtpInput from "./OtpInput";
import "./authModal.scss";

export default function AuthModal({ onClose }) {
  const {
    step,
    setStep,
    email,
    setEmail,
    otp,
    setOtp,
    profile,
    setProfile,
    loading,
    error,
    sendOtp,
    verifyOtp,
    completeProfile,
  } = useAuthFlow(onClose);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="auth" onClick={() => !loading && onClose()}>
      <div className="auth__modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="auth__title">Continue with Email</h2>

        {error && <div className="auth__error">{error}</div>}

        {step === "email" && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="auth__input"
            />

            <button
              onClick={sendOtp}
              disabled={loading || !email}
              className="btn-primary"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <p className="auth__info">
              OTP sent to <b>{email}</b>
            </p>

            <OtpInput otp={otp} setOtp={setOtp} />

            <button
              onClick={verifyOtp}
              disabled={loading || otp.length !== 6}
              className="btn-primary"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={() => setStep("email")}
              className="auth__link"
            >
              ← Change Email
            </button>
          </>
        )}

        {step === "profile" && (
          <>
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile((p) => ({ ...p, name: e.target.value }))
              }
              placeholder="Full Name"
              className="auth__input"
            />

            <input value="Student" disabled className="auth__input" />

            <input
              value={profile.college}
              onChange={(e) =>
                setProfile((p) => ({ ...p, college: e.target.value }))
              }
              placeholder="College"
              className="auth__input"
            />

            <input
              type="number"
              value={profile.cgpa}
              onChange={(e) =>
                setProfile((p) => ({ ...p, cgpa: e.target.value }))
              }
              placeholder="CGPA"
              className="auth__input"
            />

            <input
              type="number"
              value={profile.class12Marks || ""}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  class12Marks: e.target.value,
                }))
              }
              placeholder="Class 12 Marks"
              className="auth__input"
            />

            <select
              value={profile.highestDegree || ""}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  highestDegree: e.target.value,
                }))
              }
              className="auth__input"
            >
              <option value="">Select Highest Degree</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>

            <select
              value={profile.currentDegree || ""}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  currentDegree: e.target.value,
                }))
              }
              className="auth__input"
            >
              <option value="">Select Current Degree</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>

            <button
              onClick={completeProfile}
              disabled={loading || !profile.name || !profile.college}
              className="btn-primary"
            >
              {loading ? "Saving..." : "Complete Registration"}
            </button>
          </>
        )}

        <button onClick={onClose} className="auth__close">
          Close
        </button>
      </div>
    </div>
  );
}