import { useTodoListStore } from "@/shared/hooks/useTodoListStore";
import { useState } from "react";

interface IProps {
  className?: string;
}
export const TodoAdd = ({ className = "" }: IProps) => {
  const { startSavingTask } = useTodoListStore();
  const [inputTask, setInputTask] = useState<string>("");

  const submitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTask.trim().length === 0) return;
    startSavingTask({ text: inputTask, checked: false });
    setInputTask("");
  };

  return (
    <div className={className}>
      <form onSubmit={submitTask}>
        <p className="text-2xl">Agregar Tarea</p>
        <hr className="my-3" />
        <div>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Crear tarea"
            required
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
          />
          <button className="text-white bg-purple-700 transition-all duration-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-purple-300 hover:bg-purple-800 mt-2">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};
