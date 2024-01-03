import StateCell from "../components/TableInformationCells/StateCell";
import { Fragment, useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { IDataScienceApp } from "../interfaces/environmentInterfaces";
import BasicCell from "../components/TableInformationCells/BasicCell";
import DataScienceLogs from "../components/DataScienceLogs/DataScienceLogs";
import URLCell from "../components/TableInformationCells/URLCell";
import StartStopCell from "../components/TableInformationCells/StartStopCell";

export function DataScienceTableData() {
  const [responseApps, setResponseApps] = useState<
    IDataScienceApp[] | undefined
  >();
  const [reload, setReload] = useState<boolean>(false);
  const { getDataScienceApps, createDataScienceApp, deleteDataScienceApp } =
    useFunctions();
  const url = useParams();

  function handleReload() {
    setResponseApps(undefined);
    setReload(!reload);
  }

  function handleGetApps() {
    getDataScienceApps({
      setResponse: setResponseApps,
      ifErrorNavigateTo404: false,
    });
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
      responseApps?.map((app: IDataScienceApp) => {
        return {
          key: app?.name,
          name: app,
          internalIP: app?.internalServiceEndpoint,
          externalIP: app?.externalServiceEndpoint,
          log: app?.applicationLog,
          status: app?.status,
          toggleState: app,
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
        body: (rowData: any) => {
          return <InfoCell title={rowData?.name?.name} />;
        },
      },
      {
        key: "internalIP",
        header: "Internal Endpoint",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.internalIP} />;
        },
      },
      {
        key: "externalIP",
        header: "External Endpoint",
        body: (rowData: any) => {
          return (
            <Fragment>
              {rowData?.externalIP === "Not Deployed" ? (
                <p className="text-xs text-light-700">Not Deployed</p>
              ) : (
                <URLCell
                  text={rowData?.externalIP}
                  url={rowData?.externalIP}
                  target="_blank"
                />
              )}
            </Fragment>
          );
        },
      },
      {
        key: "log",
        header: "Logs",
        align: "left",
        body: (rowData: any) => {
          return (
            <Fragment>
              {rowData?.log ? (
                <DataScienceLogs log={rowData?.log} />
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
        body: (rowData: any) => {
          return <StateCell state={rowData?.status} />;
        },
      },
      {
        key: "toggleState",
        header: "Actions",
        body: (rowData: any) => {
          console.log(rowData);
          return (
            // <ToggleCell
            //   isChecked={(() => {
            //     switch (rowData?.toggleState?.status) {
            //       case "Ready":
            //         return true;
            //       default:
            //         return false;
            //     }
            //   })()}
            //   loading={(() => {
            //     switch (rowData?.toggleState?.status) {
            //       case "Not Deployed":
            //         return false;
            //       case "Ready":
            //         return false;
            //       default:
            //         return true;
            //     }
            //   })()}
            //   disabled={(() => {
            //     switch (rowData?.status) {
            //       case "Not Deployed":
            //         return false;
            //       case "Ready":
            //         return false;
            //       default:
            //         return true;
            //     }
            //   })()}
            //   onOpenHandle={() => {
            //     createDataScienceApp({
            //       applicationName: rowData?.toggleState?.name,
            //     });
            //     setTimeout(() => {
            //       handleReload();
            //     }, 1000);
            //   }}
            //   onCloseHandle={() => {
            //     deleteDataScienceApp({
            //       applicationName: rowData?.toggleState?.name,
            //     });
            //     setTimeout(() => {
            //       handleReload();
            //     }, 1000);
            //   }}
            // />
            <StartStopCell
              isRunning={(() => {
                switch (rowData?.status) {
                  case "Ready":
                    return true;
                  default:
                    return false;
                }
              })()}
              handleStart={() => {
                createDataScienceApp({
                  applicationName: rowData?.toggleState?.name,
                });
                setTimeout(() => {
                  handleReload();
                }, 1000);
              }}
              handleStop={() => {
                deleteDataScienceApp({
                  applicationName: rowData?.toggleState?.name,
                });
                setTimeout(() => {
                  handleReload();
                }, 1000);
              }}
              disabled={(() => {
                switch (rowData?.status) {
                  case "Not Deployed":
                    return false;
                  case "Ready":
                    return false;
                  default:
                    return true;
                }
              })()}
              modalText={
                (() => {
                  switch (rowData?.status) {
                    case "Ready":
                      return "Are you sure you want to stop this application?";
                    default:
                      return "Are you sure you want to start this application?";
                  }
                })() || ""
              }
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
