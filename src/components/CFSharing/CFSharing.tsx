import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import FormInputText from "../FormInputText/FormInputText";
import { MdBlock, MdOutlineLock } from "react-icons/md";
import CFGridItem from "../CFGridItem/CFGridItem";
import { GoOrganization } from "react-icons/go";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { BiWorld } from "react-icons/bi";
import { FormikProps } from "formik";
import { ReactElement } from "react";

interface ICFSharing {
  formik: FormikProps<IEnvironmentStep1>;
}

export default function CFSharing({ formik }: ICFSharing): ReactElement {
  const blockButton = (text: string) => {
    return (
      <div className="items flex h-4 w-fit items-center justify-center px-2">
        <div className="flex items-center gap-1">
          {(() => {
            switch (text) {
              case "None":
                return <MdBlock />;
              case "Private":
                return <MdOutlineLock />;
              case "Organization":
                return <GoOrganization />;
              case "Public":
                return <BiWorld />;
            }
          })()}
          <p>{text}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-4">
      <CFInfoBar
        label={"Save and Publish Template"}
        tip={"You can specify the sharing settings for your template."}
        vertical
      >
        <div className="flex gap-2">
          <CFGridItem
            disabled={formik.isSubmitting}
            selected={!formik.values.sharing?.private}
            text={blockButton("None")}
            onClick={() => {
              formik.setFieldValue("sharing.private", false);
              formik.setFieldValue("sharing.organization", false);
              formik.setFieldValue("sharing.public", false);
            }}
          />
          <CFGridItem
            disabled={formik.isSubmitting}
            selected={formik.values.sharing?.private}
            text={blockButton("Private")}
            onClick={() => {
              formik.setFieldValue("sharing.private", true);
              formik.setFieldValue("sharing.organization", false);
              formik.setFieldValue("sharing.public", false);
            }}
          />
          <CFGridItem
            disabled={formik.isSubmitting}
            selected={formik.values.sharing?.organization}
            text={blockButton("Organization")}
            onClick={() => {
              formik.setFieldValue("sharing.private", true);
              formik.setFieldValue("sharing.organization", true);
              formik.setFieldValue("sharing.public", false);
            }}
          />
          <CFGridItem
            disabled={formik.isSubmitting}
            selected={formik.values.sharing?.public}
            text={blockButton("Public")}
            onClick={() => {
              formik.setFieldValue("sharing.private", true);
              formik.setFieldValue("sharing.organization", true);
              formik.setFieldValue("sharing.public", true);
            }}
          />
        </div>
      </CFInfoBar>
      {formik.values.sharing?.private && (
        <FormInputText
          labelName="Template Name:"
          labelInfoTip="You can specify the name of your template here."
          inputProps={formik.getFieldProps("sharing.alias")}
          inputError={formik.errors.sharing?.alias}
          inputTouched={formik.touched.sharing?.alias}
          classNameInput="h-6"
          rightTip
        />
      )}
    </div>
  );
}
