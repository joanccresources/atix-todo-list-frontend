import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/shared/hooks/useAuthStore";
import Swal from "sweetalert2";

const initFormLoginState = {
  email: "",
  password: "",
};
export const LoginPage: () => JSX.Element = () => {
  const { startLogin, errorMessage } = useAuthStore();

  const [formLoginState, setFormLoginState] = useState(initFormLoginState);

  const loginSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    startLogin({
      email: formLoginState.email,
      password: formLoginState.password,
    });
  };

  useEffect(() => {
    if (errorMessage !== null) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <form className="px-4" onSubmit={loginSubmit}>
      <h1 className="text-2xl text-center font-medium">Ingreso</h1>
      <hr className="my-3" />
      <div>
        <input
          type="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Correo"
          required
          value={formLoginState.email}
          onChange={(e) =>
            setFormLoginState((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
      </div>
      <div className="mt-3">
        <input
          type="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Contraseña"
          minLength={8}
          required
          value={formLoginState.password}
          onChange={(e) =>
            setFormLoginState((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />
      </div>
      <button
        className="rounded-md bg-blue-500 text-white text-lg px-3 py-1 transition-all duration-300 hover:bg-blue-400 w-full mt-3"
        type="submit"
      >
        Login
      </button>
      <div className="text-right mt-3">
        <Link to={"/auth/register"} className="underline hover:no-underline">
          Crear una cuenta
        </Link>
      </div>
    </form>
  );
};
