import http from ".";

export type LoginData = {
  username: string;
  password: string;
};
export function login(data: LoginData) {
  return http({
    url: "/user/login",
    method: "POST",
    data,
  });
}
