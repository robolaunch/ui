export interface IInstance {
  name: string;
  region: string;
  instanceId: string;
  instanceState: string;
  instanceType: string;
  instanceCloudState: string;
  cloudInstanceResource: any;
  physicalInstanceResource: any;
}
