import { createInstanceSchema } from "../../validations/InstancesValidations";
import responseProviders from "../../mock/CloudInstanceProviders.json";
import { createCloudInstance } from "../../toolkit/InstanceSlice";
import FormInputText from "../FormInputText/FormInputText";
import { useAppDispatch } from "../../hooks/redux";
import InputError from "../InputError/InputError";
import CFSidebar from "../CFSidebar/CFSidebar";
import useMain from "../../hooks/useMain";
import InfoTip from "../InfoTip/InfoTip";
import { BsCpu } from "react-icons/bs";
import { ReactElement } from "react";
import { useFormik } from "formik";

export default function CFInstance(): ReactElement {
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
          organizationId: selectedState.organization!.id!,
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
    <CFSidebar formik={formik} text="Create Instance">
      <FormInputText
        labelName="Cloud Instance Name:"
        labelInfoTip="Type a new cloud instance name."
        disabled={formik.isSubmitting}
        inputProps={formik.getFieldProps("cloudInstanceName")}
        inputError={formik.errors.cloudInstanceName}
        inputTouched={!!formik.errors.cloudInstanceName}
      />

      <div className="flex flex-col gap-3">
        <div className="flex min-w-fit gap-1 text-xs font-medium text-light-700">
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
                  ? "border-primary-400 shadow"
                  : "border-light-100"
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
              <div className="flex gap-2.5 text-light-700">
                <div className="flex items-center gap-1">
                  <BsCpu className="text-light-600" size={14} />
                  <span className="text-xs">{type.resources.cpu} CPU</span>
                </div>
                <div className="flex items-center gap-1">
                  <BsCpu className="text-light-600" size={14} />
                  <span className="text-xs">{type.resources.ram} RAM</span>
                </div>
                <div className="flex items-center gap-1">
                  <BsCpu className="text-light-600" size={14} />
                  <span className="text-xs">{type.resources.gpu} GPU</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <InputError error={formik?.errors?.instanceType} touched={true} />
      </div>
    </CFSidebar>
  );
}
