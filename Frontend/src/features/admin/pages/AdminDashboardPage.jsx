import useAdminDashboard from "../hooks/useAdminDashboard";
import LoadingOverlay from "@/shared/components/LoadingOverlay";
import ScholarshipTable from "../components/ScholarshipTable";
import ApplicationTable from "../components/ApplicationTable";
import { useState } from "react";
import Profile from "@/features/profile/components/Profile";
import "./adminDashboard.scss";

export default function AdminDashboardPage() {
  const {
    scholarships,
    applications,
    loading,
    error,
    handleStatusUpdate,
  } = useAdminDashboard();

  const [tab, setTab] = useState("applications");

  if (loading) return <LoadingOverlay />;

  if (error) {
    return (
      <div className="admin__error">
        {error}
      </div>
    );
  }

  return (
    <div className="admin">
      <Profile />

      <div className="admin__tabs">
        {["scholarships", "applications"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`admin__tab ${tab === t ? "active" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="admin__content">
        {tab === "scholarships" ? (
          <ScholarshipTable data={scholarships} />
        ) : (
          <ApplicationTable
            data={applications}
            onUpdate={handleStatusUpdate}
          />
        )}
      </div>
    </div>
  );
}