import React from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";

interface GeneralTableProps {
  data: any;
  columns: any;
  loading: boolean;
  title: string;
  type: string;
  handleReload: any;
}

export const GeneralTable = ({
  data,
  columns,
  loading,
  title,
  type,
  handleReload,
}: GeneralTableProps) => {
  return (
    <div
      className="flex flex-col py-2 rounded-xl shadow-lg bg-lightLayers-50"
      style={loading ? { backgroundColor: "rgba(0, 0, 0, 0.4)" } : {}}
    >
      <div className="flex px-4 py-6 items-center gap-2">
        <img
          className="w-8"
          src={`/svg/sidebar/${type}/${type}-gray.svg`}
          alt=""
        />
        <h5 className="text-lg font-semibold">{title}</h5>
      </div>
      <DataTable
        value={data}
        paginator
        loading={loading}
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={10}
        rowHover
        rowsPerPageOptions={[10, 20, 50]}
        paginatorLeft={
          <Button
            onClick={() => handleReload()}
            type="button"
            icon="pi pi-refresh"
            className="p-button-text !text-white"
          />
        }
      >
        {columns.map((col: any, index: number) => {
          console.log(col);
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
};
