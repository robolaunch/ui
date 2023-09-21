import React from "react";
import useMain from "../../hooks/useMain";
import { organizationNameViewer } from "../../functions/GeneralFunctions";

export default function FilteredTags() {
  const { selectedState } = useMain();

  return (
    <div className="animate__animated animate__fadeIn flex flex-wrap gap-2 pb-4">
      {selectedState?.organization && (
        <div className="col-span-1 flex max-w-fit items-center gap-2 rounded border border-layer-secondary-400 bg-layer-secondary-100 p-1">
          <img
            draggable="false"
            className="h-4 w-4"
            src="/svg/general/organization/organization-blue.svg"
            alt="robolaunch"
          />
          <span className="cursor-default text-xs text-layer-secondary-900">
            {organizationNameViewer({
              organizationName: selectedState?.organization?.organizationName,
              capitalization: false,
            })}
          </span>
        </div>
      )}
      {selectedState?.roboticsCloud && (
        <div className="col-span-1 flex max-w-fit items-center gap-2 rounded border border-layer-secondary-400 bg-layer-secondary-100 p-1">
          <img
            draggable="false"
            className="h-4 w-4"
            src="/svg/general/roboticscloud/roboticscloud-blue.svg"
            alt="robolaunch"
          />
          <span className="cursor-default text-xs text-layer-secondary-900">
            {selectedState?.roboticsCloud?.name}
          </span>
        </div>
      )}
      {selectedState?.instance && (
        <div className="col-span-1 flex max-w-fit items-center gap-2 rounded border border-layer-secondary-400 bg-layer-secondary-100 p-1">
          <img
            draggable="false"
            className="h-4 w-4"
            src="/svg/general/instance/instance-blue.svg"
            alt="robolaunch"
          />
          <span className="cursor-default text-xs text-layer-secondary-900">
            {selectedState?.instance?.name}
          </span>
        </div>
      )}
      {selectedState?.fleet && (
        <div className="col-span-1 flex max-w-fit items-center gap-2 rounded border border-layer-secondary-400 bg-layer-secondary-100 p-1">
          <img
            draggable="false"
            className="h-4 w-4"
            src="/svg/general/fleet/fleet-blue.svg"
            alt="robolaunch"
          />
          <span className="cursor-default text-xs text-layer-secondary-900">
            {selectedState?.fleet?.name}
          </span>
        </div>
      )}
    </div>
  );
}
