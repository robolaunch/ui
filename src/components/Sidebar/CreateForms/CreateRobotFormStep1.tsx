import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { CreateRobotContext } from "../../../contexts/CreateRobotContext";
import { useFormik } from "formik";
import InputSelect from "../../InputSelect/InputSelect";
import InputError from "../../InputError/InputError";
import InputText from "../../InputText/InputText";
import Button from "../../Button/Button";
import { SidebarContext } from "../../../contexts/SidebarContext";
import * as Yup from "yup";
import { ApiContext } from "../../../contexts/ApiContext";
import { Api } from "../../../types/types";
import { IOrganization } from "../../../interfaces/organizationInterfaces";

export default function CreateRobotFormStep1(): ReactElement {
  const [responseOrganizations, setResponseOrganizations] =
    useState<IOrganization[]>();
  const { robotData, setRobotData }: any = useContext(CreateRobotContext);
  const { selectedState }: any = useContext(SidebarContext);

  const {
    handleCreateRobotNextStep,
  }: {
    handleCreateRobotNextStep: () => void;
  } = useContext(SidebarContext);

  const { api }: Api = useContext(ApiContext);

  useEffect(() => {
    api.getOrganizations().then((responseOrganizations: any) => {
      setResponseOrganizations(responseOrganizations?.data?.data || []);
    });
  }, []);

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      roboticsCloud: Yup.string().required("Robotics Cloud is required"),
      fleet: Yup.string().required("Fleet is required"),
      storage: Yup.number().required("Storage is required"),
      isEnabledIDE: Yup.boolean().required("IDE is required"),
      isEnabledROS2Bridge: Yup.boolean().required("ROS2 Bridge is required"),
      remoteDesktop: Yup.object().shape({
        isEnabled: Yup.boolean().required("Remote Desktop is required"),
        sessionCount: Yup.number().required("Session Count is required"),
      }),
      rosDistros: Yup.array().of(
        Yup.string().required("ROS Distro is required")
      ),
    }),

    initialValues: robotData?.step1,
    onSubmit: (values: any) => {
      handleCreateRobotNextStep();
    },
  });

  useEffect(() => {
    setRobotData({
      ...robotData,
      step1: formik.values,
    });
    // eslint-disable-next-line
  }, [formik.values]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-8 animate__animated animate__fadeIn"
    >
      <div>
        <InputSelect
          {...formik.getFieldProps("organization")}
          placeholder="Organization"
          onChange={(e: any) => {
            responseOrganizations?.map(
              (organization: IOrganization) =>
                organization.organizationName === e.target.value &&
                formik.setFieldValue("organization", organization)
            );
          }}
          value={selectedState?.organization?.organizationName}
        >
          <Fragment>
            {responseOrganizations?.map((organization: any, index: number) => (
              <option
                key={index}
                selected={
                  selectedState?.organization?.organizationName ===
                    organization?.organizationName && true
                }
                value={organization?.organizationName}
              >
                {organization?.organizationName}
              </option>
            ))}
          </Fragment>
        </InputSelect>
        <InputError
          error={formik.errors.organization}
          touched={formik.touched.organization}
        />
      </div>
      <div>
        <InputSelect
          {...formik.getFieldProps("roboticsCloud")}
          placeholder="Robotics Cloud"
        >
          <Fragment>
            {!formik.values.roboticsCloud && <option value=""></option>}
            <option value={"roboticsCloud#1"}>roboticsCloud#1</option>
          </Fragment>
        </InputSelect>
        <InputError
          error={formik.errors.roboticsCloud}
          touched={formik.touched.roboticsCloud}
        />
      </div>
      <div>
        <InputSelect {...formik.getFieldProps("fleet")} placeholder="Fleet">
          <Fragment>
            {!formik.values.fleet && <option value=""></option>}
            <option value={"fleet#1"}>fleet#1</option>
          </Fragment>
        </InputSelect>
        <InputError
          error={formik.errors.fleet}
          touched={formik.touched.fleet}
        />
      </div>
      <div>
        <InputText {...formik.getFieldProps("name")} placeholder="Robot Name" />
        <InputError error={formik.errors.name} touched={formik.touched.name} />
      </div>
      <div className="flex gap-4">
        <Button
          disabled={!formik.isValid || formik.isSubmitting}
          type="submit"
          className="!h-11 text-xs"
          text={`Next Step`}
        />
      </div>
    </form>
  );
}
