import React, { Fragment, ReactElement, useState } from "react";
import RemoteDesktopTabs from "../../../components/RemoteDesktopTabs/RemoteDesktopTabs.tsx";
import CardLayout from "../../../layouts/CardLayout";
import RemoteDesktopScene from "../../../components/RemoteDesktopScene/RemoteDesktopScene.tsx";
import StreamContext from "../../../contexts/StreamContext.tsx";
import HiddenFrames from "../../../components/HiddenFrames/HiddenFrames.tsx";
interface IRemoteDesktop {
  vdiIngressEndpoint: any;
}

export default function RemoteDesktop({
  vdiIngressEndpoint,
}: IRemoteDesktop): ReactElement {
  const [isSettedCookie, setIsSettedCookie] = useState<boolean>(false);

  return (
    <CardLayout
      loading={!isSettedCookie}
      className={`${!isSettedCookie && "!min-h-[52rem]"}`}
    >
      <Fragment>
        {isSettedCookie && (
          <StreamContext vdiIngressEndpoint={vdiIngressEndpoint}>
            <div className="grid grid-cols-12 animate__animated animate__fadeIn">
              <div className="col-span-12 lg:col-span-8 xl:col-span-9 2xl:col-span-10 bg-layer-dark-900 ">
                <RemoteDesktopScene isControllerActive={true} />
              </div>
              <div className="hidden lg:col-span-4 xl:col-span-3 2xl:col-span-2 lg:flex flex-col">
                <RemoteDesktopTabs />
              </div>
            </div>
          </StreamContext>
        )}
        <HiddenFrames
          type="vdi"
          url={`https://${vdiIngressEndpoint.split("//")[1]}health`}
          onLoad={() => {
            setIsSettedCookie(true);
          }}
        />
      </Fragment>
    </CardLayout>
  );
}
