import { organizationNameViewer } from "../../functions/GeneralFunctions";
import { envApplication } from "../../helpers/envProvider";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";
import { toast } from "sonner";

interface ISidebarListItem {
  name: string;
  description: string | ReactElement | ReactElement[];
  type: Itype;
  url: string;
  data?: any;
  selected?: boolean;
  notSelectable?: boolean;
}

type Itype = "organization" | "roboticscloud" | "instance" | "fleet" | "robot";

export default function SidebarListItem({
  name,
  description,
  type,
  url,
  data,
  selected,
  notSelectable,
}: ISidebarListItem): ReactElement {
  const { selectedState, setSelectedState, sidebarState, setSidebarState } =
    useMain();
  const navigate = useNavigate();

  const handleSelectItem = () => {
    switch (type) {
      case "organization":
        if (
          selectedState?.organization?.organizationName ===
          data?.organizationName
        ) {
          setSelectedState({
            ...selectedState,
            organization: null,
            roboticsCloud: null,
            instance: null,
            fleet: null,
          });
        } else {
          setSelectedState({
            ...selectedState,
            organization: data,
            roboticsCloud: null,
            instance: null,
            fleet: null,
          });
          setSidebarState({ ...sidebarState, page: "roboticscloud" });
        }
        break;
      case "roboticscloud":
        if (selectedState?.roboticsCloud?.name === data?.name) {
          setSelectedState({
            ...selectedState,
            roboticsCloud: null,
            instance: null,
            fleet: null,
          });
        } else {
          setSelectedState({
            ...selectedState,
            roboticsCloud: data,
            instance: null,
            fleet: null,
          });
          setSidebarState({ ...sidebarState, page: "instance" });
        }
        break;
      case "instance":
        if (
          data?.instanceCloudState === "ConnectionHub_Ready" &&
          data?.instanceState === "running"
        ) {
          if (selectedState?.instance?.name === data?.name) {
            setSelectedState({
              ...selectedState,
              instance: null,
              fleet: null,
            });
          } else {
            setSelectedState({ ...selectedState, instance: data, fleet: null });
            setSidebarState({ ...sidebarState, page: "fleet" });
          }
        } else {
          toast.error(
            "Instance is not selectable now. Please try again later.",
          );
        }
        break;
      case "fleet":
        if (
          data?.namespaceStatus === "Active" ||
          (data?.fleetStatus === "Ready" &&
            data?.physicalInstance?.length === 0)
        ) {
          if (selectedState?.fleet?.name === data?.name) {
            setSelectedState({ ...selectedState, fleet: null });
          } else {
            setSelectedState({ ...selectedState, fleet: data });
            setSidebarState({ ...sidebarState, page: "robot" });
          }
        } else {
          toast.error("Fleet is not selectable now. Please try again later.");
        }
        break;
      case "robot":
        setSidebarState({ ...sidebarState, isOpen: false });
        navigate(
          `/${organizationNameViewer({
            organizationName: selectedState?.organization
              ?.organizationName as string,
            capitalization: false,
          })}/${selectedState?.roboticsCloud?.name}/${selectedState?.instance
            ?.name}/${selectedState?.fleet?.name}/${data?.name}`,
        );
    }
  };

  function handleNotSelectableClick() {
    switch (type) {
      case "organization":
        setSelectedState({
          ...selectedState,
          organization: data,
          roboticsCloud: null,
          instance: null,
          fleet: null,
        });
        setSidebarState({ ...sidebarState, isOpen: false });
        navigate(url);
        break;
      case "roboticscloud":
        setSelectedState({
          ...selectedState,
          roboticsCloud: data,
          instance: null,
          fleet: null,
        });
        setSidebarState({ ...sidebarState, isOpen: false });
        navigate(url);
        break;
      case "instance":
        if (data?.instanceCloudState === "ConnectionHub_Ready") {
          setSelectedState({
            ...selectedState,
            instance: data,
            fleet: null,
          });
          setSidebarState({ ...sidebarState, isOpen: false });
          navigate(url);
        } else {
          toast.error(
            "Instance is not selectable now. Please try again later.",
          );
        }
        break;
      case "fleet":
        if (
          data?.fleetStatus === "Ready" ||
          data?.namespaceStatus === "Active"
        ) {
          setSelectedState({ ...selectedState, fleet: data });
          setSidebarState({ ...sidebarState, isOpen: false });
          navigate(url);
        } else {
          toast.error("Fleet is not selectable now. Please try again later.");
        }

        break;
    }
  }

  return (
    <div
      key={name}
      className={`animate__animated animate__fadeIn transition-300 flex w-full cursor-pointer select-none items-center justify-between rounded-lg border hover:scale-[0.985]
      ${
        selected
          ? "border-light-300 bg-light-100 shadow"
          : "border-light-200 bg-light-50 shadow-sm"
      }
      `}
    >
      <div
        onClick={() => handleSelectItem()}
        className={`flex w-full gap-4 rounded-l-lg p-2.5 
        ${selected ? " hover:bg-light-200" : " hover:bg-light-100"} 
        `}
      >
        <img
          alt="rl"
          draggable="false"
          className="w-8"
          src={`/svg/general/${
            envApplication && type === "robot" ? "application" : type
          }/${envApplication && type === "robot" ? "application" : type}-${
            selected ? "blue" : "dark"
          }.svg`}
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs font-light">{description}</p>
        </div>
      </div>
      {!notSelectable && (
        <div
          onClick={() => handleNotSelectableClick()}
          className={`transition-300 flex h-full items-center justify-center border-l px-3 ${
            selected
              ? "border-light-300 hover:bg-light-200"
              : "border-light-200 hover:bg-light-100"
          } `}
        >
          <MdKeyboardArrowRight size={26} />
        </div>
      )}
    </div>
  );
}
