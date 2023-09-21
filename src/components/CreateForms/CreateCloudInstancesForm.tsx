import { createInstanceSchema } from "../../validations/InstancesValidations";
import { createCloudInstance } from "../../toolkit/InstanceSlice";
import React, { ReactElement } from "react";
import { useAppDispatch } from "../../hooks/redux";
import InputError from "../InputError/InputError";
import useMain from "../../hooks/useMain";
import InputText from "../InputText/InputText";
import InfoTip from "../InfoTip/InfoTip";
import { BsCpu } from "react-icons/bs";
import Button from "../Button/Button";
import { useFormik } from "formik";
import responseProviders from "../../mock/CloudInstanceProviders.json";
import CreateFormCancelButton from "../CreateFormCancelButton/CreateFormCancelButton";

export default function CreateCloudInstancesForm(): ReactElement {
  const { sidebarState, setSidebarState, selectedState } = useMain();
  const dispatch = useAppDispatch();

  const formik: any = useFormik({
    initialValues: {
      cloudInstanceName: "",
      instanceType: "",
    },
    validationSchema: createInstanceSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);
      dispatch(
        createCloudInstance({
          organizationId: selectedState.organization!.organizationId!,
          roboticsCloudName: selectedState.roboticsCloud!.name!,
          cloudInstanceName: values.cloudInstanceName,
          instanceType: values.instanceType,
          region: selectedState?.roboticsCloud?.region,
        }),
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
      className="animate__animated animate__fadeIn flex flex-col gap-8"
    >
      <div>
        <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
          Cloud Instance Name:
          <InfoTip content="Type a new cloud instance name." />
        </div>
        <InputText
          {...formik.getFieldProps("cloudInstanceName")}
          className="!text-sm"
          disabled={formik.isSubmitting}
        />
        <InputError
          error={formik.errors.cloudInstanceName}
          touched={formik.touched.cloudInstanceName}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex min-w-fit gap-1 text-xs font-medium text-layer-light-700">
          Types:
          <InfoTip
            content="
              Types are the cloud instance types that you can use to create your cloud instance.
              "
          />
        </div>
        <div className="flex w-full flex-col gap-6">
          {responseProviders?.[0]?.types?.map((type: any, index: number) => (
            <div
              key={index}
              className={`relative flex cursor-pointer items-center justify-between gap-1 rounded border-2 p-4   ${
                formik.values.instanceType === type.name
                  ? "border-layer-primary-600 shadow"
                  : "border-layer-light-100"
              } transition-all duration-300
               `}
              onClick={() => formik.setFieldValue("instanceType", type.name)}
            >
              <div className="flex gap-6">
                <img
                  className="w-9"
                  src={responseProviders?.[0]?.logo}
                  alt={responseProviders?.[0]?.name}
                />
                <div className="text-xs uppercase">{type.name}</div>
              </div>
              <div className="flex gap-2.5 text-layer-dark-700">
                <div className="flex items-center gap-1">
                  <BsCpu className="text-layer-light-600" size={14} />
                  <span className="text-xs">{type.resources.cpu} CPU</span>
                </div>
                <div className="flex items-center gap-1">
                  <BsCpu className="text-layer-light-600" size={14} />
                  <span className="text-xs">{type.resources.ram} RAM</span>
                </div>
                <div className="flex items-center gap-1">
                  <BsCpu className="text-layer-light-600" size={14} />
                  <span className="text-xs">{type.resources.gpu} GPU</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <InputError error={formik?.errors?.instanceType} touched={true} />
      </div>

      <div className="flex gap-2">
        <CreateFormCancelButton disabled={formik.isSubmitting} />
        <Button
          type="submit"
          text="Create a new Cloud Instance"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
          className="!h-11"
        />
      </div>
    </form>
  );
}
