import useBarcode from "../../../hooks/useBarcode";
import Machine3D from "../../../components/Machine3D/Machine3D";
import Robot3D from "../../../components/Robot3D/Robot3D";
import Scene3D from "../../../components/Scene3D/Scene3D";

export default function App({ ros }: any) {
  const { barcodeItems } = useBarcode();

  return (
    <Scene3D ros={ros}>
      {barcodeItems?.map((barcodeItem: any, barcodeItemIndex: number) => {
        return <Machine3D key={barcodeItemIndex} item={barcodeItem} />;
      })}
      <Robot3D />
      <Machine3D
        item={{
          barcode: "asd",
          waypoint: {
            x: 1,
            y: 2,
            z: 0,
            yaw: 1.57,
          },
        }}
      />
    </Scene3D>
  );
}
