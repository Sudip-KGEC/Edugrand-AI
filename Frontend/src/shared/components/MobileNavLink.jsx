import "./styles/mobileNavLink.scss";

export default function MobileNavLink({
  onClick,
  icon,
  label,
  active = false,
  badge,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? "page" : undefined}
      className={`mobile-link ${active ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      {active && <span className="mobile-link__indicator" />}

      {icon && <span className="mobile-link__icon">{icon}</span>}

      <span className="mobile-link__label">{label}</span>

      {badge && <span className="mobile-link__badge">{badge}</span>}
    </button>
  );
}