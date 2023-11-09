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
    // Check if the iframe is available and has a contentWindow
    if (frame?.current?.contentWindow) {
      frame.current.contentWindow.onload = () => {
        // The iframe has loaded, and you can access its content here
        const iframeContent = frame?.current?.contentWindow?.document;
        console.log("Accessed iframe content:", iframeContent);

        setTimeout(() => {
          !isSettedCookie && setIsSettedCookie(true);
        }, 2500);
      };
    }
  }, [frame, isSettedCookie, setIsSettedCookie]);

  return (
    <Fragment>
      {responseRobot?.ideIngressEndpoint && (
        <iframe
          ref={frame}
          key={iframeKey}
          title="iframe"
          allow="clipboard-read"
          className="absolute -top-[9999px]"
          src={urls?.ide || responseRobot?.ideIngressEndpoint}
          onLoad={(e) => {
            setTimeout(() => {
              !isSettedCookie && setIsSettedCookie(true);
            }, 2500);
          }}
        />
      )}
    </Fragment>
  );
}
