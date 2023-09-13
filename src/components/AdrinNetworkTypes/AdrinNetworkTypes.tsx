import React, { Fragment, ReactElement } from "react";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import InputSelect from "../InputSelect/InputSelect";
import InputToggle from "../InputToggle/InputToggle";
import InfoTip from "../InfoTip/InfoTip";

interface IAdrinNetworkTypes {
  formik: any;
  isImportRobot?: boolean;
}

export default function AdrinNetworkTypes({
  formik,
  isImportRobot,
}: IAdrinNetworkTypes): ReactElement {
  return (
    <Fragment>
      <div className="w-full flex gap-6">
        <div className="flex flex-col gap-2 w-full">
          <div className="min-w-fit flex flex-wrap gap-1 text-xs font-medium text-layer-light-700 w-full">
            ADriN Regions:
            <InfoTip content="ADriN Region." />
          </div>
          <div className="flex gap-6 w-full">
            <InputSelect
              className="w-full text-sm text-layer-light-900"
              {...formik.getFieldProps(`adrinRegions`)}
              wrapClassName="w-full"
              disabled={isImportRobot || formik?.isSubmitting}
            >
              <Fragment>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Denmark">Denmark</option>
                <option value="United Kingdom">United Kingdom</option>
              </Fragment>
            </InputSelect>
          </div>
        </div>

        <div className="flex flex-col gap-2  w-full">
          <div className="min-w-fit flex flex-wrap gap-1 text-xs font-medium text-layer-light-700">
            Communication Profile:
            <InfoTip content="ADriN Types." rightTip />
          </div>
          <div className="flex h-full items-center gap-6">
            {["Control", "Data", "Video"]?.map(
              (type: string, index: number) => (
                <InputCheckbox
                  key={index}
                  name={type}
                  value={formik?.values?.adrinTypes === type ? true : false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik?.setFieldValue(
                      "adrinTypes",
                      e?.target?.checked ? type : ""
                    );
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/*    Network Autoscale: */}
      <div className="flex items-center gap-1 pt-2">
        <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
          Network Autoscale:
          <InfoTip content="Network Autoscale" />
        </div>
        <InputToggle
          checked={formik?.values?.ADriNNetworkScale}
          onChange={(e: any) => {
            formik.setFieldValue("ADriNNetworkScale", e);
          }}
          disabled={formik.isSubmitting}
        />
      </div>
      {/*    Network Autoscale: */}
    </Fragment>
  );
}
