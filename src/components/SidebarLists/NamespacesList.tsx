import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { INamespace } from "../../interfaces/namespace.interface";
import StateCell from "../TableInformationCells/StateCell";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";

interface INamespacesList {
  reload: boolean;
  setItemCount: any;
}

export default function NamespacesList({
  reload,
  setItemCount,
}: INamespacesList): ReactElement {
  const [namespaces, setNamespaces] = useState<INamespace[] | null>(null);
  const { selectedState } = useMain();
  const dispatch = useAppDispatch();
  const { getNamespaces } = useFunctions();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance
      ) {
        setNamespaces(null);
        handleGetNamespaces();
      }

      const timer = setInterval(() => {
        selectedState?.organization &&
          selectedState?.roboticsCloud &&
          selectedState?.instance &&
          handleGetNamespaces();
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      dispatch,
      reload,
      selectedState?.instance,
      selectedState?.organization,
      selectedState?.roboticsCloud,
    ],
  );

  function handleGetNamespaces() {
    getNamespaces(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.name!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setNamespaces,
        setItemCount: setItemCount,
      },
    );
  }

  return (
    <Fragment>
      {!selectedState?.organization ||
      !selectedState?.roboticsCloud ||
      !selectedState?.instance ? (
        <SidebarInfo
          text={`Select an ${
            !selectedState?.organization
              ? "Organization"
              : !selectedState?.roboticsCloud
                ? "Robotics Cloud"
                : "Instance"
          } to view namespaces.`}
        />
      ) : (
        <Fragment>
          {!Array.isArray(namespaces) ? (
            <SidebarListLoader />
          ) : namespaces.length === 0 ? (
            <SidebarInfo text={`Create a Namespace.`} />
          ) : (
            namespaces?.map((fleet, index: number) => {
              return (
                <SidebarListItem
                  key={index}
                  type="fleet"
                  name={fleet?.name}
                  description={
                    <div className="flex gap-2">
                      <div className="flex gap-1.5">
                        <span className="font-medium">VI:</span>
                        <StateCell state={fleet?.status} />
                      </div>
                      {namespaces?.filter(
                        (pFleet) => fleet?.name === pFleet?.status,
                      ).length > 0 && (
                        <div className="flex gap-1.5">
                          <span className="font-medium">PI:</span>
                          <StateCell
                            state={
                              namespaces?.filter(
                                (pFleet) => fleet?.name === pFleet?.name,
                              )[0]?.status
                            }
                          />
                        </div>
                      )}
                    </div>
                  }
                  url={`${
                    selectedState?.organization?.name?.split("_")[1]
                  }/${selectedState?.roboticsCloud?.name}/${
                    selectedState?.instance?.name
                  }/${fleet?.name}`}
                  data={{
                    ...fleet,
                    physicalInstance: namespaces?.filter(
                      (pFleet) =>
                        fleet?.name === pFleet?.name &&
                        pFleet?.status !== "Ready",
                    ),
                  }}
                  selected={fleet.name === selectedState?.fleet?.name}
                />
              );
            })
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
