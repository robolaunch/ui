import {
  IBarcodeItem,
  IBarcodeSnapshot,
} from "../interfaces/global/barcode.interface";
import { createContext, useEffect, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { ILogItem } from "../interfaces/global/log.interface";

export const BarcodeContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [findBarcodeInput, setFindBarcodeInput] = useState<string>("");

  const [snapshots, setSnapshots] = useState<IBarcodeSnapshot[]>([]);

  const [reload, setReload] = useState<boolean>(false);

  const [selectedSnapshot, setSelectedSnapshot] =
    useState<IBarcodeSnapshot | null>(null);

  const [barcodeItems, setBarcodeItems] = useState<IBarcodeItem[]>([]);

  const { getBarcodesFC, getBarcodeSnapshotsFC, getBarcodeAtSnapshotFC } =
    useFunctions();

  useEffect(() => {
    setBarcodeItems([]);
    if (selectedSnapshot) {
      handleGetBarcodeAtSnapshot({ time: selectedSnapshot!.time });
    } else {
      handleGetBarcodes();
    }

    handleGetBarcodeSnapshots();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSnapshot, reload]);

  function handleReload() {
    setReload((prev) => !prev);
  }

  async function handleGetBarcodes() {
    const barcodes = await getBarcodesFC();

    barcodes?.map((barcode: IBarcodeItem) => barcodeClustering(barcode));
  }

  async function handleGetBarcodeSnapshots() {
    setSnapshots(await getBarcodeSnapshotsFC());
  }

  async function handleGetBarcodeAtSnapshot({ time }: { time: number }) {
    const barcodes = await getBarcodeAtSnapshotFC({ time: time });

    barcodes?.map((barcode: IBarcodeItem) => barcodeClustering(barcode));
  }

  function barcodeClustering(newBarcode: IBarcodeItem) {
    const clusteringScale = 0.3;

    // @ts-ignore
    setBarcodeItems((prevData: IBarcodeItem[]) => {
      if (prevData.length > 0) {
        let shouldCluster = false;

        const updatedData = prevData.map((item) => {
          const itemWaypoint = {
            x: Math.abs(item.location_x),
            y: Math.abs(item.location_y),
          };

          const newItemWaypoint = {
            x: Math.abs(newBarcode?.location_x),
            y: Math.abs(newBarcode?.location_y),
          };

          const diff = {
            x: Math.abs(itemWaypoint.x - newItemWaypoint.x),
            y: Math.abs(itemWaypoint.y - newItemWaypoint.y),
          };

          if (diff.x < clusteringScale && diff.y < clusteringScale) {
            shouldCluster = true;
            return {
              barcodes: [
                ...(item.barcodes || []),
                {
                  barcode: newBarcode.barcode,
                  location_z: newBarcode.location_z,
                  time: newBarcode.time,
                  sensorId: newBarcode.sensorid,
                  taskId: newBarcode.taskid,
                },
              ],
              location_x: item.location_x,
              location_y: item.location_y,
              yaw: item.yaw,
            };
          } else {
            return item;
          }
        });

        if (shouldCluster) {
          return updatedData;
        } else {
          return [
            ...prevData,
            {
              barcodes: [
                ...(newBarcode.barcodes || []),
                {
                  barcode: newBarcode.barcode,
                  location_z: newBarcode.location_z,
                  time: newBarcode.time,
                  sensorId: newBarcode.sensorid,
                  taskId: newBarcode.taskid,
                },
              ],
              location_x: newBarcode.location_x,
              location_y: newBarcode.location_y,
              yaw: newBarcode.yaw,
            },
          ];
        }
      } else {
        // If barcodeItems is initially empty, just return the newBarcode in an array
        return [
          {
            barcodes: [
              {
                barcode: newBarcode.barcode,
                location_z: newBarcode.location_z,
                time: newBarcode.time,
                sensorId: newBarcode.sensorid,
                taskId: newBarcode.taskid,
              },
            ],
            location_x: newBarcode.location_x,
            location_y: newBarcode.location_y,
            yaw: newBarcode.yaw,
          },
        ];
      }
    });
  }

  const [logs, setLogs] = useState<ILogItem[]>([]);
  const [selectedLog, setSelectedLog] = useState<ILogItem | null>(null);
  const [currentLog, setCurrentLog] = useState<string | null>(null);

  const { getLogFC } = useFunctions();

  useEffect(() => {
    console.log(selectedLog);
    selectedLog &&
      handleGetLog({
        logName: selectedLog.path,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLog]);

  async function handleGetLog({ logName }: { logName: string }) {
    setCurrentLog((await getLogFC({ logName: logName })) || "");
  }

  return (
    <BarcodeContext.Provider
      value={{
        barcodeItems,
        setBarcodeItems,
        findBarcodeInput,
        setFindBarcodeInput,
        snapshots,
        setSnapshots,
        selectedSnapshot,
        setSelectedSnapshot,
        handleReload,
        logs,
        setLogs,
        selectedLog,
        setSelectedLog,
        currentLog,
        setCurrentLog,
      }}
    >
      {children}
    </BarcodeContext.Provider>
  );
};
