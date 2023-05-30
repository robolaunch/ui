import React, { ReactElement, useEffect, useState } from "react";
import CardLayout from "../../../layouts/CardLayout";

interface ICodeEditorProps {
  ideURL: any;
}

export default function CodeEditor({ ideURL }: ICodeEditorProps): ReactElement {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <CardLayout loading={loading}>
      <iframe
        className={`h-[55rem] w-full animate__animated animate__fadeIn`}
        src={ideURL}
        title="Code Editor"
      />
    </CardLayout>
  );
}
