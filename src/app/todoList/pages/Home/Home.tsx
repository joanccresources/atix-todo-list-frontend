import { useEffect } from "react";
import { useTodoListStore } from "@/shared/hooks/useTodoListStore";
import { TodoAdd, TodoShow, TodoTitle } from "../../shared/components/Todo";

export const HomePage: () => JSX.Element = () => {
  const { tasks, startLoadingTasks } = useTodoListStore();

  useEffect(() => {
    startLoadingTasks();
  }, []);

  return (
    <>
      <TodoTitle className="col-span-12" tasks={tasks} />
      <TodoShow className="col-span-6" tasks={tasks} />      
      <TodoAdd className="col-span-6" />
    </>
  );
};
