import { useTodoListStore } from "@/shared/hooks/useTodoListStore";
import { ITask } from "@/store/todoList";

interface IProps {
  className?: string;
  tasks: ITask[];
}
export const TodoShow = ({ className = "", tasks }: IProps) => {
  const { startUpdateTask, startDeletingTask } = useTodoListStore();

  const handleUpdateTask = (task: ITask) =>
    startUpdateTask({
      uid: task.uid,
      text: task.text,
      checked: !task.checked,
    });
  const handleDeletingTask = (uid: string) => startDeletingTask({ uid });

  return (
    <div className={className}>
      <ul className="text-gray-900 bg-white border border-gray-200">
        {tasks.map((task) => (
          <li
            key={task.uid}
            className="flex items-center justify-between border-b border-gray-200 py-1.5 px-4 hover:bg-gray-100"
          >
            <div>
              <button
                className={`${task.checked ? "grayscale-0" : "grayscale"}`}
                onClick={() => handleUpdateTask(task)}
              >
                ✅
              </button>
              <span className={`ml-3 ${task.checked ? "line-through" : ""}`}>
                {task.text}
              </span>
            </div>
            <button
              type="button"
              className="text-white bg-red-700 transition-all duration-300 font-medium rounded-lg text-sm px-5 py-2 focus:outline-none focus:ring-4 focus:ring-red-300 hover:bg-red-800"
              onClick={() => handleDeletingTask(task.uid)}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
