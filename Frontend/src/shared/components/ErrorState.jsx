import "./styles/errorState.scss";

export default function ErrorState({
  title = "Something went wrong",
  message,
  actionText = "Retry",
  onAction,
}) {
  return (
    <div className="error-state">
      <div className="error-state__card">
        <div className="error-state__icon">⚠️</div>

        <h3 className="error-state__title">{title}</h3>

        {message && (
          <p className="error-state__message">{message}</p>
        )}

        {onAction && (
          <button
            className="btn-primary"
            onClick={onAction}
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}