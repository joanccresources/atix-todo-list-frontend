import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { todoListApi } from "@/api";
import { RootState } from "@/store";
import { onLogoutTask } from "@/store/todoList";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "@/store/auth";
import {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  RenewTokenResponse,
} from "@/app/auth/domain";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  // Login
  const startLogin = async ({ email, password }: LoginData): Promise<void> => {
    dispatch(onChecking());
    try {
      const res = await todoListApi.post("/auth", {
        email,
        password,
      });
      const { data }: LoginResponse = res.data;
      localStorage.setItem("TOKEN", data.token);
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      if (error instanceof AxiosError) {
        const resError = error.response?.data as {
          errors: unknown;
          ok: boolean;
        };
        console.log(resError);
      }
      dispatch(onLogout(`Credenciales incorrectas`));
      // Limpiamos el mensaje de error
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }
  };

  // Renovar Token
  const checkAuthToken = async (): Promise<void> => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      dispatch(onLogout(null));
      return;
    }
    try {
      const res = await todoListApi.get("/auth/renew");
      const { data }: RenewTokenResponse = res.data;
      localStorage.setItem("TOKEN", data.token);
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log({ error });
      // En caso de error limpiamos el localStorage
      localStorage.clear();
      dispatch(onLogout(null));
    }
  };

  // Logout
  const startLogout = (): void => {
    localStorage.clear();
    dispatch(onLogoutTask());
    dispatch(onLogout(null));
  };

  // Registrarse
  const startRegister = async ({
    name,
    email,
    password,
  }: RegisterData): Promise<void> => {
    dispatch(onChecking());
    try {
      const res = await todoListApi.post("/user/new", {
        name,
        email,
        password,
      });
      const { data }: RegisterResponse = res.data;
      localStorage.setItem("TOKEN", data.token);
      dispatch(onLogin({ uid: data.uid, name: data.name }));
    } catch (error) {
      if (error instanceof AxiosError) {
        const resError = error.response?.data as {
          errors: unknown;
          ok: boolean;
        };
        console.log(resError);
      }
      dispatch(onLogout("Error al crear usuario | valide campos"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }
  };

  return {
    // Properties
    status,
    errorMessage,
    user,
    // methods
    startLogin,
    checkAuthToken,
    startLogout,
    startRegister,
  };
};
