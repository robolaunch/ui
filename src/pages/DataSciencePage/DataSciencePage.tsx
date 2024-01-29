import { Fragment, ReactElement } from "react";
import useMain from "../../hooks/useMain";
import Card from "../../components/Card/Card";
import { IoWarningOutline } from "react-icons/io5";
import DataScienceTable from "../../components/DataScienceTable/DataScienceTable";

export default function DataSciencePage(): ReactElement {
  const { selectedState } = useMain();

  function handleSelectController(): boolean {
    if (
      selectedState.organization?.id &&
      selectedState.roboticsCloud?.name &&
      selectedState.instance?.id
    ) {
      return true;
    }

    return false;
  }

  return (
    <Fragment>
      {handleSelectController() ? (
        <DataScienceTable />
      ) : (
        <Card className="!h-60">
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <IoWarningOutline size={32} className="text-yellow-500" />
            <p className="font-medium text-light-700">
              In order to deploy your Data Science Applications, you must select
              Organization, Region and Cloud Instance.
            </p>
          </div>
        </Card>
      )}
    </Fragment>
  );
}
