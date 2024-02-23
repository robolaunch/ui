import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import MainDashboardTour from "../../../components/MainDashboardTour/MainDashboardTour";
import CountWidget from "../../../components/CountWidget/CountWidget";
import { Fragment, ReactElement } from "react";
import { MainTableData } from "../../../controllers/MainTableData";
import GeneralTable from "../../../components/Table/GeneralTable";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";

export default function MainDashboardPage(): ReactElement {
  const { rows, columns, orgs, handleReload } = MainTableData();

  return (
    <DashboardLayout
      isMainDashboard
      widget1={
        <InformationWidget
          title={`Main Dashboard`}
          subtitle="This page is the main page of the platform. On this page, you can manage your existing organizations, rename them, delete them, or view the details of each organization. "
          component={<MainDashboardTour />}
        />
      }
      widget3={
        <Fragment>
          {/* <CountWidget
            data={
              orgs
                ? [
                    {
                      label: "Pending",
                      value: 0,
                      color: "#ffa500",
                    },
                    {
                      label: "Ready",
                      value: orgs?.length || 0,
                      color: "#AC2DFE99",
                    },
                    {
                      label: "Error",
                      value: 0,
                      color: "#ff0000",
                    },
                  ]
                : []
            }
          /> */}
        </Fragment>
      }
      table={
        <GeneralTable
          type="organization"
          title="Organizations"
          data={rows}
          columns={columns}
          loading={!Array.isArray(orgs)}
          handleReload={handleReload}
        />
      }
    />
  );
}
