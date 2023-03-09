import React, { ReactElement, useEffect, useState } from "react";

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
    <div
      className="bg-layer-light-50 shadow-lg p-2 rounded-lg animate__animated animate__fadeIn"
      style={
        loading
          ? {
              backgroundImage: `url("/svg/general/loading.svg")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "10%",
            }
          : {}
      }
    >
      <iframe
        className={`h-[55rem] w-full animate__animated animate__fadeIn`}
        src={connectionURLs?.ideURL}
        title="Code Editor"
      />
    </div>
  );
}
