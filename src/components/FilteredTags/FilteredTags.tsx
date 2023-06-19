import React from "react";
import useSidebar from "../../hooks/useSidebar";
import organizationNameViewer from "../../helpers/organizationNameViewer";

export default function FilteredTags() {
  const { selectedState } = useSidebar();

  return (
    <div className="flex flex-wrap gap-2 pb-4 animate__animated animate__fadeIn">
      {selectedState?.organization && (
        <div className="col-span-1 max-w-fit flex items-center gap-2 border border-layer-secondary-400 bg-layer-secondary-100 rounded p-1">
          <img
            className="w-4 h-4"
            src="/svg/general/organization/organization-blue.svg"
            alt="robolaunch"
          />
          <span className="text-xs text-layer-secondary-900 cursor-default">
            {organizationNameViewer({
              organizationName: selectedState?.organization?.name,
              capitalization: false,
            })}
          </span>
        </div>
      )}
      {selectedState?.roboticsCloud && (
        <div className="col-span-1 max-w-fit flex items-center gap-2 border border-layer-secondary-400 bg-layer-secondary-100 rounded p-1">
          <img
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
