export interface ITrialState {
  ip: string | null;
  time: {
    remainingTime: number | null;
    viewer: {
      h: number;
      m: number;
      s: number;
    };
  };
  organization: any;
  roboticsCloud: any;
  instance: any;
  fleet: any;
}
export interface IuseTrial {
  trialState: ITrialState;
  setTrialState: React.Dispatch<React.SetStateAction<ITrialState>>;
  handleReload: () => void;
}
