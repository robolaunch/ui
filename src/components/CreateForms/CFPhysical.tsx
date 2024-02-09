import { CopyToClipboard } from "react-copy-to-clipboard";
import { useKeycloak } from "@react-keycloak/web";
import { ReactElement, useState } from "react";
import { Editor } from "@monaco-editor/react";
import useMain from "../../hooks/useMain";
import Button from "../Button/Button";
import { useFormik } from "formik";
import { toast } from "sonner";
import CFSection from "../CFSection/CFSection";
import FormInputText from "../FormInputText/FormInputText";
import CFForm from "../CFForm/CFForm";
import useFunctions from "../../hooks/useFunctions";

export default function CFPhysical(): ReactElement {
  const [code, setCode] = useState<string>("");
  const { sidebarState, setSidebarState } = useMain();
  const { keycloak } = useKeycloak();

  const { addPhysicalInstanceToCloudInstanceFC } = useFunctions();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async () => {
      formik.setSubmitting(true);
      await keycloak.updateToken(-1);

      setCode(await addPhysicalInstanceToCloudInstanceFC(formik.values.name));
      formik.setSubmitting(false);
    },
  });

  if (code) {
    return (
      <div className="flex flex-col gap-8">
        <Editor
          height="360px"
          width="100%"
          defaultLanguage="shell"
          defaultValue={code}
          options={{
            readOnly: true,
            contextmenu: false,
            minimap: {
              enabled: false,
            },
            fontSize: 12,
            fontFamily: "monospace",
            lineDecorationsWidth: 10,
            wordWrap: "on",
            lineNumbersMinChars: 3,
            folding: false,
            padding: {
              top: 6,
              bottom: 6,
            },
            language: "shell",
            copyWithSyntaxHighlighting: true,
          }}
          theme="vs-dark"
        />
        <p className="text-sm font-medium text-light-600">
          Copy the code given below and run it on your physical device. After
          doing this, you can check and manage the status of your device.
        </p>
        <div className="flex gap-2">
          <CopyToClipboard text={code}>
            <Button
              text="Copy to clipboard"
              onClick={() => toast.success("Copied to clipboard")}
            />
          </CopyToClipboard>
          <Button
            className="border border-primary-700 !bg-light-50 capitalize !text-primary-700 transition-all duration-500 hover:!bg-primary-100"
            text="Done"
            onClick={() => {
              setSidebarState({ ...sidebarState, isCreateMode: false });
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <CFForm formik={formik}>
      <CFSection>
        <FormInputText
          labelName="Physical Instance Name"
          labelInfoTip="Type a new physical instance name."
          inputProps={formik.getFieldProps("name")}
          disabled={formik.isSubmitting}
          inputHoverText="You can't change physical instance name because this physical instance is created before."
          inputError={formik.errors.name}
          inputTouched={formik.touched.name}
        />
      </CFSection>
    </CFForm>
  );
}
