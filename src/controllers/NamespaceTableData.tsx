import EnvironmentActionCells from "../components/TableActionCells/EnvironmentActionCells";
import { IEnvironment } from "../interfaces/environment/environment.interface";
import { handleSplitOrganizationName } from "../functions/GeneralFunctions";
import StateCell from "../components/TableInformationCells/StateCell";
import BasicCell from "../components/TableInformationCells/BasicCell";
import { orgSplitter } from "../functions/string.splitter.function";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";

export function NamespaceTableData() {
  const [environments, setEnviroments] = useState<IEnvironment[] | null>();
  const [reload, setReload] = useState<boolean>(false);

  const { pagesState, selectedState, applicationMode } = useMain();
  const url = useParams();

  const {
    getOrganization,
    getRoboticsCloud,
    getInstance,
    getFleet,
    getNamespace,
    getRobots,
    getEnvironments,
  } = useFunctions();

  useEffect(() => {
    if (pagesState?.organization?.name !== `org_${url?.organizationName}`) {
      handleGetOrganization();
    } else if (pagesState?.roboticsCloud?.name !== url?.roboticsCloudName) {
      handleGetRoboticsCloud();
    } else if (pagesState?.instance?.name !== url?.instanceName) {
      handleGetInstance();
    } else if (pagesState?.fleet?.name !== url?.fleetName) {
      applicationMode ? handleGetNamespace() : handleGetFleet();
    } else {
      applicationMode ? handleGetEnvironments() : handleGetRobots();
    }

    const timer = setInterval(() => {
      selectedState?.organization &&
      selectedState?.roboticsCloud &&
      selectedState?.instance &&
      selectedState?.fleet &&
      pagesState?.fleet &&
      applicationMode
        ? handleGetEnvironments()
        : handleGetRobots();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState, url, reload]);

  useEffect(() => {
    setEnviroments(null);
  }, [url]);

  function handleReload() {
    setEnviroments(null);
    setReload((prevState: boolean) => !prevState);
  }

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !environments,
        setPages: true,
      },
    );
  }

  function handleGetRoboticsCloud() {
    getRoboticsCloud(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: url?.roboticsCloudName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !environments,
        setPages: true,
      },
    );
  }

  function handleGetInstance() {
    getInstance(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceName: url?.instanceName!,
        region: pagesState?.roboticsCloud?.region!,
        details: true,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !environments,
        setPages: true,
      },
    );
  }

  function handleGetFleet() {
    getFleet(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.id!,
        region: pagesState?.roboticsCloud?.region!,
        fleetName: url?.fleetName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !environments,
        setPages: true,
      },
    );
  }

  function handleGetNamespace() {
    getNamespace(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.name!,
        namespaceName: url?.fleetName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !environments,
        setPages: true,
      },
    );
  }

  function handleGetRobots() {
    getRobots(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.id!,
        region: pagesState?.roboticsCloud?.region!,
        fleetName: pagesState?.fleet?.name!,
      },
      {
        ifErrorNavigateTo404: !environments,
        setResponse: setEnviroments,
      },
    );
  }

  function handleGetEnvironments() {
    getEnvironments(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.id!,
        region: pagesState?.roboticsCloud?.region!,
        fleetName: pagesState?.fleet?.name!,
      },
      {
        ifErrorNavigateTo404: !environments,
        setResponse: setEnviroments,
      },
    );
  }

  const rows = useMemo(
    () =>
      environments?.map((env) => {
        return {
          name: env?.step1?.details?.name,
          organization: handleSplitOrganizationName(
            pagesState?.organization?.name!,
          ),
          region: pagesState?.roboticsCloud?.name!,
          instance: pagesState?.instance?.name!,
          fleet: pagesState?.fleet?.name!,
          vStatus: env?.step1?.clusters?.environment?.[0]?.status,
          pStatus: env?.step1?.clusters?.environment?.[1]?.status,
          actions: env,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [environments, pagesState, url],
  );

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        align: "left",
        body: ({ name }: { name: string }) => {
          return (
            <InfoCell
              title={name}
              subtitle={orgSplitter(pagesState.organization?.name!)}
              titleURL={`/${orgSplitter(pagesState.organization?.name!)}/${pagesState.roboticsCloud?.name}/${
                pagesState.instance?.name
              }/${pagesState.fleet?.name}/${name}`}
            />
          );
        },
      },
      {
        key: "organization",
        header: "Organization",
        align: "left",
        body: ({ organization }: { organization: string }) => {
          return <BasicCell text={organization} />;
        },
      },
      {
        key: "region",
        header: "Region",
        align: "left",
        body: ({ region }: { region: string }) => {
          return <BasicCell text={region} />;
        },
      },
      {
        key: "instance",
        header: "Cloud Instance",
        align: "left",
        body: ({ instance }: { instance: string }) => {
          return <BasicCell text={instance} />;
        },
      },
      {
        key: "fleet",
        header: applicationMode ? "Namespace" : "Fleet",
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.fleet} />;
        },
      },
      {
        key: "vStatus",
        header: `${applicationMode ? "Application" : "Virtual Robot"} Status`,
        align: "left",
        body: ({ vStatus }: { vStatus: string }) => {
          return <StateCell state={vStatus} />;
        },
      },
      !applicationMode && {
        key: "pStatus",
        header: `Physical ${applicationMode ? "Application" : "Robot"} Status`,
        align: "left",
        body: ({ pStatus }: { pStatus: string }) => {
          if (!pStatus) {
            return <BasicCell text="None" />;
          }
          return <StateCell state={pStatus} />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: ({ actions: environment }: { actions: IEnvironment }) => {
          return (
            <EnvironmentActionCells
              data={environment}
              reload={() => setReload((prevState: boolean) => !prevState)}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagesState, setReload, url],
  );

  return {
    rows,
    columns,
    environments,
    handleReload,
  };
}
