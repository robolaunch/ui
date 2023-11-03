import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { getPort as getFreePort } from "../../toolkit/PortSlice";
import CFPortInput from "../CFPortInput/CFPortInput";
import { useAppDispatch } from "../../hooks/redux";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";
import { toast } from "sonner";

interface ICFPortSetter {
  formik: any;
  type: string;
  isImportRobot?: boolean;
}

export default function CFPortSetter({
  formik,
  type,
  isImportRobot,
}: ICFPortSetter): ReactElement {
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
    } catch (error) {
      toast.error("Error getting port. Please remove a port and try again.");
    }
  }

  return (
    <div>
      <CFInfoBar
        label={`Custom Port Exposure From ${type === "ide" ? "IDE" : "VDI"}:`}
        tip="Type a ports with name."
        vertical
      >
        <div className="flex flex-col gap-2">
          {formik.values?.[`${type}CustomPorts`]?.map(
            (_: any, index: number) => {
              return (
                <CFPortInput
                  key={index}
                  formik={formik}
                  portIndex={index}
                  type={type}
                  disabled={isImportRobot}
                />
              );
            },
          )}
        </div>
      </CFInfoBar>

      <CreateRobotFormAddButton
        disabled={isImportRobot}
        onClick={async () => {
          await formik.setFieldValue(
            `${type}CustomPorts`,
            formik.values?.[`${type}CustomPorts`]?.concat({
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