import { Fragment, ReactElement } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import Card from "../Card/Card";
import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import FormInputText from "../FormInputText/FormInputText";
import CFAddButton from "../CFAddButton/CFAddButton";

interface ICFContainers {
  formik: FormikProps<IEnvironmentStep1>;
  isImportRobot?: boolean;
}

export default function CFContainers({
  formik,
  isImportRobot,
}: ICFContainers): ReactElement {
  return (
    <CFInfoBar
      label="Containers:"
      tip="Type Containers"
      dataTut="create-robot-step1-containers"
      vertical
      gap={4}
    >
      <Fragment>
        {formik.values.containers.map((_, index) => {
          return (
            <Card
              className="flex flex-col items-center gap-3 p-5 shadow-sm"
              key={index}
            >
              <div className="flex w-full flex-col justify-between gap-4">
                <div className="flex w-full gap-4">
                  <FormInputText
                    classNameContainer=" w-3/4"
                    labelName="Volume Name:"
                    labelInfoTip="Type a new volume name."
                    inputProps={{
                      ...formik.getFieldProps(`containers[${index}].name`),
                    }}
                  />
                  <FormInputText
                    classNameContainer=" w-1/4"
                    labelName="Replica Count:"
                    labelInfoTip="Replica count for the container"
                    inputProps={{
                      ...formik.getFieldProps(
                        `containers[${index}].replicaCount`,
                      ),
                    }}
                  />
                </div>
                <FormInputText
                  classNameContainer="w-full"
                  labelName="Image:"
                  labelInfoTip="Image for the container"
                  inputProps={{
                    ...formik.getFieldProps(`containers[${index}].image`),
                  }}
                />
              </div>
              <p
                className="cursor-pointer text-xs font-medium text-red-500 hover:underline"
                onClick={() => {
                  formik.setFieldValue(
                    "containers",
                    formik.values.containers.filter(
                      (_, contIndex) => contIndex !== index,
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
          formik.setFieldValue("containers", [
            ...formik.values.containers,
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
