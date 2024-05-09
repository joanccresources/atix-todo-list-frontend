import { todoListApi } from "@/api";
import { RootState } from "@/store";
import {
  onAddNewTask,
  onDeleteTask,
  onLoadTasks,
  onUpdateTask,
} from "@/store/todoList";
import { useDispatch, useSelector } from "react-redux";

interface ITaskResponse {
  ok: boolean;
  tasks: Array<{
    checked: false;
    createdAt: string;
    text: string;
    uid: string;
    updatedAt: string;
    user: { _id: string; name: string };
  }>;
}
export interface ITask {
  uid: string;
  text: string;
  checked: boolean;
}

export interface RequestStartSavingTask {
  [key: string]: unknown;
}
export interface RequestStartUpdateTask {
  [key: string]: unknown;
}
export interface RequestStartDeletingTask {
  [key: string]: unknown;
}

export interface ResponseStartSavingTask {
  ok: boolean;
  task: {
    text: string;
    checked: boolean;
    user: string;
    createdAt: string;
    updatedAt: string;
    uid: string;
  };
}
export interface ResponseStartUpdateTask {
  ok: boolean;
  task: {
    text: string;
    checked: boolean;
    user: string;
    createdAt: string;
    updatedAt: string;
    uid: string;
  };
}
export interface ResponseStartDeletingTask {
  ok: boolean;
}

export const useTodoListStore = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.todoList);
  // const { user } = useSelector((state: RootState) => state.auth);

  // Cargar los Tasks
  const startLoadingTasks = async (): Promise<void> => {
    try {
      const res = await todoListApi.get("/task");
      const tasksResponse: ITaskResponse = res.data;
      const tasks: ITask[] = tasksResponse.tasks.map((task) => {
        return {
          uid: task.uid,
          text: task.text,
          checked: task.checked,
        };
      });
      dispatch(onLoadTasks(tasks));
    } catch (error) {
      console.log(error);
    }
  };

  // Guardar Task
  const startSavingTask = async ({
    text,
    checked,
  }: RequestStartSavingTask): Promise<void> => {
    try {
      const res = await todoListApi.post("/task/new", {
        text,
        checked,
      });
      const data: ResponseStartSavingTask = res.data;
      const newTask: ITask = {
        uid: data.task.uid,
        text: data.task.text,
        checked: data.task.checked,
      };
      console.log({ newTask });
      dispatch(onAddNewTask(newTask));
    } catch (error) {
      console.log(error);
    }
  };

  // Actualizar Task por id
  const startUpdateTask = async ({
    uid,
    text,
    checked,
  }: RequestStartUpdateTask): Promise<void> => {
    try {
      const res = await todoListApi.put(`/task/${uid}`, {
        text,
        checked,
      });
      const data: ResponseStartUpdateTask = res.data;
      const taskUpdated: ITask = {
        uid: data.task.uid,
        text: data.task.text,
        checked: data.task.checked,
      };
      dispatch(onUpdateTask(taskUpdated));
    } catch (error) {
      console.log(error);
    }
  };

  // Eliminar Task por id
  const startDeletingTask = async ({
    uid,
  }: RequestStartDeletingTask): Promise<void> => {
    try {
      const res = await todoListApi.delete(`/task/${uid}`);
      const data: ResponseStartDeletingTask = res.data;
      if (data.ok === false) return;
      dispatch(onDeleteTask(uid as string));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // Properties
    tasks,
    // Methods
    startSavingTask,
    startLoadingTasks,
    startUpdateTask,
    startDeletingTask,
  };
};
