import { useFormik } from "formik";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Dropdown } from "primereact/dropdown";
import InputError from "../../InputError/InputError";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { createRoboticsCloudSchema } from "../../../validations/RoboticsCloudsValidations";
import { Button } from "primereact/button";

export const CreateRoboticsCloudForm = () => {
  const { currentOrganization } = useAppSelector((state) => state.organization);
  const [responseProviders, setResponseProviders] = useState<any>([]);
  const [responseRegions, setResponseRegions] = useState<any>([]);
  const dispatch = useAppDispatch();

  const formik: any = useFormik({
    initialValues: {
      organization: currentOrganization.name,
      provider: "",
      region: "",
      superCluster: "",
      name: "",
      instanceType: "",
      connectionHub: false,
    },
    validationSchema: createRoboticsCloudSchema,
    onSubmit: async (values, { setSubmitting }) => {
      formik.setSubmitting(true);

      console.log(values);

      setTimeout(() => {
        formik.setSubmitting(false);
      }, 2000);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
      <div>
        <Dropdown
          {...formik.getFieldProps("provider")}
          options={[{ name: "provider #1" }]}
          optionLabel="name"
          placeholder="Select a provider"
          className="w-full md:w-14rem"
          disabled={formik.isSubmitting}
        />
        <InputError
          error={formik.errors.provider}
          touched={formik.touched.provider}
        />
      </div>

      <div>
        <Dropdown
          {...formik.getFieldProps("region")}
          options={[{ name: "region #1" }]}
          optionLabel="name"
          placeholder="Select a region"
          className="w-full md:w-14rem"
          disabled={formik.isSubmitting}
        />
        <InputError
          error={formik.errors.region}
          touched={formik.touched.region}
        />
      </div>

      <div>
        <span className="p-float-label">
          <InputText
            {...formik.getFieldProps("name")}
            disabled={formik.isSubmitting}
          />
          <label htmlFor="name">Team Name</label>
        </span>
        <InputError error={formik.errors.name} touched={formik.touched.name} />
      </div>

      <div>
        <Dropdown
          {...formik.getFieldProps("instanceType")}
          options={[
            { name: "t2.medium (2vCPU | 4GB RAM)" },
            { name: "t3a.xlarge (4vCPU | 16GB RAM)" },
          ]}
          optionLabel="name"
          placeholder="Select a instanceType"
          className="w-full md:w-14rem"
          disabled={formik.isSubmitting}
        />
        <InputError
          error={formik.errors.instanceType}
          touched={formik.touched.instanceType}
        />
      </div>

      <div>
        <InputSwitch
          checked={formik.values.connectionHub}
          onChange={(e: any) => formik.setFieldValue("connectionHub", e.value)}
          disabled={formik.isSubmitting}
        />
      </div>

      <Button
        type="submit"
        label="Create a new robotics cloud"
        disabled={formik.isSubmitting || !formik.isValid}
        loading={formik.isSubmitting}
      />
    </form>
  );
};
