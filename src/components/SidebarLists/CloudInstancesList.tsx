import CloudInstancesListItemDesc from "../CloudInstancesListItemDesc/CloudInstancesListItemDesc";
import SidebarInstancesTabs from "../SidebarInstancesTabs/SidebarInstancesTabs";
import { organizationNameViewer } from "../../functions/GeneralFunctions";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";

interface ICloudInstancesList {
  reload: boolean;
  setItemCount: any;
}

export default function CloudInstancesList({
  reload,
  setItemCount,
}: ICloudInstancesList): ReactElement {
  const [responseInstances, setResponseInstances] = useState<any[] | undefined>(
    undefined,
  );
  const { selectedState, applicationMode } = useMain();
  const { getInstances } = useFunctions();

  useEffect(
    () => {
      if (selectedState?.organization && selectedState?.roboticsCloud) {
        setResponseInstances(undefined);
        handleGetCloudInstances();
      }

      const timer = setInterval(() => {
        selectedState?.organization &&
          selectedState?.roboticsCloud &&
          handleGetCloudInstances();
      }, 20000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reload],
  );

  function handleGetCloudInstances() {
    getInstances(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        region: selectedState?.roboticsCloud?.region!,
        details: true,
      },
      {
        setResponse: setResponseInstances,
        ifErrorNavigateTo404: false,
        setItemCount: setItemCount,
      },
    );
  }

  return (
    <Fragment>
      {!(applicationMode || applicationMode) && <SidebarInstancesTabs />}
      {!selectedState?.organization || !selectedState?.roboticsCloud ? (
        <SidebarInfo
          text={`Select an ${
            !selectedState?.organization ? "Organization" : "Robotics Cloud"
          } to view instances.`}
        />
      ) : !Array.isArray(responseInstances) ? (
        <SidebarListLoader />
      ) : responseInstances.length === 0 ? (
        <SidebarInfo text={`Create an Cloud Instances.`} />
      ) : (
        <Fragment>
          {responseInstances?.map((instance: any, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="instance"
                name={instance?.name}
                description={<CloudInstancesListItemDesc instance={instance} />}
                url={`/${organizationNameViewer({
                  organizationName: selectedState?.organization?.name!,
                  capitalization: false,
                })}/${selectedState?.roboticsCloud?.name}/${instance?.name}`}
                data={instance}
                selected={instance?.name === selectedState?.instance?.name}
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
