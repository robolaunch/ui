import TableActionButtons, {
  ITableActionButtons,
} from "../TableActionButtons/TableActionButtons";
import { ReactElement } from "react";

export default function TemporaryActionCells(
  props: ITableActionButtons,
): ReactElement {
  return <TableActionButtons {...props} />;
}
