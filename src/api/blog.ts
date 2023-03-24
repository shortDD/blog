import http from "./server";
// 编辑模式下 获取博客信息
export const seeBlogEditorApi = (id: number) => {
  return http({
    url: `/blog/editor/${id}`,
    method: "GET",
  });
};
export const seeTagsApi = () => {
  return http({
    url: "/blog/tags",
    method: "GET",
  });
};
