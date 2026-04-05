import api from "@/app/api/axios";

export const updateProfileApi = (data) =>
  api.put("/auth/update-profile", data).then((res) => res.data);