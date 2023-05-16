import { useContext } from "react";
import { StreamContext } from "../contexts/StreamContext";
import { IRemoteDesktopInterface } from "../interfaces/remoteDesktopInterfaces";

const useRemoteDesktopStream = () => {
  const useRemoteDesktopStream: IRemoteDesktopInterface =
    useContext(StreamContext);

  return useRemoteDesktopStream;
};

export default useRemoteDesktopStream;
