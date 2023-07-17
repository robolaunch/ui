import React, { Fragment, ReactElement, useEffect, useState } from "react";
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

  useEffect(() => {
    deleteAllCookies();

    return () => {
      deleteAllCookies();
    };
  }, []);

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      var domain = window.location.hostname;

      // Çerezin özelliklerini al
      var cookieProperties = cookie.split(";");

      // SameSite özelliğini kontrol et
      var hasSameSite = false;

      for (var j = 0; j < cookieProperties.length; j++) {
        var property = cookieProperties[j].trim();

        if (property.indexOf("SameSite") === 0) {
          hasSameSite = true;
          break;
        }
      }

      // Mevcut domaindeki ve SameSite özelliğine sahip çerezleri sil
      if (hasSameSite || domain === "") {
        document.cookie =
          name +
          "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" +
          domain;
      }
    }
  }

  return (
    <CardLayout
      loading={!isSettedCookie}
      className={`${!isSettedCookie && "h-80"}`}
    >
      <Fragment>
        {isSettedCookie && (
          <StreamContext vdiIngressEndpoint={vdiIngressEndpoint}>
            <div className="grid grid-cols-12">
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
