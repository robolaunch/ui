import { ReactElement } from "react";
import CFButtons from "../CFButtons/CFButtons";

interface ICFSidebar {
  formik: any;
  children: ReactElement | ReactElement[];
  text: string;
}

export default function CFSidebar({
  formik,
  children,
  text,
}: ICFSidebar): ReactElement {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="animate-fadeIn flex flex-col gap-8"
    >
      {children}
      <CFButtons formik={formik} text={text} />
    </form>
  );
}
