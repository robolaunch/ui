import React, { ReactElement } from "react";
import CreateRobotFormPortInput from "../CreateRobotFormPortInput/CreateRobotFormPortInput";
import InfoTip from "../InfoTip/InfoTip";
import { useAppDispatch } from "../../hooks/redux";
import { getPort as getFreePort } from "../../toolkit/PortSlice";
import useMain from "../../hooks/useMain";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";

interface ICreateRobotFormPortSetter {
  formik: any;
  type: string;
}

export default function PortSetter({
  formik,
  type,
}: ICreateRobotFormPortSetter): ReactElement {
  const { selectedState } = useMain();

  const dispatch = useAppDispatch();

  async function getPort() {
    try {
      const result = await dispatch(
        getFreePort({
          organizationId: selectedState?.organization?.organizationId!,
          instanceId: selectedState?.instance?.instanceId!,
          region: selectedState?.roboticsCloud?.region!,
          roboticsCloudName: selectedState?.roboticsCloud?.name!,
        }),
      );

      if (
        formik.values.ideCustomPorts
          ?.map((port: any) => port.backendPort)
          .includes(result.payload) ||
        formik.values.vdiCustomPorts
          ?.map((port: any) => port.backendPort)
          .includes(result.payload)
      ) {
        return getPort();
      }

      return result.payload;
    } catch (error) {}
  }

  return (
    <div>
      <div>
        <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
          {type === "ide" ? "IDE" : "VDI"} Ports:
          <InfoTip content="Type a ports." />
        </div>
        <div className="flex flex-col">
          {formik.values?.[`${type}CustomPorts`].map(
            (_: any, index: number) => {
              return (
                <CreateRobotFormPortInput
                  key={index}
                  formik={formik}
                  portIndex={index}
                  type={type}
                />
              );
            },
          )}
        </div>
      </div>

      <CreateRobotFormAddButton
        onClick={async () => {
          await formik.setFieldValue(
            `${type}CustomPorts`,
            formik.values?.[`${type}CustomPorts`].concat({
              name: "",
              port: undefined,
              backendPort: await getPort(),
            }),
          );
        }}
        className="!mt-1"
      />
    </div>
  );
}
