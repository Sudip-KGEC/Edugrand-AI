import "./styles/accessDenied.scss";

export default function AccessDenied({
  title = "Access Denied",
  message = "You don’t have permission to view this page.",
  actionText = "Go Home",
  onAction,
}) {
  return (
    <div className="access-denied">
      <div className="access-denied__card">
        <div className="access-denied__icon">🚫</div>

        <h2 className="access-denied__title">{title}</h2>

        <p className="access-denied__message">{message}</p>

        {onAction && (
          <button
            className="access-denied__btn"
            onClick={onAction}
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}