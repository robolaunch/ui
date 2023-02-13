import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import InputError from "../../InputError/InputError";
import { useAppDispatch } from "../../../hooks/redux";
import { createFleetSchema } from "../../../validations/FleetsValidations";
import { Button } from "primereact/button";

export const CreateFleetForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      federatedFleet: false,
      physicalInstances: [],
    },
    validationSchema: createFleetSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);

      // if (formik.values.federatedFleet) {
      //   let clusters = [];
      //   values.physicalInstances?.map((item: any) => {
      //     clusters.push(item);
      //   });
      //   clusters.push(selected.roboticsCloud.bufferName);
      //   dispatch(
      //     createFederatedFleet({
      //       roboticsCloudProcessId: selected.roboticsCloud.processId,
      //       fleetName: values.name,
      //       clusters,
      //     })
      //   );
      // } else {
      //   dispatch(
      //     createFleet({
      //       roboticsCloudProcessId: selected.roboticsCloud.processId,
      //       fleetName: values.name,
      //     })
      //   );
      // }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  return (
    <form>
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
          <label htmlFor="name">Fleet Name</label>
        </span>
        <InputError error={formik.errors.name} touched={formik.touched.name} />
      </div>
      <Button
        type="submit"
        label="Create a new fleet"
        onClick={() => formik.handleSubmit()}
        disabled={loading || !formik.isValid}
        loading={loading}
      />
    </form>
  );
};
