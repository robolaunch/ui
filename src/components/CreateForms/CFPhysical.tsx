import React, { ReactElement } from "react";
import { addPhysicalInstance } from "../../toolkit/InstanceSlice";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAppDispatch } from "../../hooks/redux";
import { useKeycloak } from "@react-keycloak/web";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import { Editor } from "@monaco-editor/react";
import useMain from "../../hooks/useMain";
import Button from "../Button/Button";
import { useFormik } from "formik";
import { toast } from "sonner";

export default function CFPhysical(): ReactElement {
  const [code, setCode] = React.useState<string>("");
  const { sidebarState, setSidebarState, selectedState } = useMain();
  const dispatch = useAppDispatch();
  const { keycloak } = useKeycloak();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      await keycloak.updateToken(-1);
      await dispatch(
        addPhysicalInstance({
          organizationId: selectedState?.organization?.organizationId,
          roboticsCloudName: selectedState?.roboticsCloud?.name,
          instanceId: selectedState?.instance?.instanceId,
          region: selectedState?.instance?.region,
          robolaunchPhysicalInstancesName: values.name,
        }),
      ).then((response: any) => {
        setCode(response?.payload);
        formik.setSubmitting(false);
      });
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
        <p className="text-sm font-medium text-layer-dark-600">
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
            className="border border-layer-primary-700 !bg-layer-light-50 capitalize !text-layer-primary-700 transition-all duration-500 hover:!bg-layer-primary-100"
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
    <form
      onSubmit={formik.handleSubmit}
      className="animate__animated animate__fadeIn flex flex-col gap-8 pt-6"
    >
      <div>
        <InputText
          {...formik.getFieldProps("name")}
          placeholder="Physical Instance Name"
          disabled={formik.isSubmitting}
        />
        <InputError error={formik.errors.name} touched={formik.touched.name} />
      </div>
      <div>
        <Button
          type="submit"
          text="Connect Physical Instance"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
          className="!h-11"
        />
      </div>
    </form>
  );
}