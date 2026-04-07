import { useState, useRef, useEffect } from "react";
import {
  GraduationCap,
  Moon,
  Sun,
  Globe,
  LogOut,
  Menu,
  X,
  Home,
  Search,
  LayoutDashboard,
  User,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { TRANSLATIONS } from "@/shared/constants/translations";

import { useAuth } from "@/app/context/useAuth";
import { useTheme } from "@/app/context/useTheme";
import { useLanguage } from "@/app/context/useLanguage";

import AuthModal from "@/features/auth/components/AuthModal";
import NotificationCenter from "@/features/notification/components/NotificationCenter";
import MobileNavLink from "./MobileNavLink";

import "./styles/navbar.scss";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();

  const { openAuth, showAuthModal, closeAuth } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const u = user?.data || user;

  const LANG_LABELS = {
    en: "English",
    hi: "हिंदी",
    bn: "বাংলা",
    ta: "தமிழ்",
    or: "ଓଡ଼ିଆ",
    ml: "മലയാളം",
  };

  const langRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target))
        setLangOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { path: "/", label: t.home },
    { path: "/browse", label: t.browse },
    ...(u
      ? [
        {
          path: u.role === "admin" ? "/admin" : "/dashboard",
          label: t.dashboard,
        },
      ]
      : []),
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          <div
            onClick={() => navigate("/")}
            className="navbar__logo"
          >
            <GraduationCap className="navbar__logo-icon" />
            <span>{t.title}</span>
          </div>

          <div className="navbar__links">
            {navLinks.map((item) => {
              const active = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`navbar__link ${active ? "active" : ""}`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="navbar__pill"
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="navbar__actions">
            {u && <NotificationCenter />}

            <button onClick={toggleTheme} className="icon-btn">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div ref={langRef} className="dropdown">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="dropdown__trigger"
              >
                <Globe size={16} />
                {LANG_LABELS[language] || language.toUpperCase()}
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div className="dropdown__menu">
                    {Object.keys(TRANSLATIONS).map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          changeLanguage(l);
                          setLangOpen(false);
                        }}
                      >
                        {LANG_LABELS[l] || l.toUpperCase()}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {u ? (
              <div ref={profileRef} className="dropdown">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="profile-btn"
                >
                  <div className="avatar">
                    {u?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span>{u?.name?.split(" ")[0]}</span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div className="dropdown__menu profile-menu">
                      <div className="profile-info">
                        <p>{u?.name}</p>
                        <span>{u?.email}</span>
                      </div>

                      <button
                        onClick={() => {
                          navigate(u.role === "admin" ? "/admin" : "/dashboard");
                          setProfileOpen(false);
                        }}
                      >
                        Dashboard
                      </button>

                      <button
                        onClick={() => {
                          navigate("/profile");
                          setProfileOpen(false);
                        }}
                      >
                        Profile
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                          navigate("/");
                        }}
                        className="logout"
                      >
                        <LogOut size={14} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={openAuth}
                className="login-btn"
              >
                {t.login}
              </button>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="menu-btn"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div className="mobile-menu">
              {navLinks.map((item) => (
                <MobileNavLink
                  key={item.path}
                  label={item.label}
                  active={location.pathname === item.path}
                  icon={
                    item.path === "/" ? <Home /> :
                      item.path === "/browse" ? <Search /> :
                        <LayoutDashboard />
                  }
                  onClick={() => {
                    navigate(item.path);
                    setMenuOpen(false);
                  }}
                />
              ))}

              {/* Profile */}
              {u && (
                <MobileNavLink
                  label="Profile"
                  icon={<User />}
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                />
              )}

              {/* Logout */}
              {u && (
                <MobileNavLink
                  label="Logout"
                  icon={<LogOut />}
                  variant="danger"
                  onClick={() => {
                    logout();
                    navigate("/");
                    setMenuOpen(false);
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {showAuthModal && (
        <AuthModal onClose={closeAuth} />
      )}
    </>
  );
}