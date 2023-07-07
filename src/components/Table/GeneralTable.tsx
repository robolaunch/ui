import React, { ReactElement } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";

interface GeneralTableProps {
  data: any;
  columns: any;
  loading: boolean;
  title: string;
  type: string;
  handleReload?: any;
}

export default function GeneralTable({
  data,
  columns,
  loading,
  title,
  type,
  handleReload,
}: GeneralTableProps): ReactElement {
  return (
    <div
      className="flex flex-col px-4 pt-4 pb-0 rounded-lg shadow-lg bg-layer-light-50 animate__animated animate__fadeIn border border-layer-light-200"
      style={loading ? { backgroundColor: "rgba(0, 0, 0, 0.4)" } : {}}
    >
      <div className="flex px-4 pt-1 pb-8 items-center gap-2">
        <img
          className="w-8"
          src={`/svg/general/${type}/${type}-gray.svg`}
          alt=""
        />
        <h5 className="text-lg font-semibold">{title}</h5>
      </div>
      <DataTable
        className={` ${
          data &&
          columns &&
          !loading &&
          "animate__animated animate__fadeIn transition-all duration-500"
        }`}
        value={data}
        paginator
        loading={loading}
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={20}
        rowHover
        // rowsPerPageOptions={[10, 20, 50]}
        paginatorLeft={
          handleReload ? (
            <Button
              onClick={() => handleReload()}
              type="button"
              icon="pi pi-refresh"
            />
          ) : (
            false
          )
        }
      >
        {columns?.map((col: any, index: number) => {
          return (
            <Column
              style={col?.style || {}}
              className={`animate__animated animate__fadeIn ${col?.className}`}
              key={index}
              field={col.key}
              header={col.header}
              sortable={col.sortable || false}
              filter={col.filter || false}
              align={col.align || "left"}
              body={col.body}
            />
          );
        })}
      </DataTable>
    </div>
  );
}
