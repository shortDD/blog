import useStore from "@/store";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
interface RouterProps {
  children: any;
}
const GlobalRouter: React.FC<RouterProps> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { loginStore } = useStore();
  useEffect(() => {
    if (pathname === "/editor") {
      if (!loginStore.isLogin) {
        navigate("/");
      }
    }
  });
  return <>{children}</>;
};
export default GlobalRouter;
