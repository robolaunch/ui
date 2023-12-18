import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import RegionsWidget from "../../../components/RegionsWidget/RegionsWidget";
import { stringCapitalization } from "../../../functions/GeneralFunctions";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import { ReactElement } from "react";
import { OrgTableData } from "../../../controllers/OrgTableData";
import TourGuide from "../../../components/TourGuide/TourGuide";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import { getGuideItem } from "../../../functions/handleGuide";
import { useParams } from "react-router-dom";

export default function OrgDashboard(): ReactElement {
  const url = useParams();

  const { data, columns, responseRegions, handleReload } = OrgTableData();

  return (
    <DashboardLayout
      widget1={
        <InformationWidget
          title={
            stringCapitalization({
              str: url?.organizationName!,
            }) || ""
          }
          subtitle="This page is the platform's regions page. Here, you can manage, delete, or view the details of your existing regions."
          component={
            <TourGuide
              type="organization"
              tourConfig={[
                getGuideItem('[data-tut="information-widget"]'),
                getGuideItem('[data-tut="regions-widget"]'),
                getGuideItem('[data-tut="counter-widget"]'),
                getGuideItem('[data-tut="general-table"]'),
              ]}
            />
          }
        />
      }
      widget2={
        <RegionsWidget
          title="Provider"
          responseData={responseRegions?.map((item: any) => item.region) || []}
        />
      }
      widget3={
        <CountWidget
          data={
            responseRegions
              ? Array?.from(
                  new Set(
                    responseRegions?.map((item: any) => item?.region) || [],
                  ),
                )?.map((item: any, index: number) => {
                  return {
                    label: item || "",
                    value:
                      responseRegions?.filter((rc: any) => rc?.region === item)
                        ?.length || 0,
                    color: index % 2 === 0 ? "#35b8fa" : "#cb77ff",
                  };
                })
              : []
          }
        />
      }
      table={
        <GeneralTable
          type="roboticscloud"
          title="Regions"
          data={data}
          columns={columns}
          loading={!Array.isArray(responseRegions)}
          handleReload={handleReload}
        />
      }
    />
  );
}
