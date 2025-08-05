import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./slices/cardsSlice";

export const Store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
