import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userReducer from "./UserSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

/* Data must be persisted in order not to lose them on page refresh. */
/* Redux-persist basically saves the data into localStorage so the data is not lost on refresh. */

const persistConfigUser = {
  key: "user",
  version: 1,
  storage,
};

const persistedReducerUser = persistReducer<any, any>(
  persistConfigUser,
  userReducer
);

const store = configureStore({
  reducer: {
    user: persistedReducerUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
