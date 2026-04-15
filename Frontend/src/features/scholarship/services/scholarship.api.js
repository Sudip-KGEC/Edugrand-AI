import api from "@/app/api/axios";

export const fetchScholarships = async (adminId) => {
  const res = await api.get("/scholarships", {
    params: adminId ? { adminId } : {},
  });
  return res.data.scholarships || res.data.data || [];
};

export const createScholarship = async (data) => {
  const res = await api.post("/scholarships", data);
  return res.data;
};

export const applyForScholarship = async (id) => {
  const res = await api.post("/scholarships/apply", {
    scholarshipId: id,
  });
  return res.data;
};

export const getStudentApplications = async () => {
  const res = await api.get("/scholarships/my-applications");
  return res.data.applications || res.data.data || [];
};