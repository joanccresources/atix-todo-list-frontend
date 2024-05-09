import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { AuthTemplate } from "../shared/components/templates";

export const AuthRouter: React.FC = () => {
  return (
    <AuthTemplate>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
        <Route path="/*" element={<Navigate replace to="/auth/login" />} />
      </Routes>
    </AuthTemplate>
  );
};