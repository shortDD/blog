import { useRoutes } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { ProfilePage } from "@/pages/profile";
import { NotFound } from "@/pages/404";
import { CreatorPage } from "@/pages/creator";
//配置路由
export const Routes = () =>
  useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/creator",
      element: <CreatorPage />,
    },
    {
      path: "/404",
      element: <NotFound />,
    },
  ]);