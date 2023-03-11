import http from "./server";

export type LoginData = {
  username: string;
  password: string;
};
export function loginApi(data: LoginData) {
  return http({
    url: "/user/login",
    method: "POST",
    data,
  });
}
