import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import OrganizationReducer from "./OrganizationSlice";
import RoboticsCloudReducer from "./RoboticsCloudSlice";
import FleetReducer from "./FleetSlice";
import RobotReducer from "./RobotSlice";
import UserReducer from "./UserSlice";
import GithubReducer from "./GithubSlice";
import InstanceReducer from "./InstanceSlice";
import TrialReducer from "./TrialSlice";
import MarketplaceReducer from "./MarketplaceSlice";
import EnvironmentReducer from "./EnvironmentSlice";

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
  InstanceReducer
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

const persistConfigRobot = {
  key: "robot",
  version: 1,
  storage,
};
const persistedReducerRobot = persistReducer<any, any>(
  persistConfigRobot,
  RobotReducer
);

const persistConfigTrial = {
  key: "trial",
  version: 1,
  storage,
};
const persistedReducerTrial = persistReducer<any, any>(
  persistConfigTrial,
  TrialReducer
);

const persistConfigMarketplace = {
  key: "marketplace",
  version: 1,
  storage,
};

const persistedReducerMarketplace = persistReducer<any, any>(
  persistConfigMarketplace,
  MarketplaceReducer
);

const persistConfigEnvironment = {
  key: "environment",
  version: 1,
  storage,
};

const persistedReducerEnvironment = persistReducer<any, any>(
  persistConfigEnvironment,
  EnvironmentReducer
);

const store = configureStore({
  reducer: {
    user: persistedReducerUser,
    github: persistedReducerGithub,
    organization: persistedReducerOrganization,
    roboticsCloud: persistedReducerRoboticsCloud,
    instance: persistedReducerInstance,
    fleet: persistedReducerFleet,
    robot: persistedReducerRobot,
    trial: persistedReducerTrial,
    marketplace: persistedReducerMarketplace,
    environment: persistedReducerEnvironment,
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
