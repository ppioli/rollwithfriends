import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import tokenReducer from "features/token/tokenSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export function makeStore() {
  return configureStore({
    reducer: { token: tokenReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
