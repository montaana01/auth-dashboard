import {BrowserRouter, Route, Routes} from "react-router";
import { UserPage } from "@/pages/users/UserPage.tsx";
import {Layout} from "@/layouts/Layout.tsx";
import {ROUTES} from "@/app/config/routes.ts";
import {AuthLayout} from "@/layouts/AuthLayout.tsx";
import {LoginPage} from "@/pages/auth/LoginPage.tsx";
import {RegisterPage} from "@/pages/auth/RegisterPage.tsx";
import {NotFoundPage} from "@/pages/notFound/NotFoundPage.tsx";
import {AboutPage} from "@/pages/about/AboutPage.tsx";

//Todo: need to implement auth guard to check session and auth and other user states

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<AuthLayout />}>
              <Route path={ROUTES.AUTH} element={<LoginPage />} />
              <Route path={ROUTES.SIGN_IN} element={<LoginPage />} />
              <Route path={ROUTES.SIGN_UP} element={<RegisterPage />} />
            </Route>
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.USERS} element={<UserPage />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
