import "./styles/scholarshipTable.scss";
import { Pencil, Trash2 } from "lucide-react";

export default function ScholarshipTable({ data = [], onDelete, onEdit }) {
  return (
    <div className="sch-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Provider</th>
            <th>Applicants</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(data) &&
            data.map((s, index) => (
              <tr key={s._id || s.id || index}>
                <td className="name">{s.name}</td>

                <td className="provider">
                  {s.provider || "N/A"}
                </td>

                <td>
                  <span className="badge">
                    {s.applicantCount || 0}
                  </span>
                </td>

                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(s)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(s._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}