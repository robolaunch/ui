import React, {
  Fragment,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import useRobot from "../../hooks/useRobot";
import { useAppSelector } from "../../hooks/redux";

export default function HiddenFrame(): ReactElement {
  const [iframeKey, setIframeKey] = useState<number>(0);
  const { responseRobot, setIsSettedCookie, isSettedCookie } = useRobot();
  const { urls } = useAppSelector((state) => state.robot);

  useEffect(() => {
    const timer = setInterval(
      () => {
        setIframeKey(iframeKey + 1);
      },
      5 * 60 * 1000,
    ); // 5 minutes

    return () => {
      clearInterval(timer);
    };
  }, [iframeKey]);

  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const test = document.getElementsByClassName("-top-[9999px]")?.[0];
    console.log(test.children?.[0]?.children?.[0]?.children?.[0]);
  }, [frame, iframeKey]);

  return (
    <Fragment>
      {responseRobot?.ideIngressEndpoint && (
        <iframe
          ref={frame}
          key={iframeKey}
          title="iframe"
          allow="clipboard-read"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-top-navigation-by-user-activation allow-downloads"
          className="absolute -top-[9999px]"
          src={urls?.ide || responseRobot?.ideIngressEndpoint}
          onLoad={(e) => {
            setTimeout(() => {
              !isSettedCookie && setIsSettedCookie(true);
            }, 2500);
          }}
          onLoadedData={(e) => {
            console.log("onLoaded", e);
          }}
          onLoadedMetadata={(e) => {
            console.log("onLoadedMetadata", e);
          }}
        />
      )}
    </Fragment>
  );
}
