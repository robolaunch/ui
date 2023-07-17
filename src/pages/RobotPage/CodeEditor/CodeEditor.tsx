import React, { ReactElement, useState } from "react";
import VSCodeFrame from "../../../components/VSCodeFrame/VSCodeFrame";
import CardLayout from "../../../layouts/CardLayout";

interface ICodeEditor {
  vIdeURL: string;
  pIdeURL: string;
}

export default function CodeEditor({
  vIdeURL,
  pIdeURL,
}: ICodeEditor): ReactElement {
  const [activeTab, setActiveTab] = useState<"Cloud IDE" | "Physical IDE">(
    "Cloud IDE"
  );

  const tabs = [
    {
      name: "Cloud IDE",
    },
    {
      name: "Physical IDE",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      {pIdeURL && (
        <CardLayout className="!">
          <ul className="w-full flex justify-center gap-6  p-1 -mb-2.5 rounded">
            {tabs.map((tab: any, index: number) => {
              return (
                <li
                  className={`flex w-full items-center flex-col gap-3 cursor-pointer 
                     ${tab?.hidden && "!hidden"}`}
                  onClick={() => setActiveTab(tab.name)}
                  key={index}
                >
                  <div
                    className={`flex gap-1 items-center text-xs font-medium px-2 transition-all duration-500 min-w-max hover:scale-90
                        ${
                          tab.name === activeTab
                            ? "text-layer-primary-500"
                            : "text-layer-light-500"
                        } `}
                  >
                    <span>{tab.name}</span>
                  </div>
                  <div
                    className={`w-full h-[2px] transition-all duration-500 
                  ${
                    tab.name === activeTab
                      ? "bg-layer-primary-500"
                      : "bg-layer-light-100"
                  } `}
                  />
                </li>
              );
            })}
          </ul>
        </CardLayout>
      )}
      <VSCodeFrame srcURL={activeTab === "Cloud IDE" ? vIdeURL : pIdeURL} />
    </div>
  );
}
