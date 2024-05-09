import { useEffect } from "react";
import { useTodoListStore } from "@/shared/hooks/useTodoListStore";
import { TemplateTodoList } from "../../shared/components";
import { TodoAdd, TodoShow, TodoTitle } from "../../shared/components/Todo";

export const HomePage: () => JSX.Element = () => {
  const { tasks, startLoadingTasks } = useTodoListStore();

  useEffect(() => {
    startLoadingTasks();
  }, []);

  return (
    <TemplateTodoList>
      <TodoTitle className="col-span-12" tasks={tasks} />
      <TodoShow className="col-span-6" tasks={tasks} />
      <TodoAdd className="col-span-6" />
    </TemplateTodoList>
  );
};
