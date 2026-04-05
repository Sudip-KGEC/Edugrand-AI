import Profile from "@/features/profile/components/Profile";
import useStudentDashboard from "../hooks/useStudentDashboard";
import LoadingOverlay from "@/shared/components/LoadingOverlay";
import MyApplications from "../components/myApplications";
import "./studentDashboard.scss";

export default function StudentDashboardPage() {
  const { applications, loading, error, refetch } =
    useStudentDashboard();

  if (loading) return <LoadingOverlay />;

  return (
    <div className="student-dashboard">
      <Profile />

      {error && (
        <div className="student-dashboard__error">
          {error}
        </div>
      )}

      <MyApplications
        data={applications}
        loading={loading}
        onRefresh={refetch}
      />
    </div>
  );
}