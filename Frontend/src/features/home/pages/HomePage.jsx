import { Search, FileText, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "@/app/context/useLanguage";
import { useAuth } from "@/app/context/useAuth";

import CelebrateLogo from "@/shared/components/CelebrateLogo";
import ChatBot from "@/features/chatbot/components/ChatBot";

import "./home.scss";

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, loading, openAuthModal } = useAuth();

  return (
    <>
      <div className="home">

        <div className="home__hero">
          <div className="home__logo">
            <div className="home__glow" />
            <CelebrateLogo />
          </div>

          <h1 className="home__title">{t.heroTitle}</h1>

          <p className="home__desc">{t.heroDesc}</p>

          <div className="home__actions">
            <button
              onClick={() => navigate("/browse")}
              className="btn-primary"
            >
              {t.browse}
            </button>

            {loading ? (
              <div className="btn-skeleton" />
            ) : !user ? (
              <button
                onClick={openAuthModal}
                className="btn-outline"
              >
                {t.login}
              </button>
            ) : null}
          </div>
        </div>

        <div className="home__features">
          <Feature
            icon={<Search />}
            title={t.featureSearchTitle}
            desc={t.featureSearchDesc}
          />
          <Feature
            icon={<FileText />}
            title={t.featureApplyTitle}
            desc={t.featureApplyDesc}
          />
          <Feature
            icon={<CheckCircle />}
            title={t.featureTrackTitle}
            desc={t.featureTrackDesc}
          />
        </div>

        <ChatBot />
      </div>
    </>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="feature">
      <div className="feature__icon">{icon}</div>
      <h3 className="feature__title">{title}</h3>
      <p className="feature__desc">{desc}</p>
    </div>
  );
}