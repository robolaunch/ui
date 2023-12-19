import { ReactElement } from "react";
import Card from "../Card/Card";

interface ICodeEditorSwitcher {
  activeTabCodeEditor: number;
  setActiveTabCodeEditor: any;
}

export default function CodeEditorSwitcher({
  activeTabCodeEditor,
  setActiveTabCodeEditor,
}: ICodeEditorSwitcher): ReactElement {
  return (
    <Card className="!h-fit flex-none p-3 !pb-0">
      <ul className=" flex w-full justify-center  gap-6 rounded ">
        {["Cloud IDE", "Physical IDE"].map((tab: any, index: number) => {
          return (
            <li
              className="flex w-full cursor-pointer flex-col items-center gap-3"
              onClick={() => setActiveTabCodeEditor(index + 1)}
              key={index}
            >
              <div
                className={`flex min-w-max items-center gap-1 px-2 text-xs font-medium transition-all duration-500 hover:scale-90
                        ${
                          index + 1 === activeTabCodeEditor
                            ? "text-primary-500"
                            : "text-light-500"
                        } `}
              >
                <span>{tab}</span>
              </div>
              <div
                className={`h-[2px] w-full transition-all duration-500 
                  ${
                    index + 1 === activeTabCodeEditor
                      ? "bg-primary-500"
                      : "bg-light-100"
                  } `}
              />
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
