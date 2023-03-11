import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

export const Auth = ({ children }: { children: any }) => {
  const token = getToken();
  if (token) return <Navigate to="/" />;
  return <>{children}</>;
};
