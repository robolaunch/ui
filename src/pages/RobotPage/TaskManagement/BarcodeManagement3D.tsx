import useBarcode from "../../../hooks/useBarcode";
import Machine3D from "../../../components/Machine3D/Machine3D";
import Robot3D from "../../../components/Robot3D/Robot3D";
import Scene3D from "../../../components/Scene3D/Scene3D";

export default function App({ ros }: any) {
  const { barcodeItems } = useBarcode();

  return (
    <Scene3D>
      {barcodeItems
        ?.reverse()
        ?.map((barcodeItem: any, barcodeItemIndex: number) => {
          return (
            <Machine3D
              key={`${barcodeItemIndex}`}
              position={[
                barcodeItem?.coordinates?.x,
                barcodeItem?.barcodes?.length / 2,
                barcodeItem?.coordinates?.y,
              ]}
              barcodes={barcodeItem?.barcodes}
            />
          );
        })}
      <Robot3D />
    </Scene3D>
  );
}
