export interface IBarcodeItem {
  barcodes?: {
    barcode: string;
    time: number;
    location_z: number;
    sensorId: number;
    taskId: string;
  }[];
  barcode: string;
  sensorid?: string;
  taskid?: string;
  location_x: number;
  location_y: number;
  location_z?: number;
  time?: number;
  yaw: number;
}

export interface IBarcodeSnapshot {
  name: string;
  time: number;
  readableDate: string;
}
