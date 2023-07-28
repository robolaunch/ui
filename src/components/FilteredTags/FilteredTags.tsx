import React from "react";
import useGeneral from "../../hooks/useGeneral";
import { organizationNameViewer } from "../../functions/GeneralFunctions";

export default function FilteredTags() {
  const { selectedState } = useGeneral();

  return (
    <div className="flex flex-wrap gap-2 pb-4 animate__animated animate__fadeIn">
      {selectedState?.organization && (
        <div className="col-span-1 max-w-fit flex items-center gap-2 border border-layer-secondary-400 bg-layer-secondary-100 rounded p-1">
          <img
            draggable="false"
            className="w-4 h-4"
            src="/svg/general/organization/organization-blue.svg"
            alt="robolaunch"
          />
          <span className="text-xs text-layer-secondary-900 cursor-default">
            {organizationNameViewer({
              organizationName: selectedState?.organization?.organizationName,
              capitalization: false,
            })}
          </span>
        </div>
      )}
      {selectedState?.roboticsCloud && (
        <div className="col-span-1 max-w-fit flex items-center gap-2 border border-layer-secondary-400 bg-layer-secondary-100 rounded p-1">
          <img
            draggable="false"
            className="w-4 h-4"
            src="/svg/general/roboticscloud/roboticscloud-blue.svg"
            alt="robolaunch"
          />
          <span className="text-xs text-layer-secondary-900 cursor-default">
            {selectedState?.roboticsCloud?.name}
          </span>
        </div>
      )}
      {selectedState?.instance && (
        <div className="col-span-1 max-w-fit flex items-center gap-2 border border-layer-secondary-400 bg-layer-secondary-100 rounded p-1">
          <img
            draggable="false"
            className="w-4 h-4"
            src="/svg/general/instance/instance-blue.svg"
            alt="robolaunch"
          />
          <span className="text-xs text-layer-secondary-900 cursor-default">
            {selectedState?.instance?.name}
          </span>
        </div>
      )}
      {selectedState?.fleet && (
        <div className="col-span-1 max-w-fit flex items-center gap-2 border border-layer-secondary-400 bg-layer-secondary-100 rounded p-1">
          <img
            draggable="false"
            className="w-4 h-4"
            src="/svg/general/fleet/fleet-blue.svg"
            alt="robolaunch"
          />
          <span className="text-xs text-layer-secondary-900 cursor-default">
            {selectedState?.fleet?.name}
          </span>
        </div>
      )}
    </div>
  );
}
