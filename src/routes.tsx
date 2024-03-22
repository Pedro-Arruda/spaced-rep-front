import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Study } from "./pages/Study";
import { TalkWithIA } from "./pages/TalkWithIA";

export const Router = () => {
  const routes = [
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
