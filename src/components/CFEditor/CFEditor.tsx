import { Editor } from "@monaco-editor/react";
import { ReactElement } from "react";

interface ICFEditor {
  language: string;
  defaultValue: string;
  value: string;
  readonly: boolean;
  onChange: (e: any) => void;
}

export default function CFEditor({
  language,
  defaultValue,
  value,
  readonly,
  onChange,
}: ICFEditor): ReactElement {
  return (
    <Editor
      height="140px"
      defaultLanguage={language}
      defaultValue={defaultValue}
      value={value}
      options={{
        readOnly: readonly,
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
      }}
      theme="vs-dark"
      onChange={onChange}
    />
  );
}
