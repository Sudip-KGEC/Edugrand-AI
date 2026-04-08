import "./styles/editScholarshipModal.scss";

export default function EditScholarshipModal({
  data,
  form,
  onChange,
  onSave,
  onClose,
  loading = false,
}) {
  return (
    <div className="edit-modal">
      <div className="edit-modal__overlay" onClick={onClose} />

      <div className="edit-modal__container">
        <div className="edit-modal__header">
          <h3>Edit Scholarship</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(data._id);
          }}
          className="edit-modal__form"
        >
          <input
            type="text"
            name="name"
            placeholder="Scholarship Name"
            value={form.name}
            onChange={onChange}
          />

          <input
            type="text"
            name="provider"
            placeholder="Provider"
            value={form.provider}
            onChange={onChange}
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={onChange}
          />

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={onChange}
          />

          <div className="edit-modal__actions">
            <button
              type="button"
              onClick={onClose}
              className="btn cancel"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn save"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}