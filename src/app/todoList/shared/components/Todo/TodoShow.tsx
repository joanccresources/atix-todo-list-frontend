import { TodoItem } from "./TodoItem";
import { ITask } from "@/store/todoList";

interface IProps {
  className?: string;
  tasks: ITask[];
}

export const TodoShow = ({ className = "", tasks }: IProps) => {
  return (
    <div className={className}>
      <ul className="text-gray-900 bg-white border border-gray-200">
        {tasks.map((task) => (
          <TodoItem key={task.uid} task={task} />
        ))}
      </ul>
    </div>
  );
};
