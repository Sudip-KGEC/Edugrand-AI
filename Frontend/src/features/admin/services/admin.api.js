import api from "@/app/api/axios";

export const getAdminScholarships = async () => {
  const res = await api.get("/scholarships/admin");
  return res.data.scholarships || res.data.data || [];
};

export const getAdminApplications = async () => {
  const res = await api.get("/scholarships/admin/applications");
  return res.data.applications || res.data.data || [];
};

export const createScholarship = async (payload) => {
  const res = await api.post("/scholarships", payload);
  return res.data.scholarship || res.data.data || res.data;
};

export const updateScholarship = async (id, payload) => {
  if (!id) throw new Error("Scholarship ID is required");

  const res = await api.patch(`/scholarships/${id}`, payload);
  return res.data.scholarship || res.data.data || res.data;
};

export const updateApplicationStatus = async (id, status) => {
  if (!id || !status) {
    throw new Error("Invalid application update request");
  }

  const res = await api.patch(
    `/scholarships/admin/applications/${id}/status`,
    { status }
  );

  return res.data.application || res.data.data || res.data;
};

export const deleteScholarship = async (id) => {
  if (!id) throw new Error("Scholarship ID is required");

  const res = await api.delete(`/scholarships/${id}`);
  return res.data;
};