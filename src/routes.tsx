import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Study } from "./pages/Study";
import { TalkWithIA } from "./pages/TalkWithIA";
import { SignIn } from "./pages/Login/SignIn";
import { SignUp } from "./pages/Login/SignUp";
import { useAuth } from "./contexts/auth";

export const Router = () => {
  const { auth } = useAuth();

  const nonProtectedRoutes = [
    {
      path: "/",
      component: SignIn,
    },
    {
      path: "/sign-up",
      component: SignUp,
    },
  ];

  const protectedRoutes = [
    {
      path: "/",
      component: Home,
    },

    {
      path: "/study",
      component: Study,
    },
    {
      path: "/talk-ia",
      component: TalkWithIA,
    },
  ];

  const routes =
    auth && auth.user && auth.user.user_id
      ? protectedRoutes
      : nonProtectedRoutes;

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ component: Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
