import { useFormik } from "formik";
import React, { ReactElement } from "react";
import InputError from "../InputError/InputError";
import { createRoboticsCloudSchema } from "../../validations/RoboticsCloudsValidations";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import useSidebar from "../../hooks/useSidebar";
import { useAppDispatch } from "../../hooks/redux";
import { createRoboticsCloud } from "../../resources/RoboticsCloudSlice";

export default function CreateRoboticsCloudForm(): ReactElement {
  const { sidebarState, setSidebarState, selectedState } = useSidebar();
  const dispatch = useAppDispatch();

  const formik: any = useFormik({
    initialValues: {
      roboticsCloudName: "",
    },
    validationSchema: createRoboticsCloudSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);

      dispatch(
        createRoboticsCloud({
          organizationId: selectedState.organization.organizationId,
          roboticsCloudName: values.roboticsCloudName,
        })
      ).then((response: any) => {
        if (response) {
          formik.setSubmitting(false);
          setSidebarState({ ...sidebarState, isCreateMode: false });
        }
      });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-8 animate__animated animate__fadeIn pt-6"
    >
      <div>
        <InputText
          {...formik.getFieldProps("roboticsCloudName")}
          placeholder="Robotics Cloud Name"
          type="text"
          disabled={formik.isSubmitting}
        />
        <InputError
          error={formik.errors.roboticsCloudName}
          touched={formik.touched.roboticsCloudName}
        />
      </div>

      <div>
        <Button
          type="submit"
          text="Create a new Robotics Cloud"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
          className="!h-11"
        />
      </div>
    </form>
  );
}
