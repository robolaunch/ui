import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarInstancesTabs from "../SidebarInstancesTabs/SidebarInstancesTabs";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import StateCell from "../TableInformationCells/StateCell";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";
import { IPhysicalInstance } from "../../interfaces/global/physicalInstance.interface";
import { orgSplitter } from "../../functions/general.function";

interface IPhysicalInstancesList {
  reload: boolean;
  setItemCount: any;
}

export default function PhysicalInstancesList({
  reload,
  setItemCount,
}: IPhysicalInstancesList): ReactElement {
  const [responsePhysicalInstances, setResponsePhysicalInstances] = useState<
    IPhysicalInstance[] | null
  >();

  const { getPhysicalInstancesFC } = useFunctions();
  const { sidebarState, selectedState } = useMain();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance
      ) {
        setResponsePhysicalInstances(null);
        handleGetPhysicalInstances();
      }

      const timer = setInterval(() => {
        selectedState?.organization &&
          selectedState?.roboticsCloud &&
          selectedState?.instance &&
          handleGetPhysicalInstances();
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      reload,
      selectedState.organization,
      selectedState?.roboticsCloud,
      sidebarState?.instanceTab,
    ],
  );

  async function handleGetPhysicalInstances() {
    setResponsePhysicalInstances(
      (await getPhysicalInstancesFC(false, false)) as IPhysicalInstance[],
    );
  }

  return (
    <Fragment>
      <SidebarInstancesTabs />
      {!selectedState?.organization ||
      !selectedState?.roboticsCloud ||
      !selectedState?.instance ? (
        <SidebarInfo
          text={`Select an ${
            !selectedState?.organization
              ? "Organization"
              : !selectedState?.roboticsCloud
                ? "Robotics Cloud"
                : "Cloud Instance"
          } to view Physical Instances.`}
        />
      ) : !Array.isArray(responsePhysicalInstances) ? (
        <SidebarListLoader />
      ) : responsePhysicalInstances.length === 0 ? (
        <SidebarInfo text={`Add a Physical Instances.`} />
      ) : (
        <Fragment>
          {responsePhysicalInstances?.map((instance, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="instance"
                name={instance?.name}
                description={
                  <div className="flex gap-4">
                    <span>({selectedState?.instance?.name})</span>
                    <StateCell state={instance?.status} />
                  </div>
                }
                url={`/${orgSplitter(selectedState?.organization?.name!)}/${
                  selectedState?.roboticsCloud?.name
                }/${instance?.name}/physical-instances`}
                data={instance}
                notSelectable
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
