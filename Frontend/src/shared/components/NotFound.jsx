import { useNavigate } from "react-router-dom";
import "./styles/notFound.scss";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <div className="notfound__card">
        <h1 className="notfound__code">404</h1>

        <h2 className="notfound__title">Page Not Found</h2>

        <p className="notfound__desc">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="notfound__actions">
          <button
            className="btn-primary"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>

          <button
            className="btn-outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}