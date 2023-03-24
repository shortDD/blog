import http from "./server";
export type PostData = {
  title: string;
  html: string;
  forward?: string;
  status?: 0 | 1 | 2 | 3;
};
export function createApi(data: PostData) {
  return http({
    url: "/blog/create",
    method: "POST",
    data,
  });
}
type UpdateData = Partial<PostData> & { tags?: string[]; cover?: any };
type UpdateProps = {
  blogId: number;
  data: UpdateData;
};
export function updateApi(data: UpdateProps) {
  return http({
    url: "/blog/edit",
    method: "POST",
    data,
  });
}
