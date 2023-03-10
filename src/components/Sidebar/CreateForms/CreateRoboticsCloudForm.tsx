import { useFormik } from "formik";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import InputError from "../../InputError/InputError";
import { createRoboticsCloudSchema } from "../../../validations/RoboticsCloudsValidations";
import InputSelect from "../../InputSelect/InputSelect";
import InputText from "../../InputText/InputText";
import Button from "../../Button/Button";
import { createRoboticsCloud } from "../../../app/RoboticsCloudSlice";
import { SidebarContext } from "../../../contexts/SidebarContext";
import { getProviders } from "../../../app/ProviderSlice";
import { getRegions } from "../../../app/RegionSlice";

export const CreateRoboticsCloudForm = () => {
  const { currentOrganization } = useAppSelector((state) => state.organization);
  const [responseProviders, setResponseProviders] = useState<any>([]);
  const [responseRegions, setResponseRegions] = useState<any>([]);
  const dispatch = useAppDispatch();

  const { selectedState, sidebarState, setSidebarState }: any =
    useContext(SidebarContext);

  const formik: any = useFormik({
    initialValues: {
      provider: "",
      region: "",
      name: "",
      instanceType: "",
      connectionHub: "",
    },
    validationSchema: createRoboticsCloudSchema,
    onSubmit: (values, { setSubmitting }) => {
      formik.setSubmitting(true);

      dispatch(
        createRoboticsCloud({
          teamName: selectedState?.team?.name,
          provider: values.provider,
          region: values.region,
          name: values.name,
          instanceType: values.instanceType,
          connectionHub: values.connectionHub === "active" ? true : false,
        })
      );

      setTimeout(() => {
        formik.setSubmitting(false);
        setSidebarState({ ...sidebarState, isCreateMode: false });
      }, 2000);
    },
  });

  useEffect(() => {
    dispatch(getProviders()).then((res: any) => {
      setResponseProviders(res?.payload?.data?.data);
    });
  }, [dispatch]);

  useEffect(() => {
    formik.setFieldValue("region", "");

    if (formik.values.provider) {
      dispatch(getRegions({ provider: formik.values.provider })).then(
        (res: any) => {
          setResponseRegions(res?.payload?.data?.data);
        }
      );
    } else {
      setResponseRegions([]);
    }
  }, [dispatch, formik.values.provider]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-8 animate__animated animate__fadeIn"
    >
      <div>
        <InputSelect
          {...formik.getFieldProps("provider")}
          placeholder="Provider"
          disabled={formik.isSubmitting}
        >
          <Fragment>
            {!formik.values.provider && <option value=""></option>}
            {responseProviders?.map((provider: any, index: number) => (
              <option key={index} value={provider.name}>
                {provider.name}
              </option>
            ))}
          </Fragment>
        </InputSelect>
        <InputError
          error={formik.errors.provider}
          touched={formik.touched.provider}
        />
      </div>
      <div>
        <InputSelect
          {...formik.getFieldProps("region")}
          placeholder="Region"
          disabled={formik.isSubmitting}
        >
          <Fragment>
            {!formik.values.region && <option value=""></option>}
            {responseRegions?.map((region: any, index: number) => (
              <option key={index} value={region.name}>
                {region.name}
              </option>
            ))}
          </Fragment>
        </InputSelect>
        <InputError
          error={formik.errors.region}
          touched={formik.touched.region}
        />
      </div>
      <div>
        <InputText
          {...formik.getFieldProps("name")}
          placeholder="Robotics Cloud Name"
          type="name"
          disabled={formik.isSubmitting}
        />
        <InputError error={formik.errors.name} touched={formik.touched.name} />
      </div>

      <div>
        <InputSelect
          {...formik.getFieldProps("instanceType")}
          placeholder="Instance Type"
          disabled={formik.isSubmitting}
        >
          <Fragment>
            {!formik.values.instanceType && <option value=""></option>}
            <option value="t2.medium">t2.medium (2vCPU | 4GB RAM)</option>
            <option value="t3a.xlarge">t3a.xlarge (4vCPU | 16GB RAM)</option>
          </Fragment>
        </InputSelect>
        <InputError
          error={formik.errors.instanceType}
          touched={formik.touched.instanceType}
        />
      </div>

      <div>
        <InputSelect
          {...formik.getFieldProps("connectionHub")}
          placeholder="Connection Hub"
          disabled={formik.isSubmitting}
        >
          <Fragment>
            {!formik.values.connectionHub && <option value=""></option>}
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Fragment>
        </InputSelect>
        <InputError
          error={formik.errors.connectionHub}
          touched={formik.touched.connectionHub}
        />
      </div>
      <div>
        <Button
          type="submit"
          text="Create a new Robotics Cloud"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
        />
      </div>
    </form>
  );
};
