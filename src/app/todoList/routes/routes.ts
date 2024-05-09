import { HomePage } from "@/app/todoList/pages";

export enum TodoListAppRoutes {
  "HOME" = "home",
}

interface IRoute {
  name: string;
  path: string;
  component: () => JSX.Element;
  to?: string;
}

export const routes: IRoute[] = [
  {
    path: "",
    component: HomePage,
    name: TodoListAppRoutes.HOME,
  },
];
