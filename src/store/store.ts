import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { todoListSlice } from "./todoList";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    todoList: todoListSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
