import useBarcode from "../../../hooks/useBarcode";
import Machine3D from "../../../components/Machine3D/Machine3D";
import Robot3D from "../../../components/Robot3D/Robot3D";
import Scene3D from "../../../components/Scene3D/Scene3D";

export default function App({ ros }: any) {
  const { barcodeItems } = useBarcode();

  return (
    <div className="animate-fadeIn absolute inset-0">
      <Scene3D ros={ros}>
        {barcodeItems?.map((barcodeItem: any, barcodeItemIndex: number) => {
          return <Machine3D key={barcodeItemIndex} item={barcodeItem} />;
        })}
        <Robot3D />
      </Scene3D>
    </div>
  );
}
