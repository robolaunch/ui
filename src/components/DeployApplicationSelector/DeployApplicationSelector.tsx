import React, { Fragment, ReactElement, useEffect, useState } from "react";
import useFunctions from "../../hooks/useFunctions";
import Seperator from "../Seperator/Seperator";
import InputSelect from "../InputSelect/InputSelect";

export default function DeployApplicationSelector(): ReactElement {
  const [responseOrganizations, setResponseOrganizations] =
    useState<any>(undefined);
  const [responseRoboticsClouds, setResponseRoboticsClouds] =
    useState<any>(undefined);
  const [responseInstances, setResponseInstances] = useState<any>(undefined);
  const [responseFleets, setResponseFleets] = useState<any>(undefined);
  const [allEnvironments, setAllEnvironments] = useState<any>(undefined);

  const { getOrganizations, getRoboticsClouds, getInstances, getFleets } =
    useFunctions();

  useEffect(() => {
    if (!responseOrganizations) {
      getOrganizations({
        setResponse: setResponseOrganizations,
      });
    } else if (
      !responseRoboticsClouds &&
      !allEnvironments &&
      allEnvironments?.[0]?.selected
    ) {
      getRoboticsClouds(
        {
          organizationId: responseOrganizations?.organizationId,
        },
        {
          setResponse: setResponseRoboticsClouds,
        }
      );
    } else if (
      !responseInstances &&
      allEnvironments?.[0]?.selected &&
      allEnvironments?.[1]?.selected
    ) {
      getInstances(
        {
          organizationId: responseOrganizations?.organizationId,
          roboticsCloudName: responseRoboticsClouds?.name,
          region: responseRoboticsClouds?.region,
          details: false,
        },
        {
          setResponse: setResponseInstances,
        }
      );
    } else if (
      !responseFleets &&
      allEnvironments?.[0]?.selected &&
      allEnvironments?.[1]?.selected &&
      allEnvironments?.[2]?.selected
    ) {
      getFleets(
        {
          organizationId: responseOrganizations?.organizationId,
          roboticsCloudName: responseRoboticsClouds?.name,
          region: responseRoboticsClouds?.region,
          instanceId: responseInstances?.instanceId,
        },
        {
          setResponse: setResponseFleets,
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    responseOrganizations,
    responseRoboticsClouds,
    responseInstances,
    responseFleets,
    allEnvironments,
  ]);

  useEffect(() => {
    setAllEnvironments([
      {
        name: "organization",
        data: responseOrganizations,
        selected: undefined,
      },
      {
        name: "roboticscloud",
        data: responseRoboticsClouds,
        selected: undefined,
      },
      {
        name: "instance",
        data: responseInstances,
        selected: undefined,
      },
      {
        name: "fleet",
        data: responseFleets,
        selected: undefined,
      },
    ]);
  }, [
    responseOrganizations,
    responseRoboticsClouds,
    responseInstances,
    responseFleets,
  ]);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-1">
      {allEnvironments?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-2">
                <img
                  className="w-5 h-5"
                  src={`/svg/general/${item?.name}/${item?.name}-gray.svg`}
                  alt="robolaunch"
                />
                <span className="capitalize text-xs">{item?.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <InputSelect
                  value={
                    allEnvironments?.[index]?.selected?.name ||
                    allEnvironments?.[index]?.selected?.organizationName
                  }
                  className="min-w-[10rem]"
                  //   onChange={(e) => {
                  //     switch (index) {
                  //       case 0:
                  //         setAllEnvironments((prevState: any) => {

                  //             prevState

                  //           return [
                  //                    ...prevState,
                  //             selected: allEnvironments?.[0]?.data?.find(
                  //               (item: any) =>
                  //                 item?.name === e?.target?.value ||
                  //                 item?.organizationName === e?.target?.value
                  //             ),
                  //           ]
                  //         });
                  //         break;
                  //     }
                  //   }}
                >
                  <option value=""></option>
                  {allEnvironments?.[index]?.data?.map(
                    (item: any, index: number) => {
                      return (
                        <option key={index} value={item?.name}>
                          {item?.name || item?.organizationName}
                        </option>
                      );
                    }
                  )}
                </InputSelect>
              </div>
            </div>
            {index !== allEnvironments?.length - 1 && <Seperator />}
          </Fragment>
        );
      })}
    </div>
  );
}
