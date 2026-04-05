import { useEffect, useState, useCallback, useRef } from "react";
import {
  fetchScholarships,
  applyForScholarship,
} from "../services/scholarship.api";
import { useAuth } from "@/app/context/useAuth";

export default function useScholarships() {
  const { setUser } = useAuth();

  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const hasFetched = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetchScholarships();
      const data = Array.isArray(res) ? res : res?.data || [];

      setScholarships(data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchData();
  }, [fetchData]);

  const apply = async (id) => {
  try {
    await applyForScholarship(id);

    setUser((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        appliedScholarships: [
          ...(prev.data.appliedScholarships || []),
          id,
        ],
      },
    }));

    return { success: true };
  } catch (err) {
    if (err?.response?.data?.message === "Already applied") {
      return { alreadyApplied: true };
    }
    return { success: false };
  }
};

  return { scholarships, loading, error, apply, refetch: fetchData };
}