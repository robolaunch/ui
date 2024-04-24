import { ReactElement, useEffect, useState } from "react";
import { LazyLog } from "@melloware/react-logviewer";
import Card from "../Card/Card";
import useBarcode from "../../hooks/useBarcode";

export default function LogManagementBoard(): ReactElement {
  const { currentLog } = useBarcode();
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    console.log(currentLog);
    setKey((prev) => prev + 1);
  }, [currentLog]);

  return (
    <Card className="wh-full">
      <LazyLog key={key} text={currentLog || ""} />
    </Card>
  );
}
