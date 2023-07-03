import { createInstanceSchema } from "../../validations/InstancesValidations";
import { createCloudInstance } from "../../resources/InstanceSlice";
import React, { ReactElement, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import InputError from "../InputError/InputError";
import useSidebar from "../../hooks/useSidebar";
import InputText from "../InputText/InputText";
import InfoTip from "../InfoTip/InfoTip";
import { BsCpu } from "react-icons/bs";
import Button from "../Button/Button";
import { useFormik } from "formik";

export default function CreateInstancesForm(): ReactElement {
  const { sidebarState, setSidebarState, selectedState } = useSidebar();
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [responseProviders, setResponseProviders] = useState<any[] | undefined>(
    [
      {
        name: "AWS",
        fullName: "Amazon Web Services",
        logo: "/svg/providers/aws.svg",
        isDisabled: false,
        regions: [
          {
            name: "eu-central-1",
            city: "Frankfurt",
          },
          {
            name: "eu-west-2",
            city: "London",
          },
          {
            name: "us-east-1",
            city: "N. Virginia",
          },
          {
            name: "us-east-2",
            city: "Ohio",
          },
          {
            name: "us-west-1",
            city: "N. California",
          },
          {
            name: "ap-northeast-1",
            city: "Tokyo",
          },
        ],
        types: [
          {
            name: "g4dn.xlarge",
            resources: {
              cpu: 4,
              ram: 16,
              gpu: "1T4",
            },
          },
          {
            name: "g4dn.2xlarge",
            resources: {
              cpu: 8,
              ram: 32,
              gpu: "1T4",
            },
          },
          {
            name: "g4dn.4xlarge",
            resources: {
              cpu: 16,
              ram: 64,
              gpu: "1T4",
            },
          },
        ],
      },
      {
        name: "Azure",
        fullName: "Microsoft Azure",
        logo: "/svg/providers/azure.svg",
        isDisabled: true,
        types: [],
      },
    ]
  );

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
          organizationId: selectedState.organization.organizationId,
          roboticsCloudName: selectedState.roboticsCloud.name,
          cloudInstanceName: values.cloudInstanceName,
          instanceType: values.instanceType,
          region: selectedState?.roboticsCloud?.region,
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
          {...formik.getFieldProps("cloudInstanceName")}
          placeholder="Cloud Instance Name"
          type="text"
          disabled={formik.isSubmitting}
        />
        <InputError
          error={formik.errors.cloudInstanceName}
          touched={formik.touched.cloudInstanceName}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
          Types:
          <InfoTip
            content="
              Types are the cloud instance types that you can use to create your cloud instance.
              "
          />
        </div>
        <div className="flex flex-col gap-6 w-full">
          {responseProviders?.[0]?.types?.map((type: any, index: number) => (
            <div
              key={index}
              className={`relative flex justify-between items-center gap-1 border-2 p-4 rounded cursor-pointer   ${
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
              <div className="flex text-layer-dark-700 gap-2.5">
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

      <div>
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
