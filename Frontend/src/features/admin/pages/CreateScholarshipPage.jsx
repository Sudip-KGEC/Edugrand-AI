import CreateScholarshipForm from "../components/CreateScholarshipForm";
import Profile from "@/features/profile/components/Profile";
import "./adminDashboard.scss";

export default function CreateScholarshipPage() {
  return (
    <div className="create-scholarship">
      <Profile />
      <CreateScholarshipForm />
    </div>
  );
}