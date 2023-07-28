export interface IVDIInterface {
  client: any;
  handleMute: () => void;
  handleSendMessage: (message: string) => void;
  overlay: any;
  remoteDesktopReducer: any;
  setScreenResolution: () => void;
  video: any;
}
