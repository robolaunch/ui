export interface IBarcodeItem {
  robotId: string;
  fleetId: string;
  sensorId: string;
  barcode: string;
  waypoint: {
    x: number;
    y: number;
    z: number;
    yaw: number;
  };
}
