import { ITask } from "@/store/todoList";

interface IProps {
  className?: string;
  tasks: ITask[];
}

export const TodoTitle = ({ className = "", tasks }: IProps) => {
  const { length: total } = tasks;
  const pending = tasks.filter((task) => task.checked === false).length;
  return (
    <div className={className}>
      <hr className="my-3" />
      <h1 className="text-3xl">Total Tareas: {total}</h1>
      <p className="text-2xl">
        Completadas: {total - pending} | Pendientes: {pending}
      </p>
      <hr className="my-3" />
    </div>
  );
};
