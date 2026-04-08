import api from "@/app/api/axios";

export const getAdminScholarships = async () => {
  const { data } = await api.get("/scholarships/admin");
  return data?.data || data || [];
};

export const getAdminApplications = async () => {
  const { data } = await api.get("/scholarships/admin/applications");
  return data?.data || data || [];
};

export const createScholarship = async (payload) => {
  const { data } = await api.post("/scholarships", payload);
  return data?.data || data;
};

export const updateScholarship = async (id, payload) => {
  if (!id) throw new Error("Scholarship ID is required");

  const { data } = await api.put(`/scholarships/${id}`, payload);
  return data?.data || data;
};

export const updateApplicationStatus = async (id, status) => {
  if (!id || !status) {
    throw new Error("Invalid application update request");
  }

  const { data } = await api.patch(
    `/scholarships/admin/applications/${id}/status`,
    { status }
  );

  return data?.data || data;
};

export const deleteScholarship = async (id) => {
  if (!id) throw new Error("Scholarship ID is required");

  const { data } = await api.delete(`/scholarships/${id}`);
  return data?.data || data;
};