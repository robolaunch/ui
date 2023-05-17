import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserReducer from "./UserSlice";
import OrganizationReducer from "./OrganizationSlice";
import RoboticsCloudReducer from "./RoboticsCloudSlice";
import FleetReducer from "./FleetSlice";
import GithubReducer from "./GithubSlice";
import instanceReducer from "./InstanceSlice";
/* Data must be persisted in order not to lose them on page refresh. */
/* Redux-persist basically saves the data into localStorage so the data is not lost on refresh. */

const persistConfigUser = {
  key: "user",
  version: 1,
  storage,
};
const persistedReducerUser = persistReducer<any, any>(
  persistConfigUser,
  UserReducer
);

const persistConfigGithub = {
  key: "github",
  version: 1,
  storage,
};
const persistedReducerGithub = persistReducer<any, any>(
  persistConfigGithub,
  GithubReducer
);

const persistConfigOrganization = {
  key: "organization",
  version: 1,
  storage,
};
const persistedReducerOrganization = persistReducer<any, any>(
  persistConfigOrganization,
  OrganizationReducer
);

const persistConfigRoboticsCloud = {
  key: "roboticsCloud",
  version: 1,
  storage,
};
const persistedReducerRoboticsCloud = persistReducer<any, any>(
  persistConfigRoboticsCloud,
  RoboticsCloudReducer
);

const persistConfigCloudInstance = {
  key: "instance",
  version: 1,
  storage,
};
const persistedReducerInstance = persistReducer<any, any>(
  persistConfigCloudInstance,
  instanceReducer
);

const persistConfigFleet = {
  key: "fleet",
  version: 1,
  storage,
};
const persistedReducerFleet = persistReducer<any, any>(
  persistConfigFleet,
  FleetReducer
);

const store = configureStore({
  reducer: {
    user: persistedReducerUser,
    github: persistedReducerGithub,
    organization: persistedReducerOrganization,
    roboticsCloud: persistedReducerRoboticsCloud,
    instance: persistedReducerInstance,
    fleet: persistedReducerFleet,
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
