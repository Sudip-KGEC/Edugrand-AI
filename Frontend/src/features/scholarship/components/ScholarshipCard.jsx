import { Loader2 } from "lucide-react";
import { useState } from "react";
import "./scholarshipCard.scss";

export default function ScholarshipCard({
  scholarship,
  onApply,
  applied,
  user,
}) {
  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";
  const hasOfficialLink = !!scholarship?.officialUrl;

  const [loading, setLoading] = useState(false);
  const [localApplied, setLocalApplied] = useState(applied);

  const handleRedirect = () => {
    if (scholarship?.officialUrl) {
      window.open(scholarship.officialUrl, "_blank");
    }
  };

  const handleApplyClick = async () => {
    if (loading || localApplied) return;

    setLocalApplied(true);
    setLoading(true);

    await onApply(scholarship._id);

    setLoading(false);
  };

  return (
    <div className="card">
      <div className="card__content">

        <div className="card__header">
          <div>
            <h3 className="card__title">{scholarship.name}</h3>
            <p className="card__provider">{scholarship.provider}</p>
          </div>

          <div className="card__amount">
            <p className="amount">₹{scholarship.amount}</p>
            <span>Amount</span>
          </div>
        </div>

        <div className="card__grid">
          <Info label="Degree" value={scholarship.degreeLevel} />
          <Info label="GPA" value={scholarship.gpaRequirement} />
          <Info label="Category" value={scholarship.category} />
          <Info
            label="Deadline"
            value={new Date(scholarship.deadline).toLocaleDateString()}
          />
        </div>

        <div className="card__eligibility">
          <p>Eligibility</p>
          <ul>
            {scholarship.eligibility?.slice(0, 3).map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card__footer">
        {isAdmin && (
          <div className="admin-link">
            {hasOfficialLink ? (
              <a href={scholarship.officialUrl} target="_blank">
                {scholarship.officialUrl}
              </a>
            ) : (
              <span className="no-link">No official link</span>
            )}
          </div>
        )}

        {isStudent && !isAdmin && (
          <>
            {hasOfficialLink ? (
              <button onClick={handleRedirect} className="btn-indigo">
                Visit Official Site
              </button>
            ) : (
              <button
                onClick={handleApplyClick}
                disabled={localApplied || loading}
                className={`btn-primary ${
                  localApplied ? "disabled" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="spin" size={16} />
                    Applying...
                  </>
                ) : localApplied ? (
                  "Applied"
                ) : (
                  "Apply Now"
                )}
              </button>
            )}
          </>
        )}

        {!user && (
          <button
            onClick={() => onApply(scholarship._id)}
            className="btn-primary"
          >
            Login to Apply
          </button>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="info">
      <p className="info__label">{label}</p>
      <p className="info__value">{value || "N/A"}</p>
    </div>
  );
}