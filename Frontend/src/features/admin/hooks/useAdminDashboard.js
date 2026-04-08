import { useEffect, useState } from "react";
import {
  getAdminScholarships,
  getAdminApplications,
  updateApplicationStatus,
  deleteScholarship,
  updateScholarship,
  createScholarship,
} from "../services/admin.api";

export default function useAdminDashboard() {
  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    provider: "",
    amount: "",
    deadline: "",
    category: "Merit",
    gpaRequirement: "",
    degreeLevel: "Undergraduate",
    description: "",
    eligibility: [""],
    officialUrl: "",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    provider: "",
    amount: "",
    deadline: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [schols, apps] = await Promise.all([
        getAdminScholarships(),
        getAdminApplications(),
      ]);

      setScholarships(schols);
      setApplications(apps);
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);

      setApplications((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status } : a
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const openDeleteConfirm = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      setLoading(true);

      await deleteScholarship(selectedId);

      setScholarships((prev) =>
        prev.filter((s) => s._id !== selectedId)
      );

      setConfirmOpen(false);
      setSelectedId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setSelectedId(null);
  };

  const setEditData = (data) => {
    if (!data) return;

    setEditForm({
      name: data.name || "",
      provider: data.provider || "",
      amount: data.amount || "",
      deadline: data.deadline?.slice(0, 10) || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (id, onClose) => {
    if (!editForm.name.trim()) return;

    try {
      setLoading(true);

      const updated = await updateScholarship(id, {
        ...editForm,
        amount: Number(editForm.amount),
      });

      setScholarships((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, ...updated } : s
        )
      );

      onClose?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEligibilityChange = (index, value) => {
    const updated = [...form.eligibility];
    updated[index] = value;
    setForm((prev) => ({ ...prev, eligibility: updated }));
  };

  const addEligibility = () => {
    setForm((prev) => ({
      ...prev,
      eligibility: [...prev.eligibility, ""],
    }));
  };

  const removeEligibility = (index) => {
    const updated = form.eligibility.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, eligibility: updated }));
  };

  const validateCreate = () => {
    if (!form.name) return "Name required";
    if (!form.provider) return "Provider required";
    if (!form.amount) return "Amount required";
    if (!form.deadline) return "Deadline required";
    if (!form.description || form.description.length < 20)
      return "Description must be at least 20 characters";
    return "";
  };

  const handleCreateSubmit = async (e, onClose) => {
    e.preventDefault();

    const err = validateCreate();
    if (err) return setError(err);

    try {
      setLoading(true);
      setError("");

      const payload = {
        ...form,
        amount: Number(form.amount),
        gpaRequirement: Number(form.gpaRequirement),
        eligibility: form.eligibility.filter((e) => e.trim()),
      };

      const created = await createScholarship(payload);

      setScholarships((prev) => [created, ...prev]);

      setForm({
        name: "",
        provider: "",
        amount: "",
        deadline: "",
        category: "Merit",
        gpaRequirement: "",
        degreeLevel: "Undergraduate",
        description: "",
        eligibility: [""],
        officialUrl: "",
      });

      onClose?.();
    } catch (err) {
      setError(err.message || "Failed to create scholarship");
    } finally {
      setLoading(false);
    }
  };

  return {
    scholarships,
    applications,
    loading,
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
  };
}