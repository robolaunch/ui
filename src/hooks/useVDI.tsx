import { useContext } from "react";
import { VDIContext } from "../contexts/VDIContext";

interface IVDIInterface {
  client: any;
  handleMute: () => void;
  handleSendMessage: (message: string) => void;
  overlay: any;
  remoteDesktopReducer: any;
  setScreenResolution: () => void;
  video: any;
}

const useVDI = () => {
  const useVDI: IVDIInterface = useContext(VDIContext);

  return useVDI;
};

export default useVDI;
