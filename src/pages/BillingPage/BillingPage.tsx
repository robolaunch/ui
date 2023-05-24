import React, { ReactElement, useMemo, useState } from "react";
import GeneralTable from "../../components/Table/GeneralTable";
import BasicCell from "../../components/Cells/BasicCell";
import ColorCell from "../../components/Cells/ColorCell";
import InvoiceActionCells from "../../components/ActionCells/InvoiceActionCells";
import InvoiceStatusWidget from "../../components/InvoiceStatusWidget/InvoiceStatusWidget";
import InvoiceUtilizationWidget from "../../components/InvoiceUtilizationWidget/InvoiceUtilizationWidget";

export default function BillingPage(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [responseInvoices, setResponseInvoices] = useState<any>([
    {
      invoiceNumber: 1235,
      organization: "Organization #2",
      invoicePeriod: "September 2023",
      invoiceDate: "2023-09-01",
      dueDate: "2023-09-30",
      price: 1200,
      status: false,
    },
    {
      invoiceNumber: 1234,
      organization: "Organization #1",
      invoicePeriod: "September 2023",
      invoiceDate: "2023-09-01",
      dueDate: "2023-09-30",
      price: 1000,
      status: true,
    },
  ]);

  const data: any = useMemo(
    () =>
      responseInvoices?.map((invoice: any) => {
        return {
          key: invoice?.invoiceNumber,
          invoiceNumber: invoice?.invoiceNumber,
          organization: invoice?.organization,
          invoicePeriod: invoice?.invoicePeriod,
          invoiceDate: invoice?.invoiceDate,
          dueDate: invoice?.dueDate,
          price: invoice?.price,
          status: invoice?.status,
        };
      }),
    [responseInvoices]
  );

  const columns: any = useMemo(
    () => [
      {
        key: "invoiceNumber",
        header: "Invoice Number",
        sortable: true,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.invoiceNumber} />;
        },
      },
      {
        key: "orgnaization",
        header: "Invoice Organization",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.organization} />;
        },
      },
      {
        key: "invoicePeriod",
        header: "Invoice Period",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.invoicePeriod} />;
        },
      },
      {
        key: "invoiceDate",
        header: "Invoice Date",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.invoiceDate} />;
        },
      },
      {
        key: "dueDate",
        header: "Invoice Due Date",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.dueDate} />;
        },
      },
      {
        key: "price",
        header: "Invoice Price",
        sortable: true,
        filter: true,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={`${rowData?.price}$`} />;
        },
      },
      {
        key: "status",
        header: "Payment Status",
        sortable: true,
        filter: false,
        align: "center",
        body: (rowData: any) => {
          return (
            <ColorCell
              text={rowData?.status ? "Paid" : "Unpaid"}
              color={rowData?.status ? "green" : "red"}
            />
          );
        },
      },
      {
        key: "action",
        header: "Action",
        sortable: false,
        filter: false,
        align: "right",
        body: (rowData: any) => {
          return <InvoiceActionCells rowData={rowData} />;
        },
      },
    ],
    []
  );

  return (
    <div className="grid grid-cols-12 gap-6 animate__animated animate__fadeIn">
      <div className="col-span-9">
        <InvoiceUtilizationWidget />
      </div>
      <div className="col-span-3">
        <InvoiceStatusWidget />
      </div>
      <div className="col-span-12">
        <GeneralTable
          columns={columns}
          data={data}
          loading={false}
          title="All Invoices"
          type="invoices"
        />
      </div>
    </div>
  );
}
