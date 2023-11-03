import MarketplaceSingleItemPage from "../pages/Marketplace/MarketplaceSingleItemPage/MarketplaceSingleItemPage";
import MainDashboardPage from "../pages/DashboardsPage/MainDashboardPage/MainDashboardPage";
import RegionDashboardPage from "../pages/DashboardsPage/RegionDashboard/RegionDashboard";
import MarketplacePage from "../pages/Marketplace/MarketplacePage/MarketplacePage";
import OrgDashboard from "../pages/DashboardsPage/OrgDashboard/OrgDashboard";
import UserRoleManagementLayout from "../layouts/UserRoleManagementLayout";
import CIDashboard from "../pages/DashboardsPage/CIDashboard/CIDashboard";
import NSDashboard from "../pages/DashboardsPage/NSDashboard/NSDashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateProvider from "../providers/PrivateProvider";
import ProfilePage from "../pages/Profile/ProfilePage";
import RobotPage from "../pages/RobotPage/RobotPage";
import Page404 from "../pages/Page404/Page404";
import { ReactElement } from "react";

export default function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<PrivateProvider />}>
        <Route
          path={`/user-role-management`}
          element={<UserRoleManagementLayout />}
        />
        <Route path={`/marketplace`} element={<MarketplacePage />} />
        <Route
          path={`/marketplace/:productName`}
          element={<MarketplaceSingleItemPage />}
        />
        <Route path={`/profile`} element={<ProfilePage />} />

        {/* Dashboard Pages */}
        <Route path={`/`} element={<MainDashboardPage />} />
        <Route path={`/:organizationName`} element={<OrgDashboard />} />
        <Route
          path={`/:organizationName/:roboticsCloudName`}
          element={<RegionDashboardPage />}
        />
        <Route
          path={`/:organizationName/:roboticsCloudName/:instanceName`}
          element={<CIDashboard />}
        />
        <Route
          path={`/:organizationName/:roboticsCloudName/:instanceName/:fleetName`}
          element={<NSDashboard />}
        />
        <Route
          path={`/:organizationName/:roboticsCloudName/:instanceName/:fleetName/:robotName`}
          element={<RobotPage />}
        />
        {/* Dashboard Pages */}

        <Route path="/404" element={<Page404 />} />

        <Route path="*" element={<Navigate to={`/`} />} />
      </Route>
    </Routes>
  );
}
