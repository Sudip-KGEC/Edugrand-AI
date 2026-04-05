import api from "@/app/api/axios";

export const getAdminScholarships = () =>
  api.get("/scholarships/admin").then(res => res.data);

export const getAdminApplications = () =>
  api.get("/scholarships/admin/applications")
    .then(res => res.data);

export const updateApplicationStatus = (id, status) => {
  if (!id || !status) {
    throw new Error("Invalid application update request");
  }

  return api.patch(
    `/scholarships/admin/applications/${id}/status`,
    { status }
  ).then(res => res.data);
};

export const deleteScholarship = (id) => {
  if (!id) throw new Error("Scholarship ID is required");

  return api.delete(`/scholarships/${id}`)
    .then(res => res.data);
};

export const createScholarship = (data) =>
  api.post("/scholarships", data).then((res) => res.data);
