import StartStopCell from "../components/TableInformationCells/StartStopCell";
import DataScienceLogs from "../components/DataScienceLogs/DataScienceLogs";
import StateCell from "../components/TableInformationCells/StateCell";
import BasicCell from "../components/TableInformationCells/BasicCell";
import URLCell from "../components/TableInformationCells/URLCell";
import { Fragment, useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import TextCopy from "../components/TextCopy/TextCopy";
import IconInfoCell from "../components/TableInformationCells/IconInfoCell";
import { IDataScienceApp } from "../interfaces/global/dataSciende.interface";

export function DataScienceTableData() {
  const [responseApps, setResponseApps] = useState<
    IDataScienceApp[] | undefined
  >();
  const [reload, setReload] = useState<boolean>(false);
  const {
    getDataScienceAppsFC,
    createDataScienceAppFC,
    deleteDataScienceAppFC,
  } = useFunctions();
  const url = useParams();

  function handleReload() {
    setResponseApps(undefined);
    setReload(!reload);
  }

  async function handleGetApps() {
    setResponseApps(await getDataScienceAppsFC(false, false));
  }

  useEffect(() => {
    handleGetApps();

    const timer = setInterval(() => {
      handleGetApps();
    }, 10000);

    return () => clearInterval(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, url]);

  const data = useMemo(
    () =>
      responseApps?.map((app) => {
        return {
          key: app?.name,
          name: app?.name,
          internalIP: app?.internalEndpoint,
          externalIP: app?.externalEndpoint,
          token: app?.token,
          log: app?.log,
          status: app?.status,
          actions: app,
        };
      }) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseApps, reload, url],
  );

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ name }: { name: string }) => {
          return (
            <IconInfoCell
              iconHref={`/svg/apps/${name?.split("-")[0]}.svg`}
              title={name}
            />
          );
        },
      },
      {
        key: "internalIP",
        header: "Internal Endpoint",
        body: ({ internalIP }: { internalIP: string }) => {
          return <BasicCell text={internalIP} />;
        },
      },
      {
        key: "externalIP",
        header: "External Endpoint",
        body: ({ externalIP }: { externalIP: string }) => {
          return (
            <Fragment>
              {externalIP === "Not Deployed" ? (
                <p className="text-xs text-light-700">Not Deployed</p>
              ) : (
                <URLCell
                  text={externalIP?.split("#")?.[0]}
                  url={externalIP}
                  target="_blank"
                />
              )}
            </Fragment>
          );
        },
      },
      {
        key: "token",
        header: "Bearer Token",
        body: ({ token }: { token: string }) => {
          return (
            <Fragment>
              {token ? (
                <TextCopy text={token} />
              ) : (
                <p className="w-fit text-xs text-light-700"> None</p>
              )}
            </Fragment>
          );
        },
      },
      {
        key: "log",
        header: "Logs",
        align: "left",
        body: ({ log }: { log: string }) => {
          return (
            <Fragment>
              {log ? (
                <DataScienceLogs log={log} />
              ) : (
                <p className="text-xs text-light-700">No logs available</p>
              )}
            </Fragment>
          );
        },
      },
      {
        key: "status",
        header: "Status",
        align: "left",
        body: ({ status }: { status: string }) => {
          return <StateCell state={status} />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        body: ({ actions: app }: { actions: IDataScienceApp }) => {
          return (
            <StartStopCell
              isRunning={(() => {
                switch (app?.status) {
                  case "Ready":
                    return true;
                  default:
                    return false;
                }
              })()}
              handleStart={() => {
                createDataScienceAppFC({
                  applicationName: app?.name,
                });
                setTimeout(() => {
                  handleReload();
                }, 1000);
              }}
              handleStop={() => {
                deleteDataScienceAppFC({
                  applicationName: app?.name,
                });
                setTimeout(() => {
                  handleReload();
                }, 1000);
              }}
              disabled={(() => {
                if (!app?.isDeletable) {
                  return true;
                }
              })()}
              loading={(() => {
                if (app?.status === "Ready" || app?.status === "Not Deployed") {
                  return false;
                }
                return true;
              })()}
              modalText={(() => {
                switch (app?.status) {
                  case "Ready":
                    return "Are you sure you want to stop this application?";
                  default:
                    return "Are you sure you want to start this application?";
                }
              })()}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseApps, reload, url],
  );

  return {
    data,
    columns,
    responseApps,
    handleReload,
  };
}
