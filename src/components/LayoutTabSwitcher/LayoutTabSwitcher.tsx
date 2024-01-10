import { Dispatch, ReactElement, SetStateAction } from "react";
import Card from "../Card/Card";

interface ILayoutTabSwitcher {
  tabs: string[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<any>>;
}

export default function LayoutTabSwitcher({
  tabs,
  activeTab,
  setActiveTab,
}: ILayoutTabSwitcher): ReactElement {
  return (
    <Card className="!h-fit flex-none p-3 !pb-0">
      <ul className=" flex w-full justify-center  gap-6 rounded ">
        {tabs?.map((tab: string, index: number) => {
          return (
            <li
              className="flex w-full cursor-pointer flex-col items-center gap-3"
              onClick={() => setActiveTab(tab)}
              key={index}
            >
              <div
                className={`flex min-w-max items-center gap-1 px-2 text-xs font-medium transition-all duration-500 hover:scale-90
                        ${
                          tab === activeTab
                            ? "text-primary-500"
                            : "text-light-500"
                        } `}
              >
                <span>{tab}</span>
              </div>
              <div
                className={`h-[2px] w-full transition-all duration-500 
                  ${tab === activeTab ? "bg-primary-500" : "bg-light-100"} `}
              />
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
