import { useAuthStore } from "@/shared/hooks/useAuthStore";

interface IProps {
  children: React.ReactNode;
}
export const TodoListTemplate = ({ children }: IProps) => {
  const { startLogout, user } = useAuthStore();
  return (
    <>
      <header className="bg-black text-white py-2">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="px-4 text-xl">Hola {user.name}</div>
            <button
              type="button"
              className="text-white-700 border border-white-700 transition-all duration-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center focus:ring-4 focus:outline-none focus:ring-white-300 hover:bg-white-800 hover:text-white"
              onClick={startLogout}
            >
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="mt-5">
        <div className="container">
          <div className="px-4">
            <div className="grid grid-cols-12 gap-4">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
};
