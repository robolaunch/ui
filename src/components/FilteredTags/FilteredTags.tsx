import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import useSidebar from "../../hooks/useSidebar";

export default function FilteredTags() {
  const { selectedState, setSelectedState } = useSidebar();

  return (
    <div className="grid grid-cols-3 justify-items-center pb-2 animate__animated animate__fadeIn">
      {selectedState?.organization && (
        <div className="col-span-1 max-w-fit flex items-center gap-2 border border-layer-secondary-400 bg-layer-secondary-100 rounded p-1">
          <img
            className="w-4 h-4"
            src="/svg/sidebar/organization/organization-blue.svg"
            alt="robolaunch"
          />
          <span className="text-xs text-layer-secondary-900 cursor-default">
            {selectedState?.organization?.organizationName}
          </span>
          <MdOutlineCancel
            className="text-layer-secondary-900 cursor-pointer"
            onClick={() =>
              setSelectedState({ ...selectedState, organization: null })
            }
            size={14}
          />
        </div>
      )}
      {selectedState?.roboticsCloud && (
        <div className="col-span-1 max-w-fit flex items-center gap-2 border border-layer-secondary-400 bg-layer-secondary-100 rounded p-1">
          <img
            className="w-4 h-4"
            src="/svg/sidebar/organization/organization-blue.svg"
            alt="robolaunch"
          />
          <span className="text-xs text-layer-secondary-900 cursor-default">
            {selectedState?.roboticsCloud?.roboticsCloudName}
          </span>
          <MdOutlineCancel
            className="text-layer-secondary-900 cursor-pointer"
            onClick={() =>
              setSelectedState({ ...selectedState, roboticsCloud: null })
            }
            size={14}
          />
        </div>
      )}
      {selectedState?.fleet && (
        <div className="col-span-1 max-w-fit flex items-center gap-2 border border-layer-secondary-400 bg-layer-secondary-100 rounded p-1">
          <img
            className="w-4 h-4"
            src="/svg/sidebar/organization/organization-blue.svg"
            alt="robolaunch"
          />
          <span className="text-xs text-layer-secondary-900 cursor-default">
            {selectedState?.fleet?.fleetName}
          </span>
          <MdOutlineCancel
            className="text-layer-secondary-900 cursor-pointer"
            onClick={() => setSelectedState({ ...selectedState, fleet: null })}
            size={14}
          />
        </div>
      )}
    </div>
  );
}
