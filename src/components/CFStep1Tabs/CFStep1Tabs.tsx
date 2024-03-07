import { useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { ReactElement } from "react";

export default function CFStep1Tabs(): ReactElement {
  const { step1Formik } = useForm();

  const url = useParams();

  return (
    <ul className="flex h-10 w-full items-center">
      {[
        {
          name: "Develop",
          value: false,
          disabled: Boolean(url?.robotName),
        },
        {
          name: "Deploy",
          value: true,
          disabled: Boolean(url?.robotName),
        },
      ].map(
        (
          item: {
            name: string;
            value: boolean;
            disabled: boolean;
          },
          index: number,
        ) => {
          const selected =
            step1Formik.values.details.isDeployMode === item.value;

          const disabled: boolean = item.disabled;

          return (
            <li
              key={index}
              className={`flex w-full min-w-max flex-col items-center justify-center gap-3 px-1 text-xs font-medium text-light-300 transition-all duration-500 ${
                selected && "!text-primary-500"
              } ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-95"}`}
              onClick={() => {
                !item.disabled &&
                  step1Formik.setFieldValue("details.isDeployMode", item.value);
              }}
            >
              <p>{item?.name}</p>
              <span
                className={`h-[2px] w-full bg-light-300 ${
                  selected && "!bg-primary-500"
                } `}
              />
            </li>
          );
        },
      )}
    </ul>
  );
}
