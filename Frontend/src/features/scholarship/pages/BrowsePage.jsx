import { useState, useMemo, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import useScholarships from "../hooks/useScholarship.js";
import ScholarshipCard from "../components/ScholarshipCard";
import LoadingOverlay from "@/shared/components/LoadingOverlay";
import { useLanguage } from "@/app/context/useLanguage.js";
import { useAuth } from "@/app/context/useAuth";
import ErrorState from "@/shared/components/ErrorState";

import "./browse.scss";

export default function BrowsePage() {
  const { t } = useLanguage();
  const { scholarships, loading, error, apply, refetch } = useScholarships();
  const { user, openAuth } = useAuth();

  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(null);
  const [optimisticApplied, setOptimisticApplied] = useState(new Set());

  const filteredData = useMemo(() => {
    if (!search) return scholarships;

    const q = search.toLowerCase();

    return scholarships.filter((s) =>
      `${s.name} ${s.provider}`.toLowerCase().includes(q)
    );
  }, [search, scholarships]);

useEffect(() => {
  if (!user) return;

  setOptimisticApplied(
    new Set(user.appliedScholarships || [])
  );
}, [user]);

  const handleToggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const handleApply = useCallback(async (id) => {
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
  }, [user, openAuth, apply]);

  if (loading) return <LoadingOverlay />;

  if (error) {
    return <ErrorState message={error} onAction={refetch} />;
  }

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

      {filteredData.length === 0 ? (
        <div className="browse__empty">No scholarships found</div>
      ) : (
        <div className="browse__grid">
          {filteredData.map((s) => {
            const applied = optimisticApplied.has(s._id);

            return (
              <ScholarshipCard
                key={s._id}
                scholarship={s}
                onApply={handleApply}
                open={openId === s._id}
                onToggle={() => handleToggle(s._id)}
                applied={applied}
                user={user}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}