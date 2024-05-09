import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { todoListApi } from "@/api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "@/store/auth";
import { onLogoutTask } from "@/store/todoList";

export interface IinitialForm {
  [key: string]: unknown;
}
interface IAuthResponse {
  data: {
    uid: string;
    name: string;
    token: string;
  };
  ok: boolean;
}

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const startLogin = async ({
    email,
    password,
  }: IinitialForm): Promise<void> => {
    // Iniciamos autenticación en checking
    dispatch(onChecking());
    try {
      const res = await todoListApi.post("/auth", {
        email,
        password,
      });
      const { data }: IAuthResponse = res.data;
      //Guardo token en localStorage
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
  const checkAuthToken = async (): Promise<void> => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      dispatch(onLogout(null));
      return;
    }

    try {
      const res = await todoListApi.get("/auth/renew");
      const { data }: IAuthResponse = res.data;
      localStorage.setItem("TOKEN", data.token);
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log({ error });
      // En caso de error limpiamos el localstorage
      localStorage.clear();
      dispatch(onLogout(null));
    }
  };
  const startLogout = (): void => {
    localStorage.clear();
    dispatch(onLogoutTask());
    dispatch(onLogout(null));
  };

  const startRegister = async ({
    name,
    email,
    password,
  }: IinitialForm): Promise<void> => {
    dispatch(onChecking());
    try {
      const res = await todoListApi.post("/user/new", {
        name,
        email,
        password,
      });
      const { data }: IAuthResponse = res.data;
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
