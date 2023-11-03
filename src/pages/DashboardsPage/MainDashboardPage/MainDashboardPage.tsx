import { GetMainDashboardTableDatas } from "../../../controllers/GetTableDatas";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import MainDashboardTour from "../../../components/MainDashboardTour/MainDashboardTour";
import CountWidget from "../../../components/CountWidget/CountWidget";
import { Fragment, ReactElement, useEffect, useState } from "react";
import GeneralTable from "../../../components/Table/GeneralTable";
import DashboardLayout from "../../../layouts/DashboardLayout";
import useFunctions from "../../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import { IOrganization } from "../../../interfaces/organizationInterfaces";

export default function MainDashboardPage(): ReactElement {
  const [responseOrganizations, setResponseOrganizations] = useState<
    IOrganization[] | undefined
  >();
  const { getOrganizations } = useFunctions();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();

  useEffect(() => {
    getOrganizations({
      setResponse: setResponseOrganizations,
      ifErrorNavigateTo404: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, url]);

  const { data, columns } = GetMainDashboardTableDatas({
    responseOrganizations,
    setReload,
  });

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
          <CountWidget
            data={
              responseOrganizations
                ? [
                    {
                      label: "Pending",
                      value: 0,
                      color: "#ffa500",
                    },
                    {
                      label: "Ready",
                      value: responseOrganizations?.length || 0,
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
          />
        </Fragment>
      }
      table={
        <GeneralTable
          type="organization"
          title="Organizations"
          data={data}
          columns={columns}
          loading={Array.isArray(responseOrganizations) ? false : true}
          handleReload={() => {
            setResponseOrganizations(undefined);
            setReload(!reload);
          }}
        />
      }
    />
  );
}
