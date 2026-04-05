import { Loader2 } from "lucide-react";
import "./styles/loadingOverlay.scss";

export default function LoadingOverlay({
  text = "Processing...",
  fullScreen = true,
}) {
  return (
    <div className={`loading ${fullScreen ? "fullscreen" : "inline"}`}>
      <div className="loading__content">
        <Loader2 className="loading__spinner" />
        <p className="loading__text">{text}</p>
      </div>
    </div>
  );
}