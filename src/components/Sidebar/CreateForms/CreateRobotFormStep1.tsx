import React, { Fragment, ReactElement, useContext, useEffect } from "react";
import { CreateRobotContext } from "../../../contexts/CreateRobotContext";
import { useFormik } from "formik";
import InputSelect from "../../InputSelect/InputSelect";
import InputError from "../../InputError/InputError";
import InputText from "../../InputText/InputText";
import { CreateRobotStep1 } from "../../../validations/RobotsValidations";
import Button from "../../Button/Button";
import { SidebarContext } from "../../../contexts/SidebarContext";

export default function CreateRobotFormStep1(): ReactElement {
  const { robotData, setRobotData }: any = useContext(CreateRobotContext);

  const {
    handleCreateRobotNextStep,
  }: {
    handleCreateRobotNextStep: () => void;
  } = useContext(SidebarContext);

  const formik = useFormik({
    validationSchema: CreateRobotStep1,
    initialValues: robotData?.step1,
    onSubmit: (values: any) => {},
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
        >
          <Fragment>
            {!formik.values.organization && <option value=""></option>}
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
          </Fragment>
        </InputSelect>
        <InputError
          error={formik.errors.fleet}
          touched={formik.touched.fleet}
        />
      </div>
      <div>
        <InputText
          {...formik.getFieldProps("fleet")}
          placeholder="Robot Name"
        />
        <InputError
          error={formik.errors.fleet}
          touched={formik.touched.fleet}
        />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={handleCreateRobotNextStep}
          disabled={!formik.isValid || formik.isSubmitting}
          type="submit"
          className="!h-11"
          text={`Next Step`}
        />
      </div>
    </form>
  );
}
