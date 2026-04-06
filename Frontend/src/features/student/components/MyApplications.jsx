import { RefreshCw } from "lucide-react";
import "./myApplications.scss";
import Loader from "../../../shared/components/Loader";

export default function MyApplications({ data = [], loading, onRefresh }) {
  if (loading) {
    return <Loader fullScreen={false} text="Loading applications..." />;
  }

  if (!data.length) {
    return (
      <div className="apps__empty">
        <p>No applications found</p>
      </div>
    );
  }

  return (
    <div className="apps">
      <div className="apps__header">
        <h3>My Applications</h3>

        <button onClick={onRefresh} className="apps__refresh">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      <table className="apps__table">
        <thead>
          <tr>
            <th>Scholarship</th>
            <th>Provider</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((app) => (
            <tr key={app._id || app.id}>
              <td className="name">
                {app.scholarshipId?.name || app.scholarshipName}
              </td>

              <td className="provider">
                {app.scholarshipId?.provider || "N/A"}
              </td>

              <td>
                <StatusBadge status={app.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`badge ${status?.toLowerCase()}`}>
      {status}
    </span>
  );
}