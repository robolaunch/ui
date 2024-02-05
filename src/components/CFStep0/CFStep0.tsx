import { Fragment, ReactElement, useEffect, useState } from "react";
import CFGridItem from "../CFGridItem/CFGridItem";
import useFunctions from "../../hooks/useFunctions";
import { ITemplate } from "../../interfaces/template.interface";
import Button from "../Button/Button";
import { IEnvironment } from "../../interfaces/environment/environment.interface";
import useCreateRobot from "../../hooks/useCreateRobot";
import useMain from "../../hooks/useMain";

export default function CFStep0(): ReactElement {
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    category: "private" | "organizational" | "public";
    template: IEnvironment | undefined;
  }>({
    category: "private",
    template: undefined,
  });
  const { getTemplates } = useFunctions();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleGetTemplates() {
    setTemplates(await getTemplates());
  }

  const { setRobotData } = useCreateRobot();

  const { handleCreateRobotNextStep } = useMain();

  return (
    <Fragment>
      <div className=" flex flex-col gap-4 bg-light-50">
        <p className="text-sm">
          You can import a template from select a ready template from the list
          below.
        </p>
        <div className="grid w-full grid-cols-3 gap-2">
          {["Private", "Organizational", "Public"].map((category, index) => {
            return (
              <CFGridItem
                disabled={false}
                key={index}
                selected={
                  selectedTemplate?.category === category?.toLocaleLowerCase()
                    ? true
                    : false
                }
                text={category}
                onClick={() => {
                  setSelectedTemplate((prev: any) => {
                    return {
                      ...prev,
                      category: category?.toLocaleLowerCase(),
                    };
                  });
                }}
                className="!rounded-full !p-1.5"
              />
            );
          })}
        </div>
        <div className="grid w-full grid-cols-2 gap-2">
          {selectedTemplate?.category &&
            templates
              ?.filter(
                (template) => template?.type === selectedTemplate?.category,
              )
              ?.map((template, index) => {
                return (
                  <CFGridItem
                    key={index}
                    selected={
                      selectedTemplate?.template === template?.applicationObject
                    }
                    disabled={false}
                    text={
                      <div className="flex h-full w-full justify-evenly">
                        <img
                          src="/svg/general/application/application-dark.svg"
                          alt="app"
                          className="h-10 w-10"
                        />
                        <div className="flex h-full flex-col justify-evenly">
                          <div>Alias: {template?.alias}</div>
                          <div>
                            Application:{" "}
                            {
                              template?.applicationObject?.step1
                                ?.applicationConfig?.application?.name
                            }
                          </div>
                          <div>
                            Version:{" "}
                            {
                              template?.applicationObject?.step1
                                ?.applicationConfig?.application?.version
                            }
                          </div>
                          <div>Save Type: {template?.type}</div>
                        </div>
                      </div>
                    }
                    onClick={() => {
                      setSelectedTemplate((prev: any) => {
                        return {
                          ...prev,
                          template: template?.applicationObject,
                        };
                      });
                    }}
                  />
                );
              })}
        </div>
        <div className="flex w-full gap-2">
          <Button
            onClick={() => {
              handleCreateRobotNextStep();
            }}
            text="Continue without template"
            className="!h-11 border border-primary-700 !bg-light-50 text-xs !text-primary-700 transition-all duration-500 hover:!bg-primary-100"
          />
          <Button
            onClick={() => {
              setIsLoading(true);
              setRobotData(selectedTemplate?.template!);
              setTimeout(() => {
                handleCreateRobotNextStep();
              }, 1000);
            }}
            text="Continue with selected template"
            className="!h-11 text-xs transition-all duration-500"
            disabled={selectedTemplate?.template ? false : true}
            loading={isLoading}
          />
        </div>
      </div>
    </Fragment>
  );
}
