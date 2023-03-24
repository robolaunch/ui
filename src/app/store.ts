import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./UserSlice";
import organizationReducer from "./OrganizationSlice";
import roboticsCloudReducer from "./RoboticsCloudSlice";
import ProviderReducer from "./ProviderSlice";
import RegionReducer from "./RegionSlice";
import FleetReducer from "./FleetSlice";
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

const persistConfigOrganization = {
  key: "organization",
  version: 1,
  storage,
};
const persistedReducerOrganization = persistReducer<any, any>(
  persistConfigOrganization,
  organizationReducer
);

const persistConfigRoboticsCloud = {
  key: "roboticsCloud",
  version: 1,
  storage,
};
const persistedReducerRoboticsCloud = persistReducer<any, any>(
  persistConfigRoboticsCloud,
  roboticsCloudReducer
);

const persistConfigProvider = {
  key: "provider",
  version: 1,
  storage,
};
const persistedReducerProvider = persistReducer<any, any>(
  persistConfigProvider,
  ProviderReducer
);

const persistConfigRegion = {
  key: "region",
  version: 1,
  storage,
};
const persistedReducerRegion = persistReducer<any, any>(
  persistConfigRegion,
  RegionReducer
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
    organization: persistedReducerOrganization,
    roboticsCloud: persistedReducerRoboticsCloud,
    provider: persistedReducerProvider,
    region: persistedReducerRegion,
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
