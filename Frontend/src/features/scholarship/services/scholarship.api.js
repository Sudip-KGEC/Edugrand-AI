import api from "@/app/api/axios";

// 📚 FETCH
export const fetchScholarships = (adminId) =>
  api.get("/scholarships", {
    params: adminId ? { adminId } : {},
  }).then(res => res.data);

// ➕ CREATE
export const createScholarship = (data) =>
  api.post("/scholarships", data)
    .then(res => res.data);

// 🎯 APPLY
export const applyForScholarship = (id) =>
  api.post("/scholarships/apply", {
    scholarshipId: id,
  }).then(res => res.data);

// 👤 STUDENT APPLICATIONS
export const getStudentApplications = () =>
  api.get("/scholarships/my-applications")
    .then(res => res.data);