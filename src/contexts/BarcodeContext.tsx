import { IBarcodeItem } from "../interfaces/global/barcode.interface";
import { createContext, useEffect, useState } from "react";
import useFunctions from "../hooks/useFunctions";

export const BarcodeContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [findBarcodeInput, setFindBarcodeInput] = useState<string>("");

  const [barcodeItems, setBarcodeItems] = useState<IBarcodeItem[]>([]);

  const { getBarcodesFC } = useFunctions();

  useEffect(() => {
    handleGetBarcodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleGetBarcodes() {
    const barcodes = await getBarcodesFC();

    barcodes?.map((barcode: IBarcodeItem) => barcodeClustering(barcode));
  }

  useEffect(() => {
    console.log("barcodeItems", barcodeItems);
  }, [barcodeItems]);

  function barcodeClustering(newBarcode: IBarcodeItem) {
    const clusteringScale = 0.3;

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
                  sensorid: newBarcode.sensorId,
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
          return [...prevData, newBarcode];
        }
      } else {
        // If barcodeItems is initially empty, just return the newBarcode in an array
        return [newBarcode];
      }
    });
  }

  useEffect(() => {
    console.log("barcodeItems", barcodeItems);
  }, [barcodeItems]);

  return (
    <BarcodeContext.Provider
      value={{
        barcodeItems,
        setBarcodeItems,
        findBarcodeInput,
        setFindBarcodeInput,
      }}
    >
      {children}
    </BarcodeContext.Provider>
  );
};
