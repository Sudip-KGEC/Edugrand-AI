import { useEffect, useState } from "react";
import {
  getAdminScholarships,
  getAdminApplications,
  updateApplicationStatus,
} from "../services/admin.api";

export default function useAdminDashboard() {
  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const [scholsRes, appsRes] = await Promise.all([
          getAdminScholarships(),
          getAdminApplications(),
        ]);

        const schols = Array.isArray(scholsRes)
          ? scholsRes
          : scholsRes?.data || [];

        const apps = Array.isArray(appsRes)
          ? appsRes
          : appsRes?.data || [];

        setScholarships(schols);
        setApplications(apps);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    await updateApplicationStatus(id, status);

    setApplications((prev) =>
      prev.map((a) =>
        a._id === id ? { ...a, status } : a
      )
    );
  };

  return {
    scholarships,
    applications,
    loading,
    error,
    handleStatusUpdate,
  };
}