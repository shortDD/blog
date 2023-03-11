import { getToken, isNull, removeToken } from "@/utils";
import { useNavigate } from "react-router-dom";

export const useLogin = (): { isLogin: boolean; logout: () => void } => {
  const token = getToken();
  const isLogin = isNull(token);
  const navigate = useNavigate();
  const logout = () => {
    console.log("logout");
    if (token) {
      removeToken();
      navigate("/");
    }
  };
  return { isLogin, logout };
};
