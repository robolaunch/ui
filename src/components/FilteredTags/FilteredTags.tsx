import { organizationNameViewer } from "../../functions/GeneralFunctions";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";

export default function FilteredTags(): ReactElement {
  const { selectedState } = useMain();

  return (
    <div className="animate-fadeIn flex flex-wrap gap-2 pb-4">
      {selectedState?.organization && (
        <div className="col-span-1 flex max-w-fit items-center gap-2 rounded border border-secondary-400 bg-secondary-100 p-1">
          <img
            draggable="false"
            className="h-4 w-4"
            src="/svg/general/organization/organization-blue.svg"
            alt="robolaunch"
          />
          <span className="cursor-default text-xs text-secondary-900">
            {organizationNameViewer({
              organizationName: selectedState?.organization?.name,
              capitalization: false,
            })}
          </span>
        </div>
      )}
      {selectedState?.roboticsCloud && (
        <div className="col-span-1 flex max-w-fit items-center gap-2 rounded border border-secondary-400 bg-secondary-100 p-1">
          <img
            draggable="false"
            className="h-4 w-4"
            src="/svg/general/roboticscloud/roboticscloud-blue.svg"
            alt="robolaunch"
          />
          <span className="cursor-default text-xs text-secondary-900">
            {selectedState?.roboticsCloud?.name}
          </span>
        </div>
      )}
      {selectedState?.instance && (
        <div className="col-span-1 flex max-w-fit items-center gap-2 rounded border border-secondary-400 bg-secondary-100 p-1">
          <img
            draggable="false"
            className="h-4 w-4"
            src="/svg/general/instance/instance-blue.svg"
            alt="robolaunch"
          />
          <span className="cursor-default text-xs text-secondary-900">
            {selectedState?.instance?.name}
          </span>
        </div>
      )}
      {selectedState?.fleet && (
        <div className="col-span-1 flex max-w-fit items-center gap-2 rounded border border-secondary-400 bg-secondary-100 p-1">
          <img
            draggable="false"
            className="h-4 w-4"
            src="/svg/general/fleet/fleet-blue.svg"
            alt="robolaunch"
          />
          <span className="cursor-default text-xs text-secondary-900">
            {selectedState?.fleet?.name}
          </span>
        </div>
      )}
    </div>
  );
}
