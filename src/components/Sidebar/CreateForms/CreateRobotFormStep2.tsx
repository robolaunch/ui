import React, { ReactElement, useContext, useEffect } from "react";
import { CreateRobotContext } from "../../../contexts/CreateRobotContext";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { BsPlusCircle } from "react-icons/bs";
import {
  IRobotData,
  IRobotWorkspaces,
} from "../../../interfaces/robotInterfaces";
import Button from "../../Button/Button";
import { SidebarContext } from "../../../contexts/SidebarContext";
import CreateRobotFormWorkspaceItem from "../../CreateRobotFormWorkspaceItem/CreateRobotFormWorkspaceItem";

export default function CreateRobotFormStep2(): ReactElement {
  const {
    robotData,
    setRobotData,
  }: {
    robotData: IRobotData;
    setRobotData: React.Dispatch<React.SetStateAction<IRobotData>>;
  } = useContext(CreateRobotContext);

  const {
    handleCreateRobotPreviousStep,
    handleCreateRobotNextStep,
  }: {
    handleCreateRobotPreviousStep: () => void;
    handleCreateRobotNextStep: () => void;
  } = useContext(SidebarContext);

  const formik: FormikProps<IRobotWorkspaces> = useFormik<IRobotWorkspaces>({
    isInitialValid: false,
    validationSchema: Yup.object().shape({
      workspaces: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Workspace Name is required"),
          distro: Yup.string().required("Workspace Distro is required"),
          repositories: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required("Repository Name is required"),
              url: Yup.string().required("Repository URL is required"),
              branch: Yup.string().required("Repository Branch is required"),
            })
          ),
        })
      ),
    }),
    initialValues: robotData?.step2,
    onSubmit: (values: any) => {
      formik.setSubmitting(true);
      //
      formik.setSubmitting(false);
    },
  });

  useEffect(() => {
    setRobotData({
      ...robotData,
      step2: formik.values,
    });
    // eslint-disable-next-line
  }, [formik.values]);

  function handleAddWorkspace() {
    const temp: any = [...formik.values.workspaces];
    temp.push({
      name: "",
      distro: "",
      repositories: [
        {
          name: "",
          url: "",
          branch: "",
        },
      ],
    });
    formik.setFieldValue("workspaces", temp);
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-8 animate__animated animate__fadeIn pr-1 overflow-auto"
    >
      <div className="flex flex-col gap-2">
        {robotData?.step2?.workspaces?.map(
          (workspace: any, workspaceIndex: number) => {
            return (
              <CreateRobotFormWorkspaceItem
                key={workspaceIndex}
                formik={formik}
                workspace={workspace}
                workspaceIndex={workspaceIndex}
              />
            );
          }
        )}
      </div>
      <BsPlusCircle
        onClick={() => handleAddWorkspace()}
        size={22}
        className="mx-auto text-layer-secondary-700 hover:scale-90 transition-all duration-500 cursor-pointer -mt-4"
      />
      <div className="flex gap-6">
        <Button
          onClick={handleCreateRobotPreviousStep}
          type="reset"
          className="!h-11 !bg-layer-light-50 text-primary border border-primary hover:!bg-layer-primary-100 transition-all duration-500 text-xs"
          text={`Previous Step`}
        />
        <Button
          type="submit"
          disabled={!formik?.isValid || formik.isSubmitting}
          onClick={handleCreateRobotNextStep}
          className="!h-11 text-xs"
          text={`Next Step`}
        />
      </div>
    </form>
  );
}
