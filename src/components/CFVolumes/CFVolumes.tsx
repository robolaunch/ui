import { FormikProps } from "formik";
import { Fragment, ReactElement, useEffect } from "react";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import CFAddButton from "../CFAddButton/CFAddButton";
import FormInputText from "../FormInputText/FormInputText";
import Card from "../Card/Card";

interface ICFVolumes {
  formik: FormikProps<IEnvironmentStep1>;
  isImportRobot?: boolean;
}

export default function CFVolumes({
  formik,
  isImportRobot,
}: ICFVolumes): ReactElement {
  useEffect(() => {
    console.log(formik.values.volumes);
  }, [formik]);

  return (
    <CFInfoBar
      label="Volumes:"
      tip="Type Volumes"
      dataTut="create-robot-step1-volumes"
      vertical
      gap={4}
    >
      <Fragment>
        {formik.values.volumes.map((_, index) => {
          return (
            <Card
              className="flex flex-col items-center gap-3 p-5 shadow-sm"
              key={index}
            >
              <div className="flex w-full justify-between gap-4">
                <FormInputText
                  classNameContainer="w-full"
                  labelName="Volume Name:"
                  labelInfoTip="Type a new volume name."
                  disabled
                  inputProps={{
                    ...formik.getFieldProps(`volumes[${index}].name`),
                  }}
                />
                <FormInputText
                  classNameContainer="w-full"
                  labelName="Volume Path:"
                  labelInfoTip="Type a new volume path."
                  inputProps={{
                    ...formik.getFieldProps(`volumes[${index}].mountPath`),
                  }}
                />
              </div>
              <p
                className="cursor-pointer text-xs font-medium text-red-500 hover:underline"
                onClick={() => {
                  formik.setFieldValue(
                    "volumes",
                    formik.values.volumes.filter(
                      (_, volumeIndex) => volumeIndex !== index,
                    ),
                  );
                }}
              >
                Delete Volume
              </p>
            </Card>
          );
        })}
      </Fragment>
      <CFAddButton
        // @ts-ignore
        onClick={() => {
          formik.setFieldValue("volumes", [
            ...formik.values.volumes,
            {
              name: "",
              mountPath: "",
            },
          ]);
        }}
        disabled={formik?.isSubmitting}
      />
    </CFInfoBar>
  );
}
