import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TodoListRouter } from "@/app/todoList/routes/TodoListRouter";
import { AuthRouter } from "@/app/auth/routes/AuthRouter";
import { useAuthStore } from "@/shared/hooks/useAuthStore";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  // Validamos si el token es valido
  useEffect(() => {
    checkAuthToken().then();
  }, []);

  if (status === "checking") return <h3 className="text-3xl">Cargando...</h3>;
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<TodoListRouter />} />
      ) : (
        <Route path="/auth/*" element={<AuthRouter />} />
      )}
      <Route path="*" element={<Navigate replace to="/auth/login" />} />
    </Routes>
  );
};