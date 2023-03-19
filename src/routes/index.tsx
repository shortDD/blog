import { useRoutes } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { ProfilePage } from "@/pages/profile";
import { NotFound } from "@/pages/404";
import { CreatorPage } from "@/pages/creator";
import { ArticlePage } from "@/pages/article";
import { Auth } from "@/components/auth";
import { EditorPage } from "@/pages/editor";
//配置路由
export const Routes = () =>
  useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: (
        <Auth>
          <LoginPage />
        </Auth>
      ),
    },
    {
      path: "/profile/:id",
      element: <ProfilePage />,
    },
    {
      path: "/creator",
      element: <CreatorPage />,
    },
    {
      path: "/editor",
      element: <EditorPage />,
    },
    {
      path: "/editor/:id",
      element: <EditorPage />,
    },
    { path: "/article/:id", element: <ArticlePage /> },
    {
      path: "/404",
      element: <NotFound />,
    },
  ]);
