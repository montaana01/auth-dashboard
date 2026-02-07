import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import type { ReactNode } from "react";
import type { RootState } from "@/app/store.ts";
import { useSelector } from "react-redux";
import { useSnackbar} from "notistack";
import { UserPage } from "@/pages/users/UserPage.tsx";
import { Layout } from "@/layouts/Layout.tsx";
import { ROUTES } from "@/app/config/routes.ts";
import { AuthLayout } from "@/layouts/AuthLayout.tsx";
import { LoginPage } from "@/pages/auth/LoginPage.tsx";
import { RegisterPage } from "@/pages/auth/RegisterPage.tsx";
import { NotFoundPage } from "@/pages/notFound/NotFoundPage.tsx";
import { AboutPage } from "@/pages/about/AboutPage.tsx";

const AuthGuard = ({children}: { children: ReactNode }) => {
  const { enqueueSnackbar } = useSnackbar()
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  if (!isAuth) {
    enqueueSnackbar('Unfortunately you are not authorized', { variant: 'error' });
    return <Navigate to={ROUTES.SIGN_IN} replace/>
  }
  return children;
}

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
            <Route path={ROUTES.USERS} element={
              <AuthGuard>
                <UserPage />
              </AuthGuard>
            } />
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
