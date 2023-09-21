import { useFormik } from "formik";
import React, { ReactElement } from "react";
import InputError from "../InputError/InputError";
import { createFleetSchema } from "../../validations/FleetsValidations";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import useMain from "../../hooks/useMain";
import { useAppDispatch } from "../../hooks/redux";
import { createFederatedFleet } from "../../toolkit/FleetSlice";
import InfoTip from "../InfoTip/InfoTip";
import CreateFormCancelButton from "../CreateFormCancelButton/CreateFormCancelButton";

export default function CreateFleetForm(): ReactElement {
  const { sidebarState, setSidebarState, selectedState } = useMain();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createFleetSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);
      dispatch(
        createFederatedFleet({
          robolaunchFederatedFleetsName: values.name,
          organizationId: selectedState?.organization?.organizationId!,
          roboticsCloudName: selectedState?.roboticsCloud?.name!,
          instanceId: selectedState?.instance?.instanceId,
          region: selectedState?.instance?.region,
        }),
      ).then(() => {
        formik.setSubmitting(false);
        setSidebarState({ ...sidebarState, isCreateMode: false });
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
          Fleet Name:
          <InfoTip content="Type a new fleet name." />
        </div>
        <InputText
          {...formik.getFieldProps("name")}
          className="!text-sm"
          disabled={formik.isSubmitting}
        />
        <InputError error={formik.errors.name} touched={formik.errors.name} />
      </div>

      <div className="flex gap-2">
        <CreateFormCancelButton disabled={formik.isSubmitting} />
        <Button
          type="submit"
          text="Create a new fleet"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
          className="!h-11"
        />
      </div>
    </form>
  );
}
