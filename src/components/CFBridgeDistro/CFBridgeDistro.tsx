import { ReactElement } from "react";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import { FormikProps } from "formik";
import CFBridgeToggle from "../CFBridgeToggle/CFBridgeToggle";
import Card from "../Card/Card";
import CFInfoBar from "../CFInfoBar/CFInfoBar";

interface ICFBridgeDistro {
  formik: FormikProps<IEnvironmentStep1>;
}

export default function CFBridgeDistro({
  formik,
}: ICFBridgeDistro): ReactElement {
  return (
    <div className="flex w-full items-center justify-between">
      <CFBridgeToggle formik={formik} />
      <CFInfoBar
        classNameContainer="flex items-center"
        label="Distro:"
        tip="Type Volumes"
        dataTut="create-robot-step1-bridgeDistro"
        gap={4}
        classNameLabel="items-center"
      >
        <div className="flex gap-2">
          {[
            {
              label: "Iron",
              value: "iron",
            },
            {
              label: "Humble",
              value: "humble",
            },
            {
              label: "Foxy",
              value: "foxy",
            },
            {
              label: "Galactic",
              value: "galactic",
            },
          ]?.map((distro, index) => (
            <Card
              key={index}
              onClick={() => {
                formik.setFieldValue("services.ros.bridgeDistro", distro.value);
              }}
              className={`flex cursor-pointer items-center justify-center rounded-md border-2 px-4 py-2 shadow-sm ${
                formik.values.services.ros.bridgeDistro === distro.value &&
                "border-primary-400"
              }`}
            >
              <p className="text-xs text-light-800">{distro.label}</p>
            </Card>
          ))}
        </div>
      </CFInfoBar>
    </div>
  );
}
