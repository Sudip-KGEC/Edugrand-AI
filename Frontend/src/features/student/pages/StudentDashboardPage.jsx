import Profile from "@/features/profile/components/Profile";
import useStudentDashboard from "../hooks/useStudentDashboard";
import LoadingOverlay from "@/shared/components/LoadingOverlay";
import MyApplications from "../components/MyApplications";
import ErrorState from "@/shared/components/ErrorState";
import "./studentDashboard.scss";

export default function StudentDashboardPage() {
  const { applications, loading, error, refetch } =
    useStudentDashboard();

  if (loading) return <LoadingOverlay />;

  if (error) {
    return (
      <ErrorState
        message={error}
        onAction={refetch}
      />
    );
  }

  return (
    <div className="student-dashboard">
      <Profile />

      <MyApplications
        data={applications}
        onRefresh={refetch}
      />
    </div>
  );
}