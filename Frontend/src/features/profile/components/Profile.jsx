import { useState } from "react";
import { Mail, Pencil, Loader2, Plus } from "lucide-react";
import useProfile from "../hooks/useProfile";
import "./profile.scss";

export default function Profile() {
 

  const { user, formData, setFormData, updateProfile, loading } = useProfile();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  if (!user?.data) return null;

  const u = user.data;

  const validate = () => {
    if (u.role === "student") {
      if (!formData.college) return "College required";
      if (!formData.cgpa) return "CGPA required";
      if (formData.cgpa > 10) return "Max CGPA is 10";
    }
    if (u.role === "admin") {
      if (!formData.organization) return "Organization required";
    }
    return "";
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) return setError(err);

    setError("");
    await updateProfile();
    setOpen(false);
  };

  return (
    <>
      <div className="profile">

        <div className="profile__actions">
          <button onClick={() => setOpen(true)} className="btn-icon">
            <Pencil size={16} />
          </button>
        </div>

        <div className="profile__header">
          <Avatar name={u.name} />

          <div>
            <h2 className="profile__name">{u.name}</h2>
            <p className="profile__email">
              <Mail size={12} />
              {u.email}
            </p>
          </div>
        </div>

        <div className="profile__grid">
          <Info label="Role" value={u.role} />

          {u.role === "student" ? (
            <>
              <Info label="College" value={u.college} />
              <Info label="CGPA" value={u.cgpa} />
              <Info label="12th %" value={u.class12Marks} />
              <Info label="Current Degree" value={u.currentDegree} />
              <Info label="Highest Degree" value={u.highestDegree} />
              <Info label="Field" value={u.fieldOfStudy} />
            </>
          ) : (
            <>
              <Info label="Organization" value={u.organization} />
              <Info label="Department" value={u.department} />
              <Info label="Designation" value={u.designation} />
              <Info label="Employee ID" value={u.employeeId} />
            </>
          )}
        </div>
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h2 className="modal__title">Edit Profile</h2>

          {error && <p className="modal__error">{error}</p>}

          {u.role === "student" && (
            <>
              <Input placeholder="College" value={formData.college} onChange={(v) => setFormData(p => ({ ...p, college: v }))} />
              <Input placeholder="CGPA" type="number" value={formData.cgpa} onChange={(v) => setFormData(p => ({ ...p, cgpa: v }))} />
              <Input placeholder="12th Marks" type="number" value={formData.class12Marks} onChange={(v) => setFormData(p => ({ ...p, class12Marks: v }))} />
              <Input placeholder="Current Degree" value={formData.currentDegree} onChange={(v) => setFormData(p => ({ ...p, currentDegree: v }))} />
              <Input placeholder="Highest Degree" value={formData.highestDegree} onChange={(v) => setFormData(p => ({ ...p, highestDegree: v }))} />
              <Input placeholder="Field of Study" value={formData.fieldOfStudy} onChange={(v) => setFormData(p => ({ ...p, fieldOfStudy: v }))} />
            </>
          )}

          {u.role === "admin" && (
            <>
              <Input placeholder="Organization" value={formData.organization} onChange={(v) => setFormData(p => ({ ...p, organization: v }))} />
              <Input placeholder="Department" value={formData.department} onChange={(v) => setFormData(p => ({ ...p, department: v }))} />
              <Input placeholder="Designation" value={formData.designation} onChange={(v) => setFormData(p => ({ ...p, designation: v }))} />
              <Input placeholder="Employee ID" value={formData.employeeId} onChange={(v) => setFormData(p => ({ ...p, employeeId: v }))} />
            </>
          )}

          <div className="modal__actions">
            <button onClick={() => setOpen(false)} className="btn-outline">Cancel</button>

            <button onClick={handleSubmit} disabled={loading} className="btn-primary">
              {loading && <Loader2 className="spin" size={16} />}
              Update
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function Avatar({ name }) {
  return <div className="avatar">{name?.charAt(0)?.toUpperCase()}</div>;
}

function Info({ label, value }) {
  return (
    <div className="info">
      <p className="info__label">{label}</p>
      <p className="info__value">{value || "N/A"}</p>
    </div>
  );
}

function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="input"
    />
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="modal">
      <div className="modal__box">{children}</div>
      <div className="modal__overlay" onClick={onClose} />
    </div>
  );
}