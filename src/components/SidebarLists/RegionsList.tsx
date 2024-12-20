import { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import SidebarSelectInfo from "../SidebarInfo/SidebarInfo";
import StateCell from "../TableInformationCells/StateCell";
import BasicCell from "../TableInformationCells/BasicCell";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";
import { IRegion } from "../../interfaces/global/region.interface";
import { orgSplitter } from "../../functions/general.function";

interface IRegionsList {
  reload: boolean;
}

export default function RegionsList({ reload }: IRegionsList): ReactElement {
  const [regions, setRegions] = useState<IRegion[] | null>(null);
  const { selectedState } = useMain();
  const { getRegionsFC } = useFunctions();

  useEffect(() => {
    if (selectedState?.organization) {
      handleGetRoboticsClouds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  async function handleGetRoboticsClouds() {
    setRegions(null);
    setRegions(await getRegionsFC(false, false));
  }

  return (
    <Fragment>
      {!selectedState?.organization ? (
        <SidebarSelectInfo text={`Select an Organization to view instances.`} />
      ) : (
        <Fragment>
          {!Array.isArray(regions) ? (
            <SidebarListLoader />
          ) : Array.isArray(regions) && !regions?.length ? (
            <SidebarSelectInfo text={`Create a Region.`} />
          ) : (
            regions?.map((roboticsCloud: any, index: number) => {
              return (
                <SidebarListItem
                  key={index}
                  type="roboticscloud"
                  name={roboticsCloud?.name}
                  description={
                    <div className="flex gap-2">
                      <StateCell state={"Ready"} />
                      <BasicCell text={`Region: ${roboticsCloud?.region}`} />
                    </div>
                  }
                  url={`/${orgSplitter(
                    selectedState?.organization?.name!,
                  )}/${roboticsCloud?.name}`}
                  data={roboticsCloud}
                  selected={
                    roboticsCloud?.name === selectedState?.roboticsCloud?.name
                  }
                />
              );
            })
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
