import CloudInstancesListItemDesc from "../CloudInstancesListItemDesc/CloudInstancesListItemDesc";
import SidebarInstancesTabs from "../SidebarInstancesTabs/SidebarInstancesTabs";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";
import { ICloudInstance } from "../../interfaces/cloudInstance.interface";
import { orgSplitter } from "../../functions/string.splitter.function";

interface ICloudInstancesList {
  reload: boolean;
  setItemCount: any;
}

export default function CloudInstancesList({
  reload,
  setItemCount,
}: ICloudInstancesList): ReactElement {
  const [instances, setInstances] = useState<ICloudInstance[] | null>(null);
  const { selectedState, applicationMode } = useMain();
  const { getInstances } = useFunctions();

  useEffect(
    () => {
      if (selectedState?.organization && selectedState?.roboticsCloud) {
        setInstances(null);
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
        setResponse: setInstances,
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
      ) : !Array.isArray(instances) ? (
        <SidebarListLoader />
      ) : instances.length === 0 ? (
        <SidebarInfo text={`Create an Cloud Instances.`} />
      ) : (
        <Fragment>
          {instances?.map((instance, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="instance"
                name={
                  <div className="flex items-center gap-2.5">
                    <p>{instance?.name}</p>
                    <div className="flex items-center gap-1 text-[0.66rem]">
                      <span className="font-medium">Type:</span>
                      <p className="font-light">{instance?.providerModel}</p>
                    </div>
                  </div>
                }
                description={<CloudInstancesListItemDesc instance={instance} />}
                url={`/${orgSplitter(selectedState?.organization?.name!)}/${selectedState?.roboticsCloud?.name}/${instance?.name}`}
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
