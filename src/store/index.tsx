import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice";
import { recipesApiSlice } from "./recipes/recipesApiSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [recipesApiSlice.reducerPath]: recipesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(recipesApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;