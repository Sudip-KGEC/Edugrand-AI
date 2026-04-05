import { useEffect, useState, useCallback } from "react";
import { getStudentApplications } from "@/features/scholarship/services/scholarship.api";

export default function useStudentDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getStudentApplications();

      const data = Array.isArray(res?.data)
        ? res.data
        : res || [];

      setApplications(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
  };
}