import { useState } from "react";
import { Loader2, Plus, Trash } from "lucide-react";
import { createScholarship } from "../services/admin.api";
import { useNavigate } from "react-router-dom";
import "./styles/createScholarshipForm.scss";

export default function CreateScholarshipForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    provider: "",
    amount: "",
    deadline: "",
    category: "Merit",
    gpaRequirement: "",
    degreeLevel: "Undergraduate",
    description: "",
    eligibility: [""],
    officialUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEligibilityChange = (index, value) => {
    const updated = [...form.eligibility];
    updated[index] = value;
    setForm((prev) => ({ ...prev, eligibility: updated }));
  };

  const addEligibility = () => {
    setForm((prev) => ({
      ...prev,
      eligibility: [...prev.eligibility, ""],
    }));
  };

  const removeEligibility = (index) => {
    const updated = form.eligibility.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, eligibility: updated }));
  };

  const validate = () => {
    if (!form.name) return "Name required";
    if (!form.provider) return "Provider required";
    if (!form.amount) return "Amount required";
    if (!form.deadline) return "Deadline required";
    if (!form.description || form.description.length < 20)
      return "Description must be at least 20 characters";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) return setError(err);

    try {
      setLoading(true);
      setError("");

      const payload = {
        ...form,
        amount: Number(form.amount),
        gpaRequirement: Number(form.gpaRequirement),
        eligibility: form.eligibility.filter((e) => e.trim()),
      };

      await createScholarship(payload);

      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to create scholarship");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form__title">Create Scholarship</h2>

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