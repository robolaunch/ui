import React, { ReactElement, useEffect, useState } from "react";
import CardLayout from "../../../../layouts/CardLayout";

interface ICodeEditorProps {
  connectionURLs: any;
}

export default function CodeEditor({
  connectionURLs,
}: ICodeEditorProps): ReactElement {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <CardLayout loading={loading}>
      <iframe
        className={`h-[55rem] w-full animate__animated animate__fadeIn`}
        src={connectionURLs?.ideURL}
        title="Code Editor"
      />
    </CardLayout>
  );
}
