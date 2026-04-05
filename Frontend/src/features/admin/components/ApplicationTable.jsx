import "./styles/applicationTable.scss";

export default function ApplicationTable({ data = [], onUpdate }) {
  return (
    <div className="app-table">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Scholarship</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(data) &&
            data.map((app, index) => (
              <tr key={app._id || app.id || index}>
                <td className="name">
                  {app.studentId?.name || "Unknown"}
                </td>

                <td className="scholarship">
                  {app.scholarshipId?.name || "N/A"}
                </td>

                <td>
                  <select
                    value={app.status || "Pending"}
                    onChange={(e) =>
                      onUpdate(app._id || app.id, e.target.value)
                    }
                    className="status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}