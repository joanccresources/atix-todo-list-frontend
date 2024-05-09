import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITask {
  uid: string;
  text: string;
  checked: boolean;
}

export interface ItodoListState {
  isLoadingTasks: boolean;
  tasks: ITask[];
}

const initialState: ItodoListState = {
  isLoadingTasks: true, // Esta cargando las tareas
  tasks: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    onAddNewTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
    onLoadTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
      state.isLoadingTasks = false; // Termino de cargar
    },
    onUpdateTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = state.tasks.map((task) => {
        if (task.uid === action.payload.uid) return action.payload;
        return task;
      });
    },
    onDeleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.uid !== action.payload);
    },

    onLogoutTask: (state) => {
      // Reiniciamos las tareas
      state.isLoadingTasks = true;
      state.tasks = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  onAddNewTask,
  onLoadTasks,
  onLogoutTask,
  onUpdateTask,
  onDeleteTask,
} = todoListSlice.actions;
