export interface IBarcodeItem {
  barcodes?: {
    barcode: string;
    time: number;
    location_z: number;
    sensorId: number;
  }[];
  barcode: string;
  sensorId?: string;
  location_x: number;
  location_y: number;
  location_z?: number;
  time?: number;
  yaw: number;
}
