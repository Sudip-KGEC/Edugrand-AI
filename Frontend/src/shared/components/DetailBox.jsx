import ".styles/detailBox.scss";

export default function DetailBox({ icon, label, value }) {
  const displayValue = value || "N/A";

  return (
    <div className="detail-box">
      <span className="detail-box__label">
        {icon && <span className="detail-box__icon">{icon}</span>}
        {label}
      </span>

      <span
        className="detail-box__value"
        title={displayValue}
      >
        {displayValue}
      </span>
    </div>
  );
}