export interface IpagesState {
  organization: any;
  roboticsCloud: any;
  instance: any;
  fleet: any;
}

export interface IusePages {
  pagesState: IpagesState;
  setPagesState: React.Dispatch<React.SetStateAction<IpagesState>>;
}
