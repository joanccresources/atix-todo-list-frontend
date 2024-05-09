import { LoginPage, RegisterPage } from "@/app/auth/pages";

export enum AuthAppRoutes {
  "LOGIN" = "login",
  "REGISTER" = "register",
}

interface IRoute {
  name: string;
  path: string;
  component: () => JSX.Element;
  to?: string;
}

export const routes: IRoute[] = [
  {
    path: "login",
    component: LoginPage,
    name: AuthAppRoutes.LOGIN,
  },
  {
    path: "register",
    component: RegisterPage,
    name: AuthAppRoutes.REGISTER,
  },
];
