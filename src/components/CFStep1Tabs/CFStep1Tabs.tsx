import useForm from "../../hooks/useForm";
import { ReactElement } from "react";

export default function CFStep1Tabs(): ReactElement {
  const { step1Formik } = useForm();

  return (
    <ul className="flex h-10 w-full items-center">
      {[
        {
          name: "Develop",
          value: false,
        },
        {
          name: "Deploy",
          value: true,
        },
      ].map(
        (
          item: {
            name: string;
            value: boolean;
          },
          index: number,
        ) => {
          const selected =
            step1Formik.values.details.isDeployMode === item.value;

          return (
            <li
              key={index}
              className={`flex w-full min-w-max cursor-pointer flex-col items-center justify-center gap-3 px-1 text-xs font-medium text-light-300 transition-all duration-500 hover:scale-95 ${
                selected && "!text-primary-500"
              }`}
              onClick={() => {
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
