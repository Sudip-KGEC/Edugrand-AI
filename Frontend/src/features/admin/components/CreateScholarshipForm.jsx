import { Loader2, Plus, Trash, X } from "lucide-react";
import "./styles/createScholarshipForm.scss";


export default function CreateScholarshipForm({
  onClose,
  form,
  loading,
  error,
  handleChange,
  handleEligibilityChange,
  addEligibility,
  removeEligibility,
  handleCreateSubmit, }) {

  return (
    <div className="form-modal">
      <div className="form-modal__overlay" onClick={onClose} />

      <div className="form-modal__container">
        <div className="form-modal__header">
          <h2>Create Scholarship</h2>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={(e) => handleCreateSubmit(e, onClose)} className="form">
          {error && <p className="form__error">{error}</p>}

          <Input label="Name" value={form.name} onChange={(v) => handleChange("name", v)} />
          <Input label="Provider" value={form.provider} onChange={(v) => handleChange("provider", v)} />

          <div className="form__grid">
            <Input label="Amount" type="number" value={form.amount} onChange={(v) => handleChange("amount", v)} />
            <Input label="Deadline" type="date" value={form.deadline} onChange={(v) => handleChange("deadline", v)} />
          </div>

          <div className="form__grid">
            <Select
              label="Category"
              value={form.category}
              options={["Merit", "Need", "Sports", "Research", "Other"]}
              onChange={(v) => handleChange("category", v)}
            />

            <Select
              label="Degree Level"
              value={form.degreeLevel}
              options={["Undergraduate", "Postgraduate", "PhD", "Diploma", "Other"]}
              onChange={(v) => handleChange("degreeLevel", v)}
            />
          </div>

          <Input
            label="GPA Requirement"
            type="number"
            value={form.gpaRequirement}
            onChange={(v) => handleChange("gpaRequirement", v)}
          />

          <Textarea
            label="Description"
            value={form.description}
            onChange={(v) => handleChange("description", v)}
          />

          <Input
            label="Official URL"
            value={form.officialUrl}
            onChange={(v) => handleChange("officialUrl", v)}
          />

          <div className="form__eligibility">
            <label>Eligibility</label>

            {form.eligibility.map((item, index) => (
              <div key={index} className="form__eligibility-item">
                <input
                  value={item}
                  onChange={(e) =>
                    handleEligibilityChange(index, e.target.value)
                  }
                />
                <button type="button" onClick={() => removeEligibility(index)}>
                  <Trash size={16} />
                </button>
              </div>
            ))}

            <button type="button" onClick={addEligibility} className="form__add">
              <Plus size={14} />
              Add Eligibility
            </button>
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading && <Loader2 className="spin" size={16} />}
            Create Scholarship
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div className="form__field">
      <label>{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div className="form__field">
      <label>{label}</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
      />
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <div className="form__field">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}