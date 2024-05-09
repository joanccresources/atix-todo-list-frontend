import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { TodoListTemplate } from "../shared/components/templates";

export const TodoListRouter: React.FC = () => {
  return (
    <TodoListTemplate>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </TodoListTemplate>
  );
};
