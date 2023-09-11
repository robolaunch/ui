import React, { ReactElement } from "react";
import WidgetLayout from "../../layouts/WidgetLayout";
import { GiAerialSignal } from "react-icons/gi";
import useTheme from "../../hooks/useTheme";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import ContentLoader from "react-content-loader";

interface IAdrinNetworkStatusWidget {
  data: any;
}

export default function AdrinNetworkStatusWidget({
  data,
}: IAdrinNetworkStatusWidget): ReactElement {
  const { theme } = useTheme();

  return (
    <WidgetLayout
      title={`Network Status`}
      subtitle={`ADriN Status`}
      icon={<GiAerialSignal size={20} className="text-layer-light-700" />}
    >
      <div className="flex items-center gap-4 justify-around w-full h-full">
        <img
          src={`/svg/general/computer/computer-${
            theme === "light" && "gray"
          }.svg`}
          alt="computer"
          className="w-7 h-7 scale-[1.3]"
        />
        <div className="w-full flex items-center flex-col gap-2">
          {data?.color ? (
            <FiCheckCircle size={24} className="text-green-600" />
          ) : (
            <ContentLoader
              speed={1}
              width={32}
              height={32}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <rect width="32" height="32" />
            </ContentLoader>
          )}

          {data?.color ? (
            <div className="w-full h-0.5 bg-green-600" />
          ) : (
            <ContentLoader
              speed={1}
              width={"100%"}
              height={3}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <rect width="100%" height="3" />
            </ContentLoader>
          )}

          {data?.description ? (
            <p className="text-xs font-medium text-green-800">Healthly</p>
          ) : (
            <ContentLoader
              speed={1}
              width={64}
              height={10}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <rect width="64" height="10" />
            </ContentLoader>
          )}
        </div>
        <img
          src={`/svg/general/base-station/base-station-${
            theme === "light" && "gray"
          }.svg`}
          alt="base-station"
          className="w-7 h-7 scale-[1.3]"
        />
        <div className="w-full flex items-center flex-col gap-2 transition-500">
          {data?.color === "bg-green-600" ? (
            <FiCheckCircle size={24} className="text-green-600" />
          ) : data?.color === "bg-yellow-600" ? (
            <FiAlertCircle size={24} className="text-yellow-600" />
          ) : data?.color === "bg-orange-600" ? (
            <FiAlertCircle size={24} className="text-orange-600" />
          ) : data?.color === "bg-red-600" ? (
            <FiAlertCircle size={24} className="text-red-600" />
          ) : (
            <ContentLoader
              speed={1}
              width={32}
              height={32}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <rect width="32" height="32" />
            </ContentLoader>
          )}

          {data?.color ? (
            <div className={`w-full h-0.5 ${data?.color} transition-500`} />
          ) : (
            <ContentLoader
              speed={1}
              width={"100%"}
              height={3}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <rect width="100%" height="3" />
            </ContentLoader>
          )}

          {data?.description ? (
            <p
              className={`text-xs font-medium transition-500 ${
                data?.color === "bg-green-600"
                  ? "text-green-800"
                  : data?.color === "bg-yellow-600"
                  ? "text-yellow-800"
                  : data?.color === "bg-orange-600"
                  ? "text-orange-800"
                  : data?.color === "bg-red-600"
                  ? "text-red-800"
                  : "text-layer-light-800"
              }`}
            >
              {data?.description}
            </p>
          ) : (
            <ContentLoader
              speed={1}
              width={64}
              height={10}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <rect width="64" height="10" />
            </ContentLoader>
          )}
        </div>
        <img
          src={`/svg/general/robot/robot-${theme === "light" && "gray"}.svg`}
          alt="robot"
          className="w-7 h-7 scale-[1.3]"
        />
      </div>
    </WidgetLayout>
  );
}
