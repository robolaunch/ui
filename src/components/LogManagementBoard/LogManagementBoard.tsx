import { ReactElement } from "react";
import { LazyLog } from "@melloware/react-logviewer";
import Card from "../Card/Card";
import useBarcode from "../../hooks/useBarcode";

export default function LogManagementBoard(): ReactElement {
  const { currentLog } = useBarcode();

  return (
    <Card className="wh-full">
      <LazyLog text={currentLog || ""} />
    </Card>
  );
}
