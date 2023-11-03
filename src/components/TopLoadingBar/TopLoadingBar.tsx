import { ReactElement, useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useParams } from "react-router-dom";

export default function TopLoadingBar(): ReactElement {
  const [progress, setProgress] = useState<number>(0);
  const url = useParams();

  useEffect(() => {
    setProgress(50);
    setTimeout(() => setProgress(100), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <LoadingBar
      height={4}
      progress={progress}
      shadow={true}
      transitionTime={500}
      onLoaderFinished={() => setProgress(0)}
      style={{
        background: "linear-gradient(to right, #AC2DFE, #35B8FA)",
      }}
    />
  );
}
