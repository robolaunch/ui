import React, { ReactElement } from "react";
import InfoCell from "../TableInformationCells/InfoCell";
import { organizationNameViewer } from "../../functions/GeneralFunctions";

interface IOrganizationInfoCell {
  organizationName: any;
}

export default function OrganizationInfoCell({
  organizationName,
}: IOrganizationInfoCell): ReactElement {
  return (
    <InfoCell
      title={organizationNameViewer({
        organizationName: organizationName,
        capitalization: false,
      })}
      subtitle={`${organizationNameViewer({
        organizationName: organizationName,
        capitalization: false,
      })}`}
      titleURL={`/${organizationNameViewer({
        organizationName: organizationName,
        capitalization: false,
      })}`}
    />
  );
}
