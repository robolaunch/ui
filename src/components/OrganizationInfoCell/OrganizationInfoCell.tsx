import React, { ReactElement } from "react";
import InfoCell from "../TableInformationCells/InfoCell";
import { organizationNameViewer } from "../../functions/GeneralFunctions";

interface IOrganizationInfoCell {
  rowData: any;
}

export default function OrganizationInfoCell({
  rowData,
}: IOrganizationInfoCell): ReactElement {
  return (
    <InfoCell
      title={organizationNameViewer({
        organizationName: rowData?.name?.organizationName,
        capitalization: false,
      })}
      subtitle={`${organizationNameViewer({
        organizationName: rowData?.name?.organizationName,
        capitalization: false,
      })}`}
      titleURL={`/${organizationNameViewer({
        organizationName: rowData?.name?.organizationName,
        capitalization: false,
      })}`}
    />
  );
}
