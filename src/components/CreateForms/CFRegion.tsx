import { useFormik } from "formik";
import { ReactElement } from "react";
import InputError from "../InputError/InputError";
import { createRoboticsCloudSchema } from "../../validations/RoboticsCloudsValidations";
import useMain from "../../hooks/useMain";
import { useAppDispatch } from "../../hooks/redux";
import { createRoboticsCloud } from "../../toolkit/RoboticsCloudSlice";
import { toast } from "sonner";
import InfoTip from "../InfoTip/InfoTip";
import responseProviders from "../../mock/CloudInstanceProviders.json";
import FormInputText from "../FormInputText/FormInputText";
import CFSidebar from "../CFSidebar/CFSidebar";

export default function CFRegion(): ReactElement {
  const { sidebarState, setSidebarState, selectedState } = useMain();
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
          organizationId: selectedState.organization!.organizationId,
          roboticsCloudName: values.roboticsCloudName,
          provider: values.provider,
          region: values.region,
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
    <CFSidebar formik={formik} text="Create Region">
      <FormInputText
        labelName="Region Name:"
        labelInfoTip="Type a new region name."
        disabled={formik.isSubmitting}
        inputProps={formik.getFieldProps("roboticsCloudName")}
        inputError={formik.errors.roboticsCloudName}
        inputTouched={!!formik.errors.roboticsCloudName}
      />
      <div className="flex flex-col gap-3">
        <div className="text-light-700 flex min-w-fit gap-1 text-xs font-medium">
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
              className={`relative flex w-40 cursor-pointer items-center justify-center gap-1 rounded border-2 p-4  ${
                formik.values.provider === provider.name
                  ? "border-primary-400 shadow"
                  : "border-light-100"
              } transition-all duration-300 ${
                provider?.isDisabled && "bg-light-100"
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
                <span className="text-light-700 text-[0.68rem]">
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
          <div className="text-light-700 flex min-w-fit gap-1 text-xs font-medium">
            Regions:
            <InfoTip
              content="
             Regions are the cloud regions that you can use to create your cloud instance."
            />
          </div>
          <div className="flex flex-wrap gap-6">
            {responseProviders
              ?.filter(
                (provider: any) => provider.name === formik?.values?.provider,
              )[0]
              ?.regions?.map((region: any, index: number) => (
                <div
                  key={index}
                  className={`relative flex w-40 cursor-pointer items-center justify-center gap-1 rounded border-2 p-4  ${
                    formik.values.region === region.name
                      ? "border-primary-400 shadow"
                      : "border-light-100"
                  } transition-all duration-300
               `}
                  onClick={() => {
                    formik.setFieldValue("region", region.name);
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-light-800 text-xs">
                      {region?.name}
                    </span>
                    <span className="text-light-700 text-xs">
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
    </CFSidebar>
  );
}
