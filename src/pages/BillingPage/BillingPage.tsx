import React, { Fragment, ReactElement, useMemo, useState } from "react";
import { GeneralTable } from "../../components/Table/GeneralTable";
import BasicCell from "../../components/Cells/BasicCell";
import ColorCell from "../../components/Cells/ColorCell";
import InvoiceActionCells from "../../components/ActionCells/InvoiceActionCells";
import CardLayout from "../../layouts/CardLayout";
import InvoiceUtilizationWidget from "../../components/InvoiceUtilizationWidget/InvoiceUtilizationWidget";
import InvoiceStatusWidget from "../../components/InvoiceStatusWidget/InvoiceStatusWidget";

export default function BillingPage(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [responseInvoices, setResponseInvoices] = useState<any>([
    {
      invoiceNumber: 12345678,
      organization: "Organization #1",
      invoicePeriod: "September 2023",
      invoiceDate: "2023-09-01",
      dueDate: "2023-09-30",
      price: 1000,
      status: true,
    },
    {
      invoiceNumber: 12345679,
      organization: "Organization #2",
      invoicePeriod: "September 2023",
      invoiceDate: "2023-09-01",
      dueDate: "2023-09-30",
      price: 1000,
      status: false,
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

  const [currentTab, setCurrentTab] = useState<string>("Overview");
  const tabs = ["Overview", "Old Invoices"];

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <CardLayout>
          <ul className="flex gap-1 px-6 pt-3 -mb-1.5 overflow-x-auto">
            {tabs.map((tab: any, index: number) => {
              return (
                <div
                  onClick={() => setCurrentTab(tab)}
                  className="w-full flex flex-col gap-3 cursor-pointer transition-all duration-500"
                >
                  <li
                    className={`text-xs text-center font-medium px-2 transition-all duration-500 min-w-max hover:scale-90  ${
                      currentTab === tab
                        ? "text-layer-primary-500"
                        : "text-layer-light-500"
                    }`}
                  >
                    {tab}
                  </li>
                  {currentTab === tab && (
                    <div className="w-full h-[2px] transition-all duration-500 bg-layer-primary-500" />
                  )}
                </div>
              );
            })}
          </ul>
        </CardLayout>
      </div>

      {(() => {
        switch (currentTab) {
          case "Overview":
            return (
              <Fragment>
                <div className="col-span-3">
                  <InvoiceStatusWidget />
                </div>
                <div className="col-span-6">
                  <InvoiceUtilizationWidget />
                </div>
                <div className="col-span-3">x</div>
              </Fragment>
            );
          case "Old Invoices":
            return (
              <div className="col-span-12">
                <GeneralTable
                  columns={columns}
                  data={data}
                  loading={false}
                  title="Invoices"
                  type="invoices"
                />
              </div>
            );
        }
      })()}
    </div>
  );
}
