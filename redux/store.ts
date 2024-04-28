import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { bookingApi } from "./api/bookingApi";
import { roomApi } from "./api/roomApi";
import { contactusApi } from "./api/contactusApi";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [contactusApi.reducerPath]: contactusApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      bookingApi.middleware,
      roomApi.middleware,
      contactusApi.middleware
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
