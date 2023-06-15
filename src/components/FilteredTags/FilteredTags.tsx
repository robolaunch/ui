import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import useSidebar from "../../hooks/useSidebar";

export default function FilteredTags() {
  const { setSidebarState, selectedState, setSelectedState } = useSidebar();

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
            {selectedState?.organization?.organizationName}
          </span>
          <MdOutlineCancel
            className="text-layer-secondary-900 cursor-pointer"
            onClick={() => {
              setSelectedState({
                ...selectedState,
                organization: null,
                roboticsCloud: null,
                instance: null,
                fleet: null,
              });
              setSidebarState((prevState: any) => {
                return { ...prevState, page: "organization" };
              });
            }}
            size={14}
          />
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
          <MdOutlineCancel
            className="text-layer-secondary-900 cursor-pointer"
            onClick={() => {
              setSelectedState({
                ...selectedState,
                roboticsCloud: null,
                instance: null,
                fleet: null,
              });
              setSidebarState((prevState: any) => {
                return { ...prevState, page: "roboticscloud" };
              });
            }}
            size={14}
          />
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
          <MdOutlineCancel
            className="text-layer-secondary-900 cursor-pointer"
            onClick={() => {
              setSelectedState({
                ...selectedState,
                instance: null,
                fleet: null,
              });
              setSidebarState((prevState: any) => {
                return { ...prevState, page: "instance" };
              });
            }}
            size={14}
          />
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
          <MdOutlineCancel
            className="text-layer-secondary-900 cursor-pointer"
            onClick={() => {
              setSelectedState({ ...selectedState, fleet: null });
              setSidebarState((prevState: any) => {
                return { ...prevState, page: "fleet" };
              });
            }}
            size={14}
          />
        </div>
      )}
    </div>
  );
}
