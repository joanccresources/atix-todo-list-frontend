import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/shared/hooks/useAuthStore";
import Swal from "sweetalert2";

const initFormRegisterState = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};
export const RegisterPage: () => JSX.Element = () => {
  const { startRegister, errorMessage } = useAuthStore();

  const [formRegisterState, setFormRegisterState] = useState(
    initFormRegisterState
  );

  const registerSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();    
    // En caso de error
    if (errorMessage) {
      Swal.fire("Error en el registro", "Revise los campos llenados", "error");
      return;
    }
    // Las contraseñas deben ser iguales
    if (
      formRegisterState.registerPassword !== formRegisterState.registerPassword2
    ) {
      Swal.fire("Error en el registro", "Contraseñas no son iguales", "error");
      return;
    }

    startRegister({
      name: formRegisterState.registerName,
      email: formRegisterState.registerEmail,
      password: formRegisterState.registerPassword,
    });
  };

  return (
    <form className="px-4" onSubmit={registerSubmit}>
      <h1 className="text-2xl text-center font-medium">Registro</h1>
      <hr className="my-3" />
      <div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Nombre"
          required
          value={formRegisterState.registerName}
          onChange={(e) =>
            setFormRegisterState((prev) => ({
              ...prev,
              registerName: e.target.value,
            }))
          }
        />
      </div>
      <div className="mt-3">
        <input
          type="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Correo"
          required
          onChange={(e) =>
            setFormRegisterState((prev) => ({
              ...prev,
              registerEmail: e.target.value,
            }))
          }
        />
      </div>
      <div className="mt-3">
        <input
          type="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Contraseña"
          required
          minLength={8}
          onChange={(e) =>
            setFormRegisterState((prev) => ({
              ...prev,
              registerPassword: e.target.value,
            }))
          }
        />
      </div>
      <div className="mt-3">
        <input
          type="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Repita la contraseña"
          required
          minLength={8}
          onChange={(e) =>
            setFormRegisterState((prev) => ({
              ...prev,
              registerPassword2: e.target.value,
            }))
          }
        />
      </div>
      <button
        className="rounded-md bg-blue-500 text-white text-lg px-3 py-1 transition-all duration-300 hover:bg-blue-400 w-full mt-3"
        type="submit"
      >
        Crear Cuenta
      </button>
      <div className="text-right mt-3">
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link to={"/auth/login"} className="underline hover:no-underline">
            Ingresar
          </Link>
        </p>
      </div>
    </form>
  );
};
