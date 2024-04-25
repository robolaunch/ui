import { Fragment, ReactElement } from "react";
import useBarcode from "../../hooks/useBarcode";
import Card from "../Card/Card";

export default function RMBarcodeMapper(): ReactElement {
  const { snapshots, setSelectedSnapshot, selectedSnapshot } = useBarcode();

  return (
    <Fragment>
      {[null, ...snapshots]?.map((snapshot, index: number) => {
        return (
          <Card
            key={index}
            onClick={() => setSelectedSnapshot(snapshot)}
            className={`flex !h-16 cursor-pointer flex-col items-center justify-center gap-1 p-2 text-xs font-medium shadow-sm ${selectedSnapshot?.readableDate === snapshot?.readableDate ? "border border-primary-500 text-primary-700" : "bg-white text-dark-700"}`}
          >
            <span>{snapshot?.name}</span>
            <span>{snapshot?.readableDate || "Now"}</span>
          </Card>
        );
      })}
    </Fragment>
  );
}
