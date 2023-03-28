import React, { ReactElement } from "react";
import UtilizationWidget from "../../../../components/UtilizationWidget/UtilizationWidget";
import CountWidget from "../../../../components/CountWidget/CountWidget";
import Button from "../../../../components/Button/Button";
import InformationWidget from "../../../../components/InformationWidget/InformationWidget";

export default function MainDashboardPage(): ReactElement {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        <div className="col-span-4">
          <InformationWidget
            title={`Main Dashboard`}
            subtitle="From this page, you can view, control or get information about all
            the details of the teams in your organization."
            actiontitle="If you need to create a new team or check the users in the team you
            can proceed here."
            component={
              <Button text="Manage Teams" className="!w-28 !h-10 !text-xs" />
            }
          />
        </div>
        <div className="col-span-5">
          <UtilizationWidget title="Organization" />
        </div>

        <div className="col-span-3">
          <CountWidget data={[5, 2, 4, 3]} title="Organization" />
        </div>
      </div>
    </div>
  );
}
