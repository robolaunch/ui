import { useContext } from "react";
import { FormContext } from "../contexts/FormContext";
import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../interfaces/environment/environment.step1.interface";
import { IEnvironmentStep3 } from "../interfaces/environment/environment.step3.interface";
import { IEnvironmentStep2 } from "../interfaces/environment/environment.step2.interface";

interface IuseForm {
  step1Formik: FormikProps<IEnvironmentStep1>;
  step1AppFormik: FormikProps<IEnvironmentStep1>;
  step2Formik: FormikProps<IEnvironmentStep2>;
  step3Formik: FormikProps<IEnvironmentStep3>;
}

const useForm = () => {
  const useForm: IuseForm = useContext(FormContext);

  return useForm;
};

export default useForm;
