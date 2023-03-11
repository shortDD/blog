import http from "./server";

export function meApi(): Promise<any> {
  return http({
    url: "/user/me",
    method: "get",
  });
}
