import { useFormik } from "formik";
import React, { ReactElement, useState } from "react";
import InputError from "../InputError/InputError";
import { createRoboticsCloudSchema } from "../../validations/RoboticsCloudsValidations";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import useSidebar from "../../hooks/useSidebar";
import { useAppDispatch } from "../../hooks/redux";
import { createRoboticsCloud } from "../../resources/RoboticsCloudSlice";
import { toast } from "sonner";
import InfoTip from "../InfoTip/InfoTip";

export default function CreateRoboticsCloudForm(): ReactElement {
  const { sidebarState, setSidebarState, selectedState } = useSidebar();
  const dispatch = useAppDispatch();

  const formik: any = useFormik({
    initialValues: {
      roboticsCloudName: "",
      provider: "",
      region: "",
    },
    validationSchema: createRoboticsCloudSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);

      dispatch(
        createRoboticsCloud({
          organizationId: selectedState.organization.organizationId,
          roboticsCloudName: values.roboticsCloudName,
          provider: values.provider,
          region: values.region,
        })
      ).then((response: any) => {
        if (response) {
          formik.setSubmitting(false);
          setSidebarState({ ...sidebarState, isCreateMode: false });
        }
      });
    },
  });

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

      <div className="flex flex-col gap-3">
        <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
          Providers:
          <InfoTip
            content="
             Providers are the cloud providers that you can use to create your cloud instance."
          />
        </div>
        <div className="flex gap-6">
          {responseProviders?.map((provider: any, index: number) => (
            <div
              key={index}
              className={`relative flex justify-center items-center gap-1 border-2 p-4 rounded cursor-pointer w-40  ${
                formik.values.provider === provider.name
                  ? "border-layer-primary-600 shadow"
                  : "border-layer-light-100"
              } transition-all duration-300 ${
                provider?.isDisabled && "bg-layer-light-100"
              }
               `}
              onClick={() => {
                if (provider.isDisabled) {
                  toast.error("This provider is not available yet.");
                } else {
                  formik.setFieldValue("provider", provider.name);
                }
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <img
                  className="h-8"
                  src={provider.logo}
                  alt={provider.fullName}
                  style={{
                    filter: provider.isDisabled ? `grayscale(1)` : `none`,
                  }}
                />
                <span className="text-[0.68rem] text-layer-light-700">
                  {provider.fullName}
                </span>
              </div>
              <div className="absolute inset-0 flex items-start justify-end p-2"></div>
            </div>
          ))}
        </div>
        <InputError error={formik?.errors?.provider} touched={true} />
      </div>

      {formik?.values?.provider && (
        <div className="flex flex-col gap-3">
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
            Regions:
            <InfoTip
              content="
             Regions are the cloud regions that you can use to create your cloud instance."
            />
          </div>
          <div className="flex flex-wrap gap-6">
            {responseProviders
              ?.filter(
                (provider: any) => provider.name === formik?.values?.provider
              )[0]
              ?.regions?.map((region: any, index: number) => (
                <div
                  key={index}
                  className={`relative flex justify-center items-center gap-1 border-2 p-4 rounded cursor-pointer w-40  ${
                    formik.values.region === region.name
                      ? "border-layer-primary-600 shadow"
                      : "border-layer-light-100"
                  } transition-all duration-300
               `}
                  onClick={() => {
                    formik.setFieldValue("region", region.name);
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-layer-light-800">
                      {region?.name}
                    </span>
                    <span className="text-xs text-layer-light-700">
                      ({region?.city})
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-start justify-end p-2"></div>
                </div>
              ))}
          </div>
          <InputError error={formik?.errors?.region} touched={true} />
        </div>
      )}

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
