import "./styles/scholarshipTable.scss";

export default function ScholarshipTable({ data = [] }) {
  return (
    <div className="sch-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Provider</th>
            <th>Applicants</th>
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}