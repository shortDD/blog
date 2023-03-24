import http from "./server";

export const uploadApi = (formData: any) => {
  return http({
    url: "/upload",
    method: "POST",
    data: formData,
  });
};
