import CelebrateLogo from "@/shared/components/CelebrateLogo";
import "./styles/hero.scss";

export default function HeroSection({
  t,
  navigate,
  user,
  loading,
  openAuth,
}) {
  return (
    <div className="home__hero container">
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
          <button onClick={openAuth} className="btn-outline">
            {t.login}
          </button>
        ) : null}
      </div>
    </div>
  );
}