import "./styles/confirmModal.scss";

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="confirm-modal">
      <div className="confirm-modal__overlay" onClick={onCancel} />

      <div className="confirm-modal__container">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="confirm-modal__actions">
          <button className="btn cancel" onClick={onCancel}>
            Cancel
          </button>

          <button
            className="btn confirm"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}