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
  const [loading, setLoading] = useState(false);
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
      // teamId: selected.team.id,
      instanceType: "",
      connectionHub: false,
    },
    validationSchema: createRoboticsCloudSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      // console.log({
      //   superClusterProcessId: values.superCluster,
      //   organization: {
      //     name: currentOrganization.name,
      //   },
      //   teamId: values.teamId,
      //   cloudInstanceName: values.name,
      //   instanceType: values.instanceType,
      //   connectionHub: values.connectionHub,
      // });
      // dispatch(
      //   createRoboticsCloud({
      //     superClusterProcessId: values.superCluster,
      //     organization: {
      //       name: currentOrganization.name,
      //     },
      //     teamId: values.teamId,
      //     cloudInstanceName: values.name,
      //     instanceType: values.instanceType,
      //     connectionHub: values.connectionHub,
      //   })
      // );

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    },
  });

  return (
    <form>
      <div>
        <Dropdown
          {...formik.getFieldProps("provider")}
          value={formik.values.provider}
          onChange={formik.handleChange}
          options={responseProviders}
          optionLabel="name"
          placeholder="Select a provider"
          className="w-full md:w-14rem"
        />
        <InputError
          error={formik.errors.provider}
          touched={formik.touched.provider}
        />
      </div>
      <div>
        <Dropdown
          {...formik.getFieldProps("region")}
          value={formik.values.region}
          onChange={formik.handleChange}
          options={responseRegions}
          optionLabel="name"
          placeholder="Select a region"
          className="w-full md:w-14rem"
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
            id="name"
            name="name"
            type="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <label htmlFor="name">Team Name</label>
        </span>
        <InputError error={formik.errors.name} touched={formik.touched.name} />
      </div>
      <div>
        <Dropdown
          {...formik.getFieldProps("instanceType")}
          value={formik.values.instanceType}
          onChange={formik.handleChange}
          options={[
            { name: "t2.medium (2vCPU | 4GB RAM)" },
            { name: "t3a.xlarge (4vCPU | 16GB RAM)" },
          ]}
          optionLabel="name"
          placeholder="Select a instanceType"
          className="w-full md:w-14rem"
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
        />
      </div>
      <Button
        type="submit"
        label="Create a new robotics cloud"
        onClick={() => formik.handleSubmit()}
        disabled={loading || !formik.isValid}
        loading={loading}
      />
    </form>
  );
};
