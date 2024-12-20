import ContentLoader from "react-content-loader";
import Widget from "../../layouts/WidgetLayout";
import { Fragment, ReactElement } from "react";
import Seperator from "../Seperator/Seperator";
import { GoGraph } from "react-icons/go";

interface ISoftwareDetailsWidget {
  title: string;
  data: any[];
}

export default function SoftwareDetailsWidget({
  title,
  data,
}: ISoftwareDetailsWidget): ReactElement {
  return (
    <Widget
      dataTut="resources-widget"
      title={`Resource Details`}
      subtitle={`${title} Resources`}
      icon={<GoGraph size={20} className="text-light-700" />}
    >
      <ul className="flex h-full flex-col justify-evenly">
        {data?.map((item: any, index: number) => {
          return (
            <Fragment key={index}>
              <li className="flex justify-between" key={item?.title}>
                <div className="flex items-center gap-2">
                  {item?.icon}
                  <span className="text-xs font-medium text-light-600">
                    {item?.title}:
                  </span>
                </div>
                <span className="text-xs font-medium text-light-500">
                  {item?.value || (
                    <ContentLoader
                      width={124}
                      height={14}
                      viewBox="0 0 124 14"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="5" ry="5" width="124" height="14" />
                    </ContentLoader>
                  )}
                </span>
              </li>
              {index !== data.length - 1 && <Seperator />}
            </Fragment>
          );
        })}
      </ul>
    </Widget>
  );
}
