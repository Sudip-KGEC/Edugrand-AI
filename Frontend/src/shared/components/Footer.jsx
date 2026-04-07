import { GraduationCap, Github, Linkedin, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/context/useAuth";
import "./styles/footer.scss";

export default function Footer() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const u = user?.data || user;

  const handleDashboard = () => {
    if (!u) return navigate("/");
    navigate(u.role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <div className="footer__logo">
            <GraduationCap />
            <span>EduGrand</span>
          </div>
          <p>
            Discover scholarships, track applications, and build your future
            with confidence.
          </p>
        </div>

        <div className="footer__links">
          <div>
            <h4>Explore</h4>
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/browse")}>Scholarships</button>
            {u && <button onClick={handleDashboard}>Dashboard</button>}
          </div>

          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy</a>
          </div>
        </div>

        <div className="footer__social">
          <h4>Connect</h4>
          <div className="footer__icons">
            <a href="#"><Github size={18} /></a>
            <a href="#"><Linkedin size={18} /></a>
            <a href="#"><Mail size={18} /></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} EduGrand. All rights reserved.</p>
      </div>
    </footer>
  );
}