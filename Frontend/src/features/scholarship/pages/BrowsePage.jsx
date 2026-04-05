import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import useScholarships from "../hooks/useScholarship";
import ScholarshipCard from "../components/ScholarshipCard";
import LoadingOverlay from "@/shared/components/LoadingOverlay";
import { useLanguage } from "@/app/context/useLanguage";
import { useAuth } from "@/app/context/auth.context.js";

import "./browse.scss";

export default function BrowsePage() {
  const { t } = useLanguage();
  const { scholarships, loading, error, apply, refetch } = useScholarships();
  const { user, openAuth } = useAuth();

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [optimisticApplied, setOptimisticApplied] = useState(new Set());

  const u = user?.data;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!search) return setData(scholarships);

      const q = search.toLowerCase();

      setData(
        scholarships.filter((s) =>
          `${s.name} ${s.provider}`.toLowerCase().includes(q)
        )
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, scholarships]);

  useEffect(() => {
    if (!user?.data?.appliedScholarships) return;

    setOptimisticApplied((prev) => {
      const next = new Set(user.data.appliedScholarships);
      if (prev.size === next.size) return prev;
      return next;
    });
  }, [user?.data?.appliedScholarships]);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleApply = async (id) => {
    if (!user) {
      openAuth();
      return;
    }

    setOptimisticApplied((prev) => new Set(prev).add(id));

    const res = await apply(id);

    if (!res.success && !res.alreadyApplied) {
      setOptimisticApplied((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  return (
    <div className="browse">
      <div className="browse__header">
        <h2 className="browse__title">{t.browse}</h2>

        <div className="browse__search">
          <Search className="browse__search-icon" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
          />
        </div>
      </div>

      {loading && <LoadingOverlay />}

      {!loading && error && (
        <div className="browse__error">
          <p>{error}</p>
          <button onClick={refetch}>Retry</button>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="browse__empty">
          No scholarships found
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="browse__grid">
          {data.map((s) => {
            const applied = optimisticApplied.has(s._id);

            return (
              <ScholarshipCard
                key={s._id}
                scholarship={s}
                onApply={handleApply}
                open={openId === s._id}
                onToggle={() => handleToggle(s._id)}
                applied={applied}
                user={u}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}