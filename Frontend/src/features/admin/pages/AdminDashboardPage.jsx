import { useState } from "react";
import useAdminDashboard from "../hooks/useAdminDashboard";
import LoadingOverlay from "@/shared/components/LoadingOverlay";
import ScholarshipTable from "../components/ScholarshipTable";
import ApplicationTable from "../components/ApplicationTable";
import EditScholarshipModal from "../components/EditScholarshipModal";
import CreateScholarshipForm from "../components/CreateScholarshipForm";
import ConfirmModal from "@/shared/components/ConfirmModal";
import Profile from "@/features/profile/components/Profile";
import "./adminDashboard.scss";

export default function AdminDashboardPage() {
  const {
    scholarships,
    applications,
    error,
    handleStatusUpdate,
    openDeleteConfirm,
    handleConfirmDelete,
    handleCancelDelete,
    confirmOpen,
    form,
    handleChange,
    handleEligibilityChange,
    addEligibility,
    removeEligibility,
    handleCreateSubmit,
    editForm,
    setEditData,
    handleEditChange,
    handleEditSubmit,
    loading,
  } = useAdminDashboard();

  const [tab, setTab] = useState("applications");
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);


  if (loading) return <LoadingOverlay />;
  if (error) return <div className="admin__error">{error}</div>;

  return (
    <div className="admin">
      <Profile />

      <div className="admin__header">
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

        {tab === "scholarships" && (
          <button
            className="btn-primary"
            onClick={() => setOpenCreate(true)}
          >
            + Add Scholarship
          </button>
        )}
      </div>

      <div className="admin__content">
        {tab === "scholarships" ? (
          <ScholarshipTable
            data={scholarships}
            onDelete={openDeleteConfirm}
            onEdit={(s) => {
              setSelectedScholarship(s);
              setEditData(s);
            }}
          />
        ) : (
          <ApplicationTable
            data={applications}
            onUpdate={handleStatusUpdate}
          />
        )}
      </div>

      {selectedScholarship && (
        <EditScholarshipModal
          data={selectedScholarship}
          form={editForm}
          onChange={handleEditChange}
          onSave={(id) =>
            handleEditSubmit(id, () => setSelectedScholarship(null))
          }
          onClose={() => setSelectedScholarship(null)}
          loading={loading}
        />
      )}

      {openCreate && (
        <CreateScholarshipForm
          onClose={() => setOpenCreate(false)}
          form={form}
          loading={loading}
          error={error}
          handleChange={handleChange}
          handleEligibilityChange={handleEligibilityChange}
          addEligibility={addEligibility}
          removeEligibility={removeEligibility}
          handleCreateSubmit={handleCreateSubmit}
        />
      )}

      <ConfirmModal
        open={confirmOpen}
        title="Delete Scholarship"
        message="Are you sure you want to delete this scholarship?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

    </div>
  );
}