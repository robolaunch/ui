import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { IuseSidebar } from "../interfaces/sidebarInterfaces";

const useSidebar = () => {
  const useSidebar: IuseSidebar = useContext(SidebarContext);

  return useSidebar;
};

export default useSidebar;
