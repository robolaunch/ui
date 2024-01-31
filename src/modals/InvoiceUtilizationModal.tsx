import Button from "../components/Button/Button";
import { TbCloudDownload } from "react-icons/tb";
import ReactApexChart from "react-apexcharts";
import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";

interface IInvoiceUtilizationModal {
  visibleModal: boolean;
  handleCloseModal: () => void;
}

export default function InvoiceUtilizationModal({
  visibleModal,
  handleCloseModal,
}: IInvoiceUtilizationModal): ReactElement {
  return (
    <Dialog
      header="Invoice Utilization Modal"
      visible={visibleModal}
      className="w-[40vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex flex-col gap-4">
        <ReactApexChart
          options={{
            chart: {
              type: "area",
              toolbar: {
                show: false,
              },
            },
            colors: ["#AC2DFE"],
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "stepline",
            },

            xaxis: {
              type: "datetime",
              labels: {
                style: {
                  colors: "#00000075",
                },
              },
              categories: [
                "2023-09-01",
                "2023-09-02",
                "2023-09-03",
                "2023-09-04",
                "2023-09-05",
                "2023-09-06",
                "2023-09-07",
                "2023-09-08",
                "2023-09-09",
                "2023-09-10",
                "2023-09-11",
                "2023-09-12",
                "2023-09-13",
                "2023-09-14",
                "2023-09-15",
                "2023-09-16",
                "2023-09-17",
                "2023-09-18",
                "2023-09-19",
                "2023-09-20",
                "2023-09-21",
                "2023-09-22",
                "2023-09-23",
                "2023-09-24",
                "2023-09-25",
                "2023-09-26",
                "2023-09-27",
                "2023-09-28",
                "2023-09-29",
                "2023-09-30",
              ],
            },
            yaxis: {
              labels: {
                style: {
                  colors: "#00000075",
                },
                formatter: function (val) {
                  return val + "$";
                },
              },
            },
            tooltip: {
              x: {
                format: "dd/MM/yy",
              },
            },
            legend: {
              show: false,
            },
          }}
          series={[
            {
              name: `Utilization`,
              data: [
                21, 20, 24, 22, 19, 20, 24, 21, 20, 24, 22, 19, 20, 24, 21, 20,
                24, 22, 19, 20, 24, 21, 20, 24, 22, 19, 20, 24, 21, 20,
              ],
            },
          ]}
          type="area"
          height={300}
        />
        <div className="flex items-center justify-center">
          <Button
            className="!h-8 !w-fit !border !border-secondary-600 !bg-transparent !ring-secondary-200"
            text={
              <div className="flex items-center gap-1.5 p-3">
                <TbCloudDownload size={20} className="text-secondary-600" />
                <span className="text-secondary-600">Download</span>
              </div>
            }
          />
        </div>
      </div>
    </Dialog>
  );
}
