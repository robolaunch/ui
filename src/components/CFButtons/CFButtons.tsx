import { ReactElement } from "react";
import CreateFormCancelButton from "../CreateFormCancelButton/CreateFormCancelButton";
import Button from "../Button/Button";

interface ICFButtons {
  formik: any;
  text: string;
}

export default function CFButtons({ formik, text }: ICFButtons): ReactElement {
  return (
    <div className="flex gap-2">
      <CreateFormCancelButton disabled={formik.isSubmitting} />
      <Button
        type="submit"
        text={text}
        disabled={formik.isSubmitting || !formik.isValid}
        loading={formik.isSubmitting}
        className="!h-11"
      />
    </div>
  );
}
