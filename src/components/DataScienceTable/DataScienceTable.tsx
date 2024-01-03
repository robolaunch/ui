import { ReactElement } from "react";
import { DataScienceTableData } from "../../controllers/DataScienceTableData";
import GeneralTable from "../Table/GeneralTable";

export default function DataScienceTable(): ReactElement {
  const { data, columns, responseApps, handleReload } = DataScienceTableData();

  return (
    <GeneralTable
      type="datascience"
      title="Data Science Apps"
      data={data}
      columns={columns}
      loading={!Array.isArray(responseApps)}
      handleReload={handleReload}
    />
  );
}
