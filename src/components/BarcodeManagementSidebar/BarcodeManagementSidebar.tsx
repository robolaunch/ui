import useBarcode from "../../hooks/useBarcode";
import { Fragment, ReactElement } from "react";
import Card from "../Card/Card";

export default function BarcodeManagementSidebar(): ReactElement {
  const { snapshots, selectedSnapshot, setSelectedSnapshot } = useBarcode();

  return (
    <Card className="relative flex !h-[688px] !w-80 flex-col gap-2 overflow-auto p-5">
      <div
        className={`flex w-full cursor-pointer flex-col items-center justify-center gap-1 text-xs text-primary-500`}
      >
        <span>Snapshots</span>
        <div className={`h-[2px] w-full bg-primary-500`} />
      </div>

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
    </Card>
  );
}
